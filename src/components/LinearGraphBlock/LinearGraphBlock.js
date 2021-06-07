import React, {useContext, useEffect, useState, useRef} from 'react';
import cx from 'classnames';
import {v4 as genId} from 'uuid';

import VisBlock from '../VisBlock';


import { VisualizationControlContext, PresentationContext } from '../../contexts';
import {buildLinearGraphCode} from '../../helpers/misc';;

const LinearGraphBlock = (inputProps) => {
  const ref = useRef(null);
  const {
    onVisualizationUpdate, 
    focusedVisualizationId, 
    onRegisterVisualization,
    onUnregisterVisualization,
    setFocusedVisualizationId,
    visualizationParams
  } = useContext(VisualizationControlContext);
  const {
    presentationMode
  } = useContext(PresentationContext);
  const [id, setId] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleVisualizationUpdate = () => {
    onVisualizationUpdate(inputProps);
  }
  

  useEffect(() => {
    const newId = genId();
    setTimeout(() => {
      let payload = {...inputProps};
      if (presentationMode) {
        payload = {
          ...payload,
          visType: 'linearGraph',
          ref,
          id: newId
        }
      }
      onRegisterVisualization(newId, {...payload})
    })
    setId(newId);
    return onUnregisterVisualization(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, ['id', 'inputProps', 'onRegisterVisualization', 'onUnregisterVisualization'])

  const isFocused = focusedVisualizationId === id;

  const handleClick = () => {
    onVisualizationUpdate(inputProps);
    setTimeout(() => setFocusedVisualizationId(id));
  }

  const props = isFocused ? visualizationParams : inputProps;

  const handleCopy = e => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(buildLinearGraphCode(props));
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  }
  return presentationMode ? (
    <VisBlock ref={ref} {...props} id={id} />
  )
  : (
    <div id={id} ref={ref} onClick={handleClick} className={cx("VisualizationBlock LinearGraphBlock", {'is-focused': isFocused})}>
      {
        props.title ?
        <h2 className="block-title">{props.title}</h2>
        : null
      }
      <pre>
        <code>
          {buildLinearGraphCode(props)}
        </code>
      </pre>
      <div className="buttons-container">
        <button onClick={handleVisualizationUpdate}>
          Réinitialiser sur les paramètres du fichier
        </button>
        <button onClick={handleCopy}>
        {copied ? 'Copié dans le presse-papier !' : 'Copier le code actuel'}
        </button>
      </div>
    </div>
  )
}

export default LinearGraphBlock;