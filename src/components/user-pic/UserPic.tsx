import styled from 'styled-components'
import Image from '../ui/Image'
import { UserThumbnail } from '../../assets/thumbnails/thumbnails'
import { IUser } from '../../interfaces/IUser'
import { apiBaseUrl } from '../../constants/env'

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
  user: IUser
}

export const UserPic = ({ user }: IUserPic) => {
  const imageSrc = `${apiBaseUrl}/${user?.image}`
  return (
    <Container>
      {user && <Image src={imageSrc} alt={user.name} fallback={<UserThumbnail />} width={64} />}
    </Container>
  )
}
