"use client"

import { useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SiLine } from "react-icons/si"

const errorMap: Record<string, string> = {
  line: "ไม่สามารถเข้าสู่ระบบด้วย LINE ได้ โปรดลองอีกครั้ง",
  OAuthSignin: "เกิดข้อผิดพลาดในการเชื่อมต่อผู้ให้บริการ",
  OAuthCallback: "เกิดข้อผิดพลาดระหว่างการยืนยันตัวตน",
  AccessDenied: "การเข้าถูกปฏิเสธ",
}

export default function LoginPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error") || undefined
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  const onLineSignIn = () => {
    signIn("line", { callbackUrl })
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-md">
      <h1 className="text-2xl font-bold mb-4">เข้าสู่ระบบ</h1>

      {error && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {errorMap[error] || "ไม่สามารถเข้าสู่ระบบได้"}
        </div>
      )}

      <div className="space-y-3">
        <Button onClick={onLineSignIn} className="w-full bg-green-500 hover:bg-green-600 text-white">
          <SiLine className="mr-2" /> เข้าสู่ระบบด้วย LINE
        </Button>
        <p className="text-xs text-muted-foreground">
          มีปัญหา? <Link className="underline" href="/">กลับหน้าแรก</Link>
        </p>
      </div>
    </div>
  )
}
