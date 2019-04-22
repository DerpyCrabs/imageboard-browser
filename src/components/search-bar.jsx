import React, { useState, useEffect } from 'react'
import TagsInput from './tags-input'

const SearchBar = ({ initialQuery, source, handleSearch, isLoading }) => {
  const [search, setSearch] = useState(decodeURIComponent(initialQuery) + ' ')
  useEffect(() => setSearch(decodeURIComponent(initialQuery) + ' '), [
    initialQuery
  ])

  return (
    <div className="field has-addons" style={{flexWrap:'nowrap', flexBasis: '100%', width: '100%'}}>
      <div className={'control is-expanded' + (isLoading ? ' is-loading' : '')}>
        <TagsInput
          tags={search}
          setTags={e => setSearch(e)}
          onEnter={e => handleSearch(source, e)}
        />
      </div>
      <div className="control">
        <div className="select">
          <select
            value={source}
            onChange={e => handleSearch(e.target.value, search)}
          >
            <option value="safebooru">Safebooru</option>
            <option value="konachan">Konachan</option>
            <option value="yandere">Yandere</option>
            <option value="rule34">Rule34</option>
          </select>
        </div>
      </div>
      <div className="control">
        <button
          className="button is-primary"
          onClick={() => handleSearch(source, search)}
        >
          Find
        </button>
      </div>
    </div>
  )
}

export default SearchBar
