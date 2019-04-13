import React, { useState, useEffect } from 'react'
import { getSource } from '../sources/util'
import Pagination from '../components/pagination'
import GalleryPage from './gallery-page'
import { useRoutes, navigate } from 'hookrouter'
import useHotkeys from '../use-hotkeys'
import TagsInput from '../components/tags-input'

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

  const [search, setSearch] = useState(decodeURIComponent(query) + ' ')

  const handleSearch = source =>
    navigate(
      search !== '' && search !== ' '
        ? `/${source}/${encodeURIComponent(search.trim())}/`
        : `/${source}/`
    )
  return (
    <div className="section">
      <div className="field has-addons">
        <div className="control is-expanded">
          <TagsInput
            tags={search}
            setTags={e => setSearch(e)}
            onEnter={e => handleSearch(source)}
          />
        </div>
        <div className="control">
          <div className="select">
            <select value={source} onChange={e => handleSearch(e.target.value)}>
              <option value="safebooru">Safebooru</option>
              <option value="konachan">Konachan</option>
              <option value="yandere">Yandere</option>
              <option value="paheal">Paheal</option>
              <option value="rule34">Rule34</option>
            </select>
          </div>
        </div>
        <div className="control">
          <button
            className="button is-primary"
            onClick={() => handleSearch(source)}
          >
            Find
          </button>
        </div>
      </div>
      <div>
        {pageCount ? (
          <>
            {match ? (
              match(source, query) || <div>Page not found</div>
            ) : (
              <GalleryPage source={source} query={query} page={'1'} />
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
