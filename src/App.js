import React from 'react'
import Gallery from './pages/gallery'
import { useRoutes } from 'hookrouter'
import { BulmaStyledTheme } from 'bulma-styled-components'

const routes = {
  '/:source/:query/*': ({ source, query }) => (
    <Gallery source={source} query={query} />
  ),
  '/:source/*': ({ source }) => <Gallery source={source} query="" />,
  '/:source/': ({ source }) => <Gallery source={source} query="" />,
  '/*': () => <Gallery source="safebooru" query="" />,
  '/': () => <Gallery source="safebooru" query="" />
}
const Facelift = () => {
  const match = useRoutes(routes)

  return match || <div>Page not found</div>
}
const App = () => (
  <BulmaStyledTheme>
    <Facelift />
  </BulmaStyledTheme>
)

export default App
