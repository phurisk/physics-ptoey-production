"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/sections/footer"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

// Dummy data for student works
const studentWorks = [
  {
    id: 1,
    title: "ผลงานนักเรียน",
    image: "/student-work1.jpeg",
    orientation: "portrait",
  },
  {
    id: 2,
    title: "ผลงานนักเรียน",
    image: "/student-work2.jpeg",
    orientation: "portrait",
  },
  {
    id: 3,
    title: "ผลงานนักเรียน",
    image: "/student-work3.jpeg",
    orientation: "portrait",
  },
  // {
  //   id: 4,
  //   title: "ผลงานนักเรียน",
  //   image: "/student-work4.jpeg",
  //   orientation: "landscape",
  // },

]

export default function StudentWorksPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">

        {/* Gallery Section */}
        <section className="py-16">
          <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
            <div className="mx-auto max-w-7xl px-4 ">
              {studentWorks.map((work, index) => (
                <motion.figure
                  key={work.id}
                  className="relative w-full overflow-hidden rounded-xl pb-20"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  whileHover={{ scale: 1.01 }}
                  
                >
                  {/* กล่องกำหนดสัดส่วนภาพ */}
                  <div
                    className={`relative w-full ${work.orientation === "portrait" ? "aspect-[3/4]" : "aspect-[16/9]"
                      }`}
                  >
                    <Image
                      src={work.image}
                      alt={''}
                      fill
                      priority={index < 3}           // โหลดรูปบนๆ เร็วขึ้นนิด
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>


        {/* Call to Action */}
        <motion.section
          className="py-16 bg-yellow-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">คุณก็สามารถเป็นส่วนหนึ่งของความสำเร็จได้</h2>
            <p className="text-lg text-gray-700 mb-8">เริ่มต้นการเรียนรู้ฟิสิกส์กับเราวันนี้</p>
            <Link
              href="/courses"
              className="bg-white text-yellow-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 cursor-pointer hover:font-bold inline-block"
            >
              สมัครเรียนเลย
            </Link>
          </div>
        </motion.section>
      </main>
      <Footer />
    </>
  )
}
