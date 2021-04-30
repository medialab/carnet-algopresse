
import React, {useState, useEffect} from 'react';
import { SketchPicker } from 'react-color';
import debounce from 'lodash/debounce';

const ColorItemHandler = ({
  modality,
  onChange,
  color
}) => {
  const [isEdited, setEdited] = useState(false);
  const [editedColor, setEditedColor] = useState(color);
  useEffect(() => {
    setEditedColor(color)
  }, [color]);
  const debouncedOnChange = debounce(onChange, 300);
  const handleChange = newColor => {
    setEditedColor(newColor.hex);
    debouncedOnChange(newColor.hex);
  }
  const handleClose = () => {
    onChange(editedColor);
    setEdited(false);
  }
  return (
    <li>
      <span onClick={() => setEdited(!isEdited)} className="legend-color" style={{background: color}} />
      <span className="legend-modality">{modality}</span>
      {
        isEdited ?
        <>
          <div onClick={handleClose} className="color-picker-container">
            <div onClick={e => {e.stopPropagation()}}>
              <h5>Choisir la couleur de la modalité "{modality}"</h5>
              <SketchPicker onChange={handleChange} color={editedColor} />
            </div>
          </div>
        </>
        : null
      }
    </li>
  )
}

export default function ColorLegend ({
  colorPalette,
  onChange,
}) {
  if (!colorPalette) {
    return null;
  }
  return (
    <div className="ColorLegend" >
      <h6>Légende</h6>
      <ul>
        {
          Object.entries(colorPalette)
          .map(([modality, color]) => {
            const handleChange = newColor => {
              onChange({
                ...colorPalette,
                [modality] : newColor
              })
            }
            return (
              <ColorItemHandler onChange={handleChange} key={modality} {...{modality, color}} />
            )
          })
        }
      </ul>
    </div>
  );
}