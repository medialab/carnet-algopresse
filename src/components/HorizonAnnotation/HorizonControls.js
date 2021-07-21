import React, {useState} from 'react';
import cx from 'classnames';

import VariablesEditor from '../VariablesEditor';
import ColorLegend from '../ColorLegend';
import FiltersEditor from '../FiltersEditor';

export default function HorizonControls({

  sizeVariable,
  colorVariable,
  labelVariable,
  colorScaleType,

  onToggleFiltersModeAnd,
  filtersModeAnd,
  onFiltersChange,
  filters,

  searchString,
  reverseFlickering,

  onSearchStringChange,
  onToggleRotateMode,
  
  
  onColorVariableChange,
  onSizeVariableChange,
  onLabelVariableChange,
  onColorPaletteChange,

  onColorScaleTypeChange,
  onReverseFlickeringChange,
  
  filtersOptions,
  colorPalette,
}) {
  const handleSearchChange = e => onSearchStringChange(e.target.value);
  const [isMinified, setIsMinified] = useState(true)
  return (
    <>
      <button onClick={() => setIsMinified(!isMinified)} className={cx('minify-button', {'is-active': !isMinified})}>
        {'éditer'}
      </button>
      <ul className={cx("VisControls", {'is-minified': isMinified})}>
        
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
                variables: [
                  {
                    title: 'Taille des barres',
                    onChange: onSizeVariableChange,
                    value: sizeVariable,
                    type: 'number'
                  },
                  {
                    title: 'Couleur des barres',
                    onChange: onColorVariableChange,
                    value: colorVariable,
                    type: 'color'
                  },
                  {
                    title: 'Type d\'échelle pour la couleur',
                    onChange: onColorScaleTypeChange,
                    localOptions: [[
                      'discrete',
                      {title: 'discrète'}
                    ], [
                      'continuous',
                      {title: 'continue'}
                    ]],
                    value: colorScaleType,
                    type: 'string'
                  },
                  {
                    title: 'Labels des barres',
                    onChange: onLabelVariableChange,
                    value: labelVariable,
                    type: 'string'
                  },
                  {
                    title: 'Inverser le clignotement quand filtré',
                    onChange: onReverseFlickeringChange,
                    value: reverseFlickering,
                    type: 'boolean'
                  },
                  
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