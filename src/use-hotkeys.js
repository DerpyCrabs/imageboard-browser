import { useEffect } from 'react'

const useHotkeys = (key, handler) => {
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
  }, [handler])
}

export default useHotkeys
