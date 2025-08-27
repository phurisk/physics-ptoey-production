import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { Navigation } from "@/components/navigation"

export const metadata: Metadata = {
  title: "ฟิสิกส์ครูพี่เต้ย - เรียนฟิสิกส์อย่างเป็นระบบกับฟิสิกส์พี่เต้ย",
  description: "เรียนฟิสิกส์กับครูพี่เต้ย ผู้เชี่ยวชาญด้านฟิสิกส์ที่มีประสบการณ์การสอนมากมาย พร้อมเทคนิคการสอนที่เข้าใจง่าย",
  keywords: "ฟิสิกส์, กวดวิชา, ครูพี่เต้ย, เรียนฟิสิกส์, GAT, PAT, ฟิสิกส์ม.ปลาย",
  generator: "physics-ptoey.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="th">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Navigation />
        <main className="pt-16 lg:pt-20">{children}</main>
      </body>
    </html>
  )
}
