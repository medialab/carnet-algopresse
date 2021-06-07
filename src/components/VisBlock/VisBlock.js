
import cx from 'classnames';
import React, {useContext} from 'react';
import { PresentationContext} from '../../contexts'


const VisBlock = React.forwardRef(({title, legend, id}, ref) => {
  const {
    activeVisualization
  } = useContext(PresentationContext);
  return (
    <div ref={ref} id={id} className={cx("VisualizationBlock LinearGraphBlock", {'is-active': activeVisualization && activeVisualization.id === id})}>
      {
        title ?
        <h2 className="block-title">{title}</h2>
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