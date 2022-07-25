import { Context, createContext } from 'react'

import ErrorInfoType from '../../types/ErrorInfo'

type ErrorContextType = {
  errorInfo: ErrorInfoType | null
  setErrorInfo: (errorInfo: ErrorInfoType | null) => void
}

const ErrorContext: Context<ErrorContextType> =
  createContext<ErrorContextType>({
    errorInfo: null,
    setErrorInfo: (_errorInfo: ErrorInfoType | null) => {},
  })

export default ErrorContext
