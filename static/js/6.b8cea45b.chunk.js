(this["webpackJsonpcarnet-algopresse"]=this["webpackJsonpcarnet-algopresse"]||[]).push([[6],{163:function(e,t,r){"use strict";r.r(t),r.d(t,"readingTime",(function(){return o})),r.d(t,"default",(function(){return u})),r.d(t,"tableOfContents",(function(){return l})),r.d(t,"frontMatter",(function(){return c}));var n=r(176),s=(r(1),r(175)),a=r(180),o={text:"4 min read",minutes:3.465,time:207899.99999999997,words:693},i={};function u(e){var t=e.components,r=Object(n.a)(e,["components"]);return Object(s.a)("wrapper",Object.assign({},i,r,{components:t,mdxType:"MDXLayout"}),Object(s.a)("h2",{id:"comment-sont-exprim\xe9s-les-verbes-de-troubles-"},"Comment sont exprim\xe9s les verbes de troubles ?"),Object(s.a)("blockquote",null,Object(s.a)("p",{parentName:"blockquote"},"Visualisation Verbes troubles full")),Object(s.a)(a.a,{xVariable:"robots",yVariable:"algorithms",sizeVariable:"frequency",labelVariable:"entity",reverseX:"true",rotateMode:!0,mdxType:"IceCreamBlock"}),Object(s.a)("p",null,"Une autre mani\xe8re de poursuivre cette analyse comparative des troubles et formes d\u2019agentivit\xe9 associ\xe9s aux calculateurs consiste en l\u2019exploration d\u2019une autre entit\xe9 s\xe9mantique au sein du corpus d\u2019articles que sont les verbes mais absente du r\xe9seau du fait de la proc\xe9dure d\u2019extraction. Apr\xe8s avoir r\xe9alis\xe9 une extraction d\u2019une liste de verbes interpr\xe9tables comme \xe9tant potentiellement de bons candidats aux troubles produits par les dispositifs techniques, nous avons calcul\xe9 et compar\xe9 leur score tf-idf  au sein des deux sous-ensemble d\u2019articles constitutifs du r\xe9seau."),Object(s.a)("blockquote",null,Object(s.a)("p",{parentName:"blockquote"},"Visualisation Verbes troubles robot")),Object(s.a)("p",null,"Les verbes dont les scores tf-idf sont les plus importants dans les articles qui composent l\u2019espace s\xe9mantique \u201cRobots\u201d viennent conforter l\u2019analyse des troubles effectu\xe9e \xe0 partir des termes cat\xe9goris\xe9s comme \u201cIssues\u201d au sein du graphe. En effet, on observe une plus forte repr\xe9sentation de verbes exprimant une menace de la part des machines et intelligences autonomes relevant d\u2019un discours proph\xe9tique, voire apocalyptique. Parmi les verbes s\xe9lectionn\xe9s comme bons candidats \xe0 l\u2019expression de troubles ayant les plus importants scores, on trouve des verbes qui expriment des notions de destruction (doom, destroy, eradicate, kill, eliminate) et de domination des machines sur l\u2019homme (enslave, dominate), mais \xe9galement de  d\xe9passement ou de remplacement des hommes par les ces agents techniques (overtake, surpass, replace, defeat). D\u2019autres verbes davantage repr\xe9sent\xe9s dans le sous ensemble \u201crobots\u201d renvoient \xe0 des notions de transformation et de changement (reshape, transform, disrupt) ou aux capacit\xe9s de ces agents techniques \xe0 imiter ou simuler les comportements humains (ressemble, simulate, reproduce, mimic)."),Object(s.a)("blockquote",null,Object(s.a)("p",{parentName:"blockquote"},"Visualisation Verbes troubles algos")),Object(s.a)("p",null,"Dans le sous-ensemble d\u2019articles associ\xe9s aux \u201cAlgorithmes\u201d on retrouve \xe9galement des verbes qui viennent conforter les analyses pr\xe9c\xe9dentes r\xe9alis\xe9es \xe0 partir de la cat\xe9gories \u201cIssues\u201d. En effet, les verbes qui pr\xe9sentent les plus hauts scores de tf-idf renvoient aux questions de filtrage et de censure de l\u2019information (filter, delete, supress, censor), aux probl\xe8mes de surveillance et de privacy (profile, suspect, spy, target, track), \xe0 la d\xe9noncitation des formes de discrimination (bias, discriminate) ou encore aux ph\xe9nom\xe8nes de propagation et d\u2019amplification de contenus frauduleux (promote, amplify, spread). "),Object(s.a)("blockquote",null,Object(s.a)("p",{parentName:"blockquote"},"Visualisation Verbes troubles full")),Object(s.a)("hr",null),Object(s.a)("h2",{id:"m\xe9thode--extraction-des-verbes-de-troubles-et-calcul-des-tf-idf-sur-le-corpus"},"M\xe9thode : Extraction des verbes de troubles et calcul des TF-IDF sur le corpus"),Object(s.a)("p",null,"L\u2019analyse des verbes de troubles a \xe9t\xe9 r\xe9alis\xe9e, \xe0 partir du logiciel Cortext, en effectuant une premi\xe8re extraction de 1000 verbes sur le texte complet des articles critiques du corpus en employant la m\xe9thode \u201cpigeon holes\u201d via le logiciel Cortext (identique \xe0 la m\xe9thode d\u2019extraction des termes du graphe).\nLa liste de verbes ainsi produite a d\u2019abord \xe9t\xe9 manuellement annot\xe9e afin d\u2019extraire une sous liste de 431 verbes pouvant \xeatre interpr\xe9t\xe9s comme des probl\xe8mes, des difficult\xe9s ou des troubles. En effectuant plusieurs it\xe9rations de visualisation matricielle via l\u2019outil clustergrammer ",Object(s.a)("a",Object.assign({parentName:"p"},{href:"https://maayanlab.cloud/clustergrammer/"}),"https://maayanlab.cloud/clustergrammer/")," des scores de tf-idf pour chacun des verbes sur l\u2019ensemble des articles associ\xe9s aux 17 clusters principaux (sup\xe9rieur \xe0 1% d\u2019articles du corpus) via l\u2019outil clustergrammer une liste plus restreinte de 66 verbes a \xe9t\xe9 s\xe9lectionn\xe9e pr\xe9sentant une plus forte saillance dans la matrice et \xe9tant plus explicitement interpr\xe9tables comme troubles.\nLe calcul final du score tf-idf s\u2019effectue en produisant une matrice du nombre d\u2019occurrences brutes des verbes (en ligne) par documents dans chacun des 23 clusters (en colonne). On calcule la somme des occurrences suivant les deux grands sous ensembles d\xe9finis en suivant la topologie sur l\u2019axe de l\u2019incarnation, produisant deux ensembles comparables en volume d\u2019articles (Robots : 52% articles - 9 clusters > 1% - 1790 termes ; Algorithmes : 48% articles - 8 clusters > 1% - 1201 termes).\nLa matrice finale compte 66 verbes en ligne et deux colonnes correspondant aux deux sous-ensembles algorithmes et robots. Le calcul du score tf-idf est obtenu \xe0 partir du module TfidfTransformer ",Object(s.a)("a",Object.assign({parentName:"p"},{href:"https://scikit-learn.org/stable/modules/generated/sklearn.feature_extraction.text.TfidfTransformer.html"}),"https://scikit-learn.org/stable/modules/generated/sklearn.feature_extraction.text.TfidfTransformer.html")," en conservant les options par d\xe9faut (int\xe9grant la fonction smooth_idf=True, la constante \u201c1\u201d est ajout\xe9e au num\xe9rateur et au d\xe9nominateur de l\u2019idf comme si l\u2019on voyait un document suppl\xe9mentaire contenant chaque terme de la collection exactement une fois, ce qui \xe9vite les divisions par z\xe9ro : "),Object(s.a)("blockquote",null,Object(s.a)("p",{parentName:"blockquote"},"idf(t) = log ","[ (1 + n) / (1 + df(t)) ]"," + 1.")))}u.isMDXComponent=!0;var l=function(){return[{id:"comment-sont-exprim\xe9s-les-verbes-de-troubles-",level:2,title:"Comment sont exprim\xe9s les verbes de troubles ?",children:[]},{id:"m\xe9thode--extraction-des-verbes-de-troubles-et-calcul-des-tf-idf-sur-le-corpus",level:2,title:"M\xe9thode : Extraction des verbes de troubles et calcul des TF-IDF sur le corpus",children:[]}]},c={}},175:function(e,t,r){"use strict";r.d(t,"a",(function(){return m}));var n=r(1),s=r.n(n);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function u(e,t){if(null==e)return{};var r,n,s=function(e,t){if(null==e)return{};var r,n,s={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(s[r]=e[r]);return s}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(s[r]=e[r])}return s}var l=s.a.createContext({}),c=function(e){var t=s.a.useContext(l),r=t;return e&&(r="function"===typeof e?e(t):i(i({},t),e)),r},d={inlineCode:"code",wrapper:function(e){var t=e.children;return s.a.createElement(s.a.Fragment,{},t)}},p=s.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,o=e.parentName,l=u(e,["components","mdxType","originalType","parentName"]),p=c(r),m=n,b=p["".concat(o,".").concat(m)]||p[m]||d[m]||a;return r?s.a.createElement(b,i(i({ref:t},l),{},{components:r})):s.a.createElement(b,i({ref:t},l))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"===typeof e||n){var a=r.length,o=new Array(a);o[0]=p;var i={};for(var u in t)hasOwnProperty.call(t,u)&&(i[u]=t[u]);i.originalType=e,i.mdxType="string"===typeof e?e:n,o[1]=i;for(var l=2;l<a;l++)o[l]=r[l];return s.a.createElement.apply(null,o)}return s.a.createElement.apply(null,r)}p.displayName="MDXCreateElement"},176:function(e,t,r){"use strict";function n(e,t){if(null==e)return{};var r,n,s=function(e,t){if(null==e)return{};var r,n,s={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(s[r]=e[r]);return s}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(s[r]=e[r])}return s}r.d(t,"a",(function(){return n}))},179:function(e,t,r){"use strict";var n,s=new Uint8Array(16);function a(){if(!n&&!(n="undefined"!==typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!==typeof msCrypto&&"function"===typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return n(s)}var o=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;for(var i=function(e){return"string"===typeof e&&o.test(e)},u=[],l=0;l<256;++l)u.push((l+256).toString(16).substr(1));var c=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=(u[e[t+0]]+u[e[t+1]]+u[e[t+2]]+u[e[t+3]]+"-"+u[e[t+4]]+u[e[t+5]]+"-"+u[e[t+6]]+u[e[t+7]]+"-"+u[e[t+8]]+u[e[t+9]]+"-"+u[e[t+10]]+u[e[t+11]]+u[e[t+12]]+u[e[t+13]]+u[e[t+14]]+u[e[t+15]]).toLowerCase();if(!i(r))throw TypeError("Stringified UUID is invalid");return r};t.a=function(e,t,r){var n=(e=e||{}).random||(e.rng||a)();if(n[6]=15&n[6]|64,n[8]=63&n[8]|128,t){r=r||0;for(var s=0;s<16;++s)t[r+s]=n[s];return t}return c(n)}},180:function(e,t,r){"use strict";var n=r(0),s=r(3),a=r(2),o=r(1),i=r(14),u=r.n(i),l=r(179),c=r(21),d=r(13),p=function(e){var t=Object(o.useContext)(c.a),r=t.onVisualizationUpdate,i=t.focusedVisualizationId,p=t.onRegisterVisualization,m=t.onUnregisterVisualization,b=t.setFocusedVisualizationId,f=t.visualizationParams,v=Object(o.useState)(null),g=Object(a.a)(v,2),O=g[0],y=g[1],h=Object(o.useState)(!1),j=Object(a.a)(h,2),x=j[0],k=j[1];Object(o.useEffect)((function(){var t=Object(l.a)();return setTimeout((function(){return p(t,Object(s.a)({},e))})),y(t),m(O)}),["id","inputProps","onRegisterVisualization","onUnregisterVisualization"]);var q=i===O,w=q?f:e;return Object(n.jsxs)("div",{onClick:function(){r(e),setTimeout((function(){return b(O)}))},className:u()("VisualizationBlock IcecreamBlock",{"is-focused":q}),children:[Object(n.jsx)("pre",{children:Object(n.jsx)("code",{children:Object(d.b)(w)})}),Object(n.jsxs)("div",{className:"buttons-container",children:[Object(n.jsx)("button",{onClick:function(){r(e)},children:"R\xe9initialiser sur les param\xe8tres du fichier"}),Object(n.jsx)("button",{onClick:function(e){e.preventDefault(),e.stopPropagation(),navigator.clipboard.writeText(Object(d.b)(w)),k(!0),setTimeout((function(){return k(!1)}),1e3)},children:x?"Copi\xe9 dans le presse-papier !":"Copier le code actuel"})]})]})};t.a=p}}]);
//# sourceMappingURL=6.b8cea45b.chunk.js.map