//Element of fixed errors of hidratation

'use client'

import { ReactNode, useEffect, useState } from "react"

const ClientOnly = (
  { children }: { children: ReactNode }
) => {

  const [onMounted, setOnMounted] = useState(false)

  useEffect(() => {
    setOnMounted(true)
  },[])

  if(!onMounted){
    return null
  }

  return (
    <>
      {children}
    </>
  )
}

export default ClientOnly