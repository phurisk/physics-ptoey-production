# ระบบจัดการ eBook และการขาย

## ภาพรวม

ระบบจัดการ eBook ที่รองรับการขายหนังสืออิเล็กทรอนิกส์และหนังสือกายภาพ พร้อมระบบ shipping และ payment ที่ใช้ร่วมกับระบบเดิม

## โครงสร้างฐานข้อมูล

### Ebook (หนังสืออิเล็กทรอนิกส์)

- `id`: รหัสเฉพาะ (UUID)
- `title`: ชื่อหนังสือ
- `description`: คำอธิบาย
- `author`: ผู้เขียน
- `isbn`: รหัส ISBN
- `price`: ราคาปกติ
- `discountPrice`: ราคาลด
- `coverImageUrl`: รูปปก
- `previewUrl`: ไฟล์ตัวอย่าง
- `fileUrl`: ไฟล์เต็ม
- `fileSize`: ขนาดไฟล์ (bytes)
- `pageCount`: จำนวนหน้า
- `language`: ภาษา
- `format`: รูปแบบไฟล์ (PDF, EPUB, MOBI)
- `isPhysical`: หนังสือกายภาพหรือไม่
- `weight`: น้ำหนัก (สำหรับหนังสือกายภาพ)
- `dimensions`: ขนาด
- `stock`: จำนวนสต็อก
- `isActive`: สถานะการใช้งาน
- `isFeatured`: หนังสือแนะนำ
- `publishedAt`: วันที่เผยแพร่
- `categoryId`: หมวดหมู่

### EbookCategory (หมวดหมู่ eBook)

- `id`: รหัสเฉพาะ (UUID)
- `name`: ชื่อหมวดหมู่
- `description`: คำอธิบาย
- `isActive`: สถานะการใช้งาน

### EbookReview (รีวิว eBook)

- `id`: รหัสเฉพาะ (UUID)
- `ebookId`: รหัส eBook
- `userId`: รหัสผู้ใช้
- `rating`: คะแนน (1-5)
- `comment`: ความคิดเห็น
- `isActive`: สถานะการใช้งาน

### Order (คำสั่งซื้อ - ปรับปรุง)

- `id`: รหัสเฉพาะ (UUID)
- `userId`: รหัสผู้ใช้
- `courseId`: รหัสคอร์ส (nullable)
- `ebookId`: รหัส eBook (nullable)
- `orderType`: ประเภทคำสั่งซื้อ (COURSE, EBOOK)
- `status`: สถานะคำสั่งซื้อ
- `total`: ยอดรวม
- `shippingFee`: ค่าจัดส่ง
- `createdAt`: วันที่สร้าง

### Shipping (การจัดส่ง)

- `id`: รหัสเฉพาะ (UUID)
- `orderId`: รหัสคำสั่งซื้อ
- `recipientName`: ชื่อผู้รับ
- `recipientPhone`: เบอร์โทรผู้รับ
- `address`: ที่อยู่
- `district`: อำเภอ
- `province`: จังหวัด
- `postalCode`: รหัสไปรษณีย์
- `country`: ประเทศ
- `shippingMethod`: วิธีการจัดส่ง
- `trackingNumber`: หมายเลขติดตาม
- `status`: สถานะการจัดส่ง
- `shippedAt`: วันที่จัดส่ง
- `deliveredAt`: วันที่ส่งถึง
- `notes`: หมายเหตุ

## Enums

### OrderType

- `COURSE`: คำสั่งซื้อคอร์ส
- `EBOOK`: คำสั่งซื้อ eBook

### EbookFormat

- `PDF`: รูปแบบ PDF
- `EPUB`: รูปแบบ EPUB
- `MOBI`: รูปแบบ MOBI

### ShippingStatus

- `PENDING`: รอดำเนินการ
- `PROCESSING`: กำลังเตรียมสินค้า
- `SHIPPED`: จัดส่งแล้ว
- `DELIVERED`: ส่งถึงแล้ว
- `CANCELLED`: ยกเลิก

## ฟีเจอร์หลัก

### การจัดการ eBook

- ✅ CRUD operations สำหรับ eBook
- ✅ รองรับหนังสืออิเล็กทรอนิกส์และกายภาพ
- ✅ ระบบราคาและราคาลด
- ✅ จัดการสต็อก
- ✅ หลายรูปแบบไฟล์ (PDF, EPUB, MOBI)
- ✅ ระบบหมวดหมู่
- ✅ ระบบแท็ก (ใช้ร่วมกับโพสต์)
- ✅ ระบบรีวิวและคะแนน

### ระบบคำสั่งซื้อ (ปรับปรุง)

- ✅ รองรับการสั่งซื้อทั้งคอร์สและ eBook
- ✅ Polymorphic relationship
- ✅ คำนวณค่าจัดส่งอัตโนมัติ
- ✅ ใช้ระบบ Payment เดิม

### ระบบจัดส่ง

- ✅ ข้อมูลที่อยู่ผู้รับครบถ้วน
- ✅ ติดตามสถานะการจัดส่ง
- ✅ หมายเลขติดตาม
- ✅ วันที่จัดส่งและส่งถึง

## การใช้งานระบบเดิมร่วมกัน

### Payment System

ระบบ eBook ใช้ Payment model เดิม:

```prisma
model Payment {
  id      String    @id @default(uuid())
  orderId String    @unique
  method  String
  status  String
  paidAt  DateTime?
  ref     String?
  order   Order     @relation(fields: [orderId], references: [id])
}
```

### Tag System

ระบบ eBook ใช้ Tag model เดิมร่วมกัน:

