import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { csvParse, tsvParse } from 'd3-dsv';
import Loader from '../Loader';

const DataLoader = ({url, children}) => {
  const [data, setData] = useState(null);
  const [loadingFraction, setLoadingFraction] = useState(0);
  useEffect(() => {
    if (url) {
      axios.get(url, {
        onDownloadProgress: progressEvent => {
          const status = progressEvent.loaded / progressEvent.total;
          setLoadingFraction(status);
        }
      })
      .then(({data: inputData}) => {
        setTimeout(() => {
          let data = inputData;
          if (url.split('.').pop() === 'csv') {
            data = csvParse(inputData);
          } else if (url.split('.').pop() === 'tsv') {
            data = tsvParse(inputData);
          }
          setData(data);
        })
      })
    }
  }, [url]);

  if (!url) {
    return children();
  }

  return data ? children(data)
  : 
  <Loader percentsLoaded={loadingFraction * 100} />
}


export default DataLoader;