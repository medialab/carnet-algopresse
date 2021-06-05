import React, {useCallback, useRef, useState, useEffect, useMemo} from 'react';
// import Graph from 'graphology';
import {WebGLRenderer} from 'sigma';
import {scaleLinear} from 'd3-scale';
// import colorParse from 'parse-color';
import {min, max} from 'd3-array';
import ContainerDimensions from 'react-container-dimensions';

import {
  usePrevious, 
} from './hooks';
import GraphControls from './GraphControls';
import {createNodeReducer, createEdgeReducer} from './reducers';
import {generatePalette} from '../../helpers/palettes';
import Input from '../DebouncedInput';

import './GraphContainer.css';
import { evalIfNodeMatches } from '../../helpers/misc';



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


function GraphContainer({
  graph,
  width,
  height,
  // nodeColor,
  // nodeSize,
  labelDensity,
  displayAllLabels,
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
  title,
  legend,

  nodeSizeVariable,
  nodeColorVariable,
  colorPalette,
  nodeLabelVariable,
  onNodeSizeVariableChange,
  onNodeColorVariableChange,
  onNodeLabelVariableChange,
  onLabelDensityChange,
  onColorPaletteChange,
  onTitleChange,
  onLegendChange,
  onDisplayAllLabelsChange,
}) {
  const CELL_HEIGHT_RANGE = [height / 5, 1];
  const CELL_WIDTH_RANGE = [width / 5, 1];

  // const CELL_HEIGHT_RANGE = [200, 10];
  // const CELL_WIDTH_RANGE = [300, 30];

  const cellHeightScale = scaleLinear().domain([0, 1]).range(CELL_HEIGHT_RANGE);
  const cellWidthScale = scaleLinear().domain([0, 1]).range(CELL_WIDTH_RANGE);


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

  const edgesMap = useMemo(() => {
    const m = new Map()
    graph.forEach(
      (_source, _target, sourceAttributes, targetAttributes, edge, _edgeAttributes) => {
      m.set(edge, {sourceNode: sourceAttributes, targetNode: targetAttributes})
    });
    return m;
  }, [graph])

  const previousNodeColor = usePrevious(nodeColor);
  const previousNodeSize = usePrevious(nodeSize);
  const previousNodeLabelVariable = usePrevious(nodeLabelVariable);
  const previousLabelDensity = usePrevious(labelDensity);
  const previousSearchString = usePrevious(searchString);
  const previousFilters = usePrevious(filters);
  const previousColorPalette = usePrevious(colorPalette);
  const previousFiltersModeAnd = usePrevious(filtersModeAnd);
  const previousDisplayAllLabels = usePrevious(displayAllLabels);

  const nodeReducer = createNodeReducer({
    nodeColor,
    nodeSize,
    nodeLabel: nodeLabelVariable,
    extents,
    filters,
    filtersModeAnd,
    colorPalette,
  });
  
  const edgeReducer = createEdgeReducer({
    nodeColor,
    colorPalette,
    // nodeSize,
    // nodeLabel,
    // extents,
    filters,
    filtersModeAnd,
    edgesMap,
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
      previousNodeLabelVariable !== nodeLabelVariable ||
      previousColorPalette !== colorPalette ||
      // previousSearchString !== searchString ||
      JSON.stringify(previousFilters) !== JSON.stringify(filters) ||
      previousFiltersModeAnd !== filtersModeAnd
    ) {
      // console.log('Refreshing sigma');

      // TODO: use upcoming #.setNodeReducer
      renderer.settings.nodeReducer = nodeReducer;
      renderer.settings.edgeReducer = edgeReducer;
      needToRefresh = true;
    }

    if (previousLabelDensity !== labelDensity) {
      let actualLabelDensity = labelDensity > 1 ? 1 : labelDensity;
      const cellWidth = cellWidthScale(actualLabelDensity);
      const cellHeight = cellHeightScale(actualLabelDensity);
      renderer.settings.labelGrid.cell = {
        width: cellWidth,
        height: cellHeight
      };

      // TODO from nansi: we can improve sigma to handle this
      renderer.displayedLabels = new Set();
      needToRefresh = true;
    }

    // workaround for clusters titles display
    // @todo replace this with a cleaner solution at some point
    if ((
      previousDisplayAllLabels !== displayAllLabels || !previousDisplayAllLabels || renderer.displayedLabels.size === 0
      || previousNodeLabelVariable !== nodeLabelVariable || JSON.stringify(previousFilters) !== JSON.stringify(filters)
      ) && displayAllLabels) {
      graph.forEachNode((id, attributes) => {
        const {label} = attributes;
        
        const displayedLabel = nodeLabelVariable && nodeLabelVariable !== 'default' ? attributes[nodeLabelVariable] : label;
        if (evalIfNodeMatches(attributes, filters, filtersModeAnd) && displayedLabel && displayedLabel.trim().length > 0) {
          renderer.highlightNode(id)
        } else {
          renderer.unhighlightNode(id);
        }
      })
      needToRefresh = true;
    } else if (previousDisplayAllLabels !== displayAllLabels && !displayAllLabels) {
      renderer.highlightedNodes = new Set();
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
      needToRefresh = true;
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
       
        const newRenderer = new WebGLRenderer(graph, node, {nodeReducer, edgeReducer});
        let actualLabelDensity = labelDensity > 1 ? 1 : labelDensity;
        const cellWidth = cellWidthScale(actualLabelDensity);
        const cellHeight = cellHeightScale(actualLabelDensity);
        newRenderer.settings.labelGrid.cell = {
          width: cellWidth,
          height: cellHeight
        };
        newRenderer.displayedLabels = new Set();
        newRenderer.refresh();
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
    <>

      <div ref={setContainer} style={{width: '100%', height: '100%'}}></div>
      {renderer && (
        <>
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
                nodeLabelVariable,
                labelDensity,
                displayAllLabels,
                onNodeSizeVariableChange,
                onNodeColorVariableChange,
                onNodeLabelVariableChange,
                onColorPaletteChange,
                onLabelDensityChange,
                onDisplayAllLabelsChange,
                colorPalette: colorPalette,
              }
            }
          />
          <form onSubmit={e => {e.preventDefault()}} className="caption-editor-container">
            <h1 className="caption-title-container">
              <Input
                value={title || ''}
                onChange={val => onTitleChange(val)}
                placeholder="Titre de la visualisation"
              />
            </h1>
            <div className="caption-legend-container">
              <Input
                value={legend || ''}
                type="textarea"
                onChange={val => onLegendChange(val)}
                placeholder="Légende de la visualisation"
              />
            </div>
          </form>
        </>
      )}
    </>
  );
}

export default function GraphContainerWithDimensions(props) {
  return (
    <div className="VisContainer GraphContainer">

    <ContainerDimensions>
      {
        dimensions => <GraphContainer {...{...props, ...dimensions}} />
      }
    </ContainerDimensions>
    </div>
  )
}