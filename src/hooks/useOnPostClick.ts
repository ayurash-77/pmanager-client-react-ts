import { useContextMenu } from './useContextMenu'

export const useOnPostClick = () => {
  const { position, isMenuShow, showContextMenu, hideContextMenu } = useContextMenu({ rightClickOnly: true })

  const onPostClickHandler = (e, postId) => {
    e.preventDefault()
    e.type === 'mousedown' && hideContextMenu()
    showContextMenu(e)
  }

  return { onPostClickHandler, showContextMenu, position, isMenuShow }
}
