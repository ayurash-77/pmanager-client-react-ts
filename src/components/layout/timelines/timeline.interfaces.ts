import { ReactNode } from 'react'
import { IReel } from '../../../entities/reels/reels.interfaces'

export interface ITimeline {
  reelInit: IReel
  children?: ReactNode
}
