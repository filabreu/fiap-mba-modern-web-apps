import { useState } from 'react'
import { useRouter } from 'next/router'

import login from '../services/auth/login'
import Input from '../components/Input'

const Login = () => {
  const router = useRouter()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const validateForm = () => {
    return true
  }

  const handleSubmit = () => {
    if (validateForm()) {
      login({ email, password })
        .then(() => {
          router.push('/')
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="p-10 border border-black text-center">
        <form onSubmit={handleSubmit}>
          <h3 className="text-2xl font-bold">Login</h3>
          <div className="mt-4">
            <Input
              label="E-mail"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </div>
          <div className="mt-4">
            <Input
              label="Senha"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </div>

          <div className="mt-4">
            <input type="submit" className="px-4 py-1 border border-black" value="Enviar" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
