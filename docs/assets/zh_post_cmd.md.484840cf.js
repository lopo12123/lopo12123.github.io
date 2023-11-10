import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.d2c27d76.js";const g=JSON.parse('{"title":"CMD","description":"","frontmatter":{"layout":"doc","topic":"CMD","brief":"一些常用的cmd命令的整理","platform":["windows"],"tag":["cmd"]},"headers":[],"relativePath":"zh/post/cmd.md","filePath":"zh/post/cmd.md","lastUpdated":1699632085000}'),p={name:"zh/post/cmd.md"},o=l(`<h1 id="cmd" tabindex="-1">CMD <a class="header-anchor" href="#cmd" aria-label="Permalink to &quot;CMD&quot;">​</a></h1><blockquote><p>本页是一些常用cmd命令的集合</p></blockquote><h2 id="通用" tabindex="-1">通用 <a class="header-anchor" href="#通用" aria-label="Permalink to &quot;通用&quot;">​</a></h2><ul><li><p>获取帮助</p><ul><li>使用命令<code>help</code>获取<strong>所有</strong>可用命令及其描述的列表</li><li>使用命令<code>help &lt;command&gt;</code>获取<strong>特定</strong>命令的帮助</li><li>使用命令<code>&lt;command&gt; /?</code>获取<strong>特定</strong>命令的帮助 (效果同上条)</li></ul></li><li><p><code>\\\\</code> 和 <code>/</code></p><ul><li><code>\\\\</code> 一般作为<strong>路径分隔符</strong>使用 (例如 <code>C:\\\\Users\\\\</code>)</li><li><code>/</code> 一般作为<strong>命令参数</strong>使用 (例如 <code>dir /a</code>)</li></ul></li><li><p>文件描述符</p><ul><li><code>0</code> - 标准输入 (默认为键盘)</li><li><code>1</code> - 标准输出 (默认为终端显示器)</li><li><code>2</code> - 标准错误 (默认为终端显示器)</li></ul></li><li><p>重定向和管道</p><ul><li><code>&gt;</code> - <strong>输出</strong>重定向</li><li><code>&gt;&gt;</code> - <strong>输出</strong>重定向 (追加)</li><li><code>&lt;</code> - <strong>输入</strong>重定向</li><li><code>&lt;&lt;</code> - <strong>输入</strong>重定向 (追加)</li><li><code>|</code> - 管道 (将前一个命令的<strong>输出</strong>作为后一个命令的<strong>输入</strong>)</li></ul></li></ul><table><thead><tr><th>命令</th><th>说明</th></tr></thead><tbody><tr><td><code>command&gt;filename</code></td><td>将命令的输出重定向到文件</td></tr><tr><td><code>command 1&gt;filename</code></td><td>将命令的标准输出重定向到文件</td></tr><tr><td><code>command 2&gt;filename</code></td><td>将命令的标准错误重定向到文件</td></tr><tr><td><code>command&gt;filename 2&gt;&amp;1</code></td><td>将命令的标准输出和标准错误重定向到文件</td></tr><tr><td><code>command&gt;&gt;filename</code></td><td>将命令的输出重定向到文件 (追加)</td></tr><tr><td><code>command&lt;filename</code></td><td>将文件作为命令的输入</td></tr><tr><td><code>command&lt;filename1&gt;filename2</code></td><td>将文件1作为命令的输入, 将命令的输出重定向到文件2</td></tr><tr><td><code>command&gt;&amp;m</code></td><td>将文件描述符m作为命令的输出</td></tr><tr><td><code>command&lt;&amp;m</code></td><td>将文件描述符m作为命令的输入</td></tr><tr><td><code>command1|command2</code></td><td>将命令1的输出作为命令2的输入</td></tr></tbody></table><div class="warning custom-block"><p class="custom-block-title">注意</p><ul><li>重定向符号两侧不能有空格，否则会被当作参数</li><li><code>0/1/2</code> 不能作为追加重定向的目标，即 <code>2&gt;&gt;1</code> 是不合法的</li></ul></div><h2 id="errorlevel" tabindex="-1">ERRORLEVEL <a class="header-anchor" href="#errorlevel" aria-label="Permalink to &quot;ERRORLEVEL&quot;">​</a></h2><p>在CMD中，<code>errorlevel</code> 是一个<strong>内部状态</strong>，用于表示上一个命令的返回值。它是一个<strong>0-255</strong>的数字，通常<strong>0</strong>表示成功，<strong>非0</strong>表示失败。</p><h3 id="使用-set-errorlevel-value" tabindex="-1">使用 <code>set errorlevel=&lt;value&gt;</code> <a class="header-anchor" href="#使用-set-errorlevel-value" aria-label="Permalink to &quot;使用 \`set errorlevel=&lt;value&gt;\`&quot;">​</a></h3><p>当命令扩展开启时，执行 <code>echo %errorlevel%</code> 会首先查找 <strong>环境变量</strong> <code>errorlevel</code>，如果没有找到，会再去查找<strong>内部状态</strong> <code>errorlevel</code>。 因此，执行 <code>set errorlevel=&lt;value&gt;</code> 只是设置了一个<strong>环境变量</strong>，不会影响<strong>内部状态</strong> <code>errorlevel</code></p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-5rtEi" id="tab-3GU9Bll" checked="checked"><label for="tab-3GU9Bll">环境变量</label><input type="radio" name="group-5rtEi" id="tab-Bo8-GAn"><label for="tab-Bo8-GAn">内部状态</label></div><div class="blocks"><div class="language-bat vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">bat</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// test.bat</span></span>
<span class="line"><span style="color:#F97583;">set</span><span style="color:#E1E4E8;"> errorlevel</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> %errorlevel%</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">// output</span></span>
<span class="line"><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">  // 这是环境变量的值</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// test.bat</span></span>
<span class="line"><span style="color:#D73A49;">set</span><span style="color:#24292E;"> errorlevel</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> %errorlevel%</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">// output</span></span>
<span class="line"><span style="color:#005CC5;">1</span><span style="color:#24292E;">  // 这是环境变量的值</span></span></code></pre></div><div class="language-bat vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bat</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// test.bat</span></span>
<span class="line"><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> %errorlevel%</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">// output</span></span>
<span class="line"><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">  // 这是内部状态的值</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// test.bat</span></span>
<span class="line"><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> %errorlevel%</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">// output</span></span>
<span class="line"><span style="color:#005CC5;">0</span><span style="color:#24292E;">  // 这是内部状态的值</span></span></code></pre></div></div></div><h3 id="和-if-一起使用" tabindex="-1">和 <code>if</code> 一起使用 <a class="header-anchor" href="#和-if-一起使用" aria-label="Permalink to &quot;和 \`if\` 一起使用&quot;">​</a></h3><ul><li><code>if errorlevel &lt;number&gt; &lt;command&gt;</code> 会<strong>始终</strong>使用内部状态 <code>errorlevel</code> 进行判断，设置环境变量 <code>errorlevel</code> 对它<strong>没有影响</strong>。</li><li><code>if %errorlevel% == &lt;string&gt; &lt;command&gt;</code> 使用变量展开进行比较，因此<strong>无法</strong>确定使用的 <code>%errorlevel%</code> 是环境变量还是内部状态，不推荐使用这种方式。</li></ul><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-KHhoi" id="tab-Tvgyv5X" checked="checked"><label for="tab-Tvgyv5X">判断 1.2</label><input type="radio" name="group-KHhoi" id="tab-DPIODAt"><label for="tab-DPIODAt">判断 1.2</label><input type="radio" name="group-KHhoi" id="tab-lu7CVk4"><label for="tab-lu7CVk4">判断 2.1</label><input type="radio" name="group-KHhoi" id="tab-YeFRkoh"><label for="tab-YeFRkoh">判断 2.2</label></div><div class="blocks"><div class="language-bat vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">bat</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// test.bat</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">errorlevel</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> two--%errorlevel%</span></span>
<span class="line"><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">errorlevel</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> one--%errorlevel%</span></span>
<span class="line"><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> zero--%errorlevel%</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">// output</span></span>
<span class="line"><span style="color:#E1E4E8;">zero--0  // 判断：内部状态，输出：内部状态</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// test.bat</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">errorlevel</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> two--%errorlevel%</span></span>
<span class="line"><span style="color:#24292E;">) </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">errorlevel</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> one--%errorlevel%</span></span>
<span class="line"><span style="color:#24292E;">) </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> zero--%errorlevel%</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">// output</span></span>
<span class="line"><span style="color:#24292E;">zero--0  // 判断：内部状态，输出：内部状态</span></span></code></pre></div><div class="language-bat vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bat</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// test.bat</span></span>
<span class="line"><span style="color:#F97583;">set</span><span style="color:#E1E4E8;"> errorlevel</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">errorlevel</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> two--%errorlevel%</span></span>
<span class="line"><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">errorlevel</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> one--%errorlevel%</span></span>
<span class="line"><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> zero--%errorlevel%</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">// output</span></span>
<span class="line"><span style="color:#E1E4E8;">zero--2  // 判断：内部状态，输出：环境变量</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// test.bat</span></span>
<span class="line"><span style="color:#D73A49;">set</span><span style="color:#24292E;"> errorlevel</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">errorlevel</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> two--%errorlevel%</span></span>
<span class="line"><span style="color:#24292E;">) </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">errorlevel</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> one--%errorlevel%</span></span>
<span class="line"><span style="color:#24292E;">) </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> zero--%errorlevel%</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">// output</span></span>
<span class="line"><span style="color:#24292E;">zero--2  // 判断：内部状态，输出：环境变量</span></span></code></pre></div><div class="language-bat vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bat</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// test.bat</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> %errorlevel% </span><span style="color:#F97583;">geq</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> two--%errorlevel%</span></span>
<span class="line"><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> %errorlevel% </span><span style="color:#F97583;">geq</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> one--%errorlevel%</span></span>
<span class="line"><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> zero--%errorlevel%</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">// output</span></span>
<span class="line"><span style="color:#E1E4E8;">zero--0  // 判断：内部状态，输出：内部状态</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// test.bat</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> %errorlevel% </span><span style="color:#D73A49;">geq</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> two--%errorlevel%</span></span>
<span class="line"><span style="color:#24292E;">) </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> %errorlevel% </span><span style="color:#D73A49;">geq</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> one--%errorlevel%</span></span>
<span class="line"><span style="color:#24292E;">) </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> zero--%errorlevel%</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">// output</span></span>
<span class="line"><span style="color:#24292E;">zero--0  // 判断：内部状态，输出：内部状态</span></span></code></pre></div><div class="language-bat vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bat</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// test.bat</span></span>
<span class="line"><span style="color:#F97583;">set</span><span style="color:#E1E4E8;"> errorlevel</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> %errorlevel% </span><span style="color:#F97583;">geq</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> two--%errorlevel%</span></span>
<span class="line"><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> %errorlevel% </span><span style="color:#F97583;">geq</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> one--%errorlevel%</span></span>
<span class="line"><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> zero--%errorlevel%</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">// output</span></span>
<span class="line"><span style="color:#E1E4E8;">two--2  // 判断：环境变量，输出：环境变量</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// test.bat</span></span>
<span class="line"><span style="color:#D73A49;">set</span><span style="color:#24292E;"> errorlevel</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> %errorlevel% </span><span style="color:#D73A49;">geq</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> two--%errorlevel%</span></span>
<span class="line"><span style="color:#24292E;">) </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> %errorlevel% </span><span style="color:#D73A49;">geq</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> one--%errorlevel%</span></span>
<span class="line"><span style="color:#24292E;">) </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> zero--%errorlevel%</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">// output</span></span>
<span class="line"><span style="color:#24292E;">two--2  // 判断：环境变量，输出：环境变量</span></span></code></pre></div></div></div><h2 id="命令-setlocal-endlocal" tabindex="-1">命令：setlocal/endlocal <a class="header-anchor" href="#命令-setlocal-endlocal" aria-label="Permalink to &quot;命令：setlocal/endlocal&quot;">​</a></h2><p>开始在批处理文件中本地化环境变量。本地化将继续，直到遇到匹配的 <code>endlocal</code> 命令或到达批处理文件的末尾。</p><p><code>setlocal [enableextensions | disableextensions] [enabledelayedexpansion | disabledelayedexpansion]</code></p><table><thead><tr><th>参数</th><th>说明</th></tr></thead><tbody><tr><td><code>enableextensions</code>*</td><td>启用命令扩展，直到遇到匹配的endlocal命令</td></tr><tr><td><code>disableextensions</code></td><td>禁用命令扩展，直到遇到匹配的endlocal命令</td></tr><tr><td><code>enabledelayedexpansion</code></td><td>启用延迟环境变量扩展，直到遇到匹配的endlocal命令</td></tr><tr><td><code>disabledelayedexpansion</code>*</td><td>禁用延迟环境变量扩展，直到遇到匹配的endlocal命令</td></tr></tbody></table><blockquote><p><code>*</code> 为默认值</p></blockquote><h3 id="延迟扩展" tabindex="-1"><em>延迟扩展</em> <a class="header-anchor" href="#延迟扩展" aria-label="Permalink to &quot;_延迟扩展_&quot;">​</a></h3><p>CMD在解释命令时，首先会读取命令行中一条<strong>完整的</strong>命令，然后对其进行一些命令格式的匹配操作。 如果命令中使用了变量（如<code>%name%</code>），当CMD在对这条命令进行格式匹配时会找到变量对应的值，用变量的值<strong>替换</strong>这个变量，再执行这个<strong>替换后的</strong>命令。 这个替换值的过程,就叫做<strong>变量扩展</strong>。</p><p>然而，当我们使用 <code>for</code>（循环） 和 <code>if</code>（代码块）时，变量扩展会在<strong>循环/代码块</strong>开始<strong>前</strong>就已经完成，循环/代码块中的值在运行时<strong>不会被更新</strong>。在这种情况下，我们可以使用 <code>enabledelayedexpansion</code> 来<strong>延迟</strong>变量扩展直到命令被执行。</p><div class="warning custom-block"><p class="custom-block-title">注意</p><p>当启用 <code>enabledelayedexpansion</code> 时，使用 <code>!</code> 而不是 <code>%</code> 来访问变量。即 <code>!name!</code> 而不是 <code>%name%</code>。</p></div><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-SfMXd" id="tab-X-4l0qV" checked="checked"><label for="tab-X-4l0qV">no delayed expansion1</label><input type="radio" name="group-SfMXd" id="tab-WF_cjym"><label for="tab-WF_cjym">no delayed expansion2</label><input type="radio" name="group-SfMXd" id="tab-J981maM"><label for="tab-J981maM">with delayed expansion</label></div><div class="blocks"><div class="language-bat vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">bat</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// loop.bat</span></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> /l </span><span style="color:#FFAB70;">%%i</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> (1,1,5) </span><span style="color:#F97583;">do</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">set</span><span style="color:#E1E4E8;"> ptr</span><span style="color:#F97583;">=</span><span style="color:#FFAB70;">%%i</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> %ptr%</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">// output</span></span>
<span class="line"><span style="color:#F97583;">ECHO</span><span style="color:#E1E4E8;"> 处于关闭状态。  // 当变量值为空就会输出这个</span></span>
<span class="line"><span style="color:#F97583;">ECHO</span><span style="color:#E1E4E8;"> 处于关闭状态。</span></span>
<span class="line"><span style="color:#F97583;">ECHO</span><span style="color:#E1E4E8;"> 处于关闭状态。</span></span>
<span class="line"><span style="color:#F97583;">ECHO</span><span style="color:#E1E4E8;"> 处于关闭状态。</span></span>
<span class="line"><span style="color:#F97583;">ECHO</span><span style="color:#E1E4E8;"> 处于关闭状态。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// loop.bat</span></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> /l </span><span style="color:#E36209;">%%i</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> (1,1,5) </span><span style="color:#D73A49;">do</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">set</span><span style="color:#24292E;"> ptr</span><span style="color:#D73A49;">=</span><span style="color:#E36209;">%%i</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> %ptr%</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">// output</span></span>
<span class="line"><span style="color:#D73A49;">ECHO</span><span style="color:#24292E;"> 处于关闭状态。  // 当变量值为空就会输出这个</span></span>
<span class="line"><span style="color:#D73A49;">ECHO</span><span style="color:#24292E;"> 处于关闭状态。</span></span>
<span class="line"><span style="color:#D73A49;">ECHO</span><span style="color:#24292E;"> 处于关闭状态。</span></span>
<span class="line"><span style="color:#D73A49;">ECHO</span><span style="color:#24292E;"> 处于关闭状态。</span></span>
<span class="line"><span style="color:#D73A49;">ECHO</span><span style="color:#24292E;"> 处于关闭状态。</span></span></code></pre></div><div class="language-bat vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bat</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// loop.bat</span></span>
<span class="line"><span style="color:#F97583;">set</span><span style="color:#E1E4E8;"> ptr</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> /l </span><span style="color:#FFAB70;">%%i</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> (1,1,5) </span><span style="color:#F97583;">do</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">set</span><span style="color:#E1E4E8;"> ptr</span><span style="color:#F97583;">=</span><span style="color:#FFAB70;">%%i</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> %ptr%</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">// output</span></span>
<span class="line"><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#79B8FF;">0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// loop.bat</span></span>
<span class="line"><span style="color:#D73A49;">set</span><span style="color:#24292E;"> ptr</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> /l </span><span style="color:#E36209;">%%i</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> (1,1,5) </span><span style="color:#D73A49;">do</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">set</span><span style="color:#24292E;"> ptr</span><span style="color:#D73A49;">=</span><span style="color:#E36209;">%%i</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> %ptr%</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">// output</span></span>
<span class="line"><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#005CC5;">0</span></span></code></pre></div><div class="language-bat vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bat</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// loop.bat</span></span>
<span class="line"><span style="color:#F97583;">@echo</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">off</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">setlocal</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">enabledelayedexpansion</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">rem</span><span style="color:#6A737D;"> set ptr=0  // 这行是否注释对结果没有影响</span></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> /l </span><span style="color:#FFAB70;">%%i</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> (1,1,5) </span><span style="color:#F97583;">do</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">set</span><span style="color:#E1E4E8;"> ptr</span><span style="color:#F97583;">=</span><span style="color:#FFAB70;">%%i</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> !ptr!</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">endlocal</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">// output</span></span>
<span class="line"><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#79B8FF;">2</span></span>
<span class="line"><span style="color:#79B8FF;">3</span></span>
<span class="line"><span style="color:#79B8FF;">4</span></span>
<span class="line"><span style="color:#79B8FF;">5</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// loop.bat</span></span>
<span class="line"><span style="color:#D73A49;">@echo</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">off</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">setlocal</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">enabledelayedexpansion</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">rem</span><span style="color:#6A737D;"> set ptr=0  // 这行是否注释对结果没有影响</span></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> /l </span><span style="color:#E36209;">%%i</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> (1,1,5) </span><span style="color:#D73A49;">do</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">set</span><span style="color:#24292E;"> ptr</span><span style="color:#D73A49;">=</span><span style="color:#E36209;">%%i</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> !ptr!</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">endlocal</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">// output</span></span>
<span class="line"><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#005CC5;">2</span></span>
<span class="line"><span style="color:#005CC5;">3</span></span>
<span class="line"><span style="color:#005CC5;">4</span></span>
<span class="line"><span style="color:#005CC5;">5</span></span></code></pre></div></div></div><h2 id="命令-set-环境变量" tabindex="-1">命令：set（环境变量） <a class="header-anchor" href="#命令-set-环境变量" aria-label="Permalink to &quot;命令：set（环境变量）&quot;">​</a></h2><ul><li><code>set</code> - 显示所有环境变量</li><li><code>set &lt;variable&gt;</code> - 显示指定环境变量的值</li><li><code>set &lt;variable&gt;=&lt;value&gt;</code> - 设置指定环境变量的值</li><li><code>set /a &lt;variable&gt;=&lt;expression&gt;</code> - 设置指定环境变量的值为表达式的计算结果</li><li><code>set /p &lt;variable&gt;=&lt;prompt&gt;</code> - 设置指定环境变量的值为用户输入的值</li><li><code>%&lt;variable&gt;%</code> - 使用环境变量的值</li></ul><div class="warning custom-block"><p class="custom-block-title">注意</p><ul><li>环境变量名不区分大小写，即 <code>set PATH=xxx</code> 和 <code>set path=xxx</code> 效果相同</li><li><code>=</code>两边不能包含空格，否则会被当作参数解析，例如 <code>set PATH = xxx</code> 会被当作 <code>set PATH</code> 命令</li></ul></div><h2 id="命令-echo" tabindex="-1">命令：echo <a class="header-anchor" href="#命令-echo" aria-label="Permalink to &quot;命令：echo&quot;">​</a></h2><ul><li><code>echo &lt;message&gt;</code> - 显示指定的消息</li><li><code>echo on</code> / <code>echo off</code> - 启用/禁用<strong>批处理文件</strong>中命令的显示</li></ul><div class="warning custom-block"><p class="custom-block-title">注意</p><ul><li>要显示空行，可以使用 <code>echo.</code></li><li>要显示特殊字符(包括 <code>|</code>, <code>&amp;</code>, <code>&lt;</code>, <code>&gt;</code>, <code>^</code>)，在字符前面加上 <code>^</code> 进行转义</li></ul></div><h2 id="命令-goto" tabindex="-1">命令：goto <a class="header-anchor" href="#命令-goto" aria-label="Permalink to &quot;命令：goto&quot;">​</a></h2><blockquote><p>特殊标签 <code>:eof</code> 表示文件结束，可以使用 <code>goto :eof</code> 结束批处理文件的执行</p></blockquote><ul><li><code>goto &lt;label&gt;</code> - 跳转到指定标签处继续执行</li></ul><div class="tip custom-block"><p class="custom-block-title"><code>&lt;label&gt;</code> 支持使用变量拼接</p><div class="language-bat vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bat</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">@echo</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">off</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">choice</span><span style="color:#E1E4E8;"> /m </span><span style="color:#9ECBFF;">&quot;select your plan&quot;</span><span style="color:#E1E4E8;"> /c </span><span style="color:#79B8FF;">123</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">rem</span><span style="color:#6A737D;"> 这里使用变量拼接</span></span>
<span class="line"><span style="color:#F97583;">goto</span><span style="color:#E1E4E8;"> :</span><span style="color:#F97583;">plan:%errorlevel%</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">:</span><span style="color:#F97583;">plan:1</span></span>
<span class="line"><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> this is plan1</span></span>
<span class="line"><span style="color:#F97583;">goto</span><span style="color:#E1E4E8;"> :</span><span style="color:#F97583;">eof</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">:</span><span style="color:#F97583;">plan:2</span></span>
<span class="line"><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> this is plan2</span></span>
<span class="line"><span style="color:#F97583;">goto</span><span style="color:#E1E4E8;"> :</span><span style="color:#F97583;">eof</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">:</span><span style="color:#F97583;">plan:3</span></span>
<span class="line"><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> this is plan3</span></span>
<span class="line"><span style="color:#F97583;">goto</span><span style="color:#E1E4E8;"> :</span><span style="color:#F97583;">eof</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">@echo</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">off</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">choice</span><span style="color:#24292E;"> /m </span><span style="color:#032F62;">&quot;select your plan&quot;</span><span style="color:#24292E;"> /c </span><span style="color:#005CC5;">123</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">rem</span><span style="color:#6A737D;"> 这里使用变量拼接</span></span>
<span class="line"><span style="color:#D73A49;">goto</span><span style="color:#24292E;"> :</span><span style="color:#D73A49;">plan:%errorlevel%</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">:</span><span style="color:#D73A49;">plan:1</span></span>
<span class="line"><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> this is plan1</span></span>
<span class="line"><span style="color:#D73A49;">goto</span><span style="color:#24292E;"> :</span><span style="color:#D73A49;">eof</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">:</span><span style="color:#D73A49;">plan:2</span></span>
<span class="line"><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> this is plan2</span></span>
<span class="line"><span style="color:#D73A49;">goto</span><span style="color:#24292E;"> :</span><span style="color:#D73A49;">eof</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">:</span><span style="color:#D73A49;">plan:3</span></span>
<span class="line"><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> this is plan3</span></span>
<span class="line"><span style="color:#D73A49;">goto</span><span style="color:#24292E;"> :</span><span style="color:#D73A49;">eof</span></span></code></pre></div></div><h2 id="命令-call" tabindex="-1">命令：call <a class="header-anchor" href="#命令-call" aria-label="Permalink to &quot;命令：call&quot;">​</a></h2><ul><li><code>call path-to-batch &lt;arguments&gt;</code> -- 调用另一个批处理文件</li><li><code>call :label &lt;arguments&gt;</code> -- 调用当前批处理文件中的另一个标签</li><li>使用 <code>%0</code>、<code>%1</code>、<code>%2</code> ... 获取参数，或使用 <code>%*</code> 获取所有参数</li><li>一般 <code>%0</code> 为当前批处理文件的路径或标签名，<code>%1</code> 开始为传入的参数</li></ul><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-S0UCq" id="tab-zaILtqW" checked="checked"><label for="tab-zaILtqW">以下代码会输出什么?</label><input type="radio" name="group-S0UCq" id="tab-n-8fsv5"><label for="tab-n-8fsv5">步骤</label><input type="radio" name="group-S0UCq" id="tab-xIV87Wo"><label for="tab-xIV87Wo">答案</label></div><div class="blocks"><div class="language-bat vp-adaptive-theme active line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bat</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">@echo</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">off</span></span>
<span class="line"><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> start</span></span>
<span class="line"><span style="color:#F97583;">call</span><span style="color:#E1E4E8;"> :</span><span style="color:#F97583;">tag2</span></span>
<span class="line"><span style="color:#F97583;">call</span><span style="color:#E1E4E8;"> :</span><span style="color:#F97583;">tag1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">:</span><span style="color:#F97583;">tag1</span></span>
<span class="line"><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> tag1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">:</span><span style="color:#F97583;">tag2</span></span>
<span class="line"><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> tag2</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">@echo</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">off</span></span>
<span class="line"><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> start</span></span>
<span class="line"><span style="color:#D73A49;">call</span><span style="color:#24292E;"> :</span><span style="color:#D73A49;">tag2</span></span>
<span class="line"><span style="color:#D73A49;">call</span><span style="color:#24292E;"> :</span><span style="color:#D73A49;">tag1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">:</span><span style="color:#D73A49;">tag1</span></span>
<span class="line"><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> tag1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">:</span><span style="color:#D73A49;">tag2</span></span>
<span class="line"><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> tag2</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><div class="language-bat vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bat</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">@echo</span><span style="color:#E1E4E8;"> off   </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> start   </span><span style="color:#79B8FF;">2</span></span>
<span class="line"><span style="color:#F97583;">call</span><span style="color:#E1E4E8;"> :</span><span style="color:#F97583;">tag2</span><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">3</span></span>
<span class="line"><span style="color:#F97583;">call</span><span style="color:#E1E4E8;"> :</span><span style="color:#F97583;">tag1</span><span style="color:#E1E4E8;">       </span><span style="color:#79B8FF;">6</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">:</span><span style="color:#F97583;">tag1</span><span style="color:#E1E4E8;">             </span><span style="color:#79B8FF;">7</span><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">11</span></span>
<span class="line"><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> tag1          </span><span style="color:#79B8FF;">8</span><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">12</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">:</span><span style="color:#F97583;">tag2</span><span style="color:#E1E4E8;">          </span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">9</span><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">13</span></span>
<span class="line"><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> tag2       </span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">14</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">@echo</span><span style="color:#24292E;"> off   </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> start   </span><span style="color:#005CC5;">2</span></span>
<span class="line"><span style="color:#D73A49;">call</span><span style="color:#24292E;"> :</span><span style="color:#D73A49;">tag2</span><span style="color:#24292E;">    </span><span style="color:#005CC5;">3</span></span>
<span class="line"><span style="color:#D73A49;">call</span><span style="color:#24292E;"> :</span><span style="color:#D73A49;">tag1</span><span style="color:#24292E;">       </span><span style="color:#005CC5;">6</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">:</span><span style="color:#D73A49;">tag1</span><span style="color:#24292E;">             </span><span style="color:#005CC5;">7</span><span style="color:#24292E;">    </span><span style="color:#005CC5;">11</span></span>
<span class="line"><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> tag1          </span><span style="color:#005CC5;">8</span><span style="color:#24292E;">     </span><span style="color:#005CC5;">12</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">:</span><span style="color:#D73A49;">tag2</span><span style="color:#24292E;">          </span><span style="color:#005CC5;">4</span><span style="color:#24292E;">    </span><span style="color:#005CC5;">9</span><span style="color:#24292E;">      </span><span style="color:#005CC5;">13</span></span>
<span class="line"><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> tag2       </span><span style="color:#005CC5;">5</span><span style="color:#24292E;">    </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">      </span><span style="color:#005CC5;">14</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">start   step 2</span></span>
<span class="line"><span style="color:#e1e4e8;">tag2    step 5</span></span>
<span class="line"><span style="color:#e1e4e8;">tag1    step 8</span></span>
<span class="line"><span style="color:#e1e4e8;">tag2    step 10</span></span>
<span class="line"><span style="color:#e1e4e8;">tag1    step 12</span></span>
<span class="line"><span style="color:#e1e4e8;">tag2    step 14</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">start   step 2</span></span>
<span class="line"><span style="color:#24292e;">tag2    step 5</span></span>
<span class="line"><span style="color:#24292e;">tag1    step 8</span></span>
<span class="line"><span style="color:#24292e;">tag2    step 10</span></span>
<span class="line"><span style="color:#24292e;">tag1    step 12</span></span>
<span class="line"><span style="color:#24292e;">tag2    step 14</span></span></code></pre></div></div></div><h2 id="命令-for" tabindex="-1">命令：for <a class="header-anchor" href="#命令-for" aria-label="Permalink to &quot;命令：for&quot;">​</a></h2><ul><li>基本用法: <ul><li><code>for &lt;variable&gt; in (&lt;set&gt;) do &lt;command&gt; [&lt;commandlineoptions&gt;]</code></li></ul></li><li>遍历一定范围的值: <ul><li><code>for /l &lt;variable&gt; in (&lt;start#&gt;,&lt;step#&gt;,&lt;end#&gt;) do &lt;command&gt; [&lt;commandlinepptions&gt;]</code></li></ul></li><li>遍历并解析文件: <ul><li><code>for /f [&lt;parsingkeywords&gt;] &lt;variable&gt; in (&lt;set&gt;) do &lt;command&gt; [&lt;commandlinepptions&gt;]</code></li><li><code>for /f [&lt;parsingkeywords&gt;] &lt;variable&gt; in (&lt;literalstring&gt;) do &lt;command&gt; [&lt;commandlinepptions&gt;]</code></li><li><code>for /f [&lt;parsingkeywords&gt;] &lt;variable&gt; in (&#39;&lt;command&gt;&#39;) do &lt;command&gt; [&lt;commandlinepptions&gt;]</code></li></ul></li></ul><table><thead><tr><th><code>&lt;parsingkeywords&gt;</code></th><th>说明</th></tr></thead><tbody><tr><td>eol=<code>&lt;c&gt;</code></td><td>指定行结束字符（仅一个字符）</td></tr><tr><td>skip=<code>&lt;n&gt;</code></td><td>跳过文件的前 <code>&lt;n&gt;</code> 行</td></tr><tr><td>delims=<code>&lt;xxx&gt;</code></td><td>指定分隔符（默认为 <code>space</code> 和 <code>tab</code>）</td></tr><tr><td>tokens=<code>&lt;x,y,m-n&gt;</code></td><td>指定每行中的哪些标记要传递到每次迭代的for循环</td></tr><tr><td>usebackq</td><td>指定将反引号字符串作为命令运行，使用单引号字符串作为文字字符串或包含空格的文件名</td></tr></tbody></table><div class="tip custom-block"><p class="custom-block-title"><code>&lt;variable&gt;</code> 规则</p><ul><li>在命令提示符中，使用 <code>%&lt;name&gt;</code> 访问变量</li><li>在批处理文件中，使用 <code>%%&lt;name&gt;</code> 访问变量</li><li><code>&lt;literalstring&gt;</code> 被视为文件中的单行输入</li><li>当使用 <code>/f &lt;parsingkeywords&gt;</code> 且 <code>parsingkeywords</code> 包含 <code>tokens</code> 时，会自动递增创建后续变量 (见 <strong>eg1</strong>)</li></ul></div><table><thead><tr><th><code>for /f ... &lt;variable&gt;</code></th><th>使用 <code>usebackq</code></th><th>不使用 <code>usebackq</code></th></tr></thead><tbody><tr><td>文件</td><td>无包裹</td><td>无包裹</td></tr><tr><td>字符串</td><td>单引号 <code>&#39;</code></td><td>双引号 <code>&quot;</code></td></tr><tr><td>命令</td><td>反引号 \`\`\`</td><td>单引号 <code>&#39;</code></td></tr></tbody></table><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-9I15W" id="tab-p1Phd_1" checked="checked"><label for="tab-p1Phd_1">基础</label><input type="radio" name="group-9I15W" id="tab-sgP2daz"><label for="tab-sgP2daz">范围</label><input type="radio" name="group-9I15W" id="tab-wG8rOJ-"><label for="tab-wG8rOJ-">文件</label><input type="radio" name="group-9I15W" id="tab-q-RkBlQ"><label for="tab-q-RkBlQ">命令</label><input type="radio" name="group-9I15W" id="tab-4dId1uG"><label for="tab-4dId1uG">eg1</label></div><div class="blocks"><div class="language-bat vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">bat</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// fruit.bat</span></span>
<span class="line"><span style="color:#F97583;">@echo</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">off</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">%%c</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> (apple orange banana) </span><span style="color:#F97583;">do</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> i like </span><span style="color:#FFAB70;">%%c</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">// output</span></span>
<span class="line"><span style="color:#E1E4E8;">i like apple</span></span>
<span class="line"><span style="color:#E1E4E8;">i like orange</span></span>
<span class="line"><span style="color:#E1E4E8;">i like banana</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// fruit.bat</span></span>
<span class="line"><span style="color:#D73A49;">@echo</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">off</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> </span><span style="color:#E36209;">%%c</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> (apple orange banana) </span><span style="color:#D73A49;">do</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> i like </span><span style="color:#E36209;">%%c</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">// output</span></span>
<span class="line"><span style="color:#24292E;">i like apple</span></span>
<span class="line"><span style="color:#24292E;">i like orange</span></span>
<span class="line"><span style="color:#24292E;">i like banana</span></span></code></pre></div><div class="language-bat vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bat</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// countdown.bat</span></span>
<span class="line"><span style="color:#F97583;">@echo</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">off</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> let&#39;s count down for </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;"> seconds</span></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> /l </span><span style="color:#FFAB70;">%%c</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> (10,-1,0) </span><span style="color:#F97583;">do</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">%%c</span><span style="color:#E1E4E8;"> seconds left</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">timeout</span><span style="color:#E1E4E8;"> /t </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> /nobreak </span><span style="color:#F97583;">&gt;</span><span style="color:#79B8FF;">nul</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">// output</span></span>
<span class="line"><span style="color:#E1E4E8;">let&#39;s count down </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;"> seconds</span></span>
<span class="line"><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;"> seconds left  // 以下每秒输出一行                </span></span>
<span class="line"><span style="color:#79B8FF;">9</span><span style="color:#E1E4E8;"> seconds left</span></span>
<span class="line"><span style="color:#79B8FF;">8</span><span style="color:#E1E4E8;"> seconds left</span></span>
<span class="line"><span style="color:#79B8FF;">7</span><span style="color:#E1E4E8;"> seconds left</span></span>
<span class="line"><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;"> seconds left</span></span>
<span class="line"><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;"> seconds left</span></span>
<span class="line"><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;"> seconds left</span></span>
<span class="line"><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> seconds left</span></span>
<span class="line"><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> seconds left</span></span>
<span class="line"><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> seconds left</span></span>
<span class="line"><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> seconds left</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// countdown.bat</span></span>
<span class="line"><span style="color:#D73A49;">@echo</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">off</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> let&#39;s count down for </span><span style="color:#005CC5;">10</span><span style="color:#24292E;"> seconds</span></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> /l </span><span style="color:#E36209;">%%c</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> (10,-1,0) </span><span style="color:#D73A49;">do</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> </span><span style="color:#E36209;">%%c</span><span style="color:#24292E;"> seconds left</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">timeout</span><span style="color:#24292E;"> /t </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> /nobreak </span><span style="color:#D73A49;">&gt;</span><span style="color:#005CC5;">nul</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">// output</span></span>
<span class="line"><span style="color:#24292E;">let&#39;s count down </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span><span style="color:#24292E;"> seconds</span></span>
<span class="line"><span style="color:#005CC5;">10</span><span style="color:#24292E;"> seconds left  // 以下每秒输出一行                </span></span>
<span class="line"><span style="color:#005CC5;">9</span><span style="color:#24292E;"> seconds left</span></span>
<span class="line"><span style="color:#005CC5;">8</span><span style="color:#24292E;"> seconds left</span></span>
<span class="line"><span style="color:#005CC5;">7</span><span style="color:#24292E;"> seconds left</span></span>
<span class="line"><span style="color:#005CC5;">6</span><span style="color:#24292E;"> seconds left</span></span>
<span class="line"><span style="color:#005CC5;">5</span><span style="color:#24292E;"> seconds left</span></span>
<span class="line"><span style="color:#005CC5;">4</span><span style="color:#24292E;"> seconds left</span></span>
<span class="line"><span style="color:#005CC5;">3</span><span style="color:#24292E;"> seconds left</span></span>
<span class="line"><span style="color:#005CC5;">2</span><span style="color:#24292E;"> seconds left</span></span>
<span class="line"><span style="color:#005CC5;">1</span><span style="color:#24292E;"> seconds left</span></span>
<span class="line"><span style="color:#005CC5;">0</span><span style="color:#24292E;"> seconds left</span></span></code></pre></div><div class="language-bat vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bat</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// groups.txt</span></span>
<span class="line"><span style="color:#E1E4E8;">alice bob carol</span></span>
<span class="line"><span style="color:#E1E4E8;">david edward frank</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">// group.bat</span></span>
<span class="line"><span style="color:#F97583;">@echo</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">off</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> each group has </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> students</span></span>
<span class="line"><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;">.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> /f </span><span style="color:#9ECBFF;">&quot;delims=&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">%%g</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> (students.txt) </span><span style="color:#F97583;">do</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> next group:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">%%s</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">%%g</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">do</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">%%s</span></span>
<span class="line"><span style="color:#E1E4E8;">    )</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;">.</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">// output</span></span>
<span class="line"><span style="color:#E1E4E8;">hello alice!</span></span>
<span class="line"><span style="color:#E1E4E8;">hello bob!</span></span>
<span class="line"><span style="color:#E1E4E8;">hello carol!</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// groups.txt</span></span>
<span class="line"><span style="color:#24292E;">alice bob carol</span></span>
<span class="line"><span style="color:#24292E;">david edward frank</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">// group.bat</span></span>
<span class="line"><span style="color:#D73A49;">@echo</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">off</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> each group has </span><span style="color:#005CC5;">3</span><span style="color:#24292E;"> students</span></span>
<span class="line"><span style="color:#D73A49;">echo</span><span style="color:#24292E;">.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> /f </span><span style="color:#032F62;">&quot;delims=&quot;</span><span style="color:#24292E;"> </span><span style="color:#E36209;">%%g</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> (students.txt) </span><span style="color:#D73A49;">do</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> next group:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> </span><span style="color:#E36209;">%%s</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">%%g</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">do</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> </span><span style="color:#E36209;">%%s</span></span>
<span class="line"><span style="color:#24292E;">    )</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">echo</span><span style="color:#24292E;">.</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">// output</span></span>
<span class="line"><span style="color:#24292E;">hello alice!</span></span>
<span class="line"><span style="color:#24292E;">hello bob!</span></span>
<span class="line"><span style="color:#24292E;">hello carol!</span></span></code></pre></div><div class="language-bat vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bat</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// scan.bat</span></span>
<span class="line"><span style="color:#F97583;">@echo</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">off</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> let&#39;s see what&#39;s in the directory</span></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> /f </span><span style="color:#FFAB70;">%%c</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> (&#39;dir /b&#39;) </span><span style="color:#F97583;">do</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> we have </span><span style="color:#FFAB70;">%%c</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">// output</span></span>
<span class="line"><span style="color:#E1E4E8;">let&#39;s see what&#39;s in the directory</span></span>
<span class="line"><span style="color:#E1E4E8;">we have scan.bat</span></span>
<span class="line"><span style="color:#E1E4E8;">we have file1.js</span></span>
<span class="line"><span style="color:#E1E4E8;">we have file2.ts</span></span>
<span class="line"><span style="color:#E1E4E8;">we have file3.rs</span></span>
<span class="line"><span style="color:#E1E4E8;">we have file4.md</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// scan.bat</span></span>
<span class="line"><span style="color:#D73A49;">@echo</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">off</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> let&#39;s see what&#39;s in the directory</span></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> /f </span><span style="color:#E36209;">%%c</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> (&#39;dir /b&#39;) </span><span style="color:#D73A49;">do</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> we have </span><span style="color:#E36209;">%%c</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">// output</span></span>
<span class="line"><span style="color:#24292E;">let&#39;s see what&#39;s in the directory</span></span>
<span class="line"><span style="color:#24292E;">we have scan.bat</span></span>
<span class="line"><span style="color:#24292E;">we have file1.js</span></span>
<span class="line"><span style="color:#24292E;">we have file2.ts</span></span>
<span class="line"><span style="color:#24292E;">we have file3.rs</span></span>
<span class="line"><span style="color:#24292E;">we have file4.md</span></span></code></pre></div><div class="language-bat vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bat</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// eg1.bat</span></span>
<span class="line"><span style="color:#F97583;">@echo</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">off</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> /f </span><span style="color:#9ECBFF;">&quot;tokens=1,2&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">%%c</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> (</span><span style="color:#9ECBFF;">&quot;alice bob caro&quot;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">do</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> hello, </span><span style="color:#FFAB70;">%%c</span><span style="color:#E1E4E8;">! hello, </span><span style="color:#FFAB70;">%%d</span><span style="color:#E1E4E8;">! and hello, </span><span style="color:#FFAB70;">%%e</span><span style="color:#E1E4E8;"> too!</span></span>
<span class="line"><span style="color:#E1E4E8;">                             ↑               ↑</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">// output</span></span>
<span class="line"><span style="color:#E1E4E8;">hello, alice! hello, bob! and hello, %e too!</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// eg1.bat</span></span>
<span class="line"><span style="color:#D73A49;">@echo</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">off</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> /f </span><span style="color:#032F62;">&quot;tokens=1,2&quot;</span><span style="color:#24292E;"> </span><span style="color:#E36209;">%%c</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> (</span><span style="color:#032F62;">&quot;alice bob caro&quot;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">do</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> hello, </span><span style="color:#E36209;">%%c</span><span style="color:#24292E;">! hello, </span><span style="color:#E36209;">%%d</span><span style="color:#24292E;">! and hello, </span><span style="color:#E36209;">%%e</span><span style="color:#24292E;"> too!</span></span>
<span class="line"><span style="color:#24292E;">                             ↑               ↑</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">// output</span></span>
<span class="line"><span style="color:#24292E;">hello, alice! hello, bob! and hello, %e too!</span></span></code></pre></div></div></div><h2 id="命令-if" tabindex="-1">命令：if <a class="header-anchor" href="#命令-if" aria-label="Permalink to &quot;命令：if&quot;">​</a></h2><ul><li>判断文件是否存在 <ul><li><code>if [not] exist &lt;filename&gt; &lt;command&gt; [else &lt;command&gt;]</code></li></ul></li><li>判断 <code>errorlevel</code> 是否<strong>等于或大于</strong>指定值 <ul><li><code>if [not] errorlevel &lt;number&gt; &lt;command&gt; [else &lt;command&gt;]</code></li><li><code>errorlevel</code> 为一个<strong>0-255</strong>的数字，表示上一个命令的返回值。通常 <strong>0</strong> 表示成功，<strong>非0</strong>表示失败</li></ul></li><li>判断两字符串是否符合条件 <ul><li><code>if [/i] [not] &lt;string1&gt; &lt;cmpop&gt; &lt;string2&gt; &lt;command&gt; [else &lt;command&gt;]</code></li><li><code>/i</code> 表示<strong>不区分大小写</strong>比较，并且如果 <code>string1</code> 和 <code>string2</code> 均仅由数字组成，则将字符串转换为数字并执行数字比较。</li><li><code>&lt;cmpop&gt;</code> 指定 <code>==</code> 或<strong>三个字母</strong>的比较运算符</li></ul></li><li>判断变量是否已定义 <ul><li><code>if defined &lt;variable&gt; &lt;command&gt; [else &lt;command&gt;]</code></li></ul></li></ul><table><thead><tr><th>比较运算符</th><th>说明</th></tr></thead><tbody><tr><td><code>==</code></td><td>等于</td></tr><tr><td><code>equ</code></td><td>等于</td></tr><tr><td><code>neq</code></td><td>不等于</td></tr><tr><td><code>lss</code></td><td>小于</td></tr><tr><td><code>leq</code></td><td>小于等于</td></tr><tr><td><code>gtr</code></td><td>大于</td></tr><tr><td><code>geq</code></td><td>大于等于</td></tr></tbody></table><div class="warning custom-block"><p class="custom-block-title"><code>errorlevel</code> 的用法</p><p>当在批处理程序中使用 <code>errorlevel</code> 值时，必须按<strong>降序</strong>列出它们。</p></div><h2 id="命令-choice" tabindex="-1">命令：choice <a class="header-anchor" href="#命令-choice" aria-label="Permalink to &quot;命令：choice&quot;">​</a></h2><ul><li><code>choice [/c [&lt;choice1&gt;&lt;choice2&gt;&lt;…&gt;]] [/n] [/cs] [/t &lt;timeout&gt; /d &lt;choice&gt;] [/m &lt;text&gt;]</code></li></ul><table><thead><tr><th>参数</th><th>说明</th></tr></thead><tbody><tr><td><code>/c</code></td><td>指定可用的键 （可选值为 <code>a-z</code>，<code>A-Z</code>,<code>0-9</code>；默认为 <code>YN</code></td></tr><tr><td><code>/n</code></td><td>不显示可用的键</td></tr><tr><td><code>/cs</code></td><td>指定选项区分大小写。 默认情况下，选项不区分大小写。</td></tr><tr><td><code>/m</code></td><td>指定在选项列表之前显示的消息</td></tr></tbody></table><div class="tip custom-block"><p class="custom-block-title">选择的结果将存储在 <code>errorlevel</code> 变量中</p><div class="language-bat vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bat</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">@echo</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">off</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">choice</span><span style="color:#E1E4E8;"> /m </span><span style="color:#9ECBFF;">&quot;select your plan&quot;</span><span style="color:#E1E4E8;"> /c </span><span style="color:#79B8FF;">123</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> you selected :%errorlevel%</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">@echo</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">off</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">choice</span><span style="color:#24292E;"> /m </span><span style="color:#032F62;">&quot;select your plan&quot;</span><span style="color:#24292E;"> /c </span><span style="color:#005CC5;">123</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> you selected :%errorlevel%</span></span></code></pre></div></div><h2 id="参考" tabindex="-1">参考 <a class="header-anchor" href="#参考" aria-label="Permalink to &quot;参考&quot;">​</a></h2><ul><li><a href="https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/windows-commands" target="_blank" rel="noreferrer">Windows Commands | Microsoft Learn</a></li></ul>`,53),e=[o];function c(t,r,i,y,E,d){return n(),a("div",null,e)}const b=s(p,[["render",c]]);export{g as __pageData,b as default};
