---
layout: doc

# custom frontmatter properties
# the title of the post, will show up in the post list
topic: 超文本传输协议 (HTTP)
# a brief description of the post, will show up in the post list
brief: 对于刚接触此主题的人来说，超文本传输协议 (HTTP) 是一种应用程序协议，目前是万维网数据通信的基础。
# a list of platforms the post is about, will show up in the 'tag-bar'
#platform:
# a list of programming languages the post is about, will show up in the 'tag-bar'
#language:
# a list of tags the post is about, will show up in the 'tag-bar'
tag:
  - http
  - http protocol

---

# 超文本传输协议 (HTTP)

> 本页介绍超文本传输协议 (HTTP) 及其版本。

## 摘要

`HTTP`是分布式、协作式、超媒体信息系统的**应用层**协议，而`TCP`则解决**传输层**的逻辑。`HTTP`使用`TCP`而不是`UDP`
的原因在于（打开）一个网页必须传送很多数据，而`TCP`协议提供传输控制，按顺序组织数据，和错误纠正。`HTTP`
连接使用的是“请求—响应”的方式，不仅在请求时需要先建立连接，而且需要客户端向服务器发出请求后，服务器端才能回复数据。`HTTP/1.0`
是第一个在通讯中指定版本号的HTTP协议版本，至今仍被广泛采用，特别是在代理服务器中。`HTTP/1.1`中持久连接被**默认**
采用，并能很好地配合代理服务器工作，还支持以管道方式同时发送多个请求，以便降低线路负载，提高传输速度。`HTTP/2.0`在`HTTP/1.x`
的基础上，大幅度的提高了web性能，减少了网络延迟。`HTTP1.0`和`1.1`在之后很长的一段时间内会一直并存，这是网络基础设施更新缓慢所决定的。

## HTTP/0.9 <Badge text="RFC" type="info"/>

HTTP的最初版本没有版本号（后来称为`0.9`以区别于后来的版本）

`HTTP/0.9`非常简单：

- 请求由一行组成，以**唯一**可能的方法`GET`开头，后跟资源的路径。
- 完整的URL不包含在内，因为一旦连接到服务器，协议、服务器和端口就不再需要。

```http request
GET /example.html
```

服务器将在发送响应后关闭**TCP连接**。

``` html
<html>
  example page content
</html>
```

## HTTP/1.0 <Badge text="RFC" type="info"/>

> `HTTP/1.0` **不是**一个标准，只是记录已有实践和模式的一份参考文档，不具有实际的约束力。

随着互联网的发展，原始的HTTP（`HTTP/0.9`）已经不能满足用户的需求。`HTTP/1.0`于**1996**年发布（1991-1995年间，这些是通过尝试和查看的方式引入的。在
**1996**年发布了一份描述常见做法的信息文档。这被称为**RFC 1945**，并定义了`HTTP/1.0`）

- 在每个请求和响应中都包含了版本号，以便于区分不同版本的HTTP。(在`GET`行添加`HTTP/1.0`)
- 在响应的开头也会发送**状态码**。这允许浏览器本身识别请求的成功或失败，并相应地调整其行为。例如，以特定方式更新或使用其本地缓存。
- 请求和响应都可以包含**HTTP头**，以便传输元数据。
- 由于`Content-Type`头的引入，服务器可以发送不同类型的内容，而不仅仅是HTML。

::: details Example1. 纯文本

Request:

```http request
GET /mypage.html HTTP/1.0
User-Agent: NCSA_Mosaic/2.0 (Windows 3.1)
```

Response:

```http response
200 OK
Date: Tue, 15 Nov 1994 08:12:31 GMT
Server: CERN/3.0 libwww/2.17
Content-Type: text/html
<HTML>
A page with an image
  <IMG SRC="/myimage.gif">
</HTML>
```

:::

::: details Example2. 图片

Request:

```http request
GET /myimage.gif HTTP/1.0
User-Agent: NCSA_Mosaic/2.0 (Windows 3.1)
```

Response:

```http response
200 OK
Date: Tue, 15 Nov 1994 08:12:32 GMT
Server: CERN/3.0 libwww/2.17
Content-Type: text/gif
(image content)
```

:::

## HTTP/1.1 <Badge text="Standard" type="tip"/>

> HTTP的第一个标准化版本`HTTP/1.1`于**1997**年初发布，距`HTTP/1.0`仅几个月。

- 新增了`PUT`、`DELETE`、`TRACE`、`OPTIONS`、`CONNECT`等方法
- **TCP连接**可以重复使用，从而节省时间。它不再需要多次打开来显示嵌入在单个原始文档中的资源。
- 添加了**管道**。这允许在第一个请求的答复完全传输之前发送第二个请求。这降低了通信的延迟。
- 允许响应数据分块，利于传输大文件
- 新增了一些缓存控制字段 (如`Cache-Control`、`ETag`、`If-Modified-Since`、`If-Unmodified-Since`、`If-Match`、`If-None-Match`
  等)
- 由于`Host`标头，能够从同一IP托管不同的域。 (在`HTTP/1.1`中强制要求`Host`标头)

## HTTP/2.0 <Badge text="Standard" type="tip"/>

Google 在**2010年代初**实施了实验性协议`SPDY`。`SPDY`定义了响应能力的提高并解决了重复数据传输的问题，成为`HTTP/2`协议的**基础**。

