import React, { useState, useEffect } from 'react'
import { parse_page, get_page_count } from '../crawler'
import Pagination from '../components/pagination'
import GalleryPage from './gallery-page'
import { useRoutes } from 'hookrouter'

const routes = {
  ':page': ({ page }) => query => <GalleryPage query={query} page={page} />,
  '': () => query => <GalleryPage query="" page={'1'} />
}
const Gallery = ({ query }) => {
  let url = null
  if (query !== '') {
    url = `https://rule34.paheal.net/post/list/${query}`
  } else {
    url = `https://rule34.paheal.net/post/list`
  }

  const match = useRoutes(routes)
  const [pageCount, setPageCount] = useState(null)
  useEffect(() => {
    const fetchPageCount = async () => {
      const page = await parse_page(url)
      setPageCount(get_page_count(page))
    }
    fetchPageCount()
  }, [url])
  return (
    <div className="section">
      {pageCount ? (
        <>
          {match ? (
            match(query) || <div>Page not found</div>
          ) : (
            <GalleryPage query={query} page={'1'} />
          )}
          <Pagination current={3} total={pageCount} />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default Gallery
