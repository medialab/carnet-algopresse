import React, { useState, useEffect, useMemo } from 'react';
import ContainerDimensions from 'react-container-dimensions';
import { scaleLinear, scalePow } from 'd3-scale';
import { extent } from 'd3-array';
import cx from 'classnames';

import { axisPropsFromTickScale } from 'react-d3-axis';

import HorizonControls from './HorizonControls';
import { generatePalette } from '../../helpers/palettes';
import Input from '../DebouncedInput';

import './HorizonContainer.css';
import { evalIfNodeMatches } from '../../helpers/misc';

const GIF_TIME = 500;

export function HorizonContainer({

  width,
  height,
  data,

  sizeVariable,
  colorVariable,
  labelVariable,
  colorPalette: inputColorPalette,
  colorScaleType,
  colorLabels,

  searchString = '',

  onSearchStringChange,
  filtersOptions = {},
  presentationMode,

  onToggleFiltersModeAnd,
  filtersModeAnd,
  onFiltersChange,
  filters: inputFilters = [],
  title,
  legend,
  reverseFlickering,


  onColorVariableChange,
  onSizeVariableChange,
  onLabelVariableChange,
  onColorPaletteChange,
  onColorScaleTypeChange,
  onTitleChange,
  onLegendChange,
  onReverseFlickeringChange,
}) {

  const [zoomedIndex, setZoomedIndex] = useState(null);
  const filters = useMemo(() => inputFilters, [JSON.stringify(inputFilters)]);
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

  // in rotate mode width indexed on the hypothenuse
  // const WIDTH = width;//rotateMode ? parseInt(Math.sqrt(smallestDimension * smallestDimension / 2)) : smallestDimension;
  // const HEIGHT = height;// rotateMode ? parseInt(Math.sqrt(smallestDimension * smallestDimension / 2)) : smallestDimension;
  const MARGIN = width / 15;
  const LATERAL_MARGIN = width / 4;

  // let xRange = [MARGIN, WIDTH - MARGIN * 2];
  // let yRange = [MARGIN, HEIGHT - MARGIN * 2];
  const visHeight = height - MARGIN * 2;
  const xScale = scaleLinear().domain(extent(data.map(d => +d[sizeVariable]))).range([LATERAL_MARGIN, width - LATERAL_MARGIN]).nice();
  const yScale = i => MARGIN + i * (visHeight / data.length) // scaleBand().domain([range(0, data.length)]).range([MARGIN, height - MARGIN]);
  const barHeight = (visHeight / data.length) * .5;
  const barY = ((visHeight / data.length) - barHeight) / 2;
  let { values: xAxisValues } = axisPropsFromTickScale(xScale);
  // manage palette
  const { continuousColorScale, colorPalette } = useMemo(() => {
    let newColorPalette;
    if (inputColorPalette) {
      newColorPalette = inputColorPalette;
    }
    else if (colorVariable && colorVariable !== 'default' && filtersOptions[colorVariable]) {
      const palette = generatePalette(colorVariable, filtersOptions[colorVariable].options.length);
      newColorPalette = filtersOptions[colorVariable].options.reduce((res, option, index) => ({
        ...res,
        [option]: palette[index]
      }), {})
    }
    let newContinuousColorScale;
    if (colorScaleType === 'continuous') {
      let colorRange = ['#D77186', '#61A2DA'];
      if (newColorPalette && newColorPalette['From'] && newColorPalette['To']) {
        colorRange = [newColorPalette['From'], newColorPalette['To']]
      } else if (newColorPalette && newColorPalette['from'] && newColorPalette['to']) {
        colorRange = [newColorPalette['from'], newColorPalette['to']]
      } else {
        newColorPalette = {
          from: '#D77186',
          to: '#61A2DA'
        }
      }
      newContinuousColorScale = scalePow().domain(extent(data.map(d => +d[colorVariable]))).range(colorRange)
    }
    return {
      colorPalette: newColorPalette,
      continuousColorScale: newContinuousColorScale
    }
  }, [JSON.stringify(inputColorPalette), colorScaleType, filtersOptions, colorVariable])/* eslint react-hooks/exhaustive-deps: 0*/

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

  return (
    <>
      <svg
        className={cx("horizonplot")}
        width={width}
        height={height}
      >
        {
          xAxisValues.map(tickValue => (
            <g
              key={tickValue}
              transform={`translate(${xScale(tickValue)}, 0)`}
            >
              <text
                x={0}
                y={MARGIN * .7}
                textAnchor={'middle'}
                style={{
                  fontWeight: tickValue === 0 ? '800' : '400'
                }}
              >
                {tickValue}
              </text>
              <line
                stroke={'black'}
                strokeDasharray={tickValue === 0 ? undefined : '2,2'}
                x1={0}
                x2={0}
                y1={MARGIN}
                y2={height - MARGIN}
                opacity={tickValue === 0 ? 1 : .2}
              />
              <text
                x={0}
                y={height - MARGIN * .7}
                textAnchor={'middle'}
                style={{
                  fontWeight: tickValue === 0 ? '800' : '400'
                }}
              >
                {tickValue}
              </text>

            </g>
          ))
        }
        {
          colorLabels ?
            <>
              <text
                x={LATERAL_MARGIN - MARGIN / 2}
                y={MARGIN * .7}
                textAnchor={'end'}
                style={{
                  fontStyle: 'italic'
                }}
              >
                {colorLabels['From']}
              </text>
              <text
                x={LATERAL_MARGIN - MARGIN / 2}
                y={height - MARGIN * .7}
                textAnchor={'end'}
                style={{
                  fontStyle: 'italic'
                }}
              >
                {colorLabels['From']}
              </text>
              <text
                x={width - LATERAL_MARGIN + MARGIN / 2}
                y={MARGIN * .7}
                textAnchor={'start'}
                style={{
                  fontStyle: 'italic'
                }}
              >
                {colorLabels['To']}
              </text>
              <text
                x={width - LATERAL_MARGIN + MARGIN / 2}
                y={height - MARGIN * .7}
                textAnchor={'start'}
                style={{
                  fontStyle: 'italic'
                }}
              >
                {colorLabels['To']}
              </text>
            </>
            : null
        }
        {
          data.map((datum, i) => {
            const y = yScale(i);
            const color = getColor(datum[colorVariable]);
            const barX = datum[sizeVariable] > 0 ? xScale(0) : xScale(datum[sizeVariable]);
            const barWidth = datum[sizeVariable] > 0 ? xScale(datum[sizeVariable]) - xScale(0) : xScale(0) - xScale(datum[sizeVariable]);
            const labelX = datum[sizeVariable] > 0 ? xScale(datum[sizeVariable]) + 5 : xScale(datum[sizeVariable]) - 5;
            const labelTextAnchor = datum[sizeVariable] > 0 ? 'start' : 'end';
            const labelFontSize = barHeight * 2;
            const isZoomed = i === zoomedIndex;
            const isMatching = !filters.length || evalIfNodeMatches(datum, filters, filtersModeAnd);
            let opacity = 1;
            if (filters.length) {
              if (isMatching && (!highlightedIndex || highlightedIndex.has(i))) {
                if (isZoomed) {
                  opacity = 1;
                } else {
                  opacity = .4;
                }
              } else {
                opacity = .05;
              }
            } else if (highlightedIndex && !highlightedIndex.has(i)) {
              opacity = .2;
            }
            return (
              <g
                key={i}
                transform={`translate(0, ${y})`}
                opacity={opacity}
              >
                <rect
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill={color}
                />
                <text
                  x={labelX}
                  y={isZoomed ? barY + labelFontSize * .7 : barY + labelFontSize * .7}
                  fontSize={isZoomed ? labelFontSize * 2 : labelFontSize}
                  textAnchor={labelTextAnchor}
                  style={{
                    transition: '.5s ease all'
                  }}
                >
                  {datum[labelVariable]}
                </text>

              </g>
            )
          })
        }
      </svg>
      {
        presentationMode ? null :
          <>
            <HorizonControls
              {
              ...{
                sizeVariable,
                colorVariable,
                labelVariable,
                searchString,
                colorScaleType,
                reverseFlickering,

                onSearchStringChange,
                onColorVariableChange,
                onSizeVariableChange,
                onLabelVariableChange,

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

export default function HorizonContainerWithDimensions(props) {
  return (
    <div className="VisContainer IcecreamContainer">

      <ContainerDimensions>
        {
          dimensions => <HorizonContainer {...{ ...props, ...dimensions }} />
        }
      </ContainerDimensions>
    </div>
  )
}