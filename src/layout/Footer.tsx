import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import styled from 'styled-components'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Container = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  background-color: var(--bg-header);
`

export const Footer: FC<Props> = props => {
  return (
    <>
      <Container>FOOTER</Container>
    </>
  )
}

export default Footer
