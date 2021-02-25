

const serializeValue = val => {
  if (typeof val === 'string')
    return `'${val}'`;
  else if (typeof val === 'object')
    return JSON.stringify(val);
  else return val;
}
export const buildGraphCode = props => `<GraphBlock 
  ${
  Object.entries(props)
  .map(([key, val]) => `${key}={${serializeValue(val)}}`)
  .join(' \n  ')
}
/>`

export const computeFiltersOptions = (graph, gexfData) => {
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
  return categories.reduce((res, cat) => ({...res, [cat.id]: cat}), {});
}

export const evalIfNodeMatches = (attributes, filters, filtersModeAnd) => {
  if (filtersModeAnd) {
    const oneFilterDoesNotMatches = filters.find(({attribute, value}) => attributes[attribute] !== value) !== undefined;
    return !oneFilterDoesNotMatches;
  } else {
    const oneFilterMatches = filters.find(({attribute, value}) => attributes[attribute] === value) !== undefined;
    return oneFilterMatches;
  }
}