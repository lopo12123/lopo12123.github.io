---
title: SSE 响应数据解析 (2)
category: dart, sse
created: 2025-02-13
---

出于业务需求, 需要在 `flutter` 中实现SSE形式的接口的调用.

## 数据解析

一般情况下, SSE接口的响应中我们比较关心`id`, `event` 和 `data` 三个部分. 对于 `retry` 和注释部分可以暂作忽略.

### 获取全部字段 (除注释部分)

将数据的每一行使用 `:` 分割后使用 `Map` 存储.

```dart
class SSERaw {
  final Map<String, String> fields;

  const SSERaw(this.fields);

  Map<String, String> toJson() => fields;

  @override
  String toString() {
    return '[SSERaw]\n${fields.entries.map((entry) => '${entry.key}:${entry.value}').join('\n')}';
  }
}

class SSERawTransformer extends StreamTransformerBase<Uint8List, SSERaw> {
  final _fields = <String, String>{};

  @override
  Stream<SSERaw> bind(Stream<Uint8List> stream) async* {
    final lines = stream
        .cast<List<int>>()
        .transform(const Utf8Decoder())
        .transform(const LineSplitter());

    await for (final line in lines) {
      // ignore comment lines
      if (line.startsWith(':')) continue;

      // chunk finished
      if (line == '') {
        yield SSERaw(_fields);
        _fields.clear();
      }

      // field lines
      else {
        final bp = line.indexOf(':');
        if (bp == -1) {
          // unreachable!
          throw FormatException('invalid chunk line: $line');
        }

        _fields[line.substring(0, bp)] = line.substring(bp + 1);
      }
    }
  }
}
```

### 提取 id & event & data 字段

在上述的基础上, 每接受一个完整的SSE片段后提取其中的 `id`, `event` 和 `data` 字段使用 `SSEEvent` 实例包装.

```dart
class SSEEvent {
  final String? id;
  final String? event;
  final String? data;

  // ignore comments & retry fields
  // final List<String> comments;
  // final String? retry;

  const SSEEvent({
    required this.id,
    required this.event,
    required this.data,
  });

  @override
  String toString() {
    return '[SSEEvent]\nid:${id ?? ''}\nevent:${event ?? ''}\ndata:${data ?? ''}';
  }
}

class SSEEventTransformer extends StreamTransformerBase<Uint8List, SSEEvent> {
  final _fields = <String, String>{};

  @override
  Stream<SSEEvent> bind(Stream<Uint8List> stream) async* {
    final lines = stream
        .cast<List<int>>()
        .transform(const Utf8Decoder())
        .transform(const LineSplitter());

    await for (final line in lines) {
      // ignore comment lines
      if (line.startsWith(':')) continue;

      // chunk finished
      if (line == '') {
        yield SSEEvent(
          id: _fields['id'],
          event: _fields['event'],
          data: _fields['data'],
        );
        _fields.clear();
      }

      // field lines
      else {
        final bp = line.indexOf(':');
        if (bp == -1) {
          // unreachable!
          throw FormatException('invalid chunk line: $line');
        }

        _fields[line.substring(0, bp).toLowerCase()] = line.substring(bp + 1);
      }
    }
  }
}
```

### 自定义扩展

如下, 自定义一个 `MySSEEventTransformer` 将 `SSERaw` 再次解析转换为所需的类型 (`MySSEEvent`).

```dart
class MySSEEvent {
  MySSEEvent.fromSSERaw(SSERaw sseRaw) {
    /** custom logic */
  }
}

class MySSEEventTransformer
    extends StreamTransformerBase<Uint8List, MySSEEvent> {
  @override
  Stream<MySSEEvent> bind(Stream<Uint8List> stream) async* {
    await for (var chunk in stream.transform(SSERawTransformer())) {
      yield MySSEEvent.fromSSERaw(chunk);
    }
  }
}
```

## 客户端

客户端使用 `Dio` 创建请求.

```dart
void main() async {
  final req = Dio(BaseOptions(
    method: 'GET',
    baseUrl: 'http://localhost:23251',
    responseType: ResponseType.stream,
  )).get('/sse');

  final res = (await req).data as ResponseBody;
  res.stream.transform(SSEEventTransformer()).listen((chunk) {
    print("=====\n${DateTime.now()}\n$chunk");
  });
}
```

控制台打印结果如下:

```text
=====
2025-02-13 20:04:49.381852
[SSEEvent]
id:0
event:ev0
data:lorem ipsum
=====
2025-02-13 20:04:50.370718
[SSEEvent]
id:1
event:ev1
data:lorem ipsum
=====
2025-02-13 20:04:51.374278
[SSEEvent]
id:2
event:ev2
data:lorem ipsum
=====
2025-02-13 20:04:52.379938
[SSEEvent]
id:3
event:ev3
data:lorem ipsum
=====
2025-02-13 20:04:53.379949
[SSEEvent]
id:4
event:ev4
data:lorem ipsum
=====
2025-02-13 20:04:54.381883
[SSEEvent]
id:5
event:ev5
data:lorem ipsum
=====
2025-02-13 20:04:55.385309
[SSEEvent]
id:6
event:ev6
data:lorem ipsum
=====
2025-02-13 20:04:56.387710
[SSEEvent]
id:7
event:ev7
data:lorem ipsum
=====
2025-02-13 20:04:57.390990
[SSEEvent]
id:8
event:ev8
data:lorem ipsum
=====
2025-02-13 20:04:58.393164
[SSEEvent]
id:9
event:ev9
data:lorem ipsum
```

## 服务端

使用 `rocket.rs` 启动服务并创建一个简单的SSE接口, 效果为每间隔一秒发送段数据, 共发送十次.

接口代码如下:

```rust
#[get("/sse")]
async fn sse() -> EventStream![] {
    EventStream! {
        let mut i = 0;
        loop {
            if i == 10 {
                break;
            }

            let r =  Event::data("lorem ipsum")
                .id(format!("{i}"))
                .event(format!("ev{i}"))
                .with_comment("comment message ...");
            i += 1;
            yield r;

            sleep(Duration::from_secs(1)).await;
        }
    }
}
```