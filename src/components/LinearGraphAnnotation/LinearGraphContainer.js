import React from 'react';
import ContainerDimensions from 'react-container-dimensions';
import {scaleLinear} from 'd3-scale';
import {min, extent, group} from 'd3-array';


import LinearGraphControls from './LinearGraphControls';
import {generatePalette} from '../../helpers/palettes';
import {evalIfNodeMatches} from '../../helpers/misc';

import './LinearGraphContainer.css';
import { max } from 'lodash';

function LinearGraphContainer({

  width, height,
  data,

  xVariable,
  reverseX,
  yVariable,
  reverseY,
  sizeVariable,
  colorVariable,
  labelVariable,
  colorPalette: inputColorPalette,

  searchString = '',

  graphType = 'linegraph',
  useRelativeScale,

  onSearchStringChange,
  filtersOptions = {},

  onToggleFiltersModeAnd,
  filtersModeAnd,
  onFiltersChange,
  filters,

  
  onXVariableChange,
  onYVariableChange,
  onColorVariableChange,
  onSizeVariableChange,
  onLabelVariableChange,
  onToggleReverseX,
  onToggleReverseY,
  onColorPaletteChange,
  onGraphTypeChange,
  onToggleUseRelativeScale,
}) {
 
  const smallestDimension = min([width, height])
  const WIDTH = smallestDimension;
  const HEIGHT = smallestDimension;

  // filter data
  // const data = useMemo(() => {
  //   if (filters.length) {
  //     return inputData.filter(datum => evalIfNodeMatches(datum, filters, filtersModeAnd))
  //   } else {
  //     return inputData;
  //   }
  // }, [inputData, filters, filtersModeAnd]);
  // set scales dimensions and scale
  const MARGIN = WIDTH / 10;

  let xRange = [MARGIN, WIDTH - MARGIN];
  let yRange = [HEIGHT - MARGIN, MARGIN];
  
  // build visualization groups
  let dataGroups = [[undefined, data]]
  if (colorVariable && graphType === 'linegraph') {
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
  })
  // handling relative or global filter
  const yPropToFilter = useRelativeScale ? 'filteredY' : 'y';
  const xExtent = extent(dataGroups.reduce((res, [_id, values]) => [...res, ...values.map(v => v.x)] , []));
  let getX = scaleLinear().range(xRange).domain(xExtent);
  let getY = scaleLinear().range(yRange).domain([0, max(dataGroups.map(([_id, values]) => max(values.map(v => v[yPropToFilter]))))]);
  if (filters.length && colorVariable) {
    dataGroups = dataGroups.filter(([colorValue, values]) => {
      const filtersAffectingColor = filters.filter(f => f.attribute === colorVariable);
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
  }
  if (reverseX) {
    xRange = xRange.reverse();
  }
  if (reverseY) {
    yRange = yRange.reverse();
  }
  // manage palette
  let colorPalette;
  if (inputColorPalette) {
    colorPalette = inputColorPalette;
  }
  else if (colorVariable && colorVariable !== 'default') {
    const palette = generatePalette(colorVariable, filtersOptions[colorVariable].options.length);
    colorPalette = filtersOptions[colorVariable].options.reduce((res, option, index) => ({
      ...res,
      [option]: palette[index]
    }), {})
  }
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
  
  return (
    <>
        <svg className="linear-graph" width={WIDTH} height={HEIGHT}>
          {
            graphType === 'linegraph' ?
            <g>
              {
                dataGroups.map(([colorValue, values]) => {
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
                    />
                    {
                      values.map(({x, y}, index) => (
                        <circle
                          key={index}
                          cx={getX(x)}
                          cy={getY(y)}
                          fill={ color }
                          r={2}
                        />
                      ))
                    }
                  </>
                })
              }
              <g className="left-axis">
              {
                getY.ticks &&
                getY.ticks()
                .map(tick => {
                  const x = MARGIN / 2;
                  return (
                    <g key={tick}>
                      <text textAnchor="end" x={x} y={getY(tick)}>
                        {tick}
                      </text>
                      
                      <line
                        x1={x  + MARGIN / 4}
                        y1={getY(tick)}
                        x2={MARGIN}
                        y2={getY(tick)}
                        stroke={'black'}
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
                  x2={WIDTH - MARGIN}
                />
                {
                getX.ticks &&
                getX.ticks()
                .map(tick => {
                  const y = HEIGHT - MARGIN / 2
                  return (
                    <g key={tick}>
                      <g transform={`translate(${getX(tick)} ${y})`}>
                        <g transform={'rotate(-45)'}>
                          <text 
                            textAnchor="end"
                          >
                            {tick}
                          </text>
                        </g>
                      </g>
                      <line
                        y1={HEIGHT - MARGIN}
                        y2={y - MARGIN / 4}
                        x1={getX(tick)}
                        x2={getX(tick)}
                        stroke={'black'}
                      />
                    </g>
                  )
                })
                }
              </g>
            </g>
            : null
          }
        </svg>
        <LinearGraphControls
          {
            ...{
              xVariable,
              yVariable,
              reverseX,
              reverseY,
              sizeVariable,
              colorVariable,
              labelVariable,
              graphType,
              useRelativeScale,

              searchString,

              onSearchStringChange,
              
              onXVariableChange,
              onYVariableChange,
              onColorVariableChange,
              onSizeVariableChange,
              onLabelVariableChange,
              onToggleReverseX,
              onToggleReverseY,
              onColorPaletteChange,
              onToggleUseRelativeScale,
              onGraphTypeChange,

              onToggleFiltersModeAnd,
              filtersModeAnd,
              onFiltersChange,
              filters,

              filtersOptions,
              colorPalette,
            }
          }
        />
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