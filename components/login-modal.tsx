"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const handleLineLogin = () => {
    console.log(" Line login")
    alert("เข้าสู่ระบบด้วย Line")
    onClose()
  }

  const handleGoogleLogin = () => {
    console.log(" Google login")
    alert("เข้าสู่ระบบด้วย Google")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-200">
        <DialogHeader className="text-center pb-6">
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text text-transparent">
            Login with ELearning
          </DialogTitle>
          <p className="text-gray-600 mt-2">เข้าสู่ระบบเพื่อเริ่มต้นการเรียนรู้</p>
        </DialogHeader>

        <div className="space-y-4 px-2">
          <Button
            onClick={handleLineLogin}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <MessageCircle className="h-6 w-6" />
            <span className="text-lg font-semibold">เข้าสู่ระบบด้วย Line</span>
          </Button>

          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 bg-white border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-lg font-semibold text-gray-700">เข้าสู่ระบบด้วย Google</span>
          </Button>

          <div className="text-center pt-4">
            <p className="text-sm text-gray-500">เข้าสู่ระบบเพื่อเข้าถึงคอร์สเรียนและข้อสอบทั้งหมด</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
