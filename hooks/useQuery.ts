import { useCallback, useMemo, useState } from 'react'

export type useQueryReturnType = [
  (newParams?: object) => void,
  {
    data: any
    error: string
    loading: boolean
  }
]

const useQuery = (request: (params: any) => Promise<object>, requestParams: object): useQueryReturnType => {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const query = useCallback((newParams?: object) => (
    request({ ...requestParams, ...newParams })
      .then((response) => setData(response))
      .catch((err) => {
        if (err.error.message === 'jwt expired') {
          localStorage.removeItem('token')
        }

        setError(err)
      })
      .finally(() => setLoading(false))
  ), [request])

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
