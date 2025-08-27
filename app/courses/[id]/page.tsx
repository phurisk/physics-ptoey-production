"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Star, Users, BookOpen, Clock, CheckCircle, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { courses } from "@/lib/dummy-data"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = courses.find((c) => c.id === Number.parseInt(params.id))

  if (!course) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <motion.div variants={fadeInUp} initial="initial" animate="animate">
              <div className="aspect-video relative overflow-hidden rounded-xl shadow-lg mb-6">
                <Image
                  src={course.image || "/placeholder.svg?height=400&width=700"}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-white">
                    <Play className="h-6 w-6 mr-2" />
                    ดูตัวอย่าง
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-yellow-400 text-white">{course.level}</Badge>
                <Badge variant="outline">{course.instructor}</Badge>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-balance">{course.title}</h1>

              <p className="text-xl text-gray-600 mb-6 text-pretty">{course.description}</p>

              {/* Course Stats */}
              <div className="flex flex-wrap items-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>{course.students} นักเรียน</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  <span>{course.lectures} บทเรียน</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{course.duration}</span>
                </div>
                {course.rating > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(course.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span>
                      {course.rating} ({course.reviews} รีวิว)
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* What You Will Learn */}
            <motion.div variants={fadeInUp} initial="initial" animate="animate" transition={{ delay: 0.2 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">สิ่งที่คุณจะได้เรียนรู้</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {course.whatYouWillLearn.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Prerequisites */}
            <motion.div variants={fadeInUp} initial="initial" animate="animate" transition={{ delay: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">ข้อกำหนดเบื้องต้น</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {course.prerequisites.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Course Overview */}
            <motion.div variants={fadeInUp} initial="initial" animate="animate" transition={{ delay: 0.4 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">ภาพรวมคอร์ส</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed text-pretty">{course.courseOverview}</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Course Rating */}
            {course.rating > 0 && (
              <motion.div variants={fadeInUp} initial="initial" animate="animate" transition={{ delay: 0.5 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">คะแนนรีวิว • {course.reviews} รีวิว</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="text-4xl font-bold text-yellow-600">{course.rating}</div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-6 w-6 ${
                              i < Math.floor(course.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              className="sticky top-24"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.1 }}
            >
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  {/* Price */}
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-3xl font-bold text-yellow-600">
                        ฿{course.discountPrice.toLocaleString()}
                      </span>
                      {course.discountPrice < course.originalPrice && (
                        <span className="text-xl text-gray-400 line-through">
                          ฿{course.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    {course.discountPrice < course.originalPrice && (
                      <Badge className="bg-red-500 text-white">
                        ประหยัด ฿{(course.originalPrice - course.discountPrice).toLocaleString()}
                      </Badge>
                    )}
                  </div>

                  <Separator className="mb-6" />

                  {/* Course Details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">ระดับ:</span>
                      <span className="font-medium">{course.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ระยะเวลา:</span>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">บทเรียน:</span>
                      <span className="font-medium">{course.lectures} บทเรียน</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">นักเรียน:</span>
                      <span className="font-medium">{course.students} คน</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-white text-lg py-3">
                      สมัครเรียนเลย
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      เพิ่มในรายการโปรด
                    </Button>
                  </div>

                  <Separator className="my-6" />

                  {/* Guarantee */}
                  <div className="text-center text-sm text-gray-600">
                    <p>รับประกันความพึงพอใจ 30 วัน</p>
                    <p>หรือคืนเงิน 100%</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
