interface ButtonProps {
  text: string
  type: "button" | "submit" | "reset"
  customStyle?: string
}

const Button: React.FC<ButtonProps> = ({
  text,
  type,
  customStyle
}) => {
  return (
    <button
      type={type}
      className={`
        bg-gradient-to-tr from-green-400 via-teal-500 to-green-400
        rounded-lg
        p-4
        w-full
        max-w-[240px]
        mt-12
        font-black
        text-white
        text-2xl
        hover:brightness-125
        ${customStyle}
      `}>
      {text}
    </button>
  )
}

export default Button