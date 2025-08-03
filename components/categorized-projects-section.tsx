"use client"

import type React from "react"
import {
  FileText,
  Edit3,
  BarChart3,
  MessageSquare,
  Code,
  PieChart,
  Palette,
  FileEdit,
  TrendingUp,
  Camera,
} from "lucide-react"

interface ProjectsSectionProps {
  onAuthRequired: (action: () => void) => void
}

const projects = [
  // تولید محتوا با AI
  {
    id: 1,
    title: "تولید محتوای متنی (مقاله نویسی)",
    description: "ایجاد مقالات، پست‌های شبکه‌های اجتماعی و محتوای تبلیغاتی با کمک هوش مصنوعی",
    icon: FileText,
    color: "bg-yellow-500",
    skills: ["پرامپت نویسی", "ChatGPT", "Copy.ai"],
    githubLink: "https://github.com/topics/ai-content-generation",
    category: "تولید محتوا با AI",
  },

  // خلاصه سازی و بازنویسی با AI
  {
    id: 2,
    title: "بازنویسی توضیحات محصول برای فروش بیشتر",
    description: "بازنویسی توضیحات محصولات به شکل جذاب‌تر و فروش‌محور با استفاده از تکنیک‌های هوش مصنوعی",
    icon: Edit3,
    color: "bg-orange-500",
    skills: ["تحلیل متن", "Copywriting", "Product Description"],
    githubLink: "https://github.com/topics/product-description-generator",
    category: "خلاصه سازی و بازنویسی با AI",
  },
  {
    id: 3,
    title: "خلاصه سازی مقالات تخصصی",
    description: "خلاصه‌سازی اسناد، مقالات آکادمیک و متون طولانی با حفظ معنا و نکات کلیدی",
    icon: FileEdit,
    color: "bg-orange-600",
    skills: ["Text Summarization", "NLP", "Academic Writing"],
    githubLink: "https://github.com/topics/text-summarization",
    category: "خلاصه سازی و بازنویسی با AI",
  },

  // تولید تصاویر
  {
    id: 4,
    title: "تولید اینفوگرافیک‌های خلاقانه",
    description: "ایجاد اینفوگرافیک‌های جذاب و آموزنده با استفاده از ابزارهای هوش مصنوعی",
    icon: PieChart,
    color: "bg-blue-500",
    skills: ["Canva AI", "Adobe Firefly", "Infographic Design"],
    githubLink: "https://github.com/topics/infographic-generator",
    category: "تولید تصاویر",
  },
  {
    id: 5,
    title: "طراحی لوگو برای کسب و کار",
    description: "فرآیند ایجاد لوگوی خلاقانه و حرفه‌ای برای برندها با استفاده از ابزارهای طراحی مبتنی بر هوش مصنوعی",
    icon: Palette,
    color: "bg-purple-500",
    skills: ["LogoAI", "Brandmark", "Design Thinking"],
    githubLink: "https://github.com/topics/logo-design",
    category: "تولید تصاویر",
  },

  // اتوماسیون
  {
    id: 6,
    title: "آنالیز ترندهای شبکه‌های اجتماعی",
    description: "تحلیل و بررسی روندهای محتوایی در شبکه‌های اجتماعی با استفاده از هوش مصنوعی",
    icon: TrendingUp,
    color: "bg-cyan-500",
    skills: ["Social Media Analytics", "Trend Analysis", "Data Mining"],
    githubLink: "https://github.com/agno-agi/agno/blob/main/cookbook/examples/agents/media_trend_analysis_agent.py",
    category: "اتوماسیون",
  },
  {
    id: 7,
    title: "مدیریت هوشمند پست‌های اینستاگرامی",
    description: "خودکارسازی تولید، برنامه‌ریزی و انتشار محتوای اینستاگرام با کمک هوش مصنوعی",
    icon: Camera,
    color: "bg-pink-500",
    skills: ["Instagram API", "Content Automation", "Social Media Management"],
    githubLink: "https://github.com/crewAI/crewAI-examples/tree/main/instagram_post",
    category: "اتوماسیون",
  },
  {
    id: 8,
    title: "استخراج و تحلیل اطلاعات از وبسایت‌ها",
    description: "جمع‌آوری خودکار داده‌ها از وبسایت‌ها و تحلیل آن‌ها با استفاده از تکنیک‌های هوش مصنوعی",
    icon: Code,
    color: "bg-indigo-500",
    skills: ["Web Scraping", "Data Extraction", "AutoGen"],
    githubLink: "https://github.com/microsoft/autogen/blob/main/notebook/agentchat_web_info.ipynb",
    category: "اتوماسیون",
  },

  // تحلیل داده با AI
  {
    id: 9,
    title: "تحلیل داده و پیش‌بینی فروش",
    description: "استفاده از مدل‌های هوش مصنوعی برای تحلیل داده‌های فروش و پیش‌بینی روندهای آتی",
    icon: BarChart3,
    color: "bg-emerald-500",
    skills: ["Python", "Pandas", "Scikit-learn", "Forecasting"],
    githubLink: "https://github.com/topics/sales-forecasting",
    category: "تحلیل داده با AI",
  },

  // چت و پشتیبانی
  {
    id: 10,
    title: "ساخت چت‌بات هوشمند پشتیبانی مشتری",
    description: "طراحی و پیاده‌سازی چت‌بات‌های هوشمند برای پاسخ به سوالات متداول و کمک به کاربران",
    icon: MessageSquare,
    color: "bg-violet-500",
    skills: ["Dialogflow", "Rasa", "Customer Support", "NLP"],
    githubLink: "https://github.com/topics/customer-support-bot",
    category: "چت و پشتیبانی",
  },
]

