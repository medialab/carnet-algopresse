import React, {useMemo, useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import Helmet from 'react-helmet';
import Graph from 'graphology';
import gexf from 'graphology-gexf';
import {extent} from 'd3-array';
import cx from 'classnames';

import Loader from '../Loader';
import Nav from '../Nav';

import frMetadata from '../../contents/fr/metadata';
import enMetadata from '../../contents/en/metadata';
import {homepage} from '../../../package.json';

import {GraphContainer} from '../GraphAnnotation/GraphContainer'

const GraphWrapper = ({data, ...props}) => {
  const [cameraPosition, setCameraPosition] = useState({x: props.x, y: props.y, ratio: props.ratio})
  useEffect(() => {
    setCameraPosition({
      x: props.x, y: props.y, ratio: props.ratio
    })
  }, [props.x, props.y, props.ratio])
  const graph = useMemo(() => {
    return gexf.parse(Graph, data);
  }, [data]);

  const onCameraUpdate = (pos) => {
    setCameraPosition(pos);
  }
  let sizes = [];
  graph.forEachNode((node, attributes) => {
    sizes.push(attributes.size);
  })
  const sizeExtent = extent(sizes);
  return (
    <div style={{width: props.width, height: props.height}}>
    <GraphContainer
      {...{
        ...props,
        graph,
        extents: {
          nodeSize: {
            min: sizeExtent[0],
            max: sizeExtent[1]
          }
        },
        onCameraUpdate,
        cameraPosition,
      }
      }
    />
    </div>
  );
}

const LanguageToggler = ({lang}) => {
  return (
    <ul className="LanguageToggler">
      <li>
        <NavLink to="/publication/fr">
          fr
        </NavLink>
      </li>
      <li>
        <NavLink to="/publication/en">
          en
        </NavLink>
      </li>
    </ul>
  )
}

const Header = ({
  lang, 
  routes,
  onRouteNav,
  isVisible,
  activeSectionIndex,
  graphData,
  loadingFraction,
  onScrollToTop,
  onScrollToFirstSection
}) => {
  const meta = lang === 'fr' ? frMetadata : enMetadata;
  const {
    title,
    description,
    creators,
    generalAuthor,
    publicationDate
  } = meta;
  const preventScroll = e => {
    e.preventScroll();
    e.stopPropagation();
    e.preventDefault();
  }
  const Chapo = routes[0].contentsCompiled[lang];
  return (
    <header className={cx("Header", {'is-visible': isVisible})}>
      <Helmet>
        <html lang={lang} />
        <meta charSet={ 'UTF-8' } />
        <title>{title}</title>
        {/*<!-- META DUBLIN CORE -->*/}
        <meta
          name={ 'DC.Title' }
          lang={ 'fr' }
          content={ title }
        />
        <meta
          name={ 'DC.Date.created' }
          schema={ 'W3CDTF' }
          content={ publicationDate }
        />

        {
          creators.reduce((total, group) => {
            return group.people.reduce((total2, people) => {
              return [
                ...total2,
                <meta
                  key={ people }
                  name={ 'DC.creator' }
                  content={ `people` }
                />
              ]
            }, total)
          }, [])
          
        }
        <meta
          name={ 'DC.issued' }
          lang={ 'fr' }
          content={ publicationDate }
        />
        <meta
          name={ 'DC.Date.created' }
          schema={ 'W3CDTF' }
          content={ publicationDate }
        />
        {
            // tags.map((thatTag, index) => <meta key={index} name="DC.subject" xml:lang="en-GB" content={thatTag} />)
          }
        {/*<!-- END META DUBLIN CORE -->*/}

        {/*<!-- REGULAR META -->*/}
        <meta
          name={ 'author' }
          content={ 
            creators.reduce((total, group) => {
              return group.people.reduce((total2, people) => {
                return [
                  ...total2,
                  people
                ]
              }, total)
            }, []).join(', ')
           }
        />
        <meta
          name={ 'description' }
          content={ description }
        />
        <meta
          name={ 'viewport' }
          content={ 'user-scalable=no,width=device-width' }
        />
        {/*<!-- END REGULAR META -->*/}

        {/*<!-- META TWITTER -->*/}
        <meta
          name={ 'twitter:card' }
          value={ 'summary' }
        />
        <meta
          name={ 'twitter:site' }
          content={ homepage }
        />
        <meta
          name={ 'twitter:title' }
          content={ title }
        />
        <meta
          name={ 'twitter:description' }
          content={ description }
        />
        {/*<!-- todo : Twitter Summary card images must be at least 200x200px -->*/}
        {/*<meta name="twitter:image" content="xxx">*/}
        {/*<!-- end meta twitter-->*/}

        {/*<!-- META GOOGLE + -->*/}
        <meta
          itemProp={ 'name' }
          content={ title }
        />
        <meta
          itemProp={ 'description' }
          content={ description }
        />
        {/*<meta itemProp="image" content="https://peritex.surge.sh/bulgur-rs.png">*/}
        {/*<!-- END META GOOGLE + -->*/}

        {/*<!-- META OPEN GRAPH / FACEBOOK -->*/}
        <meta
          property={ 'og:title' }
          content={ title }
        />
        <meta
          property={ 'og:type' }
          content={ 'website' }
        />
        <meta
          property={ 'og:url' }
          content={ homepage }
        />
        <meta
          property={ 'og:description' }
          content={ description }
        />
      </Helmet>
      <LanguageToggler lang={lang} />
      <div onClick={onScrollToTop} className="running-title">
        <h1>{title}</h1>
      </div>
      <div className="header-main">
           <h2 className="general-author">
             {generalAuthor}
           </h2>
           <div className="main-title-container">
            <h1 className="main-title">
              {title}
            </h1>
           </div>
           <ul className="creators">
             {
               creators.map(({role, people}) => (
                 <li key={role}>
                   <div className="role">{role}</div>
                   <ul className="people-container">
                     {
                       people.map(person => (
                         <li className="person" key={person}>{person}</li>
                       ))
                     }
                   </ul>
                 </li>
               ))
             }
           </ul>
           <div className="chapo">
             <Chapo />
           </div>
      </div>
      <div className="header-secondary">
        {/* Summary */}
        <Nav 
          lang={lang} 
          onRouteNav={onRouteNav} 
          routes={routes} 
          isDeployed={true}
          activeSectionIndex={activeSectionIndex}
        />
        <Nav 
          lang={lang} 
          onRouteNav={onRouteNav} 
          routes={routes} 
          isDeployed={false}
          isHidden={isVisible}
          activeSectionIndex={activeSectionIndex}
        />
        {/* réseau */}
        <div
          onScroll={preventScroll}
          className={cx("GraphWrapperContainer", {'has-visualization': graphData !== undefined})}
        >
          {
            graphData ?
            <GraphWrapper
              data={graphData}
              presentationMode={true}
              width={500}
              height={500}
              x={0.5} 
              y={0.5} 
              ratio={0.8} 
              displayAllLabels={true}
              nodeColorVariable={'cluster_rename'} 
              nodeLabelVariable={'cluster_label'} 
              labelDensity={1} 
              colorPalette={{"Future_of_AI":"#f17325","Profiling_Algorthms":"#2cab57","Job_Automation":"#f5253e","Market_&_Prices":"#6bc06c","Predictive_Algorithms":"#adcd24","Web_Algorithms":"#d8dd0d","Facial_Recognition":"#54a5e8","Voice_Assistant":"#106f88","DeepDream_Nightmares":"#e1194a","Health_Algorithms":"#fa8566","Autonomous_Cars":"#e9c33f","Game_&_Education":"#a1943c","Chatbot":"#32968a","Consumer_&_Copyright":"#f49c57","Killer_Robots":"#4650ee","Robo-Advisers":"#19d2d4","Sex_Robots":"#e94d6c","Deepfake":"#4f990f","Image_Search":"#2ea2b3","Scientific_Research":"#cff157","Music":"#18a1bc","Email":"#ffb7e0","Deep_Voice":"#799c89"}} 
            />
            :
            <Loader percentsLoaded={loadingFraction * 100} />
          }
        
        </div>
        
      </div>
      <button onClick={onScrollToFirstSection} className="starter-button">
      ⌄
      </button>
    </header>
  )
}

export default Header;