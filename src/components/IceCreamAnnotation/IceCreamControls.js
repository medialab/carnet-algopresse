import React, {useState} from 'react';
import cx from 'classnames';

import VariablesEditor from '../VariablesEditor';
import ColorLegend from '../ColorLegend';
import FiltersEditor from '../FiltersEditor';

export default function IceCreamControls({
  xVariable,
  reverseX,

  yVariable,
  reverseY,

  sizeVariable,
  colorVariable,
  labelVariable,
  labelsOnTheSide,
  colorScaleType,

  onToggleFiltersModeAnd,
  filtersModeAnd,
  onFiltersChange,
  filters,

  rotateMode,
  searchString,
  reverseFlickering,

  onSearchStringChange,
  onToggleRotateMode,
  
  onXVariableChange,
  onYVariableChange,
  onColorVariableChange,
  onSizeVariableChange,
  onLabelVariableChange,
  onToggleLabelsOnTheSide,
  onColorPaletteChange,

  onToggleReverseX,
  onToggleReverseY,
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
                    title: 'X des points',
                    onChange: onXVariableChange,
                    value: xVariable,
                    type: 'number'
                  },
                  {
                    title: 'Inverser les x',
                    onChange: onToggleReverseX,
                    value: reverseX,
                    type: 'boolean'
                  },
                  {
                    title: 'Y des points',
                    onChange: onYVariableChange,
                    value: yVariable,
                    type: 'number'
                  },
                  {
                    title: 'Inverser les y',
                    onChange: onToggleReverseY,
                    value: reverseY,
                    type: 'boolean'
                  },
                  {
                    title: 'Taille des points',
                    onChange: onSizeVariableChange,
                    value: sizeVariable,
                    type: 'number'
                  },
                  {
                    title: 'Couleur des points',
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
                    title: 'Labels des points',
                    onChange: onLabelVariableChange,
                    value: labelVariable,
                    type: 'string'
                  },
                  {
                    title: 'Tourner la visualisation à 45°',
                    onChange: onToggleRotateMode,
                    value: rotateMode,
                    type: 'boolean'
                  },
                  {
                    title: 'Afficher les labels sur le côté',
                    onChange: onToggleLabelsOnTheSide,
                    value: labelsOnTheSide,
                    type: 'boolean'
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