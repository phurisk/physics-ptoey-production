import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Session } from "next-auth"

type SessionWithId = Session & { user?: NonNullable<Session["user"]> & { id: string; role?: string } }

async function getData(): Promise<{ session: SessionWithId | null; orders: any[] }> {
  const session = (await getServerSession(authOptions as any)) as SessionWithId | null
  if (!session?.user?.id) return { session, orders: [] as any[] }
  const res = await fetch(`/api/orders?userId=${session.user.id}`, { cache: "no-store" }).catch(() => null)
  if (!res || !res.ok) return { session, orders: [] as any[] }
  const json = await res.json()
  return { session, orders: (json?.data as any[]) || [] }
}

export default async function OrdersPage() {
  const { session, orders } = await getData()
  if (!session?.user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="py-6">
            กรุณาเข้าสู่ระบบก่อนดูประวัติคำสั่งซื้อ — <Link className="underline" href="/login">เข้าสู่ระบบ</Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">ประวัติคำสั่งซื้อ</h1>
      <Card>
        <CardHeader>
          <CardTitle>คำสั่งซื้อทั้งหมด ({orders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <p className="text-muted-foreground">ยังไม่มีคำสั่งซื้อ</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>วันที่</TableHead>
                  <TableHead>รายการ</TableHead>
                  <TableHead>ประเภท</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead className="text-right">ยอดรวม</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((o) => {
                  const itemTitle = o.orderType === "COURSE" ? o.course?.title : o.ebook?.title
                  const createdAt = o.createdAt ? new Date(o.createdAt) : null
                  return (
                    <TableRow key={o.id}>
                      <TableCell>{createdAt ? createdAt.toLocaleDateString("th-TH") : "-"}</TableCell>
                      <TableCell className="max-w-[320px] truncate">{itemTitle || "-"}</TableCell>
                      <TableCell>{o.orderType === "COURSE" ? "คอร์สเรียน" : "อีบุ๊ก"}</TableCell>
                      <TableCell>{o.status}</TableCell>
                      <TableCell className="text-right">฿{(o.total || 0).toLocaleString()}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
