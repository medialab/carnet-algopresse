import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  NavLink as Link
} from "react-router-dom";

import './App.css';

import ExampleMiserables from './slides/ExampleMiserables';
import ExampleRio from './slides/ExampleRio';
import AlgoPresse from './slides/Algopresse';

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

const routes = [
  {
    title: 'Misérables',
    route: '/miserables',
    Component: () => <ExampleMiserables />
  },
  {
    title: 'RIO',
    route: '/rio',
    Component: () => <ExampleRio />
  },
  {
    title: 'Algopresse',
    route: '/algopresse',
    Component: () => <AlgoPresse />
  },
  
]

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
              routes.map(({route, Component: ThatComponent}, index) => (
                <Route key={index} path={route}>
                  <ThatComponent />
                </Route>
              ))
              
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
