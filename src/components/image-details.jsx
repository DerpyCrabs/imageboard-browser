import React, { useState } from 'react'
import { navigate } from 'hookrouter'

const ImageDetails = ({ show, post, onClose, tags }) => {
  const [showTags, setShowTags] = useState(false)
  const handleTagClick = tag => {
    navigate(`/${post.source}/${encodeURIComponent(tag)}/`)
    onClose(q)
  }

  return (
    <div className={'modal ' + (show ? 'is-active' : '')}>
      <div className="modal-background" onClick={onClose} />
      <div
        className="modal-card"
        style={{
          width: 'auto',
          display: 'inline-flex',
          marginRight: '20px',
          marginLeft: '20px',
          borderRadius: '5px',
          height: '100%'
        }}
      >
        <div
          className="modal-card-head"
          showClose={false}
          style={{ padding: '6px' }}
        >
          <div className="level" style={{ flexGrow: 1 }}>
            <div
              className="level-item has-text-centered"
              style={{ flexGrow: 1 }}
            >
              <div>
                <a href={post} target="_blank" rel="noopener noreferrer">
                  {post.postUrl}
                </a>
                <div className="heading">from {post.sourceTitle}</div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal-card-body"
          style={{
            display: 'inline-flex',
            justifyContent: 'center',
            padding: 0,
            width: '100%',
            height: '100%'
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              width: '100%',
              height: '100%'
            }}
          >
            <img
              src={post.imageUrl}
              alt="Fullsize"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain'
              }}
            />
          </div>
        </div>
        <div
          className="modal-card-foot"
          style={{ padding: 0, flexDirection: 'column' }}
        >
          <button
            className="button is-fullwidth is-small"
            onClick={() => setShowTags(!showTags)}
          >
            {showTags ? 'Hide tags' : 'Show tags'}
          </button>
          {showTags && (
            <div className="tags" style={{ padding: 6 }}>
              {tags.map(tag => (
                <div
                  key={tag}
                  className="tag is-primary"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ImageDetails
