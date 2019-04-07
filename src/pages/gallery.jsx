import React, { useState, useEffect } from 'react'
import { parsePage, getPageCount } from '../crawler'
import Pagination from '../components/pagination'
import GalleryPage from './gallery-page'
import { useRoutes } from 'hookrouter'

const usePage = () => {
  const parsePage = pathname => {
    const maybePage = pathname.split('/').pop()
    if (!maybePage || isNaN(maybePage)) {
      return 1
    } else {
      return parseInt(maybePage, 10)
    }
  }

  const [page, setPage] = useState(parsePage(window.location.pathname))
  useEffect(() => setPage(parsePage(window.location.pathname)), [
    window.location.pathname
  ])
  return page
}

const routes = {
  ':page/': ({ page }) => query => <GalleryPage query={query} page={page} />,
  ':page': ({ page }) => query => <GalleryPage query={query} page={page} />
}

const Gallery = ({ query }) => {
  let url = null
  if (query !== '') {
    url = `https://rule34.paheal.net/post/list/${query}/`
  } else {
    url = `https://rule34.paheal.net/post/list/`
  }

  const page = usePage()

  const match = useRoutes(routes)
  const [isMounted, setIsMounted] = useState(true)

  const [pageCount, setPageCount] = useState(null)
  useEffect(() => {
    const fetchPageCount = async () => {
      const page = await parsePage(url)
      if (isMounted) {
        setPageCount(getPageCount(page))
      }
    }
    fetchPageCount()
    return () => setIsMounted(false)
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
          <Pagination current={page} total={pageCount} />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default Gallery
