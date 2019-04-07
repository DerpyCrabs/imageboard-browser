import React from 'react'
import { Modal } from 'react-bulma-components/full'

const ImageDetails = ({ image, post, onClose, show }) => {
  return (
    <Modal show={show} onClose={onClose} showClose={false} closeOnBlur>
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
            src={image}
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
