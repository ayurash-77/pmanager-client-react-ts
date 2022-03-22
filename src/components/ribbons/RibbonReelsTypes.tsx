import { useTranslate } from '../../hooks/useTranslate'
import { IReelsType } from '../../interfaces/IReelsType'
import { EntityCardReelsType } from '../entity-card/EntityCardReelsType'
import { RibbonWrapper } from './RibbonWrapper'

export const RibbonReelsTypes = ({ entities }: { entities: IReelsType[] }) => {
  const { text } = useTranslate()
  const count = entities?.length
  return (
    <RibbonWrapper variant={'reelsType'} title={text.project.reelsTypes} count={count}>
      {entities?.map(entity => (
        <EntityCardReelsType key={entity.id} entity={entity} />
      ))}
    </RibbonWrapper>
  )
}
