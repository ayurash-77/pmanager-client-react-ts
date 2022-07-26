import { IBriefsCategory } from '../briefsCategories/briefsCategories.intefaces'
import { IProject } from '../projects/projects.interfaces'
import { IUser } from '../users/users.interfaces'

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
  category: IBriefsCategory
  project: IProject
}
