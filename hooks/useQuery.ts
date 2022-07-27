import { useEffect, useState } from 'react'

export type useQueryReturnType = {
  data: any
  error: string
  loading: boolean
  refetch: () => void
}

const useQuery = (httpRequest: Promise<object>): useQueryReturnType => {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [refetches, setRefetches] = useState<number>(0)

  const refetch = () => {
    setRefetches(refetches + 1)
  }

  useEffect(() => {
    httpRequest
      .then((response) => setData(response))
      .catch((err) => {
        if (err.error.message === 'jwt expired') {
          localStorage.removeItem('token')
        }

        setError(err)
      })
      .finally(() => setLoading(false))
  }, [])

  return {
    data,
    error,
    loading,
    refetch,
  }
}

export default useQuery
