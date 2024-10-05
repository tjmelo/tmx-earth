"use strict";(self.webpackChunktmx_earth=self.webpackChunktmx_earth||[]).push([[708],{1708:(t,e,a)=>{a.r(e),a.d(e,{default:()=>O});var s=a(5043),n=a(3003),r=a(8387),i=a(8610);function o(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function l(t){return parseFloat(t)}var d=a(6596),h=a(3290),c=a(1192),m=a(6870),x=a(8249),u=a(2532),p=a(552);function j(t){return(0,p.Ay)("MuiSkeleton",t)}(0,u.A)("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);var g=a(579);const f=h.i7`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`,w=h.i7`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`,v="string"!==typeof f?h.AH`
        animation: ${f} 2s ease-in-out 0.5s infinite;
      `:null,y="string"!==typeof w?h.AH`
        &::after {
          animation: ${w} 2s linear 0.5s infinite;
        }
      `:null,b=(0,c.Ay)("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:a}=t;return[e.root,e[a.variant],!1!==a.animation&&e[a.animation],a.hasChildren&&e.withChildren,a.hasChildren&&!a.width&&e.fitContent,a.hasChildren&&!a.height&&e.heightAuto]}})((0,m.A)((t=>{let{theme:e}=t;const a=o(e.shape.borderRadius)||"px",s=l(e.shape.borderRadius);return{display:"block",backgroundColor:e.vars?e.vars.palette.Skeleton.bg:(0,d.X4)(e.palette.text.primary,"light"===e.palette.mode?.11:.13),height:"1.2em",variants:[{props:{variant:"text"},style:{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${s}${a}/${Math.round(s/.6*10)/10}${a}`,"&:empty:before":{content:'"\\00a0"'}}},{props:{variant:"circular"},style:{borderRadius:"50%"}},{props:{variant:"rounded"},style:{borderRadius:(e.vars||e).shape.borderRadius}},{props:t=>{let{ownerState:e}=t;return e.hasChildren},style:{"& > *":{visibility:"hidden"}}},{props:t=>{let{ownerState:e}=t;return e.hasChildren&&!e.width},style:{maxWidth:"fit-content"}},{props:t=>{let{ownerState:e}=t;return e.hasChildren&&!e.height},style:{height:"auto"}},{props:{animation:"pulse"},style:v||{animation:`${f} 2s ease-in-out 0.5s infinite`}},{props:{animation:"wave"},style:{position:"relative",overflow:"hidden",WebkitMaskImage:"-webkit-radial-gradient(white, black)","&::after":{background:`linear-gradient(\n                90deg,\n                transparent,\n                ${(e.vars||e).palette.action.hover},\n                transparent\n              )`,content:'""',position:"absolute",transform:"translateX(-100%)",bottom:0,left:0,right:0,top:0}}},{props:{animation:"wave"},style:y||{"&::after":{animation:`${w} 2s linear 0.5s infinite`}}}]}}))),C=s.forwardRef((function(t,e){const a=(0,x.b)({props:t,name:"MuiSkeleton"}),{animation:s="pulse",className:n,component:o="span",height:l,style:d,variant:h="text",width:c,...m}=a,u={...a,animation:s,component:o,variant:h,hasChildren:Boolean(m.children)},p=(t=>{const{classes:e,variant:a,animation:s,hasChildren:n,width:r,height:o}=t,l={root:["root",a,s,n&&"withChildren",n&&!r&&"fitContent",n&&!o&&"heightAuto"]};return(0,i.A)(l,j,e)})(u);return(0,g.jsx)(b,{as:o,ref:e,className:(0,r.A)(p.root,n),ownerState:u,...m,style:{width:c,height:l,...d}})})),N="components_flag__Q-06q",k="components_name__kJf3t",S="components_borders__G20cY",A=t=>{let{data:e,children:a,subdata:s}=t;return(0,g.jsxs)("div",{className:"col-xs-12 my-3 border-bottom",children:[(0,g.jsx)("span",{className:"text-secondary",children:a}),(0,g.jsx)("br",{}),(0,g.jsxs)("strong",{className:"text-primary",children:[e,s?(0,g.jsxs)("sup",{children:[" ",s," "]}):""]}),(0,g.jsx)("br",{})]})},$=()=>(0,g.jsxs)("div",{className:"row my-5",children:[(0,g.jsxs)("div",{className:`col-xs-12 d-flex mb-2 ${N}`,children:[(0,g.jsx)(C,{variant:"rectangular",width:100,height:80}),(0,g.jsx)("span",{className:`text-primary ${k}`,children:(0,g.jsx)(C,{variant:"rectangular",width:100,height:20})})]}),(0,g.jsx)(A,{data:(0,g.jsx)(C,{width:200}),children:(0,g.jsx)(C,{width:100})}),(0,g.jsx)(A,{data:(0,g.jsx)(C,{width:200}),children:(0,g.jsx)(C,{width:100})}),(0,g.jsx)(A,{data:(0,g.jsx)(C,{width:200}),children:(0,g.jsx)(C,{width:100})}),(0,g.jsx)(A,{data:(0,g.jsx)(C,{width:200}),children:(0,g.jsx)(C,{width:100})}),(0,g.jsx)(A,{data:(0,g.jsx)(C,{width:200}),children:(0,g.jsx)(C,{width:100})}),(0,g.jsx)(A,{data:(0,g.jsx)(C,{width:200}),children:(0,g.jsx)(C,{width:100})}),(0,g.jsx)(A,{data:(0,g.jsx)(C,{width:200}),children:(0,g.jsx)(C,{width:100})})]}),_=t=>{let e=t.toString().split(""),a=Math.floor(e.length/3),s=[];for(let n=0;n<a;n++){let t=e.length-3*(n+1)-1;-1!==t&&s.push(t)}for(let n=0;n<s.length;n++)e.splice(s[n]+1,0,".");return e.join("")},R=t=>{let{data:e}=t;const[a,n]=(0,s.useState)(),[r,i]=(0,s.useState)();return(0,s.useEffect)((()=>{const t=t=>{for(const e in t)return e};n(t(e.name.nativeName)),i(t(e.currencies))}),[e]),(0,g.jsxs)("div",{className:"row my-5",children:[(0,g.jsxs)("div",{className:`col-xs-12 d-flex mb-2 ${N}`,children:[e.flags.svg?(0,g.jsx)("figure",{children:(0,g.jsx)("img",{src:e.flags.svg,alt:e.name.official})}):(0,g.jsx)(C,{variant:"rectangular",width:100,height:80}),(0,g.jsx)("span",{className:`text-primary ${k}`,children:e.name.common}),e.coatOfArms.svg?(0,g.jsx)("img",{width:30,height:30,src:e.coatOfArms.svg,alt:e.name.official}):(0,g.jsx)(C,{variant:"circular",width:30,height:30})]}),(0,g.jsx)(A,{data:a?e.name.nativeName[a].common:(0,g.jsx)(C,{width:100}),children:"Native name:"}),(0,g.jsx)(A,{data:e.capital||(0,g.jsx)(C,{width:100}),children:"Capital:"}),(0,g.jsx)(A,{data:e.region||(0,g.jsx)(C,{width:100}),children:"Region:"}),(0,g.jsx)(A,{data:e.subregion||(0,g.jsx)(C,{width:100}),children:"Subregion:"}),(0,g.jsx)(A,{data:e.languages?Object.values(e.languages)[0]:(0,g.jsx)(C,{width:100}),children:"Languages:"}),(0,g.jsx)(A,{data:r?e.currencies[r].name:(0,g.jsx)(C,{width:100}),subdata:r&&e.currencies[r].symbol,children:"Currencies:"}),(0,g.jsxs)("div",{className:"col-xs-12 col-sm-6 col-md-4 col-lg-4 mb-3 border-bottom",children:[(0,g.jsx)("span",{className:"text-secondary",children:"Borders: "})," ",(0,g.jsx)("br",{}),e.borders?e.borders.map((t=>(0,g.jsx)("strong",{className:`text-primary ${S}`,children:(0,g.jsxs)("b",{children:[t," "]})},t))):(0,g.jsx)(C,{width:100})]}),(0,g.jsx)(A,{data:_(e.population)||(0,g.jsx)(C,{width:100}),children:"Poulation:"}),(0,g.jsx)(A,{data:_(e.area)||(0,g.jsx)(C,{width:100}),children:"Area:"}),(0,g.jsx)(A,{data:e.tld||(0,g.jsx)(C,{width:100}),children:"Domain:"})]})};var M=a(4649),X=a(55);const O=()=>{const t=(0,n.d4)((t=>t.country.country)),[e,a]=(0,s.useState)([]);return(0,s.useEffect)((()=>{if(a((0,g.jsx)($,{})),t.length&&"Type the name of a country"!==t){(async t=>{try{const{data:e}=await t;a(null===e||void 0===e?void 0:e.map((t=>(0,g.jsx)(R,{data:t},t.cca2))))}catch(e){console.error(e)}})((0,X.t)(t))}else a((0,g.jsx)(M.A,{type:"warning",children:"Type the name of a country!"}))}),[t]),(0,g.jsx)("section",{className:"container",children:e})}}}]);
//# sourceMappingURL=708.bfa58342.chunk.js.map