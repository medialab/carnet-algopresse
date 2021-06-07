import React, { useRef, useEffect, useState, createRef, useReducer } from 'react';

import { useHistory } from 'react-router-dom';

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

  /**
   * Scroll on coumponent mount
   */
  useEffect(() => {
    if (activeSection) {
      let activeSectionIndex;
      routes.find((route, index) => {
        const id = buildRouteId(index, route, lang);
        if (id === activeSection) {
          activeSectionIndex = index;
          return true;
        }
        return false;
      });
      if (activeSectionIndex) {
        let relevantVisualization;
        if (activeVisualizationIndex) {
          const relevantVisualizations = Object.entries(visualizations)
          .filter(([id, params]) => params.sectionIndex === activeSectionIndex)
          .map(t => t[1]);
          const relevantVisualization = +activeSectionIndex < relevantVisualizations.length ? relevantVisualizations[activeSectionIndex]: undefined;
          if (relevantVisualization) {
            const y = relevantVisualization.ref.current.getBoundingClientRect().y;
            const bodyRect = document.body.getBoundingClientRect();
            const visY = y - bodyRect.top;
            window.scrollTo(0, visY - window.innerHeight / 2)
          }
        }
        if (!relevantVisualization) {
          const el = sectionsRef.current[activeSectionIndex];
          if (el.current) {
            const y = el.current.getBoundingClientRect().y;
            const bodyRect = document.body.getBoundingClientRect();
            const sectionY = y - bodyRect.top;
            window.scrollTo(0, sectionY - window.innerHeight / 2)
          }
        }
        
      }
    }
  }, [])/* eslint react-hooks/exhaustive-deps : 0 */
  
  /**
   * Scrollytelling managmeent
   */
  useEffect(() => {
    const listener = e => {
      const bodyPos = document.body.getBoundingClientRect();
      const y = Math.abs(bodyPos.top) + window.innerHeight / 2;
      let activeRouteIndex;
      let newActiveVisualizationIndex;

      // find active section
      sectionsRef.current.find((ref, index) => {
        if (ref.current) {
          const { y: initialSectionY, height } = ref.current.getBoundingClientRect();
          const bodyRect = document.body.getBoundingClientRect();
          const sectionY = initialSectionY - bodyRect.top;
          if (y > sectionY && y < sectionY + height) {
            activeRouteIndex = index;
            return true;
          }
        }
        return false;
      });
      if (activeRouteIndex !== undefined) {
        const newRoute = routes[activeRouteIndex];
        const id = buildRouteId(activeRouteIndex, newRoute, lang);
        // find active visualization
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
              const visY = initialVisY + window.scrollY;
              if (y > visY) {
                activeVisualization = params;
                newActiveVisualizationIndex = index;
                break;
              }
            }
          }
          setActiveVisualization(activeVisualization);
        }
        if (activeSection === undefined || activeSection === '' || activeSection !== id) {
          history.push({
            pathname: `/${lang}/${id}${activeVisualizationIndex !== undefined ? '/' + newActiveVisualizationIndex : ''}`
          })
        } else if (activeSection && +activeVisualizationIndex !== +newActiveVisualizationIndex && newActiveVisualizationIndex !== undefined) {
          history.push({
            pathname: `/${lang}/${id}${newActiveVisualizationIndex !== undefined ? '/' + newActiveVisualizationIndex : ''}`
          })
        }
      } else if (!activeSection) {
        history.push({
          pathname: `/${lang}`
        })
      }
    };
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };

  }, [visualizations, lang, activeVisualizationIndex, activeSection, history])

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
                // route: inputRoute,
                // contents,
                data,
                // Component: ThatComponent,
                contentsCompiled
              } = route;
              const id = buildRouteId(index, route, lang);
              const Content = contentsCompiled[lang];
              const onRegisterVisualization = (id, params) => {
                const finalParams = {
                  ...params,
                  sectionIndex: index,
                  data
                }
                setVisualizations({...visualizations, [id]: finalParams});
              }
              return (
                <VisualizationControlContext.Provider
                  key={index}
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
                  <section style={{ background: id === activeSection ? 'pink' : undefined }} ref={sectionsRef.current[index]}>
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