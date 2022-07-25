import { useContext } from 'react'

import ErrorContext from '../context/ErrorContext/ErrorContext'

const ErrorMessage = () => {
  const { errorInfo, setErrorInfo } = useContext(ErrorContext)

  if (!errorInfo)
    return <></>

  const { message, data } = errorInfo;

  return (
    <div className="absolute w-screen flex justify-center">
      <div className="relative rounded-lg mt-4 px-12 py-2 bg-red-500 text-white">
        <a
          className="absolute top-1 right-2 text-2xl font-bold cursor-pointer"
          onClick={() => setErrorInfo(null)}
        >
          &times;
        </a>
        {message}
        {data && data.map((item) => (
          <>
            <br />
            {item.param}: {item.msg}
          </>
        ))}
      </div>
    </div>
  )
}

export default ErrorMessage
