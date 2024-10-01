import{dE as V,m as S,h as s,a8 as R,o as W,x as P,e as K,a7 as N,dy as G,cz as Y,k as J,b as Q,dz as X,a as Z,aW as _,b9 as k,r as ee,S as T,dA as te,a1 as I,aP as ne,C as re,a4 as oe,ba as ae,n as ie}from"./index.51db64c5.js";import{a as ce}from"./index.acf4b6a3.js";function ue(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function C(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),n.push.apply(n,r)}return n}function A(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?C(Object(n),!0).forEach(function(r){ue(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):C(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function se(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,a;for(a=0;a<r.length;a++)o=r[a],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function le(e,t){if(e==null)return{};var n=se(e,t),r,o;if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)r=a[o],!(t.indexOf(r)>=0)&&(!Object.prototype.propertyIsEnumerable.call(e,r)||(n[r]=e[r]))}return n}function fe(e,t){return de(e)||ge(e,t)||he(e,t)||pe()}function de(e){if(Array.isArray(e))return e}function ge(e,t){if(!(typeof Symbol>"u"||!(Symbol.iterator in Object(e)))){var n=[],r=!0,o=!1,a=void 0;try{for(var i=e[Symbol.iterator](),u;!(r=(u=i.next()).done)&&(n.push(u.value),!(t&&n.length===t));r=!0);}catch(c){o=!0,a=c}finally{try{!r&&i.return!=null&&i.return()}finally{if(o)throw a}}return n}}function he(e,t){if(!!e){if(typeof e=="string")return $(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return $(e,t)}}function $(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function pe(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ve(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function M(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),n.push.apply(n,r)}return n}function D(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?M(Object(n),!0).forEach(function(r){ve(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):M(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function me(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(r){return t.reduceRight(function(o,a){return a(o)},r)}}function g(e){return function t(){for(var n=this,r=arguments.length,o=new Array(r),a=0;a<r;a++)o[a]=arguments[a];return o.length>=e.length?e.apply(this,o):function(){for(var i=arguments.length,u=new Array(i),c=0;c<i;c++)u[c]=arguments[c];return t.apply(n,[].concat(o,u))}}}function y(e){return{}.toString.call(e).includes("Object")}function be(e){return!Object.keys(e).length}function p(e){return typeof e=="function"}function ye(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function we(e,t){return y(t)||l("changeType"),Object.keys(t).some(function(n){return!ye(e,n)})&&l("changeField"),t}function Oe(e){p(e)||l("selectorType")}function je(e){p(e)||y(e)||l("handlerType"),y(e)&&Object.values(e).some(function(t){return!p(t)})&&l("handlersType")}function Se(e){e||l("initialIsRequired"),y(e)||l("initialType"),be(e)&&l("initialContent")}function Pe(e,t){throw new Error(e[t]||e.default)}var Ee={initialIsRequired:"initial state is required",initialType:"initial state should be an object",initialContent:"initial state shouldn't be an empty object",handlerType:"handler should be an object or a function",handlersType:"all handlers should be a functions",selectorType:"selector should be a function",changeType:"provided value of changes should be an object",changeField:'it seams you want to change a field in the state which is not specified in the "initial" state',default:"an unknown error accured in `state-local` package"},l=g(Pe)(Ee),b={changes:we,selector:Oe,handler:je,initial:Se};function Te(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};b.initial(e),b.handler(t);var n={current:e},r=g(Ae)(n,t),o=g(Ce)(n),a=g(b.changes)(e),i=g(Ie)(n);function u(){var f=arguments.length>0&&arguments[0]!==void 0?arguments[0]:function(m){return m};return b.selector(f),f(n.current)}function c(f){me(r,o,a,i)(f)}return[u,c]}function Ie(e,t){return p(t)?t(e.current):t}function Ce(e,t){return e.current=D(D({},e.current),t),t}function Ae(e,t,n){return p(t)?t(e.current):Object.keys(n).forEach(function(r){var o;return(o=t[r])===null||o===void 0?void 0:o.call(t,e.current[r])}),n}var $e={create:Te},Me={paths:{vs:"https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs"}};function De(e){return function t(){for(var n=this,r=arguments.length,o=new Array(r),a=0;a<r;a++)o[a]=arguments[a];return o.length>=e.length?e.apply(this,o):function(){for(var i=arguments.length,u=new Array(i),c=0;c<i;c++)u[c]=arguments[c];return t.apply(n,[].concat(o,u))}}}function xe(e){return{}.toString.call(e).includes("Object")}function Re(e){return e||x("configIsRequired"),xe(e)||x("configType"),e.urls?(qe(),{paths:{vs:e.urls.monacoBase}}):e}function qe(){console.warn(q.deprecation)}function ze(e,t){throw new Error(e[t]||e.default)}var q={configIsRequired:"the configuration object is required",configType:"the configuration object should be an object",default:"an unknown error accured in `@monaco-editor/loader` package",deprecation:`Deprecation warning!
    You are using deprecated way of configuration.

    Instead of using
      monaco.config({ urls: { monacoBase: '...' } })
    use
      monaco.config({ paths: { vs: '...' } })

    For more please check the link https://github.com/suren-atoyan/monaco-loader#config
  `},x=De(ze)(q),Le={config:Re},Fe=function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return function(o){return n.reduceRight(function(a,i){return i(a)},o)}};function z(e,t){return Object.keys(t).forEach(function(n){t[n]instanceof Object&&e[n]&&Object.assign(t[n],z(e[n],t[n]))}),A(A({},e),t)}var Ue={type:"cancelation",msg:"operation is manually canceled"};function O(e){var t=!1,n=new Promise(function(r,o){e.then(function(a){return t?o(Ue):r(a)}),e.catch(o)});return n.cancel=function(){return t=!0},n}var Be=$e.create({config:Me,isInitialized:!1,resolve:null,reject:null,monaco:null}),L=fe(Be,2),v=L[0],w=L[1];function He(e){var t=Le.config(e),n=t.monaco,r=le(t,["monaco"]);w(function(o){return{config:z(o.config,r),monaco:n}})}function Ve(){var e=v(function(t){var n=t.monaco,r=t.isInitialized,o=t.resolve;return{monaco:n,isInitialized:r,resolve:o}});if(!e.isInitialized){if(w({isInitialized:!0}),e.monaco)return e.resolve(e.monaco),O(j);if(window.monaco&&window.monaco.editor)return F(window.monaco),e.resolve(window.monaco),O(j);Fe(We,Ne)(Ge)}return O(j)}function We(e){return document.body.appendChild(e)}function Ke(e){var t=document.createElement("script");return e&&(t.src=e),t}function Ne(e){var t=v(function(r){var o=r.config,a=r.reject;return{config:o,reject:a}}),n=Ke("".concat(t.config.paths.vs,"/loader.js"));return n.onload=function(){return e()},n.onerror=t.reject,n}function Ge(){var e=v(function(n){var r=n.config,o=n.resolve,a=n.reject;return{config:r,resolve:o,reject:a}}),t=window.require;t.config(e.config),t(["vs/editor/editor.main"],function(n){F(n),e.resolve(n)},function(n){e.reject(n)})}function F(e){v().monaco||w({monaco:e})}function Ye(){return v(function(e){var t=e.monaco;return t})}var j=new Promise(function(e,t){return w({resolve:e,reject:t})}),U={config:He,init:Ve,__getMonacoInstance:Ye};U.config({paths:{vs:V}});let h;const Je=e=>{const[t,n]=S(!0);return U.init().then(r=>{h=r,n(!1)}),s(R,{get loading(){return t()},get children(){return s(Qe,e)}})},Qe=e=>{let t,n,r;return W(()=>{n=h.editor.create(t,{value:e.value,theme:e.theme}),r=h.editor.createModel(e.value,e.language,e.path?h.Uri.parse(e.path):void 0),n.setModel(r),n.onDidChangeModelContent(()=>{var o;(o=e.onChange)==null||o.call(e,n.getValue())})}),P(()=>{n.setValue(e.value)}),P(()=>{h.editor.setTheme(e.theme)}),K(()=>{r&&r.dispose(),n&&n.dispose()}),s(N,{w:"$full",h:"70vh",ref(o){const a=t;typeof a=="function"?a(o):t=o}})};function Xe(e){const{colorMode:t}=Y(),n=J(()=>t()==="light"?"vs":"vs-dark"),{pathname:r}=Q(),{isString:o,text:a}=X(e.data),[i,u]=S("utf-8"),[c,f]=S(a(i())),m=Z(),[B,H]=_(()=>k.put("/fs/put",c(),{headers:{"File-Path":encodeURIComponent(r()),"Content-Type":e.contentType||"text/plain"}}));P(ee(i,d=>{f(a(d))}));async function E(){const d=await H();ae(d,()=>{ie.success(m("global.save_success"))})}return ce(["Control","S"],E),s(oe,{w:"$full",alignItems:"start",spacing:"$2",pos:"relative",get children(){return[s(T,{when:!o,get children(){return s(te,{get encoding(){return i()},setEncoding:u})}}),s(Je,{get value(){return a(i())},get theme(){return n()},get path(){return I.obj.name},onChange:d=>{f(d)}}),s(T,{get when(){return ne("write")||I.write},get children(){return s(re,{get loading(){return B()},onClick:E,get children(){return m("global.save")}})}})]}})}const ke=()=>{const[e]=G();return s(R,{get loading(){return e.loading},get children(){return s(Xe,{get data(){var t;return(t=e())==null?void 0:t.content},get contentType(){var t;return(t=e())==null?void 0:t.contentType}})}})};export{ke as default};
