import { IUser } from './IUser'
import { IStatus } from './IStatus'
import { IBrand } from './IBrand'
import { IAgency } from './IAgency'
import { IClient } from './IClient'
import { IBrief } from './IBrief'
import { IReel } from './IReel'
import { IReelsType } from './IReelsType'
import { IPost } from './IPost'
import { IShot } from './IShot'

export interface IProject {
  id: number
  title: string
  homeDir: string
  createdAt: Date
  updatedAt: Date
  progress: number
  highPriority: boolean
  status: IStatus
  brand?: IBrand
  briefs?: IBrief[]
  client?: IClient
  agency?: IAgency
  startAt?: any
  deadline?: any
  doneAt?: any
  details?: string
  sequences?: IReel[]
  team?: IUser[]
  owner: IUser
  reelsTypes?: IReelsType[]
  reels?: IReel[]
  shots?: IShot[]
  posts?: IPost[]
}
