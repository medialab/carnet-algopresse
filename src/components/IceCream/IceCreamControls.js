import React, {useState} from 'react';
import cx from 'classnames';

import VariablesEditor from '../VariablesEditor';
import ColorLegend from '../ColorLegend';


export default function IceCreamControls({
  xVariable,
  reverseX,

  yVariable,
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
                    title: 'Inverser les x',
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
                  
                ],
              }
            }
          />
        </li>
        {
            colorVariable && colorVariable !== 'default' ?
            <ColorLegend
              colorPalette={colorPalette}
            />
            : null
        }
      </ul>
    </>
  );
}