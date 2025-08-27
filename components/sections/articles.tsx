import Image from "next/image"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { articles } from "@/lib/dummy-data"

export default function Articles() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-balance">บทความเพื่อน้องๆ</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
            บทความและเทคนิคการเรียนฟิสิกส์ที่จะช่วยให้คุณเข้าใจและทำคะแนนได้ดีขึ้น
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Card
              key={article.id}
              className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-white"
            >
              <CardContent className="p-0">
                {/* Article Image */}
                <div className="aspect-[16/10] relative overflow-hidden">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Article Info */}
                <div className="p-6">
                  {/* Meta Info */}
                  <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(article.date).toLocaleDateString("th-TH", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {article.readTime}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 text-balance group-hover:text-yellow-600 transition-colors duration-200">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 mb-6 text-pretty leading-relaxed">{article.excerpt}</p>

                  {/* Read More Button */}
                  <Button variant="ghost" className="group/btn p-0 h-auto text-yellow-600 hover:text-yellow-700">
                    อ่านต่อ
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-yellow-400 text-yellow-600 hover:bg-yellow-50 bg-transparent"
          >
            ดูบทความเพิ่มเติม
          </Button>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">ติดตามบทความใหม่ๆ</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">รับบทความและเทคนิคการเรียนฟิสิกส์ใหม่ๆ ส่งตรงถึงอีเมลของคุณ</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="กรอกอีเมลของคุณ"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3">สมัครรับข่าวสาร</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
