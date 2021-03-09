import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  NavLink as Link
} from "react-router-dom";

import './App.css';

import GraphCritic from './slides/GraphCritic';
import DatesAnalysis from './slides/DatesAnalysis';
import VerbsAnalysis from './slides/VerbsAnalysis';

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
    title: 'Graphe des critiques anglophones',
    route: '/graph-critic-en',
    Component: () => <GraphCritic />
  },
  {
    title: 'Analyse des dates (fichier "date_ner_tfidf_v3")',
    route: '/dates-analysis',
    Component: () => <DatesAnalysis />
  },
  {
    title: 'Analyse des dates (fichier "df_AB_tfidf_verbs_freq_count.csv")',
    route: '/verbs-analysis',
    Component: () => <VerbsAnalysis />
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
