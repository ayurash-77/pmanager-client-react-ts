import { FC } from 'react'
import { useTranslate } from '../../hooks/useTranslate'
import { InfoLabel } from './InfoLabel'
import { InfoValue } from './InfoValue'
import { InfoProjectTitleContainer } from './InfoProjectTitle'
import { InfoGrid } from './InfoGrid'
import { InfoProgress } from './InfoProgress'
import styled from 'styled-components'
import { IReelsType } from '../../interfaces/IReelsType'

interface IInfoReelsTypeBlock extends Partial<IReelsType> {}

const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
  .reel {
    //color: var(--reel-card-icon-fg);
    color: var(--ribbon-reelsType-fg);
    &:after {
      color: var(--text-low);
      content: ', ';
    }
    .shot {
      color: var(--text-mid);
      &:after {
        color: var(--text-low);
        content: ', ';
      }
      &:first-child {
        &:before {
          content: ' (';
        }
      }
      &:last-child {
        &:after {
          content: ')';
        }
      }
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

export const InfoReelsTypeBlock: FC<IInfoReelsTypeBlock> = ({
  code,
  name,
  status,
  progress,
  reels,
  shots,
}) => {
  const { text } = useTranslate()
  const title = name ? `${code} (${name})` : code
  const reelsJsx = reels?.length > 0 && (
    <>
      <h4 className={'warning'}>{'These reels will also be deleted:'}</h4>
      <InfoValue>
        {reels?.map(reel => (
          <span key={reel.id} className={'reel'}>
            {reel.code}
            {reel.shots?.map(shot => (
              <span key={shot.id} className={'shot'}>
                {shot.code}
              </span>
            ))}
          </span>
        ))}
      </InfoValue>
    </>
  )
  return (
    <>
      <InfoContainer>
        <InfoProjectTitleContainer>{title}</InfoProjectTitleContainer>

        <InfoGrid>
          <InfoLabel>{text.common.status}</InfoLabel>
          <InfoValue>{status?.name || '---'}</InfoValue>
          {/* <InfoLabel>{text.project.reels}</InfoLabel> */}
          {/* <InfoValue>{reelsJsx}</InfoValue> */}
          <InfoProgress progress={progress} status={status} withLabel withValue />
        </InfoGrid>

        {reelsJsx}
      </InfoContainer>
    </>
  )
}
