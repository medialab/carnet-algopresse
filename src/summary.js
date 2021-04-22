import GraphAnnotation from './components/GraphAnnotation';
import IceCreamAnnotation from './components/IceCreamAnnotation';
import PlainPage from './components/PlainPage';

const routes = [
  {
    title: 'Introduction',
    route: '/introduction',
    contents: '00_home.mdx',
    Component: PlainPage
  },
  {
    title: '1. Couverture médias',
    route: '/01-couverture-media',
    contents: '01_couverture_media.mdx',
    Component: PlainPage
  },
  {
    title: '2. Détecter les critiques',
    route: '/02-detect-critic',
    contents: '02_detectcritic.mdx',
    Component: PlainPage
  },
  {
    title: '3. Graphe clusters',
    route: '/03-graph-clusters',
    contents: '03_graphclusters.mdx',
    data: 'Graph_Critic_EN_algopress_webV2.gexf',
    Component: GraphAnnotation
  },
  {
    title: '4. Évolution de l\'agenda médiatique',
    route: '/04-timeline-clusters',
    contents: '04_timelineclusters.mdx',
    Component: PlainPage
  },
  {
    title: '5. Topologie du réseau',
    route: '/05-topologie',
    contents: '05_toporobotalgo.mdx',
    data: 'Graph_Critic_EN_algopress_webV2.gexf',
    Component: GraphAnnotation
  },
  {
    title: '6. Agents calculateurs',
    route: '/06-agents',
    contents: '06_explore_entities.mdx',
    data: 'Graph_Critic_EN_algopress_webV2.gexf',
    Component: GraphAnnotation
  },
  {
    title: '7. Verbes de troubles',
    route: '/07-verbs',
    contents: '07_IssueVERB.mdx',
    data: 'df_AB_tfidf_verbs_freq_count.csv',
    Component: IceCreamAnnotation
  },
  {
    title: '8. Temporalité',
    route: '/08-temporalite',
    contents: '08_NERdate.mdx',
    Component: PlainPage
  },
  // {
  //   title: 'Graphe des critiques anglophones',
  //   route: '/graph-critic-en',
  //   contents: 'graph-critics.mdx',
  //   data: 'Graph_Critic_EN_algopress_webV2.gexf',
  //   Component: GraphAnnotation
  // },
  // {
  //   title: 'Analyse des dates (fichier "date_ner_tfidf_v3")',
  //   route: '/dates-analysis',
  //   contents: 'dates-analysis.mdx',
  //   data: 'date_ner_tfidf_v3.tsv',
  //   Component: IceCreamAnnotation
  // },
  // {
  //   title: 'Analyse des verbes (fichier "df_AB_tfidf_verbs_freq_count.csv")',
  //   route: '/verbs-analysis',
  //   contents: 'verbs-analysis.mdx',
  //   data: 'df_AB_tfidf_verbs_freq_count.csv',
  //   Component: IceCreamAnnotation
  // }
]

export default routes;