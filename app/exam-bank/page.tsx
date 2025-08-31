"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Eye, FileText, Search, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { getExamCategories, getExams, getExamDetail, type PublicExam, type PublicExamCategory, type PublicExamFile } from "@/lib/api-client"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/sections/footer"
import Link from "next/link"

export default function ExamBankPage() {
  const [categories, setCategories] = useState<PublicExamCategory[]>([])
  const [exams, setExams] = useState<PublicExam[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [limit] = useState(24)
  const [reloadTick, setReloadTick] = useState(0)

  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedYear, setSelectedYear] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selectedExamId, setSelectedExamId] = useState<string | null>(null)
  const [selectedExamDetail, setSelectedExamDetail] = useState<(PublicExam & { files: PublicExamFile[] }) | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)

  // Fetch categories once
  useEffect(() => {
    let active = true
    ;(async () => {
      try {
        const cats = await getExamCategories(false)
        if (active) setCategories(cats)
      } catch (e: any) {
        // non-blocking
        console.error(e)
      }
    })()
    return () => { active = false }
  }, [])

  // Fetch exams when filters change
  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)
    ;(async () => {
      try {
        const { items, pagination } = await getExams({
          page,
          limit,
          search: searchTerm || undefined,
          categoryId: selectedCategory !== 'all' ? selectedCategory : undefined,
        })
        if (!active) return
        setExams(items)
        setTotal(pagination?.total ?? items.length)
      } catch (e: any) {
        if (!active) return
        setError(e?.message || 'โหลดข้อมูลข้อสอบล้มเหลว')
      } finally {
        if (active) setLoading(false)
      }
    })()
    return () => { active = false }
  }, [page, limit, searchTerm, selectedCategory, reloadTick])

  // Years derived from exam createdAt
  const availableYears = useMemo(() => {
    const years = exams
      .map(e => e.createdAt ? new Date(e.createdAt).getFullYear() : undefined)
      .filter((y): y is number => typeof y === 'number')
    return Array.from(new Set(years)).sort((a, b) => b - a)
  }, [exams])

  const filteredExams = useMemo(() => {
    if (selectedYear === 'all') return exams
    return exams.filter(e => {
      if (!e.createdAt) return false
      return new Date(e.createdAt).getFullYear().toString() === selectedYear
    })
  }, [exams, selectedYear])

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / limit)), [total, limit])

  const handleRetry = () => setReloadTick((v) => v + 1)

  const openExamDetail = async (id: string) => {
    setSelectedExamId(id)
    setDetailLoading(true)
    try {
      const detail = await getExamDetail(id)
      setSelectedExamDetail(detail)
    } catch (e) {
      console.error(e)
    } finally {
      setDetailLoading(false)
    }
  }

  const closeExamDetail = () => {
    setSelectedExamDetail(null)
    setSelectedExamId(null)
  }

  const handleView = (file: PublicExamFile | undefined) => {
    if (!file?.filePath) return
    const url = file.filePath.startsWith('/') ? file.filePath : `/${file.filePath}`
    window.open(url, '_blank')
  }

  const handleDownload = (file: PublicExamFile | undefined) => {
    if (!file?.filePath) return
    const url = file.filePath.startsWith('/') ? file.filePath : `/${file.filePath}`
    const a = document.createElement('a')
    a.href = url
    a.download = file.fileName || 'exam-file'
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  return (
    <>

      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-white to-yellow-50 pt-20">
        <div className="container mx-auto px-4 py-8">

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


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex flex-row gap-3 items-center max-w-2xl mx-auto w-85 md:w-full">
              <div className="relative flex-1 min-w-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="ค้นหาข้อสอบ..."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setPage(1) }}
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>
              <div className="shrink-0">
                <Select value={selectedYear} onValueChange={(v) => { setSelectedYear(v); setPage(1) }}>
                  <SelectTrigger className="w-33 sm:w-48">
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
            </div>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                key="all"
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${selectedCategory === 'all' ? 'text-white shadow-lg transform scale-105' : 'hover:scale-105'}`}
              >ทั้งหมด</Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => { setSelectedCategory(category.id); setPage(1) }}
                  className={`px-6 py-2 rounded-full transition-all duration-300 ${selectedCategory === category.id ? "text-white shadow-lg transform scale-105" : "hover:scale-105"}`}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </motion.div>


          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-6"
          >
            {loading ? (
              <p className="text-gray-500">กำลังโหลดข้อสอบ...</p>
            ) : error ? (
              <div className="flex items-center justify-center gap-3">
                <p className="text-red-600">{error}</p>
                <Button variant="outline" onClick={handleRetry}>ลองใหม่</Button>
              </div>
            ) : (
              <p className="text-gray-600">พบข้อสอบ {total} รายการ • หน้า {page} / {totalPages}</p>
            )}
          </motion.div>


          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {loading && (
              Array.from({ length: 8 }).map((_, idx) => (
                <div key={`skeleton-${idx}`} className="h-36 border rounded-xl bg-gray-50 animate-pulse" />
              ))
            )}
            {!loading && !error && filteredExams.map((exam, index) => {
              const year = exam.createdAt ? new Date(exam.createdAt).getFullYear() : undefined
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
                    onClick={() => openExamDetail(exam.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-2">
                        <FileText className="h-8 w-8 flex-shrink-0 mt-1 text-yellow-600" />
                        {year && (
                          <Badge variant="secondary" className="text-xs">ปี {year}</Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg leading-tight text-gray-900">{exam.title}</CardTitle>
                      {exam.category?.name && (
                        <div className="mt-1 text-xs text-gray-500">หมวดหมู่: {exam.category.name}</div>
                      )}
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

          

          {!loading && !error && totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-8">
              <Button variant="outline" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>← หน้าก่อนหน้า</Button>
              <span className="text-sm text-gray-600">หน้า {page} / {totalPages}</span>
              <Button variant="outline" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>หน้าถัดไป →</Button>
            </div>
          )}

          <Dialog open={!!selectedExamId} onOpenChange={closeExamDetail}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-gray-900">
                  {selectedExamDetail?.title || 'รายละเอียดข้อสอบ'}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {detailLoading && (
                  <div className="text-center text-sm text-gray-500 py-4">กำลังโหลด...</div>
                )}
                {!detailLoading && selectedExamDetail && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">หมวดหมู่:</span>
                        <p className="font-semibold">{selectedExamDetail.category?.name || '-'}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">อัปเดตเมื่อ:</span>
                        <p className="font-semibold">{selectedExamDetail.createdAt ? new Date(selectedExamDetail.createdAt).toLocaleDateString('th-TH') : '-'}</p>
                      </div>
                    </div>
                    {(selectedExamDetail.files?.length ?? 0) > 0 ? (
                      <div className="space-y-2">
                        {selectedExamDetail.files.map((f) => (
                          <div key={f.id} className="flex items-center justify-between gap-3 border rounded-md p-2">
                            <div className="min-w-0">
                              <div className="text-sm font-medium truncate">{f.fileName}</div>
                              <div className="text-xs text-gray-500">{f.fileType || 'ไฟล์'}</div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" onClick={() => handleView(f)} className="gap-1">
                                <Eye className="h-4 w-4" /> ดู
                              </Button>
                              <Button onClick={() => handleDownload(f)} className="gap-1">
                                <Download className="h-4 w-4" /> ดาวน์โหลด
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">ยังไม่มีไฟล์สำหรับข้อสอบนี้</div>
                    )}
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>


          {!loading && !error && filteredExams.length === 0 && (
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
            <Link href="/courses"><Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-full cursor-pointer">สมัครเรียนออนไลน์</Button></Link>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  )
}
