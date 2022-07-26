import { skipToken } from '@reduxjs/toolkit/query'
import cn from 'classnames'
import { useUpdateReelMutation } from 'entities/reels/reels.api'
import { IReel } from 'entities/reels/reels.interfaces'
import { useGetShotsQuery } from 'entities/shots/shots.api'
import { FC, useState } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'
import { setActiveShotId } from 'store/reducers/entities.reducer'
import { useAppDispatch } from 'hooks/redux'
import { useTranslate } from 'hooks/useTranslate'
import ModalWrapper from 'components/modal/ModalWrapper'
import { FlexColumn } from 'components/ui'
import { ShotCard } from './ShotCard'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  justify-content: center;

  .itemContainer {
    padding: 1px;
    border-radius: 6px;
    border: 2px solid transparent;
    background: #00000010;

    &.selected {
      border: 2px solid var(--timeline-border-active);
    }
  }
`

interface IAddShotToReelModal {
  isOpen: boolean
  reel: IReel
  closeAction: () => void
}

export const AddShotToReelModal: FC<IAddShotToReelModal> = props => {
  const { reel, closeAction, ...rest } = props

  const dispatch = useAppDispatch()
  const { text } = useTranslate()

  const { id } = useParams()
  const { data: shots = [], isSuccess: isSuccessShots } = useGetShotsQuery(+id ?? skipToken)
  const [updateReel, { isSuccess: isSuccessUpdateReel }] = useUpdateReelMutation()

  const [selectedShotsIds, setSelectedShotsIds] = useState([])

  const onShotClickHandler = shotId => {
    if (selectedShotsIds.includes(shotId)) {
      setSelectedShotsIds(selectedShotsIds.filter(id => id !== shotId))
    } else setSelectedShotsIds([...selectedShotsIds, shotId])
  }

  const onSubmitHandler = async e => {
    e.preventDefault()
    const selectedShots = shots.filter(shot => selectedShotsIds.includes(shot.id))
    const newShots = [...reel.shots, ...selectedShots]
    const newShotsIds = [...reel.shotsIds, ...selectedShotsIds]
    await updateReel({ ...reel, shots: newShots, shotsIds: newShotsIds })

    closeAction()
    dispatch(setActiveShotId(null))
    setSelectedShotsIds([])
  }

  const onCancelHandler = e => {
    e.preventDefault()
    closeAction()
    setSelectedShotsIds([])
  }

  const shotsNotInReel = shots.filter(shot => !reel.shotsIds.includes(shot.id))

  ////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <ModalWrapper
      {...rest}
      warning={false}
      type={'type2'}
      size={'md'}
      title={text.actions.addShotToReel}
      onSubmitHandler={onSubmitHandler}
      onCancelHandler={onCancelHandler}
    >
      <FlexColumn vAlign="center">
        <Container>
          {shotsNotInReel?.map(shot => {
            const isSelected = selectedShotsIds.includes(shot.id)
            return (
              <div className={cn('itemContainer', { selected: isSelected })} key={shot.id}>
                <ShotCard
                  entity={shot}
                  isSelected={isSelected}
                  disabled={shot.reels?.length === 0}
                  onClick={() => onShotClickHandler(shot.id)}
                />
              </div>
            )
          })}
        </Container>
      </FlexColumn>
    </ModalWrapper>
  )
}
