import React from 'react'
import Gallery from './pages/gallery'
import { useRoutes } from 'hookrouter'
import useDarkMode from 'use-dark-mode'
import DarkModeToggle from './components/dark-mode-toggle'

const routes = {
  '/:source/:query/': ({ source, query }) => (
    <Gallery source={source} query={decodeURIComponent(query)} page={1} />
  ),
  '/:source/:query/:page': ({ source, query, page }) => (
    <Gallery source={source} query={decodeURIComponent(query)} page={page} />
  ),
  '/:source/:page': ({ source, page }) => (
    <Gallery source={source} query="" page={page} />
  ),
  '/:source/': ({ source }) => <Gallery source={source} query="" page={1} />,
  '/:page': ({ page }) => <Gallery source="safebooru" query="" page={page} />,
  '/': () => <Gallery source="safebooru" query="" page={1} />
}
const Facelift = () => {
  const match = useRoutes(routes)

  return match || <div>Page not found</div>
}
const App = () => {
  const { value, toggle, enable, disable } = useDarkMode(false, {
    onChange: () => {}
  })
  return (
    <>
      <DarkModeToggle
        value={value}
        toggle={toggle}
        enable={enable}
        disable={disable}
      />
      {value ? (
        <link rel="stylesheet" href="/bulmaswatch.min.css" />
      ) : (
        <link rel="stylesheet" href="/bulma.min.css" />
      )}
      <Facelift />
    </>
  )
}

export default App
