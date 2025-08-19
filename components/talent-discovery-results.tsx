"use client"

import { CheckCircle, Trophy, Star, BookOpen, Target, Award } from "lucide-react"

interface TalentDiscoveryResultsProps {
  formData: any
  score: number
  recommendations: string[]
  onClose: () => void
}

export default function TalentDiscoveryResults({ formData, score, recommendations, onClose }: TalentDiscoveryResultsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-yellow-400"
    return "text-orange-400"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "عالی"
    if (score >= 60) return "خوب"
    return "قابل بهبود"
  }

  const getPersonalizedMessage = (score: number) => {
    if (score >= 80) {
      return "تبریک! شما پتانسیل بالایی در حوزه هوش مصنوعی دارید و می‌توانید در پروژه‌های پیشرفته شرکت کنید."
    } else if (score >= 60) {
      return "عملکرد خوبی دارید! با کمی تلاش بیشتر می‌توانید به سطح بالاتری برسید."
    } else {
      return "شروع خوبی داشته‌اید! با شرکت در دوره‌های مقدماتی می‌توانید مهارت‌های خود را تقویت کنید."
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Trophy className="w-8 h-8 ml-3" />
              <div>
                <h2 className="text-2xl font-bold persian-heading">نتایج ارزیابی استعداد</h2>
                <p className="text-green-100 persian-body">تبریک {formData.firstName}! ارزیابی شما کامل شد</p>
              </div>
            </div>
            <button onClick={onClose} className="text-white hover:text-gray-200">
              ✕
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Score Display */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gray-700 border-4 border-yellow-500 mb-4">
              <div className="text-center">
                <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
                  {score}
                </div>
                <div className="text-sm text-gray-400">از 100</div>
              </div>
            </div>
            <div className={`text-2xl font-semibold ${getScoreColor(score)} persian-heading mb-2`}>
              {getScoreLabel(score)}
            </div>
            <p className="text-gray-300 persian-body leading-relaxed max-w-2xl mx-auto">
              {getPersonalizedMessage(score)}
            </p>
          </div>

          {/* Recommendations */}
          <div className="bg-gray-700 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold persian-heading mb-4 flex items-center text-yellow-400">
              <Star className="w-6 h-6 ml-2" />
              دوره‌های پیشنهادی برای شما
            </h3>
            <div className="grid gap-4">
              {recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-center bg-gray-600 rounded-lg p-4">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold ml-3">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white persian-heading">{recommendation}</h4>
                  </div>
                  <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors persian-body text-sm">
                    مشاهده دوره
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-3 persian-heading flex items-center">
                <Target className="w-5 h-5 ml-2" />
                نقاط قوت شما
              </h4>
              <ul className="text-sm text-gray-300 persian-body space-y-1">
                {score >= 80 ? (
                  <>
                    <li>• سطح تحصیلات بالا</li>
                    <li>• تجربه کاری مناسب</li>
                    <li>• آشنایی با ابزارهای دیجیتال</li>
                    <li>• سابقه تحقیقاتی قوی</li>
                  </>
                ) : score >= 60 ? (
                  <>
                    <li>• پایه‌های علمی خوب</li>
                    <li>• انگیزه برای یادگیری</li>
                    <li>• تجربه عملی مناسب</li>
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
              <h4 className="font-semibold text-orange-400 mb-3 persian-heading flex items-center">
                <BookOpen className="w-5 h-5 ml-2" />
                مسیر پیشنهادی یادگیری
              </h4>
              <ul className="text-sm text-gray-300 persian-body space-y-1">
                {score >= 80 ? (
                  <>
                    <li>• شرکت در پروژه‌های پیشرفته</li>
                    <li>• یادگیری تکنولوژی‌های جدید</li>
                    <li>• مربیگری و انتقال دانش</li>
                  </>
                ) : score >= 60 ? (
                  <>
                    <li>• تقویت مهارت‌های عملی</li>
                    <li>• شرکت در دوره‌های تکمیلی</li>
                    <li>• کار روی پروژه‌های واقعی</li>
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

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border border-yellow-500/30 rounded-lg p-6 mb-6">
            <h4 className="text-lg font-semibold text-white persian-heading mb-4 flex items-center">
              <Award className="w-6 h-6 ml-2" />
              مراحل بعدی
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm persian-body text-gray-300">
              <div>
                <h5 className="font-semibold text-yellow-400 mb-2">اقدامات فوری:</h5>
                <ul className="space-y-1">
                  <li>• با مشاور آموزشی تماس بگیرید</li>
                  <li>• برنامه زمانی مناسب انتخاب کنید</li>
                  <li>• منابع پیشنهادی را مطالعه کنید</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-orange-400 mb-2">برنامه‌ریزی بلندمدت:</h5>
                <ul className="space-y-1">
                  <li>• اهداف شغلی خود را تعریف کنید</li>
                  <li>• شبکه حرفه‌ای خود را گسترش دهید</li>
                  <li>• در پروژه‌های عملی شرکت کنید</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-colors duration-200 font-medium persian-body"
            >
              بستن و شروع یادگیری
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}