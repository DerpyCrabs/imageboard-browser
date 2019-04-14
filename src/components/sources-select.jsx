import React, { useState } from 'react'
import './sources-select.css'

const Source = ({ title, value, isChecked, onClick, onCheck }) => {
  return (
    <button className="button is-fullwidth" style={{ display: 'inline' }}>
      <div
        style={{
          float: 'left',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      >
        <input
          type="checkbox"
          checked={isChecked}
          onChange={e => onCheck(value)}
        />
      </div>
      <div onClick={onClick}>{title}</div>
    </button>
  )
}
const SourcesSelect = ({ value, onChange, children }) => {
  const [show, setShow] = useState(false)
  let sources = []
  React.Children.forEach(children, element => {
    if (!React.isValidElement(element)) return

    const { value, children } = element.props
    sources = [...sources, { value, children }]
  })
  const current = sources.filter(
    ({ value: sourceValue }) => sourceValue === value
  )
  const [selected, setSelected] = useState(
    sources.map(({ value }) => {
      return {
        value,
        selected:
          current.length !== 0 && current[0].value === value ? true : false
      }
    })
  )
  const handleSelect = value => {
    const selectedSource = selected.find(
      ({ value: value2 }) => value2 === value
    )
    let newSelected = [...selected].filter(
      ({ value: value2 }) => value2 !== value
    )
    setSelected([
      ...newSelected,
      { value: selectedSource.value, selected: !selectedSource.selected }
    ])
  }
  const handleShow = () => {
    if (show) {
      if (selected.filter(({ selected }) => selected === true).length !== 0) {
        onChange(
          selected
            .filter(({ selected }) => selected === true)
            .map(({ value }) => value)
            .join('-')
        )
      }
      setShow(false)
    } else {
      setShow(true)
    }
  }
  return (
    <div className="sources-select">
      <button className="button" onClick={() => handleShow()}>
        {current.length !== 0 ? current[0].children : 'Many sources'}
      </button>
      {show && (
        <div
          className="section"
          style={{ width: '100%', padding: 0, margin: 0 }}
        >
          <ul>
            {sources.map(({ value, children }) => (
              <li key={value}>
                <Source
                  value={value}
                  isChecked={
                    selected.find(({ value: value2 }) => value2 === value)
                      .selected
                  }
                  title={children}
                  onClick={() => onChange(value)}
                  onCheck={handleSelect}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SourcesSelect
