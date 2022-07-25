import { ChangeEventHandler } from 'react'

interface InputProps {
  label: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  type?: string
}

const Input = ({ label, value, onChange, type = "text" }: InputProps) => (
  <label>
    {label}
    <input
      type={type}
      className="block px-2 py-1 border border-black"
      value={value}
      onChange={onChange}
    />
  </label>
)

export default Input
