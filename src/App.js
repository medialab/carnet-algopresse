import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  NavLink as Link,
  Redirect,
} from "react-router-dom";

import './App.css';

import {repository} from '../package.json';

import DataLoader from './components/DataLoader';

import routes from './summary'


export default function App() {
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
  )
  return (
    <Router>
      <div id="wrapper">
        <nav>
          <ul>
            {
              routes.map(({title, route}, index) => (
                <li key={index} className="navitem-container">
                  <Link to={route}>
                    {title}
                  </Link>
                </li>
              ))
            }
          </ul>
        </nav>
        <main>
          <Switch>
            {
              routes.map(({
                // title,
                route, 
                contents,
                data,
                Component: ThatComponent
              }, index) => {
                const prevPage = index > 0 ? routes[index - 1] : undefined;
                const nextPage = index < routes.length - 1 ? routes[index + 1] : undefined;
                const Content = React.lazy(() => import(`!babel-loader!mdx-loader!./contents/${contents}`))
                const contentsURL = `${repository}/blob/main/src/contents/${contents}`;
                return (
                  <Route key={index} path={route}>
                    {renderRoute({data, contentsURL, Content, ThatComponent, prevPage, nextPage})}
                  </Route>
                )
              } )
              
            }
            <Redirect to={routes[0].route} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}
