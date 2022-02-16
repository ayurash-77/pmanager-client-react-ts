import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import styled from 'styled-components'
import { appColors } from '../app/App.colors'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Container = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  background-color: ${appColors.header.BG};
`

export const Footer: FC<Props> = props => {
  return (
    <>
      <Container>FOOTER</Container>
    </>
  )
}

export default Footer
