import React, {useCallback, useRef, useState, useEffect, useMemo, useContext} from 'react';
// import Graph from 'graphology';
import {WebGLRenderer} from 'sigma';
import {scaleLinear} from 'd3-scale';
// import colorParse from 'parse-color';
import {min, max} from 'd3-array';
import cx from 'classnames';
import ContainerDimensions from 'react-container-dimensions';

import {LanguageContext} from '../../contexts';

import {
  usePrevious, 
} from './hooks';
import GraphControls from './GraphControls';
import GraphNav from './GraphNav';
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


export function GraphContainer({
  graph,
  width = 500,
  height = 500,
  // nodeColor,
  // nodeSize,
  labelDensity,
  labelSize = 12,
  displayAllLabels,
  lockCamera,
  extents,

  searchString = '',
  onSearchStringChange,

  filtersModeAnd,
  onToggleFiltersModeAnd,

  filtersOptions = {},
  filters = [],
  onFiltersChange,

  onCameraUpdate,
  presentationMode,
  showNav = true,
  onToggleCameraLock,

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
  const {lang} = useContext(LanguageContext);
  const CELL_HEIGHT_RANGE = [height / 5, 1];
  const CELL_WIDTH_RANGE = [width / 5, 1];

  const [labelsMode, setLabelsMode] = useState(false);

  useEffect(() => {
    setLabelsMode(false);
  }, [nodeColorVariable, JSON.stringify(filters), labelDensity, labelSize, displayAllLabels])


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
    } else if(nodeColorVariable && nodeColorVariable !== 'default' && colorPalette) {
      return {
        palette: colorPalette,
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
  const previousLabelsMode = usePrevious(labelsMode);


  const nodeReducer = createNodeReducer({
    nodeColor,
    nodeSize,
    nodeLabel: !labelsMode ? nodeLabelVariable : 'default',
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
    if (renderer) {
      const camera = renderer.getCamera();
      if (cameraPosition) {
        camera.enable();
        camera.animate({...camera.getState(), ...cameraPosition});     
        // camera.setState({...camera.getState(), ...cameraPosition});     
        if (lockCamera) {
          camera.disable();
        }
        // renderer.refresh();
      }
      if (camera.enabled && lockCamera) {
        camera.disable();
        // renderer.refresh();
      }
      if (!camera.enabled && !lockCamera) {
        camera.enable();
        // renderer.refresh();
      }
    }
    
  }, [
    updateTimestamp, 
    lockCamera, 
    cameraPosition,
    nodeColorVariable,
    nodeSizeVariable,
    filters,
    filtersModeAnd,
    colorPalette,
  ])

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
      previousFiltersModeAnd !== filtersModeAnd ||
      labelsMode !== previousLabelsMode
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
      || previousNodeLabelVariable !== nodeLabelVariable || JSON.stringify(previousFilters) !== JSON.stringify(filters) ||
      previousLabelsMode !== labelsMode
      ) && displayAllLabels && !labelsMode) {
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
    } else if (
      (previousDisplayAllLabels !== displayAllLabels && !displayAllLabels)
      ||
      (previousLabelsMode !== labelsMode && !labelsMode)
      ) {
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
        setTimeout(() => {
          const newRenderer = new WebGLRenderer(graph, node, {nodeReducer, edgeReducer});
          let actualLabelDensity = labelDensity > 1 ? 1 : labelDensity;
          const cellWidth = cellWidthScale(actualLabelDensity);
          const cellHeight = cellHeightScale(actualLabelDensity);
          newRenderer.settings.labelGrid.cell = {
            width: cellWidth,
            height: cellHeight
          };
          newRenderer.settings.labelSize = labelSize;
          newRenderer.settings.labelFont = 'Fira Sans';
          newRenderer.displayedLabels = new Set();
          newRenderer.refresh();
          setRenderer(newRenderer);
          const camera = newRenderer.getCamera();
          
          if (cameraPosition) {
            camera.setState({
              ...camera.getState(),
              ...cameraPosition
            })
          } else {
            if (typeof onCameraUpdate === 'function') {
              onCameraUpdate(camera.getState())
            }
          }
          if (lockCamera || !presentationMode) {
            camera.disable();
          }
          camera.on('updated', state => {
            onCameraUpdate(state);
          })
        })
       
          
        }

        container.current = node;
    },
    [graph] /* eslint react-hooks/exhaustive-deps : 0 */
  );
  const handleToggleCameraLock = () => {
    if (typeof onToggleCameraLock === 'function') {
      onToggleCameraLock();
    }
  }
  return (
    <>

      <div ref={setContainer} style={{width: '100%', height: '100%'}}></div>
      {
        renderer && presentationMode && showNav &&
        <GraphNav
          rescale={rescale.bind(null, renderer)}
          zoomIn={zoomIn.bind(null, renderer)}
          zoomOut={zoomOut.bind(null, renderer)}
          isLocked={lockCamera}
          onToggleLock={handleToggleCameraLock}
          lang={lang}
          />
      }
      {
        renderer && presentationMode && showNav && nodeLabelVariable !== 'default' &&
        <ul className="labels-toggler">
          <li>
            <button onClick={() => setLabelsMode(true)} className={cx({'is-active': labelsMode})}>{lang === 'fr' ? 'montrer les labels': 'show labels'}</button>
          </li>
          <li>
            <button onClick={() => setLabelsMode(false)} className={cx({'is-active': !labelsMode})}>{lang === 'fr' ? 'montrer les clusters': 'show clusters'}</button>
          </li>
        </ul>
      }
      {renderer && !presentationMode && (
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