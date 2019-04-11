import React, { useState, useEffect } from 'react'
import { Columns } from 'react-bulma-components/full'
import Thumb from '../components/thumb'

const GalleryPage = React.memo(({ source, query, page }) => {
  const [thumbs, setThumbs] = useState([])
  const [isMounted, setIsMounted] = useState(true)
  useEffect(() => {
    const fetchThumbs = async () => {
      const pageContents = await source.parsePage(query, page)
      if (isMounted) {
        setThumbs(source.getThumbs(pageContents))
      }
    }
    fetchThumbs()
    return () => setIsMounted(false)
  }, [query, page])

  return (
    <div className="section">
      {thumbs.length !== 0 ? (
        <>
          <Columns>
            {thumbs.map(thumb => (
              <Thumb key={thumb.postUrl} source={source} thumb={thumb} />
            ))}
          </Columns>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
})

export default GalleryPage
