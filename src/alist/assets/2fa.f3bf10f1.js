import{b as v,aW as c,b9 as u,a as w,m as i,h as t,S as x,a4 as S,bP as g,au as C,az as I,b5 as _,al as $,I as k,C as T,a8 as D,ah as d,n as F,ba as L,aY as M,d2 as R}from"./index.51db64c5.js";const q=()=>{const{back:n}=v(),[l,h]=c(()=>u.post("/auth/2fa/generate")),a=w(),[r,p]=i(),f=async()=>{if(d().otp){F.warning(a("users.2fa_already_enabled")),n();return}const e=await h();L(e,p)},[s,y]=i("");f();const[m,b]=c(()=>{var e;return u.post("/auth/2fa/verify",{code:s(),secret:(e=r())==null?void 0:e.secret})}),o=async()=>{const e=await b();M(e,()=>{R({...d(),otp:!0}),n()})};return t(D,{get loading(){return l()},get children(){return t(x,{get when(){return r()},get children(){return t(S,{spacing:"$2",alignItems:"start",get children(){return[t(g,{get children(){return a("users.scan_qr")}}),t(C,{boxSize:"$xs",rounded:"$lg",get src(){var e;return(e=r())==null?void 0:e.qr}}),t(g,{get children(){return[I(()=>a("users.or_manual")),":"," ",t(_,{get color(){return $()},get children(){var e;return(e=r())==null?void 0:e.secret}})]}}),t(k,{maxW:"$xs",get placeholder(){return a("users.input_code")},get value(){return s()},onInput:e=>y(e.currentTarget.value),onKeyDown:e=>{e.key==="Enter"&&o()}}),t(T,{get loading(){return m()},onClick:o,get children(){return a("users.verify")}})]}})}})}})};export{q as default};
