import Image from "next/image"
import { ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { books } from "@/lib/dummy-data"

export default function Books() {
  const calculateDiscount = (original: number, discounted: number) => {
    return Math.round(((original - discounted) / original) * 100)
  }

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-balance">หนังสือของเรา</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
            หนังสือเรียนฟิสิกส์คุณภาพสูง เขียนโดยอาจารย์เต้ย พร้อมเทคนิคการแก้โจทย์ที่เข้าใจง่าย
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {books.map((book) => (
            <Card key={book.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden pt-0">
              <CardContent className="p-0 ">
                {/* Book Image */}
                <div className="aspect-[640/906] relative overflow-hidden">
                  <Image
                    src={book.image || "/placeholder.svg"}
                    alt={book.title}
                    fill
                    className="object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  {/* Discount Badge */}
                  <Badge className="absolute top-4 right-4 bg-red-500 text-white">
                    -{calculateDiscount(book.originalPrice, book.discountPrice)}%
                  </Badge>
                </div>

                {/* Book Info */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 text-balance">{book.title}</h3>
                  <p className="text-gray-600 mb-4 text-pretty leading-relaxed">{book.description}</p>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">(4.9)</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-yellow-600">฿{book.discountPrice}</span>
                      <span className="text-lg text-gray-400 line-through">฿{book.originalPrice}</span>
                    </div>
                  </div>

                  {/* Buy Button */}
                  <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-3">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    สั่งซื้อเลย
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">ต้องการหนังสือเพิ่มเติม หรือมีคำถามเกี่ยวกับหนังสือ?</p>
          <Button
            variant="outline"
            size="lg"
            className="border-yellow-400 text-yellow-600 hover:bg-yellow-50 bg-transparent"
          >
            ติดต่อสอบถาม
          </Button>
        </div>
      </div>
    </section>
  )
}
