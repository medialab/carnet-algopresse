
import React, {useState} from 'react';

import ControlButton from '../ControlButton';

export default function FiltersEditor ({
  onToggleFiltersModeAnd,
  filtersModeAnd,
  filtersOptions,
  onFiltersChange,
  filters
}) {
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
                Object.entries(filtersOptions).map(([id, {title}], index) => {
                  return (
                    <option value={id} key={index}>{title}</option>
                  )
                })
              }
              <option value="">Selectionner</option>
            </select>
            {
              newFilterAttribute !== undefined ?
              <select value={''} onChange={handleNewFilterSubmit}>
                {
                  newFilterOptions.map((id, index) => {
                    return (
                      <option value={id} key={index}>{id}</option>
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