import React from 'react'
import 'react-bulma-components/full'
import Gallery from './pages/gallery'
import { useRoutes } from 'hookrouter'

const routes = {
  '/:source/:query/*': ({ source, query }) => (
    <Gallery source={source} query={query} />
  ),
  '/:source/*': ({ source }) => <Gallery source={source} query="" />,
  '/:source/': ({ source }) => <Gallery source={source} query="" />,
  '/*': () => <Gallery source="paheal" query="" />,
  '/': () => <Gallery source="paheal" query="" />
}
const Facelift = () => {
  const match = useRoutes(routes)

  return <div className="section">{match || <div>Page not found</div>}</div>
}
const App = () => <Facelift />

export default App
