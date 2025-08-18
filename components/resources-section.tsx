"use client"

import { ExternalLink, PenToolIcon as Tool, Users, BookOpen, Zap } from "lucide-react"

interface ResourcesSectionProps {
  onAuthRequired: (action: () => void) => void
}

const resourceCategories = [
  {
    title: "ابزارهای هوش مصنوعی",
    icon: Tool,
    color: "bg-yellow-500",
    resources: [
      {
        title: "ChatGPT",
        description: "قدرتمندترین مدل زبانی برای تولید متن و مکالمه",
        url: "https://chat.openai.com",
        type: "tool",
      },
      {
        title: "Claude AI",
        description: "دستیار هوشمند برای تحلیل و نوشتن محتوا",
        url: "https://claude.ai",
        type: "tool",
      },
      {
        title: "Midjourney",
        description: "تولید تصاویر هنری با کیفیت بالا",
        url: "https://midjourney.com",
        type: "tool",
      },
    ],
  },
  {
    title: "منابع آموزشی",
    icon: BookOpen,
    color: "bg-orange-500",
    resources: [
      {
        title: "Coursera AI Courses",
        description: "دوره‌های تخصصی هوش مصنوعی از دانشگاه‌های معتبر",
        url: "https://www.coursera.org/courses?query=artificial%20intelligence",
        type: "education",
      },
      {
        title: "Fast.ai",
        description: "آموزش عملی یادگیری عمیق برای همه",
        url: "https://www.fast.ai",
        type: "education",
      },
      {
        title: "Hugging Face",
        description: "پلتفرم مدل‌های متن‌باز و آموزش‌های عملی",
        url: "https://huggingface.co/learn",
        type: "education",
      },
    ],
  },
  {
    title: "جوامع و انجمن‌ها",
    icon: Users,
    color: "bg-amber-500",
    resources: [
      {
        title: "Reddit r/MachineLearning",
        description: "بحث‌ها و اخبار جدید در حوزه یادگیری ماشین",
        url: "https://www.reddit.com/r/MachineLearning/",
        type: "community",
      },
      {
        title: "AI Twitter Community",
        description: "دنبال کردن متخصصان و اخبار روز",
        url: "https://twitter.com/search?q=%23AI%20%23MachineLearning",
        type: "community",
      },
      {
        title: "Stack Overflow AI",
        description: "پرسش و پاسخ تخصصی در زمینه هوش مصنوعی",
        url: "https://stackoverflow.com/questions/tagged/artificial-intelligence",
        type: "community",
      },
    ],
  },
  {
    title: "ابزارهای کمکی",
    icon: Zap,
    color: "bg-yellow-600",
    resources: [
      {
        title: "GitHub Copilot",
        description: "دستیار برنامه‌نویسی مبتنی بر هوش مصنوعی",
        url: "https://github.com/features/copilot",
        type: "tool",
      },
      {
        title: "Notion AI",
        description: "نوشتن و سازماندهی محتوا با کمک AI",
        url: "https://www.notion.so/product/ai",
        type: "tool",
      },
      {
        title: "Grammarly",
        description: "بهبود نگارش و ویرایش متون انگلیسی",
        url: "https://www.grammarly.com",
        type: "tool",
      },
    ],
  },
]

export default function ResourcesSection({ onAuthRequired }: ResourcesSectionProps) {
  const handleResourceClick = (url: string, title: string) => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      // Restrict YouTube links
      onAuthRequired(() => {
        window.open(url, "_blank")
      })
    } else {
      // Allow other links
      window.open(url, "_blank")
    }
  }

  return (
    <section className="mobile-section bg-gray-900 mobile-container">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 persian-heading mobile-heading-spacing">
            منابع مفید
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 persian-body max-w-3xl mx-auto mobile-text-spacing px-2">
            ابزارها، منابع آموزشی و جوامعی که در مسیر یادگیری به شما کمک می‌کنند
          </p>
        </div>

        <div className="mobile-grid grid-cols-1 md:grid-cols-2">
          {resourceCategories.map((category, categoryIndex) => {
            const CategoryIcon = category.icon
            return (
              <div key={categoryIndex} className="card">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 ${category.color} rounded-lg flex items-center justify-center ml-3 sm:ml-4`}
                  >
                    <CategoryIcon className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold persian-heading mobile-heading-spacing">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {category.resources.map((resource, resourceIndex) => (
                    <button
                      key={resourceIndex}
                      onClick={() => handleResourceClick(resource.url, resource.title)}
                      className="block w-full p-3 sm:p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200 group text-right"
                    >
                      <div className="flex items-start justify-between">
                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-yellow-400 transition-colors duration-200 mt-1" />
                        <div className="flex-1 mr-2 sm:mr-3">
                          <h4 className="font-semibold english-text mb-1 group-hover:text-yellow-400 transition-colors duration-200 text-sm sm:text-base mobile-heading-spacing">
                            {resource.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-400 persian-body leading-relaxed mobile-text-spacing">
                            {resource.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Additional Tips */}
        <div className="mt-12 sm:mt-16 card bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border-yellow-500/30">
          <h3 className="text-lg sm:text-xl font-semibold persian-heading mb-3 sm:mb-4 text-center mobile-heading-spacing">
            نکات مهم برای استفاده از منابع
          </h3>
          <div className="mobile-grid grid-cols-1 md:grid-cols-2 text-xs sm:text-sm persian-body text-gray-300">
            <div>
              <h4 className="font-semibold text-yellow-400 mb-2 mobile-heading-spacing">برای مبتدیان:</h4>
              <ul className="space-y-1 mobile-text-spacing">
                <li>• ابتدا با ابزارهای رایگان شروع کنید</li>
                <li>• در جوامع آنلاین فعال باشید</li>
                <li>• پروژه‌های کوچک انجام دهید</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-orange-400 mb-2 mobile-heading-spacing">برای پیشرفته:</h4>
              <ul className="space-y-1 mobile-text-spacing">
                <li>• API های مختلف را تست کنید</li>
                <li>• در پروژه‌های متن‌باز مشارکت کنید</li>
                <li>• تجربیات خود را به اشتراک بگذارید</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
