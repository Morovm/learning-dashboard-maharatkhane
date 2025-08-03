"use client"

import { useState, useEffect } from "react"
import { Calendar, ExternalLink, Newspaper, AlertCircle } from "lucide-react"

interface NewsItem {
  id: string
  title: string
  summary: string
  publishDate: string
  source: string
  url: string
  image?: string
}

export default function RealAINewsSection() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFallback, setIsFallback] = useState(false)

  useEffect(() => {
    const fetchRealNews = async () => {
      setLoading(true)
      setError(null)

      try {
        console.log("Starting to fetch AI news...")

        const response = await fetch("/api/ai-news", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // Add timeout for client-side request
          signal: AbortSignal.timeout(15000), // 15 second timeout
        })

        console.log("API Response status:", response.status)

        if (!response.ok) {
          const errorText = await response.text()
          console.error("API Response error:", errorText)
          throw new Error(`HTTP ${response.status}: ${errorText}`)
        }

        const data = await response.json()
        console.log("API Response data:", data)

        if (data.articles && Array.isArray(data.articles)) {
          setNews(data.articles)
          setIsFallback(data.fallback || false)

          if (data.fallback) {
            setError("استفاده از اخبار پیش‌فرض به دلیل عدم دسترسی به API")
          }
        } else {
          throw new Error("Invalid response format")
        }
      } catch (err) {
        console.error("Error fetching news:", err)

        let errorMessage = "خطا در دریافت اخبار"
        if (err instanceof Error) {
          errorMessage = err.message
        }

        setError(errorMessage)
        setIsFallback(true)

        // Local fallback if API completely fails
        const localFallback: NewsItem[] = [
          {
            id: "local-1",
            title: "هوش مصنوعی در حال تغییر دنیای فناوری",
            summary:
              "پیشرفت‌های اخیر در حوزه هوش مصنوعی نشان می‌دهد که این فناوری به سرعت در حال تبدیل شدن به بخش جدایی‌ناپذیر زندگی روزمره ما است.",
            publishDate: new Date().toLocaleDateString("fa-IR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            source: "فناوری امروز",
            url: "#",
          },
          {
            id: "local-2",
            title: "رشد استفاده از چت‌بات‌ها در کسب و کارها",
            summary:
              "شرکت‌ها به طور فزاینده‌ای از چت‌بات‌های مبتنی بر هوش مصنوعی برای بهبود خدمات مشتریان و افزایش بهره‌وری استفاده می‌کنند.",
            publishDate: new Date(Date.now() - 86400000).toLocaleDateString("fa-IR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            source: "کسب و کار دیجیتال",
            url: "#",
          },
        ]

        setNews(localFallback)
      } finally {
        setLoading(false)
      }
    }

    fetchRealNews()

    // Set up interval to refresh news every hour (3600000 milliseconds)
    const intervalId = setInterval(fetchRealNews, 3600000)

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId)
  }, [])

  const handleReadMore = (url: string) => {
    if (url !== "#") {
      window.open(url, "_blank", "noopener,noreferrer")
    }
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
              در حال دریافت آخرین اخبار هوش مصنوعی...
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
            آخرین اخبار و پیشرفت‌های دنیای هوش مصنوعی
          </p>

          {/* Error/Status Message */}
          {(error || isFallback) && (
            <div className="mt-4 flex items-center justify-center">
              <div className="flex items-center bg-orange-900/30 border border-orange-500/50 rounded-lg px-4 py-2">
                <AlertCircle className="w-4 h-4 text-orange-400 ml-2" />
                <span className="text-sm text-orange-300 persian-body">{isFallback ? "نمایش اخبار نمونه" : error}</span>
              </div>
            </div>
          )}
        </div>

        <div className="mobile-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {news.map((item) => (
            <div
              key={item.id}
              className="card group hover:border-yellow-500 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10"
            >
              {item.image && (
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-32 sm:h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = "none"
                    }}
                  />
                </div>
              )}

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
      </div>
    </section>
  )
}
