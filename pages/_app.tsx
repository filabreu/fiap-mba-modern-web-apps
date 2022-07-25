import type { AppProps } from 'next/app'

import ErrorContextProvider from '../context/ErrorContext/ErrorContextProvider'
import UserContextProvider from '../context/UserContext/UserContextProvider'
import ErrorMessage from '../components/ErrorMessage'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorContextProvider>
      <UserContextProvider>
        <>
          <ErrorMessage />
          <Component {...pageProps} />
        </>
      </UserContextProvider>
    </ErrorContextProvider>
  )
}

export default MyApp
