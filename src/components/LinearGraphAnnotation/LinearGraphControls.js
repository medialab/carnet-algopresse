import React, {useState} from 'react';
import cx from 'classnames';

import VariablesEditor from '../VariablesEditor';
import ColorLegend from '../ColorLegend';
import FiltersEditor from '../FiltersEditor';



export default function LinearGraphControls({
  xVariable,
  xLabelVariable,
  // reverseX,
  graphType,
  yVariable,
  // reverseY,

  colorVariable,
  // searchString,
  useRelativeScale,

  onToggleFiltersModeAnd,
  filtersModeAnd,
  onFiltersChange,
  filters,

  // onSearchStringChange,
  onToggleUseRelativeScale,
  onGraphTypeChange,
  
  onXVariableChange,
  onXLabelVariableChange,
  onYVariableChange,
  onColorVariableChange,

  onColorPaletteChange,

  // onToggleReverseX,
  // onToggleReverseY,
  
  filtersOptions,
  colorPalette,
}) {
  // const handleSearchChange = e => onSearchStringChange(e.target.value);
  const [isMinified, setIsMinified] = useState(true)
  return (
    <>
      <button onClick={() => setIsMinified(!isMinified)} className={cx('minify-button', {'is-active': !isMinified})}>
        {'éditer'}
      </button>
      <ul className={cx("VisControls", {'is-minified': isMinified})}>
        
        {/* <li className="vis-controls-item">
        <form onSubmit={e => e.preventDefault()}>
          <input type="text" onChange={handleSearchChange} placeholder="rechercher" value={searchString} />
        </form>
        </li> */}
        <li className="vis-controls-item">
          <VariablesEditor
            {
              ...{
                options: filtersOptions,
                variables: [
                  {
                    title: 'Type de graphe',
                    onChange: onGraphTypeChange,
                    localOptions: [[
                      'linegraph',
                      {title: 'lignes'}
                    ], [
                      'histogram',
                      {title: 'histogramme'}
                    ]],
                    value: graphType,
                    type: 'string'
                  },
                  {
                    title: 'Variable des X',
                    onChange: onXVariableChange,
                    value: xVariable,
                    type: 'number'
                  },
                  {
                    title: 'Label des X',
                    onChange: onXLabelVariableChange,
                    value: xLabelVariable,
                    type: 'string'
                  },
                  // {
                  //   title: 'Inverser les x',
                  //   onChange: onToggleReverseX,
                  //   value: reverseX,
                  //   type: 'boolean'
                  // },
                  {
                    title: 'Label des Y',
                    onChange: onYVariableChange,
                    value: yVariable,
                    type: 'number'
                  },
                  // {
                  //   title: 'Inverser les y',
                  //   onChange: onToggleReverseY,
                  //   value: reverseY,
                  //   type: 'boolean'
                  // },
                  {
                    title: 'Utiliser une échelle relative pour les Y quand filtré',
                    onChange: onToggleUseRelativeScale,
                    value: useRelativeScale,
                    type: 'boolean'
                  },
                  {
                    title: 'Couleur des points',
                    onChange: onColorVariableChange,
                    value: colorVariable,
                    type: 'color'
                  },
                  // {
                  //   title: 'Labels des points',
                  //   onChange: onLabelVariableChange,
                  //   value: labelVariable,
                  //   type: 'string'
                  // },
                ],
              }
            }
          />
        </li>
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
        {
            colorVariable && colorVariable !== 'default' ?
            <ColorLegend
              colorPalette={colorPalette}
              onChange={onColorPaletteChange}
            />
            : null
        }
      </ul>
    </>
  );
}