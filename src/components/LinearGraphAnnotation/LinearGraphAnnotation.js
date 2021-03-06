import React, { useState, useEffect, useMemo, Suspense } from 'react';
import FooterNav from '../FooterNav';
import { generatePalette } from '../../helpers/palettes';

import LinearGraphVis from './LinearGraphContainer';

import { VisualizationControlContext } from '../../contexts';

import { computeFiltersOptions } from '../../helpers/misc';

const LinearGraphAnnotation = ({
  Content,
  data,
  contentsURL,
  prevPage,
  nextPage,
}) => {
  const filtersOptions = useMemo(() => computeFiltersOptions('table', data), [data]);
  const [helpVisible, setHelpVisible] = useState(false);
  const [searchString, setSearchString] = useState('');

  const [xVariable, setXVariable] = useState(undefined);
  const [xLabelVariable, setXLabelVariable] = useState(undefined);
  const [yVariable, setYVariable] = useState(undefined);
  const [reverseX, setReverseX] = useState(false);
  const [reverseY, setReverseY] = useState(false);
  const [sizeVariable, setSizeVariable] = useState(undefined);
  const [colorVariable, setColorVariable] = useState(undefined);
  const [labelVariable, setLabelVariable] = useState(undefined);
  const [colorPalette, setColorPalette] = useState(undefined);
  const [graphType, setGraphType] = useState('linegraph');
  const [useRelativeScale, setUseRelativeScale] = useState(undefined);
  const [filtersModeAnd, setFiltersModeAnd] = useState(false);
  const [filters, setFilters] = useState([]);
  const [title, setTitle] = useState('');
  const [legend, setLegend] = useState('');
  const [normalizeY, setNormalizeY] = useState(false);


  const [focusedVisualizationId, setFocusedVisualizationId] = useState(null);
  const [registeredVisualizations, setRegisteredVisualizations] = useState({});

  const onRegisterVisualization = (id, props) => {
    setRegisteredVisualizations({
      ...registeredVisualizations,
      [id]: props
    })
  }

  const onUnregisterVisualization = id => {
    const copyOfRegistered = { ...registeredVisualizations };
    delete copyOfRegistered[id]
    setRegisteredVisualizations(copyOfRegistered)
  }

  const onVisualizationUpdate = ({
    xVariable: thatXVariable,
    xLabelVariable: thatXLabelVariable,
    yVariable: thatYVariable,

    reverseX: thatReverseX,
    reverseY: thatReverseY,

    sizeVariable: thatSizeVariable,
    colorVariable: thatColorVariable,
    labelVariable: thatLabelVariable,

    searchString: thatSearchString,
    colorPalette: thatColorPalette,

    graphType: thatGraphType,
    useRelativeScale: thatUseRelativeScale,

    filters: theseFilters = [],
    filtersModeAnd: theseFiltersModeAnd,
    title: thisTitle,
    legend: thisLegend,
    normalizeY: thatNormalizeY
  }) => {
    setXVariable(thatXVariable);
    setXLabelVariable(thatXLabelVariable);
    setYVariable(thatYVariable);
    setReverseX(thatReverseX);
    setReverseY(thatReverseY);
    setSizeVariable(thatSizeVariable);
    setColorVariable(thatColorVariable);
    setLabelVariable(thatLabelVariable);
    setSearchString(thatSearchString);
    setGraphType(thatGraphType);
    setUseRelativeScale(thatUseRelativeScale);
    setFilters(theseFilters);
    setFiltersModeAnd(theseFiltersModeAnd);
    setTitle(thisTitle);
    setLegend(thisLegend);
    setNormalizeY(thatNormalizeY);


    if (thatColorPalette && ((!colorVariable && thatColorVariable) || colorVariable === thatColorVariable)) {
      setColorPalette(thatColorPalette);
    } else if (thatColorVariable && filtersOptions[thatColorVariable]) {
      let colors = thatColorVariable && thatColorVariable !== 'default' ? generatePalette(thatColorVariable, filtersOptions[thatColorVariable].options.length) : undefined
      // const colors = generatePalette(thatColorVariable, filtersOptions[thatColorVariable].options.size);
      const finalPalette = {};
      let i = 0;
      filtersOptions[thatColorVariable].options.forEach(option => {
        finalPalette[option] = colors[i];
        i++;
      });
      setColorPalette(finalPalette);
    } else if (colorPalette) {
      setColorPalette(undefined);
    }
  }

  useEffect(() => {
    if (!focusedVisualizationId && Object.keys(registeredVisualizations).length) {
      const thatId = Object.keys(registeredVisualizations)[0];
      setFocusedVisualizationId(thatId)
      onVisualizationUpdate(registeredVisualizations[thatId])
    }
  }, [registeredVisualizations, focusedVisualizationId])/* eslint react-hooks/exhaustive-deps : 0 */


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
        graphType,
        useRelativeScale,

        xVariable,
        xLabelVariable,
        yVariable,

        reverseX,
        reverseY,

        sizeVariable,
        colorVariable,

        searchString,
        colorPalette,

        filters,
        filtersModeAnd,
        
        title,
        legend,
        normalizeY
      }
    }}>
      <div className="slide-container">
        <section>
          <div>
            <p>
              <button className={helpVisible ? 'is-active' : ''} onClick={() => setHelpVisible(!helpVisible)}>
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
          <FooterNav prevPage={prevPage} nextPage={nextPage} />
        </section>
        <aside>
          <div className="vis">
            <LinearGraphVis
              {
              ...{
                data,
                filtersOptions,

                xVariable,
                xLabelVariable,
                reverseX,
                yVariable,
                reverseY,
                sizeVariable,
                colorVariable,
                labelVariable,
                colorPalette,
                searchString,
                useRelativeScale,
                graphType,

                onSearchStringChange,

                filtersModeAnd,
                filters,

                title,
                legend,
                normalizeY,

                onToggleFiltersModeAnd: () => setFiltersModeAnd(!filtersModeAnd),
                onFiltersChange: (newFilters) => setFilters(newFilters),

                onXVariableChange: (val) => setXVariable(val),
                onXLabelVariableChange: (val) => setXLabelVariable(val),
                onYVariableChange: (val) => setYVariable(val),

                onToggleReverseX: () => setReverseX(!reverseX),
                onToggleReverseY: () => setReverseY(!reverseY),

                onColorVariableChange: (val) => setColorVariable(val),
                onColorPaletteChange: val => setColorPalette(val),

                onGraphTypeChange: val => setGraphType(val),
                onToggleUseRelativeScale: () => setUseRelativeScale(!useRelativeScale),

                onTitleChange: val => setTitle(val),
                onLegendChange: val => setLegend(val),
                onNormalizeYChange: val => setNormalizeY(val),

              }
              }
            />
          </div>
        </aside>
      </div>
    </VisualizationControlContext.Provider>
  )
}

export default LinearGraphAnnotation;