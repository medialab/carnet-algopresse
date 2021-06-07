import React, { useState, useEffect } from 'react';
import ContainerDimensions from 'react-container-dimensions';
import { scaleLinear } from 'd3-scale';
import { min, extent } from 'd3-array';
import cx from 'classnames';

import IceCreamControls from './IceCreamControls';
import { generatePalette } from '../../helpers/palettes';
import Input from '../DebouncedInput';

import './IceCreamContainer.css';
import { evalIfNodeMatches, transformGeometry } from '../../helpers/misc';

const GIF_TIME = 500;

export function IceCreamContainer({

  width,
  height,
  data,

  xVariable,
  reverseX,
  yVariable,
  reverseY,
  sizeVariable,
  colorVariable,
  labelVariable,
  labelsOnTheSide = true,
  colorPalette: inputColorPalette,
  colorScaleType,

  rotateMode,
  searchString = '',

  onSearchStringChange,
  onToggleRotateMode,
  filtersOptions = {},
  presentationMode,

  onToggleFiltersModeAnd,
  filtersModeAnd,
  onFiltersChange,
  filters = [],
  title,
  legend,
  reverseFlickering,


  onXVariableChange,
  onYVariableChange,
  onColorVariableChange,
  onSizeVariableChange,
  onLabelVariableChange,
  onToggleReverseX,
  onToggleReverseY,
  onToggleLabelsOnTheSide,
  onColorPaletteChange,
  onColorScaleTypeChange,
  onTitleChange,
  onLegendChange,
  onReverseFlickeringChange,
}) {

  const [zoomedIndex, setZoomedIndex] = useState(null);
  const [enableZoom, setEnableZoom] = useState(true);
  const updateActive = () => {
    if (filters && filters.length) {
      const existing = zoomedIndex === null ? -1 : zoomedIndex;
      let found = false;
      if (reverseFlickering) {
        for (let i = existing - 1; i >= 0; i--) {
          if (evalIfNodeMatches(data[i], filters, filtersModeAnd)) {
            setZoomedIndex(i);
            found = true;
            break;
          }
        }
        if (!found) {
          for (let i = data.length - 1; i >= 0; i--) {
            if (evalIfNodeMatches(data[i], filters, filtersModeAnd)) {
              setZoomedIndex(i);
              break;
            }
          }
        }
      } else {
        for (let i = existing + 1; i < data.length; i++) {
          if (evalIfNodeMatches(data[i], filters, filtersModeAnd)) {
            setZoomedIndex(i);
            found = true;
            break;
          }
        }
        if (!found) {
          for (let i = 0; i < data.length; i++) {
            if (evalIfNodeMatches(data[i], filters, filtersModeAnd)) {
              setZoomedIndex(i);
              break;
            }
          }
        }
      }

    }
  }

  useEffect(() => {
    if (filters && filters.length) {
      if (zoomedIndex === null) {
        updateActive();
      }
      setTimeout(updateActive, GIF_TIME);
    } else {
      setZoomedIndex(null);
    }
    /* eslint react-hooks/exhaustive-deps : 0 */
  }, [
    JSON.stringify(filters),
    filtersModeAnd,
    data,
    zoomedIndex
  ])

  const smallestDimension = min([width, height]);
  // in rotate mode width indexed on the hypothenuse
  const WIDTH = rotateMode ? parseInt(Math.sqrt(smallestDimension * smallestDimension / 2)) : smallestDimension;
  const HEIGHT = rotateMode ? parseInt(Math.sqrt(smallestDimension * smallestDimension / 2)) : smallestDimension;

  const MIN_AREA = smallestDimension / 50;
  const MAX_AREA = smallestDimension / 2;
  const MARGIN = WIDTH / 15;

  let xRange = [MARGIN, WIDTH - MARGIN * 2];
  let yRange = [MARGIN, HEIGHT - MARGIN * 2];
  if (reverseX) {
    xRange = xRange.reverse();
  }
  if (reverseY) {
    yRange = yRange.reverse();
  }

  const getX = xVariable && xVariable !== 'default' ? scaleLinear().range(xRange).domain([0, 1]) : () => 0;
  const getY = yVariable && yVariable !== 'default' ? scaleLinear().range(yRange).domain([0, 1]) : () => 0;
  const getSize = sizeVariable && sizeVariable !== 'default' ? scaleLinear().domain(extent(data.map(d => +d[sizeVariable]))).range([MIN_AREA, MAX_AREA]) : () => 0;

  // manage palette
  let colorPalette;
  if (inputColorPalette) {
    colorPalette = inputColorPalette;
  }
  else if (colorVariable && colorVariable !== 'default' && filtersOptions[colorVariable]) {
    const palette = generatePalette(colorVariable, filtersOptions[colorVariable].options.length);
    colorPalette = filtersOptions[colorVariable].options.reduce((res, option, index) => ({
      ...res,
      [option]: palette[index]
    }), {})
  }
  let continuousColorScale;
  if (colorScaleType === 'continuous') {
    let colorRange = ['#D77186', '#61A2DA'];
    if (colorPalette && colorPalette['from'] && colorPalette['to']) {
      colorRange = [colorPalette['from'], colorPalette['to']]
    } else {
      colorPalette = {
        from: '#D77186',
        to: '#61A2DA'
      }
    }
    continuousColorScale = scaleLinear().domain(extent(data.map(d => +d[colorVariable]))).range(colorRange)
  }
  let getColor = (val) => {
    if (colorScaleType === 'continuous') {
      return continuousColorScale(+val);
    } else return colorPalette ? colorPalette[val] : 'grey';
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
  let rotateTransform = { rotate: 0 };
  if (rotateMode) {
    rotateTransform = {
      rotate: -45,
      translate: { x: 0, y: smallestDimension / 2 }
    }
  }
  // wrapping function for transforms
  const transf = (x, y) => transformGeometry({ x, y }, rotateTransform)
  // dimensions of control background rect
  const { x: point1X, y: point1Y } = transformGeometry({
    x: 0,
    y: 0
  }, rotateTransform)
  const { x: point2X, y: point2Y } = transformGeometry({
    x: WIDTH,
    y: 0
  }, rotateTransform)
  const { x: point3X, y: point3Y } = transformGeometry({
    x: WIDTH,
    y: HEIGHT
  }, rotateTransform)
  const { x: point4X, y: point4Y } = transformGeometry({
    x: 0,
    y: HEIGHT
  }, rotateTransform)

  return (
    <>
      <svg
        className={cx("scatterplot", { 'zoom-mode': zoomedIndex !== null && enableZoom })}
        width={width}
        height={height}
      >
        <g
          transform={`translate(${WIDTH < width ? (width - smallestDimension) / 2 : 0}, ${HEIGHT < height ? (height - smallestDimension) * .66 : 0})`}
        >
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
                x2={transf(MARGIN, HEIGHT - MARGIN * 2).x}
                y2={transf(MARGIN, HEIGHT - MARGIN * 2).y}
                stroke={'black'}
              />
              {
                getY.ticks &&
                getY.ticks()
                  .map(tick => {

                    const { x, y } = transf(MARGIN, getY(tick))
                    const { x: x1, y: y1 } = transf(MARGIN / 4, getY(tick) + MARGIN / 6)
                    const { x: x2, y: y2 } = transf(MARGIN / 2, getY(tick))
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
                transform={rotateMode ? `translate(${WIDTH / 2 - MARGIN * 1.5}, ${HEIGHT + MARGIN * 2.5})rotate(45)` : `translate(0, ${MARGIN / 2 - 2})`}
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
                x1={transf(MARGIN, HEIGHT - MARGIN * 2).x}
                y1={transf(MARGIN, HEIGHT - MARGIN * 2).y}
                x2={transf(WIDTH - MARGIN * 2, HEIGHT - MARGIN * 2).x}
                y2={transf(WIDTH - MARGIN * 2, HEIGHT - MARGIN * 2).y}
                stroke={'black'}
              />
              {
                getX.ticks &&
                getX.ticks()
                  .map(tick => {
                    const { x, y } = transf(getX(tick), HEIGHT - MARGIN * 2);
                    const { x: x1, y: y1 } = transf(getX(tick), HEIGHT - MARGIN * 1.66);
                    const { x: x2, y: y2 } = transf(getX(tick), HEIGHT - MARGIN * 1.25);
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
                transform={rotateMode ? `translate(${WIDTH}, ${HEIGHT + MARGIN * 1.5})rotate(-45)` : `translate(${WIDTH - MARGIN * 1.5}, ${HEIGHT - MARGIN / 3 - 2})`}
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
                      x2={transf(getX(tick), WIDTH - MARGIN * 2).x}
                      y2={transf(getX(tick), WIDTH - MARGIN * 2).y}
                      stroke="lightgrey"
                    />
                  ))
              }
            </g>
            <g
              className="plot-objects-container"
              onMouseEnter={() => setEnableZoom(false)}
              onMouseLeave={() => setEnableZoom(true)}
            >
              {
                data
                  .sort((a, b) => {
                    if (getY(a[yVariable]) > getY(b[yVariable])) {
                      return 1;
                    }
                    return -1;
                  })
                  .map((datum, index) => {
                    const radius = Math.sqrt(getSize(+datum[sizeVariable]) / Math.PI);
                    let { x, y } = transf(getX(+datum[xVariable]), getY(+datum[yVariable]));
                    let { x: xForXAxis, y: yForXAxis } = transf(getX(datum[xVariable]), getY.range ? getY.range()[0] : 0);
                    let { x: xForYAxis, y: yForYAxis } = transf(getX.range ? getX.range()[0] : 0, getY(datum[yVariable]));
                    let labelX = x + radius + smallestDimension / 100;
                    let labelY = rotateMode ? y - smallestDimension / 200 : y + smallestDimension / 200;
                    let pointerStartCoords = transf(getX(datum[xVariable]) + radius, getY(datum[yVariable]));
                    if (labelsOnTheSide) {
                      let { x: newX, y: newY } = transf(WIDTH - MARGIN * 1.7, MARGIN + index * (HEIGHT - MARGIN * 3) / data.length);
                      labelX = newX;
                      labelY = newY;
                    }

                    let opacity = 1;
                    const isMatching = !filters.length || evalIfNodeMatches(datum, filters, filtersModeAnd);
                    if (filters.length) {
                      if (isMatching && (!highlightedIndex || highlightedIndex.has(index))) {
                        opacity = 1;
                      } else {
                        opacity = .05;
                      }
                    } else if (highlightedIndex && !highlightedIndex.has(index)) {
                      opacity = .2;
                    }

                    const isZoomed = index === zoomedIndex && enableZoom === true;

                    return (
                      <g
                        key={index}
                        className={cx("plot-object", { 'is-matching': isMatching, 'is-zoomed': isZoomed })}
                        opacity={opacity}
                      >
                        <line
                          className="axis-line"
                          stroke="grey"
                          strokeDasharray='1,1'
                          x1={x}
                          y1={y}
                          x2={xForYAxis}
                          y2={yForYAxis}
                        />
                        <line
                          className="axis-line"
                          stroke="grey"
                          strokeDasharray='1,1'
                          x1={x}
                          y1={y}
                          x2={xForXAxis}
                          y2={yForXAxis}
                        />
                        <circle
                          cx={x}
                          cy={y}
                          r={radius}
                          fill={getColor(datum[colorVariable])}
                          opacity={.8}
                        />
                        {
                          labelsOnTheSide ?
                            <line
                              x1={pointerStartCoords.x}
                              y1={pointerStartCoords.y}
                              x2={labelX}
                              y2={labelY}
                              stroke="lightgrey"
                              strokeDasharray='4,4'
                            />
                            : null
                        }
                        <g
                          transform={`translate(${labelX}, ${labelY})`}
                        >
                          <text
                            transform={rotateMode ? 'rotate(-45)' : ''}
                            style={{
                              fontSize: rotateMode && labelsOnTheSide ? HEIGHT / 70 : undefined
                            }}
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
        </g>
      </svg>
      {
        presentationMode ? null :
          <>
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
                labelsOnTheSide,

                rotateMode,
                searchString,
                colorScaleType,
                reverseFlickering,

                onSearchStringChange,
                onToggleRotateMode,

                onXVariableChange,
                onYVariableChange,
                onColorVariableChange,
                onSizeVariableChange,
                onLabelVariableChange,
                onToggleLabelsOnTheSide,
                onToggleReverseX,
                onToggleReverseY,
                onColorPaletteChange,
                onColorScaleTypeChange,
                onReverseFlickeringChange,

                onToggleFiltersModeAnd,
                filtersModeAnd,
                onFiltersChange,
                filters,

                filtersOptions,
                colorPalette,
              }
              }
            />
            <form onSubmit={e => { e.preventDefault() }} className="caption-editor-container">
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

export default function IceCreamContainerWithDimensions(props) {
  return (
    <div className="VisContainer IcecreamContainer">

      <ContainerDimensions>
        {
          dimensions => <IceCreamContainer {...{ ...props, ...dimensions }} />
        }
      </ContainerDimensions>
    </div>
  )
}