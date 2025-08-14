"use client"

import { useState } from "react"
import { ArrowLeft, Target, TrendingUp, BookOpen } from "lucide-react"
import Image from "next/image"
import MultiStepForm from "./multi-step-form"
import CourseRecommendations from "./course-recommendations"
import DiscoverTalentButton from "./discover-talent-button" // Assuming DiscoverTalentButton is in a separate file

interface FormData {
  firstName: string
  lastName: string
  gender: string
  educationLevel: string
  fieldOfStudy: string
  employmentStatus: string
  contactNumber: string
  province: string
  age: number
  jobHistory: string
  currentRole: string
  yearsOfExperience: number
  coursesAttended: string[]
  competitions: string[]
  aiToolsFamiliarity: string[]
  educationalInterests: string[]
}

export default function EnhancedHeroSection() {
  const [showForm, setShowForm] = useState(false)
  const [showRecommendations, setShowRecommendations] = useState(false)
  const [formData, setFormData] = useState<FormData | null>(null)

  const handleStartLearning = () => {
    setShowForm(true)
  }

  const handleFormComplete = (data: FormData) => {
    setFormData(data)
    setShowForm(false)
    setShowRecommendations(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
  }

  const handleCloseRecommendations = () => {
    setShowRecommendations(false)
    setFormData(null)
  }

  return (
    <>
      <section className="bg-gradient-to-br from-gray-900 via-yellow-900/20 to-gray-900 mobile-section mobile-container">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="p-3 sm:p-4 bg-yellow-500 rounded-full">
                <Image
                  src="/logo.jpg"
                  alt="مهارت خانه البرز"
                  width={48}
                  height={48}
                  className="w-8 h-8 sm:w-12 sm:h-12 rounded-full object-cover"
                />
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 english-text mobile-heading-spacing">
              Learning Dashboard for AI Projects
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 persian-body max-w-4xl mx-auto leading-relaxed mobile-text-spacing px-2">
              با ما، راحت‌ترین پروژه‌های هوش مصنوعی را بیابید و با یادگیری مهارت‌های لازم، درآمد مناسبی کسب کنید.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <DiscoverTalentButton size="lg" className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl hover:shadow-yellow-500/20 w-full sm:w-auto mobile-button" />
              <button
                onClick={handleStartLearning}
                className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-bold text-base sm:text-lg rounded-xl transition-all duration-300 persian-body w-full sm:w-auto mobile-button"
              >
                شروع یادگیری
              </button>
              <button className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-bold text-base sm:text-lg rounded-xl transition-all duration-300 persian-body w-full sm:w-auto mobile-button">
                مشاهده پروژه‌ها
              </button>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="mobile-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-12 sm:mt-16">
            <div className="card text-center group hover:border-yellow-500 transition-all duration-300">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-200">
                <Target className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 persian-heading mobile-heading-spacing group-hover:text-yellow-400 transition-colors duration-200">
                پروژه‌های هدفمند
              </h3>
              <p className="text-gray-400 persian-body leading-relaxed mobile-text-spacing text-sm sm:text-base">
                پروژه‌های عملی و کاربردی که مستقیماً به درآمدزایی منجر می‌شوند
              </p>
            </div>

            <div className="card text-center group hover:border-yellow-500 transition-all duration-300">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-200">
                <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 persian-heading mobile-heading-spacing group-hover:text-yellow-400 transition-colors duration-200">
                آموزش جامع
              </h3>
              <p className="text-gray-400 persian-body leading-relaxed mobile-text-spacing text-sm sm:text-base">
                راهنمای گام به گام برای تسلط بر ابزارها و تکنیک‌های هوش مصنوعی
              </p>
            </div>

            <div className="card text-center sm:col-span-2 lg:col-span-1 group hover:border-yellow-500 transition-all duration-300">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-200">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 persian-heading mobile-heading-spacing group-hover:text-yellow-400 transition-colors duration-200">
                رشد مداوم
              </h3>
              <p className="text-gray-400 persian-body leading-relaxed mobile-text-spacing text-sm sm:text-base">
                به‌روزرسانی مداوم محتوا و پیگیری آخرین روندهای بازار
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Step Form Modal */}
      {showForm && (
        <MultiStepForm
          onComplete={handleFormComplete}
          onClose={handleCloseForm}
        />
      )}

      {/* Course Recommendations Modal */}
      {showRecommendations && formData && (
        <CourseRecommendations
          formData={formData}
          onClose={handleCloseRecommendations}
        />
      )}
    </>
  )
}