import{E as z,cj as p,k as h,h as t,ae as k,S as s,C as i,ak as S,G as d}from"./index.51db64c5.js";import{m as $,n as w}from"./index.79b35a46.js";const A=C=>{var m;const e=z({maxShowPage:4,defaultPageSize:30,defaultCurrent:1,hideOnSinglePage:!0},C),[n,g]=p({pageSize:e.defaultPageSize,current:e.defaultCurrent});(m=e.setResetCallback)==null||m.call(e,()=>{g("current",e.defaultCurrent)});const a=h(()=>Math.ceil(e.total/n.pageSize)),P=h(()=>{const r=n.current,c=Math.max(2,r-Math.floor(e.maxShowPage/2));return Array.from({length:r-c},(x,u)=>c+u)}),f=h(()=>{const r=n.current,c=Math.min(a()-1,r+Math.floor(e.maxShowPage/2));return Array.from({length:c-r},(x,u)=>r+1+u)}),o={"@initial":"sm","@md":"md"},l=r=>{var c;g("current",r),(c=e.onChange)==null||c.call(e,r)};return t(s,{get when(){return!e.hideOnSinglePage||a()>1},get children(){return t(k,{spacing:"$1",get children(){return[t(s,{get when(){return n.current!==1},get children(){return[t(i,{size:o,get colorScheme(){return e.colorScheme},onClick:()=>{l(1)},px:"$3",children:"1"}),t(S,{size:o,get icon(){return t($,{})},"aria-label":"Previous",get colorScheme(){return e.colorScheme},onClick:()=>{l(n.current-1)},w:"2rem !important"})]}}),t(d,{get each(){return P()},children:r=>t(i,{size:o,get colorScheme(){return e.colorScheme},onClick:()=>{l(r)},px:r>10?"$2_5":"$3",children:r})}),t(i,{size:o,get colorScheme(){return e.colorScheme},variant:"solid",get px(){return n.current>10?"$2_5":"$3"},get children(){return n.current}}),t(d,{get each(){return f()},children:r=>t(i,{size:o,get colorScheme(){return e.colorScheme},onClick:()=>{l(r)},px:r>10?"$2_5":"$3",children:r})}),t(s,{get when(){return n.current!==a()},get children(){return[t(S,{size:o,get icon(){return t(w,{})},"aria-label":"Next",get colorScheme(){return e.colorScheme},onClick:()=>{l(n.current+1)},w:"2rem !important"}),t(i,{size:o,get colorScheme(){return e.colorScheme},onClick:()=>{l(a())},get px(){return a()>10?"$2_5":"$3"},get children(){return a()}})]}})]}})}})};export{A as P};
