import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bulma-components/full'

const ImageDetails = ({ source, image, post, onClose }) => {
  const [imageUrl, setImageUrl] = useState('')
  useEffect(() => {
    const fetchThumbs = async () => {
      const url = await source.getImageUrl(post)
      setImageUrl(url)
    }
    fetchThumbs()
  }, [post])
  return (
    <Modal show onClose={onClose} showClose={false} closeOnBlur>
      <Modal.Card style={{ height: '100%', borderRadius: '5px' }}>
        <Modal.Card.Head showClose={false} style={{ padding: '6px' }}>
          <div className="level" style={{ flexGrow: 1 }}>
            <div className="level-left">
              <div className="level-item" />
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="title is-5">{post}</p>
                <p className="heading">from rule34.paheal.net</p>
              </div>
            </div>
            <div className="level-right">
              <div className="level-item" />
            </div>
          </div>
        </Modal.Card.Head>
        <Modal.Card.Body
          style={{
            paddingTop: '0px',
            display: 'flex',
            justifyContent: 'center'
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
        </Modal.Card.Body>
        <Modal.Card.Foot style={{ padding: '6px' }} />
      </Modal.Card>
    </Modal>
  )
}

export default ImageDetails
