import styled from 'styled-components'
import { FC, FunctionComponent, ReactNode } from 'react'
import ReactModal from 'react-modal'
import './ModalWrapper.css'
import { useTranslate } from '../hooks/useTranslate'
import { Rows } from '../components/ui/Containers'
import { appColors } from '../app/App.colors'
import { Button } from '../components/ui/Button'

interface IHeader {
  warning?: boolean
}

export interface IModalWrapper extends IHeader {
  children: ReactNode
  warning?: boolean
  isOpen: boolean
  type: string
  size: string
  title: string
  onSubmitHandler: (e) => void
  onCancelHandler: (e) => void
}

const Header = styled.div<IHeader>`
  border-radius: 6px 6px 0 0;
  background: ${p => (p.warning ? appColors.main.ACCENT : appColors.modal.HEADER_BG)};
  color: ${appColors.modal.HEADER_FG};
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
  background: ${appColors.header.BG};
`

const Footer = styled.div`
  width: 100%;
  padding: 10px 15px;
  border-radius: 0 0 6px 6px;
  background: ${appColors.modal.FOOTER_BG};
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
`

export const ModalWrapper: FC<IModalWrapper> = ({ children, ...props }) => {
  const { text } = useTranslate()
  const className = props.warning ? 'accentBg' : ''
  const buttons = (
    <>
      <Button type="submit" onClick={props.onSubmitHandler} className={className} autoFocus={!props.warning}>
        {text.actions.ok}
      </Button>
      <span style={{ marginRight: 10 }} />
      <Button type="button" onClick={props.onCancelHandler} autoFocus={props.warning}>
        {text.actions.cancel}
      </Button>
    </>
  )

  return (
    <ReactModal
      {...props}
      appElement={document.getElementById('#modal')}
      ariaHideApp={false}
      closeTimeoutMS={300}
      className={{
        base: `content-base ${props.type} ${props.size}`,
        afterOpen: `content-after-open-${props.type}`,
        beforeClose: `content-before-close-${props.type}`,
      }}
      overlayClassName={{
        base: 'overlay-base',
        afterOpen: 'overlay-after-open',
        beforeClose: 'overlay-before-close',
      }}
      onRequestClose={props.onCancelHandler}
    >
      <form onSubmit={props.onSubmitHandler}>
        <Header warning={props.warning}>{props.title}</Header>
        <Body>
          <Rows padding={15}>{children}</Rows>
        </Body>
        <Footer>{buttons}</Footer>
      </form>
    </ReactModal>
  )
}

export default ModalWrapper

// export const withModal = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
//   return function withLayoutComponent(props: T): JSX.Element {
//     return (
//       <ModalWrapper>
//         <Component {...props} />
//       </ModalWrapper>
//     )
//   }
// }
