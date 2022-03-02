import styled from 'styled-components'
import { FC, FunctionComponent, ReactNode } from 'react'
import ReactModal from 'react-modal'
import './ModalWrapper.css'
import { useTranslate } from '../hooks/useTranslate'
import { FlexColumn, Button } from '../components/ui'

interface IHeader {
  warning?: boolean
}

export interface IModalWrapper extends IHeader {
  waiting?: boolean
  children: ReactNode
  warning?: boolean
  isOpen: boolean
  type: 'type1' | 'type2'
  size: string
  title: string
  onSubmitHandler: (e) => void
  onCancelHandler: (e) => void
  header?: boolean
  footer?: boolean
  zIndex?: 1000 | 1100 | 1200
}

interface IModalContainer {
  waiting?: boolean
}

const ModalContainer = styled.div<IModalContainer>`
  //cursor: ${p => (p.waiting ? 'pointer' : 'pointer')};

  * {
    cursor: progress !important;
  }
`

const Header = styled.div<IHeader>`
  border-radius: 6px 6px 0 0;
  background: ${p => (p.warning ? 'var(--accent)' : 'var(--modal-header-fg)')};
  color: var(--modal-header-fg);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
  font-weight: 400;
  font-size: var(--font-size-big1);
  padding: 10px 15px;
  width: 100%;
`

const Body = styled.div`
  width: 100%;
  max-height: calc(100vh - 150px);
  overflow: auto;
  background: var(--header-bg);
`

const Footer = styled.div`
  width: 100%;
  padding: 10px 15px;
  border-radius: 0 0 6px 6px;
  background: var(--modal-footer-bg);
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
`

export const ModalWrapper: FC<IModalWrapper> = ({
  children,
  header = true,
  footer = true,
  zIndex = 1000,
  waiting = false,
  ...props
}) => {
  const { text } = useTranslate()
  const buttons = (
    <>
      <Button
        disabled={waiting}
        type="submit"
        onClick={props.onSubmitHandler}
        variant={props.warning ? 'accent' : 'normal'}
        // autoFocus={!props.warning}
      >
        {text.actions.ok}
      </Button>
      <span style={{ marginRight: 10 }} />
      <Button disabled={waiting} type="button" onClick={props.onCancelHandler} autoFocus={props.warning}>
        {text.actions.cancel}
      </Button>
    </>
  )

  return (
    <ReactModal
      {...props}
      shouldCloseOnOverlayClick={!waiting}
      shouldCloseOnEsc={!waiting}
      appElement={document.getElementById('#modal')}
      ariaHideApp={false}
      closeTimeoutMS={300}
      className={{
        base: `content-base ${props.type} ${props.size} zIndex${zIndex}`,
        afterOpen: `content-after-open-${props.type}`,
        beforeClose: `content-before-close-${props.type}`,
      }}
      overlayClassName={{
        base: `overlay-base zIndex${zIndex}`,
        afterOpen: 'overlay-after-open',
        beforeClose: 'overlay-before-close',
      }}
      onRequestClose={props.onCancelHandler}
    >
      <form onSubmit={props.onSubmitHandler}>
        {header && <Header warning={props.warning}>{props.title}</Header>}
        <Body>
          <FlexColumn padding={15}>{children}</FlexColumn>
        </Body>
        {footer && <Footer>{buttons}</Footer>}
      </form>
    </ReactModal>
  )
}

export default ModalWrapper
