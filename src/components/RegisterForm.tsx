'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z
  .object({
    name: z.string(),
    email: z.string()
      .email("Digite um email valido")
      .nonempty("Email obrigatório"),
    password: z.string()
      .min(6, "A senha precisa de pelo menos 6 caracteres"),
    confirmPassword: z.string()
  })
  .refine((fields) => fields.password === fields.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas precisam ser iguais'
  })

interface RegisterFormProps {
  isRegisterType?: boolean
}

type FormProps = z.infer<typeof schema>

const RegisterForm: React.FC<RegisterFormProps> = ({
  isRegisterType
}) => {

  const [loading, setLoading] = useState(false)

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema)
  })

  function onSubmit(data: FormProps){
    setLoading(true)

    console.log(data)

    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
        flex
        flex-col
        gap-12
      "
    >
      <input
        {...register('name')}
        className="
          bg-slate-300
        "
      />
      <input
        {...register('email')}
        className="
          bg-slate-300
        "
      />
      <input
        {...register('password')}
        className="
          bg-slate-300
        "
      />
      <input
        {...register('confirmPassword')}
        className="
          bg-slate-300
        "
      />

      <button
        type="submit"
      >
        Enviar
      </button>
    </form>
  )
}

export default RegisterForm