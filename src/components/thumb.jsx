import React, { useState } from 'react'
import ImageDetails from './image-details'

const Img = ({ src }) => {
  return (
    <div
      className="box"
      style={{
        backgroundImage: 'url(' + src + ')',
        height: 200,
        width: '100%',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }}
    />
  )
}

const Thumb = ({ source, post }) => {
  const [showImageDetails, setShowImageDetails] = useState(false)
  const handleClose = e => {
    if (e) {
      e.stopPropagation()
    }
    setShowImageDetails(false)
  }
  return (
    <>
      <div
        className="tile is-parent is-2"
        onClick={() => setShowImageDetails(true)}
      >
        <Img src={post.thumbUrl} />
      </div>
      {showImageDetails && (
        <ImageDetails
          post={post}
          tags={post.tags.split(' ').filter(tag => tag !== '')}
          onClose={handleClose}
          show={true}
        />
      )}
    </>
  )
}

export default Thumb
