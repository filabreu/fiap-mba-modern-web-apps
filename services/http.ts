const request = async (method: string, url: string, data?: object, headers?: HeadersInit): Promise<object> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
    {
      method: method,
      body: data ? new URLSearchParams(Object.entries(data)) : null,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...headers
      }
    }
  )

  if (!response.ok) {
    const errData: object = await response.json()
    return Promise.reject({ status: response.status, error: errData })
  }

  const resData: object = await response.json()
  return resData
}

const get = async (url: string, data?: object, headers?: HeadersInit): Promise<object> => request('GET', url, data, headers)
const post = async (url: string, data?: object, headers?: HeadersInit): Promise<object> => request('POST', url, data, headers)
const put = async (url: string, data?: object, headers?: HeadersInit): Promise<object> => request('PUT', url, data, headers)
const destroy = async (url: string, data?: object, headers?: HeadersInit): Promise<object> => request('DELETE', url, data, headers)

export { get, post, put, destroy }
