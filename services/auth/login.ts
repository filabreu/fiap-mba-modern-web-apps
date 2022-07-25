import { post } from '../http'

interface LoginData {
  email: string
  password: string
}

interface LoginResponse {
  userId: string
  name: string
  token: string
}

const login = async ({ email, password }: LoginData): Promise<LoginResponse> => (
  post('/storeProducts/login', { email, password }) as Promise<LoginResponse>
)

export default login
