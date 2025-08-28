/** @type {import('next').NextConfig} */
const PORT = process.env.PORT ?? 3000

const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },

  // 👇 สำคัญสำหรับแก้ warning ข้าม origin ตอน dev
  experimental: {
    allowedDevOrigins: [
      `http://localhost:${PORT}`,
      `http://127.0.0.1:${PORT}`,
      // ใส่ IP ในวง LAN ที่คุณเปิดทดสอบ (แก้ให้ตรงกับของคุณ)
      `http://192.168.1.34:${PORT}`,
    ],
  },
}

export default nextConfig
