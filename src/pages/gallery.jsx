import React, { useState, useEffect } from 'react'
import { getSource } from '../sources/util'
import Pagination from '../components/pagination'
import GalleryPage from './gallery-page'
import { navigate } from 'hookrouter'
import { useHotkeys, useTitle } from '../hooks'
import SearchBar from '../components/search-bar'

const Gallery = ({ source, query, page: pageString }) => {
  const page = parseInt(pageString, 10)

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
  }, [source, query, page])

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
  useTitle(`"${decodeURIComponent(query)}" from ${source} - Imageboard Browser`)

  return (
    <div className="section">
      <SearchBar
        initialQuery={query}
        source={source}
        isLoading={!posts || posts.posts.length === 0}
      />
      <div>
        {posts && (
          <>
            <GalleryPage posts={posts.posts} />
            <Pagination current={page} total={posts.pageCount} />
          </>
        )}
      </div>
    </div>
  )
}

export default Gallery
