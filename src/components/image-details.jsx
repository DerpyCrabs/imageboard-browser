import React, { useState, useEffect } from 'react'
import { navigate } from 'hookrouter'
import { getSource } from '../sources/util'

const ImageDetails = ({ source, show, post, onClose, tags }) => {
  const [imageUrl, setImageUrl] = useState('')
  const [showTags, setShowTags] = useState(false)
  const handleTagClick = tag => {
    navigate(`/${source}/${encodeURIComponent(tag)}/`)
  }

  useEffect(() => {
    const fetchThumbs = async () => {
      const url = await getSource(source).getImageUrl(post)
      setImageUrl(url)
    }
    fetchThumbs()
  }, [post])
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
          <div class="level" style={{ flexGrow: 1 }}>
            <div
              className="level-item has-text-centered"
              style={{ flexGrow: 1 }}
            >
              <div>
                <a href={post} target="_blank" rel="noopener noreferrer">
                  {post}
                </a>
                <div className="heading">from rule34.paheal.net</div>
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
              src={imageUrl}
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
                  className="tag is-info"
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
