var ge=()=>({active:!1,translated:0,cached:0,failed:0,remaining:0,pending:0});function He(e,t,n){let o=_e(e),r=_e(t);if(!o||!r)return null;let i=Oe(r,{r:255,g:255,b:255,a:1}),a=Oe(o,i),s={r:0,g:0,b:0,a:1},l={r:255,g:255,b:255,a:1},p=De(l,i)>De(s,i),c=p?l:s,u=g=>De(g,i)>=4.6?g:Wo(g,c,i,4.6),d=n?_e(p?n.dark:n.light):null,f=u(d?Oe(d,i):ne(a,d??(p?{r:94,g:234,b:212,a:1}:{r:15,g:118,b:110,a:1}),.65));if(d&&Ie(f,a)<48){let g=u(ne(f,s,.28)),b=u(ne(f,l,.28));f=Ie(g,a)>Ie(b,a)?g:b}return!d&&Ie(f,a)<48&&(f=u(ne(a,p?{r:147,g:197,b:253,a:1}:{r:37,g:99,b:235,a:1},.8))),`rgb(${Math.round(f.r)}, ${Math.round(f.g)}, ${Math.round(f.b)})`}function rn(e){let t=[],n=e;for(;n;){let r=_e(window.getComputedStyle(n).backgroundColor);r&&r.a>0&&t.push(r),n=n.parentElement}let o={r:255,g:255,b:255,a:1};for(let r of t.reverse())o=Oe(r,o);return`rgb(${Math.round(o.r)}, ${Math.round(o.g)}, ${Math.round(o.b)})`}var G,Pe=new Map;function _e(e){if(!e)return null;if(/^#[0-9a-f]{6}$/i.test(e))return{r:parseInt(e.slice(1,3),16),g:parseInt(e.slice(3,5),16),b:parseInt(e.slice(5,7),16),a:1};let t=e.trim().match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?\s*\)$/i);if(!t)return Uo(e);let n=t[4]===void 0?1:Number.parseFloat(t[4]),o=t[4]?.includes("%")?n/100:n;return{r:dt(Number(t[1])),g:dt(Number(t[2])),b:dt(Number(t[3])),a:Math.max(0,Math.min(1,o))}}function Uo(e){let t=Pe.get(e);if(t)return t;if(typeof CSS>"u"||!CSS.supports("color",e)||typeof CanvasRenderingContext2D>"u")return null;try{if(G===void 0){let s=document.createElement("canvas");s.width=s.height=1,G=s.getContext("2d",{willReadFrequently:!0})}if(!G)return null;G.clearRect(0,0,1,1),G.fillStyle=e,G.fillRect(0,0,1,1);let[n,o,r,i]=G.getImageData(0,0,1,1).data,a={r:n,g:o,b:r,a:i/255};return Pe.size>=256&&Pe.clear(),Pe.set(e,a),a}catch{return null}}function Oe(e,t){let n=e.a+t.a*(1-e.a);return n<=0?{r:0,g:0,b:0,a:0}:{r:(e.r*e.a+t.r*t.a*(1-e.a))/n,g:(e.g*e.a+t.g*t.a*(1-e.a))/n,b:(e.b*e.a+t.b*t.a*(1-e.a))/n,a:n}}function ne(e,t,n){return{r:e.r+(t.r-e.r)*n,g:e.g+(t.g-e.g)*n,b:e.b+(t.b-e.b)*n,a:1}}function Wo(e,t,n,o){let r=0,i=1;for(let a=0;a<12;a+=1){let s=(r+i)/2,l=ne(e,t,s);De(l,n)>=o?i=s:r=s}return ne(e,t,i)}function De(e,t){let n=Math.max(Ne(e),Ne(t)),o=Math.min(Ne(e),Ne(t));return(n+.05)/(o+.05)}function Ne(e){let t=n=>{let o=n/255;return o<=.04045?o/12.92:((o+.055)/1.055)**2.4};return .2126*t(e.r)+.7152*t(e.g)+.0722*t(e.b)}function Ie(e,t){return Math.hypot(e.r-t.r,e.g-t.g,e.b-t.b)}function dt(e){return Math.max(0,Math.min(255,Number.isFinite(e)?e:0))}function sn(e){return ut().isElementVisuallyRendered(e)}function ut(){let e=new WeakMap,t=new WeakMap,n=new WeakMap,o=s=>{let l=e.get(s);if(l!==void 0)return l;let p=ln(s,e);return e.set(s,p),p},r=s=>{let l=t.get(s);if(l)return l;let p=Go(s);return t.set(s,p),p},i=s=>{let l=n.get(s);if(l)return l;let p=jo(s,r);return n.set(s,p),p},a=(s,l)=>Ko(s,l,r);return{isTextNodeVisuallyRendered(s){let l=s.parentElement;return!!(l&&o(l)&&i(s).some(p=>a(p,l)))},isElementVisuallyRendered(s){return o(s)&&r(s).some(l=>a(l,s))}}}function ln(e,t){let n=e.ownerDocument.defaultView;if(!n)return!1;let o=n.getComputedStyle(e);if(o.display==="none"||o.visibility==="hidden"||o.visibility==="collapse"||o.contentVisibility==="hidden"||Jo(o.opacity)<=0)return!1;let r=e.parentElement;if(!r)return!0;let i=t?.get(r);if(i!==void 0)return i;let a=ln(r,t);return t?.set(r,a),a}function jo(e,t){let o=e.ownerDocument.createRange();o.selectNodeContents(e);let r=o.getClientRects;if(typeof r=="function"){let i=Array.from(r.call(o));return o.detach?.(),i.filter(ze)}return o.detach?.(),e.parentElement?t(e.parentElement):[]}function Go(e){let t=Array.from(e.getClientRects?.()??[]).filter(ze);if(t.length)return t;let n=e.getBoundingClientRect();return ze(n)?[n]:[]}function Ko(e,t,n){let o=Xo(e,t,n);if(!o||!ze(o))return!1;let r=t.ownerDocument.defaultView;if(!r)return!1;let i=r.innerWidth,a=r.innerHeight;if(i<=0||a<=0)return!0;let s=dn(0,i,a,0),l=Zo(o,s);return l?Yo(l,t):!0}function Xo(e,t,n){let o=t.ownerDocument.defaultView;if(!o)return null;let r=e,i=t;for(;i&&r;){let a=o.getComputedStyle(i),s=an(a.overflowX||a.overflow),l=an(a.overflowY||a.overflow);if(s||l){let p=n(i)[0]??i.getBoundingClientRect();r=cn(r,p,s,l)}i=i.parentElement}return r}function Yo(e,t){let n=t.ownerDocument;if(n.defaultView?.getComputedStyle(t).pointerEvents==="none")return!0;let o=n.elementFromPoint?.bind(n);if(!o)return!0;let r=Math.min(e.right,e.left+1),i=Math.max(e.left,e.right-1),a=Math.min(e.bottom,e.top+1),s=Math.max(e.top,e.bottom-1),l=(e.left+e.right)/2,p=(e.top+e.bottom)/2,c=[[l,p],[r,p],[i,p],[l,a],[l,s]],u=!1;for(let[d,m]of c){let f=o(d,m);if(f&&(u=!0,f===t||t.contains(f)||f.contains(t)))return!0}return!u}function an(e){return e==="hidden"||e==="clip"}function cn(e,t,n,o){let r=n?Math.max(e.left,t.left):e.left,i=n?Math.min(e.right,t.right):e.right,a=o?Math.max(e.top,t.top):e.top,s=o?Math.min(e.bottom,t.bottom):e.bottom;return i>r&&s>a?dn(a,i,s,r):null}function Zo(e,t){return cn(e,t,!0,!0)}function dn(e,t,n,o){return{top:e,right:t,bottom:n,left:o,width:Math.max(0,t-o),height:Math.max(0,n-e)}}function ze(e){return e.width>1&&e.height>1}function Jo(e){let t=Number.parseFloat(e);return Number.isFinite(t)?t:1}function un(e,t){let n=e.currentSrc||e.src;if(t<2||!e.complete||!e.naturalWidth||!e.naturalHeight||!/(?:^|[/_.-])(?:txt|text|copy)(?=[/_.-]|$)/i.test(n.split(/[?#]/)[0]))return null;let o=Math.min(1,1200/e.naturalWidth,1600/e.naturalHeight),r=document.createElement("canvas");r.width=Math.max(1,Math.round(e.naturalWidth*o)),r.height=Math.max(1,Math.round(e.naturalHeight*o));try{let i=r.getContext("2d",{willReadFrequently:!0});return i?(i.drawImage(e,0,0,r.width,r.height),Qo(i.getImageData(0,0,r.width,r.height).data,r.width,r.height,t)):null}catch{return null}}function Qo(e,t,n,o){if(t<1||n<1||o<2||e.length!==t*n*4)return null;let r=[],i=new Map,a=0,s;for(let g=0;g<n;g++){let b=0;for(let h=0;h<t;h++){let w=(g*t+h)*4;if(e[w+3]<96)continue;b++,a++;let R=[e[w],e[w+1],e[w+2]],I=R.map(Me=>Math.round(Me/24)).join(","),L=i.get(I);L?L.count++:i.set(I,{count:1,rgb:R})}b>=Math.max(2,t*.002)?s?s.bottom=g+1:(s={top:g,bottom:g+1},r.push(s)):s=void 0}let l=a/(t*n);if(l<.003||l>.3||r.length<o)return null;let p=r.map(g=>g.bottom-g.top).filter(g=>g>=3).sort((g,b)=>g-b),c=p[Math.floor(p.length/2)];if(!c)return null;let d=r.slice(1).map((g,b)=>({size:g.top-r[b].bottom,middle:(g.top+r[b].bottom)/2})).sort((g,b)=>b.size-g.size).slice(0,o-1);if(d.some(g=>g.size<c*.65))return null;let m=[0,...d.map(g=>g.middle).sort((g,b)=>g-b),n],f=[...i.values()].sort((g,b)=>b.count-g.count)[0]?.rgb;return f?{width:t,height:n,slices:m.slice(0,-1).map((g,b)=>({top:g,bottom:m[b+1]})),foreground:`rgb(${f.join(", ")})`,fontRatio:c*1.1/t}:null}function pn(e){return e.match(/⟪QIANXI\d+⟫/gu)??[]}function gn(e,t){let n=t.replace(/[⟪《〈<【\[{«「『]+\s*QIANXI\s*(\d+)\s*[⟫》〉>】\]}»」』]+/giu,(i,a)=>`\u27EAQIANXI${Number(a)}\u27EB`),o=pn(e).sort(),r=pn(n).sort();return o.length===r.length&&o.every((i,a)=>i===r[a])?n:void 0}var oe=["main","article","[role='main']",".markdown-body",".docblock","#main-content",".entry-content",".post-content",".article-content"].join(",");function re(e){if(!e.matches("div")||!e.closest(oe)||e.querySelector("div,p,h1,h2,h3,h4,h5,h6,li,table,ul,ol,blockquote,section,article,header,footer,aside,nav,button,input,textarea,select,[role='button'],[role='listitem'],[contenteditable]"))return!1;let t=e.ownerDocument.defaultView?.getComputedStyle(e).display??"";return!/^(?:inline-)?(?:flex|grid)$/u.test(t)}var me=new Set,er=/^(?:A|SPAN|B|BIG|SMALL|I|EM|STRONG|U|S|SUB|SUP|FONT|TT|CODE|NOBR|BR)$/u,mn="div,p,h1,h2,h3,h4,h5,h6,li,table,ul,ol,blockquote,section,article,header,footer,aside,nav,button,input,textarea,select,[contenteditable]";function Be(e){return[...e.querySelectorAll("meta[name]")].some(t=>t.getAttribute("name")?.toLowerCase()==="generator"&&/^LaTeX2HTML\b/iu.test(t.getAttribute("content")??""))}function fn(e){let t=e.ownerDocument;if(!Be(t)||!t.body||e!==t.body&&e.parentElement!==t.body)return;let n=[],o=()=>{if(n.some(r=>new RegExp("\\p{L}","u").test(r.textContent??""))){let r=t.createElement("span");r.dataset.qianxiScientificSource="",n[0].before(r),r.append(...n),me.add(r)}n=[]};for(let r of[...t.body.childNodes]){if(r instanceof Text||r.nodeType===Node.COMMENT_NODE){n.push(r);continue}r instanceof Element&&er.test(r.tagName)&&!me.has(r)&&!r.matches("[clear], [role], [contenteditable], .qianxi-translation, .qianxi-translation-pending")&&!r.querySelector(mn)?n.push(r):o()}o()}function hn(){for(let e of me)e.replaceWith(...e.childNodes);me.clear()}function fe(e){return me.has(e)?!0:e.matches("div")&&Be(e.ownerDocument)&&!e.matches(".navigation,.mathdisplay,.equation")&&!e.querySelector(mn)&&!/^(?:inline-)?(?:flex|grid)$/u.test(e.ownerDocument.defaultView?.getComputedStyle(e).display??"")}function Fe(e){let t=e.closest("[data-qianxi-scientific-source],div");return t&&fe(t)?t:null}function pt(e){return e.matches(".MATH")&&!!e.querySelector("img[alt]")&&[...e.querySelectorAll("img[alt]")].every(t=>/^\s*\$[\s\S]*\$\s*$/u.test(t.getAttribute("alt")??""))}function bn(e){return e.matches("a[href]")&&Be(e.ownerDocument)&&/^\s*\[?\d+(?:\s*[,–-]\s*\d+)*\]?\s*$/u.test(e.textContent??"")}function gt(e){return!!e.closest(".mathdisplay,table.equation,.eqno")&&Be(e.ownerDocument)}var tr=[{id:"youtube",label:"YouTube",hosts:["youtube.com","youtube-nocookie.com"],player:"#movie_player,.html5-video-player",captions:".ytp-caption-window-container",lines:".caption-visual-line",toggle:".ytp-subtitles-button",bridge:!0},{id:"bilibili",label:"\u54D4\u54E9\u54D4\u54E9",hosts:["bilibili.com"],player:".bpx-player-container,.bilibili-player-video-wrap",captions:".bili-subtitle-x-subtitle-panel-major-group,.bpx-player-subtitle-panel,.bilibili-player-video-subtitle",toggle:".bpx-player-ctrl-subtitle",bridge:!0},{id:"netflix",label:"Netflix",hosts:["netflix.com"],player:".watch-video,.watch-video--player-view,.VideoContainer",captions:".player-timedtext",lines:".player-timedtext-text-container"},{id:"vimeo",label:"Vimeo",hosts:["vimeo.com","vhx.tv"],player:".player,.vp-video-wrapper",captions:".vp-captions,[class*='CaptionsRenderer_module_captionsWindow']",lines:"[class*='CaptionsRenderer_module_captionsLine']"},{id:"disney",label:"Disney+",hosts:["disneyplus.com"],player:"disney-web-player,.btm-media-overlays-container",captions:".dss-subtitle-renderer-cue,.hive-subtitle-renderer-cue"},{id:"prime",label:"Prime Video",hosts:["primevideo.com","amazon.com","amazon.co.jp","amazon.co.uk","amazon.de","amazon.fr","amazon.it","amazon.es","amazon.in","amazon.ca","amazon.com.au","amazon.com.br"],player:".atvwebplayersdk-player-container,.webPlayerUIContainer",captions:".atvwebplayersdk-captions-text",lines:".atvwebplayersdk-captions-text span"},{id:"ted",label:"TED",hosts:["ted.com"],player:".video-js,[data-testid='video-player']",captions:"#subtitles-container,.vjs-text-track-display",lines:".whitespace-pre-line,.vjs-text-track-cue"},{id:"coursera",label:"Coursera",hosts:["coursera.org"],player:".rc-VideoPlayer,.video-js",captions:".rc-CaptionsRenderer,.vjs-text-track-display",lines:".vjs-text-track-cue"},{id:"udemy",label:"Udemy",hosts:["udemy.com"],player:".video-player--container,.video-js,[data-purpose='video-player'],[data-purpose='media-player-container']",captions:"[class*='captions-display--captions-container'],[class*='_caption-container_'],.vjs-text-track-display",lines:"[class*='captions-display--captions-cue-text'],[class*='_cue-text_'],.vjs-text-track-cue"}];function wn(e=location.hostname){return tr.find(t=>t.hosts.some(n=>e===n||e.endsWith(`.${n}`)))}var nr=["font-family","font-size","font-weight","font-style","font-stretch","font-variant","line-height","letter-spacing","word-spacing","text-transform","text-align"],K=new Map,we=new Set,xe,he,be;function xn(e,t){let n=window.getComputedStyle(t);for(let o of nr){let r=n.getPropertyValue?.(o);r&&(e.style.getPropertyValue(o)!==r||e.style.getPropertyPriority(o)!=="important")&&e.style.setProperty(o,r,"important")}}function ie(){be??=window.setTimeout(or,16)}function or(){be=void 0;for(let[t,n]of K)!t.isConnected||!n.isConnected?K.delete(t):xn(t,n);if(!K.size){ft();return}let e=new Set(K.values());for(let t of we)e.has(t)||(xe?.unobserve(t),we.delete(t))}function mt(e,t){t.contains(e)||(K.set(e,t),xn(e,t),he||(he=new MutationObserver(n=>{n.some(o=>{if(o.type==="childList")return o.removedNodes.length>0||o.target instanceof Element&&o.target.matches("style,head");let r=o.target;return r instanceof Element&&!r.closest(".qianxi-translation,.qianxi-translation-pending")&&[...K.values()].some(i=>r.contains(i))})&&ie()}),he.observe(document.documentElement,{subtree:!0,childList:!0,attributes:!0,attributeFilter:["style","class","dir","lang","hidden"]}),typeof ResizeObserver<"u"&&(xe=new ResizeObserver(ie)),window.addEventListener("resize",ie),document.fonts?.addEventListener("loadingdone",ie)),we.has(t)||(we.add(t),xe?.observe(t)))}function ft(){be!==void 0&&window.clearTimeout(be),be=void 0,he?.disconnect(),xe?.disconnect(),he=void 0,xe=void 0,window.removeEventListener("resize",ie),document.fonts?.removeEventListener("loadingdone",ie),K.clear(),we.clear()}var v="qianxi-translation",kn="qianxi-translation-pending",y="data-qianxi-translated",N="data-qianxi-target-id",H="data-qianxi-translation-target",q="qianxi-replaced-source",ht="qianxi-stable-replacement",$e="qianxi-stable-source",rr=new Set(["SCRIPT","STYLE","NOSCRIPT","BUTTON","TEXTAREA","INPUT","SELECT","OPTION","KBD","SAMP","SVG","CANVAS"]),Ee=["[data-qianxi-video]","[data-qianxi-video-native]","#qianxi-video-panel","#qianxi-video-overlay","#qianxi-selection-tools","#qianxi-floating-hitbox","#qianxi-floating-menu","#qianxi-debug-panel","#qianxi-paragraph-highlight","header","nav","footer","aside","summary","button","a[role='button']","[role='button']","[role='tab']","[role='menuitem']","[role='navigation']","[role='banner']","[role='contentinfo']","[contenteditable]:not([contenteditable='false'])","[hidden]","[aria-hidden='true']","details-menu","details-dialog","modal-dialog",".sr-only",".rustdoc-breadcrumbs",".breadcrumbs",".breadcrumb","[aria-label*='breadcrumb']","[aria-label*='Breadcrumb']",".IssueLabel",".js-issue-labels",".sidebar-labels",".discussion-sidebar-item","[class*='LabelsList-module__']","[class*='LabelToken-module__']","[class*='prc-Token-']","[data-component='Tooltip']",".gh-header-actions",".tabnav",".UnderlineNav",".js-repo-nav"],ir=Ee.join(","),ar=Ee.filter(e=>e!=="[aria-hidden='true']").join(","),yn=Ee.filter(e=>e!=="summary").join(","),vn=Ee.filter(e=>!["nav","aside","header","footer","[role='navigation']","[role='banner']","[role='contentinfo']"].includes(e)).join(","),sr=Ee.filter(e=>!["header","nav","footer","aside","button","a[role='button']","[role='button']","[role='tab']","[role='menuitem']","[role='navigation']","[role='banner']","[role='contentinfo']"].includes(e)).join(","),Cn="nav.sidebar, #rustdoc-toc, .sidebar-elems",lr=["nav","aside","[role='navigation']","[task-menu]",Cn].join(","),M="h1,h2,h3,h4,h5,h6",cr=["header","aside","footer","[role='banner']","[role='contentinfo']"].join(","),X=["p","blockquote",M,"figcaption","caption","dt","dd","th","td"].join(","),ae="[data-testid='tweetText']",$=["#description-inline-expander .ytAttributedStringHost","ytd-expandable-video-description-body-renderer .ytAttributedStringHost","#description yt-formatted-string.content"].join(","),Y="ytd-comment-view-model #content-text, ytd-comment-renderer #content-text",dr=["shreddit-comment [slot='commentMeta']","shreddit-comment [slot='authorName']","shreddit-comment [slot='authorFlair']","shreddit-comment [slot='timestamp']","shreddit-post [slot='credit-bar']"].join(","),Rn="pre, code, .highlight, .example-wrap, .blob-code, .react-code-text",ur=".react-code-text, .blob-code, pre, code, .highlight",E=[],S=[],A=[],C=[],D=new Map,Z=new Map,k=new Map,z=new Map,_=new Map,An=new WeakSet,pr=0,xt=0,gr=["p","li","blockquote","figcaption","caption","dt","dd","th","td","label",M,"[class*='IssueMetadata-module__metadataValue__']",".docblock p",".docblock li",".docblock blockquote",".methods p",".impl-items p",".markdown-body > div",".markdown-body > p",".comment-body p",ae,$,Y].join(",");function Ln(e=!0){return Tt(),St(document.body,!0,e)}function Mn(e,t=!0){return E=E.filter(n=>!e.contains(n.node)),S=S.filter(n=>!n.nodes.some(o=>e.contains(o.node))),A=A.filter(n=>n.element!==e&&!e.contains(n.element)),C=C.filter(n=>n.image!==e&&!e.contains(n.image)),Hn(),St(e,!1,t)}function yt(e,t=!0){return St(e,!1,t)}function se(e=[]){let t=new Set,n=fr();for(let r of _.keys())n.has(r)||t.add(r);let o=r=>!r.node.isConnected||r.node.parentElement!==r.sourceParent||r.node.data!==(r.replaced?r.replacementValue??"":r.sourceValue);for(let r of E)n.has(r.id)||(o(r)||e.includes(r.node.parentElement))&&t.add(r.id);for(let[r,i]of k)i.isConnected||t.add(r);for(let r of S)n.has(r.id)||(!r.block.isConnected||r.nodes.some(i=>!r.block.contains(i.node))||t.has(r.id)||r.nodes.some(i=>t.has(i.id))||e.some(i=>r.block===i||r.block.contains(i)))&&(t.add(r.id),r.nodes.forEach(i=>t.add(i.id)));for(let r of A)(!r.element.isConnected||r.element.getAttribute(r.name)!==(r.translatedValue??r.sourceValue))&&t.add(r.id);for(let r of C){let i=r.image.closest("picture")??r.image,a=k.get(r.id);(!r.image.isConnected||r.image.getAttribute("alt")!==r.sourceValue||r.renderedSource&&r.renderedSource!==(r.image.currentSrc||r.image.src)||r.waitingForImage&&r.image.complete&&r.image.naturalWidth>0||a&&a.parentElement!==i.parentElement)&&t.add(r.id),t.has(r.id)&&(kt(r),r.image.removeAttribute(y),r.image.removeAttribute(N))}for(let r of E)t.has(r.id)&&r.replaced&&r.node.data===(r.replacementValue??"")&&(r.node.data=r.sourceValue);for(let r of S)t.has(r.id)&&Fn(r);for(let r of t){We(r),Ct(r),O(r);for(let i of D.get(r)??[])qn(i);D.delete(r),Z.delete(r),z.delete(r)}return E=E.filter(r=>!t.has(r.id)),S=S.filter(r=>!t.has(r.id)),A=A.filter(r=>!t.has(r.id)),C=C.filter(r=>!t.has(r.id)),[...t]}function Pn(e){let t=new Set(e.filter(a=>a.sourceValue.trim()).map(a=>a.sourceParent));if(t.size!==1)return;let n=t.values().next().value;if(!(n instanceof HTMLElement)||!n.isConnected||!n.matches("span,p,div")||n.matches("[role],[tabindex],[contenteditable],[slot]")||[...n.attributes].some(a=>a.name.startsWith("on"))||[...n.childNodes].some(a=>a instanceof Element&&!a.matches(`.${v}`)))return;let o=n.parentElement;if(!(o instanceof HTMLElement)||!o.matches("p,div")||o.matches("[contenteditable],[slot]")||o.style.display&&o.style.display!=="block"||![..._.values()].some(a=>a.source===n&&a.container===o)&&window.getComputedStyle(o).display!=="block"||[...o.childNodes].some(a=>a!==n&&a.nodeType!==Node.COMMENT_NODE&&!(a instanceof Text&&!a.data.trim())&&!(a instanceof Element&&a.matches(`.${v}`))))return;let i=window.getComputedStyle(n);if(!(i.display==="none"||Number.parseFloat(i.opacity)===0||i.visibility==="hidden"&&!n.classList.contains($e)||i.position==="absolute"||i.position==="fixed"||i.clip&&i.clip!=="auto"||i.clipPath&&i.clipPath!=="none"))return n}function mr(e){return[...e.childNodes].filter(t=>t instanceof Text)}function fr(){let e=new Set,t=new Map(S.map(r=>[r.id,r])),n=new Set(S.flatMap(r=>r.nodes)),o=new Map;for(let r of S)o.set(r.id,r.nodes);for(let r of E)n.has(r)||o.set(r.id,[r]);for(let[r,i]of o){let a=k.get(r);if(a instanceof Text)continue;let s=z.get(r);if(!s||a?.getAttribute("data-qianxi-display-mode")!=="replace"||!_.has(r)&&!i.some(f=>f.replaced))continue;let l=t.get(r),p=_.get(r);if(p&&(!p.container.isConnected||p.source.parentElement!==p.container||a.isConnected&&a.parentElement!==p.container)||D.has(r)||l?.authoredLines||l?.insertionBefore||l?.insertionAfter||i.some(f=>f.mode==="code-comment"))continue;let c=Pn(i);if(!c||l&&(!l.block.isConnected||!l.block.contains(c)))continue;let u=mr(c),d=x(u.map(f=>f.data).join(""));if(!d||d!==x(Z.get(r)??""))continue;An.add(c);let m=i;if(u.length!==i.length||u.some((f,g)=>i[g].node!==f||i[g].sourceValue!==f.data||i[g].replaced)){m=u.map(g=>({id:r,node:g,mode:i[0].mode,sourceValue:g.data,sourceParent:c}));let f=new Set(i);E=E.filter(g=>!f.has(g)),E.push(...m),l?l.nodes=m:m.length>1&&S.push({id:r,nodes:m,block:c,mode:m[0].mode})}e.add(r),a?.isConnected?bt(r,m,a):J([{id:r,text:s}],"replace")}return e}function bt(e,t,n){let o=Pn(t);if(!o||!An.has(o))return!1;let r=o.parentElement,i=_.get(e);i&&(i.source!==o||i.container!==r)&&We(e),_.has(e)||_.set(e,{source:o,container:r,sourceHadClass:o.hasAttribute("class"),containerHadClass:r.hasAttribute("class")}),o.classList.contains($e)||o.classList.add($e),r.classList.contains(ht)||r.classList.add(ht),n.getAttribute("data-qianxi-container")!=="stable-replacement"&&n.setAttribute("data-qianxi-container","stable-replacement");let a=Ge(o);n.getAttribute(H)!==a&&n.setAttribute(H,a),o.getAttribute(y)!=="true"&&o.setAttribute(y,"true");let s=window.getComputedStyle(o);for(let l of["font-family","font-size","font-weight","font-style","font-stretch","font-variant","line-height","letter-spacing","word-spacing","text-transform","color"]){let p=s.getPropertyValue(l);p&&(n.style.getPropertyValue(l)!==p||n.style.getPropertyPriority(l)!=="important")&&n.style.setProperty(l,p,"important")}return n.parentElement!==r&&o.after(n),!0}function We(e){let t=_.get(e);if(t){for(let[n,o,r]of[[t.source,$e,t.sourceHadClass],[t.container,ht,t.containerHadClass]])n.classList.remove(o),!r&&n.getAttribute("class")===""&&n.removeAttribute("class");_.delete(e)}}function je(e){if(e?.closest(Rn)&&!Lr(e))return $r(e);let t=e;for(;t&&t!==document.body;){if(!le(t)&&t.matches(gr)){let n=x(t.textContent??"");if(n.length>=2&&(to(t)||!Nt(n,t)))return t}t=t.parentElement}return qr(e)}function vt(e){for(let n of C)n.image!==e&&!e.contains(n.image)||(k.get(n.id)?.remove(),k.delete(n.id),O(n.id),n.image.removeAttribute(y),n.image.removeAttribute(N));Bn(e),Rt(e);let t=e.getAttribute(N);t&&At(t).forEach(n=>n.remove()),e.querySelectorAll(`.${v}`).forEach(n=>n.remove()),e.querySelectorAll(`[${y}]`).forEach(n=>{n.removeAttribute(y)}),e.removeAttribute(y),e.removeAttribute(N),E=E.filter(n=>!e.contains(n.node)),S=S.filter(n=>!n.nodes.some(o=>e.contains(o.node))),A=A.filter(n=>n.element!==e&&!e.contains(n.element)),C=C.filter(n=>n.image!==e&&!e.contains(n.image)),Hn()}function Et(e){let t=e.getAttribute(N);return t&&At(t).length>0||e.querySelector(`.${v}`)?!0:e.hasAttribute(y)||!!e.querySelector(`[${y}]`)}function Nn(){return!!(document.querySelector(`.${v}`)||document.querySelector(`[${y}]`)||document.querySelector(`[${H}]`))}function Ge(e){let t=e.getAttribute(N);if(t)return t;let n=`qianxi-target-${Date.now()}-${pr++}`;return e.setAttribute(N,n),n}function St(e,t,n){t&&Tt(),fn(e),Tn(e,ae),Tn(e,$,!0);let o=new Set(E.map(d=>d.node)),r=ut(),i=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode(d){if(!d.textContent?.trim()||o.has(d))return NodeFilter.FILTER_REJECT;let m=d.parentElement;return!m||le(m,!0,r)||Cr(m)||!r.isTextNodeVisuallyRendered(d)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}}),a=[],s=[];for(;i.nextNode();){let d=i.currentNode,m=n?Ur(d):null;if(Mt(d.parentElement)&&!m)continue;let f=x(d.textContent??""),g=m?.text??f;if(!g||g.length<2||!m&&Xn(g)||d.parentElement?.closest($)&&/^https?:\/\/\S+$/i.test(g)||!m&&Nt(g,d.parentElement))continue;let b=`seg-${Date.now()}-${xt++}`,h={id:b,node:d,mode:m?"code-comment":Gn(d.parentElement),sourceValue:d.data,sourceParent:d.parentElement,commentPrefix:m?.prefix};E.push(h),s.push(h),a.push({id:b,text:g,element:d.parentElement})}let l=yr(s,a,r),p=wr(e,r),c=hr(e,r),u=[...l,...p,...c];return u.forEach(d=>Z.set(d.id,d.text)),u}function J(e,t="bilingual"){e=e.flatMap(({id:o,text:r})=>{if(!D.has(o))return[{id:o,text:r}];let i=gn(Z.get(o)??"",r);return i!==void 0?[{id:o,text:i}]:(O(o),[])});let n=new Map(e.map(o=>[o.id,o.text]));for(let{id:o,text:r}of e)Z.has(o)&&z.set(o,r);for(let o of S){let r=n.get(o.id),i=o.block;if(!r||i.closest(`.${v}`)||(O(o.id),qe(o.id,r)))continue;let a=Ge(i);if(t==="replace"&&Sn(o.id,o.nodes,i,r)){i.setAttribute(y,"true");continue}let s=document.createElement("span");if(s.className=v,s.dataset.qianxiMode=o.mode,s.dataset.qianxiDisplayMode=t,o.preserveWhitespace&&(s.dataset.qianxiPreserveWhitespace="true"),ve(s,i,t),Nr(s,o.id,r),s.setAttribute("lang","translated"),t!=="replace"&&s.setAttribute("aria-hidden","true"),s.setAttribute(H,a),i.setAttribute(y,"true"),t==="replace"&&bt(o.id,o.nodes,s)){k.set(o.id,s);continue}jn(o,s,t),mt(s,i),k.set(o.id,s),t==="replace"&&(En(o.nodes,o.id),o.authoredLines&&(o.sourceHidden??={hadClassAttribute:o.block.hasAttribute("class")},o.block.classList.add(q)))}for(let o of E){if(S.some(s=>s.nodes.includes(o)))continue;let r=n.get(o.id),i=o.node.parentElement;if(!r||!i||i.closest(`.${v}`)||(O(o.id),qe(o.id,r)))continue;if(t==="replace"&&Sn(o.id,[o],i,r)){i.setAttribute(y,"true");continue}let a=document.createElement("span");if(a.className=v,a.dataset.qianxiMode=o.mode,a.dataset.qianxiDisplayMode=t,ve(a,i,t),a.textContent=o.mode==="code-comment"?`${o.commentPrefix??"//"} ${r}`:r,a.setAttribute("lang","translated"),t!=="replace"&&a.setAttribute("aria-hidden","true"),i.setAttribute(y,"true"),t==="replace"&&bt(o.id,[o],a)){k.set(o.id,a);continue}o.mode==="block"&&i.matches(M)?Pt(i,a):o.node.after(a),k.set(o.id,a),t==="replace"&&En([o])}for(let o of A){let r=n.get(o.id);!r||qe(o.id,r)||(o.element.setAttribute(o.name,r),o.element.setAttribute(y,"true"),o.translatedValue=r)}for(let o of C){let r=n.get(o.id);if(!r||!o.image.isConnected)continue;if(O(o.id),k.get(o.id)?.remove(),k.delete(o.id),kt(o),qe(o.id,r)){o.image.removeAttribute(y),o.image.removeAttribute(N);continue}let i=document.createElement("span");i.className=v,i.dataset.qianxiDisplayMode=t,i.setAttribute("lang","translated"),t!=="replace"&&i.setAttribute("aria-hidden","true"),ve(i,o.image.parentElement??o.image,t),br(o,i,r,t)||(i.textContent=r),zn(o,i),k.set(o.id,i)}}function In(e){se();for(let t of k.keys())z.has(t)&&Ct(t);Rt(document.documentElement),J([...z].map(([t,n])=>({id:t,text:n})),e)}function Ke(e){let t=new Set(e.map(n=>n.id));for(let n of S){if(!t.has(n.id))continue;let o=n.block;if(o.closest(`.${v}`))continue;let r=Ge(o),i=wt(n.id,n.mode);n.preserveWhitespace&&(i.dataset.qianxiPreserveWhitespace="true"),ve(i,o,"bilingual"),i.setAttribute(H,r),O(n.id),jn(n,i),mt(i,o),o.setAttribute(y,"true")}for(let n of E){if(!t.has(n.id)||S.some(r=>r.nodes.includes(n)))continue;let o=n.node.parentElement;!o||o.closest(`.${v}`)||(xr(n.node,n.id,n.mode),o.setAttribute(y,"true"))}for(let n of C){if(!t.has(n.id)||!n.image.isConnected)continue;O(n.id);let o=wt(n.id,"block");zn(n,o)}}function _n(e){for(let t of e)O(t.id)}function On(){Xe(),Tt()}function Xe(){ft(),Bn(document.documentElement),Rt(document.documentElement),document.querySelectorAll(`.${v}`).forEach(e=>e.remove()),document.querySelectorAll(`[${y}]`).forEach(e=>{e.removeAttribute(y)}),document.querySelectorAll(`[${N}]`).forEach(e=>{e.removeAttribute(N)}),k.clear();for(let e of A)e.translatedValue=void 0}function Dn(e){J([...z].map(([t,n])=>({id:t,text:n})),e)}function Tt(){for(let e of _.keys())We(e);hn(),E=[],S=[],A=[],C=[],D=new Map,Z=new Map,k.clear(),z.clear()}function Hn(){let e=new Set([...E,...S,...A,...C].map(t=>t.id));for(let t of z.keys())e.has(t)||z.delete(t)}function hr(e,t){let n=new Set(C.map(i=>i.image)),o=[...e.matches("img[alt]")?[e]:[],...e.querySelectorAll("img[alt]")],r=[];for(let i of o){if(!(i instanceof HTMLImageElement)||n.has(i)||gt(i)||i.closest(".MATH")&&pt(i.closest(".MATH"))||le(i,!0,t)||!t.isElementVisuallyRendered(i))continue;let a=i.getAttribute("alt")??"";if(x(a).length<80||!new RegExp("\\p{L}","u").test(a))continue;let s=a.split(/\r?\n/).map(x).filter(Boolean).join(`

`),l=`seg-${Date.now()}-${xt++}`;C.push({id:l,image:i,sourceValue:a}),r.push({id:l,text:s,element:i})}return r}function zn(e,t){let n=e.image,o=n.closest("picture")??n,r=Ge(n);t.dataset.qianxiMode="block",t.dataset.qianxiContainer="image-text",t.setAttribute(H,r),o.hasAttribute("slot")&&t.setAttribute("slot",o.getAttribute("slot")),o.after(t),n.setAttribute(y,"true")}function br(e,t,n,o){let r=e.sourceValue.split(/\r?\n/).map(x).filter(Boolean),i=n.split(/\r?\n\s*\r?\n/).map(p=>p.trim()).filter(Boolean),a=i.length===r.length?i:n.split(/\r?\n/).map(p=>p.trim()).filter(Boolean);if(a.length!==r.length)return!1;e.waitingForImage=!e.image.complete;let s=un(e.image,r.length);if(!s)return!1;let l=e.image.currentSrc||e.image.src;return t.dataset.qianxiImageLayout="interleaved",Ve(t,s.foreground),t.style.setProperty("--qianxi-image-font-size",`clamp(14px, ${s.fontRatio*100}cqw, 32px)`),t.removeAttribute("aria-hidden"),r.forEach((p,c)=>{let u=document.createElement("span");if(u.className="qianxi-image-text-row",o!=="replace"){let m=s.slices[c],f=document.createElement("span");f.className="qianxi-image-text-original",f.style.aspectRatio=`${s.width} / ${m.bottom-m.top}`;let g=document.createElement("img");g.src=l,g.alt=p,g.draggable=!1,g.style.transform=`translateY(${-m.top/s.height*100}%)`,f.append(g),u.append(f)}let d=document.createElement("span");if(d.className="qianxi-image-text-result",d.textContent=a[c],o!=="replace"&&d.setAttribute("aria-hidden","true"),o==="bilingual-accent"){let f=s.foreground.match(/\d+/g).map(Number).reduce((g,b)=>g+b,0)>384?"rgb(23, 32, 38)":"rgb(255, 255, 255)";Vn.set(d,{color:s.foreground,background:f}),Ve(d,He(s.foreground,f,$n)??s.foreground)}u.append(d),t.append(u)}),e.image.classList.contains(q)||(e.image.classList.add(q),e.replaced=!0),e.renderedSource=l,!0}function kt(e){e.replaced&&e.image.classList.remove(q),e.replaced=!1,e.renderedSource=void 0,e.waitingForImage=!1}function wr(e,t){let n=new Set(A.map(i=>i.element)),o=[...e.matches("input[placeholder],textarea[placeholder]")?[e]:[],...e.querySelectorAll("input[placeholder],textarea[placeholder]")],r=[];for(let i of o){if(!(i instanceof HTMLElement)||n.has(i)||i.closest(`.${v}, #qianxi-floating-menu, #qianxi-debug-panel`)||!t.isElementVisuallyRendered(i))continue;let a=i.getAttribute("placeholder")??"",s=x(a);if(s.length<2||Xn(s))continue;let l=`seg-${Date.now()}-${xt++}`;A.push({id:l,element:i,name:"placeholder",sourceValue:a}),r.push({id:l,text:s,element:i})}return r}function Bn(e){for(let t of A)t.element!==e&&!e.contains(t.element)||t.translatedValue!==void 0&&t.element.getAttribute(t.name)===t.translatedValue&&t.element.setAttribute(t.name,t.sourceValue)}function En(e,t){for(let n of e)n.replaced||(n.node.data="",n.replaced=!0);if(t)for(let n of D.get(t)??[])n.sourceNode.classList.contains(q)||(n.sourceHidden={hadClassAttribute:n.sourceNode.hasAttribute("class")},n.sourceNode.classList.add(q))}function Sn(e,t,n,o){let r=n.closest("[role='listitem']");if(D.has(e)||t.some(a=>a.mode!=="inline")||!r?.localName.includes("-")||!Se(n))return!1;let i=t.find(a=>a.sourceValue.trim());if(!i)return!1;Ct(e);for(let a of t){let s=a===i?o:"";a.replacementValue=s,a.replaced=!0,a.node.data!==s&&(a.node.data=s)}return k.set(e,i.node),!0}function Ct(e){let t=k.get(e);t instanceof Element&&t.remove(),k.delete(e)}function Fn(e){e.sourceHidden&&(e.block.classList.remove(q),!e.sourceHidden.hadClassAttribute&&e.block.getAttribute("class")===""&&e.block.removeAttribute("class"),e.sourceHidden=void 0)}function qn(e){e.sourceHidden&&(e.sourceNode.classList.remove(q),!e.sourceHidden.hadClassAttribute&&e.sourceNode.getAttribute("class")===""&&e.sourceNode.removeAttribute("class"),e.sourceHidden=void 0)}function Rt(e){for(let[t,n]of _)(n.source===e||e.contains(n.source))&&We(t);for(let t of S)t.sourceHidden&&(t.block===e||e.contains(t.block))&&Fn(t);for(let t of C)(t.image===e||e.contains(t.image))&&kt(t);for(let t of E)!t.replaced||!t.node.parentElement||t.node.parentElement!==e&&!e.contains(t.node.parentElement)||(t.node.data===(t.replacementValue??"")&&(t.node.data=t.sourceValue),t.replaced=!1,t.replacementValue=void 0);for(let t of D.values())for(let n of t)n.sourceNode!==e&&!e.contains(n.sourceNode)||qn(n)}function qe(e,t){let n=Z.get(e);return n!==void 0&&x(n)===x(t)}function At(e){return Array.from(document.querySelectorAll(`[${H}]`)).filter(t=>t.getAttribute(H)===e)}function xr(e,t,n){O(t);let o=wt(t,n);e.parentElement&&ve(o,e.parentElement,"bilingual"),n==="block"&&e.parentElement?.matches(M)?Pt(e.parentElement,o):e.after(o)}var $n,Vn=new WeakMap;function ve(e,t,n){if(Vn.set(e,{source:t}),Se(t)||Te(t))for(let[i,a]of[["display","inline"],["position","static"],["float","none"],["visibility","visible"],["opacity","1"],["font","inherit"],["font-size",n==="replace"?"inherit":"0.92em"],["line-height","inherit"]])e.style.setProperty(i,a,"important");let o=window.getComputedStyle(t).color;if(!o||o==="transparent"||o==="rgba(0, 0, 0, 0)")return;if(n!=="bilingual-accent"){Ve(e,o);return}let r=He(o,rn(t),$n);Ve(e,r??o)}function Ve(e,t){e.style.setProperty("color",t,"important"),e.style.setProperty("-webkit-text-fill-color","currentColor","important")}function wt(e,t){let n=document.createElement("span");return n.className=`${v} ${kn}`,n.dataset.qianxiMode=t,n.dataset.qianxiPendingId=e,n.setAttribute("lang","translated"),n.setAttribute("aria-hidden","true"),n.append(document.createElement("span")),n}function O(e){document.querySelectorAll(`.${kn}[data-qianxi-pending-id="${e}"]`).forEach(t=>{let n=t.parentElement,o=t.getAttribute(H);if(t.remove(),n&&!n.querySelector(`.${v}`)&&n.removeAttribute(y),o&&!At(o).length){let r=document.querySelector(`[${N}="${o}"]`);r?.removeAttribute(y),r?.removeAttribute(N)}})}function yr(e,t,n){let o=new Map,r=new Set(t.map(s=>s.id));for(let s of e){if(s.mode==="code-comment")continue;let l=Lt(s.node.parentElement);if(!l||l.querySelector(`.${v}`)&&!l.matches($))continue;let p=o.get(l)??[];p.push(s),o.set(l,p)}let i=[],a=new Set(E.map(s=>s.node));for(let[s,l]of o){if(s.matches($)){for(let g of Er(s,l,n)){let b=g.nodes[0].id;S.push({id:b,nodes:g.nodes,block:s,mode:"block",insertionAfter:g.nodes.at(-1).node}),i.push({id:b,text:g.text,element:s}),g.nodes.forEach(h=>r.delete(h.id))}continue}if(s.matches(ae)){for(let g of Sr(s,l)){let b=g.nodes[0].id;S.push({id:b,nodes:g.nodes,block:s,mode:"block",insertionBefore:g.insertionBefore,preserveWhitespace:!0}),i.push({id:b,text:g.text,element:s}),g.nodes.forEach(h=>r.delete(h.id))}continue}let p=x(l.map(g=>g.node.textContent??"").join(" ")),c=l[0].id,{text:u,tokens:d}=Mr(s,n);if(l.length<2&&u===p&&!fe(s)&&!s.matches(`summary, label, li, ${ae}, ${Y}`)||!u)continue;let m=Wn(s),f=vr(s,l,n,a);S.push({id:c,nodes:f,block:s,mode:m?"block":Gn(s),authoredLines:m,preserveWhitespace:s.matches(Y)}),d.length&&D.set(c,d),i.push({id:c,text:u,element:s}),l.forEach(g=>r.delete(g.id))}return[...i,...t.filter(s=>r.has(s.id))]}function vr(e,t,n,o){let r=[...t],i=document.createTreeWalker(e,NodeFilter.SHOW_TEXT);for(;i.nextNode();){let a=i.currentNode,s=a.parentElement;if(o.has(a)||!s||Lt(s)!==e||s.closest("code,kbd,samp,button,input,textarea,select,option,[role='button']")||le(s,!0,n)||!n.isTextNodeVisuallyRendered(a))continue;let l={id:t[0].id,node:a,mode:t[0].mode,sourceValue:a.data,sourceParent:s};E.push(l),o.add(a),r.push(l)}return r}function Tn(e,t,n=!1){let o=[...e.matches(t)?[e]:[],...e.querySelectorAll(t)];for(let r of o){let i=document.createTreeWalker(r,NodeFilter.SHOW_TEXT),a=[];for(;i.nextNode();)a.push(i.currentNode);for(let s of a){if(s.parentElement?.closest(`.${v}`)||n&&s.parentElement?.closest("a"))continue;let l=[...s.data.matchAll(/\r?\n+/g)];for(let p of l.reverse()){let c=p.index+p[0].length;c<s.length&&s.splitText(c),p.index>0&&s.splitText(p.index)}}}}function Er(e,t,n){let o=new Map(t.map(c=>[c.node,c])),r=[],i=[],a=[],s=[],l=()=>{let c=x(s.join(""));if(i.length&&c){let u=i[0].id;i=a.map(d=>{let m=o.get(d);if(m)return m;let f={id:u,node:d,mode:"block",sourceValue:d.data,sourceParent:d.parentElement};return E.push(f),f}),r.push({nodes:i,text:c})}i=[],a=[],s=[]},p=c=>{for(let u of c.childNodes)if(u instanceof Element){if(u.matches(`.${v}`))continue;u.matches("a, br")?l():le(u,!0,n)||p(u)}else if(u instanceof Text){if(/\r?\n/.test(u.data))l();else if(n.isTextNodeVisuallyRendered(u)){s.push(u.data),a.push(u);let d=o.get(u);d&&i.push(d)}}};return p(e),l(),r}function Sr(e,t){let n=new Map(t.map(c=>[c.node,c])),o=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT,{acceptNode(c){return(c.nodeType===Node.ELEMENT_NODE?c:c.parentElement)?.closest(`.${v}`)?NodeFilter.FILTER_REJECT:c.nodeType===Node.TEXT_NODE||c.matches("br")?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),r=[],i=[],a=[],s=0,l,p=c=>{let u=a.join("").trim();i.length&&u&&r.push({nodes:i,text:u,insertionBefore:c}),i=[],a=[]};for(;o.nextNode();){let c=o.currentNode,u=c.nodeType===Node.ELEMENT_NODE,d=u?`
`:c.data,m=u?1:(d.match(/\r?\n/g)??[]).length;if(m>0&&!d.trim()){l??=c,s+=m;continue}let f=x(d);if(!f)continue;s>=2&&a.length?p(l):s===1&&a.length?a.push(`
`):a.length&&a.push(" "),s=0,l=void 0,a.push(f);let g=c.nodeType===Node.TEXT_NODE?n.get(c):void 0;g&&i.push(g)}return p(s>=2?l:void 0),r}function Lt(e){if(!e)return null;let t=e.closest($);if(t)return e.closest("a")?null:t;let n=e.closest(Y);if(n)return n;let o=Zn(e);if(o)return o;let r=Jn(e);if(r)return r;let i=Tr(e);if(i)return ye(e,i);let a=e.closest(`${X}, label, summary, ${ae}`);if(a?.matches("summary")&&!Yn(a))return null;if(a)return ye(e,a);let s=Fe(e);if(s)return s;let l=e;for(;l&&l!==document.body;){if(Wn(l))return l;if(!l.matches("span,em,strong,b,i,u,small,mark,code,a,ruby,rt"))break;l=l.parentElement}let p=e.closest("div");if(p&&re(p))return ye(e,p);let c=e.closest("li");if(!c)return null;let u=ye(e,c);if(u!==c)return u;if(kr(c))return null;let d=e.closest("a");return d&&c.contains(d)&&x(c.textContent??"")===x(d.textContent??"")&&/^(?:block|inline-block|(?:inline-)?(?:flex|grid))$/u.test(window.getComputedStyle(d).display)?d:c}function Un(e){return/^(?:inline-)?(?:flex|grid)$/u.test(window.getComputedStyle(e).display)}function Tr(e){let t=e;for(;t&&t!==document.body;){let n=window.getComputedStyle(t);if(n.whiteSpace==="nowrap"&&(/(?:hidden|clip)/u.test(`${n.overflow} ${n.overflowX}`)||n.textOverflow==="ellipsis")){let o=t;for(;o.children.length&&!Array.from(o.childNodes).some(r=>r.nodeType===Node.TEXT_NODE&&!!r.textContent?.trim());){let r=Array.from(o.children).find(i=>i===e||i.contains(e));if(!r||(o=r,o.parentElement.children.length>1))break}return o}if(t.matches(`${X},li,article,main,[role='main']`))break;t=t.parentElement}return null}function ye(e,t,n=!1){let o=e;for(;o!==t&&o.parentElement;){if(window.getComputedStyle(o).display==="inline-block"&&!o.matches("code,kbd,samp,.MATH")&&!o.querySelector(`${X},div,ul,ol,dl`))return o;let r=o.parentElement;if(Un(r)&&(n||!(r.matches("a")&&!r.querySelector(X))))return o.querySelector(`${X},div,ul,ol,dl,button,input,select,textarea`)?null:o;o=r}return t}function Wn(e){return!e.matches("span")||!e.querySelector("br")||e.closest("a,button,nav,[role='navigation'],[role='button'],[role='tab']")||e.querySelector("div,p,ul,ol,table,img,picture,video,iframe,input,textarea,select,button,[contenteditable]")||x(e.textContent??"").length<24||/^(?:inline-)?(?:flex|grid)$/u.test(window.getComputedStyle(e).display)||e.parentElement&&/^(?:inline-)?(?:flex|grid)$/u.test(window.getComputedStyle(e.parentElement).display)?!1:e.innerHTML.split(/<br\b[^>]*>/iu).filter(n=>n.replace(/<[^>]*>/gu,"").trim()).length>=2}function kr(e){return e.matches("li")&&!!e.querySelector(`${M},p,blockquote,table,ul,ol,dl`)}function Cr(e){return e.closest("li")?.querySelector(M)?!e.closest(`p, blockquote, ${M}`):!1}function le(e,t=!1,n){if(gt(e)||e.closest(`.${v},kbd,samp`)||e.closest(wn()?.captions??".vjs-text-track-display,.plyr__captions,.jw-captions")||e.closest(dr))return!0;if(Mt(e))return!1;if(Te(e))return!!e.closest(sr);if(rr.has(e.tagName))return!0;if(Se(e))return!t&&!e.closest(Cn)?!0:!!e.closest(vn);if(Br(e))return!!e.closest(vn);if(Fr(e)||Yn(e))return!!e.closest(yn);let o=Rr(e,n)?ar:ir;return!!e.closest(o)}function Rr(e,t){let n=e.closest("[aria-hidden='true']");if(!n||n.matches("svg,canvas"))return!1;let o=t?.isElementVisuallyRendered??sn;if(!o(e)||!o(n))return!1;let r=x(n.textContent??""),i=n.closest(`p,blockquote,li,${M}`)??n.parentElement;return!r||!i?!1:Array.from(i.querySelectorAll("*")).some(a=>a!==n&&!n.contains(a)&&!a.contains(n)&&x(a.textContent??"")===r&&Ar(a))}function Ar(e){let t=window.getComputedStyle(e);if(t.display==="none"||t.visibility==="hidden"||t.opacity==="0"||t.clipPath&&t.clipPath!=="none")return!0;let n=e.getBoundingClientRect();return n.width<=2&&n.height<=2}function Mt(e){return e?!!e.closest(Rn):!1}function Lr(e){let t=e.closest("code");if(!t||t.closest("pre, .highlight, .example-wrap, .blob-code, .react-code-text"))return!1;let n=t.closest("div");return!!(t.closest("p, li, blockquote")||n&&re(n))}function Mr(e,t){let n=e.cloneNode(!0),o=Array.from(n.querySelectorAll("code,kbd,samp,.MATH,a[href]")).map(i=>{let a=i,s=Or(n,a);return{element:a,sourceElement:s?Dr(e,s):null}});Pr(e,n,t),n.querySelectorAll("br").forEach(i=>{i.replaceWith(document.createTextNode(" "))}),n.querySelectorAll([`.${v}`,"script","style","noscript","button","input","textarea","select","option","rustdoc-toolbar",".anchor",".sr-only","[role='button']","[aria-hidden='true']","[hidden]","[contenteditable]:not([contenteditable='false'])","[title*='Copy item path']","[aria-label*='Copy item path']"].join(",")).forEach(i=>i.remove());let r=[];return o.forEach(({element:i,sourceElement:a})=>{if(!n.contains(i)||!a||!a.matches("code,kbd,samp")&&!pt(a)&&!bn(a)||!t.isElementVisuallyRendered(a)||!Ir(a))return;let s=_r(a),l=`\u27EAQIANXI${r.length}\u27EB`;r.push({marker:l,node:s.cloneNode(!0),sourceNode:s}),i.replaceWith(document.createTextNode(` ${l} `))}),{text:x(n.textContent??""),tokens:r}}function Pr(e,t,n){let o=e.ownerDocument.createTreeWalker(e,NodeFilter.SHOW_TEXT),r=t.ownerDocument.createTreeWalker(t,NodeFilter.SHOW_TEXT),i=[];for(;o.nextNode()&&r.nextNode();)i.push({source:o.currentNode,clone:r.currentNode});for(let a of i)(!n.isTextNodeVisuallyRendered(a.source)||Lt(a.source.parentElement)!==e)&&a.clone.remove()}function Nr(e,t,n){let o=D.get(t);if(!o?.length){e.textContent=n;return}let r=new Map(o.map(l=>[l.marker,l])),i=new RegExp(o.map(l=>Hr(l.marker)).join("|"),"g"),a=n,s=0;for(let l of a.matchAll(i)){let p=l[0],c=l.index??0;c>s&&e.append(document.createTextNode(a.slice(s,c)));let u=r.get(p);u&&e.append(u.node.cloneNode(!0)),s=c+p.length}s<a.length&&e.append(document.createTextNode(a.slice(s)))}function Ir(e){if(e.closest("pre, .highlight, .example-wrap, .blob-code, .react-code-text"))return!1;if(Te(e)||Fe(e))return!0;let t=e.closest("div");return!!(e.closest(`li,${X}`)||t&&re(t))}function _r(e){let t=e.closest("a");return t&&t.textContent?.trim()===e.textContent?.trim()?t:e}function Or(e,t){let n=[],o=t;for(;o&&o!==e;){let r=o.parentElement;if(!r)return null;n.unshift(Array.prototype.indexOf.call(r.children,o)),o=r}return o===e?n:null}function Dr(e,t){let n=e;for(let o of t){let r=n.children.item(o);if(!r)return null;n=r}return n}function Hr(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Pt(e,t){if(e.hasAttribute("slot")){e.append(t);return}if(e.matches(M)){t.setAttribute("data-qianxi-container","heading"),e.append(t);return}if(e.matches(`li, ${Y}`)){e.append(t);return}if(e.parentElement&&Un(e.parentElement)){e.append(t);return}e.after(t)}function jn(e,t,n="bilingual"){let{block:o,insertionBefore:r,insertionAfter:i,mode:a}=e;if(e.authoredLines){t.setAttribute("data-qianxi-container","authored-lines"),o.after(t);return}if(i?.parentNode){o.matches($)&&t.setAttribute("data-qianxi-container","youtube-description"),i.after(t);return}if(r?.parentNode){r.before(t);return}if(o.matches("div")&&fe(o)){o.append(t);return}if(n==="replace"){o.append(t);return}if(a==="inline"){o.append(t);return}Pt(o,t)}function Gn(e){return e?fe(e)||e.matches(ae)||e.matches(Y)?"block":e.matches("label")?zr(e)?"inline":"block":e.matches("summary")||Se(e)||Te(e)?"inline":Ue(e)?"block":Kn(e)?"inline":"block":"inline"}function zr(e){if(!e.matches("label"))return!1;if(e.querySelector("input[type='radio'],input[type='checkbox']"))return!0;let n=e.getAttribute("for");return!!(n?e.ownerDocument.getElementById(n):null)?.matches("input[type='radio'],input[type='checkbox']")}function Kn(e){let t=window.getComputedStyle(e),n=e.getBoundingClientRect(),o=t.display;return e.closest("p")||e.matches("li")&&o==="list-item"?!1:!!(o==="inline"||o==="inline-block"||o==="inline-flex"||n.width>0&&n.height>0&&n.height<=42||e.closest("h1,h2,h3,h4,h5,h6")||e.closest("li,td,th"))}function Nt(e,t){if(!t||Fe(t)||t.closest($)||t.closest(Y)||Se(t)||Te(t)||e.length>28||t.closest("p")||t.closest("figcaption,caption,dt,dd,th,td")||Ue(t))return!1;let n=t.closest(M);return n&&Ue(n)||t.closest("article, main .markdown-body, .markdown-body")||t.closest("[role='main']")?!1:!!(/^[A-Z][A-Za-z]+(?:[-_/][A-Za-z0-9]+)+$/.test(e)||/^[A-Z][A-Za-z\s]{1,24}$/.test(e)&&Kn(t))}function Xn(e){return!!(!e.trim()||!new RegExp("\\p{L}","u").test(e)||/^<?'?[a-zA-Z]>?$/.test(e)||/^(::|->|=>|for|of)$/i.test(e)||/^impl(?:<[^>]+>)?$/i.test(e))}function Ue(e){return e.matches(M)?eo(e)?!0:!e.closest("nav,[role='navigation'],button,[role='button'],[role='tab'],[role='menuitem']"):!1}function Br(e){return!!e.closest(X)?.closest(cr)}function Fr(e){let t=e.closest(M);return!!(t&&Ue(t))}function Yn(e){let t=e.closest("summary");return!!(t&&eo(t))}function Se(e){return!!Zn(e)}function Zn(e){let t=e.closest(lr);if(!t)return null;let n=e.closest("a, h2, h3, h4, li, p, [role='listitem']");if(!n||!t.contains(n)||n.matches("button,[role='button']")||n.querySelector("button,input,select,textarea,[role='button']"))return null;let o=x(n.textContent??"");if(o.length<2||o.length>80)return null;let r=ye(e,n,!0);return r!==n?r:n.matches("a")&&n.querySelector("img,svg,canvas")?Qn(e,n):n}function Te(e){return!!Jn(e)}function Jn(e){let t=e.closest("button,a,[role='button'],[role='tab'],[role='menuitem'],[role='menuitemradio'],[role='menuitemcheckbox'],[role='option']");if(!t||t.closest(M)||t.matches("a:not([role='button'])")&&!t.querySelector("img,svg,canvas")||t.querySelector("input,select,textarea,[contenteditable='true']"))return null;let n=x(t.textContent??"");return n.length<2||n.length>120?null:Qn(e,t)}function Qn(e,t){if(e===t)return t;let n=e;for(;n.parentElement&&n.parentElement!==t;){let o=n.parentElement;if(/^(?:inline-)?(?:flex|grid)$/u.test(window.getComputedStyle(o).display)||o.querySelector("img,svg,canvas,button,input,select,textarea,[role='button']")||x(o.textContent??"")!==x(n.textContent??""))break;n=o}return n}function eo(e){return!!e.closest(oe)}function qr(e){let t=e;for(;t&&t!==document.body;){if(!le(t)&&Vr(t))return t;t=t.parentElement}return null}function $r(e){let t=e.closest(ur);if(!t)return null;let n=t.textContent??"";return x(n)&&n.split(/\r?\n/).some(o=>no(o))?t:null}function Vr(e){if(e===document.body||e.matches("main, article, section")||e.matches("div")&&!e.closest(".docblock, .methods, .impl-items"))return!1;let t=x(e.textContent??"");if(t.length<2||t.length>320||!to(e)&&Nt(t,e)||e.querySelector("button,input,select,textarea,[role='button']"))return!1;let n=e.getBoundingClientRect();return n.width<=0||n.height<=0||n.height>140?!1:Array.from(e.children).filter(r=>x(r.textContent??"")).length<=2}function to(e){return e.matches("[class*='IssueMetadata-module__metadataValue__']")}function Ur(e){let t=e.parentElement;if(!t||!Mt(t))return null;let r=(e.textContent??"").split(/\r?\n/).map(no).filter(i=>!!i);return r.length!==1?null:r[0]}function no(e){let t=e.trim(),n=t.match(/^\/\/\s*(.+)$/)??t.match(/^#\s*(.+)$/)??t.match(/^--\s*(.+)$/)??t.match(/^;\s*(.+)$/)??t.match(/^\/\*\s*(.+?)\s*\*\/$/)??t.match(/^\*\s+(.+)$/);if(!n)return null;let o=t.startsWith("/*")?"/*":t.match(/^(\/\/|#|--|;|\*)/)?.[1]??"//",r=x(n[1]);return!r||!new RegExp("\\p{L}","u").test(r)?null:{text:r,prefix:o}}function x(e){return e.replace(/\s+/g," ").trim()}var ke=class extends Error{constructor(n,o,r){super(n);this.errorCode=o;this.retryAfterMs=r;this.name="ProviderError"}errorCode;retryAfterMs};function oo(e){return e.errorCode?new ke(e.error,e.errorCode,e.retryAfterMs):new Error(e.error)}function ro(){return!!chrome?.runtime?.id}async function T(e){if(!ro())throw new Error("Extension context invalidated. Refresh this page after reloading the extension.");try{let t=await chrome.runtime.sendMessage(e);if(!t)throw new Error("No response from extension runtime.");if(!t.ok)throw oo(t);return t.data}catch(t){throw!ro()||Wr(t)?new Error("Extension context invalidated. Refresh this page after reloading the extension."):t}}function Wr(e){return e instanceof Error&&e.message.includes("Extension context invalidated")}var io=["h1","h2","h3","p","li","blockquote","figcaption","caption","dt","dd"].join(","),jr=[".qianxi-translation","#qianxi-floating-hitbox","#qianxi-floating-menu","#qianxi-debug-panel","#qianxi-paragraph-highlight"].join(","),ao=2400,Gr=1700;function Ye(e=[]){let t=Kr(e)??document.body;if(!t)return;let n=Xr(),o=[t,...t.querySelectorAll(`${io},div`)].filter(u=>u.matches(io)||re(u)).filter(n),r=new Map(o.map(u=>[u,Yr(u,n)])),i=[],a=new Set,s=0,l=u=>{let d=It(u).slice(0,ao-280-s);d.length<2||a.has(d)||(a.add(d),i.push(d),s+=d.length)};for(let u of e){let d=o.findIndex(f=>f===u||f.contains(u)||u.contains(f));if(d<0)continue;l(r.get(o[d])??"");let m=o.slice(0,d+1).reverse().find(f=>f.matches("h1,h2,h3"));m&&l(r.get(m)??"");for(let f of o.slice(Math.max(0,d-2),d+3))l(r.get(f)??"")}for(let u of o){if(s>=Gr)break;l(r.get(u)??"")}let p=It(document.title).slice(0,240),c=[p?`Page title: ${p}`:"",i.length?`Document excerpts:
${i.join(`
`)}`:""].filter(Boolean);if(c.length)return c.join(`
`).slice(0,ao)}function Kr(e){for(let t of e){let n=t.closest(oe);if(n)return n}return document.querySelector(oe)}function Xr(){let e=new WeakMap,t=n=>{let o=e.get(n);if(o!==void 0)return o;let r=window.getComputedStyle(n),i=!n.matches(`${jr},nav,[role='navigation'],[aria-hidden='true'],[hidden],[contenteditable]:not([contenteditable='false']),textarea,input,script,style,noscript`)&&r.display!=="none"&&r.visibility!=="hidden"&&r.visibility!=="collapse"&&r.contentVisibility!=="hidden"&&r.opacity!=="0"&&(!n.parentElement||t(n.parentElement));return e.set(n,i),i};return t}function Yr(e,t){let n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:r=>r.parentElement&&t(r.parentElement)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}),o=[];for(;n.nextNode();)o.push(n.currentNode.textContent??"");return It(o.join(""))}function It(e){return e.replace(/\s+/g," ").trim()}function _t(e,t=e.activeProviderId){let n=e.providers.find(a=>a.id===t);if(n?.type==="doubao-web")return{chunkSize:1200,concurrency:1,performanceMode:"custom"};if(n?.type==="firefox-local")return{chunkSize:800,concurrency:1,performanceMode:"custom"};let o=n?.performanceMode==="custom",r=o?so(n.chunkSize,200,4e3,e.chunkSize):e.chunkSize,i=o?so(n.concurrency,1,8,e.concurrency):e.concurrency;return{chunkSize:r,concurrency:Math.min(e.concurrency,i),performanceMode:o?"custom":"inherit"}}function lo(e){return e.type==="openai-compatible"||e.type==="anthropic-compatible"||e.type==="deepseek"||e.type==="zhipu-glm"}function so(e,t,n,o){return typeof e!="number"||!Number.isFinite(e)?o:Math.min(n,Math.max(t,Math.round(e)))}var Zr=globalThis,ce=()=>Zr.__qianxiFrameRendered!==!1;var Ze=class{constructor(t){this.changed=t;this.ready=Promise.resolve(),window!==window.top&&typeof IntersectionObserver<"u"&&(this.ready=new Promise(n=>{this.resolveReady=n}),this.observer=new IntersectionObserver(n=>{for(let o of n)o.isIntersecting&&o.intersectionRect.width>0&&o.intersectionRect.height>0?this.visible.add(o.target):this.visible.delete(o.target);clearTimeout(this.readyTimer),this.resolveReady(),this.changed()},{threshold:0}))}changed;observer;visible=new Set;tracked=new Set;order=[];positions=new Map;ready;resolveReady=()=>{};readyTimer;get deferred(){return!!this.observer}update(t){if(!this.observer)return;this.order=t,this.positions.clear(),t.forEach((o,r)=>{this.positions.has(o)||this.positions.set(o,r)}),t.length?this.readyTimer||(this.readyTimer=setTimeout(this.resolveReady,250)):this.resolveReady();let n=new Set(t);for(let o of this.tracked)n.has(o)||(this.observer.unobserve(o),this.tracked.delete(o),this.visible.delete(o));for(let o of n)this.tracked.has(o)||(this.tracked.add(o),this.observer.observe(o))}priority(t){if(!ce())return null;if(!this.observer)return;if(this.visible.has(t))return Math.max(0,t.getBoundingClientRect().top);let n=this.positions.get(t)??-1,o=t.getBoundingClientRect(),r=Math.max(240,Math.min(window.innerHeight,960)*.75);return[this.order[n-1],this.order[n+1]].find(a=>{if(!this.visible.has(a))return!1;let s=a.getBoundingClientRect();return o.top-s.bottom<=r&&s.top-o.bottom<=r})?1e5+n:null}disconnect(){clearTimeout(this.readyTimer),this.resolveReady(),this.observer?.disconnect(),this.tracked.clear(),this.visible.clear(),this.positions.clear(),this.order=[]}};var co=0,Je=()=>co;function Ot(){co++}var Jr=.75,Qr=240,ei=2,ti=4e3,ni=16,oi=100,ri=160,uo=["[data-qianxi-video]","[data-qianxi-video-style]","[data-qianxi-video-native]","#qianxi-video-panel","#qianxi-video-overlay",".qianxi-translation","#qianxi-floating-hitbox","#qianxi-floating-menu","#qianxi-debug-panel","#qianxi-paragraph-highlight"].join(","),ii=0,V=null,P=null,Q,zt;var Dt=new Set,ai,Ht;function mo(e){ai=e}function Bt(e){Ht=e}function U(){de()}function ue(){let e=V;return e?{...Vt(e),active:!0,pending:[...e.entries.values()].filter(t=>t.status==="queued"||t.status==="running").length}:{active:!1,pending:0,translated:0,cached:0,failed:0,remaining:0}}function fo(e){return Dt.add(e),()=>Dt.delete(e)}function de(e){Dt.forEach(t=>t(e))}function ho(e,t=!0){let n=P,o=t&&n&&n.pageUrl===location.href&&n.translationIdentity===po(e),r;if(o){go(n,n.observer.takeRecords()),n.observer.disconnect(),P=null;let d=new Set(se([...n.changedRoots]));r=new Map([...n.entries].filter(([m,f])=>!d.has(m)&&f.segment.element.isConnected).map(([m,f])=>[m,{segment:f.segment,status:f.status==="done"?"done":"idle"}]));for(let m of yt(document.body,e.translateCodeComments))r.set(m.id,{segment:m,status:"idle"});te(()=>Dn(e.translationDisplayMode),[...r.values()].map(m=>m.segment))}else si(),r=new Map(Ln(e.translateCodeComments).map(d=>[d.id,{segment:d,status:"idle"}]));zt=e.translationDisplayMode;let i=[...r.values()].filter(d=>d.status==="done").length,a,s=new Promise(d=>{a=d}),l=_t(e),p=new MutationObserver(d=>go(c,d)),c={id:++ii,pageUrl:location.href,translationIdentity:po(e),settings:e,entries:r,queue:[],activeCount:0,maxConcurrency:Math.min(ei,l.concurrency),cancelled:!1,translated:i,cached:i,failed:0,initialPending:new Set,initialResolved:!1,resolveInitial:a,observer:p,viewport:new Ze(()=>{B(c)&&!c.initializing&&Ce(c)}),initializing:!0,dynamicRoots:new Set,changedRoots:new Set};V=c,bo(c),window.addEventListener("scroll",ee,{passive:!0,capture:!0}),window.addEventListener("resize",ee,{passive:!0}),document.addEventListener("qianxi:frame-visibility",ee),document.addEventListener("load",xo,!0);let u=()=>{B(c)&&(c.initializing=!1,Ce(c,!0),$t(c))};return c.viewport.deferred?(c.viewport.update([...c.entries.values()].map(d=>d.segment.element)),c.viewport.ready.then(u)):u(),s}function si(){Ot(),yo(),P?.observer.disconnect(),P=null,On(),de()}function tt(e=!0){Ot();let t=V;if(!t&&P){te(Xe,[...P.entries.values()].map(n=>n.segment)),de(e?"stopped":void 0);return}yo(),P?.observer.disconnect(),P=t,te(Xe,t?[...t.entries.values()].map(n=>n.segment):[]),t&&bo(t),de(e?"stopped":void 0)}function po(e){return JSON.stringify({sourceLang:e.sourceLang,targetLang:e.targetLang,activeProviderId:e.activeProviderId,provider:e.providers.find(t=>t.id===e.activeProviderId),translateCodeComments:e.translateCodeComments})}function bo(e){e.observer.observe(document.body,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["class","style","hidden","aria-hidden","placeholder","alt","open"]})}function wo(e){return zt??e}function Ft(e){zt=e;let t=V;!t&&P||(t&&(t.settings={...t.settings,translationDisplayMode:e}),te(()=>In(e),t?[...t.entries.values()].map(n=>n.segment):[]))}function Ce(e,t=!1){if(!B(e)||e.providerPaused||e.initializing&&!t)return;let n=[...e.entries.values()].map(a=>a.segment.element);e.viewport.update(n);let o=[...e.entries.values()].filter(a=>a.status==="idle"||a.status==="queued").map(a=>({entry:a,priority:e.viewport.priority(a.segment.element)??(window===window.top||typeof IntersectionObserver>"u"?ui(a.segment.element):null)})).filter(a=>a.priority!==null).sort((a,s)=>a.priority-s.priority),r=new Set(o.map(({entry:a})=>a.segment.id));for(let a of e.entries.values())a.status!=="queued"||r.has(a.segment.id)||(a.status="idle",et(e,a.segment.id));for(let{entry:a}of o)a.status==="idle"&&(a.status="queued"),t&&e.initialPending.add(a.segment.id);let i=o.map(({entry:a})=>a).filter(a=>a.status==="queued").map(a=>a.segment);e.queue=pi(i,mi(e.settings),gi(e.settings)),li(e),de()}function li(e){if(!(!B(e)||e.providerPaused))for(;e.activeCount<e.maxConcurrency&&e.queue.length;){let t=e.queue.shift();if(!t)break;let n=t.filter(o=>e.entries.get(o.id)?.status==="queued");n.length&&ci(e,n)}}async function ci(e,t){e.activeCount+=1,t.forEach(n=>{let o=e.entries.get(n.id);o&&(o.status="running")}),te(()=>Ke(t),t);try{let n=await T({type:"TRANSLATE_BATCH",texts:t.map(r=>r.text),preservePlaceholders:!0,context:Ye(t.map(r=>r.element)),sourceLang:e.settings.sourceLang,targetLang:e.settings.targetLang,providerId:e.settings.activeProviderId,...Ht?{pageSession:Ht}:{}});if(!B(e))return;qt(e,!1);let o=t.filter(r=>e.entries.has(r.id));if(n.translations.length!==t.length||n.translations.some(r=>typeof r!="string"||!r.trim()))throw new Error("Translation response contains missing or empty items.");te(()=>{J(t.map((r,i)=>({id:r.id,text:n.translations[i]})).filter(r=>e.entries.has(r.id)),e.settings.translationDisplayMode)},t),e.cached+=n.cached,e.translated+=o.length,o.forEach(r=>{let i=e.entries.get(r.id);i&&(i.status="done")})}catch(n){if(!B(e))return;if(te(()=>_n(t),t),e.failed+=t.length,e.firstError??=n instanceof Error?n.message:String(n),n instanceof ke&&(e.firstErrorCode??=n.errorCode,n.retryAfterMs!==void 0&&(e.retryAt=Date.now()+n.retryAfterMs),["login-required","rate-limited","service-rejected","permission-required","unsupported-browser","unsupported-language","protocol-changed"].includes(n.errorCode))){e.providerPaused=!0,e.queue=[];for(let o of e.entries.values())o.status==="queued"&&(o.status="idle",et(e,o.segment.id))}t.forEach(o=>{let r=e.entries.get(o.id);r&&(r.status="failed")})}finally{e.activeCount=Math.max(0,e.activeCount-1),t.forEach(n=>et(e,n.id)),B(e)&&(Ce(e),$t(e),e.providerPaused&&de())}}function xo(e){e.target instanceof HTMLImageElement&&ee()}function ee(){Q!==void 0&&window.clearTimeout(Q),Q=window.setTimeout(()=>{Q=void 0;let e=V;e&&(qt(e),Ce(e))},oi)}function go(e,t){if(!(!B(e)&&P!==e)){for(let n of t){let o=n.target instanceof Element?n.target:n.target.parentElement;if(!o||Qe(o))continue;if(n.type==="characterData"){e.dynamicRoots.add(o),P===e&&e.changedRoots.add(o);continue}if(n.type==="attributes"){let i=n.target instanceof Element?n.target:null;i&&!Qe(i)&&(e.dynamicRoots.add(i),P===e&&e.changedRoots.add(i));continue}[...n.addedNodes,...n.removedNodes].some(i=>!(i instanceof Element&&Qe(i)))&&(e.changedRoots.add(o),e.dynamicRoots.add(o));for(let i of n.addedNodes){let a=i.nodeType===Node.ELEMENT_NODE?i:i.parentElement;!a||Qe(a)||e.dynamicRoots.add(a)}}P===e||!e.dynamicRoots.size||e.dynamicTimer!==void 0||(e.dynamicTimer=window.setTimeout(()=>{e.dynamicTimer=void 0,di(e)},ri))}}function di(e){B(e)&&(qt(e),Ce(e))}function qt(e,t=!0){let n=se([...e.changedRoots]);e.changedRoots.clear();for(let r of n)e.entries.delete(r),et(e,r);if(e.dynamicRoots.clear(),!t&&!n.length)return;let o=yt(document.body,e.settings.translateCodeComments);for(let r of o)e.entries.has(r.id)||e.entries.set(r.id,{segment:r,status:"idle"})}function Qe(e){return e.matches(uo)||!!e.closest(uo)}function te(e,t=[]){let n=window.scrollX,o=window.scrollY,r=new Map;for(let i of t){let a=i.element;for(;a&&a!==document.scrollingElement;)!r.has(a)&&(a.scrollTop||a.scrollLeft)&&r.set(a,{left:a.scrollLeft,top:a.scrollTop}),a=a.parentElement}e(),document.documentElement.offsetHeight;for(let[i,a]of r)i.scrollLeft!==a.left&&(i.scrollLeft=a.left),i.scrollTop!==a.top&&(i.scrollTop=a.top);(window.scrollX!==n||window.scrollY!==o)&&window.scrollTo(n,o)}function ui(e){if(!e.isConnected)return null;let t=e.getBoundingClientRect();if(t.width<=0||t.height<=0)return null;let n=Math.max(1,window.innerHeight),o=Math.max(Qr,n*Jr);return t.bottom<-o||t.top>n+o?null:t.bottom>=0&&t.top<=n?Math.max(0,t.top):t.bottom<0?n+Math.abs(t.bottom):n+Math.max(0,t.top-n)}function pi(e,t,n){let o=[],r=[],i=0;for(let a of e){let s=a.text.trim();if(!s)continue;let l=s===a.text?a:{...a,text:s};r.length&&(i+l.text.length>t||r.length>=n)&&(o.push(r),r=[],i=0),r.push(l),i+=l.text.length}return r.length&&o.push(r),o}function gi(e){let t=e.providers.find(n=>n.id===e.activeProviderId);return t&&lo(t)?ni:Number.POSITIVE_INFINITY}function mi(e){let t=_t(e);return Math.max(200,Math.min(ti,t.chunkSize))}function et(e,t){e.initialPending.delete(t)&&$t(e)}function $t(e){e.initialResolved||e.initialPending.size>0||(e.initialResolved=!0,e.resolveInitial(Vt(e)))}function yo(){let e=V;V=null,Q!==void 0&&(window.clearTimeout(Q),Q=void 0),window.removeEventListener("scroll",ee,!0),window.removeEventListener("resize",ee),document.removeEventListener("qianxi:frame-visibility",ee),document.removeEventListener("load",xo,!0),e&&(e.observer.disconnect(),e.viewport.disconnect(),e.dynamicRoots.clear(),e.changedRoots.clear(),e.dynamicTimer!==void 0&&(window.clearTimeout(e.dynamicTimer),e.dynamicTimer=void 0),e.cancelled=!0,e.initialResolved||(e.initialResolved=!0,e.resolveInitial(Vt(e))))}function B(e){return!e.cancelled&&V?.id===e.id}function Vt(e){return{translated:e.translated,cached:e.cached,failed:e.failed,error:e.firstError,...e.firstErrorCode?{errorCode:e.firstErrorCode}:{},...e.retryAt===void 0?{}:{retryAt:e.retryAt},remaining:[...e.entries.values()].filter(t=>t.status==="idle").length}}function vo(){if(!ce()||!document.body||!["text/html","application/xhtml+xml"].includes(document.contentType))return"";let e="script,style,noscript,textarea,input,select,button,pre,code,nav,header,footer,aside,[hidden],[aria-hidden='true'],[contenteditable]:not([contenteditable='false']),[id^='qianxi-'],.qianxi-translation",t=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),n="",o=0;for(;t.nextNode()&&n.length<3e3&&o++<12e3;){let r=t.currentNode.parentElement;if(!r||r.closest(e))continue;let i=!0;for(let a=r;a;a=a.parentElement){let s=getComputedStyle(a);if(s.display==="none"||s.visibility==="hidden"||s.contentVisibility==="hidden"||s.opacity==="0"){i=!1;break}}i&&(n+=`${t.currentNode.textContent?.trim()??""}
`)}return n.slice(0,3e3).trim()}function Eo(e,t){let n,o,r=-1,i,a="",s=0,l,p=!1,c,u=!1,d=()=>({...ue(),documentHidden:!ce()}),m=h=>{t.top&&h.topDocument&&h.topDocument!==e||(!n||h.revision>=n.revision)&&(n=h,t.top&&U())},f=()=>{i||!o||(i=setTimeout(()=>{i=void 0;let h=d(),w=JSON.stringify([o,h]);w!==a&&(a=w,T({type:"FRAME_REPORT",documentKey:e,sessionId:o,state:h}).catch(()=>{a=""}))},60))};fo(f);async function g(h,w=!0,R=!0){return h.revision<r||(r=h.revision,m(h),c===!1&&h.active)?d():!w||!h.active?(o=h.id,(ue().active||Nn())&&tt(!1),Bt(void 0),f(),d()):o===h.id&&ue().active?(Ft(h.settings.translationDisplayMode),f(),d()):(o=h.id,Bt({id:h.id,documentKey:e}),await ho(h.settings,R),f(),d())}async function b(){let h=await T({type:"FRAME_REGISTER",documentKey:e,url:location.href});if(!h||typeof h.id!="string")return;p=!0,m(h);let w=h.frames.find(R=>R.frameId===(t.top?0:-1));t.top&&await g(h,w?.status!=="excluded")}if(t.top){let h={state:()=>{let w=n?.state??ue();return c===void 0?w:{...w,active:c}},start:async(w,R)=>{let I=++s;if(c=!0,n&&(n={...n,active:!0,state:{...n.state,active:!0}},U()),await l,p||await b(),I!==s)return{...ge(),cancelled:!0};try{let L=await T({type:"FRAME_SESSION_ACTION",action:"start",reuseResults:R});return I!==s?{...ge(),cancelled:!0}:(c=void 0,m(L),U(),L.active?L.state:{...L.state,cancelled:!0})}catch(L){if(I===s){c=void 0;let Me=await T({type:"FRAME_SESSION_GET"}).catch(()=>{});Me?m(Me):n&&(n={...n,active:!1,state:ge()}),U()}throw L}},stop:()=>{let w=++s;return c=!1,tt(),n&&(n={...n,active:!1,state:ge()},U()),l.then(()=>w===s?T({type:"FRAME_SESSION_ACTION",action:"stop"}):void 0).then(R=>{!R||w!==s||(c=void 0,m(R),U())}).catch(()=>{})},display:w=>{Ft(w),l.then(()=>T({type:"FRAME_SESSION_MODE",mode:w})).catch(()=>{})}};mo(h),chrome.runtime.onMessage.addListener((w,R,I)=>{if(w.type==="FRAME_SNAPSHOT"){m(w.snapshot),I({ok:!0});return}if(w.type==="FRAME_SAMPLE"){I({ok:!0,data:vo()});return}if(!(w.type!=="FRAME_APPLY"||w.documentKey!==e))return g(w.snapshot,w.allowed,w.reuseResults).then(L=>I({ok:!0,data:L}),L=>I({ok:!1,error:String(L)})),!0}),l=b().catch(()=>{}),window.addEventListener("pageshow",w=>{if(!w.persisted)return;let R=++s;c=u?!0:void 0,r=-1,n=void 0,p=!1,l=b().catch(()=>{}),u&&l.then(()=>{if(R===s){if(n)return h.start(n.settings,!0);c=!1,U()}}).catch(()=>{})})}return window.addEventListener("pagehide",()=>{t.top&&(u=c??n?.state.active??ue().active),tt(!1),T({type:"FRAME_LEAVE",documentKey:e}).catch(()=>{})}),{apply:g,updateSnapshot:m}}var So="qianxi-translation-style";function To(){if(document.getElementById(So))return;let e=document.createElement("style");e.id=So,e.textContent=`
    .qianxi-translation {
      box-sizing: border-box;
      max-width: 100%;
      white-space: normal;
      overflow-wrap: break-word;
      word-break: break-word;
      pointer-events: none;
    }

    .qianxi-translation[data-qianxi-mode="block"] {
      display: block;
      margin: 0.18em 0 0.38em;
      color: inherit;
      font: inherit;
      line-height: inherit;
    }

    .qianxi-translation[data-qianxi-mode="block"][data-qianxi-container="heading"] {
      display: block;
      margin: 0.18em 0 0.38em;
      color: inherit;
      font: inherit;
      line-height: inherit;
    }

    .qianxi-translation[data-qianxi-mode="inline"] {
      display: inline;
      margin-left: 0.35em;
      color: inherit;
      font-size: 0.92em;
      line-height: inherit;
      white-space: inherit;
      overflow-wrap: inherit;
      word-break: inherit;
    }

    .qianxi-translation[data-qianxi-mode="code-comment"] {
      display: block;
      margin: 0;
      color: inherit;
      font: inherit;
      line-height: inherit;
      white-space: pre-wrap;
    }

    .qianxi-translation[data-qianxi-preserve-whitespace="true"] {
      white-space: pre-wrap;
    }

    .qianxi-translation[data-qianxi-container="youtube-description"] {
      display: inline;
      margin: 0;
      white-space: pre-wrap;
    }

    .qianxi-translation[data-qianxi-container="youtube-description"]:not([data-qianxi-display-mode="replace"])::before {
      content: "\\A";
      white-space: pre;
    }

    .qianxi-translation[data-qianxi-display-mode="replace"] {
      display: inline;
      margin: 0;
      color: inherit;
      font: inherit;
      line-height: inherit;
    }
    :is(.react-code-text, .blob-code) .qianxi-translation[data-qianxi-mode="code-comment"] {
      display: inline;
      margin: 0 0 0 0.75em;
      white-space: nowrap;
    }

    :is(.react-code-text, .blob-code) .qianxi-translation[data-qianxi-mode="code-comment"][data-qianxi-display-mode="replace"] {
      margin: 0;
    }

    .qianxi-replaced-source {
      display: none !important;
    }

    /* Keep host-managed text measurable while its replacement determines the
       wrapper's height. The source must not stretch to the translation row. */
    .qianxi-stable-replacement {
      display: grid !important;
      grid-template-columns: minmax(0, 1fr) !important;
      align-items: start !important;
    }

    .qianxi-stable-replacement > .qianxi-stable-source {
      grid-area: 1 / 1 !important;
      align-self: start !important;
      min-width: 0 !important;
      visibility: hidden !important;
    }

    .qianxi-stable-replacement > .qianxi-translation[data-qianxi-container="stable-replacement"] {
      grid-area: 1 / 1;
      align-self: start;
      min-width: 0;
      display: block;
      margin: 0;
      visibility: visible;
    }

    .qianxi-translation[data-qianxi-container="authored-lines"] {
      position: static;
      display: block;
      float: none;
      width: auto;
      min-width: 0;
      height: auto;
      transform: none;
      letter-spacing: inherit;
      white-space: normal;
      overflow-wrap: anywhere;
    }

    .qianxi-translation[data-qianxi-container="image-text"] {
      display: block;
      margin: 0.6em 0;
      padding: 0;
      border-radius: 0;
      color: inherit;
      background: transparent;
      font-size: 0.95em;
      line-height: 1.55;
      text-align: start;
      white-space: pre-wrap;
    }

    .qianxi-translation[data-qianxi-image-layout="interleaved"] {
      container-type: inline-size;
      margin: 0;
      padding: 0;
      border-radius: 0;
      background: transparent;
      text-align: center;
      white-space: normal;
      pointer-events: auto;
    }

    .qianxi-image-text-row {
      display: block;
      margin: 0 0 1.4em;
      font-size: var(--qianxi-image-font-size);
    }

    .qianxi-image-text-original {
      position: relative;
      display: block;
      width: 100%;
      overflow: hidden;
    }

    .qianxi-image-text-original > img {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 100%;
      max-width: none;
      height: auto;
      margin: 0;
      padding: 0;
      border: 0;
      transform-origin: top left;
    }

    .qianxi-image-text-result {
      display: block;
      margin: 0.3em 0 0;
      font-size: 0.95em;
      font-weight: 600;
      line-height: 1.75;
      white-space: pre-wrap;
    }

    .qianxi-translation-pending {
      min-width: 1.25em;
      min-height: 1.25em;
    }

    .qianxi-translation-pending > span {
      display: inline-block;
      width: 0.9em;
      height: 0.9em;
      box-sizing: border-box;
      border: 2px solid rgba(15, 118, 110, 0.22);
      border-top-color: var(--wp-accent, #0f766e);
      border-radius: 999px;
      vertical-align: -0.12em;
      animation: qianxi-spin 780ms linear infinite;
    }

    .qianxi-translation-pending[data-qianxi-mode="block"] > span,
    .qianxi-translation-pending[data-qianxi-mode="code-comment"] > span {
      margin: 0.2em 0;
    }

    :is(.react-code-text, .blob-code) .qianxi-translation-pending[data-qianxi-mode="code-comment"] > span {
      margin: 0;
    }

    @keyframes qianxi-spin {
      to {
        transform: rotate(360deg);
      }
    }

    #qianxi-floating-hitbox {
      all: initial;
      position: fixed !important;
      left: auto !important;
      top: auto !important;
      right: 22px !important;
      bottom: 88px !important;
      z-index: 2147483647 !important;
      box-sizing: border-box !important;
      width: 74px !important;
      height: 74px !important;
      margin: 0 !important;
      padding: 0 !important;
      display: grid !important;
      place-items: center !important;
      transform: none !important;
      pointer-events: auto !important;
    }

    #qianxi-floating-hitbox[hidden] {
      display: none !important;
    }

    #qianxi-floating-hitbox:has(.is-menu-open) {
      pointer-events: none !important;
    }

    #qianxi-floating-ball {
      all: initial;
      position: relative;
      box-sizing: border-box;
      width: 42px;
      height: 42px;
      min-width: 0;
      min-height: 0;
      margin: 0;
      padding: 0;
      border: 0;
      border-radius: 999px;
      display: grid;
      place-items: center;
      color: var(--wp-floating-foreground, #ffffff);
      background: var(--wp-floating-background, #116466);
      opacity: var(--wp-floating-opacity, 1);
      box-shadow: 0 8px 24px rgba(15, 35, 38, 0.22);
      appearance: none;
      cursor: pointer;
      pointer-events: auto;
      overflow: visible;
      text-align: center;
      text-decoration: none;
      text-indent: 0;
      text-transform: none;
      user-select: none;
      white-space: nowrap;
      touch-action: none;
      transition: transform 160ms ease, background 160ms ease, opacity 160ms ease;
    }

    #qianxi-floating-ball > .qianxi-floating-label {
      all: initial;
      display: block;
      color: var(--wp-floating-foreground, #ffffff);
      font-family: "Microsoft YaHei UI", "Microsoft YaHei", "PingFang SC", "Noto Sans CJK SC", sans-serif;
      font-size: 16px;
      font-style: normal !important;
      font-synthesis: none;
      font-weight: 700;
      line-height: 1;
      letter-spacing: 0;
      text-align: center;
      text-decoration: none;
      text-indent: 0;
      text-transform: none;
      transform: none !important;
      writing-mode: horizontal-tb;
    }

    #qianxi-floating-ball:hover {
      background: var(--wp-floating-hover, #0f5557);
    }

    #qianxi-floating-ball:focus-visible {
      outline: 3px solid var(--wp-floating-background, #69b8ac);
      outline-offset: 3px;
    }

    #qianxi-floating-ball.qianxi-is-loading {
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--wp-floating-background, #116466) 25%, transparent), 0 8px 24px rgba(15, 35, 38, 0.22);
    }

    #qianxi-floating-ball.is-dragging {
      transition: none;
      cursor: grabbing;
      opacity: calc(var(--wp-floating-opacity, 1) * 0.92);
      transform: none;
    }

    #qianxi-floating-ball[data-edge="left"]:not(.is-dragging) {
      transform: translateX(0);
    }

    #qianxi-floating-ball[data-edge="right"]:not(.is-dragging) {
      transform: translateX(0);
    }

    #qianxi-floating-hitbox:has(#qianxi-floating-ball[data-edge="left"]):hover #qianxi-floating-ball,
    #qianxi-floating-ball[data-edge="left"].is-menu-open {
      transform: translateX(20px);
    }

    #qianxi-floating-hitbox:has(#qianxi-floating-ball[data-edge="right"]):hover #qianxi-floating-ball,
    #qianxi-floating-ball[data-edge="right"].is-menu-open {
      transform: translateX(-20px);
    }

    #qianxi-floating-menu {
      all: initial;
      color-scheme: var(--wp-color-scheme, light);
      position: fixed !important;
      z-index: 2147483647;
      box-sizing: border-box;
      width: 296px;
      display: grid;
      gap: 14px;
      max-width: calc(100vw - 16px);
      max-height: calc(100vh - 16px);
      overflow-y: auto;
      overscroll-behavior: contain;
      padding: 10px;
      border: 1px solid var(--wp-border, rgba(31, 42, 46, 0.12));
      border-radius: 14px;
      background: var(--wp-surface, #ffffff);
      box-shadow: 0 12px 30px rgba(15, 35, 38, 0.2);
      font: 13px/1.3 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: var(--wp-foreground, #172026);
      direction: ltr;
      text-align: left;
      font-synthesis: none;
      isolation: isolate;
    }

    #qianxi-floating-menu *,
    #qianxi-floating-menu *::before,
    #qianxi-floating-menu *::after {
      box-sizing: border-box;
    }

    #qianxi-floating-menu[hidden],
    #qianxi-floating-menu [hidden] {
      display: none !important;
    }

    #qianxi-floating-menu button {
      all: initial;
      display: block;
      box-sizing: border-box;
      width: 100%;
      min-height: 32px;
      border: 0;
      border-radius: 6px;
      padding: 0 10px;
      color: var(--wp-foreground, #172026);
      background: transparent;
      text-align: left;
      font: inherit;
      text-shadow: none;
      appearance: none;
      white-space: nowrap;
      cursor: pointer;
    }

    #qianxi-floating-menu button:hover {
      background: var(--wp-selected, #e8f1ef);
    }

    #qianxi-floating-menu button:focus-visible {
      outline: 2px solid var(--wp-accent, #69b8ac);
      outline-offset: 2px;
    }

    #qianxi-floating-menu button:disabled {
      cursor: wait;
      opacity: 0.65;
    }

    #qianxi-floating-menu button[aria-pressed="true"] {
      color: var(--wp-accent, #0f5557);
      background: var(--wp-selected, #d9efea);
      font-weight: 700;
    }

    #qianxi-floating-menu .qianxi-translation-actions {
      display: flex;
      gap: 8px;
    }

    #qianxi-floating-menu .qianxi-translation-actions > button {
      flex: 1 1 0;
      min-width: 0;
    }

    #qianxi-floating-menu button[data-action="page-toggle"] {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: 40px;
      margin: 0;
      border: 1px solid var(--wp-accent, #116466);
      color: var(--wp-on-accent, #ffffff);
      background: var(--wp-accent, #116466);
      text-align: center;
      font-weight: 700;
    }

    #qianxi-floating-menu button[data-action="page-toggle"]:hover {
      border-color: var(--wp-accent, #0f5557);
      background: var(--wp-accent-hover, #0f5557);
    }

    #qianxi-floating-menu button[data-action="page-toggle"]:focus-visible {
      outline: 2px solid rgba(17, 100, 102, 0.34);
      outline-offset: 2px;
    }

    #qianxi-floating-menu .qianxi-menu-section {
      padding: 0;
    }

    #qianxi-floating-menu .qianxi-menu-top {
      display: grid;
      gap: 6px;
      min-width: 0;
    }

    #qianxi-floating-menu .qianxi-menu-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 0;
      min-height: 28px;
    }

    #qianxi-floating-menu .qianxi-menu-header strong {
      font: 700 15px/1.2 system-ui, sans-serif;
      color: var(--wp-foreground, #172026);
    }

    #qianxi-floating-menu button[data-action="retranslate"] {
      width: auto;
      flex: 0 0 auto;
      min-height: 28px;
      padding: 0 6px;
      color: var(--wp-accent, #116466);
      font-size: 12px;
    }

    #qianxi-floating-menu .qianxi-menu-header button {
      display: grid;
      place-items: center;
      width: 28px;
      min-height: 28px;
      padding: 0;
      color: var(--wp-muted, #526068);
    }

    #qianxi-floating-menu .qianxi-menu-header svg {
      width: 19px;
      height: 19px;
    }

    #qianxi-floating-menu .qianxi-field-label {
      display: block;
      margin: 0 0 6px;
      color: var(--wp-muted, #647379);
      font: 12px/1.4 system-ui, sans-serif;
      text-align: left;
    }

    #qianxi-floating-menu .qianxi-menu-field {
      all: initial;
      display: block;
      margin: 0;
      padding: 0;
      font: inherit;
    }

    #qianxi-floating-menu .qianxi-provider-select {
      all: initial;
      position: relative !important;
      inset: auto !important;
      display: block;
      width: 100%;
      height: 36px;
      margin: 0 !important;
      padding: 0 !important;
      font: inherit;
    }

    #qianxi-floating-menu select[data-role="provider"][hidden] {
      display: none !important;
    }

    #qianxi-floating-menu select[data-role="display-mode"] {
      all: initial;
      box-sizing: border-box;
      display: block;
      align-items: center;
      width: 100%;
      min-width: 0;
      min-height: 34px;
      padding: 0 32px 0 10px;
      border: 1px solid var(--wp-border, #c9d1cf);
      border-radius: 6px;
      color: var(--wp-foreground, #172026);
      background: var(--wp-surface, #ffffff);
      font: inherit;
      font-size: 12px;
      appearance: none;
      background-image: var(--wp-select-arrow);
      background-position: right 10px center;
      background-size: 10px 10px;
      background-repeat: no-repeat;
      cursor: pointer;
    }

    #qianxi-floating-menu select[data-role="display-mode"]:focus-visible {
      outline: 2px solid var(--wp-accent, #116466);
      outline-offset: 2px;
    }

    #qianxi-floating-menu .qianxi-translation-feedback {
      padding: 0;
    }

    #qianxi-floating-menu [data-role="translation-status"],
    #qianxi-floating-menu .qianxi-menu-hint {
      margin: 0;
      color: var(--wp-muted, #647379);
      font: 12px/1.6 system-ui, sans-serif;
      white-space: normal;
      overflow-wrap: anywhere;
    }

    #qianxi-floating-menu [data-role="translation-status"][data-tone="error"] {
      color: var(--wp-danger, #b13e36);
    }

    #qianxi-floating-menu .qianxi-menu-hint {
      padding: 2px 10px 4px;
    }

    @media (any-hover: none) and (any-pointer: coarse) {
      #qianxi-floating-menu .qianxi-menu-hint {
        display: none !important;
      }
    }

    #qianxi-floating-menu .qianxi-language-pair {
      all: initial;
      display: flex;
      align-items: center;
      width: 100%;
      min-width: 0;
      margin: 0;
      padding: 0;
      gap: 6px;
      box-sizing: border-box;
      direction: ltr;
      font: 13px/1.2 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }

    #qianxi-floating-menu .qianxi-language-select {
      all: initial;
      position: relative;
      display: grid;
      flex: 0 1 auto;
      box-sizing: border-box;
      float: none !important;
      width: auto !important;
      min-width: 0 !important;
      height: 40px !important;
      margin: 0 !important;
      padding: 0 !important;
      border: 0;
      color: inherit;
      font: inherit;
      text-align: left;
      transform: none !important;
    }

    #qianxi-floating-menu .qianxi-language-select select {
      all: initial;
      display: block;
      position: absolute !important;
      inset: 0 !important;
      width: 100% !important;
      min-width: 0 !important;
      max-width: none !important;
      height: 40px !important;
      box-sizing: border-box;
      margin: 0 !important;
      appearance: none !important;
      border: 1px solid transparent;
      border-radius: 8px;
      padding: 0 24px 0 10px !important;
      color: transparent !important;
      background: var(--wp-soft, #eef2f1);
      font: 500 13px/1.2 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
      letter-spacing: normal !important;
      text-align: left !important;
      text-indent: 0 !important;
      text-transform: none !important;
      transform: none !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      white-space: nowrap !important;
      box-shadow: none !important;
      text-shadow: none !important;
      vertical-align: middle !important;
      cursor: pointer;
    }

    #qianxi-floating-menu .qianxi-language-select select option {
      color: var(--wp-foreground, #26343a) !important;
      background: var(--wp-surface, #ffffff) !important;
      font: 500 13px/1.2 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
    }

    #qianxi-floating-menu .qianxi-language-value {
      all: initial;
      position: relative !important;
      z-index: 1;
      inset: auto !important;
      display: block !important;
      box-sizing: border-box;
      align-items: center !important;
      justify-content: flex-start !important;
      min-width: 0 !important;
      margin: 0 !important;
      padding: 0 21px 0 8px !important;
      overflow: hidden !important;
      color: var(--wp-foreground, #26343a);
      font: 500 13px/40px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
      letter-spacing: normal !important;
      text-align: left !important;
      text-overflow: ellipsis !important;
      text-transform: none !important;
      text-shadow: none !important;
      white-space: nowrap !important;
      pointer-events: none;
      transform: none !important;
    }

    #qianxi-floating-menu .qianxi-language-select select:hover,
    #qianxi-floating-menu .qianxi-language-select select:focus-visible {
      border-color: var(--wp-border, #aebbb7);
      background: var(--wp-surface, #ffffff);
    }

    #qianxi-floating-menu .qianxi-language-chevron {
      all: initial;
      display: flex;
      position: absolute !important;
      z-index: 2;
      pointer-events: none;
      right: 7px !important;
      top: 50% !important;
      width: 10px !important;
      height: 10px !important;
      margin: 0 !important;
      padding: 0 !important;
      color: var(--wp-muted, #7d898e);
      transform: translateY(-50%) !important;
    }

    #qianxi-floating-menu .qianxi-language-chevron svg { width: 10px; height: 10px; }
    #qianxi-floating-menu .qianxi-language-direction svg { width: 14px; height: 14px; }
    #qianxi-floating-menu .qianxi-language-add-site svg { width: 12px; height: 12px; }

    #qianxi-floating-menu .qianxi-language-direction {
      all: initial;
      flex: 0 0 18px;
      position: static !important;
      width: 18px !important;
      height: 40px !important;
      display: grid !important;
      place-items: center !important;
      align-self: center !important;
      margin: 0 !important;
      padding: 0 !important;
      color: var(--wp-muted, #7a878b);
      font: 17px/1 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
      text-align: center !important;
      transform: none !important;
    }

    #qianxi-floating-menu .qianxi-language-direction svg {
      all: initial;
      display: block !important;
      width: 24px !important;
      height: 24px !important;
      margin: 0 !important;
      padding: 0 !important;
      color: inherit;
      overflow: visible;
    }

    #qianxi-floating-menu .qianxi-visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      clip-path: inset(50%);
    }

    #qianxi-floating-menu .qianxi-menu-divider {
      height: 1px;
      margin: 6px 4px;
      background: rgba(31, 42, 46, 0.1);
    }

    #qianxi-floating-menu .qianxi-feature-buttons {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
      margin: 0;
    }

    #qianxi-floating-menu .qianxi-feature-button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      min-width: 0;
      min-height: 40px;
      padding: 0 8px;
      border: 2px dashed var(--wp-border, #c9d1cf);
      border-radius: 8px;
      background: var(--wp-surface, #ffffff);
      font-size: 14px;
      font-weight: 600;
      white-space: nowrap;
    }

    #qianxi-floating-menu .qianxi-feature-button[aria-busy="true"] { opacity: 1; cursor: wait; }

    #qianxi-floating-menu .qianxi-feature-button[aria-pressed="true"] {
      color: var(--wp-accent, #116466);
      border: 1px solid var(--wp-accent, #116466);
      background: var(--wp-selected, #e4eeeb);
      box-shadow: inset 0 0 0 1px var(--wp-accent, #116466);
    }

    #qianxi-floating-menu .qianxi-feature-button:hover {
      border-color: var(--wp-accent, #116466);
      background: var(--wp-soft, #eef2f1);
    }

    #qianxi-floating-menu .qianxi-feature-button[aria-pressed="true"]:hover {
      background: var(--wp-selected, #e4eeeb);
    }

    #qianxi-floating-menu .qianxi-feature-button:focus-visible {
      outline: 2px solid var(--wp-accent, #116466);
      outline-offset: 2px;
    }

    #qianxi-floating-menu .qianxi-feature-indicator {
      position: relative;
      flex: 0 0 auto;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: currentColor;
      visibility: hidden;
      pointer-events: none;
    }

    #qianxi-floating-menu .qianxi-feature-indicator::after {
      content: "";
      position: absolute;
      inset: -4px;
      box-sizing: border-box;
      border: 1px dashed currentColor;
      border-radius: 50%;
    }

    #qianxi-floating-menu .qianxi-feature-button[aria-pressed="true"] .qianxi-feature-indicator {
      visibility: visible;
    }

    #qianxi-floating-menu .qianxi-language-auto { width: 38px; min-height: 36px; padding: 0 4px; font-size: 11px; }
    #qianxi-floating-menu .qianxi-language-automatic { display: flex; flex: 0 0 auto; align-items: center; margin-left: auto; gap: 6px; }
    #qianxi-floating-menu .qianxi-language-add-site { display: grid; place-items: center; width: 22px; min-height: 28px; padding: 0; border: 1px solid var(--wp-border, #c9d1cf); color: var(--wp-accent, #116466); background: var(--wp-soft, #eef2f1); font-size: 18px; line-height: 1; text-align: center; }
    #qianxi-floating-menu .qianxi-language-add-site:disabled:not([aria-busy="true"]) { cursor: default; }
    #qianxi-floating-menu .image-feature-row { display: flex; align-items: center; gap: 2px; min-height: 40px; padding-right: 3px; border: 2px dashed var(--wp-border, #c9d1cf); border-radius: 8px; background: var(--wp-surface, #fff); }
    #qianxi-floating-menu .image-feature-row:has([aria-pressed="true"]) { border: 1px solid var(--wp-accent, #116466); box-shadow: inset 0 0 0 1px var(--wp-accent, #116466); background: var(--wp-selected, #e4eeeb); }
    #qianxi-floating-menu .image-feature-row .qianxi-feature-button { flex: 1; align-self: stretch; min-height: 36px; padding: 0 3px; border: 0; background: transparent; box-shadow: none; }
    #qianxi-floating-menu .image-feature-row .qianxi-feature-indicator { display: none; }
    #qianxi-floating-menu .image-feature[data-loading] .qianxi-feature-button { visibility: hidden; }
    #qianxi-floating-menu .ocr-help-slot, #qianxi-floating-menu .ocr-help { display: flex; align-items: center; }
    #qianxi-floating-menu .ocr-help-trigger { display: grid; place-items: center; width: 16px; min-height: 16px; height: 16px; padding: 0; border: 1px solid var(--wp-border, #c9d1cf); border-radius: 50%; font: 600 10px/1 system-ui; color: var(--wp-muted, #526068); cursor: help; }
    #qianxi-floating-menu .ocr-model-action { display: grid; place-items: center; flex: 0 0 18px; width: 18px; min-height: 28px; padding: 1px; color: var(--wp-muted, #526068); }
    #qianxi-floating-menu .ocr-model-action svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
    #qianxi-floating-menu .ocr-help-panel { position: fixed; z-index: 2147483647; width: 260px; max-width: calc(100vw - 24px); max-height: calc(100vh - 24px); overflow: auto; padding: 12px 14px; border: 1px solid var(--wp-border, #c9d1cf); border-radius: 10px; background: var(--wp-surface, #fff); box-shadow: 0 6px 24px #17203326; }
    #qianxi-floating-menu .ocr-description, #qianxi-floating-menu .ocr-model-status { margin: 5px 0 0; font: 12px/1.6 system-ui; color: var(--wp-muted, #526068); white-space: normal; overflow-wrap: anywhere; }
    #qianxi-floating-menu .ocr-help-panel .ocr-description { margin-top: 0; }
    #qianxi-floating-menu .ocr-model-status[data-state="error"] { color: var(--wp-danger, #b13e36); }
    #qianxi-floating-menu .ocr-model-progress { display: block; width: 100%; height: 5px; margin: 6px 0; accent-color: var(--wp-accent, #116466); }

    .qianxi-paragraph-active {
      outline: 1px dashed color-mix(in srgb, var(--wp-paragraph-highlight, #116466) 45%, transparent);
      outline-offset: 3px;
    }

    #qianxi-paragraph-highlight {
      position: fixed;
      z-index: 2147483646;
      box-sizing: border-box;
      border: 1px dashed color-mix(in srgb, var(--wp-paragraph-highlight, #116466) 68%, transparent);
      border-radius: 4px;
      pointer-events: none;
      background: color-mix(in srgb, var(--wp-paragraph-highlight, #116466) 5%, transparent);
    }

    #qianxi-paragraph-highlight[hidden] {
      display: none;
    }

    #qianxi-debug-panel {
      position: fixed;
      right: 18px;
      bottom: 18px;
      z-index: 2147483647;
      width: min(360px, calc(100vw - 36px));
      height: min(420px, calc(100vh - 36px));
      min-width: min(280px, calc(100vw - 16px));
      min-height: min(200px, calc(100vh - 16px));
      max-width: calc(100vw - 16px);
      max-height: calc(100vh - 16px);
      box-sizing: border-box;
      display: grid;
      grid-template-rows: auto auto minmax(0, 1fr);
      border: 1px solid var(--wp-border, rgba(31, 42, 46, 0.14));
      border-radius: 8px;
      overflow: hidden;
      background: var(--wp-surface, #ffffff);
      box-shadow: 0 18px 44px rgba(15, 35, 38, 0.24);
      color: var(--wp-foreground, #172026);
      font: 12px/1.4 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }

    #qianxi-debug-panel[hidden] {
      display: none;
    }

    #qianxi-debug-panel header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 9px 10px;
      border-bottom: 1px solid var(--wp-border, rgba(31, 42, 46, 0.1));
      background: var(--wp-soft, #f7faf9);
      cursor: grab;
      user-select: none;
      touch-action: none;
    }

    #qianxi-debug-panel.is-dragging header {
      cursor: grabbing;
    }

    #qianxi-debug-panel header strong {
      font-size: 13px;
    }

    #qianxi-debug-panel header button {
      width: 26px;
      height: 26px;
      border: 0;
      border-radius: 6px;
      color: var(--wp-muted, #405057);
      background: transparent;
      font: 18px/1 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      cursor: pointer;
    }

    #qianxi-debug-panel header button:hover {
      background: var(--wp-selected, #e8f1ef);
    }

    #qianxi-debug-panel .qianxi-debug-summary {
      padding: 8px 10px;
      border-bottom: 1px solid var(--wp-border, rgba(31, 42, 46, 0.08));
      color: var(--wp-muted, #52636a);
    }

    #qianxi-debug-panel .qianxi-debug-list {
      min-height: 80px;
      overflow: auto;
      padding: 8px;
    }

    #qianxi-debug-panel .qianxi-debug-resize {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 22px;
      height: 22px;
      cursor: nwse-resize;
      touch-action: none;
    }

    #qianxi-debug-panel .qianxi-debug-resize::before,
    #qianxi-debug-panel .qianxi-debug-resize::after {
      content: "";
      position: absolute;
      right: 4px;
      bottom: 4px;
      border-right: 2px solid var(--wp-muted, #87959a);
      border-bottom: 2px solid var(--wp-muted, #87959a);
    }

    #qianxi-debug-panel .qianxi-debug-resize::before {
      width: 10px;
      height: 10px;
    }

    #qianxi-debug-panel .qianxi-debug-resize::after {
      width: 5px;
      height: 5px;
    }

    #qianxi-debug-panel.is-resizing {
      user-select: none;
    }

    #qianxi-debug-panel .qianxi-debug-empty {
      padding: 18px 8px;
      color: var(--wp-muted, #7a8a91);
      text-align: center;
    }

    #qianxi-debug-panel .qianxi-debug-task {
      display: grid;
      gap: 4px;
      padding: 8px;
      border: 1px solid var(--wp-border, rgba(31, 42, 46, 0.1));
      border-left: 3px solid var(--wp-muted, #9aa8ad);
      border-radius: 7px;
      background: var(--wp-surface, #ffffff);
    }

    #qianxi-debug-panel .qianxi-debug-task + .qianxi-debug-task {
      margin-top: 7px;
    }

    #qianxi-debug-panel .qianxi-debug-task[data-status="running"],
    #qianxi-debug-panel .qianxi-debug-task[data-status="waiting"] {
      border-left-color: var(--wp-accent, #116466);
      background: var(--wp-soft, #f4fbf9);
    }

    #qianxi-debug-panel .qianxi-debug-task[data-status="failed"] {
      border-left-color: var(--wp-danger, #b42318);
      background: var(--wp-danger-soft, #fff8f7);
    }

    #qianxi-debug-panel .qianxi-debug-task[data-status="succeeded"] {
      border-left-color: var(--wp-success, #25734c);
    }

    #qianxi-debug-panel .qianxi-debug-task[data-status="succeeded"] .qianxi-debug-task-title span {
      color: var(--wp-success, #25734c);
    }

    #qianxi-debug-panel .qianxi-debug-task-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      cursor: pointer;
      list-style: none;
    }

    #qianxi-debug-panel .qianxi-debug-task-title::-webkit-details-marker {
      display: none;
    }

    #qianxi-debug-panel .qianxi-debug-task-title::marker { content: ""; }
    #qianxi-debug-panel .qianxi-debug-task-title::before {
      content: "";
      flex: 0 0 10px;
      width: 10px;
      height: 10px;
      background-color: currentColor;
      mask: var(--wp-disclosure-icon) center / contain no-repeat;
      transform: rotate(-90deg);
    }
    #qianxi-debug-panel details[open] > .qianxi-debug-task-title::before { transform: none; }

    #qianxi-debug-panel .qianxi-debug-task-title strong {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 12px;
    }

    #qianxi-debug-panel .qianxi-debug-task-title span {
      flex: 0 0 auto;
      color: var(--wp-accent, #0f5557);
      font-weight: 700;
    }

    #qianxi-debug-panel .qianxi-debug-task-meta {
      color: var(--wp-muted, #5f6f75);
    }

    #qianxi-debug-panel .qianxi-debug-task-error {
      max-height: 58px;
      overflow: auto;
      color: var(--wp-danger, #b42318);
      word-break: break-word;
    }

    #qianxi-debug-panel .qianxi-debug-task-detail {
      display: none;
      gap: 8px;
      margin-top: 6px;
      padding-top: 7px;
      border-top: 1px solid var(--wp-border, rgba(31, 42, 46, 0.08));
    }

    #qianxi-debug-panel .qianxi-debug-task[open] .qianxi-debug-task-detail {
      display: grid;
    }

    #qianxi-debug-panel .qianxi-debug-text-block {
      display: grid;
      gap: 5px;
    }

    #qianxi-debug-panel .qianxi-debug-text-block h4 {
      margin: 0;
      color: var(--wp-muted, #405057);
      font-size: 12px;
      line-height: 1.3;
    }

    #qianxi-debug-panel .qianxi-debug-text-block p,
    #qianxi-debug-panel .qianxi-debug-text-block pre {
      margin: 0;
      padding: 6px;
      border-radius: 6px;
      background: rgba(31, 42, 46, 0.05);
      color: var(--wp-foreground, #172026);
      font: 11px/1.45 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      white-space: pre-wrap;
      word-break: break-word;
    }

  `,document.documentElement.append(e)}var Ut={youdao:"\u6709\u9053\u8BCD\u5178",bing:"Bing \u8BCD\u5178"},Wt={enabled:!0,provider:"youdao",style:"dot"},fi=100,nt=5e3;function jt(e){if(typeof e!="string"||e.length>nt*4)return"";let t=e.normalize("NFC").replace(/\r\n?/g,`