`HTTP/2`协议与`HTTP/1.1`在以下几个方面有所不同：

- 它是**二进制**协议而不是文本协议。 它传输二进制而不是纯文本。
- 这是一个**多路复用协议**。可以通过同一个**TCP连接**发出并行请求，从而消除了`HTTP/1.x`协议的限制。
- 它使用**HPACK压缩算法**压缩头部。 由于这些请求在一组请求中通常是相似的，因此这消除了传输数据的重复和开销。
- 它允许服务器通过称为**服务器推送**的机制将数据填充到**客户端缓存**中。

> **服务器推送**
>
> 想象一下，客人（客户端）向（发送请求）服务员（服务器）要饭菜，然后服务员从餐厅厨师（您的应用程序逻辑）那里得到饭菜，但服务员认为您也需要一瓶水，所以他随餐**一起**带来。这样做的最终结果将是只有**一个**TCP连接和**一个**请求，这将显着降低服务器负载。

## HTTP/3.0 <Badge text="Standard" type="tip"/>

Google 发明了基于**UDP**的`QUIC`（Quick UDP Internet Connections）协议。

`QUIC`旨在为HTTP连接提供更低的延迟。 与`HTTP/2`一样，它是一个多路复用协议，但`HTTP/2`运行在单个**TCP连接**上，因此在TCP层处理的丢包检测和重传可能会阻塞**所有**流。 `QUIC`在`UDP`上运行多个流，并为每个流**独立**实现丢包检测和重传，因此，如果发生错误，则仅阻塞包含该数据包中的数据的流。

- `UDP`是**无序**的，因此不存在队头阻塞问题
- `QUIC`有一套自己的丢包重传和拥塞控制的协议
- HTTPS 握手通常需要**六次**网络交互，`QUIC` 直接将 TLS 和 TCP 合并成了**三次**握手

**2022年6月**，`HTTP/3.0`最终被标准化为 **rfc9114**

## 图解

::: info 1. 请求复用
![请求复用](/http/request_multiplexing.png)
:::

::: info 2. 头部压缩
![头部压缩](/http/hpack.png)
:::

::: info 3. 二进制协议
![二进制协议](/http/binary_protocol.png)
:::

::: info 4. 服务器推送
![服务器推送](/http/server_push.png)
:::

::: info 5. 简单比较

| 协议                      | 请求数 | 加载时间   | 发起者                                             | 
|-------------------------|-----|--------|-------------------------------------------------|
| Http/1.1                | 102 | 12.97s | 第一个请求的发起者是用户/客户端，其余请求由对客户端的响应发起，客户端意识到他需要一些其他资源 |
| Http/2                  | 102 | 11.19s | 第一个请求的发起者是用户/客户端，其余请求由对客户端的响应发起，客户端意识到他需要一些其他资源 |
| Http/2 with Server Push | 102 | 3.17s  | 第一个请求的发起者是用户/客户端，其余请求由服务器推送发起（实际上是一个请求/响应周期）。   |

- Http/1.1
  > 我们可以看到如何通过多个批次（TCP 连接）发出请求。

  ![Http/1.1](/http/waterfall_1.png)

- Http/2
  > 我们可以看到如何通过 2 批（TCP 连接）发出请求。 记下加载时间。 在这种情况下，它比 HTTP/1.1 示例的加载时间要短一些（但不一定总是如此）。 此示例显示了客户端请求的多路复用。

  ![Http/2](/http/waterfall_2.png)

- Http/2 和服务器推送
  > 我们可以看到如何通过 1 个批次（1 个 TCP 连接）发出请求

  ![Http/2 和服务器推送](/http/waterfall_3.png)

- 动画演示
  ![动画演示](/http/compare.gif)

:::

## 参考

- [rfc1945: Hypertext Transfer Protocol -- HTTP/1.0](https://datatracker.ietf.org/doc/html/rfc1945)
- [rfc2616: Hypertext Transfer Protocol -- HTTP/1.1](https://datatracker.ietf.org/doc/html/rfc2616)
- [rfc7230: Hypertext Transfer Protocol (HTTP/1.1): Message Syntax and Routing](https://datatracker.ietf.org/doc/html/rfc7230)
- [rfc7231: Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content](https://datatracker.ietf.org/doc/html/rfc7231)
- [rfc7232: Hypertext Transfer Protocol (HTTP/1.1): Conditional Requests](https://datatracker.ietf.org/doc/html/rfc7232)
- [rfc7233: Hypertext Transfer Protocol (HTTP/1.1): Range Requests](https://datatracker.ietf.org/doc/html/rfc7233)
- [rfc7234: Hypertext Transfer Protocol (HTTP/1.1): Caching](https://datatracker.ietf.org/doc/html/rfc7234)
- [rfc7235: Hypertext Transfer Protocol (HTTP/1.1): Authentication](https://datatracker.ietf.org/doc/html/rfc7235)
- [rfc7540: Hypertext Transfer Protocol Version 2 (HTTP/2)](https://datatracker.ietf.org/doc/html/rfc7540)
- [rfc7541: HPACK: Header Compression for HTTP/2](https://datatracker.ietf.org/doc/html/rfc7541)
- [rfc9114: HTTP/3](https://datatracker.ietf.org/doc/html/rfc9114)
- [Evolution of HTTP | MDN](https://developer.mozilla.org/en-US/docs/web/http/basics_of_http/evolution_of_http)