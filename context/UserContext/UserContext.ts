import { Context, createContext } from 'react'

export type UserInfoType = {
  userId: string
  name: string
}

export type UserContextType = {
  userInfo: UserInfoType | null
  setUserInfo: (userInfo: UserInfoType | null) => void
}

const UserContext: Context<UserContextType> =
  createContext<UserContextType>({
    userInfo: {
      userId: '',
      name: '',
    },
    setUserInfo: (_userInfo: UserInfoType | null) => {},
  })

export default UserContext
