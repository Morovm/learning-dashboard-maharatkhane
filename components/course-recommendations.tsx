"use client"

import { CheckCircle, BookOpen, Clock, Users } from "lucide-react"

interface FormData {
  firstName: string
  lastName: string
  educationalInterests: string[]
  aiToolsFamiliarity: string[]
  fieldOfStudy: string
  currentRole: string
}

interface Course {
  id: string
  title: string
  description: string
  duration: string
  level: string
  students: number
  topics: string[]
  matchReason: string
}

interface CourseRecommendationsProps {
  formData: FormData
  onClose: () => void
}

const courses: Course[] = [
  {
    id: "text-summarization",
    title: "خلاصه‌سازی متن با هوش مصنوعی",
    description: "یادگیری تکنیک‌های خلاصه‌سازی اسناد و مقالات با استفاده از مدل‌های زبانی پیشرفته",
    duration: "4 هفته",
    level: "مقدماتی",
    students: 245,
    topics: ["NLP", "Text Processing", "BERT", "GPT"],
    matchReason: "بر اساس علاقه شما به تولید محتوا"
  },
  {
    id: "chatbot-development",
    title: "ساخت چت‌بات هوشمند",
    description: "طراحی و پیاده‌سازی چت‌بات‌های هوشمند برای خدمات مشتریان و پشتیبانی",
    duration: "6 هفته",
    level: "متوسط",
    students: 189,
    topics: ["Dialogflow", "NLP", "Python", "API Integration"],
    matchReason: "مناسب برای پیشرفت در حوزه هوش مصنوعی"
  },
  {
    id: "data-analysis-ai",
    title: "تحلیل داده با هوش مصنوعی",
    description: "استفاده از الگوریتم‌های یادگیری ماشین برای تحلیل و پیش‌بینی داده‌ها",
    duration: "8 هفته",
    level: "متوسط",
    students: 312,
    topics: ["Python", "Pandas", "Scikit-learn", "Data Visualization"],
    matchReason: "مطابق با سابقه تحصیلی شما"
  },
  {
    id: "content-generation",
    title: "تولید محتوا با AI",
    description: "ایجاد محتوای متنی، تصویری و ویدیویی با کمک ابزارهای هوش مصنوعی",
    duration: "5 هفته",
    level: "مقدماتی",
    students: 428,
    topics: ["ChatGPT", "Midjourney", "Copy.ai", "Content Strategy"],
    matchReason: "بر اساس آشنایی شما با ابزارهای AI"
  }
]

function getRecommendedCourses(formData: FormData): Course[] {
  const interests = formData.educationalInterests || []
  const aiTools = formData.aiToolsFamiliarity || []
  
  let recommendedCourses = [...courses]
  
  // Rule-based recommendation logic
  if (interests.includes("تولید محتوا")) {
    recommendedCourses = recommendedCourses.filter(course => 
      course.id === "content-generation" || course.id === "text-summarization"
    )
  }
  
  if (interests.includes("تحلیل داده")) {
    recommendedCourses.push(courses.find(c => c.id === "data-analysis-ai")!)
  }
  
  if (aiTools.includes("ChatGPT") || aiTools.includes("Claude")) {
    recommendedCourses.push(courses.find(c => c.id === "chatbot-development")!)
  }
  
  // Remove duplicates
  const uniqueCourses = recommendedCourses.filter((course, index, self) => 
    index === self.findIndex(c => c.id === course.id)
  )
  
  return uniqueCourses.slice(0, 3) // Return top 3 recommendations
}

export default function CourseRecommendations({ formData, onClose }: CourseRecommendationsProps) {
  const recommendedCourses = getRecommendedCourses(formData)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 ml-3" />
              <div>
                <h2 className="text-2xl font-bold persian-heading">تبریک {formData.firstName}!</h2>
                <p className="text-green-100 persian-body">دوره‌های پیشنهادی برای شما آماده است</p>
              </div>
            </div>
            <button onClick={onClose} className="text-white hover:text-gray-200">
              ✕
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white persian-heading mb-2">
              دوره‌های پیشنهادی بر اساس پروفایل شما
            </h3>
            <p className="text-gray-400 persian-body">
              این دوره‌ها بر اساس علایق، مهارت‌ها و اهداف شغلی شما انتخاب شده‌اند.
            </p>
          </div>

          <div className="grid gap-6">
            {recommendedCourses.map((course) => (
              <div key={course.id} className="card bg-gray-700 border-l-4 border-l-yellow-500">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <BookOpen className="w-6 h-6 text-yellow-500 ml-3" />
                      <h4 className="text-lg font-semibold text-white persian-heading">{course.title}</h4>
                    </div>
                    
                    <p className="text-gray-300 persian-body mb-4 leading-relaxed">
                      {course.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {course.topics.map((topic) => (
                        <span key={topic} className="px-3 py-1 bg-gray-600 text-gray-300 rounded-full text-sm english-text">
                          {topic}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center space-x-6 space-x-reverse text-sm text-gray-400 persian-body">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 ml-1" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 ml-1" />
                        {course.students} دانشجو
                      </div>
                      <div className="px-2 py-1 bg-blue-900 text-blue-300 rounded text-xs">
                        {course.level}
                      </div>
                    </div>
                    
                    <div className="mt-3 p-3 bg-yellow-900/30 border border-yellow-500/30 rounded-lg">
                      <p className="text-yellow-300 text-sm persian-body">
                        <strong>چرا این دوره؟</strong> {course.matchReason}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 md:mr-6">
                    <button className="w-full md:w-auto px-6 py-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-colors duration-200 font-medium persian-body">
                      ثبت‌نام در دوره
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-500/30 rounded-lg">
            <h4 className="text-lg font-semibold text-white persian-heading mb-3">مرحله بعدی چیست؟</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm persian-body text-gray-300">
              <div>
                <h5 className="font-semibold text-blue-400 mb-2">برای شروع:</h5>
                <ul className="space-y-1">
                  <li>• با مشاور آموزشی تماس بگیرید</li>
                  <li>• برنامه زمانی مناسب انتخاب کنید</li>
                  <li>• پیش‌نیازهای دوره را بررسی کنید</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-purple-400 mb-2">پشتیبانی:</h5>
                <ul className="space-y-1">
                  <li>• راهنمایی در انتخاب دوره</li>
                  <li>• برنامه‌ریزی مسیر یادگیری</li>
                  <li>• پشتیبانی فنی و آموزشی</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 persian-body"
            >
              بستن
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}