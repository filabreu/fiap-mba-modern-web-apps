import { post } from '../http'

interface LoginData {
  email: string
  password: string
}
interface LoginResponse {
  name: string
  phone: string
  email: string
  password: string
}


const login = async ({ email, password }: LoginData): Promise<LoginResponse> => (
  post('/storeProducts/login', { email, password }) as Promise<LoginResponse>
)

export default login
