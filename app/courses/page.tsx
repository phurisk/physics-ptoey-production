"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Users, BookOpen, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getCourses, type PublicCourse } from "@/lib/api-client"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/sections/footer"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [items, setItems] = useState<PublicCourse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const data = await getCourses()
        if (mounted) setItems(data)
      } catch (e: any) {
        if (mounted) setError(e?.message || "โหลดข้อมูลคอร์สล้มเหลว")
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  const categories = useMemo(() => {
    const set = new Map<string, string>()
    items.forEach((c) => {
      if (c.category) set.set(c.category.id, c.category.name)
    })
    return [{ id: "all", name: "ทั้งหมด" }, ...Array.from(set.entries()).map(([id, name]) => ({ id, name }))]
  }, [items])

  const filteredCourses = useMemo(() => {
    if (selectedCategory === "all") return items
    return items.filter((course) => course.category?.id === selectedCategory)
  }, [items, selectedCategory])

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
         
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 text-balance">คอร์สเรียนทั้งหมด</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
              เลือกคอร์สที่เหมาะกับระดับการศึกษาของคุณ เรียนกับอาจารย์เต้ยผู้เชี่ยวชาญ
            </p>
          </motion.div>

      
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`px-6 py-2 ${
                  selectedCategory === category.id
                    ? "bg-yellow-400 hover:bg-yellow-500 text-white"
                    : "hover:bg-yellow-50 hover:border-yellow-400"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </motion.div>

       
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {loading && (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-gray-500 py-10">
                กำลังโหลดคอร์ส...
              </div>
            )}
            {error && !loading && (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-red-600 py-10">{error}</div>
            )}
            {!loading && !error && filteredCourses.map((course) => (
              <motion.div key={course.id} variants={fadeInUp}>
                <Card className="h-full hover:shadow-xl transition-shadow duration-300 group pt-0">
                  <CardContent className="p-0">
                
                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                      <Image
                        src={course.coverImageUrl || "/placeholder.svg?height=200&width=350"}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        {course.category?.name && (
                          <Badge className="bg-yellow-400 text-white">{course.category.name}</Badge>
                        )}
                      </div>
                    </div>

                 
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 text-balance line-clamp-2">{course.title}</h3>
                      <p className="text-gray-600 mb-4 text-pretty line-clamp-2">{course.description}</p>

                     
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{course._count?.enrollments ?? 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          <span>{course._count?.chapters ?? 0} บทเรียน</span>
                        </div>
                        {typeof course.duration === 'number' && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{course.duration} นาที</span>
                          </div>
                        )}
                      </div>

                 
                      {/* Rating not available from API yet */}

               
                      <div className="flex items-center gap-2 mb-6">
                        <span className="text-2xl font-bold text-yellow-600">฿{course.price.toLocaleString()}</span>
                      </div>

                   
                      <Link href={`/courses/${course.id}`}>
                        <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-white">ดูรายละเอียด</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

      
          {filteredCourses.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xl text-gray-500">ไม่พบคอร์สในหมวดหมู่นี้</p>
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
