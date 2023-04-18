import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '@/libs/prisma'
import bcrypt from 'bcrypt'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login'
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {label: 'email', type: 'text'},
        password: {label: 'password', type: 'text'}
      },
      async authorize(credentials) {
        if(!credentials?.email || !credentials?.password){
          throw new Error('Invalid credentials')
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if(!user || !user?.password){
          throw new Error("Invalid credentials")
        }

        const verify = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if(!verify){
          throw new Error("Invalid Credentials")
        }

        return user

      }
    })
  ]
}

export default NextAuth(authOptions)
