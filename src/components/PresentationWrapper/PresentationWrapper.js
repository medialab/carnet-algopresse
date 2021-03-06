import React, { useRef, useEffect, useState, createRef, useReducer } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { csvParse, tsvParse } from 'd3-dsv';
import cx from 'classnames';
import { useScrollYPosition } from 'react-use-scroll-position';

import Header from '../Header';
import Footer from '../Footer';
import Loader from '../Loader';
import VisualizationController from '../VisualizationController';


import { VisualizationControlContext, PresentationContext } from '../../contexts'
// import {useDebouncedEffect} from '../../helpers/hooks';

import routes from '../../summary';
import { omit } from 'lodash-es';
import { useDebounce } from '../../helpers/hooks';

const buildRouteId = (_index, route, lang) => `${encodeURIComponent(route.route[lang].toLowerCase())}`;

const Sections = ({
  routes,
  lang,
  setVisualizations,
  visualizations,
  activeSectionIndex,
  sectionsRef
}) => {
  return (
    <main>
      {
        routes
        .map((route, index) => {
          if (route.hideInContents) {
            return null;
          }
          const {
            data,
            contentsCompiled
          } = route;
          const Content = contentsCompiled[lang];
          const onRegisterVisualization = (id, params) => {
            const finalParams = {
              ...params,
              sectionIndex: index,
              data
            }
            setTimeout(() => setVisualizations({ ...visualizations, [id]: finalParams }));
          }
          const onUnregisterVisualization = id => {
            setVisualizations(omit(visualizations, [id]))
          }
          return (
            <VisualizationControlContext.Provider
              key={index}
              value={{
                onRegisterVisualization,
                onUnregisterVisualization,
              }}
            >
              <section className={cx("section-container", { 'is-active': index === activeSectionIndex, 'has-visualization': data !== undefined })} ref={sectionsRef.current[index]}>
                <Content />
              </section>
            </VisualizationControlContext.Provider>
          )
        })
      }
    </main>
  )
}

