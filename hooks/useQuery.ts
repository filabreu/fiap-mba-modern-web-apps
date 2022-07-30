import { useCallback, useState } from 'react'

export type useQueryReturnType = [
  (newParams?: object) => void,
  {
    data: any
    error: string
    loading: boolean
  }
]

const useQuery = (request: (params: any) => Promise<object>): useQueryReturnType => {
  const [data, setData] = useState<any>()
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const query = useCallback((requestParams?: object) => {
    setLoading(true)

    request({ ...requestParams })
      .then((response) => setData(response))
      .catch((err) => setError(err))
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
