import React, {useMemo} from 'react';
import ContainerDimensions from 'react-container-dimensions';
import {scaleLinear} from 'd3-scale';
import {extent, group} from 'd3-array';
import Input from '../DebouncedInput';


import LinearGraphControls from './LinearGraphControls';
import {generatePalette} from '../../helpers/palettes';
import {evalIfNodeMatches} from '../../helpers/misc';

import './LinearGraphContainer.css';
import { max, uniqBy } from 'lodash';

export function LinearGraphContainer({

  width, 
  height,
  data,

  xVariable,
  xLabelVariable,
  reverseX,
  yVariable,
  reverseY,
  sizeVariable,
  colorVariable,
  labelVariable,
  colorPalette: inputColorPalette,
  normalizeY,

  title,
  legend,

  searchString = '',

  graphType = 'linegraph',
  useRelativeScale,

  onSearchStringChange,
  filtersOptions = {},

  filtersModeAnd,
  filters: inputFilters = [],
  presentationMode,

  
  onToggleFiltersModeAnd,
  onFiltersChange,
  onXVariableChange,
  onXLabelVariableChange,
  onYVariableChange,
  onColorVariableChange,
  onSizeVariableChange,
  onLabelVariableChange,
  onToggleReverseX,
  onToggleReverseY,
  onColorPaletteChange,
  onGraphTypeChange,
  onToggleUseRelativeScale,
  onNormalizeYChange,

  onTitleChange,
  onLegendChange,
}) {
 
  // const smallestDimension = min([width, height])
  const WIDTH = width;
  const HEIGHT = height;

  // set scales dimensions and scale
  const MARGIN = WIDTH / 10;

  let xRange = [MARGIN, WIDTH - MARGIN / 2];
  let yRange = [HEIGHT - MARGIN, MARGIN];


  const filters = useMemo(() => inputFilters, [JSON.stringify(inputFilters)]);

  const xLabelMap = useMemo(() => {
    return data.reduce((dict, datum) => {
      const labelVariable = xLabelVariable === 'default' ? xVariable : xLabelVariable;
      return {
        ...dict,
        [datum[xVariable]]: datum[labelVariable]
      }
    }, {})

  }, [data, xVariable, xLabelVariable])
  
  // build visualization groups
  let dataGroups = [[undefined, data]]
  if (colorVariable) {
    dataGroups = Array.from(group(data, d => d[colorVariable]));
  } 

  // reduce items
  dataGroups = dataGroups.map(([_id, values]) => {
    const xGroups = Array.from(group(values, d => d[xVariable])).map(([x, ys]) => {
      return {
        x: +x, 
        // aggregate ys
        y: ys.reduce((sum, y) => sum + (+y[yVariable]), 0),
        filteredY: ys.filter(d => filters.length ? evalIfNodeMatches(d, filters, filtersModeAnd) : true).reduce((sum, y) => sum + (+y[yVariable]), 0),
        xValue: x
      }
    })
    return [_id, xGroups]
  });
 
  // refactorize by x for stacked barchart
  if (graphType === 'histogram') {
    const xMap = dataGroups.reduce((res, [color, values]) => {
      return values.reduce((res2, value) => {
        const x = value.x;
        const transformedValue = {...value, color};
        return {
          ...res2,
          [x]: res2[x] ? [...res2[x], transformedValue] : [transformedValue]
        }
      }, res)
    }, {})
    // turn datagroup to an array of [x, list of related objects]
    dataGroups = Object.entries(xMap);
  }
  let getX, getY;
  const yPropToFilter = useRelativeScale ? 'filteredY' : 'y';
  let xValues;
  if (graphType === 'linegraph') {
    // handling relative or global filter
    const xExtent = extent(dataGroups.reduce((res, [_id, values]) => [...res, ...values.map(v => v.x)] , []));
    getX = scaleLinear().range(xRange).domain(xExtent);
    getY = scaleLinear().range(yRange).domain([0, max(dataGroups.map(([_id, values]) => max(values.map(v => v[yPropToFilter]))))]).nice();
  } else if (graphType === 'histogram') {
    const xExtent = extent(dataGroups.map(([x]) => +x));
    getX = scaleLinear().range(xRange).domain(xExtent);
    xValues = uniqBy(dataGroups, d => d[0])
    // y scale domain is the biggest sum for each x modality
    getY = scaleLinear().range(yRange).domain([0, max(dataGroups.map(([_x, list]) => list.reduce((sum, item) => sum + item[yPropToFilter] , 0)))]).nice();
  }

   // apply filter
   if (filters.length && colorVariable) {
    const filtersAffectingColor = filters.filter(f => f.attribute === colorVariable);
    if (graphType === 'linegraph') {
      dataGroups = dataGroups.filter(([colorValue, values]) => {
        if (filtersAffectingColor) {
          if (filtersModeAnd) {
            const oneFilterDoesNotMatches = filtersAffectingColor.find(({ attribute, value }) => colorValue !== '' + value) !== undefined;
            return !oneFilterDoesNotMatches;
          } else {
            const oneFilterMatches = filtersAffectingColor.find(({ attribute, value }) => colorValue === '' + value) !== undefined;
            return oneFilterMatches;
          }
        } else {
          return true;
        }
      })
     } else if (graphType === 'histogram') {
       // filtering groups
      dataGroups = dataGroups.reduce((res, [xValue, values]) => {
        if (filtersAffectingColor) {
          const newValues = values.filter(value => {
            if (filtersModeAnd) {
              const oneFilterDoesNotMatches = filtersAffectingColor.find(({ attribute, value }) => value.color !== '' + value) !== undefined;
              return !oneFilterDoesNotMatches;
            } else {
              const oneFilterMatches = filtersAffectingColor.find(({ attribute, value }) => value.color === '' + value) !== undefined;
              return oneFilterMatches;
            }
          })
          if (newValues.length) {
            return [...res, [xValue, newValues]]
          // all items filtered out -> do not include the group
          } else return res;
        // no filters, return as is
        } else {
          return [...res, [xValue, values]];
        }
      }, [])
     }
    
  }
    
  
  // manage palette
  const colorPalette = useMemo(() => {
    let newColorPalette;
    if (inputColorPalette) {
      newColorPalette = inputColorPalette;
    }
    else if (colorVariable && colorVariable !== 'default') {
      const palette = generatePalette(colorVariable, filtersOptions[colorVariable].options.length);
      newColorPalette = filtersOptions[colorVariable].options.reduce((res, option, index) => ({
        ...res,
        [option]: palette[index]
      }), {})
    }
    return newColorPalette;
  }, [JSON.stringify(inputColorPalette), colorVariable, filtersOptions])/* eslint react-hooks/exhaustive-deps: 0*/
  
  let getColor = (val) => {
    return colorPalette ? colorPalette[val] : 'grey';
  }

  // handling search
  let highlightedIndex;
  if (searchString.length && labelVariable) {
    highlightedIndex = new Set();
    data.forEach((datum, index) => {
      const label = datum[labelVariable].toLowerCase();
      if (label.includes(searchString)) {
        highlightedIndex.add(index);
      }
    })
  }

  if (reverseX) {
    xRange = xRange.reverse();
  }
  if (reverseY) {
    yRange = yRange.reverse();
  }
  let getYHisto
  // preparing histogram stacking
  if (graphType === 'histogram') {
    dataGroups = dataGroups.map(([xValue, values]) => {
      // let sum = 0;
      const newValues = values
      .sort((a, b) => {
        if (a.color > b.color) {
          return 1;
        } else return -1;
      })
      .reduce((total, value, index) => {
        const prev = index > 0 ? total[index - 1] : undefined;
        const yDisplace = prev ? +prev.y + (prev.yDisplace || 0) : 0;

        const newValue = {
          ...value,
          yDisplace,
          y: +value.y,
          x: +value.x
        }
        return [...total, newValue]
      }, [])

      return [xValue, newValues];
    }, []);

    dataGroups = dataGroups.sort((a, b) => {
      if (+a[0] > +b[0]) {
        return 1;
      }
      return -1;
    });
    if (normalizeY) {
      dataGroups = dataGroups.map(([xValue, values]) => {
        const sum = values.reduce((sum, v) => sum + v.y, 0);
        const sumFiltered = values.reduce((sum, v) => sum + v.filteredY, 0);
        return [
          xValue,
          values.map(v => {
            return {
              ...v,
              yDisplace: v.yDisplace / sum,
              y: v.y / sum,
              filteredY: v.filteredY / sumFiltered,
            }
          })
        ]
      })
    }
    const maxStacked = max(dataGroups.map(([_xValue, values]) => values.reduce((sum, v) => sum + v.y, 0)));
    getYHisto = scaleLinear()
    // .range([MARGIN, HEIGHT - MARGIN])
    .range([0, HEIGHT - MARGIN * 2])
    .domain([0, normalizeY ? 1 : maxStacked]).nice()

    getY
    .domain([0, normalizeY ? 1 : maxStacked]).nice()

  }
    
  return (
    <>
        <svg transform={`translate(0, ${-MARGIN/2})`} className="LinearGraph" width={WIDTH} height={HEIGHT + MARGIN/2}>
            <g>
              
              <g className="left-axis">
              {
                getY.ticks &&
                getY.ticks()
                .map((tick, index) => {
                  const x = MARGIN * .7;
                  return (
                    <g className="axis-element" key={index}>
                      <text textAnchor="end" x={x} y={getY(tick)}>
                        {tick}
                      </text>
                      
                      <line
                        x1={x  + MARGIN * .1}
                        y1={getY(tick)}
                        x2={MARGIN}
                        y2={getY(tick)}
                        stroke={'black'}
                      />
                      <line
                        x1={MARGIN}
                        y1={getY(tick)}
                        x2={WIDTH - MARGIN / 2}
                        y2={getY(tick)}
                        stroke={'lightgrey'}
                        strokeDasharray={'1, 2'}
                      />
                    </g>
                  )
                })
              }
                <line
                  stroke={'black'}
                  y1={MARGIN}
                  y2={HEIGHT - MARGIN}
                  x1={MARGIN}
                  x2={MARGIN}
                />
              </g>
              <g className="bottom-axis">
                <line
                  stroke={'black'}
                  y1={HEIGHT - MARGIN}
                  y2={HEIGHT - MARGIN}
                  x1={MARGIN}
                  x2={WIDTH - MARGIN / 2}
                />
                {
                getX.ticks &&
                getX.ticks()
                .map((tick, index) => {
                  const y = HEIGHT - MARGIN * .75
                  return (
                    <g className="axis-element" key={index}>
                      <g transform={`translate(${getX(tick)} ${y})`}>
                        <g transform={'rotate(-45)'}>
                          <text 
                            textAnchor="end"
                          >
                            {xLabelMap[tick]}
                          </text>
                        </g>
                      </g>
                      <line
                        y1={HEIGHT - MARGIN}
                        y2={y - MARGIN * .1}
                        x1={getX(tick)}
                        x2={getX(tick)}
                        stroke={'black'}
                      />
                    </g>
                  )
                })
                }
              </g>
              {
                graphType === 'linegraph' ?
                dataGroups.map(([colorValue, values], index) => {
                  const firstX = getX(values[0].x);
                  const firstY = getY(values[0].y);
                  const color = colorVariable ? getColor(colorValue) : 'grey';
                  const path = `M ${firstX} ${firstY} ${
                    values
                    .reduce((res, {x, y}) => {
                      return `${res} L ${getX(x)} ${getY(y)}`
                    }, '')
                  }`
                  return <>
                    <path d={path} 
                      fill="transparent" 
                      stroke={ colorVariable ? color : 'grey'}
                      key={colorValue}
                    />
                    {
                      values.map(({x, y}, index) => (
                        <g key={index} className="linegraph-object-group">
                          <circle
                            className="hover-placeholder"
                            cx={getX(x)}
                            cy={getY(y)}
                            fill={ 'transparent' }
                            r={MARGIN / 7}
                          />
                          <text
                            x={getX(x) < (WIDTH - MARGIN) / 2 ? getX(x) : getX(x)}
                            y={getY(y) - MARGIN / 10}
                            className="visible-on-hover"
                            fontSize={MARGIN / 7}
                            textAnchor={getX(x) < (WIDTH - MARGIN) / 2 ? 'start' : 'end'}
                          >
                            {colorValue}, {xLabelMap[x]} : {y}
                          </text>
                          <line
                            className="control-line horizontal-line visible-on-hover"
                            x1={MARGIN}
                            y1={getY(y)}
                            x2={getX(x)}
                            y2={getY(y)}
                            stroke="black"
                            strokeDasharray={'4, 4'}
                          />
                          <line
                            className="control-line vertical-line visible-on-hover"
                            x1={getX(x)}
                            y1={getY(y)}
                            x2={getX(x)}
                            y2={HEIGHT - MARGIN}
                            stroke="black"
                            strokeDasharray={'4, 4'}
                          />
                          <circle
                            key={index}
                            cx={getX(x)}
                            cy={getY(y)}
                            fill={ color }
                            r={2}
                          />
                        </g>
                      ))
                    }
                  </>
                })
                : 
                <g className="histogram-objects">
                  {
                    dataGroups.map(([xValue, values], index) => {
                      return (
                        <g key={index} className="x-group">
                          {
                            values.map(({x, y, yDisplace, color}, index2) => {
                              return (
                                <rect
                                  key={index2}
                                  x={getX(x)}
                                  y={HEIGHT - MARGIN - getYHisto(y) - getYHisto(yDisplace)}
                                  height={getYHisto(y)}
                                  width={ (WIDTH - MARGIN * 4) / xValues.length}
                                  fill={getColor(color)}
                                />
                              )
                            })
                          }
                        </g>
                      )
                     
                    })
                  }
                </g>
              }
            </g>
        </svg>
        {
          presentationMode ? null :
          <>
            <LinearGraphControls
          {
            ...{
              xVariable,
              xLabelVariable,
              yVariable,
              reverseX,
              reverseY,
              sizeVariable,
              colorVariable,
              labelVariable,
              graphType,
              useRelativeScale,
              normalizeY,

              searchString,

              onSearchStringChange,
              
              onXVariableChange,
              onXLabelVariableChange,
              onYVariableChange,
              onColorVariableChange,
              onSizeVariableChange,
              onLabelVariableChange,
              onToggleReverseX,
              onToggleReverseY,
              onColorPaletteChange,
              onToggleUseRelativeScale,
              onGraphTypeChange,
              onNormalizeYChange,

              onToggleFiltersModeAnd,
              filtersModeAnd,
              onFiltersChange,
              filters,

              filtersOptions,
              colorPalette,
            }
          }
        />
        <form onSubmit={e => {e.preventDefault()}} className="caption-editor-container">
            <h1 className="caption-title-container">
              <Input
                value={title || ''}
                onChange={val => onTitleChange(val)}
                placeholder="Titre de la visualisation"
              />
            </h1>
            <div className="caption-legend-container">
              <Input
                value={legend || ''}
                onChange={val => onLegendChange(val)}
                placeholder="Légende de la visualisation"
                type="textarea"
              />
            </div>
          </form>
          </>
        }
        
    </>
  );
}

export default function LinearGraphContainerWithDimensions(props) {
  return (
    <div className="VisContainer LinearGraphContainer">

    <ContainerDimensions>
      {
        dimensions => <LinearGraphContainer {...{...props, ...dimensions}} />
      }
    </ContainerDimensions>
    </div>
  )
}