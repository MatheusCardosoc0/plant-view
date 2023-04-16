import { User } from '@prisma/client'
import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
  const body = await req.json()

  const { name, email, password }: User = body

  const hashPassword = await bcrypt.hash(password, 8)

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashPassword
    }
  })

  return NextResponse.json(user)
}
