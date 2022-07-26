import { NextPage } from 'next'
import { FormEvent, useContext, useState } from 'react'
import { useRouter } from 'next/router'

import ErrorContext from '../context/ErrorContext/ErrorContext'
import UserContext from '../context/UserContext/UserContext'
import login from '../services/auth/login'
import Input from '../components/Input'

const Login: NextPage = () => {
  const router = useRouter()
  const { setErrorInfo } = useContext(ErrorContext)
  const { setUserInfo } = useContext(UserContext)

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const validateForm = () => {
    return true
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setErrorInfo(null)

    if (validateForm()) {
      login({ email, password })
        .then((data) => {
          const { token, userId, name } = data

          setUserInfo({ userId, name })
          localStorage.setItem('token', token)

          router.push('/')
        })
        .catch((err) => {
          const { error: { message, data } } = err

          setErrorInfo({ message, data })
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
              type="password"
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
