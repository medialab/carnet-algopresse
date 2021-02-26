import React, {useCallback, useRef, useState, useEffect, useMemo} from 'react';
// import Graph from 'graphology';
import {WebGLRenderer} from 'sigma';
import {scaleLinear} from 'd3-scale';
// import colorParse from 'parse-color';
import {min, max} from 'd3-array';

import {
  usePrevious, 
} from './hooks';
import GraphControls from './GraphControls';
import {createNodeReducer} from './reducers';
import {generatePalette} from '../../helpers/palettes';

import './GraphContainer.css';


// Defaults
const CELL_HEIGHT_RANGE = [200, 10];
const CELL_WIDTH_RANGE = [300, 30];
const CELL_HEIGHT_SCALE = scaleLinear().domain([0, 1]).range(CELL_HEIGHT_RANGE);
const CELL_WIDTH_SCALE = scaleLinear().domain([0, 1]).range(CELL_WIDTH_RANGE);

// Camera controls
function rescale(renderer) {
  const camera = renderer.getCamera();
  camera.animatedReset(renderer);
}

function zoomIn(renderer) {
  const camera = renderer.getCamera();
  camera.animatedZoom(renderer);
}

function zoomOut(renderer) {
  const camera = renderer.getCamera();
  camera.animatedUnzoom(renderer);
}


export default function GraphContainer({
  graph,
  // nodeColor,
  // nodeSize,
  nodeLabel,
  labelDensity,
  extents,

  searchString = '',
  onSearchStringChange,

  filtersModeAnd,
  onToggleFiltersModeAnd,

  filtersOptions = {},
  filters = [],
  onFiltersChange,

  onCameraUpdate,

  cameraPosition,

  updateTimestamp,

  nodeSizeVariable,
  nodeColorVariable,
  onNodeSizeVariableChange,
  onNodeColorVariableChange,
}) {

  const nodeSize = useMemo(() => {
    if (nodeSizeVariable && nodeSizeVariable !== 'default' && filtersOptions[nodeSizeVariable]) {
      const values = Array.from(filtersOptions[nodeSizeVariable].options)
      return {
        min: min(values),
        max: max(values),
        name: nodeSizeVariable
      }
    } else return undefined;
  }, [nodeSizeVariable])

  const nodeColor = useMemo(() => {
    if (nodeColorVariable && nodeColorVariable !== 'default' && filtersOptions[nodeColorVariable]) {
      const colors = generatePalette(nodeColorVariable, filtersOptions[nodeColorVariable].options.size);
      let palette = {};
      let i = 0;
      filtersOptions[nodeColorVariable].options.forEach(option => {
        palette[option] = colors[i];
        i++;
      });
      return {
        palette,
        name: nodeColorVariable
      }
    } else return undefined;
  }, [nodeColorVariable])

  const previousNodeColor = usePrevious(nodeColor);
  const previousNodeSize = usePrevious(nodeSize);
  // const previousNodeLabel = usePrevious(nodeLabel);
  const previousLabelDensity = usePrevious(labelDensity);
  const previousSearchString = usePrevious(searchString);
  const previousFilters = usePrevious(filters);

  const nodeReducer = createNodeReducer({
    nodeColor,
    nodeSize,
    nodeLabel,
    extents,
    filters,
    filtersModeAnd,
  });

  const container = useRef(null);
  const [renderer, setRenderer] = useState(null);


  useEffect(() => {
    if (cameraPosition && renderer) {
        const camera = renderer.getCamera();
        // console.log('animate camera', camera);
        camera.animate(cameraPosition);     
    }  
  }, [updateTimestamp])

  // Should we refresh?
  if (renderer) {
    let needToRefresh = false;

    if (
      previousNodeColor !== nodeColor ||
      previousNodeSize !== nodeSize ||
      // previousNodeLabel !== nodeLabel ||
      // previousSearchString !== searchString ||
      previousFilters !== filters
    ) {
      // console.log('Refreshing sigma');

      // TODO: use upcoming #.setNodeReducer
      renderer.settings.nodeReducer = nodeReducer;
      needToRefresh = true;
    }

    if (previousLabelDensity !== labelDensity) {
      renderer.settings.labelGrid.cell = {
        width: CELL_WIDTH_SCALE(labelDensity),
        height: CELL_HEIGHT_SCALE(labelDensity)
      };

      // TODO: we can improve sigma to handle this
      renderer.displayedLabels = new Set();
      needToRefresh = true;
    }

    if (previousSearchString !== searchString) {
      if (searchString.length >= 3) {
        graph.forEachNode((id, attributes) => {
          const {label} = attributes;
          if (label.toLowerCase().includes(searchString.toLowerCase())) {
            renderer.highlightNode(id)
          } else renderer.unhighlightNode(id)
        })
      } else if (renderer.highlightedNodes.size > 0) {
        renderer.highlightedNodes = new Set();
      }
    }

    if (needToRefresh) {
      renderer.refresh();
    }
  }

  const setContainer = useCallback(
    node => {
      if (renderer && renderer.graph !== graph) {
        renderer.kill();
        setRenderer(null);
      }

      if (node && graph) {
       
        const newRenderer = new WebGLRenderer(graph, node, {nodeReducer});
        setRenderer(newRenderer);
        const camera = newRenderer.getCamera();
        onCameraUpdate(camera.getState())
        camera.on('updated', state => {
          onCameraUpdate(state);
        })
      }

      container.current = node;
    },
    [graph] /* eslint react-hooks/exhaustive-deps : 0 */
  );

  return (
    <div className="GraphContainer">

      <div ref={setContainer} style={{width: '100%', height: '100%'}}></div>
      {renderer && (
        <GraphControls
          rescale={rescale.bind(null, renderer)}
          zoomIn={zoomIn.bind(null, renderer)}
          zoomOut={zoomOut.bind(null, renderer)}
          {
            ...{
              searchString,
              onSearchStringChange,
              filtersModeAnd,
              onToggleFiltersModeAnd,
              filtersOptions,
              filters,
              onFiltersChange,
              nodeSizeVariable,
              nodeColorVariable,
              onNodeSizeVariableChange,
              onNodeColorVariableChange,
              colorPalette: nodeColor && nodeColor.palette,
            }
          }
        />
      )}
    </div>
  );
}