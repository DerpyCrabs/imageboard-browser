import React from 'react'
import Gallery from './pages/gallery'
import { useRoutes } from 'hookrouter'
import useDarkMode from 'use-dark-mode'
import DarkModeToggle from './components/dark-mode-toggle'

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
