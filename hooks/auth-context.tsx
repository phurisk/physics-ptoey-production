"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
import { useSession } from "next-auth/react"

export type AppUser = {
  id: string
  email?: string | null
  name?: string | null
  role?: string | null
  image?: string | null
}

interface AuthContextValue {
  user: AppUser | null
  setUser: (u: AppUser | null) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null)
  const { data: session } = useSession()

  const value = useMemo<AuthContextValue>(() => ({
    user,
    setUser,
    logout: () => setUser(null),
  }), [user])

  // Keep user in sync with NextAuth session
  useEffect(() => {
    const sUser = session?.user as any
    if (sUser?.id) {
      setUser({ id: sUser.id, email: sUser.email, name: sUser.name, image: sUser.image, role: (sUser.role as string) || null })
    } else if (!session) {
      setUser(null)
    }
  }, [session])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
