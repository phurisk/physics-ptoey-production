import Image from "next/image"
import { ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { getEbooks, type PublicEbook } from "@/lib/api-client"
import PurchaseModal from "@/components/purchase-modal"
import { useAuth } from "@/hooks/auth-context"
import LoginModal from "@/components/login-modal"

export default function Books() {
  const [items, setItems] = useState<PublicEbook[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [purchaseOpen, setPurchaseOpen] = useState(false)
  const [selected, setSelected] = useState<PublicEbook | null>(null)
  const { user } = useAuth()
  const [loginOpen, setLoginOpen] = useState(false)

  const calculateDiscount = (price: number, discountPrice?: number | null) => {
    if (!discountPrice || discountPrice >= price) return 0
    return Math.round(((price - discountPrice) / price) * 100)
  }

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const { items } = await getEbooks({ limit: 8 })
        if (mounted) setItems(items)
      } catch (e: any) {
        if (mounted) setError(e?.message || "โหลดข้อมูลหนังสือล้มเหลว")
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <section className="py-12 lg:py-24 bg-white"> 
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
    
        <div className="text-center mb-8 lg:mb-12"> 
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 lg:mb-4 text-balance bg-[#ffbf00] px-8 py-4 w-fit mx-auto rounded-full shadow-sm"> 
            หนังสือของเรา
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto text-pretty"> 
            หนังสือเรียนฟิสิกส์คุณภาพสูง เขียนโดยอาจารย์เต้ย พร้อมเทคนิคการแก้โจทย์ที่เข้าใจง่าย
          </p>
        </div>

     
        <div
          className="
            grid grid-cols-2        /* MOBILE-ONLY: 2 คอลัมน์ */
            md:grid-cols-2          /* tablet เหมือนเดิม */
            lg:grid-cols-4          /* desktop เหมือนเดิม */
            gap-4 md:gap-8          /* MOBILE-ONLY: ลดช่องไฟ */
          "
        >
          {loading && (
            <div className="col-span-2 md:col-span-2 lg:col-span-4 text-center text-gray-500 py-10">
              กำลังโหลดหนังสือ...
            </div>
          )}
          {error && !loading && (
            <div className="col-span-2 md:col-span-2 lg:col-span-4 text-center text-red-600 py-10">
              {error}
            </div>
          )}
          {!loading && !error && items.map((book) => (
            <Card
              key={book.id}
              className="
                group hover:shadow-xl transition-all duration-300 overflow-hidden pt-0
              "
            >
              <CardContent className="p-0">
            
                <div className="aspect-[640/906] relative overflow-hidden">
                  <Image
                    src={book.coverImageUrl || "/placeholder.svg"}
                    alt={book.title}
                    fill
                    className="object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                 
                  <Badge
                    className="
                      absolute top-2 right-2 lg:top-4 lg:right-4  /* MOBILE-ONLY: ขยับ badge ชิดขอบน้อยลง */
                      bg-red-500 text-white text-[10px] lg:text-xs /* MOBILE-ONLY: ย่อฟอนต์ */
                      px-1.5 py-0.5 lg:px-2 lg:py-0.5              /* MOBILE-ONLY: ย่อ padding */
                    "
                  >
                    -{calculateDiscount(book.price, book.discountPrice)}%
                  </Badge>
                </div>

               
                <div className="p-3 md:p-6"> 
                  <h3 className="text-sm md:text-xl font-semibold text-gray-900 mb-2 md:mb-3 text-balance line-clamp-2">
                
                    {book.title}
                  </h3>

                
                  <p className="hidden md:block text-gray-600 mb-4 text-pretty leading-relaxed">
                    {book.description}
                  </p>

               
                  <div className="flex items-center mb-3 md:mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 md:w-4 md:h-4 ${i < Math.round(book.averageRating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-xs md:text-sm text-gray-500 ml-2">({(book.averageRating || 0).toFixed(1)})</span>
                  </div>

                 
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg md:text-2xl font-bold text-yellow-600">
                        ฿{(book.discountPrice ?? book.price).toLocaleString()}
                      </span>
                      {book.discountPrice && book.discountPrice < book.price && (
                        <span className="text-sm md:text-lg text-gray-400 line-through">
                          ฿{book.price.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                
                  <Button
                    className="
                      w-full bg-yellow-400 hover:bg-yellow-500 text-white font-medium
                      py-2 md:py-3 text-sm md:text-base  /* MOBILE-ONLY: ปุ่มเตี้ยลง + ฟอนต์เล็กลง */
                    "
                    onClick={() => { setSelected(book); user?.id ? setPurchaseOpen(true) : setLoginOpen(true) }}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    สั่งซื้อเลย
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      
        <div className="text-center mt-10 lg:mt-12"> 
          <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
            ต้องการหนังสือเพิ่มเติม หรือมีคำถามเกี่ยวกับหนังสือ?
          </p>
          <Button
            variant="outline"
            size="lg"
            className="
              border-yellow-400 text-yellow-600 hover:bg-yellow-50 bg-transparent
              h-10 px-4 text-sm md:h-12 md:px-6 md:text-base  /* MOBILE-ONLY: ปรับขนาดปุ่ม */
            "
          >
            ติดต่อสอบถาม
          </Button>
        </div>
      </div>
      {selected && (
        <PurchaseModal
          open={purchaseOpen}
          onOpenChange={(v) => { setPurchaseOpen(v); if (!v) setSelected(null) }}
          userId={user?.id}
          itemType="ebook"
          itemId={selected.id}
          title={selected.title}
          price={(selected.discountPrice ?? selected.price) || selected.price}
        />
      )}
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </section>
  )
}
