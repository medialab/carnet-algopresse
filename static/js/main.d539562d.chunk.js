(this["webpackJsonpcarnet-algopresse"]=this["webpackJsonpcarnet-algopresse"]||[]).push([[0],{117:function(e,t,a){},149:function(e,t,a){},152:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a(1),r=a.n(i),c=a(31),o=a.n(c),l=(a(72),a(26)),s=a(5),u=(a(73),a(4)),b=a(12),j=a(3),d=a(158),O=a(57),p=a.n(O),h=a(58),m=a.n(h),f=a(59),g=a(159),x=a(156),v=a(157);function C(e){var t=Object(i.useRef)();return Object(i.useEffect)((function(){t.current=e})),t.current}var y=a(13),V=a.n(y);var N=function(e){var t=e.children,a=e.onClick;return Object(n.jsx)("button",{className:"control-button",onClick:a,children:t})},S=a(24);var k=function(e){var t=e.onToggleFiltersModeAnd,a=e.filtersModeAnd,r=e.filtersOptions,c=e.onFiltersChange,o=e.filters,l=Object(i.useState)(!1),s=Object(j.a)(l,2),u=s[0],b=s[1],d=Object(i.useState)(void 0),O=Object(j.a)(d,2),p=O[0],h=O[1],m=[];return p&&r[p].options.forEach((function(e){return m.push(e)})),Object(n.jsxs)("div",{className:"FiltersEditor",children:[Object(n.jsx)("div",{children:Object(n.jsx)("button",{className:u?"is-active":"",onClick:function(){return b(!u)},children:"Filtres ..."})}),u&&Object(n.jsxs)("div",{children:[Object(n.jsxs)(N,{onClick:t,children:["Mode des filtres: ",a?"AND":"OR"]}),o.length?Object(n.jsxs)("div",{children:[Object(n.jsx)("h6",{children:"Filtres existants"}),Object(n.jsx)("ul",{className:"existing-filters",children:o.map((function(e,t){var a=e.attribute,i=e.value;return Object(n.jsxs)("li",{children:[Object(n.jsxs)("div",{children:[a," : ",i]}),Object(n.jsx)("div",{children:Object(n.jsx)("button",{onClick:function(){var e=o.filter((function(e,a){return a!==t}));c(e)},children:"\ud83d\uddd1"})})]},t)}))})]}):null,Object(n.jsxs)("div",{children:[Object(n.jsx)("h6",{children:"Ajouter un nouveau filtre"}),Object(n.jsxs)("select",{value:p||"",onChange:function(e){var t=e.target.value;t.length&&h(t)},children:[Object.entries(r).map((function(e,t){var a=Object(j.a)(e,2),i=a[0],r=a[1].title;return Object(n.jsx)("option",{value:i,children:r},t)})),Object(n.jsx)("option",{value:"",children:"Selectionner"})]}),void 0!==p?Object(n.jsxs)("select",{value:"",onChange:function(e){var t=e.target.value;c([].concat(Object(S.a)(o),[{attribute:p,value:t}])),h(void 0)},children:[m.map((function(e,t){return Object(n.jsx)("option",{value:e,children:e},t)})),Object(n.jsx)("option",{value:"",children:"Selectionner"})]}):null]})]})]})};var T=function(e){var t=e.options,a=e.variables,r=Object(i.useState)(!1),c=Object(j.a)(r,2),o=c[0],l=c[1],s=void 0!==a.find((function(e){return"default"!==e.value&&void 0!==e.value}));return Object(n.jsxs)("div",{className:"FiltersEditor VariablesEditor",children:[Object(n.jsx)("div",{children:Object(n.jsx)("button",{className:o||s?"is-active":"",onClick:function(){return l(!o)},children:"Variables ..."})}),(o||s)&&Object(n.jsx)("div",{children:a.map((function(e,a){var i=e.title,r=e.value,c=e.onChange,o=e.type,l=[{value:"default",title:"D\xe9faut"}].concat(Object(S.a)(function(){switch(o){case"color":case"string":return Object.entries(t);case"boolean":return[["true",{title:"Oui"}],["false",{title:"Non"}]];case"number":default:return Object.entries(t).filter((function(e){var t=Object(j.a)(e,2),a=(t[0],t[1]);return["integer","float"].includes(a.type)}))}}().map((function(e){var t=Object(j.a)(e,2),a=t[0];return{label:t[1].title,value:a}}))));return l.length<=1?null:Object(n.jsxs)("div",{children:[Object(n.jsxs)("h6",{children:[i," "]}),Object(n.jsx)("select",{value:r,onChange:function(e){var t=e.target.value;return c("boolean"===o?"true"===t:t)},children:l.map((function(e){var t=e.value,a=e.label;return Object(n.jsx)("option",{value:t,children:a||"D\xe9faut"},t)}))})]},a)}))})]})};var z=function(e){var t=e.colorPalette;return Object(n.jsx)("ul",{className:"ColorLegend",children:Object.entries(t).map((function(e){var t=Object(j.a)(e,2),a=t[0],i=t[1];return Object(n.jsxs)("li",{children:[Object(n.jsx)("span",{className:"legend-color",style:{background:i}}),Object(n.jsx)("span",{className:"legend-modality",children:a})]},a)}))})};function M(e){var t=e.rescale,a=e.zoomIn,r=e.zoomOut,c=e.searchString,o=void 0===c?"":c,l=e.onSearchStringChange,s=e.filtersModeAnd,b=e.onToggleFiltersModeAnd,d=e.filtersOptions,O=e.filters,p=void 0===O?[]:O,h=e.onFiltersChange,m=e.nodeSizeVariable,f=e.nodeColorVariable,g=e.onNodeSizeVariableChange,x=e.onNodeColorVariableChange,v=e.colorPalette,C=Object(i.useState)(!0),y=Object(j.a)(C,2),S=y[0],M=y[1];return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)("button",{onClick:function(){return M(!S)},className:V()("minify-button",{"is-active":S}),children:">"}),Object(n.jsxs)("ul",{className:V()("VisControls GraphControls",{"is-minified":S}),children:[Object(n.jsxs)("li",{className:"vis-controls-item camera",children:[Object(n.jsx)(N,{onClick:r,children:"-"}),Object(n.jsx)(N,{onClick:a,children:"+"}),Object(n.jsx)(N,{onClick:t,children:"Recentrer"})]}),Object(n.jsx)("li",{className:"vis-controls-item",children:Object(n.jsx)("form",{onSubmit:function(e){return e.preventDefault()},children:Object(n.jsx)("input",{type:"text",onChange:function(e){return l(e.target.value)},placeholder:"rechercher",value:o})})}),Object(n.jsx)("li",{className:"vis-controls-item",children:Object(n.jsx)(T,Object(u.a)({},{options:d,variables:[{title:"Taille des noeuds",onChange:g,value:m,type:"number"},{title:"Couleur des noeuds",value:f,onChange:x,type:"color"}]}))}),f&&"default"!==f?Object(n.jsx)(z,{colorPalette:v}):null,Object(n.jsx)("li",{className:"vis-controls-item",children:Object(n.jsx)(k,Object(u.a)({},{onToggleFiltersModeAnd:b,filtersModeAnd:s,filtersOptions:d,onFiltersChange:h,filters:p}))})]})]})}var P=a(60),D=function(e,t){return"<".concat(e," \n  ").concat(Object.entries(t).filter((function(e){var t=Object(j.a)(e,2),a=(t[0],t[1]);return!(void 0===a||!1===a||""===a||Array.isArray(a)&&!a.length)})).map((function(e){var t=Object(j.a)(e,2),a=t[0],n=t[1];return"".concat(a,"={").concat(function(e){return"string"===typeof e?"'".concat(e,"'"):"object"===typeof e?JSON.stringify(e):e}(n),"}")})).join(" \n  ").trim(),"\n/>")},R=function(e){return D("GraphBlock",e)},A=function(e){return D("IceCreamBlock",e)},F=function(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),n=1;n<t;n++)a[n-1]=arguments[n];switch(e){case"table":return w.apply(void 0,a);case"graph":default:return B.apply(void 0,a)}},w=function(e){return e.columns.reduce((function(t,a){var n=Object(P.uniq)(e.map((function(e){return e[a]}))),i="string";n.find((function(e){return isNaN(+e)}))||(i=n.find((function(e){return!Number.isInteger(+e)}))?"float":"integer");var r={id:a,title:a,type:i,options:n};return["float","integer"].includes(i)&&(r.options=r.options.map((function(e){return+e})),r.min=Object(x.a)(r.options),r.max=Object(v.a)(r.options)),Object(u.a)(Object(u.a)({},t),{},Object(b.a)({},a,r))}),{})},B=function(e,t){var a=(new DOMParser).parseFromString(t,"application/xml").querySelectorAll("attributes.node attribute"),n=[],i=["weight"];return a.forEach((function(e){var t=e.getAttribute("id");if(!i.includes(t)){var a=e.getAttribute("title"),r=e.getAttribute("type");n.push({id:t,title:a,type:r,options:new Set})}})),e.forEachNode((function(e,t){n.forEach((function(e){e.options.has(t[e.id])||e.options.add(t[e.id])}))})),n.reduce((function(e,t){return Object(u.a)(Object(u.a)({},e),{},Object(b.a)({},t.id,t))}),{})},G="#999",L=[2,15];var I=a(61),X=a.n(I),q={cmin:25.59,cmax:55.59,lmin:60.94,lmax:90.94},E=["#999"];function U(e,t){return 1===t?E:X()(t,{colorSpace:q,seed:e,clustering:"force-vector"})}a(117);var Y=Object(g.a)().domain([0,1]).range([200,10]),_=Object(g.a)().domain([0,1]).range([300,30]);function J(e){e.getCamera().animatedReset(e)}function Q(e){e.getCamera().animatedZoom(e)}function W(e){e.getCamera().animatedUnzoom(e)}var Z=function(e){var t=e.graph,a=e.nodeLabel,r=e.labelDensity,c=e.extents,o=e.searchString,l=void 0===o?"":o,s=e.onSearchStringChange,b=e.filtersModeAnd,d=e.onToggleFiltersModeAnd,O=e.filtersOptions,p=void 0===O?{}:O,h=e.filters,m=void 0===h?[]:h,y=e.onFiltersChange,V=e.onCameraUpdate,N=e.cameraPosition,S=e.updateTimestamp,k=e.nodeSizeVariable,T=e.nodeColorVariable,z=e.onNodeSizeVariableChange,P=e.onNodeColorVariableChange,D=Object(i.useMemo)((function(){if(k&&"default"!==k&&p[k]){var e=Array.from(p[k].options);return{min:Object(x.a)(e),max:Object(v.a)(e),name:k}}}),[k]),R=Object(i.useMemo)((function(){if(T&&"default"!==T&&p[T]){var e=U(T,p[T].options.size),t={},a=0;return p[T].options.forEach((function(n){t[n]=e[a],a++})),{palette:t,name:T}}}),[T]),A=C(R),F=C(D),w=C(r),B=C(l),I=C(m),X=function(e){var t=e.nodeColor,a=e.nodeSize,n=e.nodeLabel,i=e.nodeSizeFactor,r=void 0===i?1:i,c=e.extents,o=e.filters,l=void 0===o?[]:o,s=e.filtersModeAnd,u=null;return u=a?Object(g.a)().domain([a.min,a.max]).range(L):Object(g.a)().domain([c.nodeSize.min,c.nodeSize.max]).range(L),function(e,i){var c={x:i.x,y:i.y};if(c.color=t?t.palette[i[t.name]]||G:i.color||G,a){var o=i[a.name];o="number"===typeof o?o:1,c.size=u(o)}else{var b=i.size||1;c.size=u(b)}return c.size*=r,c.label=n?i[n.name]||"<no-label>":i.label||e,c.hidden=!!l.length&&!function(e,t,a){return a?!(void 0!==t.find((function(t){var a=t.attribute,n=t.value;return e[a]!==""+n}))):void 0!==t.find((function(t){var a=t.attribute,n=t.value;return e[a]===""+n}))}(i,l,s),c}}({nodeColor:R,nodeSize:D,nodeLabel:a,extents:c,filters:m,filtersModeAnd:b}),q=Object(i.useRef)(null),E=Object(i.useState)(null),Z=Object(j.a)(E,2),H=Z[0],K=Z[1];if(Object(i.useEffect)((function(){N&&H&&H.getCamera().animate(N)}),[S]),H){var $=!1;A===R&&F===D&&I===m||(H.settings.nodeReducer=X,$=!0),w!==r&&(H.settings.labelGrid.cell={width:_(r),height:Y(r)},H.displayedLabels=new Set,$=!0),B!==l&&(l.length>=3?t.forEachNode((function(e,t){t.label.toLowerCase().includes(l.toLowerCase())?H.highlightNode(e):H.unhighlightNode(e)})):H.highlightedNodes.size>0&&(H.highlightedNodes=new Set)),$&&H.refresh()}var ee=Object(i.useCallback)((function(e){if(H&&H.graph!==t&&(H.kill(),K(null)),e&&t){var a=new f.WebGLRenderer(t,e,{nodeReducer:X});K(a);var n=a.getCamera();V(n.getState()),n.on("updated",(function(e){V(e)}))}q.current=e}),[t]);return Object(n.jsxs)("div",{className:"VisContainer GraphContainer",children:[Object(n.jsx)("div",{ref:ee,style:{width:"100%",height:"100%"}}),H&&Object(n.jsx)(M,Object(u.a)({rescale:J.bind(null,H),zoomIn:Q.bind(null,H),zoomOut:W.bind(null,H)},{searchString:l,onSearchStringChange:s,filtersModeAnd:b,onToggleFiltersModeAnd:d,filtersOptions:p,filters:m,onFiltersChange:y,nodeSizeVariable:k,nodeColorVariable:T,onNodeSizeVariableChange:z,onNodeColorVariableChange:P,colorPalette:R&&R.palette}))]})},H=r.a.createContext({}),K=function(e){var t=e.Content,a=e.gexfData,r=e.contentsURL,c=Object(i.useMemo)((function(){return p.a.parse(m.a,a)}),[a]),o=Object(i.useMemo)((function(){return F("graph",c,a)}),[c,a]),l=Object(i.useState)(void 0),s=Object(j.a)(l,2),O=s[0],h=s[1],f=Object(i.useState)(!1),g=Object(j.a)(f,2),x=g[0],v=g[1],C=Object(i.useState)(""),y=Object(j.a)(C,2),V=y[0],N=y[1],S=Object(i.useState)(!1),k=Object(j.a)(S,2),T=k[0],z=k[1],M=Object(i.useState)((new Date).getTime()),P=Object(j.a)(M,2),D=P[0],R=P[1],A=Object(i.useState)([]),w=Object(j.a)(A,2),B=w[0],G=w[1],L=Object(i.useState)(void 0),I=Object(j.a)(L,2),X=I[0],q=I[1],E=Object(i.useState)(void 0),U=Object(j.a)(E,2),Y=U[0],_=U[1],J=Object(i.useState)(null),Q=Object(j.a)(J,2),W=Q[0],K=Q[1],$=Object(i.useState)({}),ee=Object(j.a)($,2),te=ee[0],ae=ee[1];Object(i.useEffect)((function(){if(!W&&Object.keys(te).length){var e=Object.keys(te)[0];K(e)}}),[te,W]);var ne=[];c.forEachNode((function(e,t){ne.push(t.size)}));var ie=Object(d.a)(ne);return Object(n.jsx)(H.Provider,{value:{onVisualizationUpdate:function(e){var t=e.x,a=e.y,n=e.ratio,i=e.searchString,r=e.filtersModeAnd,c=e.filters,o=e.nodeColorVariable,l=e.nodeSizeVariable;h({x:t,y:a,ratio:n}),R((new Date).getTime()),N(i),z(r),G(c),q(o),_(l)},onRegisterVisualization:function(e,t){ae(Object(u.a)(Object(u.a)({},te),{},Object(b.a)({},e,t)))},onUnregisterVisualization:function(e){var t=Object(u.a)({},te);delete t[e],ae(t)},focusedVisualizationId:W,setFocusedVisualizationId:K,visualizationParams:Object(u.a)(Object(u.a)({},O),{},{searchString:V,filters:B,nodeSizeVariable:Y,nodeColorVariable:X,filtersModeAnd:T})},children:Object(n.jsxs)("div",{className:"slide-container",children:[Object(n.jsxs)("section",{children:[Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{children:Object(n.jsx)("button",{className:x?"is-active":"",onClick:function(){return v(!x)},children:"Comment modifier cette page ?"})}),Object(n.jsxs)("ol",{className:"edit-help ".concat(x?"is-active":""),children:[Object(n.jsx)("li",{children:"Pr\xe9alablement se logger dans github si le r\xe9pertoire est priv\xe9"}),Object(n.jsxs)("li",{children:["Se rendre sur ",Object(n.jsx)("a",{target:"blank",href:r,children:"cette page du r\xe9pertoire github"})]}),Object(n.jsx)("li",{children:'Cliquer sur le crayon en haut \xe0 droite des contenus (il affiche "edit" au survol)'}),Object(n.jsx)("li",{children:'Faire les modifications puis cliquer sur "Commit changes" en bas de la page'}),Object(n.jsx)("li",{children:"Attendre 2 minutes puis recharger la page pour voir la version \xe0 jour de la page"})]})]}),Object(n.jsx)(t,{})]}),Object(n.jsx)("aside",{children:Object(n.jsx)("div",{className:"vis",children:Object(n.jsx)(Z,Object(u.a)({},{graph:c,searchString:V,filtersOptions:o,filters:B,cameraPosition:O,onCameraUpdate:function(e){var t=e.x,a=e.y,n=e.ratio;h({x:t,y:a,ratio:n})},updateTimestamp:D,nodeSizeVariable:Y,nodeColorVariable:X,filtersModeAnd:T,onSearchStringChange:function(e){N(e)},onToggleFiltersModeAnd:function(){return z(!T)},onFiltersChange:function(e){return G(e)},onNodeSizeVariableChange:function(e){return _(e)},onNodeColorVariableChange:function(e){return q(e)},extents:{nodeSize:{min:ie[0],max:ie[1]}}}))})})]})})},$=a(62),ee=a.n($),te=a(161),ae=function(e){var t=e.percentsLoaded,a=void 0===t?0:t;return Object(n.jsx)("div",{className:"loader-container",children:Object(n.jsx)("div",{className:"loader",children:Object(n.jsx)("div",{className:"loading-bar",style:{width:a+"%"}})})})},ne=function(e){var t=e.url,a=e.children,r=Object(i.useState)(null),c=Object(j.a)(r,2),o=c[0],l=c[1],s=Object(i.useState)(0),u=Object(j.a)(s,2),b=u[0],d=u[1];return Object(i.useEffect)((function(){ee.a.get(t,{onDownloadProgress:function(e){var t=e.loaded/e.total;d(t)}}).then((function(e){var a=e.data;setTimeout((function(){var e=a;"csv"===t.split(".").pop()&&(e=Object(te.a)(a)),l(e)}))}))}),[t]),o?a(o):Object(n.jsx)(ae,{percentsLoaded:100*b})},ie=a(23),re=a(25),ce=a(2),oe=a(160),le=function(e){var t=Object(i.useContext)(H),a=t.onVisualizationUpdate,r=t.focusedVisualizationId,c=t.onRegisterVisualization,o=t.onUnregisterVisualization,l=t.setFocusedVisualizationId,s=t.visualizationParams,b=Object(i.useState)(null),d=Object(j.a)(b,2),O=d[0],p=d[1],h=Object(i.useState)(!1),m=Object(j.a)(h,2),f=m[0],g=m[1];Object(i.useEffect)((function(){var t=Object(oe.a)();return setTimeout((function(){return c(t,Object(u.a)({},e))})),p(t),o(O)}),["id","inputProps","onRegisterVisualization","onUnregisterVisualization"]);var x=r===O,v=x?s:e;return Object(n.jsxs)("div",{onClick:function(){a(e),setTimeout((function(){return l(O)}))},className:V()("VisualizationBlock GraphBlock",{"is-focused":x}),children:[Object(n.jsx)("pre",{children:Object(n.jsx)("code",{children:R(v)})}),Object(n.jsxs)("div",{className:"buttons-container",children:[Object(n.jsx)("button",{onClick:function(){a(e)},children:"R\xe9initialiser sur les param\xe8tres du fichier"}),Object(n.jsx)("button",{onClick:function(e){e.preventDefault(),e.stopPropagation(),navigator.clipboard.writeText(R(v)),g(!0),setTimeout((function(){return g(!1)}),1e3)},children:f?"Copi\xe9 dans le presse-papier !":"Copier le code actuel"})]})]})},se={};function ue(e){var t=e.components,a=Object(re.a)(e,["components"]);return Object(ce.a)("wrapper",Object.assign({},se,a,{components:t,mdxType:"MDXLayout"}),Object(ce.a)("h1",{id:"graphe-des-critiques-anglophones"},"Graphe des critiques anglophones"),Object(ce.a)("h2",{id:"quest-ce-quon-regarde"},"Qu\u2019est-ce qu\u2019on regarde"),Object(ce.a)("p",null,"2,991 noeuds et 54,062 arcs"),Object(ce.a)("p",null,"Densit\xe9: ~0.0121."),Object(ce.a)("p",null,"Carte d\u2019identit\xe9 des attributs de noeuds disponibles :"),Object(ce.a)("ul",null,Object(ce.a)("li",{parentName:"ul"},Object(ce.a)("inlineCode",{parentName:"li"},"label_copy")," : ",Object(ce.a)("inlineCode",{parentName:"li"},"TODO")),Object(ce.a)("li",{parentName:"ul"},Object(ce.a)("inlineCode",{parentName:"li"},"technical")," : ",Object(ce.a)("inlineCode",{parentName:"li"},"TODO")),Object(ce.a)("li",{parentName:"ul"},Object(ce.a)("inlineCode",{parentName:"li"},"company")," : ",Object(ce.a)("inlineCode",{parentName:"li"},"TODO")),Object(ce.a)("li",{parentName:"ul"},Object(ce.a)("inlineCode",{parentName:"li"},"fiction")," : ",Object(ce.a)("inlineCode",{parentName:"li"},"TODO")),Object(ce.a)("li",{parentName:"ul"},Object(ce.a)("inlineCode",{parentName:"li"},"person")," : ",Object(ce.a)("inlineCode",{parentName:"li"},"TODO")),Object(ce.a)("li",{parentName:"ul"},Object(ce.a)("inlineCode",{parentName:"li"},"people")," : ",Object(ce.a)("inlineCode",{parentName:"li"},"TODO")),Object(ce.a)("li",{parentName:"ul"},Object(ce.a)("inlineCode",{parentName:"li"},"institution")," : ",Object(ce.a)("inlineCode",{parentName:"li"},"TODO")),Object(ce.a)("li",{parentName:"ul"},Object(ce.a)("inlineCode",{parentName:"li"},"locality")," : ",Object(ce.a)("inlineCode",{parentName:"li"},"TODO")),Object(ce.a)("li",{parentName:"ul"},Object(ce.a)("inlineCode",{parentName:"li"},"data_inout")," : ",Object(ce.a)("inlineCode",{parentName:"li"},"TODO")),Object(ce.a)("li",{parentName:"ul"},Object(ce.a)("inlineCode",{parentName:"li"},"topic")," : ",Object(ce.a)("inlineCode",{parentName:"li"},"TODO")),Object(ce.a)("li",{parentName:"ul"},Object(ce.a)("inlineCode",{parentName:"li"},"issue")," : ",Object(ce.a)("inlineCode",{parentName:"li"},"TODO")),Object(ce.a)("li",{parentName:"ul"},Object(ce.a)("inlineCode",{parentName:"li"},"cluster_rename")," : ",Object(ce.a)("inlineCode",{parentName:"li"},"TODO")),Object(ce.a)("li",{parentName:"ul"},Object(ce.a)("inlineCode",{parentName:"li"},"algo_robot")," : ",Object(ce.a)("inlineCode",{parentName:"li"},"TODO")),Object(ce.a)("li",{parentName:"ul"},Object(ce.a)("inlineCode",{parentName:"li"},"nc term")," : ",Object(ce.a)("inlineCode",{parentName:"li"},"TODO")),Object(ce.a)("li",{parentName:"ul"},Object(ce.a)("inlineCode",{parentName:"li"},"tag_entity")," : ",Object(ce.a)("inlineCode",{parentName:"li"},"TODO"))),Object(ce.a)("p",null,"Vue du r\xe9seau dans son ensemble :"),Object(ce.a)(le,{x:.5,y:.5,ratio:1,mdxType:"GraphBlock"}),Object(ce.a)("h1",{id:"les-deux-continents"},"Les deux continents"),Object(ce.a)("p",null,"Ci-dessous deux vues filtr\xe9es avec l\u2019attribut algo_robot"),Object(ce.a)("p",null,"Note technique : les labels des \xe9l\xe9ments filtr\xe9s s\u2019affichent parfois, cela devrait \xeatre r\xe9gl\xe9 dans une version ult\xe9rieur de sigma 2."),Object(ce.a)("p",null,'Le continent "algo":'),Object(ce.a)(le,{x:.5,y:.5,ratio:1,filters:[{attribute:"algo_robot",value:"Algo"}],mdxType:"GraphBlock"}),Object(ce.a)("p",null,"Le continent \u201crobots\u201d :"),Object(ce.a)(le,{x:.5,y:.5,ratio:1,filters:[{attribute:"algo_robot",value:"Robot"}],mdxType:"GraphBlock"}),Object(ce.a)("p",null,"Ou alors en les colorant :"),Object(ce.a)(le,{x:.5,y:.5,ratio:1,nodeColorVariable:"algo_robot",mdxType:"GraphBlock"}),Object(ce.a)("h1",{id:"analyse-de-la-r\xe9partition-des-autres-attributs"},"Analyse de la r\xe9partition des autres attributs"),Object(ce.a)("p",null,"Par ",Object(ce.a)("inlineCode",{parentName:"p"},"cluster_rename")," :"),Object(ce.a)(le,{x:.5,y:.5,ratio:1,nodeColorVariable:"cluster_rename",mdxType:"GraphBlock"}),Object(ce.a)("p",null,"Par ",Object(ce.a)("inlineCode",{parentName:"p"},"topic")," :"),Object(ce.a)(le,{x:.5,y:.5,ratio:1,nodeColorVariable:"topic",mdxType:"GraphBlock"}),Object(ce.a)("p",null,"Par ",Object(ce.a)("inlineCode",{parentName:"p"},"issue")," :"),Object(ce.a)(le,{x:.5,y:.5,ratio:1,nodeColorVariable:"issue",mdxType:"GraphBlock"}),Object(ce.a)("p",null,"Par ",Object(ce.a)("inlineCode",{parentName:"p"},"technical")," :"),Object(ce.a)(le,{x:.5,y:.5,ratio:1,nodeColorVariable:"technical",mdxType:"GraphBlock"}),Object(ce.a)("p",null,"Par ",Object(ce.a)("inlineCode",{parentName:"p"},"company")," :"),Object(ce.a)(le,{x:.5,y:.5,ratio:1,nodeColorVariable:"company",mdxType:"GraphBlock"}),Object(ce.a)("p",null,"Par ",Object(ce.a)("inlineCode",{parentName:"p"},"fiction")," :"),Object(ce.a)(le,{x:.5,y:.5,ratio:1,nodeColorVariable:"fiction",mdxType:"GraphBlock"}),Object(ce.a)("p",null,"Par ",Object(ce.a)("inlineCode",{parentName:"p"},"person")," :"),Object(ce.a)(le,{x:.5,y:.5,ratio:1,nodeColorVariable:"person",mdxType:"GraphBlock"}),Object(ce.a)("p",null,"Par ",Object(ce.a)("inlineCode",{parentName:"p"},"people")," :"),Object(ce.a)(le,{x:.5,y:.5,ratio:1,nodeColorVariable:"people",mdxType:"GraphBlock"}),Object(ce.a)("p",null,"Par ",Object(ce.a)("inlineCode",{parentName:"p"},"institution")," :"),Object(ce.a)(le,{x:.5,y:.5,ratio:1,nodeColorVariable:"institution",mdxType:"GraphBlock"}),Object(ce.a)("p",null,"Par ",Object(ce.a)("inlineCode",{parentName:"p"},"locality")," :"),Object(ce.a)(le,{x:.5,y:.5,ratio:1,nodeColorVariable:"locality",mdxType:"GraphBlock"}),Object(ce.a)("p",null,"Par ",Object(ce.a)("inlineCode",{parentName:"p"},"data_inout")," :"),Object(ce.a)(le,{x:.5,y:.5,ratio:1,nodeColorVariable:"data_inout",mdxType:"GraphBlock"}),Object(ce.a)("p",null,"Par ",Object(ce.a)("inlineCode",{parentName:"p"},"nc term")," :"),Object(ce.a)(le,{x:.5,y:.5,ratio:1,nodeColorVariable:"nc term",mdxType:"GraphBlock"}),Object(ce.a)("p",null,"Par ",Object(ce.a)("inlineCode",{parentName:"p"},"tag_entity")," :"),Object(ce.a)(le,{x:.5,y:.5,ratio:1,nodeColorVariable:"tag_entity",mdxType:"GraphBlock"}),Object(ce.a)("h2",{id:"plus-loin-dans-lenqu\xeate"},"Plus loin dans l\u2019enqu\xeate"),Object(ce.a)("p",null,"R\xe9sultat d\u2019une recherche du terme \u201crobot\u201d :"),Object(ce.a)(le,{x:.5,y:.5,ratio:1,searchString:"robot",mdxType:"GraphBlock"}))}ue.isMDXComponent=!0;var be="".concat(ie.a,"/blob/main/src/slides/GraphCritic"),je="".concat(be,"/contents.mdx"),de=function(){return Object(n.jsx)(ne,{url:"".concat("/carnet-algopresse","/Graph Critic EN layers rotation edgesunweight V2.gexf"),children:function(e){return Object(n.jsx)(K,Object(u.a)({},{contentsURL:je,Content:ue,gexfData:e}))}})},Oe=a(63),pe=a.n(Oe);function he(e){var t=e.xVariable,a=e.reverseX,r=e.yVariable,c=e.reverseY,o=e.sizeVariable,l=e.colorVariable,s=e.labelVariable,b=e.rotateMode,d=e.searchString,O=e.onSearchStringChange,p=e.onToggleRotateMode,h=e.onXVariableChange,m=e.onYVariableChange,f=e.onColorVariableChange,g=e.onSizeVariableChange,x=e.onLabelVariableChange,v=e.onToggleReverseX,C=e.onToggleReverseY,y=e.filtersOptions,N=e.colorPalette,S=Object(i.useState)(!0),k=Object(j.a)(S,2),M=k[0],P=k[1];return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)("button",{onClick:function(){return P(!M)},className:V()("minify-button",{"is-active":M}),children:">"}),Object(n.jsxs)("ul",{className:V()("GraphControls",{"is-minified":M}),children:[Object(n.jsx)("li",{className:"vis-controls-item",children:Object(n.jsx)("form",{onSubmit:function(e){return e.preventDefault()},children:Object(n.jsx)("input",{type:"text",onChange:function(e){return O(e.target.value)},placeholder:"rechercher",value:d})})}),Object(n.jsx)("li",{className:"vis-controls-item",children:Object(n.jsx)(T,Object(u.a)({},{options:y,variables:[{title:"X des points",onChange:h,value:t,type:"number"},{title:"Inverser les x",onChange:v,value:a,type:"boolean"},{title:"Y des points",onChange:m,value:r,type:"number"},{title:"Inverser les x",onChange:C,value:c,type:"boolean"},{title:"Taille des points",onChange:g,value:o,type:"number"},{title:"Couleur des points",onChange:f,value:l,type:"color"},{title:"Labels des points",onChange:x,value:s,type:"string"},{title:"Tourner la visualisation \xe0 45\xb0",onChange:p,value:b,type:"boolean"}]}))}),l&&"default"!==l?Object(n.jsx)(z,{colorPalette:N}):null]})]})}a(149);function me(e){var t=e.width,a=e.height,i=e.data,r=e.xVariable,c=e.reverseX,o=e.yVariable,l=e.reverseY,s=e.sizeVariable,j=e.colorVariable,O=e.labelVariable,p=e.rotateMode,h=e.searchString,m=void 0===h?"":h,f=e.onSearchStringChange,v=e.onToggleRotateMode,C=e.onXVariableChange,y=e.onYVariableChange,V=e.onColorVariableChange,N=e.onSizeVariableChange,S=e.onLabelVariableChange,k=e.onToggleReverseX,T=e.onToggleReverseY,z=e.filtersOptions,M=void 0===z?{}:z,P=Object(x.a)([t,a]),D=P,R=P,A=P/100,F=P/50,w=P/10,B=[w,D-2*w],G=[w,R-w];c&&(B=B.reverse()),l&&(G=G.reverse());var L,I,X=r&&"default"!==r?Object(g.a)().range(B).domain(Object(d.a)(i.map((function(e){return+e[r]})))):function(){return 0},q=o&&"default"!==o?Object(g.a)().range(G).domain(Object(d.a)(i.map((function(e){return+e[o]})))):function(){return 0},E=s&&"default"!==s?Object(g.a)().domain(Object(d.a)(i.map((function(e){return+e[s]})))).range([A,F]):function(){return 0},Y=j&&"default"!==j?U(j,M[j].options.length):void 0,_=function(){return"grey"};return Y&&(L=M[j].options.reduce((function(e,t,a){return Object(u.a)(Object(u.a)({},e),{},Object(b.a)({},t,Y[a]))}),{}),_=function(e){return L[e]}),m.length&&O&&(I=new Set,i.forEach((function(e,t){e[O].toLowerCase().includes(m)&&I.add(t)}))),Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)("svg",{className:"scatterplot",width:D,height:R,transform:p?"rotate(-45)":"",children:Object(n.jsxs)("g",{transform:"translate(".concat(D/20,", 0)scale(.9)"),children:[Object(n.jsxs)("g",{className:"axis axis-left",children:[Object(n.jsx)("line",{x1:w,x2:w,y1:w,y2:R-w,stroke:"black"}),q.ticks&&q.ticks().map((function(e){var t=q(e);return Object(n.jsxs)("g",{transform:"translate(0, ".concat(t,")"),children:[Object(n.jsx)("text",{transform:p?"rotate(45)translate(".concat(w/4,", ").concat(-w/3,")"):"",children:e}),Object(n.jsx)("line",{x1:.8*w,x2:w,y1:0,y2:0,stroke:"black"})]},e)})),Object(n.jsx)("text",{className:"axis-variable-name",x:0,y:w/2-2,transform:p?"rotate(90)translate(".concat(.5*(R-w),", ").concat(.7*-w,")"):"",children:o})]}),Object(n.jsxs)("g",{className:"axis axis-bottom",children:[Object(n.jsx)("line",{x1:w,x2:D-2*w,y1:R-w,y2:R-w,stroke:"black"}),X.ticks&&X.ticks().map((function(e){var t=X(e);return Object(n.jsxs)("g",{transform:"translate(".concat(t,", ").concat(R,")"),children:[Object(n.jsx)("text",{y:-w/3,transform:p?"rotate(45)translate(".concat(.4*-w,", 0)"):"",children:e}),Object(n.jsx)("line",{x1:0,x2:0,y1:-w,y2:.8*-w,stroke:"black"})]},e)})),Object(n.jsx)("text",{className:"axis-variable-name",x:D-1.5*w,y:R-w/3-2,transform:p?"translate(".concat(-(D-w)/2,", ").concat(w/3,")"):"",children:r})]}),Object(n.jsxs)("g",{className:"ticks-container",children:[q.ticks&&q.ticks().map((function(e){return Object(n.jsx)("line",{x1:w,x2:D-w,y1:q(e),y2:q(e),stroke:"lightgrey"},e)})),X.ticks&&X.ticks().map((function(e){return Object(n.jsx)("line",{y1:w,y2:D-w,x1:q(e),x2:q(e),stroke:"lightgrey"},e)}))]}),Object(n.jsx)("g",{className:"plot-objects-container",children:i.map((function(e,t){return Object(n.jsxs)("g",{className:"plot-object",transform:"translate(".concat(X(e[r]),", ").concat(q(e[o]),")"),opacity:!I||I.has(t)?1:.2,children:[Object(n.jsx)("circle",{r:E(e[s]),fill:_(e[j]),opacity:.8}),Object(n.jsx)("text",{x:E(e[s])+P/100,children:e[O]})]},t)}))})]})}),Object(n.jsx)(he,Object(u.a)({},{xVariable:r,yVariable:o,reverseX:c,reverseY:l,sizeVariable:s,colorVariable:j,labelVariable:O,rotateMode:p,searchString:m,onSearchStringChange:f,onToggleRotateMode:v,onXVariableChange:C,onYVariableChange:y,onColorVariableChange:V,onSizeVariableChange:N,onLabelVariableChange:S,onToggleReverseX:k,onToggleReverseY:T,filtersOptions:M,colorPalette:L}))]})}var fe=function(e){return Object(n.jsx)("div",{className:"VisContainer IcecreamContainer",children:Object(n.jsx)(pe.a,{children:function(t){return Object(n.jsx)(me,Object(u.a)({},Object(u.a)(Object(u.a)({},e),t)))}})})},ge=function(e){var t=e.Content,a=e.data,r=e.contentsURL,c=Object(i.useMemo)((function(){return F("table",a)}),[a]),o=Object(i.useState)(!1),l=Object(j.a)(o,2),s=l[0],d=l[1],O=Object(i.useState)(""),p=Object(j.a)(O,2),h=p[0],m=p[1],f=Object(i.useState)(void 0),g=Object(j.a)(f,2),x=g[0],v=g[1],C=Object(i.useState)(void 0),y=Object(j.a)(C,2),V=y[0],N=y[1],S=Object(i.useState)(!1),k=Object(j.a)(S,2),T=k[0],z=k[1],M=Object(i.useState)(!1),P=Object(j.a)(M,2),D=P[0],R=P[1],A=Object(i.useState)(void 0),w=Object(j.a)(A,2),B=w[0],G=w[1],L=Object(i.useState)(void 0),I=Object(j.a)(L,2),X=I[0],q=I[1],E=Object(i.useState)(void 0),U=Object(j.a)(E,2),Y=U[0],_=U[1],J=Object(i.useState)(!1),Q=Object(j.a)(J,2),W=Q[0],Z=Q[1],K=Object(i.useState)(null),$=Object(j.a)(K,2),ee=$[0],te=$[1],ae=Object(i.useState)({}),ne=Object(j.a)(ae,2),ie=ne[0],re=ne[1],ce=function(e){var t=e.xVariable,a=e.yVariable,n=e.reverseX,i=e.reverseY,r=e.sizeVariable,c=e.colorVariable,o=e.labelVariable,l=e.rotateMode,s=e.searchString;v(t),N(a),z(n),R(i),G(r),q(c),_(o),Z(l),m(s)};Object(i.useEffect)((function(){if(!ee&&Object.keys(ie).length){var e=Object.keys(ie)[0];te(e),ce(ie[e])}}),[ie,ee]);return Object(n.jsx)(H.Provider,{value:{onVisualizationUpdate:ce,onRegisterVisualization:function(e,t){re(Object(u.a)(Object(u.a)({},ie),{},Object(b.a)({},e,t)))},onUnregisterVisualization:function(e){var t=Object(u.a)({},ie);delete t[e],re(t)},focusedVisualizationId:ee,setFocusedVisualizationId:te,visualizationParams:{xVariable:x,yVariable:V,reverseX:T,reverseY:D,sizeVariable:B,colorVariable:X,labelVariable:Y,rotateMode:W,searchString:h}},children:Object(n.jsxs)("div",{className:"slide-container",children:[Object(n.jsxs)("section",{children:[Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{children:Object(n.jsx)("button",{className:s?"is-active":"",onClick:function(){return d(!s)},children:"Comment modifier cette page ?"})}),Object(n.jsxs)("ol",{className:"edit-help ".concat(s?"is-active":""),children:[Object(n.jsx)("li",{children:"Pr\xe9alablement se logger dans github si le r\xe9pertoire est priv\xe9"}),Object(n.jsxs)("li",{children:["Se rendre sur ",Object(n.jsx)("a",{target:"blank",href:r,children:"cette page du r\xe9pertoire github"})]}),Object(n.jsx)("li",{children:'Cliquer sur le crayon en haut \xe0 droite des contenus (il affiche "edit" au survol)'}),Object(n.jsx)("li",{children:'Faire les modifications puis cliquer sur "Commit changes" en bas de la page'}),Object(n.jsx)("li",{children:"Attendre 2 minutes puis recharger la page pour voir la version \xe0 jour de la page"})]})]}),Object(n.jsx)(t,{})]}),Object(n.jsx)("aside",{children:Object(n.jsx)("div",{className:"vis",children:Object(n.jsx)(fe,Object(u.a)({},{data:a,filtersOptions:c,xVariable:x,reverseX:T,yVariable:V,reverseY:D,sizeVariable:B,colorVariable:X,labelVariable:Y,rotateMode:W,searchString:h,onSearchStringChange:function(e){m(e)},onToggleRotateMode:function(){return Z(!W)},onXVariableChange:function(e){return v(e)},onYVariableChange:function(e){return N(e)},onToggleReverseX:function(){return z(!T)},onToggleReverseY:function(){return R(!D)},onColorVariableChange:function(e){return q(e)},onSizeVariableChange:function(e){return G(e)},onLabelVariableChange:function(e){return _(e)}}))})})]})})},xe=function(e){var t=Object(i.useContext)(H),a=t.onVisualizationUpdate,r=t.focusedVisualizationId,c=t.onRegisterVisualization,o=t.onUnregisterVisualization,l=t.setFocusedVisualizationId,s=t.visualizationParams,b=Object(i.useState)(null),d=Object(j.a)(b,2),O=d[0],p=d[1],h=Object(i.useState)(!1),m=Object(j.a)(h,2),f=m[0],g=m[1];Object(i.useEffect)((function(){var t=Object(oe.a)();return setTimeout((function(){return c(t,Object(u.a)({},e))})),p(t),o(O)}),["id","inputProps","onRegisterVisualization","onUnregisterVisualization"]);var x=r===O,v=x?s:e;return Object(n.jsxs)("div",{onClick:function(){a(e),setTimeout((function(){return l(O)}))},className:V()("VisualizationBlock IcecreamBlock",{"is-focused":x}),children:[Object(n.jsx)("pre",{children:Object(n.jsx)("code",{children:A(v)})}),Object(n.jsxs)("div",{className:"buttons-container",children:[Object(n.jsx)("button",{onClick:function(){a(e)},children:"R\xe9initialiser sur les param\xe8tres du fichier"}),Object(n.jsx)("button",{onClick:function(e){e.preventDefault(),e.stopPropagation(),navigator.clipboard.writeText(A(v)),g(!0),setTimeout((function(){return g(!1)}),1e3)},children:f?"Copi\xe9 dans le presse-papier !":"Copier le code actuel"})]})]})},ve={};function Ce(e){var t=e.components,a=Object(re.a)(e,["components"]);return Object(ce.a)("wrapper",Object.assign({},ve,a,{components:t,mdxType:"MDXLayout"}),Object(ce.a)("h1",{id:"mentions-de-dates"},"Mentions de dates"),Object(ce.a)("p",null,'Visualisation du scatterplot renvers\xe9 (mode "icecream") :'),Object(ce.a)(xe,{xVariable:"robots",yVariable:"algorithms",sizeVariable:"frequency",labelVariable:"entity",reverseX:"true",rotateMode:!0,mdxType:"IceCreamBlock"}),Object(ce.a)("p",null,"Rajout de couleurs (pas pertinent en l\u2019\xe9tat) : "),Object(ce.a)(xe,{xVariable:"robots",yVariable:"algorithms",sizeVariable:"frequency",labelVariable:"entity",reverseX:"true",rotateMode:!0,colorVariable:"entity",mdxType:"IceCreamBlock"}),Object(ce.a)("p",null,"Avec une recherche plein texte de \u201cresearch year\u201d : "),Object(ce.a)(xe,{xVariable:"robots",yVariable:"algorithms",sizeVariable:"frequency",labelVariable:"entity",reverseX:"true",rotateMode:!0,colorVariable:"entity",searchString:"recent years",mdxType:"IceCreamBlock"}),Object(ce.a)("p",null,"Visualisation plus classique du scatterplot :"),Object(ce.a)(xe,{xVariable:"robots",yVariable:"algorithms",sizeVariable:"frequency",labelVariable:"entity",reverseX:"true",mdxType:"IceCreamBlock"}))}Ce.isMDXComponent=!0;var ye="".concat(ie.a,"/blob/main/src/slides/DatesAnalysis"),Ve="".concat(ye,"/contents.mdx"),Ne=function(){return Object(n.jsx)(ne,{url:"".concat("/carnet-algopresse","/dates-with-freq.csv"),children:function(e){return Object(n.jsx)(ge,Object(u.a)({},{contentsURL:Ve,Content:Ce,data:e}))}})},Se=function(){return Object(n.jsxs)("div",{children:[Object(n.jsx)("h1",{children:"Carnet algopresse"}),Object(n.jsx)("p",{children:"Ce site est d\xe9di\xe9 \xe0 l'\xe9chaffaudage collectif de la publication algopresse. Il sert de point de rencontre entre l'\xe9criture, la conception graphique et la conception interactive. Il fonctionne en tandem avec le r\xe9pertoire github dont il est issu."})]})},ke=[{title:"Graphe des critiques anglophones",route:"/graph-critic-en",Component:function(){return Object(n.jsx)(de,{})}},{title:"Analyse des dates",route:"/dates-analysis",Component:function(){return Object(n.jsx)(Ne,{})}}];function Te(){return Object(n.jsx)(l.a,{children:Object(n.jsxs)("div",{id:"wrapper",children:[Object(n.jsx)("nav",{children:Object(n.jsxs)("ul",{children:[Object(n.jsx)("li",{children:Object(n.jsx)(l.b,{to:"/",children:"Accueil"})}),ke.map((function(e,t){var a=e.title,i=e.route;return Object(n.jsx)("li",{className:"navitem-container",children:Object(n.jsx)(l.b,{to:i,children:a})},t)}))]})}),Object(n.jsx)("main",{children:Object(n.jsxs)(s.c,{children:[ke.map((function(e,t){var a=e.route,i=e.Component;return Object(n.jsx)(s.a,{path:a,children:Object(n.jsx)(i,{})},t)})),Object(n.jsx)(s.a,{path:"/",children:Object(n.jsx)(Se,{})})]})})]})})}var ze=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,162)).then((function(t){var a=t.getCLS,n=t.getFID,i=t.getFCP,r=t.getLCP,c=t.getTTFB;a(e),n(e),i(e),r(e),c(e)}))};o.a.render(Object(n.jsx)(r.a.StrictMode,{children:Object(n.jsx)(Te,{})}),document.getElementById("root")),ze()},23:function(e){e.exports=JSON.parse('{"a":"https://github.com/medialab/carnet-algopresse"}')},72:function(e,t,a){},73:function(e,t,a){}},[[152,1,2]]]);
//# sourceMappingURL=main.d539562d.chunk.js.map