import { FC, useState } from 'react'

import ErrorContext from './ErrorContext'
import ErrorInfoType from '../../types/ErrorInfo'

type ErrorContextProviderProps = {
  children: JSX.Element
};

export const ErrorContextProvider: FC<ErrorContextProviderProps> = ({ children }) => {
  const [errorInfo, setErrorInfo] = useState<ErrorInfoType | null>(null)

  const value = { errorInfo, setErrorInfo }

  return (
    <ErrorContext.Provider value={value}>
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorContextProvider;
