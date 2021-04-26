import React from 'react';
import ContainerDimensions from 'react-container-dimensions';
import {scaleLinear} from 'd3-scale';
import {min, extent} from 'd3-array';

import IceCreamControls from './IceCreamControls';
import {generatePalette} from '../../helpers/palettes';

import './IceCreamContainer.css';
import { transformGeometry } from '../../helpers/misc';

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
  // in rotate mode width indexed on the hypothenuse
  const WIDTH = rotateMode ? parseInt(Math.sqrt(smallestDimension * smallestDimension / 2)) : smallestDimension;
  const HEIGHT = rotateMode ? parseInt(Math.sqrt(smallestDimension * smallestDimension / 2)) : smallestDimension;

  const MIN_RADIUS = smallestDimension / 100;
  const MAX_RADIUS = smallestDimension / 50;
  const MARGIN = WIDTH / 10;

  let xRange = [MARGIN, WIDTH - MARGIN * 2];
  let yRange = [MARGIN, HEIGHT - MARGIN ];
  if (reverseX) {
    xRange = xRange.reverse();
  }
  if (reverseY) {
    yRange = yRange.reverse();
  }

  // const getX = xVariable && xVariable !== 'default' ?  scaleLinear().range(xRange).domain(extent(data.map(d => +d[xVariable]))) : () => 0;
  // const getY = yVariable && yVariable !== 'default' ?  scaleLinear().range(yRange).domain(extent(data.map(d => +d[yVariable]))) : () => 0;
  const getX = xVariable && xVariable !== 'default' ?  scaleLinear().range(xRange).domain([0, 1]) : () => 0;
  const getY = yVariable && yVariable !== 'default' ?  scaleLinear().range(yRange).domain([0, 1]) : () => 0;
  const getSize = sizeVariable && sizeVariable !== 'default' ?  scaleLinear().domain(extent(data.map(d => +d[sizeVariable]))).range([MIN_RADIUS, MAX_RADIUS]) : () => 0;

  // manage palette
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
  let rotateTransform = {rotate: 0};
  if (rotateMode) {
    rotateTransform = {
      rotate: -45,
      translate: {x: 0, y: smallestDimension/2}
    }
  }
  // wrapping function for transforms
  const transf = (x, y) => transformGeometry({x, y}, rotateTransform)
  // dimensions of control background rect
  const {x: point1X, y: point1Y} = transformGeometry({
    x: 0,
    y: 0
  }, rotateTransform)
  const {x: point2X, y: point2Y} = transformGeometry({
    x: WIDTH,
    y: 0
  }, rotateTransform)
  const {x: point3X, y: point3Y} = transformGeometry({
    x: WIDTH,
    y: HEIGHT
  }, rotateTransform)
  const {x: point4X, y: point4Y} = transformGeometry({
    x: 0,
    y: HEIGHT
  }, rotateTransform)
  
  return (
    <>
        <svg className="scatterplot" width={smallestDimension} height={smallestDimension}>
          <polygon 
            points={`${point1X},${point1Y} ${point2X},${point2Y} ${point3X},${point3Y} ${point4X},${point4Y}`} 
            width={WIDTH} 
            height={HEIGHT} 
            fill="white" 
          />
          <g transform={`translate(${rotateMode ? 0 : MARGIN / 2}, ${rotateMode ? -MARGIN : 0})${rotateMode ? 'scale(1.05)' : ''}`}>
            <g className="axis axis-left">
              <line 
                x1={transf(MARGIN, MARGIN).x} 
                y1={transf(MARGIN, MARGIN).y} 
                x2={transf(MARGIN, HEIGHT - MARGIN).x} 
                y2={transf(MARGIN, HEIGHT - MARGIN).y} 
                stroke={'black'} 
              />
              {
                getY.ticks &&
                getY.ticks()
                .map(tick => {
   
                  const {x, y} = transf(MARGIN, getY(tick))
                  const {x: x1, y: y1} = transf(MARGIN/4, getY(tick) + MARGIN/6)
                  const {x: x2, y: y2} = transf(MARGIN/2, getY(tick))
                  return (
                    <g key={tick}>
                      <text textAnchor="end" x={x1} y={y1}>
                        {tick}
                      </text>
                      <line
                        x1={x}
                        y1={y}
                        x2={x2}
                        y2={y2}
                        stroke={'black'}
                      />
                    </g>
                  )
                })
              }
              <g
                transform={rotateMode ? `translate(${WIDTH/2 - MARGIN * 1.5}, ${HEIGHT + MARGIN * 2})rotate(45)` : `translate(0, ${MARGIN / 2 - 2})`}
              >
                <text 
                  className="axis-variable-name" 
                  textAnchor={rotateMode ? 'end' : 'start'}
                >
                  {yVariable}
                </text>
              </g>
            </g>
            <g className="axis axis-bottom">
              <line 
                x1={transf(MARGIN, HEIGHT - MARGIN).x} 
                y1={transf(MARGIN, HEIGHT - MARGIN).y} 
                x2={transf(WIDTH - MARGIN * 2, HEIGHT - MARGIN).x} 
                y2={transf(WIDTH - MARGIN * 2, HEIGHT - MARGIN).y} 
                stroke={'black'} 
              />
              {
                getX.ticks &&
                getX.ticks()
                .map(tick => {
                  const {x, y} = transf(getX(tick), HEIGHT - MARGIN);
                  const {x: x1, y: y1} = transf(getX(tick), HEIGHT - MARGIN * .66);
                  const {x: x2, y: y2} = transf(getX(tick), HEIGHT - MARGIN / 4);
                  return (
                    <g key={tick}>
                      <text textAnchor="center" x={x2} y={y2}>
                        {tick}
                      </text>
                      <line
                        x1={x}
                        y1={y}
                        x2={x1}
                        y2={y1}
                        stroke={'black'}
                      />
                    </g>
                  )
                })
              }
              <g
                transform={rotateMode ? `translate(${WIDTH + MARGIN * 1.5}, ${HEIGHT + MARGIN})rotate(-45)` : `translate(${WIDTH - MARGIN * 1.5}, ${HEIGHT - MARGIN / 3 - 2})`}
              >
                <text 
                  className="axis-variable-name" 
                  textAnchor={rotateMode ? 'end' : 'start'}
                >
                  {xVariable}
                </text>
              </g>
            </g>
            <g className={"ticks-container"}>
              {
                
                  getY.ticks &&
                  getY.ticks()
                  .map(tick => (
                    <line 
                      key={tick}
                      x1={transf(MARGIN, getY(tick)).x}
                      y1={transf(MARGIN, getY(tick)).y}
                      x2={transf(WIDTH - MARGIN * 2, getY(tick)).x}
                      y2={transf(WIDTH - MARGIN * 2, getY(tick)).y}
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
                    x1={transf(getX(tick), MARGIN).x}
                    y1={transf(getX(tick), MARGIN).y}
                    x2={transf(getX(tick), WIDTH - MARGIN).x}
                    y2={transf(getX(tick), WIDTH - MARGIN).y}
                    stroke="lightgrey"
                  />
                ))
            }
            </g>
            <g className="plot-objects-container">
            {
              data.map((datum, index) => {
                const {x, y} = transf(getX(datum[xVariable]), getY(datum[yVariable]));
                let labelX = x + getSize(datum[sizeVariable]) + smallestDimension / 100;
                let labelY = rotateMode ? y - smallestDimension / 200 : y + smallestDimension / 200;
                
                return (
                  <g 
                    key={index} 
                    className="plot-object"
                    opacity={!highlightedIndex || highlightedIndex.has(index) ? 1 : .2}
                  >
                    <circle 
                      cx={x}
                      cy={y}
                      r={getSize(datum[sizeVariable])} 
                      fill={getColor(datum[colorVariable])} 
                      opacity={.8}
                    />
                    <g 
                      transform={`translate(${labelX}, ${labelY})`}
                    >
                      <text
                        transform={rotateMode ? 'rotate(-45)': ''}
                      >
                        {datum[labelVariable]}
                      </text>
                    </g>
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