import React from 'react';
import {NavLink} from 'react-router-dom';
import Helmet from 'react-helmet';
import {useMemo, useState, useEffect} from 'react';
import Graph from 'graphology';
import gexf from 'graphology-gexf';
import {extent} from 'd3-array';

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
  );
}

const LanguageToggler = ({lang}) => {
  return (
    <ul className="LanguageToggler">
      <li>
        <NavLink to="/fr">
          fr
        </NavLink>
      </li>
      <li>
        <NavLink to="/en">
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
}) => {
  const meta = lang === 'fr' ? frMetadata : enMetadata;
  const {
    title,
    description,
    creators,
    generalAuthor,
    publicationDate
  } = meta;
  return (
    <header className="Header">
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
      <div className="header-main">
           <h2 className="general-author">
             {generalAuthor}
           </h2>
           <h1 className="main-title">
             {title}
           </h1>
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
      </div>
      <div className="header-secondary">
        {/* Summary */}
        <Nav 
          lang={lang} 
          onRouteNav={onRouteNav} 
          routes={routes} 
          isDeployed={isVisible}
          activeSectionIndex={activeSectionIndex}
        />
        {/* réseau */}
        {
          graphData &&
          <div
            style={{
              width: 500,
              height: 500
            }}
          >
          <GraphWrapper
            data={graphData}
            width={500}
            height={500}
            presentationMode={true}
            x={0.4588867805186573} 
            y={0.5190807505798019}
            ratio={0.80}
            nodeColorVariable={'cluster_rename'} 
            nodeLabelVariable={'cluster_label'} 
            labelDensity={1.5} 
            colorPalette={{"Future_of_AI":"#e97f3e","Profiling_Algorthms":"#53cb7b","Job_Automation":"#eb102b","Market_&_Prices":"#d08be8","Predictive_Algorithms":"#a3bf28","Web_Algorithms":"#e7eb2a","Facial_Recognition":"#54a5e8","Voice_Assistant":"#108cac","DeepDream_Nightmares":"#e1194a","Health_Algorithms":"#fa8566","Autonomous_Cars":"#d3a715","Game_&_Education":"#a1943c","Chatbot":"#1b90be","Consumer_&_Copyright":"#f49c57","Killer_Robots":"#4650ee","Robo-Advisers":"#00c8cc","Sex_Robots":"#db7187","Deepfake":"#4f990f","Image_Search":"#6deeff","Scientific_Research":"#cff157","Music":"#18a1bc","Email":"#ffb7e0","Deep_Voice":"#799c89"}}
          />
          </div>
        }
        
      </div>
    </header>
  )
}

export default Header;