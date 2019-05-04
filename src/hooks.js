import { useEffect } from 'react'

export const useHotkeys = (key, handler) => {
  useEffect(() => {
    const callback = event => {
      if (event.key === key) {
        event.preventDefault()
        event.stopPropagation()
        handler(event)
      }
    }
    window.addEventListener('keydown', callback)
    return () => {
      window.removeEventListener('keydown', callback)
    }
  }, [key, handler])
}

export const useTitle = title => {
  useEffect(() => {
    document.title = title
  }, [title])
}