const PresentationWrapper = ({ match: { params } }) => {
  const { lang, /*sectionId, visualizationIndex*/ } = params;
  const sectionsRef = useRef(routes.map(() => createRef()));

  const [activeVisualization, setActiveVisualization] = useState(undefined);
  const [activeVisualizationIndex, setActiveVisualizationIndex] = useState(undefined);
  const [activeSection, setActiveSection] = useState(undefined);
  const [activeSectionIndex, setActiveSectionIndex] = useState(undefined);

  const [datasets, setDatasets] = useState({})
  const [loadingFraction, setLoadingFraction] = useState(0);
  const history = useHistory();
  const [inHeader, setInHeader] = useState(true);
  const [inFooter, setInFooter] = useState(false);

  const [visualizations, setVisualizations] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {}
  )

  const scrollRef = useRef(null);
  const liveScrollY = useScrollYPosition();
  const scrollY = useDebounce(liveScrollY, 100);

  /**
   * Scroll on coumponent mount
   */
  /*useEffect(() => {
    // waiting for visualizations
    setTimeout(() => {
      if (sectionId !== undefined) {
        let newSection;
        let newSectionIndex;
        routes.find((route, routeIndex) => {
          const id = buildRouteId(routeIndex, route, lang);
          if (id === sectionId) {
            newSection = route;
            newSectionIndex = routeIndex;
            return true;
          }
          return false;
        });
        setActiveSection(newSection);
        setActiveSectionIndex(newSectionIndex);
        setInHeader(false);
        let relevantVisualization;
        if (visualizationIndex !== undefined) {
          const relevantVisualizations = Object.entries(visualizations)
            .filter(([id, params]) => params.sectionIndex === +newSectionIndex)
            .map(t => t[1]);
          relevantVisualization = +visualizationIndex < relevantVisualizations.length ? relevantVisualizations[+visualizationIndex] : undefined;
          if (relevantVisualization) {
            setActiveVisualizationIndex(+visualizationIndex);
            setActiveVisualization(relevantVisualization);
            const y = relevantVisualization.ref.current ? relevantVisualization.ref.current.getBoundingClientRect().y : 0;
            const bodyRect = document.body.getBoundingClientRect();
            const visY = y - bodyRect.top;
            window.scrollTo({
              left: 0,
              top: visY - window.innerHeight / 2 + 10,
            });
          }
        }
        if (!relevantVisualization) {
          const el = sectionsRef.current[newSectionIndex];
          if (el.current) {
            const y = el.current.getBoundingClientRect().y;
            const bodyRect = document.body.getBoundingClientRect();
            const sectionY = y - bodyRect.top;
            window.scrollTo({
              left: 0,
              top: sectionY,
            })
          }
        }

      }
    }, 1000);
  }, [])*//* eslint react-hooks/exhaustive-deps : 0 */
  /**
   * Route update
   */
  useEffect(() => {
    if (activeSection) {
      const id = buildRouteId(activeSectionIndex, activeSection, lang);
      history.push({
        pathname: `/publication/${lang}/${id}${activeVisualizationIndex !== undefined ? '/' + activeVisualizationIndex : ''}`
      })
    }
  }, [activeVisualizationIndex, activeSection, activeSectionIndex, lang])

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
                resolve({ ...res, [data]: loadedData })
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



  /**
   * Scrollytelling managmeent
   */
  useEffect(() => {
    const DISPLACE_Y = window.innerHeight * .5;
    const y = scrollY + DISPLACE_Y;
    let newActiveRouteIndex;
    let newActiveVisualizationIndex;
    let newActiveRoute;
    let newActiveVisualization;

    // find active section
    sectionsRef.current.find((ref, index) => {
      
      if (ref.current) {
        const { y: initialSectionY, height } = ref.current.getBoundingClientRect();
        const bodyRect = document.body.getBoundingClientRect();
        const sectionY = initialSectionY - bodyRect.top;

        if (index === 1 && y > sectionY && inHeader) {
          setInHeader(false);
        } else if (index === 1 && y < sectionY && !inHeader) {
          setInHeader(true);
        }
        if (index === sectionsRef.current.length - 1 && y > sectionY + height && !inFooter) {
          setInFooter(true);
        } else if (inFooter) {
          setInFooter(false);
        }
        if (y > sectionY && y < sectionY + height) {
          newActiveRouteIndex = index;
          newActiveRoute = routes[index];
          return true;
        }
      }
      return false;
    });
    if (activeSectionIndex !== newActiveRouteIndex) {
      setActiveSectionIndex(newActiveRouteIndex);
      setActiveSection(newActiveRoute);
    }
    if (newActiveRouteIndex !== undefined) {
      // const id = buildRouteId(newActiveRouteIndex, newRoute, lang);
      // find active visualization
      const relevantVisualizations = Object.entries(visualizations)
        .filter(([id, params]) => params.sectionIndex === newActiveRouteIndex)
        .map(t => t[1])
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
      if (relevantVisualizations.length && newActiveVisualization === undefined) {
        newActiveVisualization = relevantVisualizations[0];
        newActiveVisualizationIndex = 0;
      }
      if (activeVisualizationIndex !== newActiveVisualizationIndex || activeSectionIndex !== newActiveRouteIndex) {
        setActiveVisualization(newActiveVisualization);
        setActiveVisualizationIndex(newActiveVisualizationIndex);
      }
    } else {
      if (activeVisualization) {
        setActiveVisualization(undefined);
        setActiveVisualizationIndex(undefined);
      }
    }
  }, [scrollY]);

  const preventScroll = e => {
    e.preventScroll();
    e.stopPropagation();
    e.preventDefault();
  }

  const handleRouteNav = index => {
    setActiveVisualization(undefined);
    setActiveSectionIndex(index);
    setActiveSection(routes[index]);
    let relevantVisualizations = Object.entries(visualizations)
      .filter(([id, params]) => params.sectionIndex === index)
      .map(t => t[1]);
    setActiveVisualization(relevantVisualizations.length ? relevantVisualizations[0] : undefined);
    setActiveVisualizationIndex(relevantVisualizations.length ? 0 : undefined);

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
  const handleScrollToFirstSection = () => handleRouteNav(0);
  const handleBlockClick = (_id, ref) => {
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
    setActiveVisualization(undefined);
    setActiveVisualizationIndex(undefined);
    setActiveSection(undefined);
    setActiveSectionIndex(undefined);
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
          inFooter={inFooter}
          activeSectionIndex={activeSectionIndex}
          loadingFraction={loadingFraction}
          graphData={datasets && datasets['Graph_Critic_EN_algopress_webV2.gexf']}
          onScrollToTop={handleScrollToTop}
          onScrollToFirstSection={handleScrollToFirstSection}
        />
        <Footer />
        <Sections
          {
          ...{
            routes,
            lang,
            setVisualizations,
            visualizations,
            activeSectionIndex,
            sectionsRef
          }
          }
        />
        <aside onScroll={preventScroll} className={cx('visualization-container', { 'is-visible': !(inHeader || inFooter) })}>
          {
            datasets ?
            <VisualizationController
              datasets={datasets}
              activeVisualization={activeVisualization}
              visualizations={visualizations}
              loadingFraction={loadingFraction}
            />
            :
            <Loader percentsLoaded={loadingFraction * 100} />
          }
        </aside>
        <Footer inBottom />
      </div>
    </PresentationContext.Provider>
  )
}

export default PresentationWrapper;