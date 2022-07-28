import cn from 'classnames'
import { FC, PropsWithChildren } from 'react'
import ReactModal from 'react-modal'
import { useTranslate } from '../../hooks/useTranslate'
import { Button } from '../ui'
import './ModalWrapper.css'
import css from './ModalWrapper.module.scss'
import { IModalWrapper } from './modalWrapper.interfaces'

export const ModalWrapper: FC<PropsWithChildren<IModalWrapper>> = props => {
  const {
    children,
    zIndex = 1000,
    waiting = false,
    warning = false,
    title,
    onSubmitHandler,
    onCancelHandler,
    isValid = true,
    ...rest
  } = props

  const { text } = useTranslate()

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
      <div className={'flex flex-col'}>
        <div className={cn(css.header, warning && css.warning)}>{title}</div>
        <form onSubmit={onSubmitHandler} className={'flex flex-col'}>
          <div className={css.body}>{children}</div>
          <div className={css.footer}>
            <Button disabled={!isValid} type="submit">
              {text.actions.ok}
            </Button>
            <Button type="button" onClick={onCancelHandler}>
              {text.actions.cancel}
            </Button>
          </div>
        </form>
      </div>
    </ReactModal>
  )
}

export default ModalWrapper
