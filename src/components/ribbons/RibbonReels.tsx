import { useTranslate } from '../../hooks/useTranslate'
import { IReelsType } from '../../interfaces/IReelsType'
import { EntityCardReelsType } from '../entity-card/EntityCardReelsType'
import { RibbonWrapper } from './RibbonWrapper'
import { IReel } from '../../interfaces/IReel'
import { EntityCardReel } from '../entity-card/EntityCardReel'

export const RibbonReels = ({ entities }: { entities: IReel[] }) => {
  const { text } = useTranslate()
  const count = entities?.length
  return (
    <RibbonWrapper variant={'reel'} title={text.project.reels} count={count}>
      {entities?.map(entity => (
        <EntityCardReel key={entity.id} entity={entity} />
      ))}
    </RibbonWrapper>
  )
}
