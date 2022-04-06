import { EntityCardWrapper } from './EntityCardWrapper'
import { IShot } from '../../interfaces/IShot'
import { DetailedHTMLProps, HTMLAttributes } from 'react'
import cn from 'classnames'
import { InfoProgress } from '../info-elements'
import { EntityCardContainer } from './EntityCard.styles'
import styled from 'styled-components'

const Container = styled.div`
  transition: 200ms;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  height: 60px;
  border-radius: var(--rad);
  overflow: hidden;
  border: dashed 2px var(--entity-card-bg);
  //opacity: 0.7;
  user-select: none;
  cursor: default;
  &:hover {
    opacity: 1;
    border: dashed 2px var(--timeline-reel-border);
    //box-shadow: 0 0 8px var(--timeline-reel-border);
  }
`

export const EntityCardDummy = () => {
  return <Container />
}