- Post ใช้ PostTag
- Ebook ใช้ EbookTag
- Tag model เดียวกัน

## ข้อมูลตัวอย่าง

### หมวดหมู่ eBook

1. **การเขียนโปรแกรม** - หนังสือเกี่ยวกับการเขียนโปรแกรม
2. **การออกแบบ** - หนังสือเกี่ยวกับการออกแบบ
3. **ธุรกิจ** - หนังสือเกี่ยวกับธุรกิจ
4. **การพัฒนาตนเอง** - หนังสือเกี่ยวกับการพัฒนาตนเอง

### eBook ตัวอย่าง

1. **เรียนรู้ JavaScript ฉบับสมบูรณ์** (PDF, กายภาพ)
2. **React Hooks ในทางปฏิบัติ** (EPUB, ดิจิทัล)
3. **UI/UX Design Principles** (PDF, กายภาพ)

## API Endpoints (ที่จะสร้าง)

### eBooks API

- `GET /api/ebooks` - ดึงรายการ eBook
- `GET /api/ebooks/[id]` - ดึง eBook ตาม ID
- `GET /api/ebooks/category/[categoryId]` - ดึง eBook ตามหมวดหมู่

### Orders API

- `POST /api/orders` - สร้างคำสั่งซื้อ
- `GET /api/orders/[id]` - ดึงคำสั่งซื้อ
- `PUT /api/orders/[id]/shipping` - อัปเดตข้อมูลจัดส่ง

### Admin APIs

- `GET /api/admin/ebooks` - จัดการ eBook
- `GET /api/admin/orders` - จัดการคำสั่งซื้อ
- `GET /api/admin/shipping` - จัดการการจัดส่ง

## ตัวอย่างการใช้งาน

### สร้างคำสั่งซื้อ eBook

```javascript
const order = await prisma.order.create({
  data: {
    userId: "user-id",
    ebookId: "ebook-id",
    orderType: "EBOOK",
    status: "PENDING",
    total: 590,
    shippingFee: 50, // ถ้าเป็นหนังสือกายภาพ
  },
});
```

### สร้างข้อมูลจัดส่ง

```javascript
const shipping = await prisma.shipping.create({
  data: {
    orderId: order.id,
    recipientName: "ชื่อผู้รับ",
    recipientPhone: "0812345678",
    address: "123 ถนนสุขุมวิท",
    district: "วัฒนา",
    province: "กรุงเทพมหานคร",
    postalCode: "10110",
    shippingMethod: "EMS",
    status: "PENDING",
  },
});
```

## การขยายระบบ

ระบบนี้สามารถขยายได้ในอนาคต เช่น:

- ระบบคูปองส่วนลด
- ระบบสะสมแต้ม
- ระบบแนะนำหนังสือ
- ระบบ Wishlist
- ระบบ Bundle (ขายรวมกัน)
- ระบบ Subscription
- การแจ้งเตือนสถานะการจัดส่ง
- ระบบ Return/Refund

## การอัปเดตล่าสุด (Latest Updates)

### ✅ ระบบอัปโหลดไฟล์
- **ไฟล์ eBook**: รองรับ PDF, EPUB, MOBI
- **รูปปก**: รองรับไฟล์รูปภาพทุกประเภท
- **การจัดเก็บ**: ไฟล์ถูกเก็บใน `public/uploads/ebooks/` และ `public/uploads/covers/`
- **API**: `POST /api/upload` พร้อมการตรวจสอบประเภทไฟล์
- **UI**: แสดงสถานะการอัปโหลดและตัวอย่างรูปภาพ

### ✅ การปรับปรุงฐานข้อมูล
- **ลบ stock column**: ไม่ต้องจัดการสต็อกแล้ว (เพื่อความง่าย)
- **เพิ่ม pageCount**: แสดงจำนวนหน้าในตารางและฟอร์ม
- **ปรับปรุง ISBN**: เพิ่ม placeholder และการจัดรูปแบบ

### ✅ การปรับปรุง Admin UI
- **ฟอร์มอัปโหลดไฟล์**: อัปโหลดไฟล์ eBook และรูปปกได้
- **แสดงจำนวนหน้า**: เพิ่มคอลัมน์จำนวนหน้าในตาราง
- **ลบการจัดการสต็อก**: ลบฟิลด์สต็อกออกจากฟอร์ม
- **ปรับปรุง Layout**: จัดเรียงฟิลด์ใหม่ให้เหมาะสม

### 🔧 API Endpoints ใหม่
- `POST /api/upload` - อัปโหลดไฟล์ eBook และรูปปก
  - รองรับการตรวจสอบประเภทไฟล์
  - สร้างชื่อไฟล์ที่ไม่ซ้ำกัน
  - ส่งคืน URL สำหรับเข้าถึงไฟล์

### 📁 โครงสร้างไฟล์
```
public/
├── uploads/
│   ├── ebooks/          # ไฟล์ eBook (PDF, EPUB, MOBI)
│   └── covers/          # รูปปกหนังสือ
```

### 🎯 ฟีเจอร์ที่เพิ่มขึ้น
- ✅ อัปโหลดไฟล์ eBook ได้หลายรูปแบบ
- ✅ อัปโหลดรูปปกพร้อมตัวอย่าง
- ✅ แสดงขนาดไฟล์และจำนวนหน้า
- ✅ ตรวจสอบประเภทไฟล์อัตโนมัติ
- ✅ UI ที่ใช้งานง่ายสำหรับ Admin
- ✅ ลบความซับซ้อนของการจัดการสต็อก