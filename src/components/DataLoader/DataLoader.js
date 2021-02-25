import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Loader = ({percentsLoaded = 0}) =>{
  return  (
    <div className="loader-container">
      <div className="loader">
        <div className="loading-bar" style={{width: percentsLoaded + '%'}} />
      </div>
   </div>
)
}

const DataLoader = ({url, children}) => {
  const [data, setData] = useState(null);
  const [loadingFraction, setLoadingFraction] = useState(0);
  useEffect(() => {
    axios.get(url, {
      onDownloadProgress: progressEvent => {
        const status = progressEvent.loaded / progressEvent.total;
        setLoadingFraction(status);
      }
    })
    .then(({data}) => {
      setTimeout(() => {
        setData(data);
      })
    })
  }, [url]);

  return data ? children(data)
  : 
  <Loader percentsLoaded={loadingFraction * 100} />
}


export default DataLoader;