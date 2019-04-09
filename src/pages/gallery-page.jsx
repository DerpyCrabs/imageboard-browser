import React, { useState, useEffect } from 'react'
import { parsePage, getThumbs } from '../sources/paheal'
import { Columns } from 'react-bulma-components/full'
import Thumb from '../components/thumb'

const GalleryPage = React.memo(({ source, query, page }) => {
  let url = null
  if (query !== '') {
    url = `https://rule34.paheal.net/post/list/${query}/${page}`
  } else {
    url = `https://rule34.paheal.net/post/list/${page}`
  }

  const [thumbs, setThumbs] = useState([])
  const [isMounted, setIsMounted] = useState(true)
  useEffect(() => {
    const fetchThumbs = async () => {
      const page = await parsePage(url)
      if (isMounted) {
        setThumbs(getThumbs(page))
      }
    }
    fetchThumbs()
    return () => setIsMounted(false)
  }, [url])

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
