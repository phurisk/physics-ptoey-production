"use server"

const PORT = process.env.PORT ?? 3000

const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },


  experimental: {
    allowedDevOrigins: [
      `http://localhost:${PORT}`,
      `http://127.0.0.1:${PORT}`,
      `http://192.168.1.34:${PORT}`,
    ],
  },
}

export default nextConfig
