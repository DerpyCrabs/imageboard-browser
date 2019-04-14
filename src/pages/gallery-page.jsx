import React from 'react'
import Thumb from '../components/thumb'

const GalleryPage = React.memo(({ posts }) => {
  return (
    <div className="section">
      <div className="columns is-multiline">
        {posts.map(post => (
          <Thumb key={post.postUrl} post={post} />
        ))}
      </div>
    </div>
  )
})

export default GalleryPage
