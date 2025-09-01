import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getPost } from "@/lib/api-client"

type Props = { params: { slug: string } }

export default async function ArticleDetail({ params }: Props) {
  try {
    const post = await getPost(params.slug)
    if (!post) return notFound()

    return (
      <article className="max-w-3xl mx-auto py-12 px-4">
        <div className="mb-6">
          <Button asChild variant="outline" className="gap-2">
            <Link href="/articles" aria-label="กลับไปหน้าบทความทั้งหมด">
              <ArrowLeft className="w-4 h-4" />
              กลับไปหน้าบทความ
            </Link>
          </Button>
        </div>

        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-500 mb-6">
          เผยแพร่: {new Date(post.publishedAt || Date.now()).toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="relative w-full h-64 mb-6">
          <Image
            src={post.imageUrl || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div className="prose max-w-none">
          <p>{post.excerpt}</p>
        </div>
      </article>
    )
  } catch (e) {
    return notFound()
  }
}
