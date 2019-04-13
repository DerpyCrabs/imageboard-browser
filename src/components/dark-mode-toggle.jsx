import React from 'react'
import './dark-mode-toggle.css'

const DarkModeToggle = ({ enable, disable, value, toggle }) => {
  return (
    <div style={{ float: 'right', margin: 6 }}>
      <div className={'dark-mode-toggle ' + (value ? 'dark' : 'light')}>
        <button type="button" onClick={disable}>
          ☀
        </button>
        <span className="toggle-control">
          <input
            className="checkbox"
            type="checkbox"
            checked={value}
            onChange={toggle}
          />
          <label className="checkbox-toggle" />
        </span>
        <button type="button" onClick={enable}>
          ☾
        </button>
      </div>
    </div>
  )
}

export default DarkModeToggle
