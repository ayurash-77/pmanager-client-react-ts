import { FC, Fragment } from 'react'
import { useTranslate } from '../../hooks/useTranslate'
import { IReelsType } from '../../interfaces/IReelsType'
import { InfoLabel } from './InfoLabel'
import { InfoProgress } from './InfoProgress'
import { InfoProjectTitleContainer } from './InfoProjectTitle'
import css from './InfoReelsTypeBlock.module.scss'
import { InfoValue } from './InfoValue'

interface IInfoReelsTypeBlock extends Partial<IReelsType> {}

export const InfoReelsTypeBlock: FC<IInfoReelsTypeBlock> = ({ code, name, status, progress, reels }) => {
  const { text } = useTranslate()
  const title = name ? `${code} (${name})` : code

  return (
    <>
      <div className={css.container}>
        <InfoProjectTitleContainer>{title}</InfoProjectTitleContainer>

        <div className={css.status}>
          <InfoLabel>{text.common.status}</InfoLabel>
          <InfoValue>{status?.name || '---'}</InfoValue>
          <InfoProgress progress={progress} status={status} withLabel withValue />
        </div>

        {reels?.length > 0 && (
          <div>
            <h4 className={css.warning}>{'These reels will also be deleted:'}</h4>

            <div className={css.content}>
              {reels?.map(reel => (
                <Fragment key={reel.id}>
                  <div key={reel.id} className={css.reel}>
                    {reel.code}
                  </div>
                  <div className={css.shots}>
                    {reel.shots?.map(shot => (
                      <div key={shot.id} className={css.shot}>
                        {shot.code}
                      </div>
                    ))}
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
