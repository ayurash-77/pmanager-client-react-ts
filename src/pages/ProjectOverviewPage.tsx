import { FC } from 'react'

import styled from 'styled-components'
import { useParams } from 'react-router'

const ContainerGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fill, 160px);
  justify-content: space-evenly;
`

const ProjectOverviewPage: FC = () => {
  const { id } = useParams()

  ////////////////////////////////////////////////////////////////////////

  return <>PROJECT {id} OVERVIEW PAGE</>
}

export default ProjectOverviewPage
