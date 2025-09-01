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

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/orders?userId=${session.user.id}`, {
  
    cache: "no-store",
  }).catch(() => null)

  if (!res || !res.ok) return { session, orders: [] as any[] }
  const json = await res.json()
  return { session, orders: (json?.data as any[]) || [] }
}

export default async function DashboardPage() {
  const { session, orders } = await getData()

  const name = session?.user?.name || "ผู้ใช้งาน"
  const totalOrders = orders.length
  const completedOrders = orders.filter((o) => o.status === "COMPLETED").length
  const totalSpent = orders
    .filter((o) => o.status === "COMPLETED")
    .reduce((sum, o) => sum + (o.total || 0), 0)
  const purchasedItems = completedOrders 

  const latest = orders.slice(0, 5)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">สวัสดี, {name}</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">คำสั่งซื้อทั้งหมด</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{totalOrders}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">คำสั่งซื้อสำเร็จ</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{completedOrders}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">ยอดซื้อรวม</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">฿{totalSpent.toLocaleString()}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">สินค้าที่ซื้อ</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{purchasedItems}</div></CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>คำสั่งซื้อล่าสุด</CardTitle>
          </CardHeader>
          <CardContent>
            {latest.length === 0 ? (
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
                  {latest.map((o) => {
                    const itemTitle = o.orderType === "COURSE" ? o.course?.title : o.ebook?.title
                    const createdAt = o.createdAt ? new Date(o.createdAt) : null
                    return (
                      <TableRow key={o.id}>
                        <TableCell>{createdAt ? createdAt.toLocaleDateString("th-TH") : "-"}</TableCell>
                        <TableCell className="max-w-[220px] truncate">{itemTitle || "-"}</TableCell>
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

        <Card>
          <CardHeader>
            <CardTitle>เมนูด่วน</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              <Link href="/courses" className="w-full">
                <div className="rounded-md border p-3 hover:bg-muted/50 transition">คอร์สเรียนของฉัน</div>
              </Link>
              <Link href="/orders" className="w-full">
                <div className="rounded-md border p-3 hover:bg-muted/50 transition">ประวัติคำสั่งซื้อ</div>
              </Link>
              {/* Cart link removed: no cart feature */}
              <Link href="/profile" className="w-full">
                <div className="rounded-md border p-3 hover:bg-muted/50 transition">ข้อมูลส่วนตัว</div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
