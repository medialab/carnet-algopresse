import React, {useEffect, useState} from 'react';
import cx from 'classnames';
import Slider from 'rc-slider';
import debounce from 'lodash/debounce';

import ControlButton from '../ControlButton';
import FiltersEditor from '../FiltersEditor';
import VariablesEditor from '../VariablesEditor';
import ColorLegend from '../ColorLegend';

const SLIDER_MARKS = {
  '0.25': 'défaut'
};

function DebouncedSlider({defaultValue, onChange}) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue])

  const onSliderChange = newValue => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <Slider
      min={0}
      max={1}
      step={0.01}
      defaultValue={defaultValue}
      value={value}
      onChange={onSliderChange}
      marks={SLIDER_MARKS}
    />
  );
}


export default function GraphControls({
  rescale, 
  zoomIn, 
  zoomOut, 
  searchString = '',
  onSearchStringChange,
  filtersModeAnd,
  onToggleFiltersModeAnd,
  labelDensity,

  filtersOptions,
  filters = [],
  onFiltersChange,

  nodeSizeVariable,
  nodeColorVariable,
  nodeLabelVariable,
  onNodeSizeVariableChange,
  onNodeColorVariableChange,
  onNodeLabelVariableChange,
  onLabelDensityChange,
  colorPalette,
}) {
  const handleSearchChange = e => onSearchStringChange(e.target.value);
  const [isMinified, setIsMinified] = useState(true)
  return (
    <>
      <button onClick={() => setIsMinified(!isMinified)} className={cx('minify-button', {'is-active': !isMinified})}>
        {'Options'}
      </button>
      <ul className={cx("VisControls GraphControls", {'is-minified': isMinified})}>
        
        <li className="vis-controls-item camera">
        
        <ControlButton onClick={zoomOut}>
          -
        </ControlButton>
        <ControlButton onClick={zoomIn}>
          +
        </ControlButton>
        <ControlButton onClick={rescale}>
          Recentrer
        </ControlButton>
        </li>
        <li className="vis-controls-item">
          <form onSubmit={e => e.preventDefault()}>
            <input type="text" onChange={handleSearchChange} placeholder="rechercher" value={searchString} />
          </form>
        </li>
        
        <li className="vis-controls-item">
          <VariablesEditor
            {
              ...{
                options: filtersOptions,
                variables: [{
                    title: 'Taille des noeuds',
                    onChange: onNodeSizeVariableChange,
                    value: nodeSizeVariable,
                    type: 'number'
                  },
                  {
                    title: 'Couleur des noeuds',
                    value: nodeColorVariable,
                    onChange: onNodeColorVariableChange,
                    type: 'color'
                  },
                  {
                    title: 'Label des noeuds',
                    value: nodeLabelVariable,
                    onChange: onNodeLabelVariableChange,
                    type: 'string'
                  }
                ],
              }
            }
          />
        </li>
        {
            nodeColorVariable && nodeColorVariable !== 'default' ?
            <ColorLegend
              colorPalette={colorPalette}
            />
            : null
          }
        <li className="vis-controls-item">
        <FiltersEditor
          {
            ...{
              onToggleFiltersModeAnd,
              filtersModeAnd,
              filtersOptions,
              onFiltersChange,
              filters
            }
          }
        />
        </li>
        <li className="vis-controls-item slider-wrapper">
          <form onSubmit={e => e.preventDefault()}>
            <h5>Densité des labels</h5>
            <div className="slider-container">
                <DebouncedSlider
                  defaultValue={labelDensity}
                  onChange={debounce(onLabelDensityChange, 300)}
                />
              </div>
          </form>
        </li>
      </ul>
    </>
  );
}