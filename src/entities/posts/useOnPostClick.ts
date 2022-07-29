import { useContextMenu } from '../../hooks/useContextMenu'

export const useOnPostClick = () => {
  const { position, isMenuShow, showContextMenu, hideContextMenu } = useContextMenu()

  const onPostClickHandler = (e, postId) => {
    e.preventDefault()
    e.type === 'mousedown' && hideContextMenu()
    showContextMenu(e)
  }

  return { onPostClickHandler, showContextMenu, position, isMenuShow }
}
