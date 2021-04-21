import React, {useState, useEffect, useMemo, Suspense} from 'react';
import IceCreamVis from '../IceCream';

import {VisualizationControlContext} from '../../contexts';

import {computeFiltersOptions} from '../../helpers/misc';

const IceCreamAnnotation = ({
  Content,
  data,
  contentsURL,
}) => {
  const filtersOptions = useMemo(() => computeFiltersOptions('table', data), [data]);
  const [helpVisible, setHelpVisible] = useState(false);
  const [searchString, setSearchString] = useState('');

  const [xVariable, setXVariable] = useState(undefined);
  const [yVariable, setYVariable] = useState(undefined);
  const [reverseX, setReverseX] = useState(false);
  const [reverseY, setReverseY] = useState(false);
  const [sizeVariable,setSizeVariable] = useState(undefined);
  const [colorVariable, setColorVariable] = useState(undefined);
  const [labelVariable, setLabelVariable] = useState(undefined);

  const [rotateMode, setRotateMode] = useState(false);

  const [focusedVisualizationId, setFocusedVisualizationId] = useState(null);
  const [registeredVisualizations, setRegisteredVisualizations] = useState({});

  const onRegisterVisualization = (id, props) => {
    setRegisteredVisualizations({
      ...registeredVisualizations,
      [id]: props
    })
  }

  const onUnregisterVisualization = id => {
    const copyOfRegistered = {...registeredVisualizations};
    delete copyOfRegistered[id]
    setRegisteredVisualizations(copyOfRegistered)
  }

  const onVisualizationUpdate = ({
    xVariable: thatXVariable,
    yVariable: thatYVariable,

    reverseX: thatReverseX,
    reverseY: thatReverseY,

    sizeVariable: thatSizeVariable,
    colorVariable: thatColorVariable,
    labelVariable: thatLabelVariable,

    rotateMode: thatRotateMode,
    searchString: thatSearchString,
  } ) => {
    setXVariable(thatXVariable);
    setYVariable(thatYVariable);
    setReverseX(thatReverseX);
    setReverseY(thatReverseY);
    setSizeVariable(thatSizeVariable);
    setColorVariable(thatColorVariable);
    setLabelVariable(thatLabelVariable);
    setRotateMode(thatRotateMode);
    setSearchString(thatSearchString);
  }

  useEffect(() => {
    if (!focusedVisualizationId && Object.keys(registeredVisualizations).length) {
      const thatId = Object.keys(registeredVisualizations)[0];
      setFocusedVisualizationId(thatId )
      onVisualizationUpdate(registeredVisualizations[thatId])
    }
  }, [registeredVisualizations, focusedVisualizationId])

  
  const onSearchStringChange = str => {
    setSearchString(str);
  }
  return (
    <VisualizationControlContext.Provider value={{
      onVisualizationUpdate, 
      onRegisterVisualization, 
      onUnregisterVisualization, 
      focusedVisualizationId,
      setFocusedVisualizationId,
      visualizationParams: {
        xVariable,
        yVariable,

        reverseX,
        reverseY,

        sizeVariable,
        colorVariable,
        labelVariable,

        rotateMode,
        searchString,
      }
    }}>
    <div className="slide-container">
      <section>
        <div>
          <p>
            <button className={helpVisible ? 'is-active': ''} onClick={() => setHelpVisible(!helpVisible)}>
              Comment modifier cette page ?
            </button>
          </p>
          <ol className={`edit-help ${helpVisible ? 'is-active' : ''}`}>
            <li>
              Préalablement se logger dans github si le répertoire est privé
            </li>
            <li>
              Se rendre sur <a target="blank" href={contentsURL}>cette page du répertoire github</a>
            </li>
            <li>
              Cliquer sur le crayon en haut à droite des contenus (il affiche "edit" au survol)
            </li>
            <li>
              Faire les modifications puis cliquer sur "Commit changes" en bas de la page
            </li>
            <li>
              Attendre 2 minutes puis recharger la page pour voir la version à jour de la page
            </li>
          </ol>
        </div>
        <Suspense fallback={<div>Chargement</div>}>
        <Content />
        </Suspense>
      </section>
      <aside>
        <div className="vis">
          <IceCreamVis
              {
                ...{
                  data,
                  filtersOptions,

                  xVariable,
                  reverseX,
                  yVariable,
                  reverseY,
                  sizeVariable,
                  colorVariable,
                  labelVariable,

                  rotateMode,
                  searchString,

                  onSearchStringChange,
                  onToggleRotateMode: () => setRotateMode(!rotateMode) ,
                  
                  onXVariableChange: (val) => setXVariable(val),
                  onYVariableChange: (val) => setYVariable(val),

                  onToggleReverseX: () => setReverseX(!reverseX),
                  onToggleReverseY: () => setReverseY(!reverseY),

                  onColorVariableChange: (val) => setColorVariable(val),
                  onSizeVariableChange: (val) => setSizeVariable(val),
                  onLabelVariableChange: (val) => setLabelVariable(val),
                }
              }
            />
        </div>
      </aside>
  </div>
  </VisualizationControlContext.Provider>
  )
}

export default IceCreamAnnotation;