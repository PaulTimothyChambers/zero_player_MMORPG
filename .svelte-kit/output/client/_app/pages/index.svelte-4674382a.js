import{S as z,i as H,s as J,e as T,c as B,a as N,d as m,b as k,f as U,H as _,J as P,I as K,K as x,C as fe,j as $,m as ee,o as te,x as Y,u as W,v as le,t as M,k as R,g as D,n as S,r as he,w as ve,L as se,h as ie,M as ge,N as me,O as _e}from"../chunks/vendor-2bcd6652.js";function Ee(o){let e,t,s,c;return{c(){e=T("div"),t=T("div"),this.h()},l(a){e=B(a,"DIV",{type:!0,class:!0,id:!0,value:!0});var d=N(e);t=B(d,"DIV",{class:!0,id:!0});var g=N(t);g.forEach(m),d.forEach(m),this.h()},h(){k(t,"class","square-active hidden svelte-mx6dsy"),k(t,"id",o[0]),k(e,"type","button"),k(e,"class","square svelte-mx6dsy"),k(e,"id",o[0]),k(e,"value",o[1])},m(a,d){U(a,e,d),_(e,t),s||(c=[P(t,"click",o[3]),P(e,"click",o[4])],s=!0)},p(a,[d]){d&1&&k(t,"id",a[0]),d&1&&k(e,"id",a[0]),d&2&&k(e,"value",a[1])},i:K,o:K,d(a){a&&m(e),s=!1,x(c)}}}function Ce(o,e,t){let{id:s}=e,{cell:c}=e,{toggleActive:a}=e;const d=h=>a(h.target),g=h=>a(h.target.firstChild);return o.$$set=h=>{"id"in h&&t(0,s=h.id),"cell"in h&&t(1,c=h.cell),"toggleActive"in h&&t(2,a=h.toggleActive)},[s,c,a,d,g]}class be extends z{constructor(e){super();H(this,e,Ce,Ee,J,{id:0,cell:1,toggleActive:2})}}class ke{constructor(e){this.id=e,this.position="",this.value=0,this.surroundingCells=[],this.surroundingCellsValue=0}}let Ie=Array(6500).fill(null);const l=Ie.map((o,e)=>new ke(e)),Q=fe([{id:1,title:"Preset One",config:[l[2758],l[2857],l[2859],l[2940],l[2941],l[2957],l[2958],l[2960],l[3040],l[3042],l[3057],l[3058],l[3060],l[3061],l[3065],l[3066],l[3135],l[3136],l[3143],l[3157],l[3158],l[3160],l[3165],l[3166],l[3231],l[3232],l[3234],l[3237],l[3240],l[3243],l[3257],l[3259],l[3331],l[3332],l[3335],l[3336],l[3343],l[3358],l[3440],l[3442],l[3540],l[3541]]}]);function ne(o,e,t){const s=o.slice();return s[7]=e[t],s[9]=t,s}function oe(o){let e,t;return e=new be({props:{toggleActive:o[1],id:o[9],cell:o[7]}}),{c(){$(e.$$.fragment)},l(s){ee(e.$$.fragment,s)},m(s,c){te(e,s,c),t=!0},p(s,c){const a={};c&1&&(a.cell=s[7]),e.$set(a)},i(s){t||(Y(e.$$.fragment,s),t=!0)},o(s){W(e.$$.fragment,s),t=!1},d(s){le(e,s)}}}function Ae(o){let e,t,s,c,a,d,g,h=o[0],i=[];for(let u=0;u<h.length;u+=1)i[u]=oe(ne(o,h,u));const f=u=>W(i[u],1,1,()=>{i[u]=null});return{c(){e=T("button"),t=M("SAVE STARTING CONFIGURATION (CONFIGURATION MOST RECENTLY USED)"),s=R(),c=T("div");for(let u=0;u<i.length;u+=1)i[u].c();this.h()},l(u){e=B(u,"BUTTON",{});var r=N(e);t=D(r,"SAVE STARTING CONFIGURATION (CONFIGURATION MOST RECENTLY USED)"),r.forEach(m),s=S(u),c=B(u,"DIV",{class:!0});var v=N(c);for(let E=0;E<i.length;E+=1)i[E].l(v);v.forEach(m),this.h()},h(){k(c,"class","game-board svelte-1esuf9n")},m(u,r){U(u,e,r),_(e,t),U(u,s,r),U(u,c,r);for(let v=0;v<i.length;v+=1)i[v].m(c,null);a=!0,d||(g=P(e,"click",o[2]),d=!0)},p(u,[r]){if(r&3){h=u[0];let v;for(v=0;v<h.length;v+=1){const E=ne(u,h,v);i[v]?(i[v].p(E,r),Y(i[v],1)):(i[v]=oe(E),i[v].c(),Y(i[v],1),i[v].m(c,null))}for(he(),v=h.length;v<i.length;v+=1)f(v);ve()}},i(u){if(!a){for(let r=0;r<h.length;r+=1)Y(i[r]);a=!0}},o(u){i=i.filter(Boolean);for(let r=0;r<i.length;r+=1)W(i[r]);a=!1},d(u){u&&m(e),u&&m(s),u&&m(c),se(i,u),d=!1,g()}}}function Te(o,e,t){let{gameBoard:s}=e,{changeCellValue:c}=e,{isPaused:a}=e,d,g={};Q.subscribe(f=>{g=f});const h=f=>{f.classList.toggle("hidden");let u=s[f.id];c(u.id),a||(d=s.filter(r=>r.value))},i=()=>{g={id:Date.now(),title:"title",config:d},Q.update(f=>[...f,g])};return o.$$set=f=>{"gameBoard"in f&&t(0,s=f.gameBoard),"changeCellValue"in f&&t(3,c=f.changeCellValue),"isPaused"in f&&t(4,a=f.isPaused)},[s,h,i,c,a]}class Be extends z{constructor(e){super();H(this,e,Te,Ae,J,{gameBoard:0,changeCellValue:3,isPaused:4})}}const{document:ae}=_e;function re(o,e,t){const s=o.slice();return s[26]=e[t],s}function ce(o){let e,t,s,c,a;return{c(){e=T("section"),t=T("button"),s=M("Click here to begin your ZERO-PLAYER MMORPG EXPERIENCE"),this.h()},l(d){e=B(d,"SECTION",{class:!0,id:!0});var g=N(e);t=B(g,"BUTTON",{class:!0,id:!0});var h=N(t);s=D(h,"Click here to begin your ZERO-PLAYER MMORPG EXPERIENCE"),h.forEach(m),g.forEach(m),this.h()},h(){k(t,"class","overlay__button svelte-yr9r7o"),k(t,"id","overlayButton"),k(e,"class","overlay svelte-yr9r7o"),k(e,"id","overlay")},m(d,g){U(d,e,g),_(e,t),_(t,s),c||(a=P(t,"click",o[5]),c=!0)},p:K,d(d){d&&m(e),c=!1,a()}}}function ue(o){let e,t,s,c,a,d,g,h=o[4],i=[];for(let f=0;f<h.length;f+=1)i[f]=de(re(o,h,f));return{c(){e=T("section"),t=T("div");for(let f=0;f<i.length;f+=1)i[f].c();s=R(),c=T("button"),a=M("Go Back"),this.h()},l(f){e=B(f,"SECTION",{class:!0,id:!0});var u=N(e);t=B(u,"DIV",{class:!0});var r=N(t);for(let E=0;E<i.length;E+=1)i[E].l(r);s=S(r),c=B(r,"BUTTON",{class:!0});var v=N(c);a=D(v,"Go Back"),v.forEach(m),r.forEach(m),u.forEach(m),this.h()},h(){k(c,"class",""),k(t,"class","load-config-modal svelte-yr9r7o"),k(e,"class","overlay-two svelte-yr9r7o"),k(e,"id","overlayTwo")},m(f,u){U(f,e,u),_(e,t);for(let r=0;r<i.length;r+=1)i[r].m(t,null);_(t,s),_(t,c),_(c,a),d||(g=P(c,"click",o[11]),d=!0)},p(f,u){if(u&1040){h=f[4];let r;for(r=0;r<h.length;r+=1){const v=re(f,h,r);i[r]?i[r].p(v,u):(i[r]=de(v),i[r].c(),i[r].m(t,s))}for(;r<i.length;r+=1)i[r].d(1);i.length=h.length}},d(f){f&&m(e),se(i,f),d=!1,g()}}}function de(o){let e,t,s=o[26].title+"",c,a,d,g,h=o[26].title+"",i,f,u,r;function v(){return o[12](o[26])}return{c(){e=T("div"),t=T("p"),c=M(s),a=R(),d=T("button"),g=M("Load "),i=M(h),f=R(),this.h()},l(E){e=B(E,"DIV",{class:!0});var b=N(e);t=B(b,"P",{});var V=N(t);c=D(V,s),V.forEach(m),a=S(b),d=B(b,"BUTTON",{});var L=N(d);g=D(L,"Load "),i=D(L,h),L.forEach(m),f=S(b),b.forEach(m),this.h()},h(){k(e,"class","config-card")},m(E,b){U(E,e,b),_(e,t),_(t,c),_(e,a),_(e,d),_(d,g),_(d,i),_(e,f),u||(r=P(d,"click",v),u=!0)},p(E,b){o=E,b&16&&s!==(s=o[26].title+"")&&ie(c,s),b&16&&h!==(h=o[26].title+"")&&ie(i,h)},d(E){E&&m(e),u=!1,r()}}}function Ne(o){let e,t,s,c,a,d,g,h,i,f,u,r,v,E,b,V,L,w,I=o[1]&&ce(o),A=o[2]&&ue(o);return b=new Be({props:{gameBoard:o[0],changeCellValue:o[9],isPaused:o[3]}}),{c(){e=R(),t=T("main"),I&&I.c(),s=R(),A&&A.c(),c=R(),a=T("div"),d=T("button"),g=M("BEGIN GAME"),h=R(),i=T("button"),f=M("END GAME & CLEAR BOARD"),u=R(),r=T("button"),v=M("LOAD CONFIGURATION"),E=R(),$(b.$$.fragment),this.h()},l(C){ge('[data-svelte="svelte-r7cy6b"]',ae.head).forEach(m),e=S(C),t=B(C,"MAIN",{});var p=N(t);I&&I.l(p),s=S(p),A&&A.l(p),c=S(p),a=B(p,"DIV",{class:!0});var G=N(a);d=B(G,"BUTTON",{id:!0});var q=N(d);g=D(q,"BEGIN GAME"),q.forEach(m),h=S(G),i=B(G,"BUTTON",{});var j=N(i);f=D(j,"END GAME & CLEAR BOARD"),j.forEach(m),u=S(G),r=B(G,"BUTTON",{});var X=N(r);v=D(X,"LOAD CONFIGURATION"),X.forEach(m),E=S(G),ee(b.$$.fragment,G),G.forEach(m),p.forEach(m),this.h()},h(){ae.title="Massive Open World",k(d,"id","gameButton"),k(a,"class","user-interaction-bar")},m(C,y){U(C,e,y),U(C,t,y),I&&I.m(t,null),_(t,s),A&&A.m(t,null),_(t,c),_(t,a),_(a,d),_(d,g),_(a,h),_(a,i),_(i,f),_(a,u),_(a,r),_(r,v),_(a,E),te(b,a,null),V=!0,L||(w=[P(d,"click",o[7]),P(i,"click",o[8]),P(r,"click",o[6])],L=!0)},p(C,[y]){C[1]?I?I.p(C,y):(I=ce(C),I.c(),I.m(t,s)):I&&(I.d(1),I=null),C[2]?A?A.p(C,y):(A=ue(C),A.c(),A.m(t,c)):A&&(A.d(1),A=null);const p={};y&1&&(p.gameBoard=C[0]),y&8&&(p.isPaused=C[3]),b.$set(p)},i(C){V||(Y(b.$$.fragment,C),V=!0)},o(C){W(b.$$.fragment,C),V=!1},d(C){C&&m(e),C&&m(t),I&&I.d(),A&&A.d(),le(b),L=!1,x(w)}}}function Oe(o,e,t){let s;me(o,Q,n=>t(4,s=n));let c,a=!0,d=!1,g,h=0,i,f=!1;const u=()=>{c=document.getElementById("gameButton"),l.forEach(n=>{r(n),n.position=document.getElementById(`${n.id}`)}),t(1,a=!1)},r=n=>{const F=[l[n.id-1],l[n.id+1],l[n.id-99],l[n.id+99],l[n.id-100],l[n.id+100],l[n.id-101],l[n.id+101],l[n.id-6399],l[n.id+6399],l[n.id-6400],l[n.id+6400],l[n.id-6401],l[n.id+6401],l[n.id-6499],l[n.id+6499]].filter(Z=>Z!==void 0);n.surroundingCells=F},v=()=>{t(2,d=!0)},E=()=>{l.find(O=>O.value)&&c.textContent==="BEGIN GAME"?(c.textContent="PAUSE GAME",i=setInterval(b,60)):y(),t(3,f=!0)},b=()=>{g=setTimeout(C,30),l.forEach(n=>{n.value?V(n):L(n)})},V=n=>{(w(n)<2||w(n)>3)&&I(n.position.firstChild)},L=n=>{w(n)===3&&A(n.position.firstChild)},w=n=>n.surroundingCells.reduce((F,Z)=>F+=l[Z.id].value,0),I=n=>{n.classList.add("marked-for-inactive")},A=n=>{n.classList.add("marked-for-active")},C=()=>{l.forEach(n=>{const O=n.position.firstChild.classList;O.contains("marked-for-inactive")?(O.add("hidden"),O.remove("marked-for-inactive"),G(n.id)):O.contains("marked-for-active")&&(O.remove("hidden"),O.remove("marked-for-active"),G(n.id))}),h++},y=()=>{clearInterval(i),clearTimeout(g),c.textContent="BEGIN GAME"},p=()=>{l.forEach(n=>{const O=n.position.firstChild.classList;n.value?(O.add("hidden"),O.remove("marked-for-inactive"),G(n.id)):O.remove("marked-for-active")}),y(),console.log(h),t(3,f=!1),h=0},G=n=>{l[n].value?t(0,l[n].value=0,l):t(0,l[n].value=1,l)},q=n=>{p(),n.config.forEach(O=>{l.forEach(F=>{F.id===O.id&&(F.position.firstChild.classList.toggle("hidden"),F.value=1)})}),t(2,d=!1)};return[l,a,d,f,s,u,v,E,p,G,q,()=>{t(2,d=!1)},n=>q(n)]}class Ge extends z{constructor(e){super();H(this,e,Oe,Ne,J,{})}}export{Ge as default};