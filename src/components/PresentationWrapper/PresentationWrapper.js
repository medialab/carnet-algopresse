import React, { Suspense, useRef, useEffect, useState, createRef, useMemo, useReducer } from 'react';

import { useLocation, useHistory } from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';

import { VisualizationControlContext, PresentationContext } from '../../contexts'
// import {parseQuery} from '../../helpers/misc';

import routes from '../../summary'

const buildRouteId = (_index, route, lang) => `${encodeURIComponent(route.route[lang].toLowerCase())}`;

const PresentationWrapper = ({ match: { params } }) => {
  const { lang, section: activeSection, activeVisualizationIndex } = params;
  const sectionsRef = useRef(routes.map(() => createRef()));
  const [activeVisualization, setActiveVisualization] = useState(null);
  const history = useHistory();

  const [visualizations, setVisualizations] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {}
  )
  // let {search} = location;
  // search = parseQuery(search);
  // const {activeSection} = search;

  const scrollRef = useRef(null);

  // useEffect(() => {
  //   if (activeSection) {
  //     let activeSectionIndex;
  //     const thatSection = routes.find((route, index) => {
  //       const id = buildRouteId(index, route, lang);
  //       if (id === activeSection) {
  //         activeSectionIndex = index;
  //         return true;
  //       }
  //     });
  //     if (activeSectionIndex) {
  //       const el = sectionsRef.current[activeSectionIndex];
  //       if (el.current) {
  //         const y = el.current.getBoundingClientRect().y;
  //         setTimeout(() => {
  //           window.scrollTo(0, y - window.innerHeight / 2)
  //         }, 3000)
  //       }
  //     }
  //   }
  // }, [])
  
  useEffect(() => {
    const listener = e => {
      const bodyPos = document.body.getBoundingClientRect();
      const y = Math.abs(bodyPos.top) + window.innerHeight / 2;
      let activeRouteIndex;
      let activeRouteY;

      const activeRouteMarker = sectionsRef.current.find((ref, index) => {
        if (ref.current) {
          const { y: initialSectionY, height } = ref.current.getBoundingClientRect();
          const bodyRect = document.body.getBoundingClientRect();
          const sectionY = initialSectionY - bodyRect.top;
          if (y > sectionY && y < sectionY + height) {
            activeRouteIndex = index;
            activeRouteY = initialSectionY;
            return true;
          }
        }
      });
      if (activeRouteIndex !== undefined) {
        const newRoute = routes[activeRouteIndex];
        const id = buildRouteId(activeRouteIndex, newRoute, lang);
        let activeVisualizationIndex;
        if (activeRouteIndex !== undefined) {
          const relevantVisualizations = Object.entries(visualizations)
          .filter(([id, params]) => params.sectionIndex === activeRouteIndex)
          .map(t => t[1])
          let activeVisualization;
          for (let index = relevantVisualizations.length - 1 ; index >= 0 ; index--) {
            const params = relevantVisualizations[index];
            const {ref} = params;
            if (ref.current) {
              const { y: initialVisY } = ref.current.getBoundingClientRect();          
              const bodyRect = document.body.getBoundingClientRect();
              
              const visY = initialVisY + window.scrollY 
              if (y > visY) {
                activeVisualization = params;
                activeVisualizationIndex = index;
                break;
              }
            }
          }
          setActiveVisualization(activeVisualization);
        }
        if (activeSection === undefined || activeSection === '' || activeSection !== id) {
          history.push({
            pathname: `/${lang}/${id}`
          })
        }
      } else if (activeSection) {
        // const newParams = new URLSearchParams({...search, activeSection: ''}).toString();
        // history.push({search: newParams})
        history.push({
          pathname: `/${lang}`
        })
      }
    };
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };

  }, [visualizations])

  return (
    <PresentationContext.Provider
      value={{
        presentationMode: true,
        activeVisualization
      }}
    >
      <div ref={scrollRef} id="presentation-wrapper">
        <Header lang={lang} routes={routes} />
        <main>
          {
            routes.map((route, index) => {
              const {
                // title,
                route: inputRoute,
                contents,
                data,
                // Component: ThatComponent,
                contentsCompiled
              } = route;
              const id = buildRouteId(index, route, lang);
              const Content = contentsCompiled[lang];
              const onRegisterVisualization = (id, params) => {
                // const currentVisualizations = [...visualizations];
                // currentVisualizations[index] = Array.isArray(currentVisualizations[index]) ?
                // [
                //   ...currentVisualizations[index],
                //   params
                // ]
                // : [params];
                const finalParams = {
                  ...params,
                  sectionIndex: index
                }
                setVisualizations({...visualizations, [id]: finalParams});
              }
              return (
                <VisualizationControlContext.Provider
                  value={{
                    onVisualizationUpdate: console.log,
                    onRegisterVisualization,
                    onUnregisterVisualization: console.log,
                    focusedVisualizationId: console.log,
                    setFocusedVisualizationId: console.log,
                    visualizationParams: {
                      // graphType,
                      // useRelativeScale,

                      // xVariable,
                      // xLabelVariable,
                      // yVariable,

                      // reverseX,
                      // reverseY,

                      // sizeVariable,
                      // colorVariable,

                      // searchString,
                      // colorPalette,

                      // filters,
                      // filtersModeAnd,

                      // title,
                      // legend,
                      // normalizeY
                    }
                  }}
                >
                  <section style={{ background: id === activeSection ? 'pink' : undefined }} ref={sectionsRef.current[index]} key={index}>
                    <Content />
                  </section>
                </VisualizationControlContext.Provider>
              )
            })
          }
        </main>
        <aside>
          visualisation
        </aside>
        <Footer />
      </div>
    </PresentationContext.Provider>
  )
}

export default PresentationWrapper;