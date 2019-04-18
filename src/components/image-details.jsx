import React, { useState } from 'react'
import { A } from 'hookrouter'

const Image = ({ src }) => {
  const [imageIndex, setImageIndex] = useState(0)
  const [error, setError] = useState(false)
  const handleError = () => {
    if (typeof src === 'string') {
      setError(true)
    } else {
      if (imageIndex !== src.length - 1) {
        setImageIndex(imageIndex + 1)
      } else {
        setError(true)
      }
    }
  }

  let image = null
  if (typeof src === 'string') {
    image = (
      <img
        src={src}
        alt="Fullsize"
        onError={handleError}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain'
        }}
      />
    )
  } else {
    image = (
      <img
        src={src[imageIndex]}
        alt="Fullsize"
        onError={handleError}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain'
        }}
      />
    )
  }

  return (
    <>
      {error ? (
        <div className="notification is-danger">
          Failed to load image or trying to display video
        </div>
      ) : (
        image
      )}
    </>
  )
}

const ImageDetails = ({ show, post, onClose, tags }) => {
  const [showTags, setShowTags] = useState(false)
  const [loading, setLoading] = useState(post.needsHack ? true : false)

  return (
    <div className={'modal ' + (show ? 'is-active' : '')}>
      {post.needsHack && (
        <iframe
          title={post.imageUrl}
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
            {!loading && <Image src={post.imageUrl} />}
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
