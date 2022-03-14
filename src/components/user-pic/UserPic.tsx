import styled from 'styled-components'
import Image from '../ui/Image'
import { UserThumbnail } from '../../assets/thumbnails/thumbnails'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  min-width: 64px;
  height: 64px;
  min-height: 64px;
  border-radius: var(--rad);
  overflow: hidden;
  background: var(--pc-dummy-bg);
  color: var(--user-pic-fg);
  cursor: pointer;
`

interface IUserPic {
  src: string
  name: string
}

export const UserPic = ({ src, name }: IUserPic) => {
  return (
    <Container>
      {/* <div> */}
      <Image src={src} alt={name} fallback={<UserThumbnail />} width={64} />
      {/* </div> */}
    </Container>
  )
}
