import styled from 'styled-components'
import cn from 'classnames'
import { entityVariantType } from '../../types/entityVariantType'
import { InfoProgress } from '../info-elements'

const Container = styled.div`
  min-width: 80px;
  height: 60px;
  border-radius: var(--rad);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const Thumbnail = styled.div`
  height: 45px;
  background: var(--entity-card-bg);
`
const Footer = styled.div`
  height: 14px;
  color: var(--entity-footer-fg);
  &.reel {
    background: var(--reel-card-bg);
  }

  &.seq {
    background: var(--seq-card-bg);
  }

  &.shot {
    background: var(--shot-card-bg);
  }
`

interface IEntityCard {
  title?: string
  variant: entityVariantType
}

export const EntityCard = ({ variant }: IEntityCard) => {
  const status = {
    id: 1,
    name: 'Active',
    code: 1,
    details: 'В работе',
  }
  return (
    <>
      <Container>
        <Thumbnail />
        <InfoProgress progress={60} status={status} height={2} withValue={false} m={1} />
        <Footer className={cn(variant)} />
      </Container>
    </>
  )
}
