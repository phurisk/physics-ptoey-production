"use client"

import Image from "next/image"
import { Play, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { teachingVideos } from "@/lib/dummy-data"

export default function TeachingVideos() {
  const handleVideoClick = (youtubeId: string) => {
    // Open YouTube video in new tab
    window.open(`https://www.youtube.com/watch?v=${youtubeId}`, "_blank")
  }

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-balance">ตัวอย่างการสอน</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
            ดูตัวอย่างวิธีการสอนของอาจารย์เต้ย ที่ทำให้ฟิสิกส์เป็นเรื่องง่ายและเข้าใจได้
          </p>
        </div>

        {/* Videos Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {teachingVideos.map((video) => (
            <Card
              key={video.id}
              className="group hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
              onClick={() => handleVideoClick(video.youtubeId)}
            >
              <CardContent className="p-0">
                {/* Video Thumbnail */}
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={video.thumbnail || "/placeholder.svg?height=200&width=350"}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors duration-300">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                    </div>
                  </div>
                  {/* YouTube Badge */}
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-2 py-1 rounded text-sm font-medium flex items-center">
                    <Youtube className="w-4 h-4 mr-1" />
                    YouTube
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 text-balance group-hover:text-yellow-600 transition-colors duration-200">
                    {video.title}
                  </h3>
                  <p className="text-gray-600 text-pretty leading-relaxed">{video.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">ต้องการดูวิดีโอเพิ่มเติม?</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">ติดตาม YouTube Channel ของเราเพื่อดูวิดีโอการสอนฟิสิกส์เพิ่มเติม</p>
          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={() => window.open("https://youtube.com/@physicsptoey", "_blank")}
          >
            <Youtube className="w-5 h-5 mr-2" />
            ติดตาม YouTube
          </Button>
        </div>
      </div>
    </section>
  )
}
