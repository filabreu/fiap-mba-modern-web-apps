import { FC, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

import ErrorContext from '../context/ErrorContext/ErrorContext'

type AuthGuardProps = {
  children?: JSX.Element
};

const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const router = useRouter()

  const { setErrorInfo } = useContext(ErrorContext)

  useEffect(() => {
    if (typeof window !== undefined) {
      const authToken = localStorage.getItem('token')

      if (!authToken) {
        setErrorInfo({ message: 'Você não está logado' })

        router.push('/login')
      }
    }
  }, [router, setErrorInfo])

  return (
    <>
      {children}
    </>
  )
}

export default AuthGuard
