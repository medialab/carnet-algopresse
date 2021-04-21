import GraphAnnotation from './components/GraphAnnotation';
import IceCreamAnnotation from './components/IceCreamAnnotation';

const routes = [
  {
    title: 'Graphe des critiques anglophones',
    route: '/graph-critic-en',
    contents: 'graph-critics.mdx',
    data: 'Graph_Critic_EN_algopress_webV2.gexf',
    Component: GraphAnnotation
  },
  {
    title: 'Analyse des dates (fichier "date_ner_tfidf_v3")',
    route: '/dates-analysis',
    contents: 'dates-analysis.mdx',
    data: 'date_ner_tfidf_v3.tsv',
    Component: IceCreamAnnotation
  },
  {
    title: 'Analyse des verbes (fichier "df_AB_tfidf_verbs_freq_count.csv")',
    route: '/verbs-analysis',
    contents: 'verbs-analysis.mdx',
    data: 'df_AB_tfidf_verbs_freq_count.csv',
    Component: IceCreamAnnotation
  }
]

export default routes;