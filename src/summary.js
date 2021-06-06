import GraphAnnotation from './components/GraphAnnotation';
import IceCreamAnnotation from './components/IceCreamAnnotation';
import LinearGraphAnnotation from './components/LinearGraphAnnotation';
import PlainPage from './components/PlainPage';

const routes = [
  {
    title: {
      fr: 'Introduction',
      en: 'Introduction',
    },
    route: {
      fr: 'introduction',
      en: 'introduction',
    },
    contents: {
      fr: '00_home.mdx',
      en: '00_home.mdx',
    },
    Component: PlainPage
  },
  {
    title: {
      fr: 'Quelle est la couverture médiatique de l\'IA ?',
      en: '1. Media coverage',
    },
    route: {
      fr: '01-couverture-media',
      en: '01-media-coverage',
    },
    contents: {
      fr: '01_couverture_media.mdx',
      en: '01_couverture_media.mdx'
    },
    Component: LinearGraphAnnotation,
    data: '4average_clusters_unpivoted.csv'
  },
  {
    title: {
      fr: 'Quelle est la couverture médiatique de l\'IA ?',
      en: '2. Detecting critiques',
    },
    route: {
      fr: '02-detecter-critiques',
      en: '02-detect-critiques'
    },
    contents: {
      fr: '02_detectcritic.mdx',
      en: '02_detectcritic.mdx'
    },
    Component: LinearGraphAnnotation,
    data: 'critic_notcritic_unpivoted.csv',
  },
  {
    title: {
      fr: 'Quels sont les thèmes sur lesquels porte la critique ?',
      en: '3. Graph clusters',
    },
    route: {
      fr: '03-graph-clusters',
      en: '03-graph-clusters',
    },
    contents: {
      fr: '03_graphclusters.mdx',
      en: '03_graphclusters.mdx'
    },
    data: 'Graph_Critic_EN_algopress_webV2.gexf',
    Component: GraphAnnotation
  },
  {
    title: {
      fr: 'Comment évolue l’agenda médiatique ?',
      en: '4. Evolution of the mediatic agenda',
    },
    route: {
      fr: '04-timeline-clusters',
      en: '04-timeline-clusters',
    },
    contents: {
      fr: '04_timelineclusters.mdx',
      en: '04_timelineclusters.mdx',
    },
    Component: LinearGraphAnnotation,
    data: '5average_clusters_unpivoted.csv',
  },
  {
    title: {
      fr: 'Qu’est-ce que la topologie du réseau nous apprend de la critique médiatique ?',
      en: '5. Network topology',
    },
    route: {
      fr: '05-topologie',
      en: '05-topology',
    },
    contents: {
      fr: '05_toporobotalgo.mdx',
      en: '05_toporobotalgo.mdx',
    },
    data: 'Graph_Critic_EN_algopress_webV2.gexf',
    Component: GraphAnnotation
  },
  {
    title: {
      fr: 'Qui sont les agents calculateurs ?',
      en: '6. Calculating agents',
    },
    route: {
      fr: '06-agents',
      en: '06-agents',
    },
    contents: {
      fr: '06_explore_entities.mdx',
      en: '06_explore_entities.mdx',
    },
    data: 'Graph_Critic_EN_algopress_webV2.gexf',
    Component: GraphAnnotation
  },
  {
    title: {
      fr: 'Comment sont exprimés les verbes de troubles ?',
      en: '7. Trouble verbs',
    },
    route: {
      fr: '07-verbes',
      en: '07-verbs',
    },
    contents: {
      fr: '07_IssueVERB.mdx',
      en: '07_IssueVERB.mdx',
    },
    data: 'verbs_bin_normalise.csv',
    Component: IceCreamAnnotation
  },
  {
    title: {
      fr: 'Comment est exprimée la temporalité ?',
      en: '8. Temporality',
    },
    route: {
      fr: '08-temporalite',
      en: '08-temporalite',
    },
    contents: {
      fr: '08_NERdate.mdx',
      en: '08_NERdate.mdx',
    },
    Component: IceCreamAnnotation,
    data: 'date_ner_tfidf_v3.csv'
  }
]

export default routes;