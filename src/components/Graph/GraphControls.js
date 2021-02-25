import React, {useState} from 'react';

export function ControlButton({children, onClick}) {
  return (
    <button className="control-button" onClick={onClick}>
      {children}
    </button>
  );
}

const FiltersEditor = ({
  onToggleFiltersModeAnd,
  filtersModeAnd,
  filtersOptions,
  onFiltersChange,
  filters
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newFilterAttribute, setNewFilterAttribute] = useState(undefined);

  let newFilterOptions = [];
  if (newFilterAttribute) {
    filtersOptions[newFilterAttribute].options.forEach(option => newFilterOptions.push(option))
  }

  const handleNewFilterSubmit = (e) => {
    const value = e.target.value;
    onFiltersChange([
      ...filters,
      {
        attribute: newFilterAttribute,
        value
      }
    ])
    setNewFilterAttribute(undefined);
  }
  const handleNewFilterChange = e => {
    const val = e.target.value;
    if (val.length)
      setNewFilterAttribute(val)
  }
  return (
    <div className="FiltersEditor">
      <div>
        <button className={isOpen ? 'is-active' : ''} onClick={() => setIsOpen(!isOpen)}>
          Filtres ...
        </button>
      </div>
      {
        isOpen &&
        <div>
          <ControlButton  onClick={onToggleFiltersModeAnd}>
            Mode des filtres: {filtersModeAnd ? 'AND' : 'OR'}
          </ControlButton>
          {filters.length ?
          <div>
            <h6>Filtres existants</h6>
            <ul className="existing-filters">
              {
                filters.map(({attribute, value}, index) => {
                  const handleDelete = () => {
                    let newFilters = filters.filter((f, i) => i !== index);
                    onFiltersChange(newFilters);
                  }
                  return (
                    <li key={index}>
                      <div>
                        {attribute} : {value}
                      </div>
                      <div>
                        <button onClick={handleDelete}>
                        🗑
                        </button>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          : null
        }
          <div>
            <h6>Ajouter un nouveau filtre</h6>
            <select value={newFilterAttribute || ''} onChange={handleNewFilterChange}>
              {
                Object.entries(filtersOptions).map(([id, {title,}]) => {
                  return (
                    <option value={id} key={id}>{title}</option>
                  )
                })
              }
              <option value="">Selectionner</option>
            </select>
            {
              newFilterAttribute !== undefined ?
              <select value={''} onChange={handleNewFilterSubmit}>
                {
                  newFilterOptions.map((id) => {
                    return (
                      <option value={id} key={id}>{id}</option>
                    )
                  })
                }
                <option value="">Selectionner</option>
              </select>
              : null
            }
          </div>
        </div>
      }
      
    </div>
  )
}

const ColorLegend = ({
  colorPalette
}) => (
  <ul className="ColorLegend">
    {
      Object.entries(colorPalette)
      .map(([modality, color]) => (
        <li key={modality}>
          <span className="legend-color" style={{background: color}} />
          <span className="legend-modality">{modality}</span>
        </li>
      ))
    }
  </ul>
)


const VariablesEditor = ({
  filtersOptions,
  nodeSizeVariable,
  nodeColorVariable,
  onNodeSizeVariableChange,
  onNodeColorVariableChange,
  colorPalette,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const colorOptions = Object.entries(filtersOptions)
  const sizeOptions = colorOptions
  .filter(([_id, filter]) => ['integer', 'float'].includes(filter.type))
  
  return (
    <div className="FiltersEditor">
      <div>
        <button className={isOpen ? 'is-active' : ''} onClick={() => setIsOpen(!isOpen)}>
          Variables ...
        </button>
      </div>
      {
        isOpen &&
        <div>
          <div>
            <h6>Couleur des noeuds</h6>
            <select value={nodeColorVariable || 'default'} onChange={e => onNodeColorVariableChange(e.target.value)}>
              <option value="default">
                Défaut
              </option>
              {
                colorOptions
                .map(([id, filter]) => {
                  return (
                    <option key={id} value={id}>
                      {filter.title}
                    </option>
                  )
                })
              }
              
            </select>
            {
              nodeColorVariable && nodeColorVariable !== 'default' ?
              <ColorLegend
                colorPalette={colorPalette}
              />
              : null
            }
          </div>
          {
            sizeOptions.length > 0 ?
            <div>
              <h6>Taille des noeuds</h6>
              <select value={nodeSizeVariable || 'default'} onChange={e => onNodeSizeVariableChange(e.target.value)}>
                <option value="default">
                  Défaut
                </option>
                {
                  Object.entries(filtersOptions)
                  .map(([id, filter]) => {
                    return (
                      <option key={id} value={id}>
                        {filter.title}
                      </option>
                    )
                  })
                }
                
              </select>
            </div>
            : null
          }
          
        </div>
      }
      
    </div>
  )
}

export default function GraphControls({
  rescale, 
  zoomIn, 
  zoomOut, 
  searchString = '',
  onSearchStringChange,
  filtersModeAnd,
  onToggleFiltersModeAnd,

  filtersOptions,
  filters = [],
  onFiltersChange,

  nodeSizeVariable,
  nodeColorVariable,
  onNodeSizeVariableChange,
  onNodeColorVariableChange,
  colorPalette,
}) {
  const handleSearchChange = e => onSearchStringChange(e.target.value);
  return (
    <ul className="GraphControls">
      <li className="graph-controls-item camera">
      
      <ControlButton onClick={zoomOut}>
        -
      </ControlButton>
      <ControlButton onClick={zoomIn}>
        +
      </ControlButton>
      <ControlButton onClick={rescale}>
        Recentrer
      </ControlButton>
      </li>
      <li className="graph-controls-item">
      <form onSubmit={e => e.preventDefault()}>
        <input type="text" onChange={handleSearchChange} placeholder="rechercher" value={searchString} />
      </form>
      </li>
      <li className="graph-controls-item">
        <VariablesEditor
          {
            ...{
              filtersOptions,
              nodeSizeVariable,
              nodeColorVariable,
              onNodeSizeVariableChange,
              onNodeColorVariableChange,
              colorPalette,
            }
          }
        />
      </li>
      <li className="graph-controls-item">
      <FiltersEditor
        {
          ...{
            onToggleFiltersModeAnd,
            filtersModeAnd,
            filtersOptions,
            onFiltersChange,
            filters
          }
        }
      />
      </li>
    </ul>
  );
}