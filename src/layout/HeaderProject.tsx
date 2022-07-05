import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import { useTranslate } from '../hooks/useTranslate'
import * as ToolbarIcons from '../assets/icons/toolbar-icons'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { setSidebarShow, setThemeMode } from '../store/reducers/ui.reducer'
import { ToolButton, ToolButtonGroup, FlexRow } from '../components/ui'
import { setSearchProjectsFilter } from '../store/reducers/ui.reducer'
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
} from '../components/info-elements'
import { Image } from '../components/ui'
import { Clapper } from '../assets/thumbnails/thumbnails'
import { apiBaseUrl } from '../constants/env'
import { Grid } from '../components/ui'
import Loader from '../components/ui/Loader'
import { IProject } from '../interfaces/IProject'
import { useGetUserByIdQuery } from '../store/api/users.api'

interface IHeaderProject extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  project: IProject
}

const Container = styled.div`
  padding: 8px 10px;
  z-index: 3;
  box-shadow: 0 0 4px var(--button-shadow);

  width: 100%;
  display: flex;
  background-color: var(--header-bg);

  .imageContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160px;
    min-width: 160px;
    height: 100px;
    border-radius: 4px;
    color: var(--pc-dummy-fg);
    background: var(--pc-dummy-bg);
    box-shadow: 0 1px 3px #00000040;
    overflow: hidden;
  }

  .content {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .topRow {
    display: grid;
    grid-template-columns: auto max-content;
    justify-content: space-between;
  }

  .bottomRow {
    display: flex;
    align-items: flex-end;
    width: 100%;
    height: 100%;
  }

  .titleContainer {
    font-size: var(--fs-big1);
    text-transform: capitalize;
    text-overflow: ellipsis;
    //white-space: nowrap;
    overflow: hidden;

    font-weight: 500;
    display: flex;
    justify-content: flex-start;

    text-wrap: none;
  }
`

export const HeaderProject: FC<IHeaderProject> = ({ project }) => {
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
    <Container>
      <div className={'imageContainer'}>
        {project ? (
          <Image src={imageSrc} alt={project?.title} fallback={<Clapper />} width={240} />
        ) : (
          <Loader size={48} />
        )}
      </div>

      <div className={'content'}>
        <div className={'topRow'}>
          <div className={'titleContainer'}>
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
        <div className={'bottomRow'}>
          <Grid cols={'auto 1fr'} width={'100%'} align={'left'}>
            <div className={'grid info'}>
              <InfoBrand brand={project?.brand} />
              <InfoClient client={project?.client} />
              <InfoAgency agency={project?.agency} />
              <InfoOwner owner={owner} />
            </div>
            <div className={'grid info'}>
              <InfoStartAt startAt={project?.startAt} />
              <InfoDeadline deadline={project?.deadline} />
              <InfoStatus status={project?.status} />
              <InfoProgress progress={project?.progress} status={project?.status} withLabel withValue />
            </div>
          </Grid>
        </div>
      </div>
    </Container>
  )
}
