import ClientOnly from "@/components/ClientOnly"
import LoginForm from "@/templates/LoginForm"

const LoginPage = () => {
  return (
    <ClientOnly>
      <div className="w-full flex flex-col justify-center items-center h-screen">
        <LoginForm />
      </div>
    </ClientOnly>
  )
}

export default LoginPage