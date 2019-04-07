import React, { useState } from 'react'
import { Tile } from 'react-bulma-components/full'
import ImageDetails from './image-details'

const Img = ({ src, ...props }) => {
  return (
    <Tile
      className="box"
      kind="parent"
      style={{
        backgroundImage: 'url(' + src + ')',
        height: 200,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }}
    />
  )
}

const Thumb = ({ thumb }) => {
  const [showImageDetails, setShowImageDetails] = useState(false)
  const handleClose = e => {
    if (e) {
      e.stopPropagation()
    }
    setShowImageDetails(false)
  }
  return (
    <>
      <Tile kind="parent" size={2} onClick={() => setShowImageDetails(true)}>
        <Img src={thumb.thumbUrl} />
      </Tile>
      <ImageDetails
        image={thumb.imageUrl}
        post={thumb.postUrl}
        onClose={handleClose}
        show={showImageDetails}
      />
    </>
  )
}

export default Thumb
