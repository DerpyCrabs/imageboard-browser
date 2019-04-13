import React from 'react'
import { Tags, Tag, Control, Field, Input } from 'bulma-styled-components'

const TagsInput = ({ tags, setTags, onEnter }) => {
  const tagRegExp = /((?:\S+ *?)*)*?( ?\S*)$/gu
  const match = tagRegExp.exec(tags)
  const completeTags = match[1]
    ? match[1].split(' ').map(tag => tag.trim())
    : []
  const incompleteTag = match[2].trim()

  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      onEnter()
    } else if (e.keyCode === 8 && e.target.value === '') {
      e.preventDefault()
      setTags(tags.slice(0, -1))
    }
  }

  const handleRemoveTag = tag => {
    setTags(
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
    <Field className="is-grouped input">
      {completeTags.map((tag, index) => (
        <Control>
          <Tags className="has-addons">
            <Tag className="has-background-grey-lighter">{tag}</Tag>
            <Tag
              className="is-delete has-background-grey-lighter"
              onClick={() => handleRemoveTag(tag)}
            />
          </Tags>
        </Control>
      ))}
      <Input
        type="text"
        value={incompleteTag}
        style={{ border: 0, backgroundColor: 'transparent', boxShadow: 'none' }}
        onChange={e => setTags(completeTags.join(' ') + ' ' + e.target.value)}
        onKeyDown={handleKeyDown}
        onCopy={handleCopy}
      />
    </Field>
  )
}

export default TagsInput
