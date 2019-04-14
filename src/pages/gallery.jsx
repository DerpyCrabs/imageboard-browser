import React, { useState, useEffect } from 'react'
import { getSource } from '../sources/util'
import Pagination from '../components/pagination'
import GalleryPage from './gallery-page'
import { navigate } from 'hookrouter'
import useHotkeys from '../use-hotkeys'
import TagsInput from '../components/tags-input'
import SourcesSelect from '../components/sources-select'

const Gallery = ({ source, query, page: pageString }) => {
  const page = parseInt(pageString, 10)

  const [search, setSearch] = useState(decodeURIComponent(query) + ' ')
  useEffect(() => setSearch(decodeURIComponent(query) + ' '), [query])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [page, query, source])

  const [posts, setPosts] = useState(null)
  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getSource(source).getPosts(query, page)
      setPosts(posts)
    }
    fetchPosts()
    if (posts) {
      setPosts({ pageCount: posts.pageCount, posts: [] })
    }
  }, [query, page])

  const nextPage = event => {
    const next = page !== posts.pageCount ? page + 1 : page
    navigate(next.toString())
  }
  const prevPage = event => {
    const prev = page !== 1 ? page - 1 : page
    navigate(prev.toString())
  }

  useHotkeys('ArrowRight', nextPage)
  useHotkeys('ArrowLeft', prevPage)

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
            <SourcesSelect value={source} onChange={e => handleSearch(e)}>
              <option value="safebooru">Safebooru</option>
              <option value="konachan">Konachan</option>
              <option value="yandere">Yandere</option>
              <option value="paheal">Paheal</option>
              <option value="rule34">Rule34</option>
            </SourcesSelect>
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
        {posts ? (
          <>
            <GalleryPage posts={posts.posts} />
            <Pagination current={page} total={posts.pageCount} />
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  )
}

export default Gallery
