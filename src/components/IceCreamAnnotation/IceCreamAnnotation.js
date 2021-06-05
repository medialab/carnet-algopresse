import React, { useState, useEffect, useMemo, Suspense } from 'react';
import FooterNav from '../FooterNav';
import { generatePalette } from '../../helpers/palettes';

import IceCreamVis from './IceCreamContainer';

import { VisualizationControlContext } from '../../contexts';

import { computeFiltersOptions } from '../../helpers/misc';

const IceCreamAnnotation = ({
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
  const [yVariable, setYVariable] = useState(undefined);
  const [reverseX, setReverseX] = useState(false);
  const [reverseY, setReverseY] = useState(false);
  const [sizeVariable, setSizeVariable] = useState(undefined);
  const [colorVariable, setColorVariable] = useState(undefined);
  const [labelVariable, setLabelVariable] = useState(undefined);
  const [labelsOnTheSide, setLabelsOnTheSide] = useState(false);
  const [colorPalette, setColorPalette] = useState(undefined);
  const [colorScaleType, setColorScaleType] = useState(undefined);
  const [filtersModeAnd, setFiltersModeAnd] = useState(false);
  const [title, setTitle] = useState('');
  const [legend, setLegend] = useState('');
  const [filters, setFilters] = useState([]);
  const [reverseFlickering, setReverseFlickering] = useState(false);


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
    const copyOfRegistered = { ...registeredVisualizations };
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
    labelsOnTheSide: thatLabelsOnTheSide,
    colorScaleType: thatColorScaleType,

    rotateMode: thatRotateMode,
    searchString: thatSearchString,
    colorPalette: thatColorPalette,
    filters: theseFilters = [],
    filtersModeAnd: theseFiltersModeAnd,
    title: thisTitle,
    legend: thisLegend,
    reverseFlickering: thatReverseFlickering,
  }) => {
    setXVariable(thatXVariable);
    setYVariable(thatYVariable);
    setReverseX(thatReverseX);
    setReverseY(thatReverseY);
    setSizeVariable(thatSizeVariable);
    setColorVariable(thatColorVariable);
    setColorScaleType(thatColorScaleType);
    setLabelVariable(thatLabelVariable);
    setRotateMode(thatRotateMode);
    setSearchString(thatSearchString);
    setLabelsOnTheSide(thatLabelsOnTheSide);
    setFilters(theseFilters);
    setFiltersModeAnd(theseFiltersModeAnd);
    setTitle(thisTitle);
    setLegend(thisLegend);
    setReverseFlickering(thatReverseFlickering);
    if (thatColorPalette && (colorVariable === thatColorVariable || (!colorVariable && thatColorVariable))) {
      setColorPalette(thatColorPalette);
    } else if (thatColorVariable || colorScaleType !== thatColorScaleType) {
      let palette = colorVariable && colorVariable !== 'default' ? generatePalette(colorVariable, filtersOptions[colorVariable].options.length) : undefined
      if (palette) {
        const colors = generatePalette(thatColorVariable, filtersOptions[thatColorVariable].options.size);
        // const palette = {};
        let i = 0;
        filtersOptions[thatColorVariable].options.forEach(option => {
          palette[option] = colors[i];
          i++;
        });
      } else {
        setColorPalette(undefined);
      }
      
      setColorPalette(palette);
    } else if (colorPalette) {
      setColorPalette(undefined);
    }
  }

  useEffect(() => {
    if (!focusedVisualizationId && Object.keys(registeredVisualizations).length) {
      const thatId = Object.keys(registeredVisualizations)[0];
      setFocusedVisualizationId(thatId);
      onVisualizationUpdate(registeredVisualizations[thatId]);
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
        xVariable,
        yVariable,

        reverseX,
        reverseY,

        sizeVariable,
        colorVariable,
        labelVariable,
        labelsOnTheSide,

        rotateMode,
        searchString,
        colorPalette,
        colorScaleType,

        filters,
        filtersModeAnd,

        title,
        legend,
        reverseFlickering,
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
                labelsOnTheSide,
                colorPalette,
                colorScaleType,

                rotateMode,
                searchString,

                filtersModeAnd,
                filters,
                title,
                legend,
                reverseFlickering,

                onToggleFiltersModeAnd: () => setFiltersModeAnd(!filtersModeAnd),
                onFiltersChange: (newFilters) => setFilters(newFilters),

                onSearchStringChange,
                onToggleRotateMode: () => setRotateMode(!rotateMode),

                onXVariableChange: (val) => setXVariable(val),
                onYVariableChange: (val) => setYVariable(val),

                onToggleReverseX: () => setReverseX(!reverseX),
                onToggleReverseY: () => setReverseY(!reverseY),

                onColorVariableChange: (val) => setColorVariable(val),
                onSizeVariableChange: (val) => setSizeVariable(val),
                onLabelVariableChange: (val) => setLabelVariable(val),
                onToggleLabelsOnTheSide: val => setLabelsOnTheSide(val),
                onColorPaletteChange: val => setColorPalette(val),
                onColorScaleTypeChange: val => setColorScaleType(val),
                onTitleChange: val => setTitle(val),
                onLegendChange: val => setLegend(val),
                onReverseFlickeringChange: val => setReverseFlickering(val),
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