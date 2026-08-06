import{c as l,i as y,r as u,j as e,b as f}from"./index-DXApPVQu.js";/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=l("EyeOff",[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=l("Eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]),b=y.forwardRef(({className:d,type:o="text",label:c,error:t,icon:s,...i},n)=>{const[a,x]=u.useState(!1),r=o==="password",p=r?a?"text":"password":o;return e.jsxs("div",{className:"w-full relative space-y-1",children:[c&&e.jsx("label",{className:"text-sm font-medium text-gray-300 ml-1",children:c}),e.jsxs("div",{className:"relative",children:[s&&e.jsx("div",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-500",children:e.jsx(s,{size:18})}),e.jsx("input",{type:p,className:f("flex h-11 w-full rounded-lg border bg-darkSurface px-3 py-2 text-sm text-white placeholder:text-gray-500","focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200","disabled:cursor-not-allowed disabled:opacity-50",s&&"pl-10",r&&"pr-10",t?"border-red-500 focus:ring-red-500/50 focus:border-red-500":"border-white/10",d),ref:n,...i}),r&&e.jsx("button",{type:"button",onClick:()=>x(!a),className:"absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors",children:a?e.jsx(m,{size:18}):e.jsx(h,{size:18})})]}),t&&e.jsx("p",{className:"text-xs text-red-500 ml-1 mt-1",children:t})]})});b.displayName="Input";export{b as I};
