
import cx from 'classnames';
import React, {useContext} from 'react';
import { PresentationContext} from '../../contexts'


const VisBlock = React.forwardRef(({title, legend, id}, ref) => {
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
      
    </div>
  )
})

export default VisBlock;