'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from "../components/inputs"
import { Button } from "../components/button"
import Heading from "@/components/Heading"
import Link from "next/link"
import axios from "axios"

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

type FormProps = z.infer<typeof schema>

const RegisterForm = () => {

  const [isloading, setIsLoading] = useState(false)

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema)
  })

  async function onSubmit(data: FormProps) {
    setIsLoading(true)

    try {
      const response = await axios.post('/api/register', data)

      console.log(response.data)
      alert('Funcionou')
    } catch (error) {
      console.log(error)
      alert('falha')
    }

    setIsLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
        w-full
        lg:rounded-xl
        p-2
        relative
        bg-green-500/60
        overflow-hidden
        h-full
        lg:w-[700px]
        lg:h-[95vh]
        FORM
      "
    >
      <div
        className="
          p-6
          bg-gray-100
          flex
          flex-col
          gap-2
          h-full
        "
      >
        <Heading
          title="Registre-se"
          subtitle="Crie sua conta para entrar no site"
          isDark
        />
        <Input
          register={register}
          id="name"
          label="Nome"
          type="text"
          disabled={isloading}
          error={errors.name}
        />

        <Input
          register={register}
          id="email"
          label="Email"
          type="email"
          disabled={isloading}
          error={errors.email}
        />

        <Input
          register={register}
          id="password"
          label="Password"
          type="password"
          disabled={isloading}
          error={errors.password}
        />

        <Input
          register={register}
          id="confirmPassword"
          label="ConfirmPassword"
          type="password"
          disabled={isloading}
          error={errors.confirmPassword}
        />


        <span
          className="
            text-lg
            font-medium
            mt-12
          "
        >
          Possui uma conta?
          <Link
            href={"/login"}
            className="
              text-green-600
              underline
              text-xl
            "
          >
            Logar
          </Link>
        </span>
        <Button
          text="Enviar"
          type="submit"
          customStyle="mx-auto"
        />
      </div>
    </form>
  )
}

export default RegisterForm