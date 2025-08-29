import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AboutTeacher() {
  const teacherInfo = {
    name: "พี่เต้ย (อ.เชษฐา)",
    title: "โรงเรียนกวดวิชาฟิสิกส์อาจารย์เต้ย",
    subtitle: "(ในความควบคุมของกระทรวงศึกษาธิการ)",
    image: "/teacher(1).png",
    achievements: [
      "ที่ 1 ฟิสิกส์สามัญ ประเทศ",
      "ชนะเลิศการแข่งขันฟิสิกส์สัประยุทธ์ กลุ่มภาคกลางและกลุ่มภาคตะวันออก",
      "ที่ 1 ชนะเลิศการตอบปัญหาวิศวกรรมศาสตร์ (มหาวิทยาลัยเกษตรศาสตร์)",
      "นักเรียนฟิสิกส์โอลิมปิค มหาวิทยาลัยศิลปากร (สนามจันทร์)",
      "นักเรียนทุนส่งเสริมความเป็นเลิศทางวิทยาศาสตร์และเทคโนโลยี JSTP ของสวทช และอพวช",
      "รับเชิญเข้าร่วมประชุมสัมนาฟิสิกส์ศึกษา เกี่ยวกับการเรียนการสอนและงานวิจัยด้านฟิสิกส์ศึกษาของประเทศไทย",
    ],
    currentPosition: ["อาจารย์ฟิสิกส์ สถาบันฟิสิกส์ อ.เต้ย", "อาจารย์พิเศษห้องเรียนพิเศษทั่วประเทศ"],
  }

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">


          <div className="order-1 lg:order-2 lg:col-span-1 space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-balance">{teacherInfo.name}</h2>
            <div className="space-y-2">
              <h3 className="text-xl lg:text-2xl font-semibold text-yellow-600 text-pretty">{teacherInfo.title}</h3>
              <p className="text-gray-600 text-pretty">{teacherInfo.subtitle}</p>
            </div>
          </div>


          <div className="order-2 lg:order-1 lg:row-span-2">
            <div className="relative">
              <div className="aspect-[4/5] relative overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={teacherInfo.image || "/placeholder.svg"}
                  alt={teacherInfo.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-yellow-400 rounded-full opacity-30"></div>
            </div>
          </div>


          <div className="order-3 lg:order-3 lg:col-span-1 space-y-8">
            {/* Achievements */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-gray-900">ประวัติ / ประสบการณ์การสอน</h4>
              <div className="space-y-3">
                {teacherInfo.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 text-pretty leading-relaxed">{achievement}</p>
                  </div>
                ))}
              </div>
            </div>


            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-gray-900">ปัจจุบัน</h4>
              <div className="flex flex-wrap gap-2">
                {teacherInfo.currentPosition.map((position, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-yellow-100 text-yellow-800 px-3 py-1 text-sm cursor-default"
                  >
                    {position}
                  </Badge>
                ))}
              </div>
            </div>

            <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <h5 className="text-lg font-semibold text-gray-900">พร้อมเรียนกับครูพี่เต้ยแล้วหรือยัง?</h5>
                  <p className="text-gray-600 text-pretty">
                    เรียนรู้เทคนิคการแก้โจทย์ฟิสิกส์ เพื่อให้เข้าใจและได้คะแนนสูง
                  </p>
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-lg font-medium hover:font-bold transition-colors duration-200 cursor-pointer">
                    สมัครเรียนเลย
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
