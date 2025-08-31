"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { validateCoupon, createOrder, uploadSlip } from "@/lib/api-client"
import { useToast } from "@/hooks/use-toast"

export type PurchaseModalProps = {
  open: boolean
  onOpenChange: (v: boolean) => void
  userId?: string | null
  itemType: "course" | "ebook"
  itemId: string
  title: string
  price: number
  onSuccess?: (orderId: string) => void
}

export default function PurchaseModal({ open, onOpenChange, userId, itemType, itemId, title, price, onSuccess }: PurchaseModalProps) {
  const { toast } = useToast()
  const [coupon, setCoupon] = useState("")
  const [discount, setDiscount] = useState(0)
  const [validating, setValidating] = useState(false)
  const [creating, setCreating] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [slip, setSlip] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const subtotal = Math.max(0, price)
  const total = Math.max(0, subtotal - discount)

  async function handleValidate() {
    if (!userId) {
      toast({ title: "กรุณาเข้าสู่ระบบ", description: "จำเป็นต้องเข้าสู่ระบบเพื่อใช้คูปอง", variant: "destructive" })
      return
    }
    if (!coupon.trim()) return
    setValidating(true)
    try {
      const res = await validateCoupon({ code: coupon.trim(), userId, itemType, itemId, subtotal })
      if (res?.success) {
        const d = Number(res.data?.discount || res.data?.couponDiscount || 0)
        setDiscount(d)
        toast({ title: "ใช้คูปองสำเร็จ", description: `ส่วนลด ฿${d.toLocaleString()}` })
      } else {
        throw new Error(res?.error || "คูปองไม่ถูกต้อง")
      }
    } catch (e: any) {
      toast({ title: "คูปองไม่ถูกต้อง", description: e?.message || "ไม่สามารถใช้คูปองได้", variant: "destructive" })
      setDiscount(0)
    } finally {
      setValidating(false)
    }
  }

  async function handleCreateOrder() {
    if (!userId) {
      toast({ title: "กรุณาเข้าสู่ระบบ", description: "จำเป็นต้องเข้าสู่ระบบเพื่อสั่งซื้อ", variant: "destructive" })
      return
    }
    setCreating(true)
    try {
      const res = await createOrder({ userId, itemType, itemId, couponCode: coupon || undefined })
      if (!res?.success) throw new Error(res?.error || "สร้างคำสั่งซื้อไม่สำเร็จ")
      const id: string | undefined = res.data?.orderId
      const isFree: boolean = !!res.data?.isFree
      const total: number | undefined = res.data?.total
      if (isFree) {
        toast({ title: "ลงทะเบียนฟรีสำเร็จ", description: "เพิ่มคอร์ส/หนังสือให้ในบัญชีของคุณแล้ว" })
        onOpenChange(false)
        if (id) onSuccess?.(id)
        return
      }
      if (!id) throw new Error("ไม่พบหมายเลขคำสั่งซื้อ")
      setOrderId(id)
      toast({ title: "สร้างคำสั่งซื้อสำเร็จ", description: total != null ? `เลขที่คำสั่งซื้อ ${id} • ยอดชำระ ฿${total.toLocaleString()}` : `เลขที่คำสั่งซื้อ ${id}` })
    } catch (e: any) {
      toast({ title: "เกิดข้อผิดพลาด", description: e?.message || "ไม่สามารถสร้างคำสั่งซื้อได้", variant: "destructive" })
    } finally {
      setCreating(false)
    }
  }

  async function handleUpload() {
    if (!orderId || !slip) return
    setUploading(true)
    try {
      const res = await uploadSlip(orderId, slip)
      if (!res?.success) throw new Error(res?.error || "อัปโหลดสลิปไม่สำเร็จ")
      toast({ title: "อัปโหลดสลิปสำเร็จ", description: "ระบบจะตรวจสอบการชำระเงินโดยอัตโนมัติ" })
      onOpenChange(false)
      onSuccess?.(orderId)
    } catch (e: any) {
      toast({ title: "เกิดข้อผิดพลาด", description: e?.message || "ไม่สามารถอัปโหลดสลิปได้", variant: "destructive" })
    } finally {
      setUploading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>ชำระเงิน • {title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">ราคา</span>
            <span className="font-semibold">฿{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">ส่วนลด</span>
            <span className="font-semibold text-green-600">-฿{discount.toLocaleString()}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between text-lg">
            <span className="">รวมทั้งสิ้น</span>
            <span className="font-bold text-yellow-600">฿{total.toLocaleString()}</span>
          </div>

          <div className="grid grid-cols-3 gap-2 items-end">
            <div className="col-span-2">
              <Label htmlFor="coupon">คูปองส่วนลด</Label>
              <Input id="coupon" placeholder="เช่น PTOEY50" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
            </div>
            <Button onClick={handleValidate} disabled={!coupon || validating} className="w-full">
              {validating ? "กำลังตรวจสอบ..." : "ใช้คูปอง"}
            </Button>
          </div>

          {!orderId ? (
            <Button onClick={handleCreateOrder} disabled={creating} className="w-full bg-yellow-400 hover:bg-yellow-500 text-white">
              {creating ? "กำลังสร้างคำสั่งซื้อ..." : "ยืนยันการสั่งซื้อ"}
            </Button>
          ) : (
            <div className="space-y-3">
              <div>
                <Label htmlFor="slip">อัปโหลดสลิปการโอนเงิน</Label>
                <Input id="slip" type="file" accept="image/*" onChange={(e) => setSlip(e.target.files?.[0] || null)} />
              </div>
              <Button onClick={handleUpload} disabled={!slip || uploading} className="w-full">
                {uploading ? "กำลังอัปโหลด..." : "อัปโหลดสลิป"}
              </Button>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>ปิด</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
