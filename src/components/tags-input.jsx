import React from 'react'

const TagsInput = ({ tags, setTags, onEnter }) => {
  const tagRegExp = /((?:\S+ *?)*)*?( ?\S*)$/gu
  const match = tagRegExp.exec(tags)
  const completeTags = match[1]
    ? match[1].split(' ').map(tag => tag.trim())
    : []
  const incompleteTag = match[2].trim()

  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      onEnter(tags)
    } else if (e.keyCode === 8 && e.target.value === '') {
      e.preventDefault()
      setTags(tags.slice(0, -1))
    }
  }

  const handleRemoveTag = tag => {
    onEnter(
      completeTags.filter(completeTag => completeTag !== tag).join(' ') +
        ' ' +
        incompleteTag
    )
  }

  const handleCopy = e => {
    e.preventDefault()
    e.clipboardData.setData('text/plain', tags.trim())
  }

  return (
    <div className="field is-grouped input">
      {completeTags.map((tag, index) => (
        <div className="control" key={tag}>
          <div className="tags has-addons">
            <div className="tag">{tag}</div>
            <div
              className="tag is-delete"
              onClick={() => handleRemoveTag(tag)}
            />
          </div>
        </div>
      ))}
      <input
        className="input"
        type="text"
        value={incompleteTag}
        style={{ border: 0, backgroundColor: 'transparent', boxShadow: 'none' }}
        onChange={e => setTags(completeTags.join(' ') + ' ' + e.target.value)}
        onKeyDown={handleKeyDown}
        onCopy={handleCopy}
      />
    </div>
  )
}

export default TagsInput
