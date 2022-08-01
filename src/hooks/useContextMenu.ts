import { useEffect, useState } from 'react'

export const useContextMenu = () => {
  const [position, setPosition] = useState([0, 0])
  const [isMenuShow, setMenuShow] = useState(false)

  const showMenu = e => {
    setPosition([e.pageX, e.pageY])
    setMenuShow(true)
  }

  const hideMenu = () => {
    setMenuShow(false)
  }

  useEffect(() => {
    document.addEventListener('keydown', e => e.key === 'Escape' && setMenuShow(false))
    document.addEventListener('mousedown', () => setMenuShow(false))
    document.addEventListener('click', () => setMenuShow(false))
    document.addEventListener('contextmenu', e => e.preventDefault())
    return () => {
      document.removeEventListener('keydown', e => e.key === 'Escape' && setMenuShow(false))
      document.removeEventListener('mousedown', () => setMenuShow(false))
      document.removeEventListener('click', () => setMenuShow(false))
      document.removeEventListener('contextmenu', e => e.preventDefault())
    }
  }, [])

  return { position, isMenuShow, showMenu, hideMenu }
}
