import React, { useState, useEffect } from 'react'
import { getSource } from '../sources/util'
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
  ':page/': ({ page }) => (source, query) => (
    <GalleryPage source={source} query={query} page={page} />
  ),
  ':page': ({ page }) => (source, query) => (
    <GalleryPage source={source} query={query} page={page} />
  )
}

const Gallery = ({ source, query }) => {
  const sourceModule = getSource(source)
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
      const pageContents = await sourceModule.parsePage(query)
      if (isMounted) {
        setPageCount(sourceModule.getPageCount(pageContents))
      }
    }
    fetchPageCount()
    return () => setIsMounted(false)
  }, [query])

  const [search, setSearch] = useState(decodeURI(query))

  const handleSearch = () =>
    navigate(search !== '' ? `/${source}/${search}/` : `/${source}/`)
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
            onKeyPress={e => (e.key === 'Enter' ? handleSearch() : '')}
          />
        </div>
        <div className="control">
          <div className="button is-info" onClick={handleSearch}>
            Find
          </div>
        </div>
      </div>
      <div>
        {pageCount ? (
          <>
            {match ? (
              match(sourceModule, query) || <div>Page not found</div>
            ) : (
              <GalleryPage source={sourceModule} query={query} page={'1'} />
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
