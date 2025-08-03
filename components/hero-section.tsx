"use client"

import { ArrowLeft, Sparkles, Target, TrendingUp, BookOpen } from "lucide-react"

interface HeroSectionProps {
  onAuthRequired: (action: () => void) => void
}

export default function HeroSection({ onAuthRequired }: HeroSectionProps) {
  const handleStartLearning = () => {
    onAuthRequired(() => {
      console.log("Starting learning journey...")
    })
  }

  return (
    <section className="bg-gradient-to-br from-gray-900 via-yellow-900/20 to-gray-900 mobile-section mobile-container">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="p-3 sm:p-4 bg-yellow-500 rounded-full">
              <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 text-black" />
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 english-text mobile-heading-spacing">
            Learning Dashboard for AI Projects
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 persian-body max-w-4xl mx-auto leading-relaxed mobile-text-spacing px-2">
            با ما، راحت‌ترین پروژه‌های هوش مصنوعی را بیابید و با یادگیری مهارت‌های لازم، درآمد مناسبی کسب کنید.
          </p>

          <button onClick={handleStartLearning} className="btn-primary persian-body inline-flex items-center group">
            شروع یادگیری
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>

        {/* Feature Cards */}
        <div className="mobile-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-12 sm:mt-16">
          <div className="card text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Target className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 persian-heading mobile-heading-spacing">
              پروژه‌های هدفمند
            </h3>
            <p className="text-gray-400 persian-body leading-relaxed mobile-text-spacing text-sm sm:text-base">
              پروژه‌های عملی و کاربردی که مستقیماً به درآمدزایی منجر می‌شوند
            </p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 persian-heading mobile-heading-spacing">
              آموزش جامع
            </h3>
            <p className="text-gray-400 persian-body leading-relaxed mobile-text-spacing text-sm sm:text-base">
              راهنمای گام به گام برای تسلط بر ابزارها و تکنیک‌های هوش مصنوعی
            </p>
          </div>

          <div className="card text-center sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 persian-heading mobile-heading-spacing">
              رشد مداوم
            </h3>
            <p className="text-gray-400 persian-body leading-relaxed mobile-text-spacing text-sm sm:text-base">
              به‌روزرسانی مداوم محتوا و پیگیری آخرین روندهای بازار
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
