import { skipToken } from '@reduxjs/toolkit/query'
import { FC } from 'react'
import * as ToolbarIcons from '../../../assets/icons/toolbar-icons'
import { Clapper } from '../../../assets/thumbnails/thumbnails'
import { apiBaseUrl } from '../../../constants/env'
import { useGetProjectQuery } from '../../../entities/projects/projects.api'
import { useGetUserByIdQuery } from '../../../entities/users/users.api'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { useTranslate } from '../../../hooks/useTranslate'
import { setSearchProjectsFilter, setSidebarShow, setThemeMode } from '../../../store/reducers/ui.reducer'
import {
  InfoAgency,
  InfoBrand,
  InfoClient,
  InfoDeadline,
  InfoOwner,
  InfoProgress,
  InfoProjectTitle,
  InfoStartAt,
  InfoStatus,
} from '../../info-elements'
import { FlexRow, Grid, Image, Loader, ToolButton, ToolButtonGroup } from '../../ui'
import css from './HeaderProject.module.scss'

export const HeaderProject: FC = () => {
  const { activeProjectId } = useAppSelector(state => state.entities)
  const { data: project } = useGetProjectQuery(activeProjectId ?? skipToken)
  const { darkMode } = useAppSelector(state => state.ui.theme)
  const { show: sidebarShow } = useAppSelector(state => state.ui.sidebar)
  const { language, setLanguage } = useTranslate()

  const { data: owner } = useGetUserByIdQuery(project?.owner.id)

  const dispatch = useAppDispatch()

  const onSearchHandler = (value: string) => {
    dispatch(setSearchProjectsFilter(value))
  }

  const imageSrc = `${apiBaseUrl}/root/${project?.homeDir}/.pmdata/projectThumbnail.jpg`

  return (
    <div className={css.container}>
      <div className={css.imageContainer}>
        {project ? (
          <Image src={imageSrc} alt={project?.title} fallback={<Clapper />} width={240} />
        ) : (
          <Loader size={48} />
        )}
      </div>

      <div className={css.content}>
        <div className={css.topRow}>
          <div className={css.titleContainer}>
            <InfoProjectTitle
              title={project?.title}
              highPriority={project?.highPriority}
              status={project?.status}
            />
          </div>
          <FlexRow align={'right'} vAlign={'flex-start'}>
            {/* <Input */}
            {/*   width={'120px'} */}
            {/*   onChange={e => onSearchHandler(e.target.value)} */}
            {/*   autoFocus={true} */}
            {/*   placeholder={text.app.liveSearch} */}
            {/* /> */}

            <ToolButtonGroup>
              <ToolButton
                icon={<ToolbarIcons.Info />}
                selected={sidebarShow}
                onClick={() => dispatch(setSidebarShow(!sidebarShow))}
              />
            </ToolButtonGroup>
            <ToolButtonGroup>
              <ToolButton
                icon={<ToolbarIcons.Moon />}
                selected={darkMode}
                onClick={() => dispatch(setThemeMode(true))}
              />
              <ToolButton
                icon={<ToolbarIcons.Sun />}
                selected={!darkMode}
                onClick={() => dispatch(setThemeMode(false))}
              />
            </ToolButtonGroup>
            <ToolButtonGroup>
              <ToolButton
                icon={<ToolbarIcons.LangEn />}
                selected={language === 'en'}
                onClick={() => setLanguage('en')}
              />
              <ToolButton
                icon={<ToolbarIcons.LangRu />}
                selected={language === 'ru'}
                onClick={() => setLanguage('ru')}
              />
            </ToolButtonGroup>
          </FlexRow>
        </div>
        <div className={css.bottomRow}>
          <Grid cols={'auto 1fr'} width={'100%'} align={'left'}>
            <div className={'grid grid-cols-2'}>
              <InfoBrand brand={project?.brand} />
              <InfoClient client={project?.client} />
              <InfoAgency agency={project?.agency} />
              <InfoOwner owner={owner} />
            </div>
            <div className={'grid grid-cols-2'}>
              <InfoStartAt startAt={project?.startAt} />
              <InfoDeadline deadline={project?.deadline} />
              <InfoStatus status={project?.status} />
              <InfoProgress progress={project?.progress} status={project?.status} withLabel withValue />
            </div>
          </Grid>
        </div>
      </div>
    </div>
  )
}
