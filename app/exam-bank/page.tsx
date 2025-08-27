"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Eye, FileText, Search, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { examCategories, examBank } from "@/lib/dummy-data"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/sections/footer"

export default function ExamBankPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedExam, setSelectedExam] = useState<any>(null)

  // Get unique years from exam data
  const availableYears = [...new Set(examBank.map((exam) => exam.year))].sort((a, b) => b - a)

  const filteredExams = examBank.filter((exam) => {
    const matchesCategory = selectedCategory === "all" || exam.category === selectedCategory
    const matchesYear = selectedYear === "all" || exam.year.toString() === selectedYear
    const matchesSearch =
      exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.examType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.year.toString().includes(searchTerm)
    return matchesCategory && matchesYear && matchesSearch
  })

  const handleViewPDF = (pdfUrl: string, title: string) => {
    console.log(` Opening PDF: ${title} at ${pdfUrl}`)
    alert(`เปิดดู PDF: ${title}`)
    setSelectedExam(null)
  }

  const handleDownload = (downloadUrl: string, title: string) => {
    console.log(` Downloading: ${title} from ${downloadUrl}`)
    alert(`ดาวน์โหลด: ${title}`)
    setSelectedExam(null)
  }

  return (
    <>
      {/* Navigation Component */}
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-white to-yellow-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">คลังข้อสอบ</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              รวบรวมข้อสอบฟิสิกส์และวิชาที่เกี่ยวข้องจากหลายปีการศึกษา พร้อมให้ดูและดาวน์โหลดฟรี
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="ค้นหาข้อสอบ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-48">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="เลือกปี" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทุกปี</SelectItem>
                  {availableYears.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      ปี {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex flex-wrap justify-center gap-3">
              {examCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 rounded-full transition-all duration-300 ${
                    selectedCategory === category.id ? "text-white shadow-lg transform scale-105" : "hover:scale-105"
                  }`}
                  style={{
                    backgroundColor: selectedCategory === category.id ? category.color : "transparent",
                    borderColor: category.color,
                    color: selectedCategory === category.id ? "white" : category.color,
                  }}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-6"
          >
            <p className="text-gray-600">พบข้อสอบ {filteredExams.length} รายการ</p>
          </motion.div>

          {/* Exam Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredExams.map((exam, index) => {
              const category = examCategories.find((cat) => cat.id === exam.category)
              return (
                <motion.div
                  key={exam.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                  className="h-full"
                >
                  <Card
                    className="h-full cursor-pointer transition-all duration-300 border-2 hover:shadow-xl"
                    style={{
                      borderColor: category?.color + "20",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = category?.color || "#000"
                      e.currentTarget.style.backgroundColor = category?.color + "05"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = category?.color + "20"
                      e.currentTarget.style.backgroundColor = ""
                    }}
                    onClick={() => setSelectedExam(exam)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-2">
                        <FileText className="h-8 w-8 flex-shrink-0 mt-1" style={{ color: category?.color }} />
                        <Badge
                          variant="secondary"
                          className="text-white text-xs"
                          style={{ backgroundColor: category?.color }}
                        >
                          ปี {exam.year}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg leading-tight text-gray-900">{exam.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="text-center pt-2">
                        <p className="text-xs text-gray-500">คลิกเพื่อดูหรือดาวน์โหลด</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>

          <Dialog open={!!selectedExam} onOpenChange={() => setSelectedExam(null)}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-gray-900">{selectedExam?.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">ประเภท:</span>
                    <p className="font-semibold">{selectedExam?.examType}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">ปี:</span>
                    <p className="font-semibold">{selectedExam?.year}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">วิชา:</span>
                    <p className="font-semibold">{selectedExam?.subject}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">หมวดหมู่:</span>
                    <p className="font-semibold">
                      {examCategories.find((cat) => cat.id === selectedExam?.category)?.name}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => handleViewPDF(selectedExam?.pdfUrl, selectedExam?.title)}
                    className="flex-1 hover:bg-blue-50 hover:border-blue-300"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    ดู PDF
                  </Button>
                  <Button
                    onClick={() => handleDownload(selectedExam?.downloadUrl, selectedExam?.title)}
                    className="flex-1"
                    style={{
                      backgroundColor: examCategories.find((cat) => cat.id === selectedExam?.category)?.color,
                    }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* No Results */}
          {filteredExams.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-12"
            >
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">ไม่พบข้อสอบที่ค้นหา</h3>
              <p className="text-gray-500">ลองเปลี่ยนคำค้นหาหรือเลือกหมวดหมู่อื่น</p>
            </motion.div>
          )}

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-16 p-8 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-2xl"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">ต้องการข้อสอบเพิ่มเติม?</h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              สมัครเรียนกับเราเพื่อเข้าถึงข้อสอบและเนื้อหาเพิ่มเติม พร้อมคำอธิบายและเทคนิคการแก้โจทย์จากอาจารย์เต้ย
            </p>
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-full">
              สมัครเรียนออนไลน์
            </Button>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  )
}
