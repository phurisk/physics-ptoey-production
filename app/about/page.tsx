"use client"

import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/sections/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Award, Users, BookOpen, Target } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

const teachingEnvironmentImages = [
  {
    id: 1,
    src: "/physics-classroom-with-students-studying.png",
    alt: "บรรยากาศการเรียนในห้องเรียน",
    title: "ห้องเรียนที่ทันสมัย",
  },
  {
    id: 2,
    src: "/physics-laboratory-equipment-and-experiments.png",
    alt: "ห้องปฏิบัติการฟิสิกส์",
    title: "ห้องปฏิบัติการครบครัน",
  },
  {
    id: 3,
    src: "/physics-teacher-explaining-concepts-on-whiteboard.png",
    alt: "การสอนที่เข้าใจง่าย",
    title: "การสอนที่เข้าใจง่าย",
  },
  {
    id: 4,
    src: "/student-success-certificate-physics-competition.png",
    alt: "นักเรียนที่ประสบความสำเร็จ",
    title: "นักเรียนที่ประสบความสำเร็จ",
  },
]

const achievements = [
  "ที่ 1 ฟิสิกส์สามัญ ประเทศ",
  "ชนะเลิศการแข่งขันฟิสิกส์สัประยุทธ์ กลุ่มภาคกลางและกลุ่มภาคตะวันออก",
  "ที่ 1 ชนะเลิศการตอบปัญหาวิศวกรรมศาสตร์ (มหาวิทยาลัยเกษตรศาสตร์)",
  "นักเรียนฟิสิกส์โอลิมปิค มหาวิทยาลัยศิลปากร (สนามจันทร์)",
  "นักเรียนทุนส่งเสริมความเป็นเลิศทางวิทยาศาสตร์และเทคโนโลยี JSTP ของสวทช และอพวช",
  "รับเชิญเข้าร่วมประชุมสัมนาฟิสิกส์ศึกษา เกี่ยวกับการเรียนการสอนและงานวิจัยด้านฟิสิกส์ศึกษาของประเทศไทย",
]

const currentPositions = ["อาจารย์ฟิสิกส์ สถาบันฟิสิกส์ อ.เต้ย", "อาจารย์พิเศษห้องเรียนพิเศษทั่วประเทศ"]

export default function AboutPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % teachingEnvironmentImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + teachingEnvironmentImages.length) % teachingEnvironmentImages.length)
  }

  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-gradient-to-br from-yellow-50 to-white">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="pt-24 pb-16 px-4"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">เกี่ยวกับเรา</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">โรงเรียนกวดวิชาฟิสิกส์อาจารย์เต้ย</p>
              <p className="text-lg text-gray-500 mt-2">(ในความควบคุมของกระทรวงศึกษาธิการ)</p>
            </div>
          </div>
        </motion.section>

        {/* Teacher Profile Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="py-16 px-4"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Teacher Image */}
              <div className="relative">
                <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/professional-physics-teacher-portrait.png"
                    alt="อาจารย์เต้ย (อ.เชษฐา)"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-yellow-400 text-white p-4 rounded-2xl shadow-lg">
                  <Award className="h-8 w-8" />
                </div>
              </div>

              {/* Teacher Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">ฟิสิกส์ พี่เต้ย</h2>
                  <p className="text-xl text-gray-600 mb-4">อาจารย์เชษฐา</p>
                  <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                    ผู้เชี่ยวชาญด้านฟิสิกส์
                  </Badge>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Award className="h-6 w-6 text-yellow-500" />
                    ประวัติ / ประสบการณ์การสอน
                  </h3>
                  <div className="space-y-3">
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                        <p className="text-gray-700 leading-relaxed">{achievement}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Target className="h-6 w-6 text-yellow-500" />
                    ปัจจุบัน
                  </h3>
                  <div className="space-y-3">
                    {currentPositions.map((position, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + 0.1 * index }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                        <p className="text-gray-700 leading-relaxed">{position}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Teaching Environment Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="py-16 px-4 bg-white"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">บรรยากาศการสอน</h2>
              <p className="text-xl text-gray-600">สภาพแวดล้อมการเรียนรู้ที่เอื้อต่อการพัฒนาศักยภาพ</p>
            </div>

            <div className="relative">
              <Card className="overflow-hidden shadow-2xl">
                <CardContent className="p-0">
                  <div className="relative h-96 md:h-[500px]">
                    <Image
                      src={teachingEnvironmentImages[currentImageIndex].src || "/placeholder.svg"}
                      alt={teachingEnvironmentImages[currentImageIndex].alt}
                      fill
                      className="object-cover transition-all duration-500"
                    />

                    {/* Navigation Buttons */}
                    <Button
                      onClick={prevImage}
                      variant="outline"
                      size="icon"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <Button
                      onClick={nextImage}
                      variant="outline"
                      size="icon"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>

                    {/* Image Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                      <h3 className="text-white text-xl font-semibold">
                        {teachingEnvironmentImages[currentImageIndex].title}
                      </h3>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Dots Indicator */}
              <div className="flex justify-center mt-6 gap-2">
                {teachingEnvironmentImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentImageIndex ? "bg-yellow-400 scale-125" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="py-16 px-4 bg-gradient-to-r from-yellow-400 to-yellow-500"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="text-white">
                <Users className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-3xl font-bold mb-2">1000+</h3>
                <p className="text-xl">นักเรียนที่ประสบความสำเร็จ</p>
              </div>
              <div className="text-white">
                <BookOpen className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-3xl font-bold mb-2">15+</h3>
                <p className="text-xl">ปีของประสบการณ์การสอน</p>
              </div>
              <div className="text-white">
                <Award className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-3xl font-bold mb-2">50+</h3>
                <p className="text-xl">รางวัลและความสำเร็จ</p>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </>
  )
}
