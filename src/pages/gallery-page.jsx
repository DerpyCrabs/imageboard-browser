import React, { useState, useEffect } from 'react'
import { parsePage, getThumbs } from '../sources/paheal'
import { Columns } from 'react-bulma-components/full'
import Thumb from '../components/thumb'

const GalleryPage = React.memo(({ source, query, page }) => {
  const [thumbs, setThumbs] = useState([])
  const [isMounted, setIsMounted] = useState(true)
  useEffect(() => {
    const fetchThumbs = async () => {
      const pageContents = await parsePage(query, page)
      if (isMounted) {
        setThumbs(getThumbs(pageContents))
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
              <Thumb key={thumb.postUrl} thumb={thumb} />
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
