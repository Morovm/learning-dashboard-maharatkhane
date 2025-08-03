"use client"

import { useState } from "react"
import { ChevronDown, ExternalLink, FileText, Edit3, ImageIcon, Zap, BarChart3, MessageSquare } from "lucide-react"

interface ProjectsSectionProps {
  onAuthRequired: (action: () => void) => void
}

interface SubProject {
  id: string
  title: string
  githubUrl?: string
}

interface ProjectCategory {
  id: string
  title: string
  icon: any
  color: string
  subProjects: SubProject[]
}

const projectCategories: ProjectCategory[] = [
  {
    id: "content-generation",
    title: "تولید محتوا با AI",
    icon: FileText,
    color: "bg-yellow-500",
    subProjects: [
      {
        id: "article-writing",
        title: "تولید محتوای متنی (مقاله نویسی)",
        githubUrl: "https://github.com/topics/ai-content-generation",
      },
    ],
  },
  {
    id: "summarization-rewriting",
    title: "خلاصه سازی و بازنویسی با AI",
    icon: Edit3,
    color: "bg-orange-500",
    subProjects: [
      {
        id: "product-description",
        title: "بازنویسی توضیحات محصول برای فروش بیشتر",
        githubUrl: "https://github.com/topics/product-description-generator",
      },
      {
        id: "article-summarization",
        title: "خلاصه سازی مقالات تخصصی",
        githubUrl: "https://github.com/topics/text-summarization",
      },
    ],
  },
  {
    id: "image-generation",
    title: "تولید تصاویر",
    icon: ImageIcon,
    color: "bg-purple-500",
    subProjects: [
      {
        id: "infographic-creation",
        title: "تولید اینفوگرافیک‌های خلاقانه",
        githubUrl: "https://github.com/topics/infographic-generator",
      },
      {
        id: "logo-design",
        title: "طراحی لوگو برای کسب و کار",
        githubUrl: "https://github.com/topics/logo-design",
      },
    ],
  },
  {
    id: "automation",
    title: "اتوماسیون",
    icon: Zap,
    color: "bg-blue-500",
    subProjects: [
      {
        id: "social-media-trends",
        title: "آنالیز ترندهای شبکه‌های اجتماعی",
        githubUrl: "https://github.com/agno-agi/agno/blob/main/cookbook/examples/agents/media_trend_analysis_agent.py",
      },
      {
        id: "instagram-management",
        title: "مدیریت هوشمند پست‌های اینستاگرامی",
        githubUrl: "https://github.com/crewAI/crewAI-examples/tree/main/instagram_post",
      },
      {
        id: "web-scraping",
        title: "استخراج و تحلیل اطلاعات از وبسایت‌ها",
        githubUrl: "https://github.com/microsoft/autogen/blob/main/notebook/agentchat_web_info.ipynb",
      },
    ],
  },
  {
    id: "data-analysis",
    title: "تحلیل داده با AI",
    icon: BarChart3,
    color: "bg-green-500",
    subProjects: [
      {
        id: "sales-forecasting",
        title: "تحلیل داده و پیش‌بینی فروش",
        githubUrl: "https://github.com/topics/sales-forecasting",
      },
    ],
  },
  {
    id: "chat-support",
    title: "چت و پشتیبانی",
    icon: MessageSquare,
    color: "bg-indigo-500",
    subProjects: [
      {
        id: "customer-chatbot",
        title: "ساخت چت‌بات هوشمند پشتیبانی مشتری",
        githubUrl: "https://github.com/topics/customer-support-bot",
      },
    ],
  },
]

export default function InteractiveProjectsSection({ onAuthRequired }: ProjectsSectionProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const handleGitHubClick = (url: string) => {
    onAuthRequired(() => {
      window.open(url, "_blank")
    })
  }

  return (
    <section className="mobile-section bg-gray-900 mobile-container">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 persian-text mobile-heading-spacing">
            پروژه‌های هوش مصنوعی
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 persian-text max-w-3xl mx-auto mobile-text-spacing px-2">
            دسته‌بندی پروژه‌های فریلنسری که می‌توانید با کمک هوش مصنوعی انجام دهید
          </p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {projectCategories.map((category) => {
            const Icon = category.icon
            const isExpanded = expandedCategories.includes(category.id)

            return (
              <div key={category.id} className="card overflow-hidden">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center justify-between p-4 sm:p-6 hover:bg-gray-700/50 transition-colors duration-200"
                >
                  <ChevronDown
                    className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-400 transition-transform duration-300 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                  <div className="flex items-center flex-1 mr-3 sm:mr-4">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold persian-heading mobile-heading-spacing">
                      {category.title}
                    </h3>
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 ${category.color} rounded-lg flex items-center justify-center mr-3 sm:mr-4`}
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>
                </button>

                {/* Expandable Sub-projects */}
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="border-t border-gray-700 bg-gray-800/50">
                    <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                      {category.subProjects.map((subProject) => (
                        <div
                          key={subProject.id}
                          className="bg-gray-700/50 rounded-lg p-4 sm:p-5 hover:bg-gray-700 transition-colors duration-200"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                            <h4 className="text-base sm:text-lg font-medium persian-heading mobile-heading-spacing text-gray-100">
                              {subProject.title}
                            </h4>
                            {subProject.githubUrl && (
                              <button
                                onClick={() => handleGitHubClick(subProject.githubUrl!)}
                                className="flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 sm:px-6 sm:py-3 rounded-lg transition-colors duration-200 font-medium persian-body text-sm sm:text-base group"
                              >
                                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:scale-110 transition-transform duration-200" />
                                مشاهده در GitHub
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Usage Tips */}
        <div className="mt-12 sm:mt-16 card bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border-yellow-500/30">
          <h3 className="text-lg sm:text-xl font-semibold persian-heading mb-4 text-center mobile-heading-spacing">
            نکات مهم برای شروع پروژه‌ها
          </h3>
          <div className="mobile-grid grid-cols-1 sm:grid-cols-2 text-sm persian-body text-gray-300">
            <div>
              <h4 className="font-semibold text-yellow-400 mb-2 mobile-heading-spacing">قبل از شروع:</h4>
              <ul className="space-y-1 mobile-text-spacing">
                <li>• کد منبع را مطالعه کنید</li>
                <li>• نیازمندی‌های پروژه را بررسی کنید</li>
                <li>• ابزارهای مورد نیاز را نصب کنید</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-orange-400 mb-2 mobile-heading-spacing">حین توسعه:</h4>
              <ul className="space-y-1 mobile-text-spacing">
                <li>• تست‌های کوچک انجام دهید</li>
                <li>• مستندات را به‌روزرسانی کنید</li>
                <li>• از کامیونیتی کمک بگیرید</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
