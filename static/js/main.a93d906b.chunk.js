(this["webpackJsonpcarnet-algopresse"]=this["webpackJsonpcarnet-algopresse"]||[]).push([[0],{15:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return d})),n.d(t,"c",(function(){return b})),n.d(t,"d",(function(){return O}));var a=n(13),r=n(3),i=n(2),c=n(72),o=n(179),s=n(180),l=function(e,t){return"<".concat(e," \n  ").concat(Object.entries(t).filter((function(e){var t=Object(i.a)(e,2),n=(t[0],t[1]);return!(void 0===n||!1===n||""===n||Array.isArray(n)&&!n.length)})).map((function(e){var t=Object(i.a)(e,2),n=t[0],a=t[1];return"".concat(n,"={").concat(function(e){return"string"===typeof e?"'".concat(e,"'"):"object"===typeof e?JSON.stringify(e):e}(a),"}")})).join(" \n  ").trim(),"\n/>")},u=function(e){return l("GraphBlock",e)},d=function(e){return l("IceCreamBlock",e)},b=function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];switch(e){case"table":return j.apply(void 0,n);case"graph":default:return h.apply(void 0,n)}},j=function(e){return e.columns.reduce((function(t,n){var i=Object(c.uniq)(e.map((function(e){return e[n]}))),l="string";i.find((function(e){return isNaN(+e)}))||(l=i.find((function(e){return!Number.isInteger(+e)}))?"float":"integer");var u={id:n,title:n,type:l,options:i};return["float","integer"].includes(l)&&(u.options=u.options.map((function(e){return+e})),u.min=Object(o.a)(u.options),u.max=Object(s.a)(u.options)),Object(r.a)(Object(r.a)({},t),{},Object(a.a)({},n,u))}),{})},h=function(e,t){var n=(new DOMParser).parseFromString(t,"application/xml").querySelectorAll("attributes.node attribute"),i=[],c=["weight"];return n.forEach((function(e){var t=e.getAttribute("id");if(!c.includes(t)){var n=e.getAttribute("title"),a=e.getAttribute("type");i.push({id:t,title:n,type:a,options:new Set})}})),e.forEachNode((function(e,t){i.forEach((function(e){e.options.has(t[e.id])||e.options.add(t[e.id])}))})),i.reduce((function(e,t){return Object(r.a)(Object(r.a)({},e),{},Object(a.a)({},t.id,t))}),{})},O=function(e,t,n){return n?!(void 0!==t.find((function(t){var n=t.attribute,a=t.value;return e[n]!==""+a}))):void 0!==t.find((function(t){var n=t.attribute,a=t.value;return e[n]===""+a}))}},160:function(e,t,n){},176:function(e,t,n){},177:function(e,t,n){var a={"./00_home.mdx":[181,10],"./01_couverture_media.mdx":[182,11],"./02_detectcritic.mdx":[183,12],"./03_graphclusters.mdx":[184,3],"./04_timelineclusters.mdx":[185,13],"./05_toporobotalgo.mdx":[186,4],"./06_explore_entities.mdx":[187,5],"./07_IssueVERB.mdx":[188,6],"./08_NERdate.mdx":[189,14],"./dates-analysis.mdx":[190,7],"./graph-critics.mdx":[191,8],"./verbs-analysis.mdx":[192,9]};function r(e){if(!n.o(a,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=a[e],r=t[0];return n.e(t[1]).then((function(){return n(r)}))}r.keys=function(){return Object.keys(a)},r.id=177,e.exports=r},178:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n(0),i=n.n(r),c=n(7),o=n.n(c),s=(n(83),n(3)),l=n(20),u=n(5),d=(n(84),n(64)),b=n(2),j=n(65),h=n.n(j),O=n(196),g=n(197),f=function(e){var t=e.percentsLoaded,n=void 0===t?0:t;return Object(a.jsx)("div",{className:"loader-container",children:Object(a.jsx)("div",{className:"loader",children:Object(a.jsx)("div",{className:"loading-bar",style:{width:n+"%"}})})})},v=function(e){var t=e.url,n=e.children,i=Object(r.useState)(null),c=Object(b.a)(i,2),o=c[0],s=c[1],l=Object(r.useState)(0),u=Object(b.a)(l,2),d=u[0],j=u[1];return Object(r.useEffect)((function(){t&&h.a.get(t,{onDownloadProgress:function(e){var t=e.loaded/e.total;j(t)}}).then((function(e){var n=e.data;setTimeout((function(){var e=n;"csv"===t.split(".").pop()?e=Object(O.a)(n):"tsv"===t.split(".").pop()&&(e=Object(g.a)(n)),s(e)}))}))}),[t]),t?o?n(o):Object(a.jsx)(f,{percentsLoaded:100*d}):n()},x=n(13),m=n(198),p=n(66),C=n.n(p),S=n(67),V=n.n(S),N=n(68),y=n(199),z=n(179),k=n(180);function P(e){var t=Object(r.useRef)();return Object(r.useEffect)((function(){t.current=e})),t.current}var M=n(4),_=n.n(M),L=n(76),R=n(70),A=n.n(R);var F=function(e){var t=e.children,n=e.onClick;return Object(a.jsx)("button",{className:"control-button",onClick:n,children:t})},T=n(28);var w=function(e){var t=e.onToggleFiltersModeAnd,n=e.filtersModeAnd,i=e.filtersOptions,c=e.onFiltersChange,o=e.filters,s=Object(r.useState)(!1),l=Object(b.a)(s,2),u=l[0],d=l[1],j=Object(r.useState)(void 0),h=Object(b.a)(j,2),O=h[0],g=h[1],f=[];return O&&i[O].options.forEach((function(e){return f.push(e)})),Object(a.jsxs)("div",{className:"FiltersEditor",children:[Object(a.jsx)("div",{children:Object(a.jsx)("button",{className:u?"is-active":"",onClick:function(){return d(!u)},children:"Filtres ..."})}),u&&Object(a.jsxs)("div",{children:[Object(a.jsxs)(F,{onClick:t,children:["Mode des filtres: ",n?"AND":"OR"]}),o.length?Object(a.jsxs)("div",{children:[Object(a.jsx)("h6",{children:"Filtres existants"}),Object(a.jsx)("ul",{className:"existing-filters",children:o.map((function(e,t){var n=e.attribute,r=e.value;return Object(a.jsxs)("li",{children:[Object(a.jsxs)("div",{children:[n," : ",r]}),Object(a.jsx)("div",{children:Object(a.jsx)("button",{onClick:function(){var e=o.filter((function(e,n){return n!==t}));c(e)},children:"\ud83d\uddd1"})})]},t)}))})]}):null,Object(a.jsxs)("div",{children:[Object(a.jsx)("h6",{children:"Ajouter un nouveau filtre"}),Object(a.jsxs)("select",{value:O||"",onChange:function(e){var t=e.target.value;t.length&&g(t)},children:[Object.entries(i).map((function(e,t){var n=Object(b.a)(e,2),r=n[0],i=n[1].title;return Object(a.jsx)("option",{value:r,children:i},t)})),Object(a.jsx)("option",{value:"",children:"Selectionner"})]}),void 0!==O?Object(a.jsxs)("select",{value:"",onChange:function(e){var t=e.target.value;c([].concat(Object(T.a)(o),[{attribute:O,value:t}])),g(void 0)},children:[f.map((function(e,t){return Object(a.jsx)("option",{value:e,children:e},t)})),Object(a.jsx)("option",{value:"",children:"Selectionner"})]}):null]})]})]})};var E=function(e){var t=e.options,n=e.variables,i=Object(r.useState)(!1),c=Object(b.a)(i,2),o=c[0],s=c[1],l=void 0!==n.find((function(e){return"default"!==e.value&&void 0!==e.value}));return Object(a.jsxs)("div",{className:"FiltersEditor VariablesEditor",children:[Object(a.jsx)("div",{children:Object(a.jsx)("button",{className:o||l?"is-active":"",onClick:function(){return s(!o)},children:"Variables ..."})}),(o||l)&&Object(a.jsx)("div",{children:n.map((function(e,n){var r=e.title,i=e.value,c=e.onChange,o=e.type,s=[{value:"default",title:"D\xe9faut"}].concat(Object(T.a)(function(){switch(o){case"color":case"string":return Object.entries(t);case"boolean":return[["true",{title:"Oui"}],["false",{title:"Non"}]];case"number":default:return Object.entries(t).filter((function(e){var t=Object(b.a)(e,2),n=(t[0],t[1]);return["integer","float"].includes(n.type)}))}}().map((function(e){var t=Object(b.a)(e,2),n=t[0];return{label:t[1].title,value:n}}))));return s.length<=1?null:Object(a.jsxs)("div",{children:[Object(a.jsxs)("h6",{children:[r," "]}),Object(a.jsx)("select",{value:i,onChange:function(e){var t=e.target.value;return c("boolean"===o?"true"===t:t)},children:s.map((function(e){var t=e.value,n=e.label;return Object(a.jsx)("option",{value:t,children:n||"D\xe9faut"},t)}))})]},n)}))})]})};var D=function(e){var t=e.colorPalette;return Object(a.jsx)("ul",{className:"ColorLegend",children:Object.entries(t).map((function(e){var t=Object(b.a)(e,2),n=t[0],r=t[1];return Object(a.jsxs)("li",{children:[Object(a.jsx)("span",{className:"legend-color",style:{background:r}}),Object(a.jsx)("span",{className:"legend-modality",children:n})]},n)}))})},I={.25:"d\xe9faut"};function U(e){var t=e.defaultValue,n=e.onChange,i=Object(r.useState)(t),c=Object(b.a)(i,2),o=c[0],s=c[1];return Object(a.jsx)(L.a,{min:0,max:1,step:.01,defaultValue:t,value:o,onChange:function(e){s(e),n(e)},marks:I})}function X(e){var t=e.rescale,n=e.zoomIn,i=e.zoomOut,c=e.searchString,o=void 0===c?"":c,l=e.onSearchStringChange,u=e.filtersModeAnd,d=e.onToggleFiltersModeAnd,j=e.labelDensity,h=e.filtersOptions,O=e.filters,g=void 0===O?[]:O,f=e.onFiltersChange,v=e.nodeSizeVariable,x=e.nodeColorVariable,m=e.nodeLabelVariable,p=e.onNodeSizeVariableChange,C=e.onNodeColorVariableChange,S=e.onNodeLabelVariableChange,V=e.onLabelDensityChange,N=e.colorPalette,y=Object(r.useState)(!0),z=Object(b.a)(y,2),k=z[0],P=z[1];return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)("button",{onClick:function(){return P(!k)},className:_()("minify-button",{"is-active":k}),children:">"}),Object(a.jsxs)("ul",{className:_()("VisControls GraphControls",{"is-minified":k}),children:[Object(a.jsxs)("li",{className:"vis-controls-item camera",children:[Object(a.jsx)(F,{onClick:i,children:"-"}),Object(a.jsx)(F,{onClick:n,children:"+"}),Object(a.jsx)(F,{onClick:t,children:"Recentrer"})]}),Object(a.jsx)("li",{className:"vis-controls-item",children:Object(a.jsx)("form",{onSubmit:function(e){return e.preventDefault()},children:Object(a.jsx)("input",{type:"text",onChange:function(e){return l(e.target.value)},placeholder:"rechercher",value:o})})}),Object(a.jsx)("li",{className:"vis-controls-item",children:Object(a.jsx)(E,Object(s.a)({},{options:h,variables:[{title:"Taille des noeuds",onChange:p,value:v,type:"number"},{title:"Couleur des noeuds",value:x,onChange:C,type:"color"},{title:"Label des noeuds",value:m,onChange:S,type:"string"}]}))}),x&&"default"!==x?Object(a.jsx)(D,{colorPalette:N}):null,Object(a.jsx)("li",{className:"vis-controls-item",children:Object(a.jsx)(w,Object(s.a)({},{onToggleFiltersModeAnd:d,filtersModeAnd:u,filtersOptions:h,onFiltersChange:f,filters:g}))}),Object(a.jsx)("li",{className:"vis-controls-item slider-wrapper",children:Object(a.jsxs)("form",{onSubmit:function(e){return e.preventDefault()},children:[Object(a.jsx)("h5",{children:"Densit\xe9 des labels"}),Object(a.jsx)("div",{className:"slider-container",children:Object(a.jsx)(U,{defaultValue:j,onChange:A()(V,300)})})]})})]})]})}var Y=n(71),q=n.n(Y),G=n(15),B="#999",J=[2,15];var W=n(73),Z=n.n(W),H={cmin:25.59,cmax:55.59,lmin:60.94,lmax:90.94},K=["#999"];function Q(e,t){return 1===t?K:Z()(t,{colorSpace:H,seed:e,clustering:"force-vector"})}n(160);var $=Object(y.a)().domain([0,1]).range([200,10]),ee=Object(y.a)().domain([0,1]).range([300,30]);function te(e){e.getCamera().animatedReset(e)}function ne(e){e.getCamera().animatedZoom(e)}function ae(e){e.getCamera().animatedUnzoom(e)}var re=function(e){var t=e.graph,n=e.labelDensity,i=e.extents,c=e.searchString,o=void 0===c?"":c,l=e.onSearchStringChange,u=e.filtersModeAnd,d=e.onToggleFiltersModeAnd,j=e.filtersOptions,h=void 0===j?{}:j,O=e.filters,g=void 0===O?[]:O,f=e.onFiltersChange,v=e.onCameraUpdate,x=e.cameraPosition,m=e.updateTimestamp,p=e.nodeSizeVariable,C=e.nodeColorVariable,S=e.nodeLabelVariable,V=e.onNodeSizeVariableChange,M=e.onNodeColorVariableChange,_=e.onNodeLabelVariableChange,L=e.onLabelDensityChange,R=Object(r.useMemo)((function(){if(p&&"default"!==p&&h[p]){var e=Array.from(h[p].options);return{min:Object(z.a)(e),max:Object(k.a)(e),name:p}}}),[p]),A=Object(r.useMemo)((function(){if(C&&"default"!==C&&h[C]){var e=Q(C,h[C].options.size),t={},n=0;return h[C].options.forEach((function(a){t[a]=e[n],n++})),{palette:t,name:C}}}),[C]),F=Object(r.useMemo)((function(){var e=new Map;return t.forEach((function(t,n,a,r,i,c){e.set(i,{sourceNode:a,targetNode:r})})),e}),[t]),T=P(A),w=P(R),E=P(S),D=P(n),I=P(o),U=P(g),Y=function(e){var t=e.nodeColor,n=e.nodeSize,a=e.nodeLabel,r=e.nodeSizeFactor,i=void 0===r?1:r,c=e.extents,o=e.filters,s=void 0===o?[]:o,l=e.filtersModeAnd,u=null;return u=n?Object(y.a)().domain([n.min,n.max]).range(J):Object(y.a)().domain([c.nodeSize.min,c.nodeSize.max]).range(J),function(e,r){var c={x:r.x,y:r.y};if(c.color=t?t.palette[r[t.name]]||B:r.color||B,n){var o=r[n.name];o="number"===typeof o?o:1,c.size=u(o)}else{var d=r.size||1;c.size=u(d)}return c.size*=i,s.length&&!1===Object(G.d)(r,s,l)?(c.hidden=!0,c.label=""):(c.hidden=!1,c.label=a?"default"===a?r.label||e:r[a]||"":r.label||e),c}}({nodeColor:A,nodeSize:R,nodeLabel:S,extents:i,filters:g,filtersModeAnd:u}),W=function(e){var t=e.nodeColor,n=e.nodeSize,a=(e.nodeLabel,e.nodeSizeFactor,e.extents,e.filters,e.filtersModeAnd,e.edgesMap);return function(e,r,i,c){var o=a.get(e),s=o.sourceNode,l=o.targetNode,u={},d=(n?s[n.name]:s.size)>(n?l[n.name]:l.size)?s:l;return d&&(u.color=t?t.palette[d[t.name]]||B:d.color||B,u.color=q()(u.color).lighten(.4).rgb().string()),u}}({nodeColor:A,filters:g,filtersModeAnd:u,edgesMap:F}),Z=Object(r.useRef)(null),H=Object(r.useState)(null),K=Object(b.a)(H,2),re=K[0],ie=K[1];if(Object(r.useEffect)((function(){x&&re&&re.getCamera().animate(x)}),[m]),re){var ce=!1;T===A&&w===R&&E===S&&U===g||(re.settings.nodeReducer=Y,re.settings.edgeReducer=W,ce=!0),D!==n&&(re.settings.labelGrid.cell={width:ee(n),height:$(n)},re.displayedLabels=new Set,ce=!0),I!==o&&(o.length>=3?t.forEachNode((function(e,t){t.label.toLowerCase().includes(o.toLowerCase())?re.highlightNode(e):re.unhighlightNode(e)})):re.highlightedNodes.size>0&&(re.highlightedNodes=new Set)),ce&&re.refresh()}var oe=Object(r.useCallback)((function(e){if(re&&re.graph!==t&&(re.kill(),ie(null)),e&&t){var n=new N.WebGLRenderer(t,e,{nodeReducer:Y,edgeReducer:W});ie(n);var a=n.getCamera();v(a.getState()),a.on("updated",(function(e){v(e)}))}Z.current=e}),[t]);return Object(a.jsxs)("div",{className:"VisContainer GraphContainer",children:[Object(a.jsx)("div",{ref:oe,style:{width:"100%",height:"100%"}}),re&&Object(a.jsx)(X,Object(s.a)({rescale:te.bind(null,re),zoomIn:ne.bind(null,re),zoomOut:ae.bind(null,re)},{searchString:o,onSearchStringChange:l,filtersModeAnd:u,onToggleFiltersModeAnd:d,filtersOptions:h,filters:g,onFiltersChange:f,nodeSizeVariable:p,nodeColorVariable:C,nodeLabelVariable:S,labelDensity:n,onNodeSizeVariableChange:V,onNodeColorVariableChange:M,onNodeLabelVariableChange:_,onLabelDensityChange:L,colorPalette:A&&A.palette}))]})},ie=function(e){var t=e.prevPage,n=e.nextPage;return Object(a.jsx)("footer",{className:_()("FooterNav",{"start-page":!t}),children:Object(a.jsxs)("ul",{children:[t?Object(a.jsx)("li",{className:"previous-page",children:Object(a.jsx)("h5",{children:Object(a.jsxs)(l.b,{to:t.route,children:[Object(a.jsx)("div",{className:"marker",children:"<"}),Object(a.jsxs)("div",{className:"page-content",children:[Object(a.jsx)("div",{className:"page-label",children:Object(a.jsx)("i",{children:"Page pr\xe9c\xe9dente"})}),Object(a.jsx)("div",{children:t.title})]})]})})}):null,n?Object(a.jsx)("li",{className:"next-page",children:Object(a.jsx)("h5",{children:Object(a.jsxs)(l.b,{to:n.route,children:[Object(a.jsxs)("div",{children:[Object(a.jsx)("div",{className:"page-label",children:Object(a.jsx)("i",{children:"Page suivante"})}),Object(a.jsx)("div",{className:"page-content",children:n.title})]}),Object(a.jsx)("div",{className:"marker",children:">"})]})})}):null]})})},ce=n(24),oe=function(e){var t=e.Content,n=e.data,i=e.contentsURL,c=e.prevPage,o=e.nextPage,l=Object(r.useMemo)((function(){return C.a.parse(V.a,n)}),[n]),u=Object(r.useMemo)((function(){return Object(G.c)("graph",l,n)}),[l,n]),d=Object(r.useState)(void 0),j=Object(b.a)(d,2),h=j[0],O=j[1],g=Object(r.useState)(!1),f=Object(b.a)(g,2),v=f[0],p=f[1],S=Object(r.useState)(""),N=Object(b.a)(S,2),y=N[0],z=N[1],k=Object(r.useState)(!1),P=Object(b.a)(k,2),M=P[0],_=P[1],L=Object(r.useState)((new Date).getTime()),R=Object(b.a)(L,2),A=R[0],F=R[1],T=Object(r.useState)([]),w=Object(b.a)(T,2),E=w[0],D=w[1],I=Object(r.useState)(void 0),U=Object(b.a)(I,2),X=U[0],Y=U[1],q=Object(r.useState)(void 0),B=Object(b.a)(q,2),J=B[0],W=B[1],Z=Object(r.useState)(void 0),H=Object(b.a)(Z,2),K=H[0],Q=H[1],$=Object(r.useState)(.25),ee=Object(b.a)($,2),te=ee[0],ne=ee[1],ae=Object(r.useState)(null),oe=Object(b.a)(ae,2),se=oe[0],le=oe[1],ue=Object(r.useState)({}),de=Object(b.a)(ue,2),be=de[0],je=de[1];Object(r.useEffect)((function(){if(!se&&Object.keys(be).length){var e=Object.keys(be)[0];le(e)}}),[be,se]);var he=[];l.forEachNode((function(e,t){he.push(t.size)}));var Oe=Object(m.a)(he);return Object(a.jsx)(ce.a.Provider,{value:{onVisualizationUpdate:function(e){var t=e.x,n=e.y,a=e.ratio,r=e.searchString,i=e.filtersModeAnd,c=e.filters,o=e.nodeColorVariable,s=e.nodeSizeVariable,l=e.nodeLabelVariable,u=e.labelDensity;O({x:t,y:n,ratio:a}),F((new Date).getTime()),z(r),_(i),D(c),Y(o),W(s),Q(l),ne(u)},onRegisterVisualization:function(e,t){je(Object(s.a)(Object(s.a)({},be),{},Object(x.a)({},e,t)))},onUnregisterVisualization:function(e){var t=Object(s.a)({},be);delete t[e],je(t)},focusedVisualizationId:se,setFocusedVisualizationId:le,visualizationParams:Object(s.a)(Object(s.a)({},h),{},{searchString:y,filters:E,nodeSizeVariable:J,nodeColorVariable:X,nodeLabelVariable:K,filtersModeAnd:M,labelDensity:te})},children:Object(a.jsxs)("div",{className:"slide-container",children:[Object(a.jsxs)("section",{children:[Object(a.jsxs)("div",{children:[Object(a.jsx)("p",{children:Object(a.jsx)("button",{className:v?"is-active":"",onClick:function(){return p(!v)},children:"Comment modifier cette page ?"})}),Object(a.jsxs)("ol",{className:"edit-help ".concat(v?"is-active":""),children:[Object(a.jsx)("li",{children:"Pr\xe9alablement se logger dans github si le r\xe9pertoire est priv\xe9"}),Object(a.jsxs)("li",{children:["Se rendre sur ",Object(a.jsx)("a",{target:"blank",href:i,children:"cette page du r\xe9pertoire github"})]}),Object(a.jsx)("li",{children:'Cliquer sur le crayon en haut \xe0 droite des contenus (il affiche "edit" au survol)'}),Object(a.jsx)("li",{children:'Faire les modifications puis cliquer sur "Commit changes" en bas de la page'}),Object(a.jsx)("li",{children:"Attendre 2 minutes puis recharger la page pour voir la version \xe0 jour de la page"})]})]}),Object(a.jsx)(r.Suspense,{fallback:Object(a.jsx)("div",{children:"Chargement"}),children:Object(a.jsx)(t,{})}),Object(a.jsx)(ie,{prevPage:c,nextPage:o})]}),Object(a.jsx)("aside",{children:Object(a.jsx)("div",{className:"vis",children:Object(a.jsx)(re,Object(s.a)({},{graph:l,searchString:y,filtersOptions:u,filters:E,cameraPosition:h,onCameraUpdate:function(e){var t=e.x,n=e.y,a=e.ratio;O({x:t,y:n,ratio:a})},updateTimestamp:A,nodeSizeVariable:J,nodeColorVariable:X,nodeLabelVariable:K,filtersModeAnd:M,labelDensity:te,onSearchStringChange:function(e){z(e)},onToggleFiltersModeAnd:function(){return _(!M)},onFiltersChange:function(e){return D(e)},onLabelDensityChange:function(e){return ne(e)},onNodeSizeVariableChange:function(e){return W(e)},onNodeColorVariableChange:function(e){return Y(e)},onNodeLabelVariableChange:function(e){return Q(e)},extents:{nodeSize:{min:Oe[0],max:Oe[1]}}}))})})]})})},se=n(75),le=n.n(se);function ue(e){var t=e.xVariable,n=e.reverseX,i=e.yVariable,c=e.reverseY,o=e.sizeVariable,l=e.colorVariable,u=e.labelVariable,d=e.rotateMode,j=e.searchString,h=e.onSearchStringChange,O=e.onToggleRotateMode,g=e.onXVariableChange,f=e.onYVariableChange,v=e.onColorVariableChange,x=e.onSizeVariableChange,m=e.onLabelVariableChange,p=e.onToggleReverseX,C=e.onToggleReverseY,S=e.filtersOptions,V=e.colorPalette,N=Object(r.useState)(!0),y=Object(b.a)(N,2),z=y[0],k=y[1];return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)("button",{onClick:function(){return k(!z)},className:_()("minify-button",{"is-active":z}),children:">"}),Object(a.jsxs)("ul",{className:_()("GraphControls",{"is-minified":z}),children:[Object(a.jsx)("li",{className:"vis-controls-item",children:Object(a.jsx)("form",{onSubmit:function(e){return e.preventDefault()},children:Object(a.jsx)("input",{type:"text",onChange:function(e){return h(e.target.value)},placeholder:"rechercher",value:j})})}),Object(a.jsx)("li",{className:"vis-controls-item",children:Object(a.jsx)(E,Object(s.a)({},{options:S,variables:[{title:"X des points",onChange:g,value:t,type:"number"},{title:"Inverser les x",onChange:p,value:n,type:"boolean"},{title:"Y des points",onChange:f,value:i,type:"number"},{title:"Inverser les x",onChange:C,value:c,type:"boolean"},{title:"Taille des points",onChange:x,value:o,type:"number"},{title:"Couleur des points",onChange:v,value:l,type:"color"},{title:"Labels des points",onChange:m,value:u,type:"string"},{title:"Tourner la visualisation \xe0 45\xb0",onChange:O,value:d,type:"boolean"}]}))}),l&&"default"!==l?Object(a.jsx)(D,{colorPalette:V}):null]})]})}n(176);function de(e){var t=e.width,n=e.height,r=e.data,i=e.xVariable,c=e.reverseX,o=e.yVariable,l=e.reverseY,u=e.sizeVariable,d=e.colorVariable,b=e.labelVariable,j=e.rotateMode,h=e.searchString,O=void 0===h?"":h,g=e.onSearchStringChange,f=e.onToggleRotateMode,v=e.onXVariableChange,p=e.onYVariableChange,C=e.onColorVariableChange,S=e.onSizeVariableChange,V=e.onLabelVariableChange,N=e.onToggleReverseX,k=e.onToggleReverseY,P=e.filtersOptions,M=void 0===P?{}:P,_=Object(z.a)([t,n]),L=_,R=_,A=_/100,F=_/50,T=_/10,w=[T,L-2*T],E=[T,R-T];c&&(w=w.reverse()),l&&(E=E.reverse());var D,I,U=i&&"default"!==i?Object(y.a)().range(w).domain(Object(m.a)(r.map((function(e){return+e[i]})))):function(){return 0},X=o&&"default"!==o?Object(y.a)().range(E).domain(Object(m.a)(r.map((function(e){return+e[o]})))):function(){return 0},Y=u&&"default"!==u?Object(y.a)().domain(Object(m.a)(r.map((function(e){return+e[u]})))).range([A,F]):function(){return 0},q=d&&"default"!==d?Q(d,M[d].options.length):void 0,G=function(){return"grey"};return q&&(D=M[d].options.reduce((function(e,t,n){return Object(s.a)(Object(s.a)({},e),{},Object(x.a)({},t,q[n]))}),{}),G=function(e){return D[e]}),O.length&&b&&(I=new Set,r.forEach((function(e,t){e[b].toLowerCase().includes(O)&&I.add(t)}))),Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)("svg",{className:"scatterplot",width:L,height:R,transform:j?"rotate(-45)":"",children:Object(a.jsxs)("g",{transform:"translate(".concat(L/20,", 0)scale(.9)"),children:[Object(a.jsxs)("g",{className:"axis axis-left",children:[Object(a.jsx)("line",{x1:T,x2:T,y1:T,y2:R-T,stroke:"black"}),X.ticks&&X.ticks().map((function(e){var t=X(e);return Object(a.jsxs)("g",{transform:"translate(0, ".concat(t,")"),children:[Object(a.jsx)("text",{transform:j?"rotate(45)translate(".concat(T/4,", ").concat(-T/3,")"):"",children:e}),Object(a.jsx)("line",{x1:.8*T,x2:T,y1:0,y2:0,stroke:"black"})]},e)})),Object(a.jsx)("text",{className:"axis-variable-name",x:0,y:T/2-2,transform:j?"rotate(90)translate(".concat(.5*(R-T),", ").concat(.7*-T,")"):"",children:o})]}),Object(a.jsxs)("g",{className:"axis axis-bottom",children:[Object(a.jsx)("line",{x1:T,x2:L-2*T,y1:R-T,y2:R-T,stroke:"black"}),U.ticks&&U.ticks().map((function(e){var t=U(e);return Object(a.jsxs)("g",{transform:"translate(".concat(t,", ").concat(R,")"),children:[Object(a.jsx)("text",{y:-T/3,transform:j?"rotate(45)translate(".concat(.4*-T,", 0)"):"",children:e}),Object(a.jsx)("line",{x1:0,x2:0,y1:-T,y2:.8*-T,stroke:"black"})]},e)})),Object(a.jsx)("text",{className:"axis-variable-name",x:L-1.5*T,y:R-T/3-2,transform:j?"translate(".concat(-(L-T)/2,", ").concat(T/3,")"):"",children:i})]}),Object(a.jsxs)("g",{className:"ticks-container",children:[X.ticks&&X.ticks().map((function(e){return Object(a.jsx)("line",{x1:T,x2:L-T,y1:X(e),y2:X(e),stroke:"lightgrey"},e)})),U.ticks&&U.ticks().map((function(e){return Object(a.jsx)("line",{y1:T,y2:L-T,x1:X(e),x2:X(e),stroke:"lightgrey"},e)}))]}),Object(a.jsx)("g",{className:"plot-objects-container",children:r.map((function(e,t){return Object(a.jsxs)("g",{className:"plot-object",transform:"translate(".concat(U(e[i]),", ").concat(X(e[o]),")"),opacity:!I||I.has(t)?1:.2,children:[Object(a.jsx)("circle",{r:Y(e[u]),fill:G(e[d]),opacity:.8}),Object(a.jsx)("text",{x:Y(e[u])+_/100,children:e[b]})]},t)}))})]})}),Object(a.jsx)(ue,Object(s.a)({},{xVariable:i,yVariable:o,reverseX:c,reverseY:l,sizeVariable:u,colorVariable:d,labelVariable:b,rotateMode:j,searchString:O,onSearchStringChange:g,onToggleRotateMode:f,onXVariableChange:v,onYVariableChange:p,onColorVariableChange:C,onSizeVariableChange:S,onLabelVariableChange:V,onToggleReverseX:N,onToggleReverseY:k,filtersOptions:M,colorPalette:D}))]})}var be=function(e){return Object(a.jsx)("div",{className:"VisContainer IcecreamContainer",children:Object(a.jsx)(le.a,{children:function(t){return Object(a.jsx)(de,Object(s.a)({},Object(s.a)(Object(s.a)({},e),t)))}})})},je=function(e){var t=e.Content,n=e.contentsURL,i=e.prevPage,c=e.nextPage,o=Object(r.useState)(!1),s=Object(b.a)(o,2),l=s[0],u=s[1];return Object(a.jsxs)("div",{className:"slide-container without-visualization",children:[Object(a.jsxs)("section",{children:[Object(a.jsxs)("div",{children:[Object(a.jsx)("p",{children:Object(a.jsx)("button",{className:l?"is-active":"",onClick:function(){return u(!l)},children:"Comment modifier cette page ?"})}),Object(a.jsxs)("ol",{className:"edit-help ".concat(l?"is-active":""),children:[Object(a.jsx)("li",{children:"Pr\xe9alablement se logger dans github si le r\xe9pertoire est priv\xe9"}),Object(a.jsxs)("li",{children:["Se rendre sur ",Object(a.jsx)("a",{target:"blank",href:n,children:"cette page du r\xe9pertoire github"})]}),Object(a.jsx)("li",{children:'Cliquer sur le crayon en haut \xe0 droite des contenus (il affiche "edit" au survol)'}),Object(a.jsx)("li",{children:'Faire les modifications puis cliquer sur "Commit changes" en bas de la page'}),Object(a.jsx)("li",{children:"Attendre 2 minutes puis recharger la page pour voir la version \xe0 jour de la page"})]})]}),Object(a.jsx)(r.Suspense,{fallback:Object(a.jsx)("div",{children:"Chargement"}),children:Object(a.jsx)(t,{})}),Object(a.jsx)(ie,{prevPage:i,nextPage:c})]}),Object(a.jsx)("aside",{})]})},he=[{title:"Introduction",route:"/introduction",contents:"00_home.mdx",Component:je},{title:"1. Couverture m\xe9dias",route:"/01-couverture-media",contents:"01_couverture_media.mdx",Component:je},{title:"2. D\xe9tecter les critiques",route:"/02-detect-critic",contents:"02_detectcritic.mdx",Component:je},{title:"3. Graphe clusters",route:"/03-graph-clusters",contents:"03_graphclusters.mdx",data:"Graph_Critic_EN_algopress_webV2.gexf",Component:oe},{title:"4. \xc9volution de l'agenda m\xe9diatique",route:"/04-timeline-clusters",contents:"04_timelineclusters.mdx",Component:je},{title:"5. Topologie du r\xe9seau",route:"/05-topologie",contents:"05_toporobotalgo.mdx",data:"Graph_Critic_EN_algopress_webV2.gexf",Component:oe},{title:"6. Agents calculateurs",route:"/06-agents",contents:"06_explore_entities.mdx",data:"Graph_Critic_EN_algopress_webV2.gexf",Component:oe},{title:"7. Verbes de troubles",route:"/07-verbs",contents:"07_IssueVERB.mdx",data:"df_AB_tfidf_verbs_freq_count.csv",Component:function(e){var t=e.Content,n=e.data,i=e.contentsURL,c=e.prevPage,o=e.nextPage,l=Object(r.useMemo)((function(){return Object(G.c)("table",n)}),[n]),u=Object(r.useState)(!1),d=Object(b.a)(u,2),j=d[0],h=d[1],O=Object(r.useState)(""),g=Object(b.a)(O,2),f=g[0],v=g[1],m=Object(r.useState)(void 0),p=Object(b.a)(m,2),C=p[0],S=p[1],V=Object(r.useState)(void 0),N=Object(b.a)(V,2),y=N[0],z=N[1],k=Object(r.useState)(!1),P=Object(b.a)(k,2),M=P[0],_=P[1],L=Object(r.useState)(!1),R=Object(b.a)(L,2),A=R[0],F=R[1],T=Object(r.useState)(void 0),w=Object(b.a)(T,2),E=w[0],D=w[1],I=Object(r.useState)(void 0),U=Object(b.a)(I,2),X=U[0],Y=U[1],q=Object(r.useState)(void 0),B=Object(b.a)(q,2),J=B[0],W=B[1],Z=Object(r.useState)(!1),H=Object(b.a)(Z,2),K=H[0],Q=H[1],$=Object(r.useState)(null),ee=Object(b.a)($,2),te=ee[0],ne=ee[1],ae=Object(r.useState)({}),re=Object(b.a)(ae,2),oe=re[0],se=re[1],le=function(e){var t=e.xVariable,n=e.yVariable,a=e.reverseX,r=e.reverseY,i=e.sizeVariable,c=e.colorVariable,o=e.labelVariable,s=e.rotateMode,l=e.searchString;S(t),z(n),_(a),F(r),D(i),Y(c),W(o),Q(s),v(l)};Object(r.useEffect)((function(){if(!te&&Object.keys(oe).length){var e=Object.keys(oe)[0];ne(e),le(oe[e])}}),[oe,te]);return Object(a.jsx)(ce.a.Provider,{value:{onVisualizationUpdate:le,onRegisterVisualization:function(e,t){se(Object(s.a)(Object(s.a)({},oe),{},Object(x.a)({},e,t)))},onUnregisterVisualization:function(e){var t=Object(s.a)({},oe);delete t[e],se(t)},focusedVisualizationId:te,setFocusedVisualizationId:ne,visualizationParams:{xVariable:C,yVariable:y,reverseX:M,reverseY:A,sizeVariable:E,colorVariable:X,labelVariable:J,rotateMode:K,searchString:f}},children:Object(a.jsxs)("div",{className:"slide-container",children:[Object(a.jsxs)("section",{children:[Object(a.jsxs)("div",{children:[Object(a.jsx)("p",{children:Object(a.jsx)("button",{className:j?"is-active":"",onClick:function(){return h(!j)},children:"Comment modifier cette page ?"})}),Object(a.jsxs)("ol",{className:"edit-help ".concat(j?"is-active":""),children:[Object(a.jsx)("li",{children:"Pr\xe9alablement se logger dans github si le r\xe9pertoire est priv\xe9"}),Object(a.jsxs)("li",{children:["Se rendre sur ",Object(a.jsx)("a",{target:"blank",href:i,children:"cette page du r\xe9pertoire github"})]}),Object(a.jsx)("li",{children:'Cliquer sur le crayon en haut \xe0 droite des contenus (il affiche "edit" au survol)'}),Object(a.jsx)("li",{children:'Faire les modifications puis cliquer sur "Commit changes" en bas de la page'}),Object(a.jsx)("li",{children:"Attendre 2 minutes puis recharger la page pour voir la version \xe0 jour de la page"})]})]}),Object(a.jsx)(r.Suspense,{fallback:Object(a.jsx)("div",{children:"Chargement"}),children:Object(a.jsx)(t,{})}),Object(a.jsx)(ie,{prevPage:c,nextPage:o})]}),Object(a.jsx)("aside",{children:Object(a.jsx)("div",{className:"vis",children:Object(a.jsx)(be,Object(s.a)({},{data:n,filtersOptions:l,xVariable:C,reverseX:M,yVariable:y,reverseY:A,sizeVariable:E,colorVariable:X,labelVariable:J,rotateMode:K,searchString:f,onSearchStringChange:function(e){v(e)},onToggleRotateMode:function(){return Q(!K)},onXVariableChange:function(e){return S(e)},onYVariableChange:function(e){return z(e)},onToggleReverseX:function(){return _(!M)},onToggleReverseY:function(){return F(!A)},onColorVariableChange:function(e){return Y(e)},onSizeVariableChange:function(e){return D(e)},onLabelVariableChange:function(e){return W(e)}}))})})]})})}},{title:"8. Temporalit\xe9",route:"/08-temporalite",contents:"08_NERdate.mdx",Component:je}];function Oe(){var e=function(e){var t=e.data,n=e.contentsURL,r=e.Content,i=e.ThatComponent,c=e.prevPage,o=e.nextPage;return Object(a.jsx)(v,{url:t?"".concat("/carnet-algopresse","/data/").concat(t):void 0,children:function(e){return Object(a.jsx)(i,Object(s.a)({},{contentsURL:n,Content:r,prevPage:c,nextPage:o,data:e}))}})};return Object(a.jsx)(l.a,{children:Object(a.jsxs)("div",{id:"wrapper",children:[Object(a.jsx)("nav",{children:Object(a.jsx)("ul",{children:he.map((function(e,t){var n=e.title,r=e.route;return Object(a.jsx)("li",{className:"navitem-container",children:Object(a.jsx)(l.c,{to:r,children:n})},t)}))})}),Object(a.jsx)("main",{children:Object(a.jsxs)(u.d,{children:[he.map((function(t,r){var c=t.route,o=t.contents,s=t.data,l=t.Component,b=r>0?he[r-1]:void 0,j=r<he.length-1?he[r+1]:void 0,h=i.a.lazy((function(){return n(177)("./".concat(o))})),O="".concat(d.a,"/blob/main/src/contents/").concat(o);return Object(a.jsx)(u.b,{path:c,children:e({data:s,contentsURL:O,Content:h,ThatComponent:l,prevPage:b,nextPage:j})},r)})),Object(a.jsx)(u.a,{to:he[0].route})]})})]})})}var ge=function(e){e&&e instanceof Function&&n.e(15).then(n.bind(null,206)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,i=t.getLCP,c=t.getTTFB;n(e),a(e),r(e),i(e),c(e)}))};o.a.render(Object(a.jsx)(i.a.StrictMode,{children:Object(a.jsx)(Oe,{})}),document.getElementById("root")),ge()},24:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var a=n(0),r=n.n(a).a.createContext({})},64:function(e){e.exports=JSON.parse('{"a":"https://github.com/medialab/carnet-algopresse"}')},83:function(e,t,n){},84:function(e,t,n){}},[[178,1,2]]]);
//# sourceMappingURL=main.a93d906b.chunk.js.map