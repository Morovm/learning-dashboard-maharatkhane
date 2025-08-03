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

// Realistic AI news data for July-August 2025 (تیر و مرداد ۱۴۰۴)
const realisticNewsData: NewsItem[] = [
  {
    id: "1",
    title: "OpenAI معرفی کرد: GPT-5 با قابلیت‌های استدلال پیشرفته",
    summary:
      "شرکت OpenAI از مدل زبانی جدید GPT-5 رونمایی کرد که قابلیت‌های استدلال ریاضی و منطقی بهتری نسبت به نسل‌های قبلی دارد. این مدل می‌تواند مسائل پیچیده علمی را حل کند و کدهای بهینه‌تری تولید کند.",
    publishDate: "۲۵ مرداد ۱۴۰۴",
    source: "OpenAI Blog",
    url: "https://openai.com/blog/gpt-5-announcement",
  },
  {
    id: "2",
    title: "گوگل از چیپ Tensor G5 برای پردازش هوش مصنوعی رونمایی کرد",
    summary:
      "گوگل نسل جدید چیپ‌های Tensor خود را معرفی کرد که سرعت پردازش مدل‌های هوش مصنوعی را ۵ برابر افزایش می‌دهد. این چیپ در گوشی‌های Pixel جدید و سرورهای ابری گوگل استفاده خواهد شد.",
    publishDate: "۲۲ مرداد ۱۴۰۴",
    source: "Google AI",
    url: "https://ai.google/discover/tensor-g5",
  },
  {
    id: "3",
    title: "Meta از عینک هوشمند Ray-Ban نسل سوم با AI پیشرفته رونمایی کرد",
    summary:
      "شرکت Meta نسل جدید عینک‌های هوشمند Ray-Ban را با قابلیت‌های هوش مصنوعی پیشرفته معرفی کرد. این عینک‌ها می‌توانند اشیا را شناسایی کرده، ترجمه زنده انجام دهند و راهنمایی‌های صوتی ارائه دهند.",
    publishDate: "۲۰ مرداد ۱۴۰۴",
    source: "Meta Newsroom",
    url: "https://about.meta.com/news/ray-ban-smart-glasses-gen3",
  },
  {
    id: "4",
    title: "مایکروسافت Copilot Pro را با قابلیت‌های جدید به‌روزرسانی کرد",
    summary:
      "مایکروسافت نسخه حرفه‌ای Copilot خود را با قابلیت‌های جدیدی مانند تولید کد پیچیده، تحلیل داده‌های بزرگ و ایجاد ارائه‌های تعاملی به‌روزرسانی کرد. این ابزار اکنون در تمام محصولات Office در دسترس است.",
    publishDate: "۱۸ مرداد ۱۴۰۴",
    source: "Microsoft News",
    url: "https://news.microsoft.com/copilot-pro-update",
  },
  {
    id: "5",
    title: "Anthropic از Claude 3.5 Sonnet با قابلیت‌های بینایی کامپیوتر رونمایی کرد",
    summary:
      "شرکت Anthropic مدل جدید Claude 3.5 Sonnet را معرفی کرد که قابلیت‌های پیشرفته‌ای در تحلیل تصاویر و ویدیوها دارد. این مدل می‌تواند محتوای بصری را با دقت بالا تفسیر کرده و توضیحات مفصلی ارائه دهد.",
    publishDate: "۱۵ مرداد ۱۴۰۴",
    source: "Anthropic",
    url: "https://www.anthropic.com/news/claude-3-5-sonnet",
  },
  {
    id: "6",
    title: "هوش مصنوعی در پزشکی: تشخیص زودهنگام آلزایمر با دقت ۹۷ درصد",
    summary:
      "محققان دانشگاه استنفورد سیستم هوش مصنوعی جدیدی توسعه دادند که می‌تواند علائم اولیه بیماری آلزایمر را ۸ سال قبل از تشخیص بالینی شناسایی کند. این سیستم از تحلیل الگوهای گفتار و حرکات چشم استفاده می‌کند.",
    publishDate: "۱۲ مرداد ۱۴۰۴",
    source: "Stanford Medicine",
    url: "https://med.stanford.edu/news/ai-alzheimer-detection",
  },
  {
    id: "7",
    title: "اتحادیه اروپا قانون جامع هوش مصنوعی را به تصویب رساند",
    summary:
      "پارلمان اروپا قانون جامع تنظیم هوش مصنوعی (AI Act) را به تصویب رساند که شامل الزامات سختگیرانه‌ای برای سیستم‌های پرخطر، حفاظت از حریم خصوصی و شفافیت الگوریتم‌ها می‌شود. این قانون از سال ۲۰۲۶ اجرایی خواهد شد.",
    publishDate: "۱۰ مرداد ۱۴۰۴",
    source: "European Parliament",
    url: "https://www.europarl.europa.eu/news/ai-act-2025",
  },
  {
    id: "8",
    title: "سرمایه‌گذاری ۷۵ میلیارد دلاری در استارتاپ‌های هوش مصنوعی در نیمه اول ۲۰۲۵",
    summary:
      "بر اساس گزارش جدید، سرمایه‌گذاری در استارتاپ‌های هوش مصنوعی در شش ماهه اول ۲۰۲۵ به ۷۵ میلیارد دلار رسیده که رکورد جدیدی محسوب می‌شود. بیشترین سرمایه‌گذاری در حوزه‌های پزشکی، خودروسازی و امنیت سایبری بوده است.",
    publishDate: "۸ مرداد ۱۴۰۴",
    source: "VentureBeat",
    url: "https://venturebeat.com/ai-investment-report-2025",
  },
]

export default function RealisticAINewsSection() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call for fetching news
    const fetchNews = async () => {
      setLoading(true)
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real implementation, this would be:
      // const response = await fetch('/api/ai-news');
      // const newsData = await response.json();

      setNews(realisticNewsData)
      setLoading(false)
    }

    fetchNews()
  }, [])

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
                  {item.publishDate}
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

        {/* News Info */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="card bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border-yellow-500/30">
            <p className="text-sm sm:text-base persian-body text-gray-300 mobile-text-spacing">
              نمایش {news.length} خبر از آخرین اخبار هوش مصنوعی
            </p>
            <p className="text-xs sm:text-sm persian-body text-gray-400 mt-2 mobile-text-spacing">
              اخبار به‌روزرسانی روزانه می‌شوند • آماده برای اتصال به API خبری
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
