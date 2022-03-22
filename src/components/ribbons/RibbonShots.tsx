import { useTranslate } from '../../hooks/useTranslate'
import { IReelsType } from '../../interfaces/IReelsType'
import { EntityCardReelsType } from '../entity-card/EntityCardReelsType'
import { RibbonWrapper } from './RibbonWrapper'
import { IReel } from '../../interfaces/IReel'
import { EntityCardReel } from '../entity-card/EntityCardReel'
import { IShot } from '../../interfaces/IShot'
import { EntityCardShot } from '../entity-card/EntityCardShot'

export const RibbonShots = ({ entities }: { entities: IShot[] }) => {
  const { text } = useTranslate()
  const count = entities?.length
  return (
    <RibbonWrapper variant={'shot'} title={text.project.shots} count={count}>
      {entities?.map(entity => (
        <EntityCardShot key={entity.id} entity={entity} />
      ))}
    </RibbonWrapper>
  )
}
