"use client"

import { useState } from "react"
import { Briefcase, BarChart3, FileText, Code, Trophy, Star } from "lucide-react"
import CareerQuiz from "./career-quiz"

const jobRoles = [
  {
    id: "data-analyst",
    title: "تحلیلگر داده",
    description: "تجزیه و تحلیل داده‌ها برای کشف الگوها و ارائه بینش‌های کسب و کار",
    icon: BarChart3,
    color: "bg-blue-500",
    skills: ["Python", "SQL", "Excel", "Tableau", "Statistics"],
    salary: "15-30 میلیون تومان",
    demand: "بالا"
  },
  {
    id: "content-creator",
    title: "تولیدکننده محتوا",
    description: "ایجاد محتوای جذاب برای شبکه‌های اجتماعی، وبسایت‌ها و پلتفرم‌های دیجیتال",
    icon: FileText,
    color: "bg-purple-500",
    skills: ["Writing", "Design", "Video Editing", "SEO", "Social Media"],
    salary: "10-25 میلیون تومان",
    demand: "بالا"
  },
  {
    id: "ai-developer",
    title: "توسعه‌دهنده هوش مصنوعی",
    description: "طراحی و پیاده‌سازی سیستم‌های هوش مصنوعی و یادگیری ماشین",
    icon: Code,
    color: "bg-green-500",
    skills: ["Python", "TensorFlow", "PyTorch", "Machine Learning", "Deep Learning"],
    salary: "25-50 میلیون تومان",
    demand: "خیلی بالا"
  }
]

interface QuizResult {
  score: number
  feedback: string
  role: string
}

