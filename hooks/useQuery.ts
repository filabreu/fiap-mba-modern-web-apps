import { useCallback, useState } from 'react'

import ErrorType from '../types/Error'

export type useQueryReturnType = [
  (newParams?: object) => Promise<object>,
  {
    data: object | undefined
    error: ErrorType | undefined
    loading: boolean
  }
]

const useQuery = (request: (params: any) => Promise<object>): useQueryReturnType => {
  const [data, setData] = useState<object | undefined>()
  const [error, setError] = useState<ErrorType | undefined>()
  const [loading, setLoading] = useState<boolean>(false)

  const query = useCallback((requestParams?: object) => {
    setLoading(true)

    return request({ ...requestParams })
      .then((response) => {
        setData(response)
        return response
      })
      .catch((err: ErrorType) => {
        setError(err)
        throw err
      })
      .finally(() => setLoading(false))
  }, [request])

  return (
    [query,
      {
        data,
        error,
        loading,
      }
    ]
  );
}

export default useQuery
