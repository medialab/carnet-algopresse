import Color from 'color';
import {scaleLinear} from 'd3-scale';
import {evalIfNodeMatches} from '../../helpers/misc';


// Defaults
const DEFAULT_NODE_COLOR = '#999';
const DEFAULT_NODE_SIZE_RANGE = [2, 15];

export function createNodeReducer({
  nodeColor,
  nodeSize,
  nodeLabel,
  nodeSizeFactor = 1,
  extents,
  filters = [],
  filtersModeAnd,
  colorPalette,
}) {
  let nodeSizeScale = null;

  // Creating scales
  if (!nodeSize) {
    nodeSizeScale = scaleLinear()
      .domain([extents.nodeSize.min, extents.nodeSize.max])
      .range(DEFAULT_NODE_SIZE_RANGE);
  } else {
    nodeSizeScale = scaleLinear()
      .domain([nodeSize.min, nodeSize.max])
      .range(DEFAULT_NODE_SIZE_RANGE);
  }
  // Creating actual reducer
  const nodeReducer = function (key, attr) {
    const renderedNode = {
      x: attr.x,
      y: attr.y
    };

    // Color
    if (!nodeColor) {
      renderedNode.color = attr.color || DEFAULT_NODE_COLOR;
    } else if (colorPalette) {
      renderedNode.color = colorPalette[attr[nodeColor.name]] || DEFAULT_NODE_COLOR;
    } else {
      renderedNode.color =
        nodeColor.palette[attr[nodeColor.name]] || DEFAULT_NODE_COLOR;
    }
    // Size
    if (!nodeSize) {
      let v = attr.size || 1;
      renderedNode.size = nodeSizeScale(v);
    } else {
      let v = attr[nodeSize.name];
      v = typeof v === 'number' ? v : 1;
      renderedNode.size = nodeSizeScale(v);
    }

    renderedNode.size *= nodeSizeFactor;

    // Label
    if (!nodeLabel) {
      renderedNode.label = attr.label || key;
    } else {
      renderedNode.label = nodeLabel === 'default' ? attr.label || key : attr[nodeLabel] || '';
    }
    // renderedNode.label = renderedNode.label === '' ? 'coucou': renderedNode.label;

    // // hidden
    if (filters.length && evalIfNodeMatches(attr, filters, filtersModeAnd) === false) {
      renderedNode.hidden = true;
      renderedNode.label = '';
    } else {
      renderedNode.hidden = false;
    }

    return renderedNode;
  };

  return nodeReducer;
}


export function createEdgeReducer({
  nodeColor,
  nodeSize,
  // nodeLabel,
  // nodeSizeFactor = 1,
  // extents,
  // filters = [],
  // filtersModeAnd,
  edgesMap,
  colorPalette,
}) {

  
  // Creating actual reducer
  const edgeReducer = function (key, attr, el1, el2) {
    const {
      sourceNode, 
      targetNode
    } = edgesMap.get(key);
    const renderedEdge = {};
    // color with biggest node
    const sourceNodeSize = nodeSize ? sourceNode[nodeSize.name] : sourceNode.size;
    const targetNodeSize = nodeSize ? targetNode[nodeSize.name] : targetNode.size;
    const biggerNode = sourceNodeSize > targetNodeSize ? sourceNode : targetNode;

    // Color
    if (biggerNode) {
      if (!nodeColor) {
        renderedEdge.color = biggerNode.color || DEFAULT_NODE_COLOR;
      } else if (colorPalette) {
        renderedEdge.color = colorPalette[biggerNode[nodeColor.name]] || DEFAULT_NODE_COLOR;
      }  else {
        renderedEdge.color =
          nodeColor.palette[biggerNode[nodeColor.name]] || DEFAULT_NODE_COLOR;
      }
      renderedEdge.color = Color(renderedEdge.color).lighten(0.4).rgb().string();
    }
    return renderedEdge;
  };

  return edgeReducer;
}