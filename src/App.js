import React from 'react'
import 'react-bulma-components/full'
import Gallery from './pages/gallery'
import { useRoutes } from 'hookrouter'

const routes = {
  '/:query/*': ({ query }) => <Gallery query={query} />,
  '/:query': ({ query }) => <Gallery query={query} />,
  '/*': () => <Gallery query="" />,
  '/': () => <Gallery query="" />
}
const Facelift = () => {
  const match = useRoutes(routes)

  return <div className="section">{match || <div>Page not found</div>}</div>
}
const App = () => <Facelift />

export default App
