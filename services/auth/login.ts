import { post } from '../http'

const login = async (email: string, password: string) => (
  post('/storeProducts/login', { email, password })
)

export default login
