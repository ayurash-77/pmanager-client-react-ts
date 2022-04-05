import { FC } from 'react'
import { useTranslate } from '../../hooks/useTranslate'
import { InfoLabel } from './InfoLabel'
import { InfoValue } from './InfoValue'
import { IShot } from '../../interfaces/IShot'
import { InfoProjectTitleContainer } from './InfoProjectTitle'
import { InfoGrid } from './InfoGrid'
import { InfoProgress } from './InfoProgress'
import { Clapper } from '../../assets/thumbnails/thumbnails'
import { Image } from '../ui'
import styled from 'styled-components'

interface IInfoShotBlock extends Partial<IShot> {}

const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: space-evenly;
  .reel {
    color: var(--reel-card-icon-fg);
    &:after {
      color: var(--text-low);
      content: ', ';
    }
    &:last-child {
      &:after {
        content: '';
      }
    }
  }
  .image {
    background: var(--entity-card-bg);
    overflow: hidden;
    border-radius: 6px;
    width: 320px;
    height: 180px;
  }
`

export const InfoShotBlock: FC<IInfoShotBlock> = ({ code, name, duration, progress, status, reels }) => {
  const { text } = useTranslate()
  const durationStr = duration ? duration + ' frames' : '---'
  const title = name ? `${code} (${name})` : code
  const reelsJsx =
    reels.length > 0
      ? //
        reels.map(reel => (
          <span key={reel.id} className={'reel'}>
            {reel.code}
          </span>
        ))
      : '---'
  return (
    <>
      <InfoContainer>
        <InfoProjectTitleContainer>{title}</InfoProjectTitleContainer>
        <div className={'image'}>
          {<Image src={'/sampleImage.jpg'} alt={'image'} fallback={<Clapper />} width={320} />}
        </div>

        <InfoGrid>
          <InfoLabel>{text.common.duration}</InfoLabel>
          <InfoValue>{durationStr}</InfoValue>
          <InfoLabel>{text.common.status}</InfoLabel>
          <InfoValue>{status?.name || '---'}</InfoValue>

          <InfoLabel>{text.common.usedIn}</InfoLabel>
          <InfoValue>{reelsJsx}</InfoValue>
          <InfoProgress progress={progress} status={status} withLabel withValue />
        </InfoGrid>
      </InfoContainer>
    </>
  )
}
