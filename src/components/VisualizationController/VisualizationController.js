import {useMemo, useState, useEffect} from 'react';
import Graph from 'graphology';
import gexf from 'graphology-gexf';
import {extent} from 'd3-array';
import ContainerDimensions from 'react-container-dimensions';
import cx from 'classnames';

import {LinearGraphContainer} from '../LinearGraphAnnotation/LinearGraphContainer'
import {GraphContainer} from '../GraphAnnotation/GraphContainer'
import {IceCreamContainer} from '../IceCreamAnnotation/IceCreamContainer'
import Loader from '../Loader'
import { groupBy } from 'lodash-es';


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
const buildImprint = d => /*d.data + '-' +*/ d.visType;

const VisualizationController = ({
  datasets,
  visualizations,
  activeVisualization,
  width,
  height,
  loadingFraction,
}) => {
  const firstInstanceOfEachVisualization = useMemo(() => {
    return Object.entries(
      groupBy(
        Object.entries(visualizations || {}),
        d => buildImprint(d[1])
      )
    )
    .reduce((res, [imprint, [firstInstance]]) => ({
      ...res, 
      [imprint]: firstInstance[1]
    }), {})
  }, [visualizations]);

  let activeImprint;
  if (activeVisualization) {
    activeImprint = buildImprint(activeVisualization);
  }

  const renderVisualization = vis => {
    if (!datasets[vis.data]) {
      return null;
    }
    switch(vis.visType) {
      case 'linearGraph':
        return (
          <LinearGraphContainer
            {...{
              ...vis,
              data: datasets[vis.data],
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
              ...vis,
              data: datasets[vis.data],
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
              ...vis,
              data: datasets[vis.data],
              width,
              height,
              presentationMode: true
            }}
          />
        );
      default:
        return vis.visType;
    }
  }
  if (loadingFraction < 1) {
    return <Loader percentsLoaded={loadingFraction * 100} />
  }
  return (
    <div className="VisualizationController">
      {
        Object.entries(firstInstanceOfEachVisualization)
        .map(([imprint, defaultVisualization]) => {
          return (
            <div className={cx('visualization-item', {'is-visible': imprint === activeImprint})}>
              {
                imprint === activeImprint ?
                renderVisualization(activeVisualization)
                :
                renderVisualization(defaultVisualization)
              }
            </div>
          )
        })
      }
    </div>
  )
  // return null;
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