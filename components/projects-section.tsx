"use client"

import type React from "react"

import { FileText, Edit3, BarChart3, MessageSquare, ImageIcon, Code } from "lucide-react"

interface ProjectsSectionProps {
  onAuthRequired: (action: () => void) => void
}

const projects = [
  {
    id: 1,
    title: "تولید محتوا با AI",
    description: "ایجاد مقالات، پست‌های شبکه‌های اجتماعی و محتوای تبلیغاتی با کمک هوش مصنوعی",
    icon: FileText,
    color: "bg-yellow-500",
    skills: ["پرامپت نویسی", "ChatGPT", "Copy.ai"],
    links: [
      {
        title: "آموزش تولید محتوا با ChatGPT",
        url: "https://www.youtube.com/results?search_query=content+creation+chatgpt+persian",
      },
      { title: "راهنمای Copy.ai", url: "https://www.copy.ai/blog/how-to-use-copyai" },
      { title: "تکنیک‌های پرامپت نویسی", url: "https://www.promptingguide.ai/" },
    ],
  },
  {
    id: 2,
    title: "خلاصه‌سازی و بازنویسی",
    description: "خلاصه‌سازی اسناد، مقالات و بازنویسی متون با حفظ معنا و بهبود کیفیت",
    icon: Edit3,
    color: "bg-orange-500",
    skills: ["تحلیل متن", "Summarization", "Paraphrasing"],
    links: [
      {
        title: "آموزش خلاصه‌سازی با AI",
        url: "https://www.youtube.com/results?search_query=ai+text+summarization+tutorial",
      },
      { title: "ابزارهای بازنویسی متن", url: "https://quillbot.com/" },
      { title: "تکنیک‌های خلاصه‌نویسی", url: "https://blog.grammarly.com/how-to-summarize/" },
    ],
  },
  {
    id: 3,
    title: "تحلیل داده با AI",
    description: "تجزیه و تحلیل داده‌ها، ایجاد گزارش‌های تحلیلی و پیش‌بینی روندها",
    icon: BarChart3,
    color: "bg-amber-500",
    skills: ["Data Analysis", "Python", "Machine Learning"],
    links: [
      { title: "آموزش تحلیل داده با Python", url: "https://www.kaggle.com/learn/python" },
      { title: "دوره یادگیری ماشین", url: "https://www.coursera.org/learn/machine-learning" },
      { title: "ابزارهای تحلیل داده", url: "https://pandas.pydata.org/docs/getting_started/index.html" },
    ],
  },
  {
    id: 4,
    title: "چت‌بات و پشتیبانی",
    description: "طراحی و پیاده‌سازی چت‌بات‌های هوشمند برای خدمات مشتریان",
    icon: MessageSquare,
    color: "bg-yellow-600",
    skills: ["Chatbot Design", "NLP", "Customer Service"],
    links: [
      { title: "آموزش ساخت چت‌بات", url: "https://www.youtube.com/results?search_query=how+to+build+chatbot+tutorial" },
      { title: "پلتفرم Dialogflow", url: "https://cloud.google.com/dialogflow/docs" },
      { title: "راهنمای NLP", url: "https://www.nltk.org/book/" },
    ],
  },
  {
    id: 5,
    title: "تولید تصاویر AI",
    description: "ایجاد تصاویر، لوگو و طراحی‌های گرافیکی با ابزارهای هوش مصنوعی",
    icon: ImageIcon,
    color: "bg-orange-600",
    skills: ["DALL-E", "Midjourney", "Stable Diffusion"],
    links: [
      { title: "آموزش DALL-E", url: "https://openai.com/dall-e-2/" },
      { title: "راهنمای Midjourney", url: "https://docs.midjourney.com/" },
      {
        title: "Stable Diffusion Tutorial",
        url: "https://www.youtube.com/results?search_query=stable+diffusion+tutorial",
      },
    ],
  },
  {
    id: 6,
    title: "اتوماسیون با AI",
    description: "خودکارسازی فرآیندهای کسب و کار و بهینه‌سازی عملیات",
    icon: Code,
    color: "bg-amber-600",
    skills: ["Automation", "API Integration", "Workflow Design"],
    links: [
      { title: "آموزش اتوماسیون", url: "https://zapier.com/learn/automation/" },
      { title: "راهنمای API", url: "https://www.postman.com/api-platform/api-documentation/" },
      { title: "طراحی گردش کار", url: "https://www.lucidchart.com/pages/workflow-design" },
    ],
  },
]

export default function ProjectsSection({ onAuthRequired }: ProjectsSectionProps) {
  const handleProjectClick = (project: (typeof projects)[0]) => {
    onAuthRequired(() => {
      // Open the first link for the project
      if (project.links && project.links.length > 0) {
        window.open(project.links[0].url, "_blank")
      }
    })
  }

  const handleLinkClick = (url: string, e: React.MouseEvent) => {
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

        <div className="mobile-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const Icon = project.icon
            return (
              <div key={project.id} className="card group cursor-pointer" onClick={() => handleProjectClick(project)}>
                <div
                  className={`w-12 h-12 sm:w-16 sm:h-16 ${project.color} rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-200`}
                >
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
                </div>

                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 persian-text group-hover:text-yellow-400 transition-colors duration-200 mobile-heading-spacing">
                  {project.title}
                </h3>

                <p className="text-gray-400 persian-text mb-3 sm:mb-4 leading-relaxed mobile-text-spacing text-sm sm:text-base">
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

                {/* Project Links */}
                <div className="space-y-1 sm:space-y-2">
                  {project.links.slice(0, 2).map((link, index) => (
                    <button
                      key={index}
                      onClick={(e) => handleLinkClick(link.url, e)}
                      className="block w-full text-right text-xs sm:text-sm text-yellow-400 hover:text-yellow-300 transition-colors duration-200 persian-text mobile-text-spacing"
                    >
                      • {link.title}
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
