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

import routesData from './summary'


export default function App() {
  const renderRoute = ({data, contentsURL, Content, ThatComponent}) => (
      <DataLoader url={data ? `${process.env.PUBLIC_URL}/data/${data}` : undefined}>
        {
          data => (
            <ThatComponent
              {
                ...{
                  contentsURL,
                  Content,
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
              routesData.map(({title, route}, index) => (
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
              routesData.map(({
                // title,
                route, 
                contents,
                data,
                Component: ThatComponent
              }, index) => {
                const Content = React.lazy(() => import(`!babel-loader!mdx-loader!./contents/${contents}`))
                const contentsURL = `${repository}/blob/main/src/contents/${contents}`;
                return (
                  <Route key={index} path={route}>
                    {renderRoute({data, contentsURL, Content, ThatComponent})}
                  </Route>
                )
              } )
              
            }
            <Redirect to={routesData[0].route} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}
