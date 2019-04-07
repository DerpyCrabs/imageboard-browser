import React, { useState, useEffect } from 'react'
import { parse_page, get_thumbs } from '../crawler'
import { Columns } from 'react-bulma-components/full'
import Thumb from '../components/thumb'

const GalleryPage = ({ query, page }) => {
  let url = null
  if (query !== '') {
    url = `https://rule34.paheal.net/post/list/${query}/${page}`
  } else {
    url = `https://rule34.paheal.net/post/list/${page}`
  }
  const [data, setData] = useState({ thumbs: [] })
  useEffect(() => {
    const fetchThumbs = async () => {
      const page = await parse_page(url)
      setData({ thumbs: get_thumbs(page) })
    }
    fetchThumbs()
  }, [url])
  return (
    <div className="section">
      {data.thumbs.length !== 0 ? (
        <>
          <Columns>
            {data.thumbs.map(thumb => (
              <Thumb key={thumb.postUrl} thumb={thumb} />
            ))}
          </Columns>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default GalleryPage
