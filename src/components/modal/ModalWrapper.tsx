import cn from 'classnames'
import { FC, ReactNode } from 'react'
import ReactModal from 'react-modal'
import { useTranslate } from '../../hooks/useTranslate'
import { Button } from '../ui'
import './ModalWrapper.css'
import { Body, Footer, Header } from './ModalWrapper.styled'

export interface IModalWrapper {
  waiting?: boolean
  children: ReactNode
  warning?: boolean
  isOpen: boolean
  type: 'type1' | 'type2'
  size: string
  title?: string
  onSubmitHandler: (e) => void
  onCancelHandler: (e) => void
  zIndex?: 1000 | 1100 | 1200
}

export const ModalWrapper: FC<IModalWrapper> = props => {
  const {
    children,
    zIndex = 1000,
    waiting = false,
    warning,
    title,
    onSubmitHandler,
    onCancelHandler,
    ...rest
  } = props

  const { text } = useTranslate()

  const buttons = (
    <>
      <Button
        disabled={waiting}
        type="submit"
        onClick={onSubmitHandler}
        variant={warning ? 'accent' : 'normal'}
        // autoFocus={!rest.warning}
      >
        {text.actions.ok}
      </Button>
      <span style={{ marginRight: 10 }} />
      <Button disabled={waiting} type="button" onClick={onCancelHandler} autoFocus={warning}>
        {text.actions.cancel}
      </Button>
    </>
  )

  return (
    <ReactModal
      {...rest}
      shouldCloseOnOverlayClick={!waiting}
      shouldCloseOnEsc={!waiting}
      appElement={document.getElementById('#modal')}
      ariaHideApp={false}
      closeTimeoutMS={300}
      className={{
        base: `content-base ${rest.type} ${rest.size} zIndex${zIndex}`,
        afterOpen: `content-after-open-${rest.type}`,
        beforeClose: `content-before-close-${rest.type}`,
      }}
      overlayClassName={{
        base: `overlay-base zIndex${zIndex}`,
        afterOpen: 'overlay-after-open',
        beforeClose: 'overlay-before-close',
      }}
      onRequestClose={onCancelHandler}
    >
      <form onSubmit={onSubmitHandler}>
        <Header className={cn({ warning })}>{title}</Header>
        <Body>{children}</Body>
        <Footer>{buttons}</Footer>
      </form>
    </ReactModal>
  )
}

export default ModalWrapper
