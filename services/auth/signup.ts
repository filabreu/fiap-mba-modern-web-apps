import { put } from '../http'

const signup = async (
  name: string,
  phone: string,
  email: string,
  password: string,
) => put('/storeProducts/signup', { name, phone, email, password })

export default signup
