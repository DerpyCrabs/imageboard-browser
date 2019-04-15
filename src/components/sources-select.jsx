import React, { useState, useEffect } from 'react'
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

const getSelectedSources = (sources, value) => {
  if (value.includes('-')) {
    const selectedSources = value.split('-')
    return sources.map(({ value }) => {
      return {
        value,
        selected: selectedSources.includes(value)
      }
    })
  } else {
    return sources.map(({ value: value2 }) => {
      return {
        value: value2,
        selected: value === value2
      }
    })
  }
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
  const [selected, setSelected] = useState(getSelectedSources(sources, value))
  useEffect(() => setSelected(getSelectedSources(sources, value)), [
    value,
    sources
  ])
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
                  onClick={() => {
                    onChange(value)
                    setShow(false)
                  }}
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
