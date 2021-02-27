import React from 'react';
import ContainerDimensions from 'react-container-dimensions';
import {scaleLinear} from 'd3-scale';
import {min, extent} from 'd3-array';

import IceCreamControls from './IceCreamControls';
import {generatePalette} from '../../helpers/palettes';

import './IceCreamContainer.css';

function IceCreamContainer({

  width, height,
  data,

  xVariable,
  reverseX,
  yVariable,
  reverseY,
  sizeVariable,
  colorVariable,
  labelVariable,

  rotateMode,
  searchString = '',

  onSearchStringChange,
  onToggleRotateMode,
  
  onXVariableChange,
  onYVariableChange,
  onColorVariableChange,
  onSizeVariableChange,
  onLabelVariableChange,
  onToggleReverseX,
  onToggleReverseY,
  filtersOptions = {},
}) {
  const smallestDimension = min([width, height])
  const WIDTH = smallestDimension;
  const HEIGHT = smallestDimension;
  const MIN_RADIUS = smallestDimension / 100;
  const MAX_RADIUS = smallestDimension / 50;
  const MARGIN = smallestDimension / 10;

  let xRange = [MARGIN, WIDTH - MARGIN * 2];
  let yRange = [MARGIN, HEIGHT - MARGIN ];
  if (reverseX) {
    xRange = xRange.reverse();
  }
  if (reverseY) {
    yRange = yRange.reverse();
  }

  const getX = xVariable && xVariable !== 'default' ?  scaleLinear().range(xRange).domain(extent(data.map(d => +d[xVariable]))) : () => 0;
  const getY = yVariable && yVariable !== 'default' ?  scaleLinear().range(yRange).domain(extent(data.map(d => +d[yVariable]))) : () => 0;
  const getSize = sizeVariable && sizeVariable !== 'default' ?  scaleLinear().domain(extent(data.map(d => +d[sizeVariable]))).range([MIN_RADIUS, MAX_RADIUS]) : () => 0;

  let palette = colorVariable && colorVariable !== 'default' ? generatePalette(colorVariable, filtersOptions[colorVariable].options.length) : undefined
  let getColor = () => 'grey';
  let colorPalette;
  if (palette) {
    colorPalette = filtersOptions[colorVariable].options.reduce((res, option, index) => ({
      ...res,
      [option]: palette[index]
    }), {})
    getColor = val => {
      return colorPalette[val]
    }
  }
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
        <svg className="scatterplot" width={WIDTH} height={HEIGHT} transform={rotateMode ? 'rotate(-45)' : ''}>
          <g transform={`translate(${WIDTH/20}, 0)scale(.9)`}>
            <g className="axis axis-left">
              <line x1={MARGIN} x2={MARGIN} y1={MARGIN} y2={HEIGHT - MARGIN} stroke={'black'} />
              {
                getY.ticks &&
                getY.ticks()
                .map(tick => {
                  const y = getY(tick);
                  return (
                    <g key={tick} transform={`translate(0, ${y})`}>
                      <text transform={rotateMode ? `rotate(45)translate(${MARGIN/4}, ${-MARGIN/3})`: ''}>
                        {tick}
                      </text>
                      <line
                        x1={MARGIN * 0.8}
                        x2={MARGIN}
                        y1={0}
                        y2={0}
                        stroke={'black'}
                      />
                    </g>
                  )
                })
              }
              <text 
                className="axis-variable-name" 
                x={0} 
                y={MARGIN / 2 - 2} 
                transform={rotateMode ? `rotate(90)translate(${(HEIGHT - MARGIN) * .5}, ${-MARGIN * .7})` : ''}
              >
                {yVariable}
              </text>
            </g>
            <g className="axis axis-bottom">
              <line x1={MARGIN} x2={WIDTH - MARGIN * 2} y1={HEIGHT - MARGIN} y2={HEIGHT - MARGIN} stroke={'black'} />
              {
                getX.ticks &&
                getX.ticks()
                .map(tick => {
                  const x = getX(tick);
                  return (
                    <g key={tick} transform={`translate(${x}, ${HEIGHT})`}>
                      <text y={-MARGIN / 3} transform={rotateMode ? `rotate(45)translate(${-MARGIN * .4}, 0)`: ''}>
                        {tick}
                      </text>
                      <line
                        x1={0}
                        x2={0}
                        y1={-MARGIN}
                        y2={-MARGIN * .8}
                        stroke={'black'}
                      />
                    </g>
                  )
                })
              }
              <text className="axis-variable-name" 
                x={WIDTH - MARGIN * 1.5} 
                y={HEIGHT - MARGIN / 3 - 2}
                transform={rotateMode ? `translate(${-(WIDTH - MARGIN) / 2}, ${MARGIN/3})` : ''}
              >
                {xVariable}
              </text>
            </g>
            <g className={"ticks-container"}>
              {
                
                  getY.ticks &&
                  getY.ticks()
                  .map(tick => (
                    <line 
                      key={tick}
                      x1={MARGIN}
                      x2={WIDTH - MARGIN}
                      y1={getY(tick)}
                      y2={getY(tick)}
                      stroke="lightgrey"
                    />
                  ))
              }
              {
                
                getX.ticks &&
                getX.ticks()
                .map(tick => (
                  <line 
                    key={tick}
                    y1={MARGIN}
                    y2={WIDTH - MARGIN}
                    x1={getY(tick)}
                    x2={getY(tick)}
                    stroke="lightgrey"
                  />
                ))
            }
            </g>
            <g className="plot-objects-container">
            {
              data.map((datum, index) => {
                return (
                  <g 
                    key={index} 
                    className="plot-object"
                    transform={`translate(${getX(datum[xVariable])}, ${getY(datum[yVariable])})`}
                    opacity={!highlightedIndex || highlightedIndex.has(index) ? 1 : .2}
                  >
                    <circle 
                      r={getSize(datum[sizeVariable])} 
                      fill={getColor(datum[colorVariable])} 
                      opacity={.8}
                    />
                    <text x={getSize(datum[sizeVariable]) + smallestDimension / 100}>
                      {datum[labelVariable]}
                    </text>
                  </g>
                )
              })
            }
            </g>
          </g>
        </svg>
        <IceCreamControls
          {
            ...{
              xVariable,
              yVariable,
              reverseX,
              reverseY,
              sizeVariable,
              colorVariable,
              labelVariable,

              rotateMode,
              searchString,

              onSearchStringChange,
              onToggleRotateMode,
              
              onXVariableChange,
              onYVariableChange,
              onColorVariableChange,
              onSizeVariableChange,
              onLabelVariableChange,
              onToggleReverseX,
              onToggleReverseY,

              filtersOptions,
              colorPalette,
            }
          }
        />
    </>
  );
}

export default function IceCreamContainerWithDimensions(props) {
  return (
    <div className="VisContainer IcecreamContainer">

    <ContainerDimensions>
      {
        dimensions => <IceCreamContainer {...{...props, ...dimensions}} />
      }
    </ContainerDimensions>
    </div>
  )
}