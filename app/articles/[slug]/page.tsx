import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { articles } from "@/lib/dummy-data"

type Props = { params: { slug: string } }

export function generateStaticParams() {
  // ช่วยให้ build เป็น static ได้ ถ้าใช้ SSG
  return articles.map((a) => ({ slug: a.slug }))
}

export default function ArticleDetail({ params }: Props) {
  const article = articles.find((a) => a.slug === params.slug)
  if (!article) return notFound()

  return (
    <article className="max-w-3xl mx-auto py-12 px-4">
      {/* Back Button */}
      <div className="mb-6">
        <Button asChild variant="outline" className="gap-2">
          <Link href="/articles" aria-label="กลับไปหน้าบทความทั้งหมด">
            <ArrowLeft className="w-4 h-4" />
            กลับไปหน้าบทความ
          </Link>
        </Button>
      </div>

      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-500 mb-6">
        เผยแพร่: {new Date(article.date).toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" })}
      </p>

      <div className="relative w-full h-64 mb-6">
        <Image
          src={article.image || "/placeholder.svg"}
          alt={article.title}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      
      <div className="prose max-w-none">
        <p>{article.excerpt}</p>
       
      </div>
    </article>
  )
}
