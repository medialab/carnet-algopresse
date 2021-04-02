import React, {useContext, useEffect, useState} from 'react';
import cx from 'classnames';
import {v4 as genId} from 'uuid';
import {VisualizationControlContext} from '../../contexts'
import {buildIceCreamScatterPlotCode} from '../../helpers/misc';

const IceCreamBlock = (inputProps) => {
  const {
    onVisualizationUpdate, 
    focusedVisualizationId, 
    onRegisterVisualization,
    onUnregisterVisualization,
    setFocusedVisualizationId,
    visualizationParams
  } = useContext(VisualizationControlContext);
  const [id, setId] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleVisualizationUpdate = () => {
    onVisualizationUpdate(inputProps);
  }
  

  useEffect(() => {
    const newId = genId();
    setTimeout(() => onRegisterVisualization(newId, {...inputProps}))
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
    navigator.clipboard.writeText(buildIceCreamScatterPlotCode(props));
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  }
  return (
    <div onClick={handleClick} className={cx("VisualizationBlock IcecreamBlock", {'is-focused': isFocused})}>
      <pre>
        <code>
          {buildIceCreamScatterPlotCode(props)}
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

export default IceCreamBlock;