// Group projects by category
const groupedProjects = projects.reduce(
  (acc, project) => {
    if (!acc[project.category]) {
      acc[project.category] = []
    }
    acc[project.category].push(project)
    return acc
  },
  {} as Record<string, typeof projects>,
)

export default function CategorizedProjectsSection({ onAuthRequired }: ProjectsSectionProps) {
  const handleProjectClick = (project: (typeof projects)[0]) => {
    onAuthRequired(() => {
      if (project.githubLink) {
        window.open(project.githubLink, "_blank")
      }
    })
  }

  const handleGitHubClick = (url: string, e: React.MouseEvent) => {
    e.stopPropagation()
    window.open(url, "_blank")
  }

  return (
    <section className="mobile-section bg-gray-900 mobile-container">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 persian-text mobile-heading-spacing">
            پروژه‌های هوش مصنوعی
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 persian-text max-w-3xl mx-auto mobile-text-spacing px-2">
            انواع پروژه‌های فریلنسری که می‌توانید با کمک هوش مصنوعی انجام دهید
          </p>
        </div>

        {/* Render projects grouped by category */}
        {Object.entries(groupedProjects).map(([categoryName, categoryProjects]) => (
          <div key={categoryName} className="mb-12 sm:mb-16">
            {/* Category Header */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl font-semibold persian-heading text-yellow-400 mb-2 mobile-heading-spacing">
                {categoryName}
              </h3>
              <div className="w-16 sm:w-20 h-1 bg-yellow-500 rounded"></div>
            </div>

            {/* Category Projects Grid */}
            <div className="mobile-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categoryProjects.map((project) => {
                const Icon = project.icon
                return (
                  <div
                    key={project.id}
                    className="card group cursor-pointer"
                    onClick={() => handleProjectClick(project)}
                  >
                    <div
                      className={`w-12 h-12 sm:w-16 sm:h-16 ${project.color} rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-200`}
                    >
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>

                    <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 persian-text group-hover:text-yellow-400 transition-colors duration-200 mobile-heading-spacing">
                      {project.title}
                    </h3>

                    <p className="text-gray-400 persian-text mb-3 sm:mb-4 leading-relaxed mobile-text-spacing text-sm sm:text-base line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                      {project.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 sm:px-3 sm:py-1 bg-gray-700 text-gray-300 rounded-full text-xs sm:text-sm english-text"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* GitHub Link Button */}
                    {project.githubLink && (
                      <button
                        onClick={(e) => handleGitHubClick(project.githubLink, e)}
                        className="w-full text-center text-sm sm:text-base bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-3 rounded-lg transition-colors duration-200 persian-text mobile-text-spacing font-medium"
                      >
                        مشاهده در GitHub
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

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
