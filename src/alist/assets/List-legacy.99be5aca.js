!function(){function e(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==t)return;var r,i,o=[],c=!0,l=!1;try{for(t=t.call(e);!(c=(r=t.next()).done)&&(o.push(r.value),!n||o.length!==n);c=!0);}catch(u){l=!0,i=u}finally{try{c||null==t.return||t.return()}finally{if(l)throw i}}return o}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return n(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function n(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}function t(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}System.register(["./index-legacy.5b9d2b90.js","./Folder-legacy.d951f2a5.js","./index-legacy.e0c6f59d.js","./index-legacy.c27715cb.js","./icon-legacy.954f99cd.js","./helper-legacy.3f408504.js","./Layout-legacy.f997e785.js","./useTitle-legacy.fba5518f.js","./FolderTree-legacy.346d4073.js","./video_box-legacy.267c4704.js","./_commonjs-dynamic-modules-legacy.cf19cda3.js","./Paginator-legacy.6422277d.js","./index-legacy.5cde0822.js","./index-legacy.8397490f.js"],(function(n){"use strict";var r,i,o,c,l,u,a,s,f,d,g,b,m,h,y,p,j,w,v,x,A,S,$,k,C,O,_,P,M,z,I,E,L,D,K,T,F;return{setters:[function(e){r=e.bI,i=e.b,o=e.h,c=e.ae,l=e.L,u=e.aM,a=e.az,s=e.dr,f=e.t,d=e.aO,g=e.S,b=e.ax,m=e.al,h=e.aw,y=e.b5,p=e.cl,j=e.cV,w=e.ad,v=e.l,x=e.a,A=e.m,S=e.x,$=e.ds,k=e.dt,C=e.du,O=e.E,_=e.G,P=e.a1,M=e.a4},function(e){z=e.b},function(e){I=e.u},function(e){E=e.q},function(e){L=e.g,D=e.O},function(e){K=e.u,T=e.I,F=e.a},function(){},function(){},function(){},function(){},function(){},function(){},function(){},function(){}],execute:function(){var G=[{name:"name",textAlign:"left",w:{"@initial":"76%","@md":"50%"}},{name:"size",textAlign:"right",w:{"@initial":"24%","@md":"17%"}},{name:"modified",textAlign:"right",w:{"@initial":0,"@md":"33%"}}],H=function(e){if((0,r().isHide)(e.obj))return null;var n=I().setPathAs,x=z({id:1}).show,A=i(),S=A.pushHref,$=A.to,k=F().isMouseSupported,C=K(),O=function(){return v.list_item_filename_overflow};return o(w.div,{initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},transition:{duration:.2},style:{width:"100%"},get children(){var r,i,w;return o(c,(i={get classList(){return{selected:!!e.obj.selected}},class:"list-item viselect-item"},(w={})[r="data-index"]=w[r]||{},w[r].get=function(){return e.index},t(i,"w","$full"),t(i,"p","$2"),t(i,"rounded","$lg"),t(i,"transition","all 0.3s"),"_hover",w._hover=w._hover||{},w._hover.get=function(){return{transform:"scale(1.01)",bgColor:l()}},t(i,"as",E),"href",w.href=w.href||{},w.href.get=function(){return e.obj.name},"cursor",w.cursor=w.cursor||{},w.cursor.get=function(){return k()||u()&&!C()?"default":"pointer"},"bgColor",w.bgColor=w.bgColor||{},w.bgColor.get=function(){return a((function(){return!!e.obj.selected}),!0)()?l():void 0},t(i,"on:dblclick",(function(n){k()&&(n.ctrlKey||n.metaKey||n.shiftKey||$(S(e.obj.name)))})),t(i,"on:click",(function(n){if(k())return n.preventDefault();u()&&(n.preventDefault(),C()?$(S(e.obj.name)):s(e.index,!e.obj.selected))})),t(i,"onMouseEnter",(function(){n(e.obj.name,e.obj.is_dir,!0)})),t(i,"onContextMenu",(function(n){f((function(){d(!1),s(e.index,!0,!0)})),x(n,{props:e.obj})})),"children",w.children=w.children||{},w.children.get=function(){return[o(c,{class:"name-box",spacing:"$1",get w(){return G[0].w},get children(){return[o(g,{get when(){return u()},get children(){return o(T,{"on:click":function(e){e.stopPropagation()},get checked(){return e.obj.selected},onChange:function(n){s(e.index,n.target.checked)}})}}),o(b,{class:"icon",boxSize:"$6",get color(){return m()},get as(){return L(e.obj)},mr:"$1","on:click":function(n){e.obj.type===D.IMAGE&&(n.stopPropagation(),n.preventDefault(),h.emit("gallery",e.obj.name))}}),o(y,{class:"name",get css(){return{wordBreak:"break-all",whiteSpace:"multi_line"===O()?"unset":"nowrap","overflow-x":"scrollable"===O()?"auto":"hidden",textOverflow:"ellipsis"===O()?"ellipsis":"unset","scrollbar-width":"none","&::-webkit-scrollbar":{display:"none"}}},get title(){return e.obj.name},get children(){return e.obj.name}})]}}),o(y,{class:"size",get w(){return G[1].w},get textAlign(){return G[1].textAlign},get children(){return p(e.obj.size)}}),o(y,{class:"modified",display:{"@initial":"none","@md":"inline"},get w(){return G[2].w},get textAlign(){return G[2].textAlign},get children(){return j(e.obj.modified)}})]},function(e,n){for(var t in n)(o=n[t]).configurable=o.enumerable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,t,o);if(Object.getOwnPropertySymbols)for(var r=Object.getOwnPropertySymbols(n),i=0;i<r.length;i++){var o,c=r[i];(o=n[c]).configurable=o.enumerable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,c,o)}}(i,w),i))}})};n("default",(function(){var n=x(),t=e(A(),2),r=t[0],i=t[1],l=e(A(!1),2),a=l[0],s=l[1];S((function(){r()&&$(r(),a())}));var b=function(e){return{fontWeight:"bold",fontSize:"$sm",color:"$neutral11",textAlign:e.textAlign,cursor:"pointer",onClick:function(){e.name===r()?s(!a()):f((function(){i(e.name),s(!1)}))}}},m=F(),h=m.isMouseSupported,p=m.registerSelectContainer,j=m.captureContentMenu;return p(),o(M,{"oncapture:contextmenu":j,get classList(){return{"viselect-container":h()}},class:"list",w:"$full",spacing:"$1",get children(){return[o(c,{class:"title",w:"$full",p:"$2",get children(){return[o(c,{get w(){return G[0].w},spacing:"$1",get children(){return[o(g,{get when(){return u()},get children(){return o(T,{get checked(){return k()},get indeterminate(){return C()},onChange:function(e){d(e.target.checked)}})}}),o(y,O((function(){return b(G[0])}),{get children(){return n("home.obj.".concat(G[0].name))}}))]}}),o(y,O({get w(){return G[1].w}},(function(){return b(G[1])}),{get children(){return n("home.obj.".concat(G[1].name))}})),o(y,O({get w(){return G[2].w}},(function(){return b(G[2])}),{display:{"@initial":"none","@md":"inline"},get children(){return n("home.obj.".concat(G[2].name))}}))]}}),o(_,{get each(){return P.objs},children:function(e,n){return o(H,{obj:e,get index(){return n()}})}})]}})}))}}}))}();