`).trim();return Array.from(t).length<=nt&&new RegExp("\\p{L}","u").test(t)&&!/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(t)?t:""}function ot(e){let t=hi(e);return/^[\p{L}\p{M}]+(?:[-'’][\p{L}\p{M}]+)*$/u.test(t)&&!/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u.test(t)}function ko(e){let t=e&&typeof e=="object"?e:{};return{enabled:typeof t.enabled=="boolean"?t.enabled:Wt.enabled,provider:t.provider==="bing"?"bing":"youdao",style:t.style==="underline"?"underline":"dot"}}function hi(e){if(typeof e!="string"||e.length>1e3)return"";let t=e.normalize("NFC").replace(/\s+/gu," ").trim();return Array.from(t).length<=fi&&new RegExp("\\p{L}","u").test(t)&&!/[\u0000-\u001f\u007f]/u.test(t)?t:""}function Co(e,t){let n=new URL(e==="bing"?"https://cn.bing.com/dict/search":"https://dict.youdao.com/result");return n.searchParams.set(e==="bing"?"q":"word",t),n.href}var Gt={settings:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="1.98 1.98 6.04 6.04"><path d="M4.453 2.445c.099-.623.995-.623 1.094 0a.554.554 0 0 0 .872.361c.51-.37 1.145.264.775.774a.554.554 0 0 0 .361.872c.623.1.623.996 0 1.095a.554.554 0 0 0-.361.873c.37.51-.264 1.144-.775.774a.554.554 0 0 0-.872.361c-.099.623-.995.623-1.094 0a.554.554 0 0 0-.872-.361c-.51.37-1.145-.264-.775-.774a.554.554 0 0 0-.361-.873c-.623-.099-.623-.996 0-1.095a.554.554 0 0 0 .361-.872c-.37-.51.264-1.144.775-.774a.554.554 0 0 0 .872-.361M5 3.8a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4"/></svg>',adjustment:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="2.00 2.00 6.00 6.00"><path d="M3.4 2a.7.7 0 0 1 .7.7v2.316c0 .122 0 .183.033.224l.015.017c.039.035.105.04.237.05.125.01.21.034.274.09a.4.4 0 0 1 .045.044c.096.113.096.282.096.62v.08c0 .338 0 .507-.096.619a.4.4 0 0 1-.045.045c-.065.055-.149.078-.274.088-.132.01-.198.015-.237.05l-.015.017c-.032.04-.032.102-.032.224V7.3a.7.7 0 0 1-1.4 0v-.116c0-.122 0-.183-.033-.224l-.016-.017c-.038-.035-.104-.04-.236-.05-.126-.01-.21-.033-.275-.088a.4.4 0 0 1-.045-.045C2 6.648 2 6.479 2 6.14v-.08c0-.337 0-.506.096-.619a.4.4 0 0 1 .045-.045c.065-.055.15-.078.275-.088.132-.01.198-.016.236-.051l.016-.017c.032-.04.032-.102.032-.224V2.7a.7.7 0 0 1 .7-.7m3.2 0a.7.7 0 0 1 .7.7v.116c0 .122 0 .183.033.224l.016.016c.038.036.104.041.236.052.125.01.21.033.274.088a.4.4 0 0 1 .045.045c.096.112.096.281.096.62v.08c0 .337 0 .506-.096.619a.4.4 0 0 1-.045.044c-.065.056-.149.079-.274.088-.132.01-.198.016-.236.051l-.016.017c-.032.04-.032.102-.032.224V7.3a.701.701 0 0 1-1.4 0V4.984c0-.122 0-.183-.033-.224l-.016-.017c-.038-.036-.104-.04-.236-.05-.126-.01-.21-.033-.275-.089a.4.4 0 0 1-.045-.044C5.2 4.447 5.2 4.278 5.2 3.94v-.08c0-.338 0-.507.096-.619a.4.4 0 0 1 .045-.045c.065-.055.15-.079.275-.088.132-.01.198-.016.237-.052l.015-.016C5.9 3 5.9 2.938 5.9 2.816V2.7a.7.7 0 0 1 .7-.7"/></svg>',font:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="1.50 1.42 7.00 7.00"><path d="M4.1 6.2a.45.45 0 0 0 0 .9.45.45 0 0 1 0 .9H1.95a.45.45 0 0 1 0-.9h.01a.37.37 0 0 0 .337-.218L3.785 3.54c.492-1.105.738-1.657 1.135-1.703a.7.7 0 0 1 .161 0c.396.046.642.6 1.134 1.704l1.488 3.34c.06.133.19.22.336.22h.01a.45.45 0 0 1 0 .9h-.77L7.26 8H5.9a.45.45 0 0 1-.09-.89l.09-.01a.45.45 0 0 0 0-.9zm.864-2.781c-.177.021-.283.288-.494.822l-.13.33c-.132.332-.198.5-.131.623q.014.026.033.048c.09.108.27.108.627.108h.262c.358 0 .537 0 .627-.108a.3.3 0 0 0 .033-.048c.067-.123.002-.29-.13-.624l-.13-.329c-.212-.534-.318-.8-.495-.822a.3.3 0 0 0-.072 0"/></svg>',keyboard:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="1.70 1.70 6.60 6.60"><path d="M7.16 3.2c.508 0 .762 0 .93.144a1 1 0 0 1 .066.066c.144.168.144.423.144.93v1.32c0 .508 0 .762-.144.93a1 1 0 0 1-.066.066c-.168.144-.422.144-.93.144H2.84c-.508 0-.762 0-.93-.144a1 1 0 0 1-.066-.066C1.7 6.422 1.7 6.168 1.7 5.66V4.34c0-.507 0-.762.144-.93a1 1 0 0 1 .066-.066c.168-.144.422-.144.93-.144zM2.7 5.1a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1m1.4 0a.5.5 0 0 0 0 1h1.8a.5.5 0 0 0 0-1zm3.2 0a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1M2.7 3.7a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1m1.5 0a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1m1.6 0a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1m1.5 0a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1"/></svg>',palette:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="2.13 2.13 5.75 5.75"><path d="M2.515 3.374c1.053-2.092 5.3-1.367 5.3.8 0 1.308-1.27.006-2 1.1-.912 1.368 1.136 2.6-.9 2.6s-3.387-2.539-2.4-4.5m1.801 2.2a.7.7 0 1 0 0 1.4.7.7 0 0 0 0-1.4m-1.001-1.4a.6.6 0 1 0 .001 1.2.6.6 0 0 0-.001-1.2m2.8-1.2a.6.6 0 1 0 0 1.2.6.6 0 0 0 0-1.2m-1.8-.2a.6.6 0 1 0 0 1.2.6.6 0 0 0 0-1.2"/></svg>',internet:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="1.80 1.80 6.40 6.40"><path d="M5 1.8a3.2 3.2 0 1 1 0 6.4 3.2 3.2 0 0 1 0-6.4m-.02 3.55c-.274 0-.41 0-.499.087a.3.3 0 0 0-.033.04c-.072.102-.05.228-.006.482a8.5 8.5 0 0 0 .321 1.262c.035.103.128.18.237.18.04 0 .059 0 .088-.006a.33.33 0 0 0 .21-.162c.013-.026.02-.05.033-.1a10 10 0 0 0 .245-1.18c.036-.254.054-.381-.017-.48a.3.3 0 0 0-.034-.039c-.087-.084-.222-.084-.493-.084zm-1.804 0c-.183 0-.275 0-.354.058a.34.34 0 0 0-.113.168c-.025.095.006.172.068.324.208.512.587.935 1.066 1.2.068.037.14-.026.12-.101A9 9 0 0 1 3.71 5.81c-.025-.18-.037-.272-.077-.33a.3.3 0 0 0-.113-.099c-.063-.031-.157-.031-.344-.031m3.651 0c-.185 0-.278 0-.342.031a.3.3 0 0 0-.116.104c-.04.06-.05.15-.07.328-.05.429-.13.836-.208 1.171-.016.069.052.124.112.089.459-.267.82-.68 1.021-1.176.06-.15.09-.225.068-.319a.34.34 0 0 0-.117-.172c-.078-.056-.168-.056-.348-.056M3.963 3c.021-.075-.052-.14-.12-.102-.48.265-.859.689-1.066 1.2-.062.154-.093.23-.068.325a.34.34 0 0 0 .113.168c.079.058.179.058.378.058.171 0 .257 0 .32-.031a.3.3 0 0 0 .113-.099c.04-.058.052-.15.077-.33.06-.437.157-.85.253-1.189M5 2.6a.25.25 0 0 0-.237.178q-.06.182-.126.413a9 9 0 0 0-.195.85c-.044.254-.066.38.006.482l.033.04c.088.087.225.087.499.087h.052c.27 0 .406 0 .493-.084a.3.3 0 0 0 .034-.04c.071-.098.053-.225.016-.479a10 10 0 0 0-.244-1.181c-.013-.048-.02-.072-.032-.099a.33.33 0 0 0-.21-.162C5.058 2.6 5.038 2.6 5 2.6m1.09.417c.08.335.16.742.209 1.17.02.179.03.268.07.328q.044.068.116.104c.064.031.149.031.319.031.195 0 .293 0 .371-.056a.34.34 0 0 0 .117-.172c.023-.094-.007-.17-.068-.319-.2-.496-.561-.91-1.019-1.176-.061-.036-.13.02-.114.09"/></svg>',microchip:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="2.05 2.05 5.90 5.90"><path d="M5.8 2.05a.45.45 0 0 1 .45.45c0 .099 0 .148.015.185a.2.2 0 0 0 .042.063c.028.029.085.053.199.101q.16.067.303.186.083.072.155.155.119.143.187.304c.048.114.072.17.1.199.022.02.037.03.064.042.037.015.086.015.185.015a.45.45 0 0 1 0 .9h-.001a.2.2 0 0 0-.2.201v.299c0 .11.09.2.2.2H7.5a.45.45 0 1 1 0 .9c-.1 0-.15 0-.187.016a.2.2 0 0 0-.061.04c-.03.029-.054.086-.102.2a1.2 1.2 0 0 1-.186.303 1.4 1.4 0 0 1-.155.155q-.142.119-.302.186c-.115.048-.172.073-.2.102a.2.2 0 0 0-.041.061c-.016.038-.016.087-.016.187a.45.45 0 0 1-.9 0v-.002a.2.2 0 0 0-.201-.199H4.85a.2.2 0 0 0-.2.199V7.5a.45.45 0 0 1-.901 0c0-.1 0-.15-.016-.187a.2.2 0 0 0-.04-.062c-.029-.028-.086-.053-.2-.101a1.2 1.2 0 0 1-.304-.186 1.4 1.4 0 0 1-.155-.155 1.2 1.2 0 0 1-.185-.302c-.048-.115-.072-.172-.101-.2a.2.2 0 0 0-.062-.041C2.649 6.25 2.6 6.25 2.5 6.25a.45.45 0 0 1 0-.9.2.2 0 0 0 .2-.2v-.298a.2.2 0 0 0-.2-.202.45.45 0 0 1 0-.9c.099 0 .148 0 .185-.015a.2.2 0 0 0 .063-.042c.029-.028.053-.085.1-.199q.067-.162.187-.304a1.4 1.4 0 0 1 .155-.155q.143-.119.304-.186c.114-.048.17-.072.199-.1a.2.2 0 0 0 .042-.064c.015-.037.015-.086.015-.185a.45.45 0 0 1 .9 0c0 .111.091.2.202.2h.296a.2.2 0 0 0 .202-.2.45.45 0 0 1 .45-.45M5 3.5c-.433 0-.722 0-.938.026-.208.026-.296.07-.352.118a1 1 0 0 0-.066.066c-.048.056-.092.144-.118.352C3.5 4.278 3.5 4.567 3.5 5s0 .722.026.938c.026.207.07.295.118.351q.03.036.066.066c.056.048.144.092.352.118.216.026.505.027.938.027s.722-.001.938-.027c.208-.026.295-.07.351-.118a1 1 0 0 0 .066-.066c.048-.056.092-.143.118-.35.026-.217.027-.506.027-.939s-.001-.722-.027-.938c-.026-.208-.07-.296-.118-.352a1 1 0 0 0-.066-.066c-.056-.048-.144-.092-.35-.118C5.721 3.5 5.432 3.5 5 3.5m.04.7c.338 0 .508 0 .62.096q.024.02.044.044c.096.112.096.282.096.62v.08c0 .338 0 .508-.096.62a.4.4 0 0 1-.044.044c-.112.096-.282.096-.62.096h-.08c-.338 0-.508 0-.62-.096a.4.4 0 0 1-.044-.044C4.2 5.548 4.2 5.378 4.2 5.04v-.08c0-.338 0-.508.096-.62a.4.4 0 0 1 .044-.044c.112-.096.282-.096.62-.096z"/></svg>',cross:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="2.44 2.44 5.10 5.10"><path d="M6.344 2.667a.7.7 0 0 1 .99.99l-.538.537c-.359.359-.538.538-.556.759a1 1 0 0 0 0 .094c.018.22.197.4.556.76l.538.537a.701.701 0 0 1-.99.989l-.538-.538c-.36-.359-.539-.538-.76-.555a1 1 0 0 0-.093 0c-.221.017-.4.196-.76.555l-.537.538a.7.7 0 0 1-.99-.99l.538-.537c.36-.359.539-.538.556-.759a1 1 0 0 0 0-.094c-.017-.22-.197-.4-.556-.76l-.537-.537a.7.7 0 1 1 .989-.989l.538.538c.359.359.538.538.759.555a1 1 0 0 0 .094 0c.22-.017.4-.196.759-.555z"/></svg>',tick:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="1.85 1.86 6.29 6.29"><path d="M6.956 2.905a.7.7 0 0 1 .989.99l-3.2 3.2a.7.7 0 0 1-.99 0l-1.7-1.7a.7.7 0 0 1 .99-.99l.265.264c.419.419.628.628.886.649a1 1 0 0 0 .11 0c.257-.02.466-.23.885-.649z"/></svg>',plus:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="2.30 2.30 5.40 5.40"><path d="M5 2.3a.7.7 0 0 1 .7.7v.345c0 .428 0 .641.123.783a1 1 0 0 0 .05.05c.14.122.354.122.782.122H7a.7.7 0 0 1 0 1.4h-.345c-.428 0-.642 0-.783.123a1 1 0 0 0-.05.05c-.122.14-.122.354-.122.782V7a.7.7 0 0 1-1.4 0v-.345c0-.428 0-.642-.123-.783a1 1 0 0 0-.05-.05c-.14-.122-.354-.122-.782-.122H3a.7.7 0 0 1 0-1.4h.345c.428 0 .641 0 .783-.123a1 1 0 0 0 .05-.05c.122-.14.122-.354.122-.782V3a.7.7 0 0 1 .7-.7"/></svg>',"arrow-right":'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="1.88 1.88 6.25 6.25"><path d="M8.122 5.067c-.03.352-.373.616-1.06 1.145l-.915.705c-.578.445-.868.668-1.127.624a.6.6 0 0 1-.258-.112c-.103-.077-.165-.204-.21-.399-.094-.407-.141-.611-.257-.716a1 1 0 0 0-.052-.042c-.128-.089-.306-.089-.66-.089h-.498c-.535 0-.803 0-.982-.15a1 1 0 0 1-.078-.078c-.15-.179-.15-.447-.15-.982 0-.526 0-.79.148-.965A1 1 0 0 1 2.1 3.93c.176-.147.44-.147.966-.147h.518c.35 0 .525 0 .653-.087a1 1 0 0 0 .052-.04c.115-.103.165-.308.267-.718.042-.17.099-.284.19-.356a.6.6 0 0 1 .29-.124c.25-.034.528.179 1.083.606l.943.726c.687.528 1.03.793 1.06 1.145a1 1 0 0 1 0 .132"/></svg>',"arrow-down-03":'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="2.11 2.22 5.79 5.79"><path d="M7.793 3.711a.805.805 0 1 0-1.416-.766L5.68 4.341c-.28.559-.42.838-.636.862a.4.4 0 0 1-.088 0C4.74 5.18 4.6 4.9 4.32 4.341l-.697-1.396a.805.805 0 1 0-1.416.766l1.48 2.538c.55.945.826 1.417 1.23 1.459a1 1 0 0 0 .166 0c.404-.042.68-.514 1.23-1.459z"/></svg>',code:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="1.02 1.02 7.96 7.96"><path d="M5.491 2.652a.5.5 0 0 1 .385.593l-.79 3.717a.5.5 0 0 1-.978-.207l.79-3.718a.5.5 0 0 1 .593-.385m-2.677.79a.5.5 0 0 1 .574.818l-.324.225c-.289.203-.433.304-.445.444a.3.3 0 0 0 0 .052c.012.139.156.24.445.443l.28.196a.5.5 0 0 1-.575.819L1.235 5.363a.5.5 0 0 1 .032-.837l.012-.01zm3.676.122a.5.5 0 0 1 .695-.123l1.536 1.075.011.01a.496.496 0 0 1 .033.837L7.23 6.44a.5.5 0 0 1-.573-.819l.28-.196c.288-.203.433-.304.445-.443a.3.3 0 0 0 0-.052c-.013-.14-.158-.241-.447-.444l-.322-.225a.5.5 0 0 1-.123-.696"/></svg>',display:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="1.80 1.80 6.40 6.40"><path d="M7.06 2.05c.508 0 .762 0 .93.144q.036.03.066.066c.144.168.144.422.144.93v1.62c0 .508 0 .762-.144.93a1 1 0 0 1-.066.066c-.168.144-.422.144-.93.144H6.2a.5.5 0 1 0 0 1h.1a.5.5 0 1 1 0 1H3.7a.5.5 0 1 1 0-1h.1a.5.5 0 1 0 0-1h-.86c-.508 0-.762 0-.93-.144a1 1 0 0 1-.066-.066C1.8 5.572 1.8 5.318 1.8 4.81V3.19c0-.508 0-.762.144-.93a1 1 0 0 1 .066-.066c.168-.144.422-.144.93-.144zm-3.7.8c-.338 0-.508 0-.62.095a.4.4 0 0 0-.044.045c-.096.112-.096.281-.096.62v.78c0 .338 0 .508.096.62a.4.4 0 0 0 .044.044c.112.096.282.095.62.095h3.28c.338 0 .508 0 .62-.095a.4.4 0 0 0 .044-.044c.096-.112.096-.282.096-.62v-.78c0-.339 0-.508-.096-.62a.4.4 0 0 0-.044-.045c-.112-.095-.282-.095-.62-.095z"/></svg>',trash:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="2.05 2.05 5.90 5.90"><path d="M5.5 2.05a.6.6 0 0 1 .566.404c.037.104.123.196.234.196h.9a.6.6 0 0 1 .188 1.17c-.102.033-.192.114-.198.22l-.102 2.102c-.04.808-.06 1.213-.298 1.478a1 1 0 0 1-.11.104c-.275.226-.68.226-1.49.226h-.38c-.81 0-1.214 0-1.49-.226a1 1 0 0 1-.11-.104c-.239-.265-.258-.67-.298-1.478L2.81 4.041c-.006-.107-.096-.188-.198-.221A.6.6 0 0 1 2.8 2.65h.9c.11 0 .197-.092.234-.196A.6.6 0 0 1 4.5 2.05zm-1.387 2.1a.45.45 0 0 0-.435.46l.045 1.9a.45.45 0 0 0 .9-.021l-.046-1.9a.45.45 0 0 0-.464-.438m1.774 0a.45.45 0 0 0-.464.44l-.045 1.899a.45.45 0 1 0 .9.021l.044-1.9a.45.45 0 0 0-.435-.46"/></svg>',volume:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="2.11 2.11 5.78 5.78"><path d="M5.004 2.607a.6.6 0 0 1 .22.08c.289.175.289.75.289 1.898v.83c0 1.149 0 1.723-.29 1.898a.6.6 0 0 1-.218.08c-.288.044-.602-.276-1.157-.928-.135-.159-.202-.238-.29-.283l-.039-.019c-.091-.037-.194-.037-.4-.037h-.057c-.423 0-.634 0-.774-.12a1 1 0 0 1-.056-.055c-.12-.14-.12-.352-.12-.775v-.35c0-.423 0-.635.12-.775a1 1 0 0 1 .056-.055c.14-.12.351-.12.774-.12h.057c.206 0 .309 0 .4-.038l.04-.018c.087-.045.154-.125.29-.283.553-.653.867-.974 1.155-.93m1.615.572a.45.45 0 0 1 .637 0l.002.002.001.001.003.004.01.01a1 1 0 0 1 .104.125c.061.082.138.198.214.35.152.305.298.748.298 1.326s-.146 1.021-.298 1.326a2.3 2.3 0 0 1-.292.446l-.027.03-.01.01q0 0-.002.003h-.001l-.002.002a.45.45 0 0 1-.637-.635l.001-.001.035-.044c.033-.044.081-.115.13-.213a2.05 2.05 0 0 0 .202-.924 2.05 2.05 0 0 0-.202-.924 1.4 1.4 0 0 0-.165-.257l-.058-.07a.45.45 0 0 1 .057-.567"/></svg>',"question-mark":'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="1.37 1.38 7.25 7.25"><path d="M5.05 7.025a.8.8 0 1 1-.002 1.601.8.8 0 0 1 .001-1.601m0-5.65c1.278 0 2.4.863 2.4 2.1l-.007.194c-.032.443-.173.81-.394 1.112-.242.33-.55.538-.79.681-.112.068-.244.14-.325.185-.128.073-.197.21-.263.343a.69.69 0 0 1-.622.385.7.7 0 0 1-.7-.7c0-.507.294-.83.541-1.018.119-.09.246-.165.35-.225.119-.068.2-.111.3-.17.185-.112.303-.206.38-.31.065-.09.13-.226.13-.478 0-.263-.28-.7-1-.7-.353.001-.59.103-.752.238-.168.14-.3.351-.37.632a.7.7 0 1 1-1.357-.339 2.57 2.57 0 0 1 .831-1.368c.438-.365 1-.562 1.647-.562"/></svg>',wrench:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="1.67 1.67 6.66 6.66"><path d="M5.5 2.434c0-.407 0-.61.223-.72a.5.5 0 0 1 .093-.033c.244-.052.336.065.52.297a1.694 1.694 0 0 1-.225 2.337c-.22.19-.331.286-.367.356l-.014.031c-.03.073-.03.17-.03.366V7.63a.7.7 0 0 1-1.4 0V5.069c0-.195 0-.293-.03-.365l-.014-.032c-.035-.07-.146-.165-.367-.356a1.693 1.693 0 0 1-.224-2.337c.183-.233.275-.35.519-.298.024.006.07.022.093.033.223.11.223.313.223.72v.397a.5.5 0 0 0 1 0z"/></svg>',lightning:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="1.95 1.97 6.14 6.14"><path d="m6.332 4.042-.061-.003c-.204-.01-.306-.016-.384-.047a.5.5 0 0 1-.303-.37c-.016-.083-.001-.184.028-.385.086-.585.13-.878.082-.993a.45.45 0 0 0-.6-.238c-.114.05-.283.293-.622.777L3.19 4.614c-.194.277-.29.415-.302.532a.45.45 0 0 0 .208.426c.1.063.269.071.606.088.239.012.358.018.448.061a.5.5 0 0 1 .268.32c.026.096.01.217-.02.458-.11.847-.163 1.271-.067 1.412a.45.45 0 0 0 .495.18c.164-.047.39-.4.839-1.107l1.207-1.897c.186-.292.28-.439.283-.562a.45.45 0 0 0-.201-.39c-.103-.067-.276-.076-.622-.093"/></svg>',document:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="1.95 1.95 6.10 6.10"><path d="M5.3 1.948c.349 0 .524 0 .685.056q.034.013.07.028c.155.068.283.188.54.426l.35.326c.282.263.423.395.505.563l.032.075c.067.174.068.367.068.753v2.357c0 .678 0 1.017-.192 1.241a1 1 0 0 1-.089.088c-.225.192-.564.192-1.241.19l-2.06-.001c-.676-.001-1.014-.002-1.238-.194a1 1 0 0 1-.089-.087c-.191-.225-.191-.564-.191-1.24V3.468c0-.677 0-1.015.192-1.24a1 1 0 0 1 .089-.088c.224-.192.563-.192 1.24-.192zM3.75 6.4a.401.401 0 0 0 0 .801h1.5a.4.4 0 0 0 0-.8zM3.75 5a.4.4 0 0 0 0 .8h2a.4.4 0 0 0 0-.8zm1.658-2.432a.4.4 0 0 0-.21.086c-.148.12-.148.428-.148 1.043 0 .283 0 .425.069.527a.4.4 0 0 0 .107.107c.102.069.244.07.527.07.615 0 .922-.001 1.042-.15a.4.4 0 0 0 .087-.208c.02-.19-.197-.408-.632-.843-.434-.435-.652-.652-.842-.632"/></svg>',minus:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="2.40 2.40 5.20 5.20"><path d="M2.4 5a.8.8 0 0 0 .8.8h3.6a.8.8 0 1 0 0-1.6H3.2a.8.8 0 0 0-.8.8"/></svg>',"cursor-move":'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="1.39 1.39 7.22 7.22"><path d="M5.11 1.402c.134.03.25.139.478.356l.322.307c.22.209.33.313.37.397a.5.5 0 0 1-.24.668.4.4 0 0 1-.097.029c-.212.04-.318.06-.374.119l-.022.026c-.047.066-.047.157-.047.34v.38c0 .212 0 .318.06.388q.013.016.028.028c.07.06.176.06.387.06h.38c.184 0 .275 0 .34-.047l.027-.022c.059-.056.079-.162.119-.374a.4.4 0 0 1 .028-.097.5.5 0 0 1 .668-.24c.085.04.19.15.399.37l.306.322c.217.229.326.344.356.478a.5.5 0 0 1 0 .22c-.03.134-.139.25-.356.478l-.306.322c-.21.22-.314.33-.399.37a.5.5 0 0 1-.668-.24.4.4 0 0 1-.028-.098c-.04-.212-.06-.318-.118-.373l-.027-.022c-.065-.047-.157-.047-.34-.047h-.38c-.212 0-.318 0-.388.06l-.028.027c-.06.07-.06.176-.06.388v.38c0 .184 0 .276.047.34l.022.027c.056.059.162.079.374.12q.06.01.096.028a.5.5 0 0 1 .242.668c-.04.084-.15.188-.37.397l-.323.307c-.229.217-.344.326-.478.356a.5.5 0 0 1-.22 0c-.134-.03-.25-.139-.479-.356l-.32-.307c-.221-.21-.332-.313-.372-.397a.5.5 0 0 1 .241-.668.4.4 0 0 1 .098-.029c.212-.04.318-.06.373-.118l.022-.027c.047-.065.047-.157.047-.34v-.381c0-.212 0-.318-.06-.388l-.027-.028c-.07-.06-.176-.06-.388-.06h-.381c-.183 0-.275 0-.34.048l-.027.022c-.058.055-.078.161-.118.373a.4.4 0 0 1-.029.098.5.5 0 0 1-.667.24c-.084-.04-.189-.15-.398-.37l-.306-.322c-.217-.229-.327-.344-.357-.478a.5.5 0 0 1 0-.22c.03-.134.14-.25.357-.478l.306-.322c.209-.22.313-.33.397-.37a.5.5 0 0 1 .668.24q.018.038.029.097c.04.212.06.318.118.374l.027.022c.065.047.157.047.34.047h.381c.212 0 .318 0 .388-.06l.027-.028c.06-.07.06-.176.06-.387v-.38c0-.184 0-.276-.047-.341l-.022-.027c-.055-.058-.161-.078-.373-.118a.4.4 0 0 1-.098-.029.5.5 0 0 1-.24-.668c.039-.084.15-.188.37-.397l.321-.307c.23-.217.345-.326.479-.356a.5.5 0 0 1 .22 0"/></svg>',"light-mode":'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="2.00 2.00 6.00 6.00"><path d="M5 2a3 3 0 1 1-.001 6 3 3 0 0 1 0-6m-.206.935c-.162-.09-.287-.043-.538.051a2.1 2.1 0 0 0 0 3.928c.25.095.376.142.538.052a1 1 0 0 0 .064-.044C5 6.802 5 6.632 5 6.29V3.61c0-.34 0-.512-.142-.631a1 1 0 0 0-.064-.044"/></svg>',"dark-mode":'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="2.00 2.00 6.00 6.00"><path d="M5 2a3 3 0 1 1-.001 6 3 3 0 0 1 0-6m.744.986c-.25-.094-.376-.142-.538-.051a1 1 0 0 0-.064.044C5 3.099 5 3.269 5 3.61v2.68c0 .341 0 .512.142.632a1 1 0 0 0 .064.044c.162.09.287.043.538-.052a2.1 2.1 0 0 0 0-3.928"/></svg>'};function rt(e,t="currentColor"){let n=Gt[e].replace('fill="currentColor"',`fill="${t}"`);return`url("data:image/svg+xml,${encodeURIComponent(n)}")`}function Kt(e){return Gt[e].replace("<svg ",`<svg class="qianxi-icon" data-icon="${e}" aria-hidden="true" focusable="false" style="vertical-align:middle;flex-shrink:0;fill:currentColor;stroke:none;pointer-events:none" `).replace('width="24" height="24"','width="1em" height="1em"')}var wi=[{id:"contextMenuTranslation",label:"\u53F3\u952E\u7FFB\u8BD1",group:"features"},{id:"floatingBall",label:"\u60AC\u6D6E\u7403",group:"features"},{id:"selectionTranslation",label:"\u5212\u8BCD\u7FFB\u8BD1",group:"features"},{id:"imageTranslation",label:"\u56FE\u7247\u7FFB\u8BD1",group:"features"},{id:"videoTranslation",label:"\u89C6\u9891\u5B57\u5E55",group:"features"},{id:"pageToggle",label:"\u7FFB\u8BD1\u5168\u6587",group:"translation"},{id:"paragraphMode",label:"\u6BB5\u843D\u7FFB\u8BD1",group:"translation"},{id:"openPdfWorkspace",label:"\u6253\u5F00 PDF",group:"tools"},{id:"debug",label:"Debug",group:"tools"},{id:"clearCache",label:"\u6E05\u9664\u7F13\u5B58",group:"tools"}],Ao=[],Ro=e=>Ao.includes(e),it={order:wi.map(e=>e.id),hidden:[],rows:[["contextMenuTranslation","floatingBall"],["selectionTranslation","imageTranslation"],["videoTranslation"],["pageToggle","paragraphMode"],["openPdfWorkspace"],["debug","clearCache"]]};function xi(e){let t=[],n=[],o=()=>{for(let r=0;r<n.length;r+=2)t.push(n.slice(r,r+2));n=[]};for(let r of e)r==="videoTranslation"||r==="openPdfWorkspace"?(o(),t.push([r])):n.push(r);return o(),t}function Lo(e){let t=e&&typeof e=="object"?e:{},n=new Set(it.order),o=c=>Array.isArray(c)?[...new Set(c.filter(u=>typeof u=="string"&&n.has(u)))]:[],r=o(t.order),i=[...r,...it.order.filter(c=>!r.includes(c))],a=o(t.hidden),s=i.filter(c=>!Ro(c)&&!a.includes(c)),l=[],p=new Set;if(Array.isArray(t.rows))for(let c of t.rows){let u=o(c).filter(d=>s.includes(d)&&!p.has(d));u.forEach(d=>p.add(d));for(let d=0;d<u.length;d+=2)l.push(u.slice(d,d+2))}return l.push(...xi(s.filter(c=>!p.has(c)))),{rows:l,hidden:a,order:[...l.flat(),...i.filter(c=>a.includes(c)&&!Ro(c)),...Ao]}}var Yt=[{key:"background",label:"\u9875\u9762\u80CC\u666F",group:"interface"},{key:"surface",label:"\u9762\u677F\u80CC\u666F",group:"interface"},{key:"foreground",label:"\u4E3B\u8981\u6587\u5B57",group:"interface"},{key:"muted",label:"\u6B21\u8981\u6587\u5B57",group:"interface"},{key:"accent",label:"\u5F3A\u8C03\u8272",group:"interface"},{key:"border",label:"\u8FB9\u6846",group:"interface"},{key:"success",label:"\u6210\u529F\u63D0\u793A",group:"interface"},{key:"danger",label:"\u9519\u8BEF\u63D0\u793A",group:"interface"},{key:"floating-background",label:"\u80CC\u666F",group:"floating"},{key:"floating-foreground",label:"\u6587\u5B57",group:"floating"},{key:"floating-hover",label:"\u60AC\u505C\u80CC\u666F",group:"floating"},{key:"translation-light",label:"\u6D45\u8272\u7F51\u9875\u8BD1\u6587",group:"translation"},{key:"translation-dark",label:"\u6DF1\u8272\u7F51\u9875\u8BD1\u6587",group:"translation"},{key:"paragraph-highlight",label:"\u6BB5\u843D\u9AD8\u4EAE",group:"translation"},{key:"selection-trigger",label:"\u5212\u8BCD\u5165\u53E3",group:"selection"},{key:"selection-background",label:"\u5361\u7247\u80CC\u666F",group:"selection"},{key:"selection-foreground",label:"\u5361\u7247\u6587\u5B57",group:"selection"},{key:"selection-accent",label:"\u5361\u7247\u5F3A\u8C03\u8272",group:"selection"},{key:"image-button-background",label:"\u6309\u94AE\u80CC\u666F",group:"image"},{key:"image-button-foreground",label:"\u6309\u94AE\u6587\u5B57",group:"image"}],at=[{id:"qianxi-light",name:"\u96FE\u9752",tone:"light",colors:Re({background:"#f7f8f5",surface:"#ffffff",foreground:"#172026",muted:"#647379",accent:"#116466",border:"#d7dedb",success:"#25734c",danger:"#b42318"},{"translation-light":"#0f766e","translation-dark":"#5eead4","floating-hover":"#0f5557"})},{id:"paper",name:"\u6696\u7EB8",tone:"light",colors:Re({background:"#f5f1e8",surface:"#fffdf7",foreground:"#332d25",muted:"#786c5b",accent:"#936235",border:"#ddd3c2",success:"#50733d",danger:"#b13f35"},{"translation-dark":"#edc69d","floating-hover":"#79502a"})},{id:"qianxi-dark",name:"\u591C\u9752",tone:"dark",colors:Re({background:"#151e20",surface:"#202c2e",foreground:"#e7efec",muted:"#a5b8b5",accent:"#83d2c5",border:"#3c5050",success:"#8ad4a4",danger:"#ffaaa2"},{"translation-light":"#0f766e","translation-dark":"#5eead4","floating-hover":"#a1e4d8"})},{id:"midnight",name:"\u5348\u591C\u84DD",tone:"dark",colors:Re({background:"#151b2b",surface:"#202a40",foreground:"#e6ecfa",muted:"#a4b2d0",accent:"#9cbcff",border:"#394866",success:"#8bd5b0",danger:"#ffaaa9"},{"translation-light":"#2563eb","translation-dark":"#9cbcff","floating-hover":"#b7ceff"})}],Ae={popupMenu:it,mode:"system",floatingOpacity:100,lightSchemeId:"qianxi-light",darkSchemeId:"qianxi-dark",customSchemes:[]};function Mo(e){return typeof e=="string"&&/^#[0-9a-f]{6}$/i.test(e)}function Jt(e){let t=Xt(e),n=[];for(let r of Array.isArray(t.customSchemes)?t.customSchemes.slice(0,32):[]){let i=Xt(r);if(typeof i.id!="string"||!/^custom-[a-z0-9-]{1,80}$/.test(i.id)||n.some(c=>c.id===i.id)||i.tone!=="light"&&i.tone!=="dark")continue;let a=at.find(c=>c.tone===i.tone),s=Xt(i.colors),l={...a.colors};for(let{key:c}of Yt.filter(u=>u.group==="interface"))Mo(s[c])&&(l[c]=s[c].toLowerCase());let p=Re(l);for(let{key:c}of Yt)Mo(s[c])&&(p[c]=s[c].toLowerCase());n.push({id:i.id,tone:i.tone,colors:p,name:typeof i.name=="string"&&i.name.trim()?i.name.trim().slice(0,60):"\u81EA\u5B9A\u4E49\u914D\u8272"})}let o=[...at,...n];return{popupMenu:Lo(t.popupMenu),mode:t.mode==="light"||t.mode==="dark"?t.mode:"system",floatingOpacity:typeof t.floatingOpacity=="number"&&Number.isFinite(t.floatingOpacity)?Math.max(0,Math.min(100,Math.round(t.floatingOpacity))):Ae.floatingOpacity,lightSchemeId:o.find(r=>r.id===t.lightSchemeId&&r.tone==="light")?.id??Ae.lightSchemeId,darkSchemeId:o.find(r=>r.id===t.darkSchemeId&&r.tone==="dark")?.id??Ae.darkSchemeId,customSchemes:n}}function Po(e,t){return[...at,...e.customSchemes].find(n=>n.id===(t==="light"?e.lightSchemeId:e.darkSchemeId)&&n.tone===t)??at.find(n=>n.tone===t)}function Zt(e){let t=[1,3,5].map(o=>parseInt(e.slice(o,o+2),16)/255).map(o=>o<=.04045?o/12.92:((o+.055)/1.055)**2.4);return t[0]*.2126+t[1]*.7152+t[2]*.0722>.179?"#000000":"#ffffff"}function No(e,t){for(let{key:n}of Yt)e.style.setProperty(`--wp-${n}`,t.colors[n]);e.style.setProperty("--wp-on-accent",Zt(t.colors.accent)),e.style.setProperty("--wp-color-scheme",t.tone),e.style.setProperty("--wp-select-arrow",rt("arrow-down-03",t.colors.muted)),e.style.setProperty("--wp-selection-select-arrow",rt("arrow-down-03",t.colors["selection-foreground"])),e.style.setProperty("--wp-disclosure-icon",rt("arrow-down-03")),e.style.setProperty("--wp-soft","color-mix(in srgb, var(--wp-accent) 6%, var(--wp-surface))"),e.style.setProperty("--wp-selected","color-mix(in srgb, var(--wp-accent) 12%, var(--wp-surface))"),e.style.setProperty("--wp-accent-hover","color-mix(in srgb, var(--wp-accent) 85%, var(--wp-foreground))"),e.style.setProperty("--wp-danger-soft","color-mix(in srgb, var(--wp-danger) 8%, var(--wp-surface))"),e.dataset.qianxiTheme=t.tone}function Xt(e){return e!==null&&typeof e=="object"&&!Array.isArray(e)?e:{}}function Re(e,t={}){return{...e,"floating-background":e.accent,"floating-foreground":Zt(e.accent),"floating-hover":e.accent,"translation-light":e.accent,"translation-dark":e.accent,"paragraph-highlight":e.accent,"selection-trigger":e.accent,"selection-background":e.surface,"selection-foreground":e.foreground,"selection-accent":e.accent,"image-button-background":e.accent,"image-button-foreground":Zt(e.accent),...t}}var yi=[{name:"paragraph-click",label:"\u6BB5\u843D\u70B9\u51FB",toggle:"paragraph-click"},{name:"selection-submit",label:"\u63D0\u4EA4\u5212\u8BCD\u539F\u6587",toggle:"selection-submit"},{name:"dismiss-overlays",label:"\u5173\u95ED\u5361\u7247 / \u6536\u8D77\u83DC\u5355",toggle:"dismiss-overlays"},{name:"floating-activate",label:"\u60AC\u6D6E\u7403\u7FFB\u8BD1",toggle:"floating-controls"},{name:"floating-menu",label:"\u8FDB\u5165\u60AC\u6D6E\u83DC\u5355",toggle:"floating-controls"}],Qt={"paragraph-click":"Ctrl","selection-submit":"Primary+Enter","dismiss-overlays":"Escape","floating-activate":"Enter|Space","floating-menu":"ArrowDown"},Io=["Ctrl","Alt","Shift","Meta","Primary"],vi=/^(?:[A-Z0-9]|F(?:[1-9]|1[0-2])|ArrowUp|ArrowDown|ArrowLeft|ArrowRight|Home|End|PageUp|PageDown|Enter|Space|Escape)$/;function st(e,t=!1){if(e==="")return"";if(typeof e!="string")return;let n=e.split("|");if(n.length>3||t&&n.length!==1)return;let o=[];for(let r of n){let i=r.split("+"),a=t?void 0:i.pop();if(!t&&(!a||!vi.test(a))||t&&!i.length||new Set(i).size!==i.length||i.some(l=>!Io.includes(l))||t&&i.includes("Primary")||i.includes("Primary")&&(i.includes("Ctrl")||i.includes("Meta"))||a&&/^[A-Z0-9]$/.test(a)&&!i.some(l=>l!=="Shift"))return;let s=[...Io.filter(l=>i.includes(l)),...a?[a]:[]].join("+");o.includes(s)||o.push(s)}return o.join("|")}function W(e){let t=e&&typeof e=="object"?e:{};return Object.fromEntries(yi.map(({name:n})=>[n,st(t[n],n==="paragraph-click")??Qt[n]]))}function Ei(e){return e.split("|").filter(Boolean).flatMap(t=>t.includes("Primary")?[t.replace("Primary","Ctrl"),t.replace("Primary","Meta")]:[t]).map(t=>st(t)).filter(t=>!!t)}function Si(e){if(e.isComposing||e.keyCode===229||e.getModifierState("AltGraph"))return;let t=/^Key[A-Z]$/.test(e.code)?e.code.slice(3):/^Digit\d$/.test(e.code)?e.code.slice(5):e.code==="Space"||e.key===" "?"Space":e.code==="NumpadEnter"?"Enter":e.code||(e.key.length===1?e.key.toUpperCase():e.key);return st([...e.ctrlKey?["Ctrl"]:[],...e.altKey?["Alt"]:[],...e.shiftKey?["Shift"]:[],...e.metaKey?["Meta"]:[],t].join("+"))}function lt(e,t){let n=Si(e);return!!n&&Ei(t).includes(n)}function _o(e,t){if(!t||e.button!==0||e.defaultPrevented)return!1;let n=st(t,!0);return!!n&&[["Ctrl",e.ctrlKey],["Alt",e.altKey],["Shift",e.shiftKey],["Meta",e.metaKey]].every(([o,r])=>n.split("+").includes(o)===r)}function Oo(e,t=/Mac/.test(globalThis.navigator?.platform??"")){return e.split("|").map(n=>n.replace("Primary",t?"Meta":"Ctrl").split("+").map(o=>o==="Meta"?t?"Command":"Win":o==="Alt"&&t?"Option":o).join("\uFF0B").replace(/Escape/g,"Esc").replace(/Space/g,"\u7A7A\u683C").replace(/ArrowDown/g,"\u5411\u4E0B\u952E").replace(/ArrowUp/g,"\u5411\u4E0A\u952E").replace(/ArrowLeft/g,"\u5411\u5DE6\u952E").replace(/ArrowRight/g,"\u5411\u53F3\u952E")).join(" / ")}var en=[{name:"toggle-page-translation",label:"\u7FFB\u8BD1\u5168\u6587 / \u6062\u590D\u539F\u6587"},{name:"translate-selection",label:"\u6BB5\u843D\u7FFB\u8BD1"},{name:"toggle-paragraph-mode",label:"\u5F00\u542F / \u5173\u95ED\u6BB5\u843D\u6A21\u5F0F"},{name:"cycle-display-mode",label:"\u5207\u6362\u8BD1\u6587\u663E\u793A\u6A21\u5F0F"}],Ho=[{name:"paragraph-click",label:"\u6BB5\u843D\u6A21\u5F0F\u4E2D\u7FFB\u8BD1 / \u6062\u590D\u5F53\u524D\u6BB5\u843D",keys:["Ctrl","\u70B9\u51FB\u6BB5\u843D"]},{name:"selection-submit",label:"\u63D0\u4EA4\u5212\u8BCD\u5361\u7247\u4E2D\u7F16\u8F91\u7684\u539F\u6587",keys:["Ctrl","Enter"]},{name:"dismiss-overlays",label:"\u5173\u95ED\u5212\u8BCD\u5361\u7247 / \u6536\u8D77\u60AC\u6D6E\u83DC\u5355",keys:["Esc"]},{name:"floating-controls",label:"\u60AC\u6D6E\u7403\u7FFB\u8BD1 / \u8FDB\u5165\u83DC\u5355",keys:["Enter / \u7A7A\u683C","\u2193"]}],zo=Object.fromEntries([...en,...Ho].map(({name:e})=>[e,!0]));var tn={"toggle-page-translation":"Alt+Shift+Y","translate-selection":"Alt+Shift+Q","toggle-paragraph-mode":"Alt+Shift+L","cycle-display-mode":"Alt+Shift+M"},Do=["Ctrl","Alt","Shift","Meta"],Ti=/^(?:[A-Z0-9]|F(?:[1-9]|1[0-2])|ArrowUp|ArrowDown|ArrowLeft|ArrowRight|Home|End|PageUp|PageDown|Enter|Space)$/;function ki(e){if(e==="")return"";if(typeof e!="string")return;let t=e.split("+"),n=t.pop();if(!(!Ti.test(n)||!t.length||new Set(t).size!==t.length||t.some(o=>!Do.includes(o))||!t.some(o=>o!=="Shift")))return[...Do.filter(o=>t.includes(o)),n].join("+")}function Ci(e){let t=e&&typeof e=="object"&&!Array.isArray(e)?e:{},n=new Set;return Object.fromEntries(en.map(({name:o})=>{let r=ki(t[o]),i=r!==void 0?r:tn[o];return i&&n.has(i)&&(i=""),i&&n.add(i),[o,i]}))}function pe(e,t,n){let o=e&&typeof e=="object"&&!Array.isArray(e)?e:{},r=Ci(t),i=W(n);return Object.fromEntries([...en,...Ho].map(({name:a})=>[a,o[a]!==!1&&(a in r?!!r[a]:a==="floating-controls"?!!(i["floating-activate"]||i["floating-menu"]):!!i[a])]))}var Ri={shortcuts:{...tn},localShortcuts:{...Qt},shortcutEnabled:{...zo},appearance:{...Ae,customSchemes:[]},selectionTranslation:{...Wt},autoTranslation:{enabled:!1,nonTargetLanguage:!1,presetSites:[],customSites:[]},frameTranslation:{enabled:!0,excludeMatches:[]},targetLang:"zh-CN",sourceLang:"auto",activeProviderId:"microsoft-web-translate",chunkSize:1200,concurrency:3,pdfTranslationPageRadius:5,cacheEnabled:!0,floatingBallEnabled:!1,contextMenuTranslationEnabled:!1,imageTranslationEnabled:!1,translateCodeComments:!0,translationDisplayMode:"replace",providers:[{type:"microsoft-web-translate",id:"microsoft-web-translate",label:"Microsoft \u7FFB\u8BD1",enabled:!0},{type:"google-web-translate",id:"google-web-translate",label:"Google \u7FFB\u8BD1",enabled:!0},{type:"doubao-web",id:"doubao-web",label:"\u8C46\u5305\uFF08\u5B9E\u9A8C\u6027\uFF09",enabled:!0,performanceMode:"custom",chunkSize:1200,concurrency:1},{type:"tencent-transmart",id:"tencent-transmart",label:"\u817E\u8BAF\u7FFB\u8BD1",enabled:!0},{type:"yandex-web-translate",id:"yandex-web-translate",label:"Yandex \u7FFB\u8BD1",enabled:!0},{type:"volcengine-web-translate",id:"volcengine-web-translate",label:"\u706B\u5C71\u7FFB\u8BD1",enabled:!0},{type:"mymemory",id:"mymemory",label:"MyMemory",enabled:!0,performanceMode:"custom",chunkSize:400,concurrency:1},{type:"openai-compatible",id:"openai-compatible",label:"OpenAI Compatible",enabled:!0,performanceMode:"custom",chunkSize:3200,concurrency:3,baseURL:"https://api.openai.com/v1",ollamaCompatibility:!0,apiKey:"",model:"gpt-4o-mini",systemPrompt:"You are a translation engine. Translate each input item into {{targetLang}}. Preserve meaning, numbers, links, code-like tokens, placeholders like \u27EAQIANXI0\u27EB, and formatting. Return only a JSON array of strings in the same order."},{type:"deepseek",id:"deepseek",label:"DeepSeek",enabled:!0,performanceMode:"custom",chunkSize:3200,concurrency:3,baseURL:"https://api.deepseek.com",apiKey:"",model:"deepseek-flash",systemPrompt:"You are a translation engine. Translate each input item into {{targetLang}}. Preserve meaning, numbers, links, code-like tokens, placeholders like \u27EAQIANXI0\u27EB, and formatting. Return only a JSON array of strings in the same order."},{type:"zhipu-glm",id:"zhipu-glm",label:"Zhipu GLM",enabled:!0,performanceMode:"custom",chunkSize:3200,concurrency:3,baseURL:"https://open.bigmodel.cn/api/paas/v4",apiKey:"",model:"glm-4-flash-250414",systemPrompt:"You are a translation engine. Translate each input item into {{targetLang}}. Preserve meaning, numbers, links, code-like tokens, placeholders like \u27EAQIANXI0\u27EB, and formatting. Return only a JSON array of strings in the same order."},{type:"http-template",id:"http-template",label:"HTTP Template",enabled:!0,method:"POST",url:"",headers:{"Content-Type":"application/json"},bodyTemplate:'{"q":{{json texts}},"source":"{{sourceLang}}","target":"{{targetLang}}"}',responsePath:"translations"},{type:"firefox-local",id:"firefox-local",label:"Firefox \u672C\u5730\u7FFB\u8BD1\uFF08\u5B9E\u9A8C\uFF09",enabled:!0,performanceMode:"custom",chunkSize:800,concurrency:1}]},F="qianxi.settings";var Fa=new Set(Ri.providers.map(e=>e.id));var Bo=`
:host { color-scheme: var(--wp-color-scheme, light dark); --bg: var(--wp-selection-background, var(--wp-surface, #fff)); --fg: var(--wp-selection-foreground, var(--wp-foreground, #172b29)); --muted: color-mix(in srgb, var(--fg) 65%, var(--bg)); --line: color-mix(in srgb, var(--fg) 18%, var(--bg)); --soft: color-mix(in srgb, var(--accent) 8%, var(--bg)); --accent: var(--wp-selection-accent, var(--wp-accent, #116466)); }
*, *::before, *::after { box-sizing: border-box; }
[hidden] { display: none !important; }
button, select, textarea, a { -webkit-tap-highlight-color: transparent; }
button, select, textarea { font: inherit; color: inherit; }
button, select { cursor: pointer; }
button:focus-visible, select:focus-visible, a:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
.trigger-dot, .trigger-line { position: fixed; display: block; padding: 0; border: 0; background: transparent; pointer-events: auto; }
.trigger-dot { width: 28px; height: 28px; border-radius: 50%; }
.trigger-dot::after { content: ''; position: absolute; inset: 8px; border: 2px solid var(--bg); border-radius: 50%; background: var(--wp-selection-trigger, var(--accent)); box-shadow: 0 1px 5px #173d3766; }
.trigger-dot:hover::after, .trigger-dot:focus-visible::after { inset: 6px; }
.trigger-line { height: 12px; min-width: 4px; border-radius: 2px; }
.trigger-line::after { content: ''; position: absolute; left: 0; right: 0; top: 5px; height: 2px; background: var(--wp-selection-trigger, var(--accent)); border-radius: 2px; }
.trigger-line:hover::after, .trigger-line:focus-visible::after { height: 3px; }
.card { position: fixed; display: flex; flex-direction: column; width: min(360px, calc(100vw - 24px)); max-height: calc(100vh - 24px); margin: 0; padding: 0; overflow: hidden; pointer-events: auto; border: 1px solid var(--line); border-radius: 12px; box-shadow: 0 8px 36px #162d2a26; background: var(--bg); color: var(--fg); text-align: left; direction: ltr; font: 14px/1.6 system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; user-select: text; }
.card:focus { outline: none; }
header { display: flex; align-items: center; flex: 0 0 auto; gap: 10px; padding: 14px 14px 10px; }
.word { display: block; flex: 1; width: 0; min-width: 0; margin: -3px -5px; padding: 3px 5px; border: 1px solid transparent; border-radius: 6px; background: transparent; font-size: 21px; font-weight: 650; line-height: 1.3; overflow-wrap: anywhere; overflow-y: auto; resize: none; outline: none; }
.word:hover { border-color: var(--line); background: var(--soft); }
.word:focus { border-color: var(--accent); background: var(--soft); }
.word[aria-invalid="true"] { border-color: #ad3737; }
.translation-mode .word { font-size: 13px; font-weight: 400; line-height: 1.5; color: var(--muted); }
.source-actions { display: flex; align-items: center; justify-content: flex-end; gap: 10px; padding: 0 16px 12px; font-size: 12px; }
.source-actions [role="alert"] { flex: 1; min-width: 0; color: #ad3737; overflow-wrap: anywhere; }
.submit-source { flex: 0 0 auto; padding: 5px 12px; border: 1px solid var(--line); border-radius: 6px; background: var(--soft); color: var(--accent); }
.submit-source:hover { background: var(--line); }
.translation-service { flex: 0 1 auto; max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding: 4px 7px; border-radius: 6px; background: var(--soft); color: var(--muted); font-size: 12px; }
select { max-width: 110px; min-width: 0; padding: 5px 24px 5px 7px; border: 1px solid var(--line); border-radius: 6px; background: var(--soft); font-size: 12px; appearance: none; background-image: var(--wp-selection-select-arrow); background-position: right 7px center; background-size: 9px 9px; background-repeat: no-repeat; }
.close { flex: 0 0 26px; height: 26px; padding: 0; border: 0; border-radius: 5px; color: var(--muted); background: transparent; font-size: 22px; line-height: 1; }
.close svg, .speak svg { width: 14px; height: 14px; }
.close:hover { background: var(--soft); }
.body { min-width: 0; min-height: 44px; padding: 0 16px 14px; overflow: auto; overflow-wrap: anywhere; overscroll-behavior: contain; }
.selection-translation { margin: 0; font-size: 14px; line-height: 1.7; white-space: pre-wrap; }
.body[aria-busy] { color: var(--muted); }
.phonetics { display: flex; flex-wrap: wrap; gap: 3px 16px; margin-bottom: 12px; color: var(--muted); font-size: 13px; }
.phonetics > div { display: flex; align-items: center; gap: 5px; }
.speak { display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; padding: 0; border: 0; border-radius: 5px; color: var(--accent); background: var(--soft); font-size: 11px; }
.speak:hover { background: var(--line); }
.speak:disabled { opacity: .5; cursor: wait; }
.meanings { display: grid; gap: 9px; margin: 0; padding: 0; list-style: none; }
.meanings li { display: flex; align-items: baseline; gap: 10px; overflow-wrap: anywhere; }
.part-of-speech { flex: 0 0 auto; min-width: 24px; color: var(--muted); font-style: italic; }
.part-of-speech:empty { display: none; }
.notice { margin: 6px 0; color: var(--muted); }
.retry { margin-top: 6px; padding: 5px 12px; border: 1px solid var(--line); border-radius: 5px; background: var(--soft); }
footer { display: flex; flex: 0 0 auto; justify-content: space-between; align-items: center; gap: 10px; min-height: 36px; padding: 7px 16px; border-top: 1px solid var(--line); color: var(--muted); font-size: 11px; }
footer span { min-width: 0; }
footer a { flex-shrink: 0; margin-left: auto; color: var(--accent); text-decoration: none; }
footer a:hover { text-decoration: underline; }
@media (prefers-color-scheme: dark) {
  :host { --bg: var(--wp-selection-background, var(--wp-surface, #202a28)); --fg: var(--wp-selection-foreground, var(--wp-foreground, #e6eeea)); --accent: var(--wp-selection-accent, var(--wp-accent, #83d2c5)); }
}
`;var Ai="qianxi-selection-tools",Fo="input,textarea,select,button,[contenteditable]:not([contenteditable='false']),[role='textbox'],#qianxi-selection-tools,#qianxi-floating-hitbox,#qianxi-floating-menu,#qianxi-debug-panel,#qianxi-image-tools",nn=class{settings;shortcutEnabled=pe(void 0);localShortcuts=W(void 0);host;root;triggers;card;word;sourceActions;sourceError;submitSource;body;providerSelect;translationService;footer;source;audioStatus;range;query="";version=0;audioVersion=0;audioRequested=!1;selecting=!1;disposed=!1;selectionTimer;constructor(t){this.settings=t,this.host=document.createElement("div"),this.host.id=Ai,this.host.style.cssText="all:initial!important;display:block!important;position:fixed!important;inset:0!important;pointer-events:none!important;z-index:2147483646!important;",this.root=this.host.attachShadow({mode:"open"});let n=document.createElement("style");n.textContent=Bo,this.triggers=document.createElement("div"),this.triggers.className="triggers",this.card=document.createElement("section"),this.card.className="card",this.card.hidden=!0,this.card.tabIndex=-1,this.card.setAttribute("role","dialog"),this.card.setAttribute("aria-label","\u5212\u8BCD\u7FFB\u8BD1"),this.card.lang="zh-CN";let o=document.createElement("header");this.word=document.createElement("textarea"),this.word.className="word",this.word.lang="en",this.word.rows=1,this.word.spellcheck=!1,this.word.title="\u7F16\u8F91\u539F\u6587",this.word.setAttribute("aria-label","\u539F\u6587"),this.word.setAttribute("aria-describedby","qianxi-selection-source-error"),this.word.addEventListener("input",()=>{this.version++,this.stopAudio(),this.body.replaceChildren(),this.body.hidden=!0,this.body.removeAttribute("aria-busy"),this.footer.hidden=!0,this.sourceActions.hidden=!1,this.sourceError.textContent="",this.word.removeAttribute("aria-invalid"),this.updateSourceAction(),this.resizeSourceEditor()}),this.word.addEventListener("focus",()=>this.resizeSourceEditor()),this.word.addEventListener("keydown",i=>{if(i.stopPropagation(),this.shortcutEnabled["dismiss-overlays"]&&lt(i,this.localShortcuts["dismiss-overlays"])){i.preventDefault(),this.close();return}this.shortcutEnabled["selection-submit"]&&lt(i,this.localShortcuts["selection-submit"])&&!i.repeat&&(i.preventDefault(),this.submitEditedText())}),this.word.addEventListener("keyup",i=>i.stopPropagation()),this.word.addEventListener("keypress",i=>i.stopPropagation()),this.providerSelect=document.createElement("select"),this.providerSelect.setAttribute("aria-label","\u67E5\u8BCD\u8BCD\u5178");for(let i of["youdao","bing"]){let a=document.createElement("option");a.value=i,a.textContent=Ut[i],this.providerSelect.append(a)}this.providerSelect.addEventListener("change",()=>this.submitEditedText()),this.translationService=document.createElement("span"),this.translationService.className="translation-service",this.translationService.hidden=!0;let r=document.createElement("button");r.type="button",r.className="close",r.innerHTML=Kt("cross"),r.setAttribute("aria-label","\u5173\u95ED\u5212\u8BCD\u7FFB\u8BD1"),r.addEventListener("click",()=>this.close()),o.append(this.word,this.providerSelect,this.translationService,r),this.sourceActions=document.createElement("div"),this.sourceActions.className="source-actions",this.sourceActions.hidden=!0,this.sourceError=document.createElement("span"),this.sourceError.id="qianxi-selection-source-error",this.sourceError.setAttribute("role","alert"),this.submitSource=document.createElement("button"),this.submitSource.type="button",this.submitSource.className="submit-source",this.submitSource.addEventListener("click",()=>this.submitEditedText()),this.sourceActions.append(this.sourceError,this.submitSource),this.body=document.createElement("div"),this.body.className="body",this.body.setAttribute("aria-live","polite"),this.footer=document.createElement("footer"),this.audioStatus=document.createElement("span"),this.audioStatus.setAttribute("role","status"),this.source=document.createElement("a"),this.source.target="_blank",this.source.rel="noopener noreferrer",this.footer.append(this.audioStatus,this.source),this.card.append(o,this.sourceActions,this.body,this.footer),this.root.append(n,this.triggers,this.card),this.triggers.addEventListener("pointerdown",i=>i.preventDefault()),document.documentElement.append(this.host),document.addEventListener("pointerdown",this.onPointerDown,!0),document.addEventListener("pointerup",this.onPointerUp),document.addEventListener("selectionchange",this.onSelectionChange),document.addEventListener("keyup",this.onKeyUp),document.addEventListener("keydown",this.onKeyDown),document.addEventListener("scroll",this.onScroll,!0),window.addEventListener("resize",this.onResize),window.addEventListener("pagehide",this.onResize)}update(t){(this.settings.enabled!==t.enabled||this.settings.style!==t.style||this.settings.provider!==t.provider)&&this.close(),this.settings=t}updateShortcuts(t,n){this.localShortcuts=W(n),this.shortcutEnabled=pe(t,void 0,this.localShortcuts),this.updateSourceAction()}openFromShortcut(){if(!this.settings.enabled)throw new Error("\u8BF7\u5148\u5728\u8BBE\u7F6E \u2192 \u5212\u8BCD\u7FFB\u8BD1\u4E2D\u542F\u7528\u5212\u8BCD\u7FFB\u8BD1\u3002");if(!this.card.hidden){this.card.focus({preventScroll:!0});return}if(this.captureSelection(),!this.range||!this.rects().length)throw new Error("\u8BF7\u5148\u9009\u4E2D\u7F51\u9875\u6B63\u6587\uFF08\u6700\u591A 5,000 \u4E2A\u5B57\u7B26\uFF09\uFF1B\u8F93\u5165\u6846\u548C\u7F16\u8F91\u533A\u4E2D\u7684\u6587\u5B57\u4E0D\u652F\u6301\u5212\u8BCD\u7FFB\u8BD1\u3002");this.lookup(this.settings.provider)}dispose(){this.close(),this.disposed=!0,this.host.remove(),document.removeEventListener("pointerdown",this.onPointerDown,!0),document.removeEventListener("pointerup",this.onPointerUp),document.removeEventListener("selectionchange",this.onSelectionChange),document.removeEventListener("keyup",this.onKeyUp),document.removeEventListener("keydown",this.onKeyDown),document.removeEventListener("scroll",this.onScroll,!0),window.removeEventListener("resize",this.onResize),window.removeEventListener("pagehide",this.onResize)}owns(t){return t.composedPath().includes(this.host)}onPointerDown=t=>{this.owns(t)||(this.selecting=!0,this.close())};onPointerUp=t=>{this.selecting=!1,!this.owns(t)&&t.button===0&&this.scheduleSelection()};onSelectionChange=()=>{!this.selecting&&this.card.hidden&&this.scheduleSelection()};onKeyUp=t=>{this.owns(t)||t.key==="Escape"||!this.card.hidden||(t.key.startsWith("Arrow")||t.key==="Shift"||t.key==="Home"||t.key==="End")&&this.scheduleSelection()};onKeyDown=t=>{this.shortcutEnabled["dismiss-overlays"]&&lt(t,this.localShortcuts["dismiss-overlays"])&&(this.card.hidden||t.preventDefault(),this.close())};onScroll=t=>{this.owns(t)||this.close()};onResize=()=>{this.close()};scheduleSelection(){window.clearTimeout(this.selectionTimer),this.selectionTimer=window.setTimeout(()=>this.captureSelection(),30)}captureSelection(){if(this.disposed||!this.settings.enabled||!this.card.hidden)return;let t=window.getSelection(),n=jt(t?.toString());if(!t||t.isCollapsed||t.rangeCount!==1||!n||document.activeElement?.closest(Fo)){this.close();return}let o=t.getRangeAt(0);for(let a of[o.startContainer,o.endContainer,o.commonAncestorContainer]){let s=a.nodeType===Node.ELEMENT_NODE?a:a.parentElement;if(!a.isConnected||s?.closest(Fo)){this.close();return}}this.range=o.cloneRange(),this.query=n;let r=this.rects();if(this.triggers.replaceChildren(),!r.length)return;let i=r[r.length-1];if(this.settings.style==="dot"){let a=this.trigger("trigger-dot");a.style.left=`${Math.max(8,Math.min(window.innerWidth-36,i.right+3))}px`,a.style.top=`${Math.max(8,Math.min(window.innerHeight-36,i.bottom-8))}px`,this.triggers.append(a)}else r.forEach((a,s)=>{let l=this.trigger("trigger-line");l.style.left=`${a.left}px`,l.style.top=`${a.bottom-5}px`,l.style.width=`${a.width}px`,l.tabIndex=s===0?0:-1,this.triggers.append(l)})}rects(){if(!this.range?.startContainer.isConnected||!this.range.endContainer.isConnected)return[];let t=Array.from(this.range.getClientRects()).filter(o=>o.width>0&&o.height>0&&o.bottom>0&&o.top<window.innerHeight&&o.right>0&&o.left<window.innerWidth),n=[];for(let o of t){let r=n[n.length-1];r&&Math.abs(r.top-o.top)<=2&&Math.abs(r.bottom-o.bottom)<=2&&o.left<=r.right+3&&o.right>=r.left?n[n.length-1]=new DOMRect(Math.min(r.left,o.left),Math.min(r.top,o.top),Math.max(r.right,o.right)-Math.min(r.left,o.left),Math.max(r.bottom,o.bottom)-Math.min(r.top,o.top)):n.push(o)}return n}trigger(t){let n=document.createElement("button");n.type="button",n.className=t;let o=ot(this.query)?"\u67E5\u8BCD":"\u7FFB\u8BD1";return n.title=o,n.setAttribute("aria-label",`${o}\u201C${this.query.slice(0,100)}\u201D`),n.addEventListener("click",()=>{this.lookup(this.settings.provider)}),n}async lookup(t,{forceTranslation:n=!1,focus:o=!0}={}){if(!this.query||!this.settings.enabled||this.disposed)return;let r=++this.version;this.stopAudio(),this.triggers.replaceChildren(),this.card.hidden=!1,this.sourceActions.hidden=!0,this.sourceError.textContent="",this.word.removeAttribute("aria-invalid"),this.body.hidden=!1;let i=n||!ot(this.query);if(this.setTranslationMode(i),this.providerSelect.value=t,this.word.value=this.query,this.source.href=Co(t,this.query),this.source.textContent=`\u5728${Ut[t]}\u4E2D\u67E5\u770B`,this.body.textContent=i?"\u6B63\u5728\u7FFB\u8BD1\u2026":"\u6B63\u5728\u67E5\u8BE2\u2026",this.body.setAttribute("aria-busy","true"),this.resizeSourceEditor(),!this.positionCard()){this.close();return}o&&this.card.focus({preventScroll:!0});try{if(i){await this.translateSelection(r);return}let a=await T({type:"LOOKUP_DICTIONARY",provider:t,query:this.query});if(!this.canRender(r))return;a.meanings.some(s=>s.definition.trim())?this.renderEntry(a,r):(i=!0,await this.translateSelection(r))}catch(a){if(r!==this.version||this.disposed)return;this.body.replaceChildren();let s=document.createElement("p");s.className="notice",s.textContent=this.errorMessage(a);let l=document.createElement("button");l.type="button",l.textContent="\u91CD\u8BD5",l.className="retry",l.addEventListener("click",()=>{this.lookup(t,{forceTranslation:i})}),this.body.append(s,l)}finally{r===this.version&&(this.body.removeAttribute("aria-busy"),this.positionCard())}}updateSourceAction(){let t=ot(this.word.value.trim())?"\u67E5\u8BCD":"\u7FFB\u8BD1";this.submitSource.textContent=t,this.submitSource.title=this.shortcutEnabled["selection-submit"]?`${t}\uFF08${Oo(this.localShortcuts["selection-submit"])}\uFF09`:t}submitEditedText(){if(this.disposed||this.card.hidden||!this.settings.enabled)return;let t=jt(this.word.value);if(!t){this.sourceActions.hidden=!1,this.sourceError.textContent=Array.from(this.word.value.trim()).length>nt?"\u539F\u6587\u4E0D\u80FD\u8D85\u8FC7 5,000 \u4E2A\u5B57\u7B26\u3002":"\u8BF7\u8F93\u5165\u8981\u67E5\u8BE2\u6216\u7FFB\u8BD1\u7684\u6587\u5B57\u3002",this.word.setAttribute("aria-invalid","true"),this.updateSourceAction(),this.positionCard();return}this.query=t,this.lookup(this.providerSelect.value,{focus:!1})}resizeSourceEditor(){if(this.card.hidden)return;let t=Number.parseFloat(window.getComputedStyle(this.word).lineHeight),n=t>=8?t:this.card.classList.contains("translation-mode")?20:28,o=this.root.activeElement===this.word,r=Math.max(36,Math.min(o?150:n*2+8,window.innerHeight/3));this.word.style.height="0px",this.word.style.height=`${Math.min(r,Math.max(n+8,this.word.scrollHeight))}px`,this.positionCard()}canRender(t){return t!==this.version||this.disposed?!1:!this.range?.startContainer.isConnected||!this.range.endContainer.isConnected?(this.close(),!1):!0}setTranslationMode(t){this.card.classList.toggle("translation-mode",t),this.card.dataset.mode=t?"translation":"dictionary",this.providerSelect.hidden=t,this.translationService.hidden=!t,this.translationService.textContent="\u7FFB\u8BD1",this.translationService.title="",this.footer.hidden=t,this.resizeSourceEditor()}async translateSelection(t){if(!this.canRender(t))return;this.setTranslationMode(!0),this.body.textContent="\u6B63\u5728\u7FFB\u8BD1\u2026";let n=await T({type:"GET_SETTINGS"});if(!this.canRender(t))return;let o=n.providers.find(s=>s.id===n.activeProviderId&&s.enabled!==!1);if(!o)throw new Error("\u8BF7\u5148\u5728\u8BBE\u7F6E\u4E2D\u9009\u62E9\u53EF\u7528\u7684\u7FFB\u8BD1\u670D\u52A1\u3002");this.translationService.textContent=o.label,this.translationService.title=`${o.label} \u2192 ${n.targetLang}`;let r=await T({type:"TRANSLATE_BATCH",texts:[this.query],providerId:o.id,sourceLang:n.sourceLang,targetLang:n.targetLang});if(!this.canRender(t))return;let i=r.translations?.[0];if(typeof i!="string"||!i.trim())throw new Error("\u7FFB\u8BD1\u670D\u52A1\u672A\u8FD4\u56DE\u8BD1\u6587\uFF0C\u8BF7\u91CD\u8BD5\u3002");let a=document.createElement("p");a.className="selection-translation",a.lang=n.targetLang,a.textContent=i.trim(),this.body.replaceChildren(a)}errorMessage(t){let n=t instanceof Error?t.message:"\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002";return n.startsWith("Unhandled message:")?"\u6269\u5C55\u540E\u53F0\u5C1A\u672A\u66F4\u65B0\uFF0C\u8BF7\u91CD\u65B0\u52A0\u8F7D\u6269\u5C55\u5E76\u5237\u65B0\u5F53\u524D\u9875\u9762\u3002":n.includes("Extension context invalidated")?"\u6269\u5C55\u5DF2\u66F4\u65B0\uFF0C\u8BF7\u5237\u65B0\u5F53\u524D\u9875\u9762\u540E\u91CD\u8BD5\u3002":n}renderEntry(t,n){this.word.value=t.word,this.resizeSourceEditor(),this.body.replaceChildren();let o=document.createElement("div");o.className="phonetics";for(let i of t.pronunciations){let a=document.createElement("div"),s=i.accent==="uk"?"\u82F1":i.accent==="us"?"\u7F8E":"\u8BFB\u97F3",l=document.createElement("span");if(l.textContent=`${s} ${i.phonetic?i.accent==="default"?i.phonetic:`/${i.phonetic}/`:""}`,a.append(l),i.audioUrl){let p=document.createElement("button");p.type="button",p.className="speak",p.innerHTML=Kt("volume"),p.setAttribute("aria-label",`\u64AD\u653E${s==="\u8BFB\u97F3"?"\u5355\u8BCD":`${s}\u5F0F`}\u53D1\u97F3`),p.addEventListener("click",()=>{this.play(t.provider,i.audioUrl,p,n)}),a.append(p)}o.append(a)}o.childElementCount&&this.body.append(o);let r=document.createElement("ul");r.className="meanings";for(let i of t.meanings){let a=document.createElement("li"),s=document.createElement("span");s.className="part-of-speech",s.textContent=i.partOfSpeech;let l=document.createElement("span");l.textContent=i.definition,a.append(s,l),r.append(a)}if(r.childElementCount)this.body.append(r);else{let i=document.createElement("p");i.className="notice",i.textContent="\u672A\u627E\u5230\u8BCD\u5178\u91CA\u4E49\uFF0C\u53EF\u5207\u6362\u8BCD\u5178\u6216\u67E5\u770B\u539F\u7AD9\u3002",this.body.append(i)}}async play(t,n,o,r){let i=++this.audioVersion;this.audioRequested=!0,o.disabled=!0,this.audioStatus.textContent="\u6B63\u5728\u52A0\u8F7D\u53D1\u97F3\u2026";try{await T({type:"PLAY_DICTIONARY_AUDIO",provider:t,url:n}),r===this.version&&i===this.audioVersion&&(this.audioStatus.textContent="")}catch(a){r===this.version&&i===this.audioVersion&&(this.audioStatus.textContent=this.errorMessage(a))}finally{o.disabled=!1}}stopAudio(){this.audioVersion++,this.audioStatus.textContent="",this.audioRequested&&(this.audioRequested=!1,T({type:"STOP_DICTIONARY_AUDIO"}).catch(()=>{}))}positionCard(){let t=this.rects();if(!t.length)return!1;let n=t[0],o=t[t.length-1],r=this.card.offsetWidth||Math.min(360,window.innerWidth-24),i=this.card.offsetHeight||160,a=o.bottom+10+i<=window.innerHeight-12?o.bottom+10:n.top-i-10;return this.card.style.left=`${Math.max(12,Math.min(window.innerWidth-r-12,n.left))}px`,this.card.style.top=`${Math.max(12,Math.min(window.innerHeight-i-12,a))}px`,!0}close(){window.clearTimeout(this.selectionTimer),this.version++,this.root.activeElement instanceof HTMLElement&&this.root.activeElement.blur(),this.card.hidden=!0,this.triggers.replaceChildren(),this.range=void 0,this.query="",this.stopAudio()}},Le;function qo(){if(typeof document>"u"||!chrome?.runtime?.id||Le)return;let e=0,t=n=>{let o=ko(n?.selectionTranslation);Le?Le.update(o):Le=new nn(o),Le.updateShortcuts(n?.shortcutEnabled,n?.localShortcuts)};chrome.storage.onChanged.addListener((n,o)=>{o!=="local"||!n[F]||(e++,t(n[F].newValue))}),T({type:"GET_SETTINGS"}).then(n=>{e||t(n)}).catch(()=>{})}var j=new WeakMap;async function ct(e,t="toggle"){if(!e.isConnected)throw new Error("\u8BE5\u6BB5\u843D\u5DF2\u53D1\u751F\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u53F3\u952E\u9009\u62E9\u3002");if(t==="restore"||t==="toggle"&&Et(e)){j.delete(e),vt(e);return}if(j.has(e)||Et(e))return;let n={},o=Je();j.set(e,n);try{let r=await T({type:"GET_SETTINGS"});if(j.get(e)!==n||o!==Je()||!e.isConnected)return;let i=Mn(e,r.translateCodeComments);if(!i.length)throw new Error("\u6B64\u5904\u6CA1\u6709\u53EF\u7FFB\u8BD1\u7684\u6BB5\u843D\u3002");Ke(i);let a=await T({type:"TRANSLATE_BATCH",texts:i.map(l=>l.text),preservePlaceholders:!0,context:Ye([e]),sourceLang:r.sourceLang,targetLang:r.targetLang,providerId:r.activeProviderId});if(j.get(e)!==n||o!==Je()||!e.isConnected)return;let s=new Set(se());J(i.map((l,p)=>({id:l.id,text:a.translations[p]})).filter(l=>!s.has(l.id)),wo(r.translationDisplayMode))}catch(r){if(j.get(e)!==n)return;throw vt(e),r}finally{j.get(e)===n&&j.delete(e)}}var Li="input,textarea,select,button,[contenteditable]:not([contenteditable='false']),[role='textbox'],[role='combobox'],[role='button'],img,video,audio,canvas,svg,#qianxi-selection-tools,#qianxi-floating-hitbox,#qianxi-floating-menu,#qianxi-debug-panel,#qianxi-image-tools,#qianxi-shortcut-notice";function on(e){if(!e||e===document.body||e===document.documentElement||e.closest(Li))return null;let t=e.closest(".qianxi-translation")?.getAttribute("data-qianxi-translation-target");return t?[...document.querySelectorAll("[data-qianxi-target-id]")].find(n=>n.getAttribute("data-qianxi-target-id")===t)??null:je(e)}async function $o(){let e=window.getSelection(),t=new Set,n=!1;for(let o=0;o<(e?.rangeCount??0);o++){let r=e.getRangeAt(o);if(r.collapsed)continue;n=!0;let i=s=>{if(!s.textContent?.trim()||!r.intersectsNode(s)||s===r.startContainer&&r.startOffset===s.textContent.length||s===r.endContainer&&r.endOffset===0)return;let l=on(s.parentElement);l&&t.add(l)},a=r.commonAncestorContainer;if(a.nodeType===Node.TEXT_NODE)i(a);else{let s=document.createTreeWalker(a,NodeFilter.SHOW_TEXT);for(;s.nextNode();)i(s.currentNode)}}if(!n){let o=[...document.querySelectorAll(":hover")].at(-1)??null,r=on(o)??on(document.activeElement);r&&t.add(r)}if(!t.size)throw new Error("\u8BF7\u5C06\u9F20\u6807\u79FB\u5230\u6B63\u6587\u6BB5\u843D\uFF0C\u6216\u9009\u4E2D\u6BB5\u843D\u6587\u5B57\u540E\u518D\u4F7F\u7528\u6BB5\u843D\u7FFB\u8BD1\u5FEB\u6377\u952E\u3002");await Promise.all([...t].map(o=>ct(o)))}function Vo(e,{extensionPage:t=!0,live:n=!0,onChange:o}={}){let r=Jt(e),i=typeof matchMedia=="function"?matchMedia("(prefers-color-scheme: dark)"):void 0;function a(){let d=r.mode==="system"?i?.matches?"dark":"light":r.mode,m=Po(r,d);No(document.documentElement,m),document.documentElement.style.setProperty("--wp-floating-opacity",String(r.floatingOpacity/100)),t&&(document.documentElement.style.colorScheme=d),o?.(m)}function s(d){let m=Jt(d);JSON.stringify(m)!==JSON.stringify(r)&&(r=m,a())}let l=(d,m)=>{m==="local"&&d[F]&&s(d[F].newValue?.appearance)},p=typeof chrome<"u"?chrome.storage?.onChanged:void 0;i?.addEventListener("change",a),n&&p?.addListener(l);function c(){i?.removeEventListener("change",a),n&&p?.removeListener?.(l),window.removeEventListener("pagehide",u)}function u(d){d.persisted||c()}return window.addEventListener("pagehide",u),a(),{update:s,dispose:c}}function ys(e,t){To(),qo();let n=Vo(void 0,{extensionPage:!1}),o=W(void 0),r=pe(void 0),i=0,a=u=>{n.update(u.appearance),o=W(u.localShortcuts),r=pe(u.shortcutEnabled,u.shortcuts,o)};t&&a(t),T({type:"GET_SETTINGS"}).then(u=>{i||a(u)}).catch(()=>{}),chrome.storage.onChanged.addListener((u,d)=>{d==="local"&&u[F]?.newValue&&(i++,a(u[F].newValue))});let s=!1,l=!1;document.addEventListener("click",u=>{if(!s||!r["paragraph-click"]||!_o(u,o["paragraph-click"])||l)return;let d=u.composedPath().find(f=>f instanceof Element);if(d?.closest("input,textarea,select,[contenteditable]:not([contenteditable='false'])"))return;let m=je(d??null);m&&(u.preventDefault(),u.stopPropagation(),l=!0,ct(m).catch(()=>{}).finally(()=>{l=!1}))},!0);let p=u=>{s=u,document.documentElement.classList.toggle("qianxi-paragraph-mode",u)};return{...Eo(e,{top:!1}),paragraph:p,selection:$o}}export{ys as activateFrameContent};
