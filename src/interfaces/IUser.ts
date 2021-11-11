import { IRole } from './IRole'
import { IUserAuth } from './IUserAuth'

export interface IUser extends IUserAuth {
  id: number
  roles: IRole[]
}
