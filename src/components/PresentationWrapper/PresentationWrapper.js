import React, { useRef, useEffect, useState, createRef, useReducer } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { csvParse, tsvParse } from 'd3-dsv';
import cx from 'classnames';
import debounce from 'lodash/debounce';
import Header from '../Header';
import Footer from '../Footer';
import Loader from '../Loader';
import VisualizationController from '../VisualizationController';


import { VisualizationControlContext, PresentationContext } from '../../contexts'
// import {parseQuery} from '../../helpers/misc';

import routes from '../../summary'

const buildRouteId = (_index, route, lang) => `${encodeURIComponent(route.route[lang].toLowerCase())}`;

const PresentationWrapper = ({ match: { params } }) => {
  const { lang, section: activeSection, activeVisualizationIndex } = params;
  const sectionsRef = useRef(routes.map(() => createRef()));
  const [activeVisualization, setActiveVisualization] = useState(null);
  const [datasets, setDatasets] = useState({})
  const [loadingFraction, setLoadingFraction] = useState(0);
  const history = useHistory();
  const [inHeader, setInHeader] = useState(true);
  const [inFooter, setInFooter] = useState(false);

  const [visualizations, setVisualizations] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {}
  )
  // let {search} = location;
  // search = parseQuery(search);
  // const {activeSection} = search;

  const scrollRef = useRef(null);

  /**
   * loading all datasets
   */
  useEffect(() => {
    routes.reduce((cur, route, routeIndex) => {
      return cur.then((res) => new Promise((resolve, reject) => {

        const { data } = route;
        const url = data ? `${process.env.PUBLIC_URL}/data/${data}` : undefined;
        if (url) {
          axios.get(url, {
            onDownloadProgress: progressEvent => {
              const status = progressEvent.loaded / progressEvent.total;
              const globalFraction = routeIndex / routes.length;
              setLoadingFraction(globalFraction + status / routes.length);
            }
          })
            .then(({ data: inputData }) => {
              setTimeout(() => {
                let loadedData = inputData;
                if (url.split('.').pop() === 'csv') {
                  loadedData = csvParse(inputData);
                } else if (url.split('.').pop() === 'tsv') {
                  loadedData = tsvParse(inputData);
                }
                resolve({...res, [data]: loadedData})
              })
            })
            .catch(reject)
        } else return resolve(res);

      }))
    }, Promise.resolve({}))
    .then(newDatasets => {
      setLoadingFraction(1);
      setDatasets(newDatasets)
    })
    .catch(console.log)
  }, [])

  let activeSectionIndex;
  if (activeSection) {
      routes.find((route, index) => {
        const id = buildRouteId(index, route, lang);
        if (id === activeSection) {
          activeSectionIndex = index;
          return true;
        }
        return false;
      });
  }

  /**
   * Scroll on coumponent mount
   */
  useEffect(() => {
    if (activeSection) {
      if (activeSectionIndex) {
        setInHeader(false);
        let relevantVisualization;
        if (activeVisualizationIndex) {
          const relevantVisualizations = Object.entries(visualizations)
            .filter(([id, params]) => params.sectionIndex === activeSectionIndex)
            .map(t => t[1]);
          const relevantVisualization = +activeSectionIndex < relevantVisualizations.length ? relevantVisualizations[activeSectionIndex] : undefined;
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
    let listener = e => {
      const bodyPos = document.body.getBoundingClientRect();
      const DISPLACE_Y = window.innerHeight * .5;
      const y = Math.abs(bodyPos.top) + DISPLACE_Y;
      let activeRouteIndex;
      let newActiveVisualizationIndex;

      // find active section
      sectionsRef.current.find((ref, index) => {
        if (ref.current) {
          const { y: initialSectionY, height } = ref.current.getBoundingClientRect();
          const bodyRect = document.body.getBoundingClientRect();
          const sectionY = initialSectionY - bodyRect.top;
          if (index === 0 && y > sectionY && inHeader) {
            setInHeader(false);
          } else if (index === 0 && y < sectionY && !inHeader) {
            setInHeader(true);
          }
          if (index === sectionsRef.current.length - 1 && y > sectionY + height && !inFooter) {
            setInFooter(true);
          } else if (inFooter) {
            setInFooter(false);
          }
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
          let newActiveVisualization;
          for (let index = relevantVisualizations.length - 1; index >= 0; index--) {
            const params = relevantVisualizations[index];
            const { ref } = params;
            if (ref.current) {
              const { y: initialVisY } = ref.current.getBoundingClientRect();
              const visY = initialVisY + window.scrollY;
              if (y > visY) {
                newActiveVisualization = params;
                newActiveVisualizationIndex = index;
                break;
              }
            }
          } 
          if (relevantVisualizations.length && !newActiveVisualization) {
            newActiveVisualization = relevantVisualizations[0];
            newActiveVisualizationIndex = 0;
          }
          setActiveVisualization(newActiveVisualization);
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
      } else {
        history.push({
          pathname: `/${lang}`
        })
      }
    };
    listener = debounce(listener, 100);
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };

  }, [visualizations, lang, activeVisualizationIndex, activeSection, history, inHeader])

  const preventScroll = e => {
    console.log('scroll', e);
    e.preventScroll();
    e.stopPropagation();
    e.preventDefault();
  }
  const handleRouteNav = index => {
    const el = sectionsRef.current[index];
    if (el.current) {
      const y = el.current.getBoundingClientRect().y;
      const bodyRect = document.body.getBoundingClientRect();
      const sectionY = y - bodyRect.top;
      window.scrollTo({
        left: 0, 
        top: sectionY, // - window.innerHeight / 2,
        behavior: 'smooth'
      })
    }
  }
  const handleBlockClick = (id, ref) => {
    if (ref.current) {
      const y = ref.current.getBoundingClientRect().y;
      const bodyRect = document.body.getBoundingClientRect();
      const sectionY = y - bodyRect.top;
      window.scrollTo({
        left: 0, 
        top: sectionY - window.innerHeight / 2 + 5,
        behavior: 'smooth'
      })
    }
  }
  const handleScrollToTop = () => {
    window.scrollTo({
      left: 0, 
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <PresentationContext.Provider
      value={{
        presentationMode: true,
        activeVisualization,
        onBlockClick: handleBlockClick
      }}
    >
      <div ref={scrollRef} id="presentation-wrapper">
        <Header 
          lang={lang} 
          routes={routes} 
          onRouteNav={handleRouteNav} 
          isVisible={inHeader}
          activeSectionIndex={activeSectionIndex}
          loadingFraction={loadingFraction}
          graphData={datasets && datasets['Graph_Critic_EN_algopress_webV2.gexf']}
          onScrollToTop={handleScrollToTop}
        />
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
                setTimeout(() => setVisualizations({ ...visualizations, [id]: finalParams }));
              }
              return (
                <VisualizationControlContext.Provider
                  key={index}
                  value={{
                    // onVisualizationUpdate: console.log,
                    onRegisterVisualization,
                    onUnregisterVisualization: console.log,
                    // focusedVisualizationId: console.log,
                    // setFocusedVisualizationId: console.log,
                    // visualizationParams: {
                    //   // graphType,
                    //   // useRelativeScale,

                    //   // xVariable,
                    //   // xLabelVariable,
                    //   // yVariable,

                    //   // reverseX,
                    //   // reverseY,

                    //   // sizeVariable,
                    //   // colorVariable,

                    //   // searchString,
                    //   // colorPalette,

                    //   // filters,
                    //   // filtersModeAnd,

                    //   // title,
                    //   // legend,
                    //   // normalizeY
                    // }
                  }}
                >
                  <section className={cx("section-container", {'is-active': id === activeSection, 'has-visualization': data !== undefined})} ref={sectionsRef.current[index]}>
                    <Content />
                  </section>
                </VisualizationControlContext.Provider>
              )
            })
          }
        </main>
        <aside onScroll={preventScroll} className={cx('visualization-container', {'is-visible': !inHeader && !inFooter})}>
          {
            datasets ?
            <VisualizationController
              datasets={datasets}
              activeVisualization={activeVisualization}
            />
            :
            <Loader percentsLoaded={loadingFraction * 100} />
          }
        </aside>
        <Footer />
      </div>
    </PresentationContext.Provider>
  )
}

export default PresentationWrapper;