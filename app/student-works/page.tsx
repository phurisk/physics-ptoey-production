"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/sections/footer"
import { motion } from "framer-motion"
import Image from "next/image"

// Dummy data for student works
const studentWorks = [
  {
    id: 1,
    title: "ผลงานนักเรียน ม.6 - การแข่งขันฟิสิกส์โอลิมปิค",
    image: "/student-work-physics-olympiad-portrait.png",
    orientation: "portrait",
  },
  {
    id: 2,
    title: "ผลงานนักเรียน - การสอบเข้ามหาวิทยาลัย",
    image: "/student-work-university-entrance-landscape.png",
    orientation: "landscape",
  },
  {
    id: 3,
    title: "ผลงานนักเรียน - การแข่งขันสอวน.",
    image: "/student-work-science-competition-portrait.png",
    orientation: "portrait",
  },
  {
    id: 4,
    title: "ผลงานนักเรียน - ทุนการศึกษา",
    image: "/student-work-scholarship-landscape.png",
    orientation: "landscape",
  },
  {
    id: 5,
    title: "ผลงานนักเรียน - การแข่งขันฟิสิกส์ระดับชาติ",
    image: "/student-work-national-physics-portrait.png",
    orientation: "portrait",
  },
  {
    id: 6,
    title: "ผลงานนักเรียน - การสอบ PAT2",
    image: "/student-work-pat2-results-landscape.png",
    orientation: "landscape",
  },
]

export default function StudentWorksPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        {/* Header Section */}
        <motion.section
          className="py-16 bg-gradient-to-r from-yellow-50 to-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">ผลงานนักเรียน</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ความภาคภูมิใจของเราคือความสำเร็จของลูกศิษย์ ที่ได้รับรางวัลและความสำเร็จในด้านต่างๆ
            </p>
          </div>
        </motion.section>

        {/* Gallery Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center space-y-8 max-w-4xl mx-auto">
              {studentWorks.map((work, index) => (
                <motion.div
                  key={work.id}
                  className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div
                    className={`
                    relative w-full mx-auto
                    ${work.orientation === "portrait" ? "max-w-md aspect-[3/4]" : "max-w-2xl aspect-[4/3]"}
                  `}
                  >
                    <Image
                      src={work.image || "/placeholder.svg"}
                      alt={work.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-end">
                      <div className="p-4 text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <h3 className="font-semibold text-sm md:text-base">{work.title}</h3>
                      </div>
                    </div>
                  </div>
                </motion.div>
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
            <button className="bg-white text-yellow-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
              สมัครเรียนเลย
            </button>
          </div>
        </motion.section>
      </main>
      <Footer />
    </>
  )
}
