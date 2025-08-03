"use client"

import { useState, useEffect } from "react"
import { Calendar, ExternalLink, Newspaper } from "lucide-react"

interface NewsItem {
  id: string
  title: string
  summary: string
  publishDate: string
  source: string
  url: string
}

// Mock AI news data
const mockNewsData: NewsItem[] = [
  {
    id: "1",
    title: "گوگل از مدل جدید Gemini 2.0 رونمایی کرد",
    summary:
      "گوگل نسخه جدید مدل زبانی Gemini را با قابلیت‌های پیشرفته‌تر در پردازش متن و تصویر معرفی کرد که سرعت پاسخ‌دهی ۳ برابری نسبت به نسخه قبلی دارد.",
    publishDate: "2025-01-08",
    source: "AI Hub",
    url: "#",
  },
  {
    id: "2",
    title: "OpenAI از ابزار جدید تولید ویدیو Sora معرفی کرد",
    summary:
      "شرکت OpenAI ابزار انقلابی Sora را برای تولید ویدیوهای باکیفیت از روی متن معرفی کرد که می‌تواند ویدیوهای تا ۶۰ ثانیه‌ای تولید کند.",
    publishDate: "2025-01-07",
    source: "TechCrunch",
    url: "#",
  },
  {
    id: "3",
    title: "Meta از چت‌بات جدید خود برای اینستاگرام رونمایی کرد",
    summary:
      "شرکت Meta چت‌بوت هوشمند جدیدی را برای پلتفرم اینستاگرام معرفی کرد که قابلیت پاسخ به سوالات کاربران و ایجاد محتوا را دارد.",
    publishDate: "2025-01-06",
    source: "The Verge",
    url: "#",
  },
  {
    id: "4",
    title: "مایکروسافت Copilot را به تمام محصولات Office اضافه کرد",
    summary:
      "مایکروسافت دستیار هوش مصنوعی Copilot را به تمام نرم‌افزارهای آفیس از جمله Word، Excel و PowerPoint اضافه کرد تا کاربران بتوانند کارهای خود را سریع‌تر انجام دهند.",
    publishDate: "2025-01-05",
    source: "Microsoft Blog",
    url: "#",
  },
  {
    id: "5",
    title: "رقابت شدید شرکت‌های فناوری در حوزه هوش مصنوعی",
    summary:
      "شرکت‌های بزرگ فناوری نظیر گوگل، مایکروسافت و اپل سرمایه‌گذاری عظیمی در حوزه هوش مصنوعی انجام داده‌اند و رقابت شدیدی در این بخش در جریان است.",
    publishDate: "2025-01-04",
    source: "Reuters",
    url: "#",
  },
  {
    id: "6",
    title: "هوش مصنوعی در پزشکی: تشخیص سرطان با دقت ۹۵ درصد",
    summary:
      "محققان دانشگاه استنفورد موفق به ساخت سیستم هوش مصنوعی شدند که می‌تواند انواع سرطان را با دقت ۹۵ درصدی تشخیص دهد.",
    publishDate: "2025-01-03",
    source: "Nature",
    url: "#",
  },
  {
    id: "7",
    title: "اتحادیه اروپا قوانین جدیدی برای هوش مصنوعی تصویب کرد",
    summary:
      "اتحادیه اروپا مجموعه قوانین جامعی برای تنظیم استفاده از هوش مصنوعی تصویب کرد که شامل حفاظت از حریم خصوصی و شفافیت الگوریتم‌ها می‌شود.",
    publishDate: "2025-01-02",
    source: "EU News",
    url: "#",
  },
  {
    id: "8",
    title: "سرمایه‌گذاری ۱۰ میلیارد دلاری در استارتاپ‌های هوش مصنوعی",
    summary:
      "در سال گذشته بیش از ۱۰ میلیارد دلار در استارتاپ‌های حوزه هوش مصنوعی سرمایه‌گذاری شده که رکورد جدیدی محسوب می‌شود.",
    publishDate: "2025-01-01",
    source: "VentureBeat",
    url: "#",
  },
]

export default function AINewsSection() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchNews = async () => {
      setLoading(true)
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setNews(mockNewsData)
      setLoading(false)
    }

    fetchNews()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <section className="mobile-section bg-gray-800 mobile-container">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 persian-heading mobile-heading-spacing">
              اخبار روزمره هوش مصنوعی
            </h2>
          </div>
          <div className="mobile-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="card animate-pulse">
                <div className="h-4 bg-gray-700 rounded mb-3"></div>
                <div className="h-3 bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-700 rounded mb-4"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="mobile-section bg-gray-800 mobile-container">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="p-3 sm:p-4 bg-yellow-500 rounded-full">
              <Newspaper className="w-8 h-8 sm:w-12 sm:h-12 text-black" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 persian-heading mobile-heading-spacing">
            اخبار روزمره هوش مصنوعی
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 persian-body max-w-3xl mx-auto mobile-text-spacing px-2">
            آخرین اخبار و پیشرفت‌های دنیای هوش مصنوعی
          </p>
        </div>

        <div className="mobile-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {news.map((item) => (
            <div key={item.id} className="card group hover:border-yellow-500 transition-all duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center text-xs sm:text-sm text-gray-400 persian-body">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                  {formatDate(item.publishDate)}
                </div>
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-yellow-400 transition-colors duration-200" />
              </div>

              <h3 className="text-sm sm:text-base font-semibold persian-heading mb-2 sm:mb-3 group-hover:text-yellow-400 transition-colors duration-200 mobile-heading-spacing line-clamp-2">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-gray-400 persian-body mb-3 sm:mb-4 mobile-text-spacing line-clamp-3">
                {item.summary}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-yellow-400 english-text font-medium">{item.source}</span>
                <button className="text-xs sm:text-sm text-yellow-400 hover:text-yellow-300 persian-body transition-colors duration-200">
                  ادامه مطلب
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
