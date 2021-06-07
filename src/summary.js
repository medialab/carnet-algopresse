import GraphAnnotation from './components/GraphAnnotation';
import IceCreamAnnotation from './components/IceCreamAnnotation';
import LinearGraphAnnotation from './components/LinearGraphAnnotation';
import PlainPage from './components/PlainPage';

import IntroFr from '!babel-loader!mdx-loader!./contents/fr/00_home.mdx'
import Part1Fr from '!babel-loader!mdx-loader!./contents/fr/01_couverture_media.mdx'
import Part2Fr from '!babel-loader!mdx-loader!./contents/fr/02_detectcritic.mdx'
import Part3Fr from '!babel-loader!mdx-loader!./contents/fr/03_graphclusters.mdx'    
import Part4Fr from '!babel-loader!mdx-loader!./contents/fr/04_timelineclusters.mdx'
import Part5Fr from '!babel-loader!mdx-loader!./contents/fr/05_toporobotalgo.mdx'
import Part6Fr from '!babel-loader!mdx-loader!./contents/fr/06_explore_entities.mdx'
import Part7Fr from '!babel-loader!mdx-loader!./contents/fr/07_IssueVERB.mdx'
import Part8Fr from '!babel-loader!mdx-loader!./contents/fr/08_NERdate.mdx'

import IntroEn from '!babel-loader!mdx-loader!./contents/en/00_home.mdx'
import Part1En from '!babel-loader!mdx-loader!./contents/en/01_couverture_media.mdx'
import Part2En from '!babel-loader!mdx-loader!./contents/en/02_detectcritic.mdx'
import Part3En from '!babel-loader!mdx-loader!./contents/en/03_graphclusters.mdx'    
import Part4En from '!babel-loader!mdx-loader!./contents/en/04_timelineclusters.mdx'
import Part5En from '!babel-loader!mdx-loader!./contents/en/05_toporobotalgo.mdx'
import Part6En from '!babel-loader!mdx-loader!./contents/en/06_explore_entities.mdx'
import Part7En from '!babel-loader!mdx-loader!./contents/en/07_IssueVERB.mdx'
import Part8En from '!babel-loader!mdx-loader!./contents/en/08_NERdate.mdx'

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
    contentsCompiled: {
      fr: () => <IntroFr />,
      en: () => <IntroEn />
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
    contentsCompiled: {
      fr: () => <Part1Fr />,
      en: () => <Part1En />
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
    contentsCompiled: {
      fr: () => <Part2Fr />,
      en: () => <Part2En />
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
    contentsCompiled: {
      fr: () => <Part3Fr />,
      en: () => <Part3En />
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
    contentsCompiled: {
      fr: () => <Part4Fr />,
      en: () => <Part4En />
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
    contentsCompiled: {
      fr: () => <Part5Fr />,
      en: () => <Part5En />
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
    contentsCompiled: {
      fr: () => <Part6Fr />,
      en: () => <Part6En />
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
    contentsCompiled: {
      fr: () => <Part7Fr />,
      en: () => <Part7En />
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
    contentsCompiled: {
      fr: () => <Part8Fr />,
      en: () => <Part8En />
    },
    Component: IceCreamAnnotation,
    data: 'date_ner_tfidf_v3.csv'
  }
]

export default routes;