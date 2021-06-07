import React, {useContext, useMemo, Suspense} from 'react';
import {NavLink} from 'react-router-dom';
import Helmet from 'react-helmet';

import Nav from '../Nav';

import frMetadata from '../../contents/fr/metadata.json';
import enMetadata from '../../contents/en/metadata.json';
import {homepage} from '../../../package.json';

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

const Header = ({lang, routes}) => {
  const meta = lang === 'fr' ? frMetadata : enMetadata;
  const {
    title,
    description,
    creators,
    generalAuthor,
    publicationDate
  } = meta;
  return (
    <header>
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
        <Nav lang={lang} routes={routes} deployed />
        {/* réseau */}
      </div>
    </header>
  )
}

export default Header;