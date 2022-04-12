import { IPost } from '../../interfaces/IPost'
import styled from 'styled-components'
import { UserPic } from '../user-pic/UserPic'
import { FC } from 'react'
import { InfoDateTime } from '../info-elements'
import { EntityIcon } from '../entity-card/EntityIcon'
import { setActiveMenu } from '../../store/reducers/ui.reducer'
import { setActiveReelId, setActiveShotId } from '../../store/reducers/entities.reducer'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useNavigate } from 'react-router-dom'
import cn from 'classnames'

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
  padding: 4px 10px;
  //min-height: 20px;
  background: var(--post-header-bg);
`

const PostMessage = styled.div`
  padding: 10px;
  background: #414acb;
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: var(--post-message-bg);

  .message {
    white-space: pre-wrap;
  }
`

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px 8px;

  .tag {
    display: flex;
    max-width: max-content;
    align-items: center;
    gap: 5px;
    font-family: var(--ff-button);
    font-size: var(--fs-small3);
    font-weight: 500;
    cursor: pointer;
    background-color: var(--post-header-bg);
    padding: 2px 7px;
    border-radius: 50px;
    opacity: 0.9;
    color: var(--ribbon-reel-fg);
    &.shot {
      color: var(--ribbon-shot-fg);
    }
    &:hover {
      opacity: 1;
    }
  }
`

const Username = styled.div`
  color: var(--user-email);
  cursor: pointer;
`

export const Post: FC<IPost> = ({ children, createdBy, createdAt, reel, ...props }) => {
  const { activeProjectId } = useAppSelector(state => state.projects)
  const fullName = `${createdBy.name} ${createdBy.surname}`
  const printName = fullName.trim().length > 0 ? fullName : createdBy.username
  const infoReel = reel && <EntityIcon variant={'reel'} />
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onReelClickHandler = reelId => {
    dispatch(setActiveMenu('reels'))
    dispatch(setActiveReelId(reelId))
    navigate(`/project/${activeProjectId}/reels/${reelId}`)
  }

  const onShotClickHandler = shotId => {
    dispatch(setActiveMenu('shots'))
    dispatch(setActiveShotId(shotId))
    navigate(`/project/${activeProjectId}/shots/${shotId}`)
  }

  return (
    <>
      <Container>
        <UserPic src={'userPicSrc'} name={'UserName'} />
        <PostBlock>
          <PostHeader>
            <Username>{printName}</Username>
            <InfoDateTime dateTime={createdAt} />
          </PostHeader>
          <PostMessage>
            <div className={'message'}>{children}</div>
            <Tags>
              {reel && (
                <>
                  <div className={'tag'} onClick={() => onReelClickHandler(reel.id)}>
                    {reel.code}
                  </div>
                  {reel.shots?.map(shot => (
                    <div
                      key={shot.id}
                      className={cn('tag', 'shot')}
                      onClick={() => onReelClickHandler(shot.id)}
                    >
                      {shot.code}
                    </div>
                  ))}
                </>
              )}
            </Tags>
          </PostMessage>
        </PostBlock>
      </Container>
    </>
  )
}
