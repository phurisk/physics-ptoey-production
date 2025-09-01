// Centralized API client helpers for public endpoints
export type ApiResponse<T> = {
  success: boolean
  data?: T
  error?: string
  pagination?: any
}

// Resolve base URL for server-side fetches to API routes
function getApiBase() {
  if (typeof window === 'undefined') {
    const base = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || 'http://localhost:3000'
    return base.replace(/\/$/, '')
  }
  return ''
}

// Courses
export type PublicCourse = {
  id: string
  title: string
  description?: string | null
  price: number
  duration?: number | null
  isFree: boolean
  status: 'DRAFT' | 'PUBLISHED' | 'CLOSED'
  instructor: { id: string; name: string | null; email: string | null }
  category?: { id: string; name: string; description?: string | null } | null
  _count?: { enrollments: number; chapters: number }
  coverImageUrl?: string | null
}

export async function getCourses(): Promise<PublicCourse[]> {
  const res = await fetch('/api/courses', { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch courses')
  const json: ApiResponse<PublicCourse[]> = await res.json()
  if (!json.success || !json.data) throw new Error(json.error || 'Failed to fetch courses')
  return json.data
}

export async function getCourse(id: string): Promise<PublicCourse> {
  const res = await fetch(`/api/courses/${encodeURIComponent(id)}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch course')
  const json: ApiResponse<PublicCourse> = await res.json()
  if (!json.success || !json.data) throw new Error(json.error || 'Failed to fetch course')
  return json.data
}

// Ebooks
export type PublicEbook = {
  id: string
  title: string
  description?: string | null
  author: string
  price: number
  discountPrice?: number | null
  coverImageUrl?: string | null
  previewUrl?: string | null
  category?: { id: string; name: string } | null
  averageRating?: number
  _count?: { reviews: number }
}

export async function getEbooks(params?: {
  category?: string
  featured?: boolean
  search?: string
  format?: string
  page?: number
  limit?: number
}): Promise<{ items: PublicEbook[]; pagination: any }> {
  const qs = new URLSearchParams()
  if (params?.category) qs.set('category', params.category)
  if (params?.featured) qs.set('featured', 'true')
  if (params?.search) qs.set('search', params.search)
  if (params?.format) qs.set('format', params.format)
  if (params?.page) qs.set('page', String(params.page))
  if (params?.limit) qs.set('limit', String(params.limit))

  const res = await fetch(`/api/ebooks${qs.toString() ? `?${qs.toString()}` : ''}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch ebooks')
  const json: ApiResponse<PublicEbook[]> = await res.json()
  if (!json.success || !json.data) throw new Error(json.error || 'Failed to fetch ebooks')
  return { items: json.data, pagination: json.pagination }
}

// Orders & payments
export type CreateOrderInput = {
  userId: string
  itemType: 'course' | 'ebook'
  itemId: string
  couponCode?: string
  shippingAddress?: any
}

export async function createOrder(input: CreateOrderInput) {
  const res = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error('Failed to create order')
  return res.json()
}

export async function validateCoupon(body: {
  code: string
  userId: string
  itemType: 'course' | 'ebook'
  itemId: string
  subtotal: number
}) {
  const res = await fetch('/api/coupons/validate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error('Failed to validate coupon')
  return res.json()
}

export async function uploadSlip(orderId: string, file: File) {
  const fd = new FormData()
  fd.append('slip', file)
  fd.append('orderId', orderId)
  const res = await fetch('/api/payments/upload-slip', { method: 'POST', body: fd })
  if (!res.ok) throw new Error('Failed to upload slip')
  return res.json()
}

export async function getOrders(userId: string) {
  const res = await fetch(`/api/orders?userId=${encodeURIComponent(userId)}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch orders')
  return res.json()
}

export async function getMyCourses(userId: string) {
  const res = await fetch(`/api/my-courses?userId=${encodeURIComponent(userId)}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch my courses')
  return res.json()
}

// Exam bank
export type PublicExamCategory = {
  id: string
  name: string
  description?: string | null
  _count?: { exams: number }
}

export type PublicExam = {
  id: string
  title: string
  description?: string | null
  category?: { id: string; name: string } | null
  createdAt?: string
  _count?: { files: number }
}

export type PublicExamFile = {
  id: string
  fileName: string
  filePath: string
  fileType?: string | null
  fileSize?: number | null
  uploadedAt?: string
}

export async function getExamCategories(includeExams = false): Promise<PublicExamCategory[]> {
  const res = await fetch(`/api/exam-categories${includeExams ? '?includeExams=true' : ''}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch exam categories')
  const json: ApiResponse<PublicExamCategory[]> = await res.json()
  if (!json.success || !json.data) throw new Error(json.error || 'Failed to fetch exam categories')
  return json.data
}

export async function getExams(params?: {
  page?: number
  limit?: number
  search?: string
  categoryId?: string
}): Promise<{ items: PublicExam[]; pagination: any }> {
  const qs = new URLSearchParams()
  if (params?.page) qs.set('page', String(params.page))
  if (params?.limit) qs.set('limit', String(params.limit))
  if (params?.search) qs.set('search', params.search)
  if (params?.categoryId) qs.set('categoryId', params.categoryId)
  const res = await fetch(`/api/exams${qs.toString() ? `?${qs.toString()}` : ''}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch exams')
  const json: ApiResponse<PublicExam[]> = await res.json()
  if (!json.success || !json.data) throw new Error(json.error || 'Failed to fetch exams')
  return { items: json.data, pagination: json.pagination }
}

export async function getExamDetail(id: string): Promise<PublicExam & { files: PublicExamFile[] }> {
  const res = await fetch(`/api/exams/${encodeURIComponent(id)}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch exam detail')
  const json: ApiResponse<PublicExam & { files: PublicExamFile[] }> = await res.json()
  if (!json.success || !json.data) throw new Error(json.error || 'Failed to fetch exam detail')
  return json.data
}

// Posts
export type PublicPostType = {
  id: string
  name: string
  description?: string | null
  _count?: { posts: number }
}

export type PublicPost = {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  imageUrl?: string | null
  imageUrlMobileMode?: string | null
  isFeatured?: boolean
  isActive?: boolean
  publishedAt?: string | null
  createdAt?: string | null
  author?: { id: string; name: string | null; email: string | null } | null
  postType?: { id: string; name: string; description?: string | null } | null
}

export async function getPosts(params?: {
  postType?: string
  limit?: number
  featured?: boolean
}): Promise<PublicPost[]> {
  const qs = new URLSearchParams()
  if (params?.postType) qs.set('postType', params.postType)
  if (params?.limit) qs.set('limit', String(params.limit))
  if (params?.featured) qs.set('featured', 'true')

  const res = await fetch(`${getApiBase()}/api/posts${qs.toString() ? `?${qs.toString()}` : ''}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch posts')
  const json: ApiResponse<PublicPost[]> = await res.json()
  if (!json.success || !json.data) throw new Error(json.error || 'Failed to fetch posts')
  return json.data
}

export async function getPost(slugOrId: string): Promise<PublicPost> {
  const res = await fetch(`${getApiBase()}/api/posts/${encodeURIComponent(slugOrId)}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch post')
  const json: ApiResponse<PublicPost> = await res.json()
  if (!json.success || !json.data) throw new Error(json.error || 'Failed to fetch post')
  return json.data
}

export async function getPostTypes(): Promise<PublicPostType[]> {
  const res = await fetch(`${getApiBase()}/api/post-types`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch post types')
  const json: ApiResponse<PublicPostType[]> = await res.json()
  if (!json.success || !json.data) throw new Error(json.error || 'Failed to fetch post types')
  return json.data
}

// Convenience wrapper for homepage articles section
export async function getArticlesPreview(): Promise<PublicPost[]> {
  return getPosts({ postType: 'บทความ', limit: 3 })
}
