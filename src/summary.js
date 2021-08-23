import GraphAnnotation from './components/GraphAnnotation';
// import IceCreamAnnotation from './components/IceCreamAnnotation';
import LinearGraphAnnotation from './components/LinearGraphAnnotation';
import HorizonAnnotation from './components/HorizonAnnotation';
import PlainPage from './components/PlainPage';

import ChapoFr from '!babel-loader!mdx-loader!./contents/fr/chapo.mdx'
import ChapoEn from '!babel-loader!mdx-loader!./contents/en/chapo.mdx'


import IntroFr from '!babel-loader!mdx-loader!./contents/fr/00_home.mdx'
import Part1Fr from '!babel-loader!mdx-loader!./contents/fr/01_couverture_media.mdx'
import Part2Fr from '!babel-loader!mdx-loader!./contents/fr/02_detectcritic.mdx'
import Part3Fr from '!babel-loader!mdx-loader!./contents/fr/03_graphclusters.mdx'    
import Part4Fr from '!babel-loader!mdx-loader!./contents/fr/04_timelineclusters.mdx'
import Part5Fr from '!babel-loader!mdx-loader!./contents/fr/05_toporobotalgo.mdx'
import Part6Fr from '!babel-loader!mdx-loader!./contents/fr/06_explore_entities.mdx'
import Part7Fr from '!babel-loader!mdx-loader!./contents/fr/07_IssueVERB.mdx'
import Part8Fr from '!babel-loader!mdx-loader!./contents/fr/08_NERdate.mdx'
import ReferencesFr from '!babel-loader!mdx-loader!./contents/fr/references.mdx'

import IntroEn from '!babel-loader!mdx-loader!./contents/en/00_home.mdx'
import Part1En from '!babel-loader!mdx-loader!./contents/en/01_couverture_media.mdx'
import Part2En from '!babel-loader!mdx-loader!./contents/en/02_detectcritic.mdx'
import Part3En from '!babel-loader!mdx-loader!./contents/en/03_graphclusters.mdx'    
import Part4En from '!babel-loader!mdx-loader!./contents/en/04_timelineclusters.mdx'
import Part5En from '!babel-loader!mdx-loader!./contents/en/05_toporobotalgo.mdx'
import Part6En from '!babel-loader!mdx-loader!./contents/en/06_explore_entities.mdx'
import Part7En from '!babel-loader!mdx-loader!./contents/en/07_IssueVERB.mdx'
import Part8En from '!babel-loader!mdx-loader!./contents/en/08_NERdate.mdx'
import ReferencesEn from '!babel-loader!mdx-loader!./contents/en/references.mdx'

const routes = [
  {
    title: {
      fr: 'Chapô',
      en: 'Headline',
    },
    route: {
      fr: 'chapo',
      en: 'headline',
    },
    contents: {
      fr: 'chapo.mdx',
      en: 'chapo.mdx',
    },
    contentsCompiled: {
      fr: () => <ChapoFr />,
      en: () => <ChapoEn />
    },
    Component: PlainPage,
    hideInContents: true
  },
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
      en: 'What is AI media coverage?',
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
      fr: 'Comment détecter le discours critique dans les médias ?',
      en: 'How to detect critical discourse in the media?',
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
      en: 'What are the themes targeted by the critique?',
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
      en: 'How does the mediatic agenda evolve?',
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
      fr: 'Que nous apprend la topologie du réseau ?',
      en: 'What can we learn from the network\'s topology?',
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
      fr: 'Quelles entités peuplent le réseau sémantique ?',
      en: 'What entities are populating the semantic network?',
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
      fr: 'Comment sont exprimés les troubles produits par ces technologies ?',
      en: 'How are troubles produced by these technologies expressed?',
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
    // data: 'verbs_bin_normalise.csv',
    // Component: IceCreamAnnotation,
    // lab: {
      data: 'verbs_bin_v2.csv',
      Component: HorizonAnnotation
    // }
  },
  {
    title: {
      fr: 'Comment est exprimée la temporalité ?',
      en: 'How is temporality expressed?',
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
    // Component: IceCreamAnnotation,
    // data: 'date_ner_tfidf_v3.csv',
    // lab: {
      data: 'dates_bin_v2.csv',
      Component: HorizonAnnotation
    // }
  },
  {
    title: {
      fr: 'Références',
      en: 'References',
    },
    route: {
      fr: 'references',
      en: 'references',
    },
    contents: {
      fr: 'references.mdx',
      en: 'references.mdx',
    },
    contentsCompiled: {
      fr: () => <ReferencesFr />,
      en: () => <ReferencesEn />
    },
    Component: PlainPage
  },
]

export default routes;