import React, { useState, useEffect } from 'react'
import { parse_page, get_thumbs, get_page_count } from './crawler'
import Thumbs from './components/thumbs'
import 'react-bulma-components/full'
import Pagination from './components/pagination'
import Gallery from './pages/gallery'

const routes = {
  '/:query/:page': ({ query, page }) => <Gallery query={query} page={page} />,
  '/:page': ({ page }) => <Gallery query="" page={page} />
}
const Facelift = () => {
  const url = 'https://rule34.paheal.net/post/list/Miku_Hatsune/'
  const [currentPage, setCurrentPage] = useState('1')
  const [data, setData] = useState({ thumbs: [], pageCount: null })
  useEffect(() => {
    const fetchThumbs = async () => {
      const page = await parse_page(url + currentPage)
      if (data.pageCount !== null) {
        setData({ thumbs: get_thumbs(page), pageCount: data.pageCount })
      } else {
        setData({ thumbs: get_thumbs(page), pageCount: get_page_count(page) })
      }
    }
    fetchThumbs()
  }, [url, currentPage])
  return (
    <div className="section">
      {data.thumbs.length !== 0 ? (
        <>
          <Thumbs thumbs={data.thumbs} />
          <Pagination
            current={parseInt(currentPage, 10)}
            total={data.pageCount}
            navigateCallback={to => setCurrentPage(to)}
          />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}
const App = () => <Facelift />

export default App
