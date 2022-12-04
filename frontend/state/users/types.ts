export interface UserTypes {
  id: number
  email: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface UsersStateTypes {
  user: UserTypes | null
  users: UserTypes[] | []
  loading: boolean
}
