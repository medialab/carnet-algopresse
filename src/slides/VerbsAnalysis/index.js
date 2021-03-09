import React from 'react';

import IceCreamAnnotation from '../../components/IceCreamAnnotation';
import DataLoader from '../../components/DataLoader';

import {repository} from '../../../package.json';

import Content from '!babel-loader!mdx-loader!./contents.mdx'

const URL_BASIS = `${repository}/blob/main/src/slides/DatesAnalysis`;
const contentsURL = `${URL_BASIS}/contents.mdx`


const TestVis = () => {
  
  return (
    <DataLoader url={`${process.env.PUBLIC_URL}/df_AB_tfidf_verbs_freq_count.csv`}>
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