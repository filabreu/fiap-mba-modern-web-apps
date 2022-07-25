import type { AppProps } from 'next/app'

import ErrorContextProvider from '../context/ErrorContext/ErrorContextProvider'
import ErrorMessage from '../components/ErrorMessage'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorContextProvider>
      <>
        <ErrorMessage />
        <Component {...pageProps} />
      </>
    </ErrorContextProvider>
  )
}

export default MyApp
