import { uniq } from "lodash";
import { min, max } from 'd3-array';

const serializeValue = val => {
  if (typeof val === 'string')
    return `'${val}'`;
  else if (typeof val === 'object')
    return JSON.stringify(val);
  else return val;
}

const buildComponentCode = (componentName, props) => `<${componentName} 
  ${Object.entries(props)
    .filter(([_key, val]) => {
      return !(val === undefined || val === false || val === '' || (Array.isArray(val) && !val.length))
    })
    .map(([key, val]) => `${key}={${serializeValue(val)}}`)
    .join(' \n  ')
    .trim()
  }
/>`

export const buildGraphCode = props => buildComponentCode('GraphBlock', props)

export const buildIceCreamScatterPlotCode = props => buildComponentCode('IceCreamBlock', props)
export const buildLinearGraphCode = props => buildComponentCode('LinearGraphBlock', props)

export const computeFiltersOptions = (type, ...args) => {
  switch (type) {
    case 'table':
      return computeTableOptions(...args);
    case 'graph':
    default:
      return computeGraphFiltersOptions(...args);
  }
}

const computeTableOptions = data => {
  return data.columns.reduce((res, key) => {
    const options = uniq(data.map(d => d[key]))
    let type = 'string';

    // if number
    if (!options.find(o => isNaN(+o))) {
      if (!options.find(o => !Number.isInteger(+o))) {
        type = 'integer';
      } else {
        type = 'float'
      }
    }
    const props = {
      id: key,
      title: key,
      type,
      options
    }
    if (['float', 'integer'].includes(type)) {
      props.options = props.options.map(o => +o);
      props.min = min(props.options);
      props.max = max(props.options);
    }
    return {
      ...res,
      [key]: props
    }
  }, {})
}
export const computeGraphFiltersOptions = (graph, gexfData) => {
  const domparser = new DOMParser()
  const doc = domparser.parseFromString(gexfData, 'application/xml')
  const attrs = doc.querySelectorAll('attributes.node attribute');
  const categories = [];

  const FORBIDDEN_ATTRS = ['weight'];

  attrs.forEach(attr => {
    const id = attr.getAttribute('id');
    if (FORBIDDEN_ATTRS.includes(id)) return;

    const title = attr.getAttribute('title');
    const type = attr.getAttribute('type');
    categories.push({
      id,
      title,
      type,
      options: new Set()
    })
  })
  graph.forEachNode((_node, props) => {
    categories.forEach(cat => {
      if (!cat.options.has(props[cat.id]))
        cat.options.add(props[cat.id])
    })
  })
  return categories.reduce((res, cat) => ({ ...res, [cat.id]: cat }), {});
}

export const evalIfNodeMatches = (attributes, filters, filtersModeAnd) => {
  if (!filters.length) {
    return true;
  }
  if (filtersModeAnd) {
    const oneFilterDoesNotMatch = filters.find(({ attribute, value }) => attributes[attribute] !== '' + value) !== undefined;
    return !oneFilterDoesNotMatch;
  } else {
    const oneFilterMatches = filters.find(({ attribute, value }) => attributes[attribute] === '' + value) !== undefined;
    return oneFilterMatches;
  }
}

const radiansToDegrees = radians => radians * (180 / Math.PI);
export const degreesToRadians = degrees => degrees * (Math.PI / 180);

export const cartesianToPolar = (x, y) => {
  const distance = Math.sqrt(x * x + y * y);
  const radians = Math.atan2(y, x);
  const degrees = radiansToDegrees(radians);
  return { distance, radians, degrees }
}

export const polarToCartesian = (distance, degrees) => {
  const radians = degreesToRadians(degrees);
  return {
    x: distance * Math.cos(radians),
    y: distance * Math.sin(radians)
  }
}

export const transformGeometry = ({ x, y }, { rotate, translate }) => {
  const { degrees, distance } = cartesianToPolar(x, y);
  let finalDegrees = degrees;
  if (rotate) {
    finalDegrees += rotate;
  }
  let { x: newX, y: newY } = polarToCartesian(distance, finalDegrees);
  if (translate) {
    if (translate.x) {
      newX += translate.x;
    }
    if (translate.y) {
      newY += translate.y;
    }
  }
  return { x: newX, y: newY }
}

export function parseQuery(queryString) {
  const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
  return pairs.filter((k) => k.length)
  .reduce((res, input) => {
    const pair = input.split('=');
    return {
      ...res,
      [decodeURIComponent(pair[0])]: decodeURIComponent(pair[1] || '')
    };
  }, {})
}
