"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const user = session?.user as any

  if (status === "loading") {
    return (
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-2">โปรไฟล์</h1>
        <p className="text-muted-foreground">กำลังโหลด...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-2">โปรไฟล์</h1>
        <p className="text-muted-foreground mb-6">กรุณาเข้าสู่ระบบเพื่อดูโปรไฟล์ของคุณ</p>
        <Link href="/">
          <Button>กลับสู่หน้าแรก</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">โปรไฟล์ของฉัน</h1>
      <div className="space-y-2">
        <div><span className="font-medium">ชื่อ:</span> {user.name}</div>
        <div><span className="font-medium">อีเมล:</span> {user.email}</div>
        <div><span className="font-medium">บทบาท:</span> {user.role || "STUDENT"}</div>
      </div>
    </div>
  )
}
