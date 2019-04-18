import React, { useState, useEffect } from 'react'
import { A } from 'hookrouter'

const ImageDetails = ({ show, post, onClose, tags }) => {
  const [showTags, setShowTags] = useState(false)
  const [loading, setLoading] = useState(post.needHack ? true : false)

  return (
    <div className={'modal ' + (show ? 'is-active' : '')}>
      {post.needHack && (
        <iframe
          style={{ display: 'none' }}
          onLoad={() => setLoading(false)}
          src={post.imageUrl}
        />
      )}
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
        <div className="modal-card-head" style={{ padding: '6px' }}>
          <div className="level" style={{ flexGrow: 1 }}>
            <div
              className="level-item has-text-centered"
              style={{ flexGrow: 1 }}
            >
              <div>
                <a
                  href={post.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
            {!loading && (
              <img
                src={post.imageUrl}
                alt="Fullsize"
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain'
                }}
              />
            )}
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
                <A
                  key={tag}
                  className="tag is-primary"
                  href={`/${post.source}/${encodeURIComponent(tag)}/`}
                  onClick={() => onClose()}
                >
                  {tag}
                </A>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ImageDetails
