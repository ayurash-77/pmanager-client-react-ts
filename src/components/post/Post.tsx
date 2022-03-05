import { IPost } from '../../interfaces/IPost'
import styled from 'styled-components'
import { UserPic } from '../user-pic/UserPic'
import { FC } from 'react'
import { InfoDateTime } from '../info-elements'

const Container = styled.div`
  display: flex;
  gap: 10px;
`

const PostBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: var(--rad);
  overflow: hidden;
`
const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 0 10px;
  min-height: 20px;
  background: var(--post-header-bg);
`

const PostMessage = styled.div`
  padding: 10px;
  background: #414acb;
  display: flex;
  background: var(--post-message-bg);
`

const Username = styled.div`
  color: var(--user-email);
  cursor: pointer;
`

export const Post: FC<IPost> = ({ children, createdBy, createdAt, ...props }) => {
  const fullName = `${createdBy.name} ${createdBy.surname}`
  const printName = fullName.trim().length > 0 ? fullName : createdBy.username
  return (
    <>
      <Container>
        <UserPic src={'userPicSrc'} name={'UserName'} />
        <PostBlock>
          <PostHeader>
            <Username>{printName}</Username>
            <InfoDateTime dateTime={createdAt} />
          </PostHeader>
          <PostMessage>{children}</PostMessage>
        </PostBlock>
      </Container>
    </>
  )
}
