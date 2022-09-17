import { InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement>

export function FormInput({ register, ...rest }: Props) {
  return (
    <input
      type="text"
      {...rest}
      {...register(rest.id)}
      className={`bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 ${rest.className}`}
    />
  )
}