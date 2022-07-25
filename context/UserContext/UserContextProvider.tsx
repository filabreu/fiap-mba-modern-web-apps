import { FC, useState } from 'react'

import UserContext, { UserInfoType } from './UserContext'

type UserContextProviderProps = {
  children: JSX.Element
};

export const UserContextProvider: FC<UserContextProviderProps> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null)

  const value = { userInfo, setUserInfo }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
