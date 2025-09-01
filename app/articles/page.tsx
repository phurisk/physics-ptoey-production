import Image from "next/image"
import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getPosts, PublicPost } from "@/lib/api-client"


export const metadata = {
  title: "บทความทั้งหมด | Physics Ptoey",
  description: "รวมบทความ เทคนิคการเรียนฟิสิกส์ และแนะแนวการสอบ",
}

export default async function ArticlesIndexPage() {
  const items: PublicPost[] = await getPosts({ postType: "บทความ", limit: 9 })
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-balance">
            บทความทั้งหมด
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
            อัปเดตความรู้ฟิสิกส์ เคล็ดลับทำข้อสอบ และแนวคิดที่ใช้ได้จริง
          </p>
        </div>


        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((post) => (
            <Card
              key={`${post.id}-${post.slug ?? ""}`} 
              className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-white"
            >
              <CardContent className="p-0">
                <Link href={`/articles/${post.slug ?? post.id}`}>
                  <div className="aspect-[16/10] relative overflow-hidden cursor-pointer">
                    <Image
                      src={post.imageUrl || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </Link>

                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3 gap-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(post.publishedAt || Date.now()).toLocaleDateString("th-TH", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>

                  <Link href={`/articles/${post.slug ?? post.id}`}>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 text-balance group-hover:text-yellow-600 transition-colors duration-200">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-gray-600 mb-6 text-pretty leading-relaxed">
                    {post.excerpt}
                  </p>

                  <Button asChild variant="ghost" className="group/btn p-0 h-auto text-yellow-600 hover:text-yellow-700">
                    <Link href={`/articles/${post.slug ?? post.id}`}>
                      อ่านต่อ
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
