import { useEffect, useState } from 'react'

export const useContextMenu = () => {
  const [position, setPosition] = useState([0, 0])
  const [isMenuShow, setMenuShow] = useState(false)

  const rightClickHandler = e => {
    e.preventDefault()
  }

  const showContextMenu = e => {
    e.preventDefault()
    setPosition([e.pageX, e.pageY])
    setMenuShow(true)
  }

  const escapeKeyHandler = e => {
    if (e.key === 'Escape') setMenuShow(false)
  }

  useEffect(() => {
    document.addEventListener('click', () => setMenuShow(false))
    document.addEventListener('contextmenu', rightClickHandler)
    document.addEventListener('keydown', escapeKeyHandler)
    return () => {
      document.removeEventListener('click', () => setMenuShow(false))
      document.removeEventListener('contextmenu', rightClickHandler)
      document.removeEventListener('keydown', escapeKeyHandler)
    }
  }, [])

  return { position, isMenuShow, showContextMenu }
}
