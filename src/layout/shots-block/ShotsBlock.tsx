import styled from 'styled-components'
import { SidebarBlockTitle } from '../sidebar/Sidebar.styles'
import { IconButton } from '../../components/ui'
import * as CommonIcons from '../../assets/icons/common-icons'
import { EntityCardShot } from '../../components/entity-card/EntityCardShot'
import { IShot } from '../../interfaces/IShot'
import { FC, useState } from 'react'
import NewShotModal from '../../modal/NewShotModal'
import { IProject } from '../../interfaces/IProject'
import { setActiveShotId } from '../../store/reducers/entities.reducer'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  //gap: 10px;
`

const ShotsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  //justify-content: space-evenly;
  border: solid 1px var(--timeline-border);
  background: var(--timeline-bg);
  border-radius: 5px;
  padding: 10px;
`

const DraggableItem = styled.div`
  cursor: grab;
`

interface IShotsBlock {
  project: IProject
  shots: IShot[]
  onDragStartHandler: (e, shot) => void
  removeShotHandler?: (e) => void
}

export const ShotsBlock: FC<IShotsBlock> = ({ project, shots, removeShotHandler, onDragStartHandler }) => {
  const [isNewShotModalShow, setNewShotModalShow] = useState(false)

  const { activeShotId } = useAppSelector(state => state.entities)
  const dispatch = useAppDispatch()

  return (
    <>
      <NewShotModal
        isOpen={isNewShotModalShow}
        closeAction={() => setNewShotModalShow(false)}
        project={project}
        shots={shots}
      />
      <Container>
        <SidebarBlockTitle>
          Shots bin:
          <IconButton icon={<CommonIcons.Plus />} ml={10} onClick={() => setNewShotModalShow(true)} />
        </SidebarBlockTitle>
        <ShotsContainer onDragOver={e => e.preventDefault()} onDrop={e => removeShotHandler(e)}>
          {shots?.map(shot => (
            <DraggableItem
              onClick={() => dispatch(setActiveShotId(activeShotId === shot.id ? null : shot.id))}
              key={shot.id}
              draggable={true}
              onDragStart={e => onDragStartHandler(e, shot)}
            >
              <EntityCardShot
                entity={shot}
                isSelected={activeShotId === shot.id}
                disabled={shot.reels?.length === 0}
              />
            </DraggableItem>
          ))}
        </ShotsContainer>
      </Container>
    </>
  )
}
