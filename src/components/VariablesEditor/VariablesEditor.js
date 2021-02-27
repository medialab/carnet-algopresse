import React, {useState} from 'react';

export default function VariablesEditor ({
  options,
  variables,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const isNotAllDefault = variables.find(v => v.value !== 'default' && v.value !== undefined) !== undefined;
  console.log(variables);
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
                    return  Object.entries(options)
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
                  <select value={value} onChange={e => onChange(e.target.value)}>
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