export default function EnhancedCareerCounseling() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null)

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId)
    setShowQuiz(true)
  }

  const handleQuizComplete = (score: number, feedback: string) => {
    setQuizResult({ score, feedback, role: selectedRole! })
    setShowQuiz(false)
  }

  const handleCloseQuiz = () => {
    setShowQuiz(false)
    setSelectedRole(null)
  }

  const handleCloseResult = () => {
    setQuizResult(null)
    setSelectedRole(null)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-yellow-400"
    return "text-red-400"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "عالی"
    if (score >= 60) return "خوب"
    return "نیاز به بهبود"
  }

  return (
    <section className="mobile-section bg-gray-900 mobile-container">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="p-3 sm:p-4 bg-yellow-500 rounded-full">
              <Briefcase className="w-8 h-8 sm:w-12 sm:h-12 text-black" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 persian-heading mobile-heading-spacing">
            مشاوره شغلی هوشمند
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 persian-body max-w-3xl mx-auto mobile-text-spacing px-2">
            مهارت‌های خود را در مشاغل مختلف ارزیابی کنید و بازخورد شخصی‌سازی شده دریافت کنید
          </p>
        </div>

        {!quizResult ? (
          <div className="mobile-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {jobRoles.map((role) => {
              const IconComponent = role.icon
              return (
                <div key={role.id} className="card group hover:border-yellow-500 transition-all duration-300">
                  <div className={`w-16 h-16 ${role.color} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-semibold mb-3 persian-heading group-hover:text-yellow-400 transition-colors duration-200">
                    {role.title}
                  </h3>

                  <p className="text-gray-400 persian-body mb-4 leading-relaxed text-sm">
                    {role.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-yellow-400 mb-2 persian-heading">مهارت‌های کلیدی:</h4>
                    <div className="flex flex-wrap gap-2">
                      {role.skills.map((skill) => (
                        <span key={skill} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs english-text">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6 space-y-2 text-sm persian-body">
                    <div className="flex justify-between">
                      <span className="text-gray-400">حقوق متوسط:</span>
                      <span className="text-green-400">{role.salary}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">تقاضای بازار:</span>
                      <span className="text-yellow-400">{role.demand}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRoleSelect(role.id)}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 px-4 rounded-lg transition-colors duration-200 font-medium persian-body group-hover:scale-105 transform transition-transform"
                  >
                    شروع ارزیابی
                  </button>
                </div>
              )
            })}
          </div>
        ) : (
          // Quiz Result Display
          <div className="max-w-4xl mx-auto">
            <div className="card bg-gradient-to-r from-gray-800 to-gray-700 border-2 border-yellow-500">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-yellow-500 rounded-full">
                    <Trophy className="w-12 h-12 text-black" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold persian-heading mb-2">نتیجه ارزیابی</h3>
                <p className="text-gray-400 persian-body">
                  {jobRoles.find(r => r.id === quizResult.role)?.title}
                </p>
              </div>

              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gray-700 border-4 border-yellow-500 mb-4">
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${getScoreColor(quizResult.score)}`}>
                      {quizResult.score}
                    </div>
                    <div className="text-sm text-gray-400">از 100</div>
                  </div>
                </div>
                <div className={`text-xl font-semibold ${getScoreColor(quizResult.score)} persian-heading`}>
                  {getScoreLabel(quizResult.score)}
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-6 mb-8">
                <h4 className="text-lg font-semibold persian-heading mb-4 flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 ml-2" />
                  بازخورد شخصی‌سازی شده
                </h4>
                <p className="text-gray-300 persian-body leading-relaxed">
                  {quizResult.feedback}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4">
                  <h5 className="font-semibold text-blue-400 mb-3 persian-heading">نقاط قوت</h5>
                  <ul className="text-sm text-gray-300 persian-body space-y-1">
                    {quizResult.score >= 80 ? (
                      <>
                        <li>• درک عمیق از مفاهیم کلیدی</li>
                        <li>• مهارت‌های عملی قوی</li>
                        <li>• آمادگی برای پروژه‌های پیچیده</li>
                      </>
                    ) : quizResult.score >= 60 ? (
                      <>
                        <li>• پایه‌های خوب در زمینه</li>
                        <li>• انگیزه برای یادگیری</li>
                        <li>• درک کلی از مفاهیم</li>
                      </>
                    ) : (
                      <>
                        <li>• علاقه به یادگیری</li>
                        <li>• پتانسیل رشد</li>
                        <li>• انگیزه برای پیشرفت</li>
                      </>
                    )}
                  </ul>
                </div>

                <div className="bg-orange-900/30 border border-orange-500/30 rounded-lg p-4">
                  <h5 className="font-semibold text-orange-400 mb-3 persian-heading">پیشنهادات بهبود</h5>
                  <ul className="text-sm text-gray-300 persian-body space-y-1">
                    {quizResult.score >= 80 ? (
                      <>
                        <li>• شرکت در پروژه‌های چالش‌برانگیز</li>
                        <li>• یادگیری تکنولوژی‌های جدید</li>
                        <li>• مربیگری دیگران</li>
                      </>
                    ) : quizResult.score >= 60 ? (
                      <>
                        <li>• تمرین بیشتر روی مهارت‌های عملی</li>
                        <li>• مطالعه منابع تخصصی</li>
                        <li>• شرکت در دوره‌های تکمیلی</li>
                      </>
                    ) : (
                      <>
                        <li>• شروع با دوره‌های مقدماتی</li>
                        <li>• تمرین مداوم و منظم</li>
                        <li>• مشاوره با متخصصان</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>

              <div className="text-center space-y-4">
                <button
                  onClick={handleCloseResult}
                  className="px-8 py-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-colors duration-200 font-medium persian-body"
                >
                  ارزیابی مجدد
                </button>
                <p className="text-sm text-gray-400 persian-body">
                  می‌توانید در هر زمان ارزیابی دیگری انجام دهید
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Modal */}
        {showQuiz && selectedRole && (
          <CareerQuiz
            role={selectedRole}
            onComplete={handleQuizComplete}
            onClose={handleCloseQuiz}
          />
        )}

        {/* Info Section */}
        <div className="mt-16 card bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border-yellow-500/30">
          <h3 className="text-xl font-semibold persian-heading mb-4 text-center">چرا ارزیابی مهارت مهم است؟</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm persian-body text-gray-300">
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-6 h-6 text-black" />
              </div>
              <h4 className="font-semibold text-yellow-400 mb-2">شناخت نقاط قوت</h4>
              <p>مهارت‌هایی که در آن‌ها برتری دارید را شناسایی کنید</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-6 h-6 text-black" />
              </div>
              <h4 className="font-semibold text-orange-400 mb-2">برنامه‌ریزی یادگیری</h4>
              <p>مسیر یادگیری مناسب برای رسیدن به اهداف شغلی</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-black" />
              </div>
              <h4 className="font-semibold text-amber-400 mb-2">پیشرفت حرفه‌ای</h4>
              <p>آمادگی برای فرصت‌های شغلی بهتر</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}