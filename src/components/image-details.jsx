import React, { useState, useEffect } from 'react'
import { Modal, Level, Heading } from 'bulma-styled-components'

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
          <Level style={{ flexGrow: 1 }}>
            <Level.Item className="has-text-centered" style={{ flexGrow: 1 }}>
              <div>
                <a href={post} target="_blank" rel="noopener noreferrer">
                  {post}
                </a>
                <Heading>from rule34.paheal.net</Heading>
              </div>
            </Level.Item>
          </Level>
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
