(this["webpackJsonptmx-earth"]=this["webpackJsonptmx-earth"]||[]).push([[0],{5:function(e,c,t){e.exports={flag:"components_flag__18FvG",name:"components_name__Wq6W9",borders:"components_borders__1jVSU"}},54:function(e,c,t){},55:function(e,c,t){"use strict";t.r(c);var s=t(1),n=t.n(s),a=t(6),r=t.n(a),l=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,56)).then((function(c){var t=c.getCLS,s=c.getFID,n=c.getFCP,a=c.getLCP,r=c.getTTFB;t(e),s(e),n(e),a(e),r(e)}))},o=t(4),j=t(9),i=Object(j.b)({name:"country",initialState:{country:[]},reducers:{update:function(e,c){e.country=c.payload}}}),b=i.actions.update,m=i.reducer,d=Object(j.a)({reducer:{country:m}}),x=t(8),u=t(7),O=t.n(u),h=O.a.create({baseURL:"https://restcountries.eu/rest/v2/all",timeout:5e3}),p=t(0),g=function(e){var c=Object(o.b)(),t=Object(s.useState)([]),n=Object(x.a)(t,2),a=n[0],r=n[1];Object(s.useEffect)((function(){h.get("https://restcountries.eu/rest/v2/all?fields=name").then((function(e){return r(e.data)}))}),[]);return Object(p.jsx)("div",{className:"container",children:Object(p.jsxs)("select",{className:"form-select form-select-lg my-2 shadow",onChange:function(e){c(b(e.target.value))},children:[Object(p.jsx)("option",{value:"Select a country",children:"Select a country"}),a.map((function(e,c){return Object(p.jsx)("option",{children:e.name},c)}))]})})},N=t(5),f=t.n(N),y=function(e){var c=e.data,t=function(e){for(var c=e.toString().split(""),t=Math.floor(c.length/3),s=[],n=0;n<t;n++){var a=c.length-3*(n+1)-1;-1!==a&&s.push(a)}for(var r=0;r<s.length;r++)c.splice(s[r]+1,0,".");return c.join("")},s=t(c.population),n=t(c.area);return Object(p.jsxs)("div",{className:"row",children:[Object(p.jsxs)("div",{className:"col-xs-12 d-flex mb-2 ".concat(f.a.flag),children:[Object(p.jsx)("figure",{children:Object(p.jsx)("img",{src:c.flag,alt:c.nativeName})}),Object(p.jsx)("span",{className:"text-primary ".concat(f.a.name),children:c.name}),Object(p.jsx)("sup",{children:c.alpha3Code}),Object(p.jsx)("sup",{children:c.alpha2Code}),Object(p.jsx)("sup",{children:c.numericCode}),Object(p.jsx)("br",{})]}),Object(p.jsxs)("div",{className:"col-xs-12 col-sm-6 col-md-3 col-lg-3 mb-3",children:[Object(p.jsx)("span",{className:"text-secondary",children:"Native name: "})," ",Object(p.jsx)("br",{}),Object(p.jsx)("strong",{className:"text-primary",children:c.nativeName||"-----"})," ",Object(p.jsx)("br",{})]}),Object(p.jsxs)("div",{className:"col-xs-12 col-sm-6 col-md-3 col-lg-3 mb-3",children:[Object(p.jsx)("span",{className:"text-secondary",children:"Capital: "})," ",Object(p.jsx)("br",{}),Object(p.jsx)("strong",{className:"text-primary",children:c.capital||"-----"}),Object(p.jsx)("br",{})]}),Object(p.jsxs)("div",{className:"col-xs-12 col-sm-6 col-md-3 col-lg-3 mb-3",children:[Object(p.jsx)("span",{className:"text-secondary",children:"Region: "})," ",Object(p.jsx)("br",{}),Object(p.jsx)("strong",{className:"text-primary",children:c.region||"-----"})," ",Object(p.jsx)("br",{})]}),Object(p.jsxs)("div",{className:"col-xs-12 col-sm-6 col-md-3 col-lg-3 mb-3",children:[Object(p.jsx)("span",{className:"text-secondary",children:"Subregion: "})," ",Object(p.jsx)("br",{}),Object(p.jsx)("strong",{className:"text-primary",children:c.subregion||"-----"})," ",Object(p.jsx)("br",{})]}),Object(p.jsxs)("div",{className:"col-xs-12 col-sm-6 col-md-4 col-lg-4 mb-3",children:[Object(p.jsx)("span",{className:"text-secondary",children:"Languages: "})," ",Object(p.jsx)("br",{}),c.languages.map((function(e,c){return Object(p.jsxs)("strong",{className:"text-primary",children:[e.name," | ",e.nativeName,Object(p.jsx)("sup",{children:e.iso639_1})," ",Object(p.jsx)("br",{})]},c)}))]}),Object(p.jsxs)("div",{className:"col-xs-12 col-sm-6 col-md-4 col-lg-4 mb-3",children:[Object(p.jsx)("span",{className:"text-secondary",children:"Currencies: "})," ",Object(p.jsx)("br",{}),c.currencies.map((function(e,c){return Object(p.jsxs)("strong",{className:"text-primary",children:[e.name,Object(p.jsx)("sup",{children:e.symbol}),Object(p.jsx)("sup",{children:e.code}),Object(p.jsx)("br",{})]},c)}))]}),Object(p.jsxs)("div",{className:"col-xs-12 col-sm-6 col-md-4 col-lg-4 mb-3",children:[Object(p.jsx)("span",{className:"text-secondary",children:"Borders: "})," ",Object(p.jsx)("br",{}),c.borders.map((function(e,c){return Object(p.jsx)("strong",{className:"text-primary ".concat(f.a.borders),children:Object(p.jsxs)("b",{children:[e," "]})},c)}))]}),Object(p.jsxs)("div",{className:"col-xs-12 col-sm-6 col-md-4 col-lg-4 mb-3",children:[Object(p.jsx)("span",{className:"text-secondary",children:"Regional Blocs: "})," ",Object(p.jsx)("br",{}),c.regionalBlocs.map((function(e,c){return Object(p.jsxs)("strong",{className:"text-primary ".concat(f.a.borders),children:[e.acronym,Object(p.jsx)("sup",{children:e.name})," ",Object(p.jsx)("br",{})]},c)}))]}),Object(p.jsxs)("div",{className:"col-xs-12 col-sm-6 col-md-3 col-lg-3 mb-3",children:[Object(p.jsx)("span",{className:"text-secondary",children:"Poulation: "})," ",Object(p.jsx)("br",{}),Object(p.jsx)("strong",{className:"text-primary",children:s||"-----"})]}),Object(p.jsxs)("div",{className:"col-xs-12 col-sm-6 col-md-3 col-lg-3 mb-3",children:[Object(p.jsx)("span",{className:"text-secondary",children:"Area: "})," ",Object(p.jsx)("br",{}),Object(p.jsx)("strong",{className:"text-primary",children:n||"-----"})," ",Object(p.jsx)("br",{})]}),Object(p.jsxs)("div",{className:"col-xs-12 col-sm-6 col-md-2 col-lg-2 mb-3",children:[Object(p.jsx)("span",{className:"text-secondary",children:"Domain: "})," ",Object(p.jsx)("br",{}),Object(p.jsx)("strong",{className:"text-primary",children:c.topLevelDomain||"-----"})," ",Object(p.jsx)("br",{})]})]})},v=function(e){var c=Object(o.c)((function(e){return e.country.country})),t=Object(s.useState)([]),n=Object(x.a)(t,2),a=n[0],r=n[1];return Object(s.useEffect)((function(){(r(Object(p.jsx)("div",{className:"alert alert-primary",children:"Getting data..."})),0===c.length||"Select a country"===c)?r(Object(p.jsx)("div",{className:"alert alert-warning",children:"Select a country!"})):O.a.get("https://restcountries.eu/rest/v2/name/".concat(c,"?fullText=true")).then((function(e){r(e.data.map((function(e,c){return Object(p.jsx)(y,{data:e},c)})))})).catch((function(e){return console.error(e)}))}),[c]),Object(p.jsx)("section",{className:"container my-5",children:a})};t(54);r.a.render(Object(p.jsx)(n.a.StrictMode,{children:Object(p.jsxs)(o.a,{store:d,children:[Object(p.jsx)(g,{}),Object(p.jsx)(v,{})]})}),document.getElementById("root")),l()}},[[55,1,2]]]);
//# sourceMappingURL=main.99d3a54a.chunk.js.map