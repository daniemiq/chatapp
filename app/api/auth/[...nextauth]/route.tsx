import bcrypt from 'bcrypt'

import NextAuth, { AuthOptions } from 'next-auth'

import  CredentialsProvider from 'next-auth/providers/credentials'

import FacebookProvider from 'next-auth/providers/facebook'

import GoogleProvider from 'next-auth/providers/google'

import { PrismaAdapter } from '@next-auth/prisma-adapter'

import prisma from '@/app/libs/prismadb'


export const authOptions : AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID as string,
            clientSecret: process.env.FACEBBOOK_SECRET as string
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text'},
                password: {label: 'password', type: 'password'}
            },
            async authorize(credentials){
                if (!credentials?.email || !credentials?.password){
                    throw new Error('Invalid Credentials Buddy')
                }

                const user = await prisma.user.findUnique({
                    where :{
                      email: credentials.email
                    }
                })

                if (!user || !user?.hashedPassword){
                    throw new Error('Invalid credentials buddy')
                }

                const IsCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                )
                if(!IsCorrectPassword){
                    throw new Error('Invalid credentials')
                }

                return user
            }
        })
    ],

    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt'
    },

    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST}