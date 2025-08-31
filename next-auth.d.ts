import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user?: {
      id: string
      role?: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    role?: string
    lineId?: string
    email?: string | null
    name?: string | null
    image?: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string
    role?: string
    lineId?: string
  }
}

export {}
