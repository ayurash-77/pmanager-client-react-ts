import { ModalWrapper } from './ModalWrapper'
import { FC, useState } from 'react'
import { useTranslate } from '../hooks/useTranslate'
import { Grid, Rows } from '../components/ui/Containers'

interface IMessageModal {
  isOpen: boolean
  closeAction: () => void
  message: string
  zIndex?: 1000 | 1100 | 1200
}

export const MessageModal: FC<IMessageModal> = ({ zIndex = 1000, ...props }) => {
  const { text } = useTranslate()

  const [message, setMessage] = useState(null)

  const onCancelHandler = async e => {
    e.preventDefault()
    props.closeAction()
  }

  const onSubmitHandler = async e => {
    e.preventDefault()
    props.closeAction()
  }

  ////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <ModalWrapper
        {...props}
        header={false}
        footer={false}
        zIndex={zIndex}
        warning={false}
        type={'type1'}
        size={'sm'}
        title={text.actions.createProject}
        onSubmitHandler={onSubmitHandler}
        onCancelHandler={onCancelHandler}
      >
        <Grid cols="auto" gap={5}>
          <Rows vAlign="center" padding={5}>
            {message}
          </Rows>
        </Grid>
      </ModalWrapper>
    </>
  )
}

export default MessageModal
