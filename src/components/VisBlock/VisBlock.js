
import cx from 'classnames';
import React, {useContext} from 'react';
import { PresentationContext} from '../../contexts';

const filterColorPalette = (colorVariable, colorPalette = {}, filters = [], filtersModeAnd) => {
  if (!filters.length) {
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

const ColorLegend = ({colorPalette = []}) => {
  return (
    <ul className="ColorLegend">
      {
        colorPalette
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
  filtersModeAnd,
  colorVariable
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
  return (
    <div onClick={onClick} ref={ref} id={id} className={cx("VisualizationBlock LinearGraphBlock", {'is-active': activeVisualization && activeVisualization.id === id})}>
      {
        title ?
        <h5 className="block-title">{title}</h5>
        : null
      }
      {
        legend ?
        <p className="block-legend">
          {legend}
        </p>
        : null
      }
      <ColorLegend colorPalette={filterColorPalette(nodeColorVariable || colorVariable, colorPalette, filters, filtersModeAnd)} />
      
    </div>
  )
})

export default VisBlock;