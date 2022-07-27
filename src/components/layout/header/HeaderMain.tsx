import { FC } from 'react'
import * as CommonIcons from '../../../assets/icons/common-icons'
import * as ToolbarIcons from '../../../assets/icons/toolbar-icons'
import { useGetProjectsQuery } from '../../../entities/projects/projects.api'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { usePermissions } from '../../../hooks/usePermissions'
import { useTranslate } from '../../../hooks/useTranslate'
import { setDeleteProjectModalShow, setNewProjectModalShow } from '../../../store/reducers/modals.reducer'
import {
  setFilterbarShow,
  setProjectsViewMode,
  setSearchProjectsFilter,
  setSidebarShow,
  setThemeMode,
} from '../../../store/reducers/ui.reducer'
import { IQuarterItem } from '../../../utils/quarter-filter'
import { FlexRow, IconButton, Input, Loader, ToolButton, ToolButtonGroup } from '../../ui'
import css from './HeaderMain.module.scss'

// HeaderMain

export const HeaderMain: FC = () => {
  const { darkMode } = useAppSelector(state => state.ui.theme)
  const { show: sidebarShow } = useAppSelector(state => state.ui.sidebar)

  const { language, setLanguage } = useTranslate()
  const { text } = useTranslate()

  const { data: projects = [], isLoading: isLoadingProjects } = useGetProjectsQuery()
  const { quarterFilter, quarterData } = useAppSelector(state => state.projects)
  const { activeProjectId } = useAppSelector(state => state.entities)
  const { filterBar, projectsViewMode } = useAppSelector(state => state.ui)

  const { canCreateProject, canDeleteProject } = usePermissions()

  const dispatch = useAppDispatch()

  const item: IQuarterItem = quarterData.find(project => project.quarter === quarterFilter.quarter)
  const projectsCount = quarterFilter.isActive ? item.count : projects.length

  const onSearchHandler = (value: string) => {
    dispatch(setSearchProjectsFilter(value))
  }

  return (
    <div className={css.container}>
      <div className={css.title}>
        {text.project.projects}: {isLoadingProjects ? <Loader size={16} /> : projectsCount}
        {canCreateProject && (
          <IconButton
            icon={<CommonIcons.Plus />}
            ml={10}
            mr={5}
            onClick={() => canCreateProject && dispatch(setNewProjectModalShow(true))}
          />
        )}
        {canDeleteProject && (
          <IconButton
            icon={<CommonIcons.Trash />}
            disabled={!activeProjectId}
            variant={'accent'}
            size={14}
            onClick={() => activeProjectId && canDeleteProject && dispatch(setDeleteProjectModalShow(true))}
          />
        )}
      </div>

      <FlexRow align={'right'}>
        <Input
          width={'120px'}
          onChange={e => onSearchHandler(e.target.value)}
          autoFocus={true}
          placeholder={text.app.liveSearch}
        />
        <ToolButtonGroup>
          <ToolButton
            icon={<ToolbarIcons.Grid />}
            selected={projectsViewMode === 'grid'}
            onClick={() => dispatch(setProjectsViewMode('grid'))}
          />
          <ToolButton
            icon={<ToolbarIcons.List />}
            selected={projectsViewMode === 'list'}
            onClick={() => dispatch(setProjectsViewMode('list'))}
          />
          <ToolButton
            icon={<ToolbarIcons.Eye />}
            selected={filterBar.show}
            onClick={() => dispatch(setFilterbarShow(!filterBar.show))}
          />
        </ToolButtonGroup>
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
  )
}
