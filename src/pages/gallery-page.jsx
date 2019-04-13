import React, { useState, useEffect } from 'react'
import Thumb from '../components/thumb'
import { Section, Columns } from 'bulma-styled-components'
import { getSource } from '../sources/util'

const GalleryPage = React.memo(({ source, query, page }) => {
  const [thumbs, setThumbs] = useState([])
  const [isMounted, setIsMounted] = useState(true)
  const sourceModule = getSource(source)
  useEffect(() => {
    const fetchThumbs = async () => {
      const pageContents = await sourceModule.parsePage(query, page)
      if (isMounted) {
        setThumbs(sourceModule.getThumbs(pageContents))
      }
    }
    fetchThumbs()
    return () => setIsMounted(false)
  }, [query, page])

  return (
    <Section>
      {thumbs.length !== 0 ? (
        <>
          <Columns className="is-multiline">
            {thumbs.map(thumb => (
              <Thumb key={thumb.postUrl} source={source} thumb={thumb} />
            ))}
          </Columns>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </Section>
  )
})

export default GalleryPage
