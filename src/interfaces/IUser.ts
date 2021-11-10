interface IRole {
  id: number
  name: string
}

export interface IUser {
  id: number
  email: string
  password: string
  roles: IRole[]
}
