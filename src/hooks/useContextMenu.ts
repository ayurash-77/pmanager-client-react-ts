import { useEffect, useState } from 'react'

export const useContextMenu = () => {
  const [position, setPosition] = useState([0, 0])
  const [isMenuShow, setMenuShow] = useState(false)

  const showContextMenu = e => {
    setPosition([e.pageX, e.pageY])
    setMenuShow(true)
  }

  const hideContextMenu = () => {
    setMenuShow(false)
  }

  useEffect(() => {
    document.addEventListener('keydown', e => e.key === 'Escape' && setMenuShow(false))
    document.addEventListener('mousedown', () => setMenuShow(false))
    document.addEventListener('click', () => setMenuShow(false))
    return () => {
      document.removeEventListener('keydown', e => e.key === 'Escape' && setMenuShow(false))
      document.removeEventListener('mousedown', () => setMenuShow(false))
      document.removeEventListener('click', () => setMenuShow(false))
    }
  }, [])

  return { position, isMenuShow, showContextMenu, hideContextMenu }
}
