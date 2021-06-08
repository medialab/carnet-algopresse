import {useMemo, useState, useEffect} from 'react';
import Graph from 'graphology';
import gexf from 'graphology-gexf';
import {extent} from 'd3-array';
import ContainerDimensions from 'react-container-dimensions';
import cx from 'classnames';

import {LinearGraphContainer} from '../LinearGraphAnnotation/LinearGraphContainer'
import {GraphContainer} from '../GraphAnnotation/GraphContainer'
import {IceCreamContainer} from '../IceCreamAnnotation/IceCreamContainer'


const GraphWrapper = ({data, ...props}) => {
  const [cameraPosition, setCameraPosition] = useState({x: props.x, y: props.y, ratio: props.ratio})

  useEffect(() => {
    setCameraPosition({
      x: props.x, y: props.y, ratio: props.ratio
    })
  }, [props.x, props.y, props.ratio])
  const graph = useMemo(() => {
    return gexf.parse(Graph, data);
  }, [data]);

  const onCameraUpdate = (pos) => {
    // setCameraPosition(pos);
  }
  let sizes = [];
  graph.forEachNode((node, attributes) => {
    sizes.push(attributes.size);
  })
  const sizeExtent = extent(sizes);
  return (
    <GraphContainer
      {...{
        ...props,
        graph,
        extents: {
          nodeSize: {
            min: sizeExtent[0],
            max: sizeExtent[1]
          }
        },
        onCameraUpdate,
        cameraPosition,
      }
      }
    />
  );
}

const VisualizationController = ({
  datasets,
  activeVisualization: inputActiveVisualization,
  width,
  height,
}) => {
  // @todo clean this trick that improves performance
  const [activeVisualization, setActiveVisualization] = useState(undefined);
  useEffect(() => {
    setTimeout(() => {
      setActiveVisualization(inputActiveVisualization);
    })
  }, [inputActiveVisualization])
  if (!datasets || !activeVisualization || (activeVisualization && !datasets[activeVisualization.data])) {
    return null;
  }
  // return null;
  switch(activeVisualization.visType) {
    case 'linearGraph':
      return (
        <LinearGraphContainer
          {...{
            ...activeVisualization,
            data: datasets[activeVisualization.data],
            width,
            height,
            presentationMode: true
          }}
        />
      );
    case 'networkGraph':
      return (
        <GraphWrapper
          {...{
            ...activeVisualization,
            data: datasets[activeVisualization.data],
            width: width - 5,
            height,
            presentationMode: true
          }}
        />
      );
    case 'icecreamGraph':
      return (
        <IceCreamContainer
          {...{
            ...activeVisualization,
            data: datasets[activeVisualization.data],
            width,
            height,
            presentationMode: true
          }}
        />
      );
    default:
      return activeVisualization.visType;
  }
}

export default function VisualizationControllerWithDimensions(props) {
  return (
    <div className={cx("VisualizationController", props.activeVisualization && props.activeVisualization.visType)}>

    <ContainerDimensions>
      {
        dimensions => <VisualizationController {...{...props, ...dimensions}} />
      }
    </ContainerDimensions>
    </div>
  )
}