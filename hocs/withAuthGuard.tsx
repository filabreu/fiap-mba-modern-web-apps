import { useContext, useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import ErrorContext from '../context/ErrorContext/ErrorContext'

const withAuthGuard = (Component: NextPage) => {
  const AuthGuard = (props: object) => {
    const router = useRouter()
    const [shouldRender, setShouldRender] = useState<boolean>(true)

    const { setErrorInfo } = useContext(ErrorContext)

    useEffect(() => {
      if (typeof window !== undefined) {
        const authToken = localStorage.getItem('token')

        if (!authToken) {
          setErrorInfo({ message: 'Você não está logado' })

          router.push('/login')
        } else {
          setShouldRender(false)
        }
      }
    }, [router, setErrorInfo])

    if (shouldRender) {
      return <></>
    }

    return (
      <Component {...props} />
    )
  }

  return AuthGuard
}

export default withAuthGuard
