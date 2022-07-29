import { FC, useState } from 'react'
import { CommonIcons } from '../../../../assets/icons/common-icons'
import { IProject } from '../../../../entities/projects/projects.interfaces'
import NewShotModal from '../../../../entities/shots/NewShotModal'
import { ShotCard } from '../../../../entities/shots/ShotCard'
import { IShot } from '../../../../entities/shots/shots.interfaces'
import { useOnShotClick } from '../../../../entities/shots/useOnShotClick'
import { useAppSelector } from '../../../../hooks/redux'
import { useDeleteShot } from '../../../../hooks/useDeleteShot'
import { useTranslate } from '../../../../hooks/useTranslate'
import { InfoShotBlock } from '../../../info-elements/InfoShotBlock'
import DeleteModal from '../../../modal/DeleteModal'
import { IconButton, Loader } from '../../../ui'
import { SidebarBlockHeader } from '../sidebar-block-header/SidebarBlockHeader'
import css from './SidebarShots.module.scss'

interface IShotsBlock {
  project: IProject
  shots: IShot[]
  isLoadingShots?: boolean
}

////////////////////////////////////////////////////////////////////////
// ShotsBlock
////////////////////////////////////////////////////////////////////////

export const SidebarShots: FC<IShotsBlock> = props => {
  const { project, shots, isLoadingShots } = props
  const { text } = useTranslate()
  const { onShotClickHandler } = useOnShotClick()

  const [isNewShotModalShow, setNewShotModalShow] = useState(false)

  const { activeShotId } = useAppSelector(state => state.entities)
  // const { data: reels } = useGetReelsQuery(activeProjectId ?? skipToken)

  const activeShot = shots?.find(shot => shot.id === activeShotId) || null

  const {
    isDeleteModalShow,
    setDeleteModalShow,
    canDeleteItem,
    cancelDeleteShotHandler,
    deleteShotHandler,
    error,
    title,
  } = useDeleteShot(project, activeShot)

  ////////////////////////////////////////////////////////////////////////

  return (
    <>
      <NewShotModal
        isOpen={isNewShotModalShow}
        closeAction={() => setNewShotModalShow(false)}
        project={project}
        shots={shots}
      />
      <DeleteModal
        isOpen={isDeleteModalShow}
        closeAction={cancelDeleteShotHandler}
        deleteItem={activeShot}
        deleteAction={deleteShotHandler}
        error={error}
        detailsJsx={activeShot && <InfoShotBlock {...activeShot} />}
        title={title}
      />
      <div className={'flex flex-col'}>
        <SidebarBlockHeader title={text.project.shots}>
          <div className={'flex gap-1'}>
            {canDeleteItem && (
              <IconButton
                icon={CommonIcons.trash()}
                disabled={!activeShot}
                variant={'accent'}
                onClick={activeShot ? () => setDeleteModalShow(true) : null}
              />
            )}
            <IconButton icon={CommonIcons.plus()} onClick={() => setNewShotModalShow(true)} />
          </div>
        </SidebarBlockHeader>

        <div className={css.container}>
          {isLoadingShots && <Loader size={32} />}
          {shots?.map(shot => (
            <ShotCard
              key={shot.id}
              entity={shot}
              isSelected={activeShotId === shot.id}
              disabled={shot.reels?.length === 0}
              onClick={e => onShotClickHandler(e, shot.id)}
            />
          ))}
        </div>
      </div>
    </>
  )
}
