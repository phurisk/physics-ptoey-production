# ระบบ Admin Panel - ฟิสิกส์พี่เต้ย

## ภาพรวม
ระบบ Admin Panel สำหรับจัดการฐานข้อมูลและระบบเรียนรู้ออนไลน์ฟิสิกส์พี่เต้ย ที่สร้างด้วย Next.js, Ant Design และ Prisma

## ฟีเจอร์หลัก

### 🔐 ระบบ Login
- หน้า Login สำหรับ Admin
- ระบบ Session Management
- การตรวจสอบสิทธิ์การเข้าถึง

### 📊 Dashboard
- ภาพรวมสถิติของระบบ
- กราฟและแผนภูมิ
- กิจกรรมล่าสุด
- สถานะระบบ

### 👥 จัดการผู้ใช้
- ดูรายการผู้ใช้ทั้งหมด
- เพิ่ม/แก้ไข/ลบผู้ใช้
- กรองและค้นหาผู้ใช้
- จัดการบทบาท (Admin, Teacher, Student)
- เปลี่ยนสถานะการใช้งาน

### 📚 จัดการคอร์ส
- ดูรายการคอร์สทั้งหมด
- สร้างคอร์สใหม่
- แก้ไขข้อมูลคอร์ส
- จัดการสถานะการเผยแพร่
- กำหนดราคาและโปรโมชั่น

### 🗄️ จัดการฐานข้อมูล
- ดูข้อมูลในตารางต่างๆ
- ค้นหาและกรองข้อมูล
- ดูรายละเอียดข้อมูล
- แก้ไขข้อมูลโดยตรง (ระวัง!)

### ⚙️ ตั้งค่าระบบ
- การตั้งค่าทั่วไป
- การตั้งค่าอีเมล
- การตั้งค่าการชำระเงิน
- การตั้งค่าความปลอดภัย
- การตั้งค่าธีม

## การเข้าใช้งาน

### ข้อมูลสำหรับทดสอบ
```
Email: admin@physics.com
Password: admin123
```

### URL สำคัญ
- หน้าแรก: `/`
- Admin Login: `/admin/login`
- Admin Dashboard: `/admin/dashboard`
- จัดการผู้ใช้: `/admin/users`
- จัดการคอร์ส: `/admin/courses`
- จัดการฐานข้อมูล: `/admin/database/tables`
- ตั้งค่าระบบ: `/admin/settings`
- ทดสอบ API: `/test-admin-api`

## โครงสร้างไฟล์

```
src/app/admin/
├── layout.js              # Layout หลักของ Admin
├── login/
│   └── page.js            # หน้า Login
├── dashboard/
│   └── page.js            # หน้า Dashboard
├── users/
│   └── page.js            # จัดการผู้ใช้
├── courses/
│   └── page.js            # จัดการคอร์ส
├── database/
│   └── tables/
│       └── page.js        # จัดการฐานข้อมูล
└── settings/
    └── page.js            # ตั้งค่าระบบ
```

## คุณสมบัติเด่น

### 🎨 UI/UX
- ใช้ Ant Design สำหรับ UI Components
- Responsive Design
- Dark/Light Theme Support
- การนำทางที่ใช้งานง่าย

### 🔒 ความปลอดภัย
- ระบบ Authentication
- Session Management
- การตรวจสอบสิทธิ์
- Middleware Protection

### 📱 Responsive
- รองรับทุกขนาดหน้าจอ
- Mobile-friendly
- Tablet optimized

### ⚡ Performance
- Server-side Rendering
- Optimized API calls
- Lazy loading
- Caching strategies

## การใช้งาน

### 1. เข้าสู่ระบบ
1. ไปที่ `/admin/login`
2. กรอก Email และ Password
3. คลิก "เข้าสู่ระบบ"

### 2. Dashboard
- ดูสถิติรวม
- ตรวจสอบกิจกรรมล่าสุด
- ดูสถานะระบบ

### 3. จัดการผู้ใช้
- ดูรายการผู้ใช้
- ค้นหาด้วยชื่อหรืออีเมล
- กรองตามบทบาทหรือสถานะ
- เพิ่มผู้ใช้ใหม่
- แก้ไขข้อมูลผู้ใช้

### 4. จัดการคอร์ส
- ดูรายการคอร์ส
- สร้างคอร์สใหม่
- แก้ไขข้อมูลคอร์ส
- เปลี่ยนสถานะการเผยแพร่

### 5. จัดการฐานข้อมูล
- เลือกตารางที่ต้องการดู
- ค้นหาข้อมูล
- ดูรายละเอียด
- แก้ไขข้อมูล (ระวัง!)

## API Endpoints

### Authentication
- `POST /api/admin/auth/login` - เข้าสู่ระบบ
- `POST /api/admin/auth/logout` - ออกจากระบบ

### Dashboard
- `GET /api/admin/dashboard` - ข้อมูล Dashboard

### Users
- `GET /api/admin/users` - รายการผู้ใช้
- `POST /api/admin/users` - สร้างผู้ใช้ใหม่
- `PUT /api/admin/users/[id]` - แก้ไขผู้ใช้
- `DELETE /api/admin/users/[id]` - ลบผู้ใช้

### Courses
- `GET /api/admin/courses` - รายการคอร์ส
- `POST /api/admin/courses` - สร้างคอร์สใหม่
- `PUT /api/admin/courses/[id]` - แก้ไขคอร์ส
- `DELETE /api/admin/courses/[id]` - ลบคอร์ส

### Settings
- `GET /api/admin/settings` - ดึงการตั้งค่า
- `PUT /api/admin/settings` - บันทึกการตั้งค่า

## คำเตือน

### ⚠️ การจัดการฐานข้อมูล
- การแก้ไขข้อมูลโดยตรงอาจส่งผลกระทบต่อระบบ
- ควรสำรองข้อมูลก่อนทำการแก้ไข
- ใช้ความระมัดระวังในการลบข้อมูล

### 🔐 ความปลอดภัย
- เปลี่ยนรหัสผ่าน Admin เริ่มต้น
- ใช้ HTTPS ในการใช้งานจริง
- ตั้งค่า Session timeout ที่เหมาะสม

## การพัฒนาต่อ

### ฟีเจอร์ที่ควรเพิ่ม
- [ ] ระบบ Backup/Restore
- [ ] การส่งออกข้อมูล (Export)
- [ ] การนำเข้าข้อมูล (Import)
- [ ] ระบบ Audit Log
- [ ] การแจ้งเตือนแบบ Real-time
- [ ] ระบบ Two-Factor Authentication
- [ ] การจัดการไฟล์และรูปภาพ
- [ ] ระบบรายงานขั้นสูง

### การปรับปรุง
- [ ] เพิ่ม Unit Tests
- [ ] เพิ่ม Integration Tests
- [ ] ปรับปรุง Performance
- [ ] เพิ่ม Error Handling
- [ ] ปรับปรุง UX/UI

## การติดตั้งและใช้งาน

1. Clone repository
2. ติดตั้ง dependencies: `npm install`
3. ตั้งค่า environment variables
4. รัน development server: `npm run dev`
5. เข้าใช้งานที่ `http://localhost:3000`

## สนับสนุน

หากมีปัญหาหรือข้อสงสัย สามารถติดต่อได้ที่:
- Email: admin@physics.com
- GitHub Issues

---

**หมายเหตุ:** ระบบนี้ยังอยู่ในช่วงพัฒนา ฟีเจอร์บางอย่างอาจยังไม่สมบูรณ์