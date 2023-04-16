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
    email: z.string()
      .email("Digite um email valido")
      .nonempty("Email obrigatório"),
    password: z.string()
      .min(6, "A senha precisa de pelo menos 6 caracteres"),
  })

type FormProps = z.infer<typeof schema>

const LoginForm = () => {

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
          gap-8
          h-full
        "
      >
        <Heading
          title="Login"
          subtitle="Entre usando sua conta já criada"
          isDark
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

        <span
          className="
            text-lg
            font-medium
            mt-12
          "
        >
          Não possui uma conta?
          <Link
            href={"/"}
            className="
              text-green-600
              underline
              text-xl
            "
          >
            Registre-se
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

export default LoginForm