import { FC } from 'react'
import styled from 'styled-components'
import { UserThumbnail } from '../../assets/thumbnails/thumbnails'
import { apiBaseUrl } from '../../constants/env'
import { IUser } from '../../interfaces/IUser'
import { Image } from '../ui'

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

export const UserPic: FC<IUserPic> = ({ user }) => {
  const imageSrc = `${apiBaseUrl}/${user?.image}`
  return (
    <Container>
      {user && <Image src={imageSrc} alt={user.name} fallback={<UserThumbnail />} width={64} />}
    </Container>
  )
}
