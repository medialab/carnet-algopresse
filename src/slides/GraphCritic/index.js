import React from 'react';

import GraphAnnotation from '../../components/GraphAnnotation';
import DataLoader from '../../components/DataLoader';

import {repository} from '../../../package.json';

import Content from '!babel-loader!mdx-loader!./contents.mdx'

const URL_BASIS = `${repository}/blob/main/src/slides/GraphCritic`;
const contentsURL = `${URL_BASIS}/contents.mdx`


const TestVis = () => {
  
  return (
    <DataLoader url={`${process.env.PUBLIC_URL}/Graph Critic EN layers rotation edgesunweight V2.gexf`}>
      {
        gexfData => (
          <GraphAnnotation
            {
              ...{
                contentsURL,
                Content,
                gexfData
              }
            }
          />
        )
      }
    </DataLoader>
  )
}

export default TestVis;