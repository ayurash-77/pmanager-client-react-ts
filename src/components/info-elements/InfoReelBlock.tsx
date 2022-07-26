import { IReel } from 'entities/reels/reels.interfaces'
import { FC } from 'react'
import styled from 'styled-components'
import { useTranslate } from 'hooks/useTranslate'
import { InfoLabel } from './InfoLabel'
import { InfoProgress } from './InfoProgress'
import { InfoProjectTitleContainer } from './InfoProjectTitle'
import { InfoValue } from './InfoValue'

interface IInfoReelBlock extends Partial<IReel> {}

const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;

  .shot {
    //color: var(--reel-card-icon-fg);
    color: var(--text-mid);

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

  .warning {
    color: var(--accent);
    text-transform: uppercase;
  }

  .image {
    background: var(--entity-card-bg);
    overflow: hidden;
    border-radius: 6px;
    width: 320px;
    height: 180px;
  }
`

export const InfoReelBlock: FC<IInfoReelBlock> = ({ code, name, duration, progress, status, shots }) => {
  const { text } = useTranslate()
  const durationStr = duration ? duration + ' frames' : '---'
  const title = name ? `${code} (${name})` : code
  const shotsJsx = shots.length > 0 && (
    // <>
    //   <h4 className={'warning'}>{'These shots will also be deleted:'}</h4>
    //   <InfoValue>
    //     {shots.map(shot => (
    //       <span key={shot.id} className={'shot'}>
    //         {shot.code}
    //       </span>
    //     ))}
    //   </InfoValue>
    // </>
    <>
      {shots.map(shot => (
        <span key={shot.id} className={'shot'}>
          {shot.code}
        </span>
      ))}
    </>
  )
  return (
    <>
      <InfoContainer>
        <InfoProjectTitleContainer>{title}</InfoProjectTitleContainer>

        <div className={'grid grid-cols-2'}>
          <InfoLabel>{text.common.duration}</InfoLabel>
          <InfoValue>{durationStr}</InfoValue>
          <InfoLabel>{text.common.status}</InfoLabel>
          <InfoValue>{status?.name || '---'}</InfoValue>
          <InfoLabel>{text.project.shots}</InfoLabel>
          <InfoValue>{shotsJsx}</InfoValue>
          <InfoProgress progress={progress} status={status} withLabel withValue />
        </div>

        {/* {shotsJsx} */}
      </InfoContainer>
    </>
  )
}
