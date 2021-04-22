import React, {useState, useMemo, useEffect, Suspense} from 'react';
import {extent} from 'd3-array';

import gexf from 'graphology-gexf';
import Graph from 'graphology';

import GraphVis from '../Graph';
import FooterNav from '../FooterNav';
// import CodeContainer from '../../components/CodeContainer';
import {computeFiltersOptions} from '../../helpers/misc';

import {VisualizationControlContext} from '../../contexts';

const GraphAnnotation = ({
  Content,
  data,
  contentsURL,
  prevPage,
  nextPage,
}) => {
  const graph = useMemo(() => {
    return gexf.parse(Graph, data);
  }, [data]);
  const filtersOptions = useMemo(() => computeFiltersOptions('graph', graph, data), [graph, data]);

  const [cameraPosition, setCameraPosition] = useState(undefined);
  const [helpVisible, setHelpVisible] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [filtersModeAnd, setFiltersModeAnd] = useState(false);
  const [updateTimestamp, setUpdateTimeStamp] = useState(new Date().getTime());
  const [filters, setFilters] = useState([]);
  const [nodeColorVariable, setNodeColorVariable] = useState(undefined);
  const [nodeSizeVariable, setNodeSizeVariable] = useState(undefined);
  const [nodeLabelVariable, setNodeLabelVariable] = useState(undefined);
  const [labelDensity, setLabelDensity] = useState(0.25);

  const [focusedVisualizationId, setFocusedVisualizationId] = useState(null);
  const [registeredVisualizations, setRegisteredVisualizations] = useState({});

  const onRegisterVisualization = (id, props) => {
    setRegisteredVisualizations({
      ...registeredVisualizations,
      [id]: props
    })
  }

  const onUnregisterVisualization = id => {
    const copyOfRegistered = {...registeredVisualizations};
    delete copyOfRegistered[id]
    setRegisteredVisualizations(copyOfRegistered)
  }

  useEffect(() => {
    if (!focusedVisualizationId && Object.keys(registeredVisualizations).length) {
      const thatId = Object.keys(registeredVisualizations)[0];
      setFocusedVisualizationId(thatId )
    }
  }, [registeredVisualizations, focusedVisualizationId])

  let sizes = [];
  graph.forEachNode((node, attributes) => {
    sizes.push(attributes.size);
  })
  const sizeExtent = extent(sizes);

  const onCameraUpdate = state => {
    const {x, y, ratio} = state;
    setCameraPosition({x, y, ratio});
  }
  const onVisualizationUpdate = ({
    x, 
    y, 
    ratio, 
    searchString, 
    filtersModeAnd, 
    filters, 
    nodeColorVariable,
    nodeSizeVariable,
    nodeLabelVariable,
    labelDensity,
}) => {
    setCameraPosition({x, y, ratio});
    setUpdateTimeStamp(new Date().getTime());
    setSearchString(searchString);
    setFiltersModeAnd(filtersModeAnd);
    setFilters(filters);
    setNodeColorVariable(nodeColorVariable);
    setNodeSizeVariable(nodeSizeVariable);
    setNodeLabelVariable(nodeLabelVariable);
    setLabelDensity(labelDensity);
  }
  const onSearchStringChange = str => {
    setSearchString(str);

  }
  return (
    <VisualizationControlContext.Provider value={{
      onVisualizationUpdate, 
      onRegisterVisualization, 
      onUnregisterVisualization, 
      focusedVisualizationId,
      setFocusedVisualizationId,
      visualizationParams: {
        ...cameraPosition,
        searchString,
        // filtersOptions,
        filters,
        // updateTimestamp,
        nodeSizeVariable,
        nodeColorVariable,
        nodeLabelVariable,
        filtersModeAnd,
        labelDensity,
      }
    }}>
    <div className="slide-container">
      <section>
        <div>
          <p>
            <button className={helpVisible ? 'is-active': ''} onClick={() => setHelpVisible(!helpVisible)}>
              Comment modifier cette page ?
            </button>
          </p>
          <ol className={`edit-help ${helpVisible ? 'is-active' : ''}`}>
            <li>
              Préalablement se logger dans github si le répertoire est privé
            </li>
            <li>
              Se rendre sur <a target="blank" href={contentsURL}>cette page du répertoire github</a>
            </li>
            <li>
              Cliquer sur le crayon en haut à droite des contenus (il affiche "edit" au survol)
            </li>
            <li>
              Faire les modifications puis cliquer sur "Commit changes" en bas de la page
            </li>
            <li>
              Attendre 2 minutes puis recharger la page pour voir la version à jour de la page
            </li>
          </ol>
        </div>
        <Suspense fallback={<div>Chargement</div>}>
          <Content />
        </Suspense>
        <FooterNav prevPage={prevPage} nextPage={nextPage} />
      </section>
      <aside>
        <div className="vis">
          <GraphVis
            {
              ...{
                graph,
                // nodeColor,
                // nodeSize,
                // nodeLabel,
                // labelDensity,
                searchString,
                filtersOptions,
                filters,
                cameraPosition,
                onCameraUpdate,
                updateTimestamp,
                nodeSizeVariable,
                nodeColorVariable,
                nodeLabelVariable,
                filtersModeAnd,
                labelDensity,

                onSearchStringChange,
                onToggleFiltersModeAnd: () => setFiltersModeAnd(!filtersModeAnd),

                onFiltersChange: (newFilters) => setFilters(newFilters),

                onLabelDensityChange: val => setLabelDensity(val),
                onNodeSizeVariableChange: (val) => setNodeSizeVariable(val),
                onNodeColorVariableChange: (val) => setNodeColorVariable(val),
                onNodeLabelVariableChange: (val) => setNodeLabelVariable(val),

                extents: {
                  nodeSize: {
                    min: sizeExtent[0],
                    max: sizeExtent[1]
                  }
                }
              }
            }
          />
          
        </div>
        {/* <CodeContainer code={currentCode} /> */}
      </aside>
  </div>
  </VisualizationControlContext.Provider>
  )
}

export default GraphAnnotation;