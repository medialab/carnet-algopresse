import React from 'react';

import IceCreamAnnotation from '../../components/IceCreamAnnotation';
import DataLoader from '../../components/DataLoader';

import {repository} from '../../../package.json';

import Content from '!babel-loader!mdx-loader!./contents.mdx'

const URL_BASIS = `${repository}/blob/main/src/slides/DatesAnalysis`;
const contentsURL = `${URL_BASIS}/contents.mdx`


const TestVis = () => {
  
  return (
    <DataLoader url={`${process.env.PUBLIC_URL}/date_ner_tfidf_v3.tsv`}>
      {
        data => (
          <IceCreamAnnotation
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
}

export default TestVis;