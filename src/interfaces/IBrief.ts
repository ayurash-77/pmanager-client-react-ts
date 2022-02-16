import { IBriefCategory } from './IBriefCategory'
import { IProject } from './IProject'
import { IUser } from './IUser'

export interface IBrief {
  id: number
  name: string
  originalName: string
  approved: boolean
  createdAt: Date
  createdBy: IUser
  updatedAt: Date
  updatedBy: IUser
  details?: string | null
  url: string
  category: IBriefCategory
  project: IProject
}
