import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.d2c27d76.js";const u=JSON.parse('{"title":"CMD","description":"","frontmatter":{"layout":"doc","topic":"CMD","brief":"Collection of some commonly used cmd commands","platform":["windows"],"tag":["cmd"]},"headers":[],"relativePath":"en/post/cmd.md","filePath":"en/post/cmd.md","lastUpdated":1699632085000}'),e={name:"en/post/cmd.md"},o=l(`<h1 id="cmd" tabindex="-1">CMD <a class="header-anchor" href="#cmd" aria-label="Permalink to &quot;CMD&quot;">​</a></h1><blockquote><p>This page is about collection of some commonly used cmd commands</p></blockquote><h2 id="general" tabindex="-1">General <a class="header-anchor" href="#general" aria-label="Permalink to &quot;General&quot;">​</a></h2><ul><li><p>Get help</p><ul><li>Use the command <code>help</code> to get a list of all available commands and their descriptions</li><li>Use the command <code>help &lt;command&gt;</code> to get help for a specific command</li><li>Use the command <code>&lt;command&gt; /?</code> to get help for a specific command (same as above)</li></ul></li><li><p><code>\\\\</code> and <code>/</code></p><ul><li><code>\\\\</code> is generally used as a <strong>path separator</strong> (e.g. <code>C:\\\\Users\\\\</code>)</li><li><code>/</code> is generally used as a <strong>command parameter</strong> (e.g. <code>dir /a</code>)</li></ul></li><li><p>File descriptors</p><ul><li><code>0</code> - Standard input (default to keyboard)</li><li><code>1</code> - Standard output (default to terminal display)</li><li><code>2</code> - Standard error (default to terminal display)</li></ul></li><li><p>Redirection and pipe</p><ul><li><code>&gt;</code> - <strong>Output</strong> redirection</li><li><code>&gt;&gt;</code> - <strong>Output</strong> redirection (append)</li><li><code>&lt;</code> - <strong>Input</strong> redirection</li><li><code>&lt;&lt;</code> - <strong>Input</strong> redirection (append)</li><li><code>|</code> - Pipe (use the <strong>output</strong> of the previous command as the <strong>input</strong> of the next command)</li></ul></li></ul><table><thead><tr><th>Command</th><th>Description</th></tr></thead><tbody><tr><td><code>command&gt;filename</code></td><td>Redirect the output of the command to a file</td></tr><tr><td><code>command 1&gt;filename</code></td><td>Redirect the standard output of the command to a file</td></tr><tr><td><code>command 2&gt;filename</code></td><td>Redirect the standard error of the command to a file</td></tr><tr><td><code>command&gt;filename 2&gt;&amp;1</code></td><td>Redirect the standard output and standard error of the command to a file</td></tr><tr><td><code>command&gt;&gt;filename</code></td><td>Redirect the output of the command to a file (append)</td></tr><tr><td><code>command&lt;filename</code></td><td>Use the file as the input of the command</td></tr><tr><td><code>command&lt;filename1&gt;filename2</code></td><td>Use file 1 as the input of the command, and redirect the output of the command to file 2</td></tr><tr><td><code>command&gt;&amp;m</code></td><td>Use file descriptor m as the output of the command</td></tr><tr><td><code>command&lt;&amp;m</code></td><td>Use file descriptor m as the input of the command</td></tr><tr><td><code>command1|command2</code></td><td>Use the output of command 1 as the input of command 2</td></tr></tbody></table><div class="warning custom-block"><p class="custom-block-title">Note</p><ul><li>There should be no spaces on both sides of the redirection symbol, otherwise it will be treated as a parameter</li><li><code>0/1/2</code> cannot be the target of append redirection, that is, <code>2&gt;&gt;1</code> is illegal</li></ul></div><h2 id="errorlevel" tabindex="-1">ERRORLEVEL <a class="header-anchor" href="#errorlevel" aria-label="Permalink to &quot;ERRORLEVEL&quot;">​</a></h2><p>In CMD, <code>errorlevel</code> is an <strong>internal state</strong> used to indicate the return value of the previous command. It is a number from <strong>0-255</strong>, usually <strong>0</strong> means success, <strong>non-0</strong> means failure.</p><h2 id="usage-of-set-errorlevel-value" tabindex="-1">Usage of <code>set errorlevel=&lt;value&gt;</code> <a class="header-anchor" href="#usage-of-set-errorlevel-value" aria-label="Permalink to &quot;Usage of \`set errorlevel=&lt;value&gt;\`&quot;">​</a></h2><p>When command extensions are enabled, executing <code>echo %errorlevel%</code> will first look for the <strong>environment variable</strong> <code>errorlevel</code>, and if not found, will look for the <strong>internal status</strong> <code>errorlevel</code>. Therefore, executing <code>set errorlevel=&lt;value&gt;</code> only sets an <strong>environment variable</strong> and <strong>does not affect</strong> the <strong>internal status</strong> <code>errorlevel</code>.</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-rh-e-" id="tab-qll6P2X" checked="checked"><label for="tab-qll6P2X">environment variable</label><input type="radio" name="group-rh-e-" id="tab-VrKnOQk"><label for="tab-VrKnOQk">internal status</label></div><div class="blocks"><div class="language-bat vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">bat</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// test.bat</span></span>
<span class="line"><span style="color:#F97583;">set</span><span style="color:#E1E4E8;"> errorlevel</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> %errorlevel%</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">// output</span></span>
<span class="line"><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">  // this is the value of the environment variable</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// test.bat</span></span>
<span class="line"><span style="color:#D73A49;">set</span><span style="color:#24292E;"> errorlevel</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> %errorlevel%</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">// output</span></span>
<span class="line"><span style="color:#005CC5;">1</span><span style="color:#24292E;">  // this is the value of the environment variable</span></span></code></pre></div><div class="language-bat vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bat</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// test.bat</span></span>
<span class="line"><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> %errorlevel%</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">// output</span></span>
<span class="line"><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">  // this is the value of the internal status</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// test.bat</span></span>
<span class="line"><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> %errorlevel%</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">// output</span></span>
<span class="line"><span style="color:#005CC5;">0</span><span style="color:#24292E;">  // this is the value of the internal status</span></span></code></pre></div></div></div><h3 id="use-with-if" tabindex="-1">Use with <code>if</code> <a class="header-anchor" href="#use-with-if" aria-label="Permalink to &quot;Use with \`if\`&quot;">​</a></h3><ul><li><code>if errorlevel &lt;number&gt; &lt;command&gt;</code> will <strong>always</strong> use the internal status <code>errorlevel</code> for comparison, set the environment variable <code>errorlevel</code> has <strong>no effect</strong> on it.</li><li><code>if %errorlevel% == &lt;string&gt; &lt;command&gt;</code> use variable expansion in the comparison, therefore it is <strong>impossible</strong> to determine whether the <code>errorlevel</code> used is the internal status or an environment variable.</li></ul><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-q20ov" id="tab-vlUViUw" checked="checked"><label for="tab-vlUViUw">comparison 1.1</label><input type="radio" name="group-q20ov" id="tab-qJBrzTg"><label for="tab-qJBrzTg">comparison 1.2</label><input type="radio" name="group-q20ov" id="tab-z5d39n1"><label for="tab-z5d39n1">comparison 2.1</label><input type="radio" name="group-q20ov" id="tab-mKA2oj3"><label for="tab-mKA2oj3">comparison 2.2</label></div><div class="blocks"><div class="language-bat vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">bat</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// test.bat</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">errorlevel</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> two--%errorlevel%</span></span>
<span class="line"><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">errorlevel</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> one--%errorlevel%</span></span>
<span class="line"><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> zero--%errorlevel%</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">// output</span></span>
<span class="line"><span style="color:#E1E4E8;">zero--0  // compare: internal status, output: internal status</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// test.bat</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">errorlevel</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> two--%errorlevel%</span></span>
<span class="line"><span style="color:#24292E;">) </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">errorlevel</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> one--%errorlevel%</span></span>
<span class="line"><span style="color:#24292E;">) </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> zero--%errorlevel%</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">// output</span></span>
<span class="line"><span style="color:#24292E;">zero--0  // compare: internal status, output: internal status</span></span></code></pre></div><div class="language-bat vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bat</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// test.bat</span></span>
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
<span class="line"><span style="color:#E1E4E8;">zero--2  // compare: internal status, output: environment variable</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// test.bat</span></span>
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
<span class="line"><span style="color:#24292E;">zero--2  // compare: internal status, output: environment variable</span></span></code></pre></div><div class="language-bat vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bat</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// test.bat</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> %errorlevel% </span><span style="color:#F97583;">geq</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> two--%errorlevel%</span></span>
<span class="line"><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> %errorlevel% </span><span style="color:#F97583;">geq</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> one--%errorlevel%</span></span>
<span class="line"><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> zero--%errorlevel%</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">// output</span></span>
<span class="line"><span style="color:#E1E4E8;">zero--0  // compare: environment variable, output: environment variable</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// test.bat</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> %errorlevel% </span><span style="color:#D73A49;">geq</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> two--%errorlevel%</span></span>
<span class="line"><span style="color:#24292E;">) </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> %errorlevel% </span><span style="color:#D73A49;">geq</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> one--%errorlevel%</span></span>
<span class="line"><span style="color:#24292E;">) </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> zero--%errorlevel%</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">// output</span></span>
<span class="line"><span style="color:#24292E;">zero--0  // compare: environment variable, output: environment variable</span></span></code></pre></div><div class="language-bat vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bat</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// test.bat</span></span>
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
<span class="line"><span style="color:#E1E4E8;">two--2  // compare: environment variable, output: environment variable</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// test.bat</span></span>
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
<span class="line"><span style="color:#24292E;">two--2  // compare: environment variable, output: environment variable</span></span></code></pre></div></div></div><h2 id="command-setlocal-endlocal" tabindex="-1">Command: setlocal/endlocal <a class="header-anchor" href="#command-setlocal-endlocal" aria-label="Permalink to &quot;Command: setlocal/endlocal&quot;">​</a></h2><p>Starts localization of environment variables in a batch file. Localization continues until a matching <code>endlocal</code> command is encountered or the end of the batch file is reached.</p><p><code>setlocal [enableextensions | disableextensions] [enabledelayedexpansion | disabledelayedexpansion]</code></p><table><thead><tr><th>Parameter</th><th>Description</th></tr></thead><tbody><tr><td><code>enableextensions</code>*</td><td>Enables the command extensions until the matching endlocal command is encountered</td></tr><tr><td><code>disableextensions</code></td><td>Disables the command extensions until the matching endlocal command is encountered</td></tr><tr><td><code>enabledelayedexpansion</code></td><td>Enables the delayed environment variable expansion until the matching endlocal command is encountered</td></tr><tr><td><code>disabledelayedexpansion</code>*</td><td>Disables the delayed environment variable expansion until the matching endlocal command is encountered</td></tr></tbody></table><blockquote><p><code>*</code> means default</p></blockquote><h3 id="delayedexpansion" tabindex="-1"><em>delayedexpansion</em> <a class="header-anchor" href="#delayedexpansion" aria-label="Permalink to &quot;_delayedexpansion_&quot;">​</a></h3><p>When CMD interprets a command, it will first read a <strong>complete</strong> command in the command line, and then perform some command format matching operations on it. If a variable (such as <code>%name%</code>) is used in the command, CMD will find the value corresponding to the variable when performing format matching on the command, <strong>replace</strong> the variable with the value of the variable, and then execute the <strong>replaced</strong> command. This process of replacing values is called <strong>variable expansion</strong>.</p><p>However, when we use <code>for</code>(loop) and <code>if</code>(block), the variable expansion will be performed <strong>before</strong> the loop/block starts, and the value of the variable will <strong>not be updated</strong> during execution.In this case, we can use <code>enabledelayedexpansion</code> to <strong>delay</strong> the variable expansion <strong>until</strong> the command is executed.</p><div class="warning custom-block"><p class="custom-block-title">Note</p><p>When the <code>enabledelayedexpansion</code> is enabled, use <code>!</code> instead of <code>%</code> to access the variable. That is, <code>!name!</code> rather than <code>%name%</code>.</p></div><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-Zflsi" id="tab-k9r5OVI" checked="checked"><label for="tab-k9r5OVI">no delayed expansion1</label><input type="radio" name="group-Zflsi" id="tab-D1uFds8"><label for="tab-D1uFds8">no delayed expansion2</label><input type="radio" name="group-Zflsi" id="tab-3WHQvTV"><label for="tab-3WHQvTV">with delayed expansion</label></div><div class="blocks"><div class="language-bat vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">bat</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// loop.bat</span></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> /l </span><span style="color:#FFAB70;">%%i</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> (1,1,5) </span><span style="color:#F97583;">do</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">set</span><span style="color:#E1E4E8;"> ptr</span><span style="color:#F97583;">=</span><span style="color:#FFAB70;">%%i</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> %ptr%</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">// output</span></span>
<span class="line"><span style="color:#F97583;">ECHO</span><span style="color:#E1E4E8;"> is off.  // When the variable value is empty, this will be output</span></span>
<span class="line"><span style="color:#F97583;">ECHO</span><span style="color:#E1E4E8;"> is off.</span></span>
<span class="line"><span style="color:#F97583;">ECHO</span><span style="color:#E1E4E8;"> is off.</span></span>
<span class="line"><span style="color:#F97583;">ECHO</span><span style="color:#E1E4E8;"> is off.</span></span>
<span class="line"><span style="color:#F97583;">ECHO</span><span style="color:#E1E4E8;"> is off.</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// loop.bat</span></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> /l </span><span style="color:#E36209;">%%i</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> (1,1,5) </span><span style="color:#D73A49;">do</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">set</span><span style="color:#24292E;"> ptr</span><span style="color:#D73A49;">=</span><span style="color:#E36209;">%%i</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> %ptr%</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">// output</span></span>
<span class="line"><span style="color:#D73A49;">ECHO</span><span style="color:#24292E;"> is off.  // When the variable value is empty, this will be output</span></span>
<span class="line"><span style="color:#D73A49;">ECHO</span><span style="color:#24292E;"> is off.</span></span>
<span class="line"><span style="color:#D73A49;">ECHO</span><span style="color:#24292E;"> is off.</span></span>
<span class="line"><span style="color:#D73A49;">ECHO</span><span style="color:#24292E;"> is off.</span></span>
<span class="line"><span style="color:#D73A49;">ECHO</span><span style="color:#24292E;"> is off.</span></span></code></pre></div><div class="language-bat vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bat</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// loop.bat</span></span>
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
<span class="line"><span style="color:#F97583;">rem</span><span style="color:#6A737D;"> set ptr=0  // This line has no effect on the result whether it is commented out or not</span></span>
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
<span class="line"><span style="color:#D73A49;">rem</span><span style="color:#6A737D;"> set ptr=0  // This line has no effect on the result whether it is commented out or not</span></span>
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
<span class="line"><span style="color:#005CC5;">5</span></span></code></pre></div></div></div><h2 id="command-set-environment-variable" tabindex="-1">Command: set (environment variable) <a class="header-anchor" href="#command-set-environment-variable" aria-label="Permalink to &quot;Command: set (environment variable)&quot;">​</a></h2><ul><li><code>set</code> - Display all environment variables</li><li><code>set &lt;variable&gt;</code> - Display the value of the specified environment variable</li><li><code>set &lt;variable&gt;=&lt;value&gt;</code> - Set the value of the specified environment variable</li><li><code>set /a &lt;variable&gt;=&lt;expression&gt;</code> - Set the value of the specified environment variable to the result of the specified expression</li><li><code>set /p &lt;variable&gt;=&lt;prompt&gt;</code> - Set the value of the specified environment variable to the user input</li><li><code>%&lt;variable&gt;%</code> - Use the value of the environment variable</li></ul><div class="warning custom-block"><p class="custom-block-title">Note</p><ul><li>Environment variable names are case-insensitive, that is, <code>set PATH=xxx</code> and <code>set path=xxx</code> have the same effect</li><li>There should be no spaces on both sides of the <code>=</code>, otherwise it will be treated as a parameter, for example, <code>set PATH = xxx</code> will be treated as the <code>set PATH</code> command</li></ul></div><h2 id="command-echo" tabindex="-1">Command: echo <a class="header-anchor" href="#command-echo" aria-label="Permalink to &quot;Command: echo&quot;">​</a></h2><ul><li><code>echo &lt;message&gt;</code> - Display the specified message</li><li><code>echo on</code> / <code>echo off</code> - Enable/disable the display of commands <strong>in the batch file</strong></li></ul><div class="warning custom-block"><p class="custom-block-title">Note</p><ul><li>To display a blank line, use <code>echo.</code></li><li>To display special characters (including <code>|</code>, <code>&amp;</code>, <code>&lt;</code>, <code>&gt;</code>, <code>^</code>), add a <code>^</code> immediately before the character to escape it</li></ul></div><h2 id="command-goto" tabindex="-1">Command: goto <a class="header-anchor" href="#command-goto" aria-label="Permalink to &quot;Command: goto&quot;">​</a></h2><blockquote><p>The special label <code>:eof</code> means the end of the file, and <code>goto :eof</code> can be used to end the execution of the batch file</p></blockquote><ul><li><code>goto &lt;label&gt;</code> - Jump to the specified label to continue execution</li></ul><div class="tip custom-block"><p class="custom-block-title"><code>&lt;label&gt;</code> supports variable splicing</p><div class="language-bat vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bat</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">@echo</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">off</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">choice</span><span style="color:#E1E4E8;"> /m </span><span style="color:#9ECBFF;">&quot;select your plan&quot;</span><span style="color:#E1E4E8;"> /c </span><span style="color:#79B8FF;">123</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">rem</span><span style="color:#6A737D;"> here we use variable splicing</span></span>
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
<span class="line"><span style="color:#D73A49;">rem</span><span style="color:#6A737D;"> here we use variable splicing</span></span>
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
<span class="line"><span style="color:#D73A49;">goto</span><span style="color:#24292E;"> :</span><span style="color:#D73A49;">eof</span></span></code></pre></div></div><h2 id="command-call" tabindex="-1">Command: call <a class="header-anchor" href="#command-call" aria-label="Permalink to &quot;Command: call&quot;">​</a></h2><ul><li><code>call path-to-batch &lt;arguments&gt;</code> -- Call another batch file</li><li><code>call :label &lt;arguments&gt;</code> -- Call the specified label in the current batch file</li><li>Use <code>%0</code>, <code>%1</code>, <code>%2</code> ... to get the arguments, or use <code>%*</code> to get all parameters</li><li>Generally, <code>%0</code> is the path or label name of the current batch, and starting from <code>%1</code> is the incoming parameter.</li></ul><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-7oxuR" id="tab-fpO7hGg" checked="checked"><label for="tab-fpO7hGg">What will the following code output?</label><input type="radio" name="group-7oxuR" id="tab-SwNHT4-"><label for="tab-SwNHT4-">Steps</label><input type="radio" name="group-7oxuR" id="tab-XQcrpBI"><label for="tab-XQcrpBI">Answer</label></div><div class="blocks"><div class="language-bat vp-adaptive-theme active line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bat</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">@echo</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">off</span></span>
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
<span class="line"><span style="color:#24292e;">tag2    step 14</span></span></code></pre></div></div></div><h2 id="command-for" tabindex="-1">Command: for <a class="header-anchor" href="#command-for" aria-label="Permalink to &quot;Command: for&quot;">​</a></h2><ul><li>Basic: <ul><li><code>for &lt;variable&gt; in (&lt;set&gt;) do &lt;command&gt; [&lt;commandlineoptions&gt;]</code></li></ul></li><li>Iterating a range of values <ul><li><code>for /l &lt;variable&gt; in (&lt;start#&gt;,&lt;step#&gt;,&lt;end#&gt;) do &lt;command&gt; [&lt;commandlinepptions&gt;]</code></li></ul></li><li>Iterating and file parsing <ul><li><code>for /f [&lt;parsingkeywords&gt;] &lt;variable&gt; in (&lt;set&gt;) do &lt;command&gt; [&lt;commandlinepptions&gt;]</code></li><li><code>for /f [&lt;parsingkeywords&gt;] &lt;variable&gt; in (&lt;literalstring&gt;) do &lt;command&gt; [&lt;commandlinepptions&gt;]</code></li><li><code>for /f [&lt;parsingkeywords&gt;] &lt;variable&gt; in (&#39;&lt;command&gt;&#39;) do &lt;command&gt; [&lt;commandlinepptions&gt;]</code></li></ul></li></ul><table><thead><tr><th><code>&lt;parsingkeywords&gt;</code></th><th>Description</th></tr></thead><tbody><tr><td>eol=<code>&lt;c&gt;</code></td><td>Specifies an end of line character (just one character)</td></tr><tr><td>skip=<code>&lt;n&gt;</code></td><td>Specifies the number of lines to skip at the beginning of the file</td></tr><tr><td>delims=<code>&lt;xxx&gt;</code></td><td>Specifies a delimiter set. This replaces the default delimiter set of space and tab.</td></tr><tr><td>tokens=<code>&lt;x,y,m-n&gt;</code></td><td>Specifies which tokens from each line are to be passed to the for loop for each iteration</td></tr><tr><td>usebackq</td><td>Specifies to run a back-quoted string as a command, use a single-quoted string as a literal string, or, for long file names that contain spaces</td></tr></tbody></table><div class="tip custom-block"><p class="custom-block-title">Rule of <code>&lt;variable&gt;</code></p><ul><li>In the command prompt, use <code>%&lt;name&gt;</code> to access the variable</li><li>In the batch file, use <code>%%&lt;name&gt;</code> to access the variable</li><li><code>&lt;literalstring&gt;</code> is treated as a single line of input from a file</li><li>When <code>/f &lt;parsingkeywords&gt;</code> is used and <code>parsingkeywords</code> contains <code>tokens</code>, subsequent variables will be automatically incremented (see <strong>eg1</strong>)</li></ul></div><table><thead><tr><th><code>for /f ... &lt;variable&gt;</code></th><th>with <code>usebackq</code></th><th>without <code>usebackq</code></th></tr></thead><tbody><tr><td>file parsing</td><td>no wrap</td><td>no wrap</td></tr><tr><td>literal string</td><td>single quotes <code>&#39;</code></td><td>double quotes <code>&quot;</code></td></tr><tr><td>command parsing</td><td>backquotes \`\`\`</td><td>single quotes <code>&#39;</code></td></tr></tbody></table><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-hiTIq" id="tab-9g0ouIJ" checked="checked"><label for="tab-9g0ouIJ">basic</label><input type="radio" name="group-hiTIq" id="tab-vpwv8tu"><label for="tab-vpwv8tu">range of value</label><input type="radio" name="group-hiTIq" id="tab-4lIg4ri"><label for="tab-4lIg4ri">file parsing</label><input type="radio" name="group-hiTIq" id="tab-BtFkh9b"><label for="tab-BtFkh9b">command parsing</label></div><div class="blocks"><div class="language-bat vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">bat</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// fruit.bat</span></span>
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
<span class="line"><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;"> seconds left  // the following output one line per second                </span></span>
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
<span class="line"><span style="color:#005CC5;">10</span><span style="color:#24292E;"> seconds left  // the following output one line per second                </span></span>
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
<span class="line"><span style="color:#24292E;">we have file4.md</span></span></code></pre></div></div></div><h2 id="command-if" tabindex="-1">Command: if <a class="header-anchor" href="#command-if" aria-label="Permalink to &quot;Command: if&quot;">​</a></h2><ul><li>Determine whether the file exists <ul><li><code>if [not] exist &lt;filename&gt; &lt;command&gt; [else &lt;command&gt;]</code></li></ul></li><li>Determine whether <code>errorlevel</code> is <strong>equal to or greater than</strong> a specified value <ul><li><code>if [not] errorlevel &lt;number&gt; &lt;command&gt; [else &lt;command&gt;]</code></li><li><code>errorlevel</code> is a number from <strong>0-255</strong>, indicating the return value of the previous command. Usually <strong>0</strong> means success, <strong>non-0</strong> means failure</li></ul></li><li>Determine whether two strings meet the conditions <ul><li><code>if [/i] [not] &lt;string1&gt; &lt;cmpop&gt; &lt;string2&gt; &lt;command&gt; [else &lt;command&gt;]</code></li><li><code>/i</code> means <strong>case-insensitive</strong> comparison, and if both <code>string1</code> and <code>string2</code> are comprised of numeric digits only, the strings are converted to numbers and a numeric comparison is performed</li><li><code>&lt;cmpop&gt;</code> specifies <code>==</code> or a <strong>three letter</strong> comparison operator</li></ul></li><li>Determine whether the variable has been defined <ul><li><code>if defined &lt;variable&gt; &lt;command&gt; [else &lt;command&gt;]</code></li></ul></li></ul><table><thead><tr><th>operator</th><th>description</th></tr></thead><tbody><tr><td><code>==</code></td><td>equal</td></tr><tr><td><code>equ</code></td><td>equal</td></tr><tr><td><code>neq</code></td><td>now equal</td></tr><tr><td><code>lss</code></td><td>less than</td></tr><tr><td><code>leq</code></td><td>less or equal</td></tr><tr><td><code>gtr</code></td><td>great than</td></tr><tr><td><code>geq</code></td><td>great or equal</td></tr></tbody></table><div class="warning custom-block"><p class="custom-block-title">Usage of <code>errorlevel</code></p><p>When using <code>errorlevel</code> in a batch program, you must list them in <strong>decreasing</strong> order.</p></div><h2 id="command-choice" tabindex="-1">Command: choice <a class="header-anchor" href="#command-choice" aria-label="Permalink to &quot;Command: choice&quot;">​</a></h2><ul><li><code>choice [/c [&lt;choice1&gt;&lt;choice2&gt;&lt;…&gt;]] [/n] [/cs] [/t &lt;timeout&gt; /d &lt;choice&gt;] [/m &lt;text&gt;]</code></li></ul><table><thead><tr><th>Parameter</th><th>Description</th></tr></thead><tbody><tr><td><code>/c</code></td><td>Specifies the list of choices to be displayed. (Optional values are <code>a-z</code>, <code>A-Z</code>, <code>0-9</code>; Default to <code>YN</code>)</td></tr><tr><td><code>/n</code></td><td>Do not display the choices in the prompt</td></tr><tr><td><code>/cs</code></td><td>Specifies that the choices are case-sensitive. By default, the choices are not case-sensitive</td></tr><tr><td><code>/m</code></td><td>Specifies a message to display before the list of choices</td></tr></tbody></table><div class="tip custom-block"><p class="custom-block-title">The result of the choice will be stored in the <code>errorlevel</code> variable</p><div class="language-bat vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bat</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">@echo</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">off</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">choice</span><span style="color:#E1E4E8;"> /m </span><span style="color:#9ECBFF;">&quot;select your plan&quot;</span><span style="color:#E1E4E8;"> /c </span><span style="color:#79B8FF;">123</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">echo</span><span style="color:#E1E4E8;"> you selected :%errorlevel%</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">@echo</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">off</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">choice</span><span style="color:#24292E;"> /m </span><span style="color:#032F62;">&quot;select your plan&quot;</span><span style="color:#24292E;"> /c </span><span style="color:#005CC5;">123</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">echo</span><span style="color:#24292E;"> you selected :%errorlevel%</span></span></code></pre></div></div><h2 id="references" tabindex="-1">References <a class="header-anchor" href="#references" aria-label="Permalink to &quot;References&quot;">​</a></h2><ul><li><a href="https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/windows-commands" target="_blank" rel="noreferrer">Windows Commands | Microsoft Learn</a></li></ul>`,53),p=[o];function t(c,r,i,d,y,E){return a(),n("div",null,p)}const m=s(e,[["render",t]]);export{u as __pageData,m as default};
