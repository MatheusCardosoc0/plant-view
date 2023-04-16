import React from 'react'

interface HeadingProps {
  title: string
  subtitle: string
  isDark?: boolean
}

const Heading: React.FC<HeadingProps> = ({
  subtitle,
  title,
  isDark
}) => {
  return (
    <div
      className="
        w-full
        flex
        flex-col
        gap-1
        mb-8
      ">
      <h2
        className={`
          text-6xl
          font-bold
          text-start
          ${isDark && 'text-black'}
          ${!isDark && 'text-white'}
        `}
      >
        {title}
      </h2>

      <p
        className={`
          text-sm
          ${isDark && 'text-zinc-800'}
          ${!isDark && 'text-zinc-200'}
        `}>
        {subtitle}
      </p>
    </div>
  )
}

export default Heading