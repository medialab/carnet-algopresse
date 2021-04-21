import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  NavLink as Link
} from "react-router-dom";

import './App.css';

import {repository} from '../package.json';

import DataLoader from './components/DataLoader';

import routes from './summary'

const Home = () => {
  return (
    <div>
      <h1>Carnet algopresse</h1>
      <p>
        Ce site est dédié à l'échaffaudage collectif de la publication algopresse. Il sert de point de rencontre entre l'écriture, la conception graphique et la conception interactive. Il fonctionne en tandem avec le répertoire github dont il est issu.
      </p>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <div id="wrapper">
        <nav>
          <ul>
            <li>
              <Link to="/">Accueil</Link>
            </li>
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
                const Content = require(`!babel-loader!mdx-loader!./slides/${contents}`).default
                const contentsURL = `${repository}/blob/main/src/slides/${contents}`;
                return (
                <Route key={index} path={route}>
                  <DataLoader url={`${process.env.PUBLIC_URL}/data/${data}`}>
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
                </Route>
                )
              } )
              
            }
            <Route path="/">
              <Home />
            </Route>
            
          </Switch>
        </main>
      </div>
    </Router>
  );
}
