import React from 'react'

const Tag = ({ tag, onDelete }) => (
  <div className="tags has-addons">
    <div className={'tag' + (tag[0] === '-' ? ' has-background-danger' : '')}>
      {tag}
    </div>
    <div
      className={
        'tag is-delete' + (tag[0] === '-' ? ' has-background-danger' : '')
      }
      onClick={onDelete}
    />
  </div>
)

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
      {completeTags.map(tag => (
        <div className="control" key={tag}>
          <Tag tag={tag} onDelete={() => handleRemoveTag(tag)} />
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
