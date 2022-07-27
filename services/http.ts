const filterDataFields = (data: object) => (
  Object.keys(data)
    .filter((k): boolean => !!data[k as keyof object])
    .reduce((a, k) => ({ ...a, [k]: data[k as keyof object] }), {})
)

const request = async (method: string, url: string, data?: URLSearchParams | null, headers?: HeadersInit): Promise<object> => {
  let authHeaders = {}

  if (typeof window !== undefined) {
    const authToken = localStorage.getItem('token')

    authHeaders = {
      Authorization: `Bearer ${authToken}`
    }
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
    {
      method: method,
      body: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        ...headers,
        ...authHeaders,
      }
    }
  )

  if (!response.ok) {
    const isJson = response.headers.get('content-type')?.includes('application/json');
    const errData: object = isJson ? await response.json() : { message: await response.text() }

    return Promise.reject({ status: response.status, error: errData })
  }

  return response.json()
}

const get = async (url: string, data?: object, headers?: HeadersInit): Promise<object> => (
  request(
    'GET',
    url + (
      data
        ? `/?${new URLSearchParams(Object.entries(filterDataFields(data))).toString()}`
        : null
    ),
    null,
    headers
  )
)
const post = async (url: string, data?: object, headers?: HeadersInit): Promise<object> => (
  request(
    'POST',
    url,
    data
      ? new URLSearchParams(Object.entries(filterDataFields(data)))
      : null,
    headers
  )
)
const put = async (url: string, data?: object, headers?: HeadersInit): Promise<object> => (
  request(
    'PUT',
    url,
    data
      ? new URLSearchParams(Object.entries(filterDataFields(data)))
      : null,
    headers
  )
)
const destroy = async (url: string, data?: object, headers?: HeadersInit): Promise<object> => (
  request('DELETE', url, null, headers)
)

export { get, post, put, destroy }
