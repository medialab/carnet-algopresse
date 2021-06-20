
import cx from 'classnames';
import React, {useContext} from 'react';
import { PresentationContext} from '../../contexts';

const filterColorPalette = (colorVariable, colorPalette = {}, filters = [], colorScaleType) => {
  if (!filters.length || colorScaleType === 'continuous') {
    return Object.entries(colorPalette);
  }
  return Object.entries(colorPalette)
  .filter(([label, color]) => {
    const matchesAtLeastOne = filters.find(({ attribute, value }) => {
      if (attribute === colorVariable) {
        return value === label;
      }
      return false;
    })
    return matchesAtLeastOne;
  })
}

const ColorLegend = ({
  colorPalette = [],
  colorScaleType,
  colorVariable
}) => {
  
  return (
    <ul className={cx("ColorLegend", {'is-continuous': colorScaleType === 'continuous', 'is-big': colorPalette.length > 4})}>
      {
        colorScaleType === 'continuous' ?
        <li className="continuous-scale-container">
          <div className="prelabel">
            couleur en fonction du score <strong>{colorVariable}</strong>
          </div>
          <div className="labels">
            <span>0</span>
            <span>1</span>
          </div>
          <div 
            className="continuous-scale"
            style={{
              background: colorPalette.length === 2 ? `linear-gradient(to right, ${colorPalette[0][1]} 20%, ${colorPalette[1][1]} 60%)` : undefined
            }}
          />
        </li>
        :
        colorPalette
        .sort(([labelA], [labelB]) => {
          if (labelA > labelB) {
            return 1;
          }
          return -1;
        })
        .map(([label, color]) => (
          <li>
            <span className="color" style={{background: color}} />
            <span className="label">{label}</span>
          </li>
        ))
      }
    </ul>
  )
}

const VisBlock = React.forwardRef(({
  title, 
  legend, 
  id,
  colorPalette,
  nodeColorVariable,
  filters,
  // filtersModeAnd,
  colorVariable,
  colorScaleType,
}, ref) => {
  const {
    activeVisualization,
    onBlockClick
  } = useContext(PresentationContext);
  const onClick = e => {
    if (typeof onBlockClick === 'function') {
      onBlockClick(id, ref);
    }
  }
  const colors = filterColorPalette(nodeColorVariable || colorVariable, colorPalette, filters, colorScaleType);
  return (
    <div onClick={onClick} ref={ref} id={id} className={cx("VisualizationBlock LinearGraphBlock", {'is-active': activeVisualization && activeVisualization.id === id})}>
      {
        title ?
        <h5 className="block-title">{title}</h5>
        : null
      }
      <div className={cx("secondary", {'has-colors': colors && colors.length > 0})}>
        {
          legend ?
          <p className="block-legend">
            {legend}
          </p>
          : null
        }
        <ColorLegend 
          colorPalette={colors} 
          colorScaleType={colorScaleType} 
          colorVariable={colorVariable}
        />
      </div>
      
    </div>
  )
})

export default VisBlock;