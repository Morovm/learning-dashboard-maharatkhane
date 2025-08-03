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

// Updated mock AI news data for July-August 2025 (تیر و مرداد ۱۴۰۴)
const mockNewsData: NewsItem[] = [
  {
    id: "1",
    title: "انقلاب جدید در مدل‌های زبانی: GPT-5 با قابلیت‌های بی‌نظیر",
    summary:
      "OpenAI از نسل جدید مدل‌های زبانی خود رونمایی کرد که قابلیت درک عمیق‌تر متن و تولید محتوای خلاقانه‌تر را دارد. این مدل می‌تواند کدهای پیچیده بنویسد و مسائل ریاضی پیشرفته حل کند.",
    publishDate: "2025-08-15",
    source: "TechCrunch",
    url: "https://techcrunch.com/ai-news",
  },
  {
    id: "2",
    title: "گوگل از چیپ کوانتومی جدید برای پردازش هوش مصنوعی رونمایی کرد",
    summary:
      "شرکت گوگل چیپ کوانتومی انقلابی معرفی کرد که سرعت پردازش مدل‌های هوش مصنوعی را ۱۰۰ برابر افزایش می‌دهد. این فناوری می‌تواند آینده محاسبات هوش مصنوعی را تغییر دهد.",
    publishDate: "2025-08-12",
    source: "Google AI Blog",
    url: "https://ai.googleblog.com",
  },
  {
    id: "3",
    title: "هوش مصنوعی در پزشکی: تشخیص زودهنگام آلزایمر با دقت ۹۸ درصد",
    summary:
      "محققان دانشگاه MIT موفق به توسعه سیستم هوش مصنوعی شدند که می‌تواند علائم اولیه بیماری آلزایمر را ۱۰ سال قبل از ظهور علائم بالینی تشخیص دهد.",
    publishDate: "2025-08-10",
    source: "MIT Technology Review",
    url: "https://www.technologyreview.com",
  },
  {
    id: "4",
    title: "Meta از عینک هوشمند جدید با قابلیت‌های هوش مصنوعی رونمایی کرد",
    summary:
      "شرکت Meta نسل جدید عینک‌های هوشمند Ray-Ban را معرفی کرد که مجهز به دستیار هوش مصنوعی پیشرفته است و می‌تواند محیط اطراف را تحلیل کرده و اطلاعات مفید ارائه دهد.",
    publishDate: "2025-08-08",
    source: "The Verge",
    url: "https://www.theverge.com",
  },
  {
    id: "5",
    title: "سرمایه‌گذاری ۵۰ میلیارد دلاری در زیرساخت‌های هوش مصنوعی",
    summary:
      "کنسرسیومی از شرکت‌های بزرگ فناوری اعلام کرد که ۵۰ میلیارد دلار برای توسعه زیرساخت‌های هوش مصنوعی شامل مراکز داده و چیپ‌های تخصصی سرمایه‌گذاری خواهند کرد.",
    publishDate: "2025-08-05",
    source: "Reuters",
    url: "https://www.reuters.com",
  },
  {
    id: "6",
    title: "هوش مصنوعی در کشاورزی: افزایش ۴۰ درصدی بهره‌وری محصولات",
    summary:
      "استفاده از سیستم‌های هوش مصنوعی در کشاورزی دقیق منجر به افزایش قابل توجه بهره‌وری و کاهش مصرف آب و کود شده است. این فناوری به کشاورزان کمک می‌کند تا بهترین زمان کاشت و برداشت را تعیین کنند.",
    publishDate: "2025-07-30",
    source: "AgTech News",
    url: "https://www.agtech.com",
  },
  {
    id: "7",
    title: "اتحادیه اروپا استانداردهای جدید امنیت هوش مصنوعی را تصویب کرد",
    summary:
      "پارلمان اروپا مجموعه جامعی از قوانین و استانداردهای امنیتی برای سیستم‌های هوش مصنوعی تصویب کرد که شامل الزامات شفافیت، حسابرسی و حفاظت از حریم خصوصی می‌شود.",
    publishDate: "2025-07-28",
    source: "EU Parliament",
    url: "https://www.europarl.europa.eu",
  },
  {
    id: "8",
    title: "رباتیک هوشمند: ربات‌های خانگی با قابلیت یادگیری خودکار",
    summary:
      "شرکت‌های رباتیک از نسل جدید ربات‌های خانگی رونمایی کردند که قادر به یادگیری عادات ساکنان خانه و انطباق با نیازهای آن‌ها هستند. این ربات‌ها می‌توانند کارهای خانه را به صورت هوشمند انجام دهند.",
    publishDate: "2025-07-25",
    source: "Robotics Today",
    url: "https://www.roboticstoday.com",
  },
]

export default function UpdatedAINewsSection() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage] = useState(1) // Ready for pagination
  const itemsPerPage = 8

  useEffect(() => {
    // Simulate API call for fresh news
    const fetchNews = async () => {
      setLoading(true)
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1200))

      // Sort by date (newest first) and get current page items
      const sortedNews = mockNewsData.sort(
        (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
      )
      const startIndex = (currentPage - 1) * itemsPerPage
      const paginatedNews = sortedNews.slice(startIndex, startIndex + itemsPerPage)

      setNews(paginatedNews)
      setLoading(false)
    }

    fetchNews()
  }, [currentPage])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleReadMore = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  if (loading) {
    return (
      <section className="mobile-section bg-gray-800 mobile-container">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="p-3 sm:p-4 bg-yellow-500 rounded-full animate-pulse">
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
            {[...Array(8)].map((_, index) => (
              <div key={index} className="card animate-pulse">
                <div className="h-4 bg-gray-700 rounded mb-3"></div>
                <div className="h-3 bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-700 rounded mb-4"></div>
                <div className="h-8 bg-gray-700 rounded"></div>
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
            آخرین اخبار و پیشرفت‌های دنیای هوش مصنوعی - تیر و مرداد ۱۴۰۴
          </p>
        </div>

        <div className="mobile-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {news.map((item) => (
            <div
              key={item.id}
              className="card group hover:border-yellow-500 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10"
            >
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

              <p className="text-xs sm:text-sm text-gray-400 persian-body mb-4 sm:mb-6 mobile-text-spacing line-clamp-3 leading-relaxed">
                {item.summary}
              </p>

              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-yellow-400 english-text font-medium">{item.source}</span>
              </div>

              <button
                onClick={() => handleReadMore(item.url)}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded-lg transition-colors duration-200 font-medium persian-body text-sm sm:text-base group-hover:scale-105 transform transition-transform"
              >
                ادامه مطلب
              </button>
            </div>
          ))}
        </div>

        {/* News Stats */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="card bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border-yellow-500/30">
            <p className="text-sm sm:text-base persian-body text-gray-300 mobile-text-spacing">
              نمایش {news.length} خبر از آخرین اخبار هوش مصنوعی
            </p>
            <p className="text-xs sm:text-sm persian-body text-gray-400 mt-2 mobile-text-spacing">
              اخبار به‌روزرسانی روزانه می‌شوند
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
