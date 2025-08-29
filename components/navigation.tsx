"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import LoginModal from "@/components/login-modal"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const pathname = usePathname() 

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLoginClick = () => {
    setIsLoginModalOpen(true)
    setIsOpen(false)
  }

 
  const menuItems = [
    { href: "/", label: "หน้าแรก" },
    { href: "/courses", label: "คอร์สเรียน" },
    { href: "/student-works", label: "ผลงานนักเรียน" },
    { href: "/study-plans", label: "แผนการเรียน" },
    { href: "/about", label: "เกี่ยวกับเรา" },
    { href: "/exam-bank", label: "คลังข้อสอบ" },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white/90 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
      
            <Link href="/" className="flex items-center pl-2">
              <img src="/new-logo.png" alt="Logo" className="h-16 lg:h-20" />
            </Link>

      
            <div className="hidden lg:flex items-center space-x-1 pr-10">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 text-lg font-medium transition-colors duration-200 
                    ${
                      pathname === item.href
                        ? "text-[#004B7D] border-b-2 border-[#004B7D]"
                        : "text-gray-700 hover:text-[#004B7D] "
                    }`}
                >
                  {item.label}
                </Link>
              ))}

              <Button
                onClick={handleLoginClick}
                className="ml-5 px-4 py-6 bg-[linear-gradient(180deg,#4eb5ed_0%,#01579b)] hover:bg-[linear-gradient(180deg,#01579b,#00acc1)] text-white rounded-lg text-base font-bold transition-colors duration-200 cursor-pointer"
              >
                สมัครเรียนออนไลน์
              </Button>
            </div>

         
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

        
          {isOpen && (
            <div className="lg:hidden">
              <div className="px-2 pt-2 pb-3 space-y-3 bg-white border-t border-gray-200">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200
                      ${
                        pathname === item.href
                          ? "text-[#004B7D] border-l-4 border-[#004B7D] bg-[#004B7D1A]"
                          : "text-gray-700 hover:text-[#004B7D] hover:bg-[#004B7D1A]"
                      }`}
                  >
                    {item.label}
                  </Link>
                ))}

                <Button
                  onClick={handleLoginClick}
                  className="block w-full text-left px-3 py-0 rounded-md text-base font-medium bg-[linear-gradient(180deg,#4eb5ed_0%,#01579b)] text-white"
                >
                  สมัครเรียนออนไลน์
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  )
}
