import ClientOnly from "@/components/ClientOnly";
import RegisterForm from "@/templates/RegisterForm";

export default function Home() {
  return (
    <ClientOnly>
      <div className="w-full flex flex-col justify-center items-center h-screen">
        <RegisterForm />
      </div>
    </ClientOnly>
  )
}