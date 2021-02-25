import React from 'react';
import GraphAnnotation from '../../components/GraphAnnotation';

import {repository} from '../../../package.json';

import gexfData from "!!raw-loader!./assets/rio.gexf";
import Content from '!babel-loader!mdx-loader!./contents.mdx'


const URL_BASIS = `${repository}/blob/main/src/slides/ExamplesRio`;
const contentsURL = `${URL_BASIS}/contents.mdx`

const TestVis = () => {
  return (
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

export default TestVis;