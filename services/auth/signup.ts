import { put } from '../http'

interface SignupData {
  name: string
  phone: string
  email: string
  password: string
}

interface SignupResponse {
  message: string
  userId: number
}

const signup = async ({ name, phone, email, password }: SignupData): Promise<SignupResponse> => (
  put('/storeProducts/signup', { name, phone, email, password }) as Promise<SignupResponse>
)

export default signup
