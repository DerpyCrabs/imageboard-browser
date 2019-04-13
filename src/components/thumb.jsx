import React, { useState } from 'react'
import ImageDetails from './image-details'
import { Tile, Box } from 'bulma-styled-components'

const Img = ({ src, ...props }) => {
  return (
    <Box
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

const Thumb = ({ source, thumb }) => {
  const [showImageDetails, setShowImageDetails] = useState(false)
  const handleClose = e => {
    if (e) {
      e.stopPropagation()
    }
    setShowImageDetails(false)
  }
  return (
    <>
      <Tile
        className="is-parent is-2"
        onClick={() => setShowImageDetails(true)}
      >
        <Img src={thumb.thumbUrl} />
      </Tile>
      {showImageDetails && (
        <ImageDetails
          post={thumb.postUrl}
          tags={thumb.tags.split(' ').filter(tag => tag !== '')}
          onClose={handleClose}
          source={source}
          show={true}
        />
      )}
    </>
  )
}

export default Thumb
