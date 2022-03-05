import { IUser } from './IUser'
import { IStatus } from './IStatus'
import { IBrand } from './IBrand'
import { IAgency } from './IAgency'
import { IClient } from './IClient'
import { IBrief } from './IBrief'
import { ISequence } from './ISequence'

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
  sequences?: ISequence[]
  team?: IUser[]
  owner: IUser
}
