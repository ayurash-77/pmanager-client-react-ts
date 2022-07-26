import { IReel } from 'entities/reels/reels.interfaces'
import { IReelsType } from 'entities/reelsTypes/reelsTypes.interfaces'
import { IAgency } from '../agencies/agencies.interfaces'
import { IBrand } from '../brainds/brands.interfaces'
import { IBrief } from '../briefs/briefs.interfaces'
import { IClient } from '../clients/clients.interfaces'
import { IPost } from '../posts/posts.interfaces'
import { IShot } from '../shots/shots.interfaces'
import { IStatus } from '../statuses/statuses.interfaces'
import { IUser } from '../users/users.interfaces'

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
