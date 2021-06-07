import React, { useState } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  NavLink as Link,
  Redirect,
  useHistory,
} from "react-router-dom";

import './Edition.scss';
import './Presentation.scss';

import { LanguageContext } from './contexts';


import { repository } from '../package.json';

import DataLoader from './components/DataLoader';
import PresentationContainer from './components/PresentationWrapper';

import routes from './summary'

const LANGUAGES = ['fr', 'en'];



function App() {

  const history = useHistory();
  const [lang, setLang] = useState('fr');

  const renderRoute = ({
    data,
    contentsURL,
    Content,
    ThatComponent,
    prevPage,
    nextPage
  }) => (
    <DataLoader url={data ? `${process.env.PUBLIC_URL}/data/${data}` : undefined}>
      {
        data => (
          <ThatComponent
            {
            ...{
              contentsURL,
              Content,
              prevPage,
              nextPage,
              data
            }
            }
          />
        )
      }
    </DataLoader>
  );

  const onLangChange = (ln) => {
    if (ln !== lang) {
      const otherLang = lang;
      const pathOtherLang = history.location.pathname.split('/').pop();
      const routeItem = routes.find(route => {
        return route.route[otherLang] === pathOtherLang;
      });
      setLang(ln);
      if (routeItem) {
        history.push(`/edition/${ln}/${routeItem.route[ln]}`);

      }
    }

  }

  const Edition = ({match}) => {
    return (
      <div id="edition-wrapper">
      <nav>
            <ul>
              {
                routes.map(({ title, route: inputRoute }, index) => {
                  const route = `${match.path}/${lang}/${inputRoute[lang]}`
                  return (
                    <li key={index} className="navitem-container">
                      <Link to={route}>
                        {index}. {title[lang]}
                      </Link>
                    </li>
                  )
                })
              }
              <li className="lang-toggle">
                <button
                  className={lang === 'fr' ? 'is-active' : ''}
                  onClick={() => onLangChange('fr')}
                >fr</button>
                <button
                  className={lang === 'en' ? 'is-active' : ''}
                  onClick={() => onLangChange('en')}
                >en</button>
              </li>
            </ul>
          </nav>
          <main>
            <Switch>
              {
                LANGUAGES.map(lang => {
                  return routes.map(({
                    // title,
                    route: inputRoute,
                    contents,
                    data,
                    Component: ThatComponent
                  }, index) => {
                    const route = `${match.path}/${lang}/${inputRoute[lang]}`;
                    const prevPage = index > 0 ? routes[index - 1] : undefined;
                    const nextPage = index < routes.length - 1 ? routes[index + 1] : undefined;
                    const Content = React.lazy(() => import(`!babel-loader!mdx-loader!./contents/${lang}/${contents[lang]}`))
                    const contentsURL = `${repository}/blob/main/src/contents/${lang}/${contents[lang]}`;
                    return (
                      <Route key={index} path={route}>
                        {renderRoute({ data, contentsURL, Content, ThatComponent, prevPage, nextPage })}
                      </Route>
                    )
                  })
                })
              }
              <Redirect to={`${match.path}/fr/${routes[0].route['fr']}`} />
            </Switch>
          </main>
      </div>
    )
  }
  return (
    <LanguageContext.Provider value={{ lang, onLangChange }}>
        <Route path="/edition" component={Edition} />
        <Route path="/publication/:lang/:section?/:activeVisualizationIndex?" component={PresentationContainer} />
        <Redirect to={`/publication/fr/`} />
    </LanguageContext.Provider>
  );
}


export default function Wrapper() {
  return (
    <Router>
      <App />
    </Router>
  )
}