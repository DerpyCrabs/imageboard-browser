import React, { useState, useEffect } from 'react'
import { Modal } from 'bulma-styled-components'

const ImageDetails = ({ source, show, image, post, onClose }) => {
  const [imageUrl, setImageUrl] = useState('')
  useEffect(() => {
    const fetchThumbs = async () => {
      const url = await source.getImageUrl(post)
      setImageUrl(url)
    }
    fetchThumbs()
  }, [post])
  return (
    <Modal className={show ? 'is-active' : ''}>
      <Modal.Background onClick={onClose} />
      <Modal.Card
        style={{
          width: 'auto',
          display: 'inline-flex',
          marginRight: '20px',
          marginLeft: '20px',
          borderRadius: '5px'
        }}
      >
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
        </Modal.Card.Body>
      </Modal.Card>
    </Modal>
  )
}

export default ImageDetails
