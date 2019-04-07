import React, { useState, useEffect } from 'react'
import { parsePage, getPageCount } from '../crawler'
import Pagination from '../components/pagination'
import GalleryPage from './gallery-page'
import { useRoutes, navigate } from 'hookrouter'
import useHotkeys from '../use-hotkeys'

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

  const [pageCount, setPageCount] = useState(null)
  const page = usePage()

  const nextPage = event => {
    const next = page !== pageCount ? page + 1 : page
    navigate(next.toString())
  }
  const prevPage = event => {
    const prev = page !== 1 ? page - 1 : page
    navigate(prev.toString())
  }

  useHotkeys('ArrowRight', nextPage)
  useHotkeys('ArrowLeft', prevPage)

  const match = useRoutes(routes)
  const [isMounted, setIsMounted] = useState(true)

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

  const [search, setSearch] = useState(decodeURI(query))
  return (
    <div>
      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            className="input"
            type="text"
            value={search}
            placeholder="Find by tags"
            onChange={e => setSearch(e.target.value)}
            onKeyPress={e =>
              e.key === 'Enter'
                ? navigate(search !== '' ? '/' + search + '/' : '/')
                : ''
            }
          />
        </div>
        <div className="control">
          <div
            className="button is-info"
            onClick={() => navigate(search !== '' ? '/' + search + '/' : '/')}
          >
            Find
          </div>
        </div>
      </div>
      <div>
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
    </div>
  )
}

export default Gallery
