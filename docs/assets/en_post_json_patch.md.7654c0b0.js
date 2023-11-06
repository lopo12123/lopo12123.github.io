import{_ as p,C as e,o as t,c,k as s,a,H as l,Q as n}from"./chunks/framework.d2c27d76.js";const G=JSON.parse('{"title":"JSON Patch & JSON Merge Patch","description":"","frontmatter":{"layout":"doc","topic":"JSON Patch","brief":"JSON Patch defines a JSON document structure for expressing a sequence of operations to apply to a JavaScript Object Notation(JSON) document","language":["JSON"],"tag":["rfc","merge","patch"]},"headers":[],"relativePath":"en/post/json_patch.md","filePath":"en/post/json_patch.md","lastUpdated":1698848415000}'),r={name:"en/post/json_patch.md"},i=n('<h1 id="json-patch-json-merge-patch" tabindex="-1">JSON Patch &amp; JSON Merge Patch <a class="header-anchor" href="#json-patch-json-merge-patch" aria-label="Permalink to &quot;JSON Patch &amp; JSON Merge Patch&quot;">​</a></h1><blockquote><p>This page is about <a href="https://datatracker.ietf.org/doc/html/rfc6902" target="_blank" rel="noreferrer">JSON Patch</a> and <a href="https://datatracker.ietf.org/doc/html/rfc7396" target="_blank" rel="noreferrer">JSON Merge Patch</a>.</p></blockquote><h2 id="javascript-object-notation-json-patch" tabindex="-1">JavaScript Object Notation (JSON) Patch <a class="header-anchor" href="#javascript-object-notation-json-patch" aria-label="Permalink to &quot;JavaScript Object Notation (JSON) Patch&quot;">​</a></h2><p>JSON Patch defines a JSON document structure for expressing a sequence of <a href="#operations">operations</a> to apply to a JavaScript Object Notation(JSON) document; it is suitable for use with the HTTP PATCH method. The <code>application/json-patch+json</code> media type is used to identify such patch documents.</p><p>Operation objects <strong>MUST</strong> have exactly one <code>op</code> member, whose value indicates the operation to perform. Its value <strong>MUST</strong> be one of <a href="#add"><code>add</code></a>, <a href="#remove"><code>remove</code></a>, <a href="#replace"><code>replace</code></a>, <a href="#move"><code>move</code></a>, <a href="#copy"><code>copy</code></a>, or <a href="#test"><code>test</code></a>; other values are errors.</p><p>Additionally, operation objects <strong>MUST</strong> have exactly one <code>path</code> member. That member&#39;s value is a string containing a <a href="https://datatracker.ietf.org/doc/html/rfc6901" target="_blank" rel="noreferrer">JSON-Pointer</a> that references a location within the target document where the operation is performed.</p>',6),u={id:"add",tabindex:"-1"},y=s("a",{class:"header-anchor",href:"#add","aria-label":'Permalink to "add <Badge type="info" text="operation" title="operation"/>"'},"​",-1),E=n("<blockquote><p>The operation object <strong>MUST</strong> contain a <code>value</code> member whose content specifies the value to be added.</p></blockquote><p>The <code>add</code> operation performs one of the following functions, depending upon what the target location references:</p><ul><li>If the target location specifies an array index, a new value is inserted into the array at the specified index.</li><li>If the target location specifies an object member that does not already exist, a new member is added to the object.</li><li>If the target location specifies an object member that does exist, that member&#39;s value is replaced.</li></ul>",3),d=n(`<details class="details custom-block"><summary>Example 1. Add an Object Member</summary><p>Original document:</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;foo&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;bar&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;foo&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;bar&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>Patch:</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;op&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;add&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;path&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;/plain&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;value&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;plain value&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;op&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;add&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;path&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;/complex&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;value&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">&quot;complex key&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;complex value&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;op&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;add&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;path&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;/plain&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;value&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;plain value&quot;</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;op&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;add&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;path&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;/complex&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;value&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">&quot;complex key&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;complex value&quot;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">]</span></span></code></pre></div><p>Result:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark has-diff vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;foo&quot;: &quot;bar&quot;,</span></span>
<span class="line diff add"><span style="color:#e1e4e8;">    &quot;plain&quot;: &quot;plain value&quot;,  </span></span>
<span class="line diff add"><span style="color:#e1e4e8;">    &quot;complex&quot;: {  </span></span>
<span class="line diff add"><span style="color:#e1e4e8;">        &quot;complex key&quot;: &quot;complex value&quot;  </span></span>
<span class="line diff add"><span style="color:#e1e4e8;">    }  </span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light has-diff vp-code-light"><code><span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    &quot;foo&quot;: &quot;bar&quot;,</span></span>
<span class="line diff add"><span style="color:#24292e;">    &quot;plain&quot;: &quot;plain value&quot;,  </span></span>
<span class="line diff add"><span style="color:#24292e;">    &quot;complex&quot;: {  </span></span>
<span class="line diff add"><span style="color:#24292e;">        &quot;complex key&quot;: &quot;complex value&quot;  </span></span>
<span class="line diff add"><span style="color:#24292e;">    }  </span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div></details><details class="details custom-block"><summary>Example 2. Add an Array Element</summary><p>Original document:</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;foo&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;el1&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;el2&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;foo&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;el1&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;el2&quot;</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>Patch:</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;op&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;add&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;path&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;/foo/1&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;value&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;el-ext&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;op&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;add&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;path&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;/foo/1&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;value&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;el-ext&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">]</span></span></code></pre></div><p>Result:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark has-diff vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;foo&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;el1&quot;,</span></span>
<span class="line diff add"><span style="color:#e1e4e8;">        &quot;el-ext&quot;,  </span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;el2&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ]</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light has-diff vp-code-light"><code><span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    &quot;foo&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">        &quot;el1&quot;,</span></span>
<span class="line diff add"><span style="color:#24292e;">        &quot;el-ext&quot;,  </span></span>
<span class="line"><span style="color:#24292e;">        &quot;el2&quot;</span></span>
<span class="line"><span style="color:#24292e;">    ]</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div></details><details class="details custom-block"><summary>Example 3. Add an Array Value</summary><p>Original document:</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;foo&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;el1&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;foo&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;el1&quot;</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>Patch:</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;op&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;add&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;path&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;/foo/-&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;value&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">&quot;el-ext1&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">&quot;el-ext2&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;op&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;add&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;path&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;/foo/-&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;value&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">&quot;el-ext1&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">&quot;el-ext2&quot;</span></span>
<span class="line"><span style="color:#24292E;">        ]</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">]</span></span></code></pre></div><p>Result:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark has-diff vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;foo&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;el1&quot;,</span></span>
<span class="line diff add"><span style="color:#e1e4e8;">        [  </span></span>
<span class="line diff add"><span style="color:#e1e4e8;">            &quot;el-ext1&quot;,  </span></span>
<span class="line diff add"><span style="color:#e1e4e8;">            &quot;el-ext2&quot;  </span></span>
<span class="line diff add"><span style="color:#e1e4e8;">        ]  </span></span>
<span class="line"><span style="color:#e1e4e8;">    ]</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light has-diff vp-code-light"><code><span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    &quot;foo&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">        &quot;el1&quot;,</span></span>
<span class="line diff add"><span style="color:#24292e;">        [  </span></span>
<span class="line diff add"><span style="color:#24292e;">            &quot;el-ext1&quot;,  </span></span>
<span class="line diff add"><span style="color:#24292e;">            &quot;el-ext2&quot;  </span></span>
<span class="line diff add"><span style="color:#24292e;">        ]  </span></span>
<span class="line"><span style="color:#24292e;">    ]</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div></details>`,3),q={id:"remove",tabindex:"-1"},h=s("a",{class:"header-anchor",href:"#remove","aria-label":'Permalink to "remove <Badge type="info" text="operation" title="operation"/>"'},"​",-1),g=s("p",null,[a("The "),s("code",null,"remove"),a(" operation removes the value at the target location. The target location "),s("strong",null,"MUST"),a(" exist for the operation to be successful.")],-1),f=n(`<details class="details custom-block"><summary>Example 1. Remove an Object Member</summary><p>Original document:</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;foo&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;bar&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;baz&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;qux&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;foo&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;bar&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;baz&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;qux&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>Patch:</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;op&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;remove&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;path&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;/baz&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;op&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;remove&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;path&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;/baz&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">]</span></span></code></pre></div><p>Result:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark has-diff vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;foo&quot;: &quot;bar&quot;,</span></span>
<span class="line diff remove"><span style="color:#e1e4e8;">    &quot;baz&quot;: &quot;qux&quot;  </span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light has-diff vp-code-light"><code><span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    &quot;foo&quot;: &quot;bar&quot;,</span></span>
<span class="line diff remove"><span style="color:#24292e;">    &quot;baz&quot;: &quot;qux&quot;  </span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div></details><details class="details custom-block"><summary>Example 2. Remove an Array Element</summary><p>Original document:</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;foo&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;el1&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;el2&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;el3&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;foo&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;el1&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;el2&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;el3&quot;</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>Patch:</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;op&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;remove&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;path&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;/foo/1&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;op&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;remove&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;path&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;/foo/1&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">]</span></span></code></pre></div><p>Result:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark has-diff vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;foo&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;el1&quot;,</span></span>
<span class="line diff remove"><span style="color:#e1e4e8;">        &quot;el2&quot;,  </span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;el3&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ]</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light has-diff vp-code-light"><code><span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    &quot;foo&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">        &quot;el1&quot;,</span></span>
<span class="line diff remove"><span style="color:#24292e;">        &quot;el2&quot;,  </span></span>
<span class="line"><span style="color:#24292e;">        &quot;el3&quot;</span></span>
<span class="line"><span style="color:#24292e;">    ]</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div></details>`,2),v={id:"replace",tabindex:"-1"},b=s("a",{class:"header-anchor",href:"#replace","aria-label":'Permalink to "replace <Badge type="info" text="operation" title="operation"/>"'},"​",-1),m=s("blockquote",null,[s("p",null,[a("The operation object "),s("strong",null,"MUST"),a(" contain a "),s("code",null,"value"),a(" member whose content specifies the replacement value.")])],-1),F=s("p",null,[a("The "),s("code",null,"replace"),a(" operation replaces the value at the target location with a new value.")],-1),C=n(`<details class="details custom-block"><summary>Example 1. Replace an Object Member</summary><p>Original document:</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;foo&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;bar&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;baz&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;qux&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;foo&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;bar&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;baz&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;qux&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>Patch:</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;op&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;replace&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;path&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;/foo&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;value&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;boo&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;op&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;replace&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;path&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;/foo&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;value&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;boo&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">]</span></span></code></pre></div><p>Result:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark has-diff vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line diff remove"><span style="color:#e1e4e8;">    &quot;foo&quot;: &quot;bar&quot;,  </span></span>
<span class="line diff add"><span style="color:#e1e4e8;">    &quot;foo&quot;: &quot;boo&quot;,  </span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;baz&quot;: &quot;qux&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light has-diff vp-code-light"><code><span class="line"><span style="color:#24292e;">{</span></span>
<span class="line diff remove"><span style="color:#24292e;">    &quot;foo&quot;: &quot;bar&quot;,  </span></span>
<span class="line diff add"><span style="color:#24292e;">    &quot;foo&quot;: &quot;boo&quot;,  </span></span>
<span class="line"><span style="color:#24292e;">    &quot;baz&quot;: &quot;qux&quot;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div></details><details class="details custom-block"><summary>Example 2. Replace an Array Element</summary><p>Original document:</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;foo&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;el1&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;el2&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;el3&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;foo&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;el1&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;el2&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;el3&quot;</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>Patch:</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;op&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;replace&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;path&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;/foo/1&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;value&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;el-ext&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;op&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;replace&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;path&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;/foo/1&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;value&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;el-ext&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">]</span></span></code></pre></div><p>Result:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark has-diff vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;foo&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;el1&quot;,</span></span>
<span class="line diff remove"><span style="color:#e1e4e8;">        &quot;el2&quot;,  </span></span>
<span class="line diff add"><span style="color:#e1e4e8;">        &quot;el-ext&quot;,  </span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;el3&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ]</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light has-diff vp-code-light"><code><span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    &quot;foo&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">        &quot;el1&quot;,</span></span>
<span class="line diff remove"><span style="color:#24292e;">        &quot;el2&quot;,  </span></span>
<span class="line diff add"><span style="color:#24292e;">        &quot;el-ext&quot;,  </span></span>
<span class="line"><span style="color:#24292e;">        &quot;el3&quot;</span></span>
<span class="line"><span style="color:#24292e;">    ]</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div></details>`,2),k={id:"move",tabindex:"-1"},_=s("a",{class:"header-anchor",href:"#move","aria-label":'Permalink to "move <Badge type="info" text="operation" title="operation"/>"'},"​",-1),B=s("blockquote",null,[s("p",null,[a("The operation object MUST contain a "),s("code",null,"from"),a(" member, which is a string containing a JSON Pointer value that references the location in the target document to move the value from.")])],-1),x=s("p",null,[a("The "),s("code",null,"move"),a(" operation removes the value at a specified location and adds it to the target location.")],-1),j=n(`<details class="details custom-block"><summary>Example 1. Move an Object Member</summary><p>Original document:</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;foo&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;bar&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;baz&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;waldo&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;fred&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;baz&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;qux&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;quux&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;foo&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;bar&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;baz&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;waldo&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;fred&quot;</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;baz&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;qux&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;quux&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>Patch:</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;op&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;move&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;from&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;/foo/waldo&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;path&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;/baz/thud&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;op&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;move&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;from&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;/foo/waldo&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;path&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;/baz/thud&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">]</span></span></code></pre></div><p>Result:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark has-diff vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;foo&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;bar&quot;: &quot;baz&quot;,</span></span>
<span class="line diff remove"><span style="color:#e1e4e8;">        &quot;waldo&quot;: &quot;fred&quot;  </span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;baz&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;qux&quot;: &quot;quux&quot;,</span></span>
<span class="line diff add"><span style="color:#e1e4e8;">        &quot;thud&quot;: &quot;fred&quot;  </span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light has-diff vp-code-light"><code><span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    &quot;foo&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">        &quot;bar&quot;: &quot;baz&quot;,</span></span>
<span class="line diff remove"><span style="color:#24292e;">        &quot;waldo&quot;: &quot;fred&quot;  </span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    &quot;baz&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">        &quot;qux&quot;: &quot;quux&quot;,</span></span>
<span class="line diff add"><span style="color:#24292e;">        &quot;thud&quot;: &quot;fred&quot;  </span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div></details><details class="details custom-block"><summary>Example 2. Move an Array Element</summary><p>Original document:</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;foo&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;el1&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;el2&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;el3&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;el4&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;foo&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;el1&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;el2&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;el3&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;el4&quot;</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>Patch:</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;op&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;move&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;from&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;/foo/1&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;path&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;/foo/3&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;op&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;move&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;from&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;/foo/1&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;path&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;/foo/3&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">]</span></span></code></pre></div><p>Result:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark has-diff vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;foo&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;el1&quot;,</span></span>
<span class="line diff remove"><span style="color:#e1e4e8;">        &quot;el2&quot;  </span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;el3&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;el4&quot;,</span></span>
<span class="line diff add"><span style="color:#e1e4e8;">        &quot;el2&quot;  </span></span>
<span class="line"><span style="color:#e1e4e8;">    ]</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light has-diff vp-code-light"><code><span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    &quot;foo&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">        &quot;el1&quot;,</span></span>
<span class="line diff remove"><span style="color:#24292e;">        &quot;el2&quot;  </span></span>
<span class="line"><span style="color:#24292e;">        &quot;el3&quot;,</span></span>
<span class="line"><span style="color:#24292e;">        &quot;el4&quot;,</span></span>
<span class="line diff add"><span style="color:#24292e;">        &quot;el2&quot;  </span></span>
<span class="line"><span style="color:#24292e;">    ]</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div></details>`,2),T={id:"copy",tabindex:"-1"},P=s("a",{class:"header-anchor",href:"#copy","aria-label":'Permalink to "copy <Badge type="info" text="operation" title="operation"/>"'},"​",-1),S=s("blockquote",null,[s("p",null,[a("The operation object MUST contain a "),s("code",null,"from"),a(" member, which is a string containing a JSON Pointer value that references the location in the target document to move the value from.")])],-1),O=s("p",null,[a("The "),s("code",null,"copy"),a(" operation copies the value at a specified location to the target location.")],-1),N=n(`<details class="details custom-block"><summary>Example 1. Copy an Object Member</summary><p>Original document:</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;foo&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;bar&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;baz&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;waldo&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;fred&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;baz&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;qux&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;quux&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;foo&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;bar&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;baz&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;waldo&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;fred&quot;</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;baz&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;qux&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;quux&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>Patch:</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;op&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;copy&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;from&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;/foo/waldo&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;path&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;/baz/thud&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;op&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;copy&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;from&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;/foo/waldo&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;path&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;/baz/thud&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">]</span></span></code></pre></div><p>Result:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark has-highlighted-lines has-diff vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;foo&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;bar&quot;: &quot;baz&quot;,</span></span>
<span class="line highlighted"><span style="color:#e1e4e8;">        &quot;waldo&quot;: &quot;fred&quot;  </span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;baz&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;qux&quot;: &quot;quux&quot;,</span></span>
<span class="line diff add"><span style="color:#e1e4e8;">        &quot;thud&quot;: &quot;fred&quot;  </span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light has-highlighted-lines has-diff vp-code-light"><code><span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    &quot;foo&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">        &quot;bar&quot;: &quot;baz&quot;,</span></span>
<span class="line highlighted"><span style="color:#24292e;">        &quot;waldo&quot;: &quot;fred&quot;  </span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    &quot;baz&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">        &quot;qux&quot;: &quot;quux&quot;,</span></span>
<span class="line diff add"><span style="color:#24292e;">        &quot;thud&quot;: &quot;fred&quot;  </span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div></details>`,1),z={id:"test",tabindex:"-1"},A=s("a",{class:"header-anchor",href:"#test","aria-label":'Permalink to "test <Badge type="info" text="operation" title="operation"/>"'},"​",-1),w=s("blockquote",null,[s("p",null,[a("The operation object "),s("strong",null,"MUST"),a(" contain a "),s("code",null,"value"),a(" member that conveys the value to be compared to the target location's value.")])],-1),J=s("p",null,[a("The "),s("code",null,"test"),a(" operation tests that a value at the target location is equal to a specified value.")],-1),R=n(`<details class="details custom-block"><summary>Example</summary><p>Original document:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark has-highlighted-lines vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line highlighted"><span style="color:#e1e4e8;">    &quot;baz&quot;: &quot;qux&quot;,  </span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;foo&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;a&quot;,</span></span>
<span class="line highlighted"><span style="color:#e1e4e8;">        2,  </span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;c&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ]</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light has-highlighted-lines vp-code-light"><code><span class="line"><span style="color:#24292e;">{</span></span>
<span class="line highlighted"><span style="color:#24292e;">    &quot;baz&quot;: &quot;qux&quot;,  </span></span>
<span class="line"><span style="color:#24292e;">    &quot;foo&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">        &quot;a&quot;,</span></span>
<span class="line highlighted"><span style="color:#24292e;">        2,  </span></span>
<span class="line"><span style="color:#24292e;">        &quot;c&quot;</span></span>
<span class="line"><span style="color:#24292e;">    ]</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>Patch:</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;op&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;test&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;path&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;/baz&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;value&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;qux&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;op&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;test&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;path&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;/foo/1&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;value&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">2</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;op&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;test&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;path&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;/baz&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;value&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;qux&quot;</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;op&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;test&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;path&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;/foo/1&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;value&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">2</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">]</span></span></code></pre></div><p>Result:</p><p><code>successful</code></p></details><h2 id="json-merge-patch" tabindex="-1">JSON Merge Patch <a class="header-anchor" href="#json-merge-patch" aria-label="Permalink to &quot;JSON Merge Patch&quot;">​</a></h2><p>The merge patch format is primarily intended for use with the HTTP PATCH method as a means of describing a set of modifications to a target resource&#39;s content.</p><p>A JSON merge patch document describes changes to be made to a target JSON document using a syntax that closely mimics the document being modified.</p><p>Recipients of a merge patch document determine the exact set of changes being requested by <strong>comparing</strong> the content of the provided patch against the current content of the target document.</p><ul><li>If the provided merge patch contains members that do not appear within the target, those members are added.</li><li>If the target does contain the member, the value is replaced.</li><li>Null values in the merge patch are given special meaning to indicate the removal of existing values in the target.</li></ul><details class="details custom-block"><summary>Example</summary><p>Original document:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark has-highlighted-lines vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line highlighted"><span style="color:#e1e4e8;">    &quot;a&quot;: &quot;b&quot;,  </span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;c&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;d&quot;: &quot;e&quot;,</span></span>
<span class="line highlighted"><span style="color:#e1e4e8;">        &quot;f&quot;: &quot;g&quot;  </span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light has-highlighted-lines vp-code-light"><code><span class="line"><span style="color:#24292e;">{</span></span>
<span class="line highlighted"><span style="color:#24292e;">    &quot;a&quot;: &quot;b&quot;,  </span></span>
<span class="line"><span style="color:#24292e;">    &quot;c&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">        &quot;d&quot;: &quot;e&quot;,</span></span>
<span class="line highlighted"><span style="color:#24292e;">        &quot;f&quot;: &quot;g&quot;  </span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>Patch:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark has-highlighted-lines vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line highlighted"><span style="color:#e1e4e8;">    &quot;a&quot;: &quot;z&quot;,  </span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;c&quot;: {</span></span>
<span class="line highlighted"><span style="color:#e1e4e8;">        &quot;f&quot;: null  </span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light has-highlighted-lines vp-code-light"><code><span class="line"><span style="color:#24292e;">{</span></span>
<span class="line highlighted"><span style="color:#24292e;">    &quot;a&quot;: &quot;z&quot;,  </span></span>
<span class="line"><span style="color:#24292e;">    &quot;c&quot;: {</span></span>
<span class="line highlighted"><span style="color:#24292e;">        &quot;f&quot;: null  </span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>Result:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark has-diff vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line diff remove"><span style="color:#e1e4e8;">    &quot;a&quot;: &quot;z&quot;,  </span></span>
<span class="line diff add"><span style="color:#e1e4e8;">    &quot;a&quot;: &quot;b&quot;,  </span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;c&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;d&quot;: &quot;e&quot;,</span></span>
<span class="line diff remove"><span style="color:#e1e4e8;">        &quot;f&quot;: &quot;g&quot;  </span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light has-diff vp-code-light"><code><span class="line"><span style="color:#24292e;">{</span></span>
<span class="line diff remove"><span style="color:#24292e;">    &quot;a&quot;: &quot;z&quot;,  </span></span>
<span class="line diff add"><span style="color:#24292e;">    &quot;a&quot;: &quot;b&quot;,  </span></span>
<span class="line"><span style="color:#24292e;">    &quot;c&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">        &quot;d&quot;: &quot;e&quot;,</span></span>
<span class="line diff remove"><span style="color:#24292e;">        &quot;f&quot;: &quot;g&quot;  </span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>That is</p><ul><li>the value of <code>a</code> in the original document has been <strong>replaced</strong> by the value of <code>a</code> in the patch document</li><li>and the <code>f</code> member of <code>c</code> has been <strong>removed</strong> cause its value is <code>null</code> in the patch document.</li></ul></details><h2 id="related-projects" tabindex="-1">Related Projects <a class="header-anchor" href="#related-projects" aria-label="Permalink to &quot;Related Projects&quot;">​</a></h2><h3 id="npm" tabindex="-1">npm <a class="header-anchor" href="#npm" aria-label="Permalink to &quot;npm&quot;">​</a></h3><ul><li><a href="https://www.npmjs.com/package/fast-json-patch" target="_blank" rel="noreferrer">fast-json-patch</a></li><li><a href="https://www.npmjs.com/package/json8-patch" target="_blank" rel="noreferrer">json8-patch</a></li></ul><h3 id="cargo" tabindex="-1">cargo <a class="header-anchor" href="#cargo" aria-label="Permalink to &quot;cargo&quot;">​</a></h3><ul><li><a href="https://crates.io/crates/json_patch" target="_blank" rel="noreferrer">json_patch</a></li></ul><h2 id="references" tabindex="-1">References <a class="header-anchor" href="#references" aria-label="Permalink to &quot;References&quot;">​</a></h2><ul><li><a href="https://datatracker.ietf.org/doc/html/rfc6902" target="_blank" rel="noreferrer">rfc6902: JavaScript Object Notation (JSON) Patch</a></li><li><a href="https://datatracker.ietf.org/doc/html/rfc7396" target="_blank" rel="noreferrer">rfc7396: JSON Merge Patch</a></li></ul>`,14);function M(I,V,U,D,H,$){const o=e("Badge");return t(),c("div",null,[i,s("ul",null,[s("li",null,[s("h3",u,[a("add "),l(o,{type:"info",text:"operation",title:"operation"}),a(),y]),E])]),d,s("ul",null,[s("li",null,[s("h3",q,[a("remove "),l(o,{type:"info",text:"operation",title:"operation"}),a(),h]),g])]),f,s("ul",null,[s("li",null,[s("h3",v,[a("replace "),l(o,{type:"info",text:"operation",title:"operation"}),a(),b]),m,F])]),C,s("ul",null,[s("li",null,[s("h3",k,[a("move "),l(o,{type:"info",text:"operation",title:"operation"}),a(),_]),B,x])]),j,s("ul",null,[s("li",null,[s("h3",T,[a("copy "),l(o,{type:"info",text:"operation",title:"operation"}),a(),P]),S,O])]),N,s("ul",null,[s("li",null,[s("h3",z,[a("test "),l(o,{type:"info",text:"operation",title:"operation"}),a(),A]),w,J])]),R])}const K=p(r,[["render",M]]);export{G as __pageData,K as default};
