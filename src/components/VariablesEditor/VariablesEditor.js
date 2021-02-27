import React, {useState} from 'react';

export default function VariablesEditor ({
  options,
  variables,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const isNotAllDefault = variables.find(v => v.value !== 'default' && v.value !== undefined) !== undefined;
  return (
    <div className="FiltersEditor VariablesEditor">
      <div>
        <button className={isOpen || isNotAllDefault ? 'is-active' : ''} onClick={() => setIsOpen(!isOpen)}>
          Variables ...
        </button>
      </div>
      {
        (isOpen || isNotAllDefault) &&
        <div>
          {
            variables.map(({title, value, onChange, type}, index) => {
              const getOptions = () => {
                switch(type) {
                  case 'color':
                  case 'string':
                    return  Object.entries(options)
                  case 'boolean':
                    return [['true', {title: 'Oui'}], ['false', {title: 'Non'}]]
                  case 'number':
                  default:
                    return Object.entries(options)
                    .filter(([_id, option]) => ['integer', 'float'].includes(option.type))
                }
              }
              const activeOptions = [
                {
                  value: 'default',
                  title: 'Défaut'
                },
                ...getOptions()
                  .map(([id, option]) => ({
                    label: option.title,
                    value: id
                  }))
              ]

              if (activeOptions.length <= 1) {
                return null;
              }
              return (
                <div key={index}>
                  <h6>{title} </h6>
                  <select value={value} onChange={e => {
                      const newVal = e.target.value;
                      if (type === 'boolean') {
                        return onChange(newVal === 'true' ? true : false)
                      }
                      return onChange(newVal)
                    }}>
                    {
                      activeOptions.map(({value, label}) => (
                        <option key={value} value={value}>
                          {label || 'Défaut'}
                        </option>
                      ))
                    }
                  </select>
                </div>
              )
            })
          }
        </div>
      }
      
    </div>
  )
}