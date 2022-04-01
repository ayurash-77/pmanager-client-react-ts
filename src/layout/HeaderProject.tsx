import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import { useTranslate } from '../hooks/useTranslate'
import * as ToolbarIcons from '../assets/icons/toolbar-icons'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { setThemeMode } from '../store/reducers/ui.reducer'
import { ToolButton, ToolButtonGroup, FlexRow } from '../components/ui'
import { setSearchFilter } from '../store/reducers/projects.reducer'
import {
  InfoAgency,
  InfoBrand,
  InfoClient,
  InfoDeadline,
  InfoGrid,
  InfoOwner,
  InfoProgress,
  InfoProjectTitle,
  InfoStartAt,
  InfoStatus,
} from '../components/info-elements'
import Image from '../components/ui/Image'
import { Clapper } from '../assets/thumbnails/thumbnails'
import { apiBaseUrl } from '../constants/env'
import * as s from '../components/info-elements/InfoGrid'
import { Grid } from '../components/ui'
import Loader from '../components/ui/Loader'
import { IProject } from '../interfaces/IProject'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  sidebarShow: boolean
}

interface IHeaderProject extends Props {
  project: IProject
  onClick: () => void
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

export const HeaderProject: FC<IHeaderProject> = ({ project, ...props }) => {
  const { darkMode } = useAppSelector(state => state.ui.theme)
  const { language, setLanguage } = useTranslate()

  const dispatch = useAppDispatch()

  const onSearchHandler = (value: string) => {
    dispatch(setSearchFilter(value))
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
              <ToolButton icon={<ToolbarIcons.Info />} selected={props.sidebarShow} onClick={props.onClick} />
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
            <InfoGrid>
              <InfoBrand brand={project?.brand} />
              <InfoClient client={project?.client} />
              <InfoAgency agency={project?.agency} />
              <InfoOwner owner={project?.owner} />
            </InfoGrid>
            <s.InfoGrid>
              <InfoStartAt startAt={project?.startAt} />
              <InfoDeadline deadline={project?.deadline} />
              <InfoStatus status={project?.status} />
              <InfoProgress progress={project?.progress} status={project?.status} withLabel withValue />
            </s.InfoGrid>
          </Grid>
        </div>
      </div>
    </Container>
  )
}
