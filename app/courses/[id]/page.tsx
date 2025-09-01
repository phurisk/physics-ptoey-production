"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { notFound, useParams } from "next/navigation"
import { Users, BookOpen, Clock, CheckCircle, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getCourse, type PublicCourse } from "@/lib/api-client"
import PurchaseModal from "@/components/purchase-modal"
import { useAuth } from "@/hooks/auth-context"
import LoginModal from "@/components/login-modal"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

type CourseDetail = PublicCourse & {
  chapters?: Array<{
    id: string
    title: string
    order: number
    contents: Array<{ id: string; title: string; contentType: string; order: number }>
  }>
}

export default function CourseDetailPage() {
  const [course, setCourse] = useState<CourseDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [purchaseOpen, setPurchaseOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const { user } = useAuth()
  const params = useParams<{ id: string }>()
  const id = (params?.id as string) || ""

  useEffect(() => {
    let mounted = true
    ;(async () => {
      if (!id) return
      try {
        const data = await getCourse(id)
        if (mounted) setCourse(data as CourseDetail)
      } catch (e: any) {
        if (e?.status === 404) return notFound()
        if (mounted) setError(e?.message || "เกิดข้อผิดพลาดในการโหลดคอร์ส")
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [id])

  if (!loading && !course && !error) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {loading && (
            <div className="lg:col-span-3 text-center text-gray-500 py-16">กำลังโหลดข้อมูลคอร์ส...</div>
          )}
          {error && !loading && (
            <div className="lg:col-span-3 text-center text-red-600 py-16">{error}</div>
          )}
          {!loading && course && (
          <>
          <div className="lg:col-span-2 space-y-8">
            <motion.div variants={fadeInUp} initial="initial" animate="animate">
              <div className="aspect-video relative overflow-hidden rounded-xl shadow-lg mb-6">
                <Image
                  src={course.coverImageUrl || "/placeholder.svg?height=400&width=700"}
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
                {course.category?.name && <Badge className="bg-yellow-400 text-white">{course.category.name}</Badge>}
                {course.instructor?.name && <Badge variant="outline">{course.instructor.name}</Badge>}
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-balance">{course.title}</h1>

              <p className="text-xl text-gray-600 mb-6 text-pretty">{course.description}</p>


              <div className="flex flex-wrap items-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>{course._count?.enrollments ?? 0} นักเรียน</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  <span>{course.chapters?.length ?? 0} บทเรียน</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{typeof course.duration === 'number' ? `${course.duration} นาที` : '-'}</span>
                </div>
              </div>
            </motion.div>


            <motion.div variants={fadeInUp} initial="initial" animate="animate" transition={{ delay: 0.2 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">สารบัญคอร์ส</CardTitle>
                </CardHeader>
                <CardContent>
                  {course.chapters && course.chapters.length > 0 ? (
                    <div className="space-y-4">
                      {course.chapters.map((ch) => (
                        <div key={ch.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">บทที่ {ch.order}: {ch.title}</h3>
                            <span className="text-sm text-gray-500">{ch.contents.length} เนื้อหา</span>
                          </div>
                          <ul className="space-y-1 text-sm text-gray-700">
                            {ch.contents.map((ct) => (
                              <li key={ct.id} className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span>{ct.title}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">ยังไม่มีสารบัญสำหรับคอร์สนี้</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>

           
          </div>


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

                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-3xl font-bold text-yellow-600">฿{(course?.price ?? 0).toLocaleString()}</span>
                    </div>
                  </div>

                  <Separator className="mb-6" />


                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">ระยะเวลา:</span>
                      <span className="font-medium">{typeof course.duration === 'number' ? `${course.duration} นาที` : '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">บทเรียน:</span>
                      <span className="font-medium">{course.chapters?.length ?? 0} บทเรียน</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">นักเรียน:</span>
                      <span className="font-medium">{course._count?.enrollments ?? 0} คน</span>
                    </div>
                  </div>


                  <div className="space-y-3">
                    <Button onClick={() => (user?.id ? setPurchaseOpen(true) : setLoginOpen(true))} className="w-full bg-yellow-400 hover:bg-yellow-500 text-white text-lg py-3">
                      สมัครเรียนเลย
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      เพิ่มในรายการโปรด
                    </Button>
                  </div>

                  <Separator className="my-6" />


                  <div className="text-center text-sm text-gray-600">
                    <p>รับประกันความพึงพอใจ 30 วัน</p>
                    <p>หรือคืนเงิน 100%</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          <PurchaseModal
            open={purchaseOpen}
            onOpenChange={setPurchaseOpen}
            userId={user?.id}
            itemType="course"
            itemId={course.id}
            title={course.title}
            price={course.price}
          />
          <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
          </>
          )}
        </div>
      </div>
    </div>
  )
}
