"use client"

import type React from "react"
import {
  FileText,
  Edit3,
  BarChart3,
  MessageSquare,
  ImageIcon,
  Code,
  PieChart,
  Palette,
  FileEdit,
  Bot,
  TrendingUp,
  Camera,
} from "lucide-react"

interface ProjectsSectionProps {
  onAuthRequired: (action: () => void) => void
}

const projects = [
  // Original projects
  {
    id: 1,
    title: "تولید محتوا با AI",
    description: "ایجاد مقالات، پست‌های شبکه‌های اجتماعی و محتوای تبلیغاتی با کمک هوش مصنوعی",
    icon: FileText,
    color: "bg-yellow-500",
    skills: ["پرامپت نویسی", "ChatGPT", "Copy.ai"],
    githubLink: "https://github.com/topics/ai-content-generation",
    links: [
      {
        title: "آموزش تولید محتوا با ChatGPT",
        url: "https://www.youtube.com/results?search_query=content+creation+chatgpt+persian",
      },
      { title: "راهنمای Copy.ai", url: "https://www.copy.ai/blog/how-to-use-copyai" },
    ],
  },
  {
    id: 2,
    title: "خلاصه‌سازی و بازنویسی",
    description: "خلاصه‌سازی اسناد، مقالات و بازنویسی متون با حفظ معنا و بهبود کیفیت",
    icon: Edit3,
    color: "bg-orange-500",
    skills: ["تحلیل متن", "Summarization", "Paraphrasing"],
    githubLink: "https://github.com/topics/text-summarization",
    links: [
      {
        title: "آموزش خلاصه‌سازی با AI",
        url: "https://www.youtube.com/results?search_query=ai+text+summarization+tutorial",
      },
      { title: "ابزارهای بازنویسی متن", url: "https://quillbot.com/" },
    ],
  },
  {
    id: 3,
    title: "تحلیل داده با AI",
    description: "تجزیه و تحلیل داده‌ها، ایجاد گزارش‌های تحلیلی و پیش‌بینی روندها",
    icon: BarChart3,
    color: "bg-amber-500",
    skills: ["Data Analysis", "Python", "Machine Learning"],
    githubLink: "https://github.com/topics/data-analysis",
    links: [
      { title: "آموزش تحلیل داده با Python", url: "https://www.kaggle.com/learn/python" },
      { title: "دوره یادگیری ماشین", url: "https://www.coursera.org/learn/machine-learning" },
    ],
  },
  {
    id: 4,
    title: "چت‌بات و پشتیبانی",
    description: "طراحی و پیاده‌سازی چت‌بات‌های هوشمند برای خدمات مشتریان",
    icon: MessageSquare,
    color: "bg-yellow-600",
    skills: ["Chatbot Design", "NLP", "Customer Service"],
    githubLink: "https://github.com/topics/chatbot",
    links: [
      { title: "آموزش ساخت چت‌بات", url: "https://www.youtube.com/results?search_query=how+to+build+chatbot+tutorial" },
      { title: "پلتفرم Dialogflow", url: "https://cloud.google.com/dialogflow/docs" },
    ],
  },
  {
    id: 5,
    title: "تولید تصاویر AI",
    description: "ایجاد تصاویر، لوگو و طراحی‌های گرافیکی با ابزارهای هوش مصنوعی",
    icon: ImageIcon,
    color: "bg-orange-600",
    skills: ["DALL-E", "Midjourney", "Stable Diffusion"],
    githubLink: "https://github.com/topics/ai-art",
    links: [
      { title: "آموزش DALL-E", url: "https://openai.com/dall-e-2/" },
      { title: "راهنمای Midjourney", url: "https://docs.midjourney.com/" },
    ],
  },
  {
    id: 6,
    title: "اتوماسیون با AI",
    description: "خودکارسازی فرآیندهای کسب و کار و بهینه‌سازی عملیات",
    icon: Code,
    color: "bg-amber-600",
    skills: ["Automation", "API Integration", "Workflow Design"],
    githubLink: "https://github.com/topics/automation",
    links: [
      { title: "آموزش اتوماسیون", url: "https://zapier.com/learn/automation/" },
      { title: "راهنمای API", url: "https://www.postman.com/api-platform/api-documentation/" },
    ],
  },
  // New projects
  {
    id: 7,
    title: "تولید اینفوگرافیک با هوش مصنوعی",
    description: "ایجاد اینفوگرافیک‌های جذاب و آموزنده با استفاده از ابزارهای هوش مصنوعی، مثل موضوع صرفه‌جویی در مصرف آب",
    icon: PieChart,
    color: "bg-blue-500",
    skills: ["Canva AI", "Adobe Firefly", "Infographic Design"],
    githubLink: "https://github.com/topics/infographic-generator",
    links: [
      { title: "آموزش طراحی اینفوگرافیک", url: "https://www.canva.com/learn/infographic-design/" },
      { title: "ابزارهای AI برای طراحی", url: "https://www.adobe.com/products/firefly.html" },
    ],
  },
  {
    id: 8,
    title: "طراحی لوگو با هوش مصنوعی",
    description: "فرآیند ایجاد لوگوی خلاقانه و حرفه‌ای برای برندها با استفاده از ابزارهای طراحی مبتنی بر هوش مصنوعی",
    icon: Palette,
    color: "bg-purple-500",
    skills: ["LogoAI", "Brandmark", "Design Thinking"],
    githubLink: "https://github.com/topics/logo-design",
    links: [
      { title: "آموزش طراحی لوگو", url: "https://www.logoai.com/blog/logo-design-guide" },
      { title: "ابزارهای طراحی لوگو", url: "https://brandmark.io/" },
    ],
  },
  {
    id: 9,
    title: "تولید محتوای متنی (مقاله نویسی)",
    description:
      "پروژه‌ای متمرکز بر استفاده از مدل‌های زبانی بزرگ برای تولید مقالات و پست‌های بلاگ باکیفیت در موضوعات مختلف",
    icon: FileEdit,
    color: "bg-green-500",
    skills: ["GPT-4", "Claude", "Content Strategy"],
    githubLink: "https://github.com/topics/content-writing",
    links: [
      { title: "راهنمای نوشتن مقاله", url: "https://blog.hubspot.com/marketing/how-to-write-blog-post" },
      { title: "استراتژی محتوا", url: "https://contentmarketinginstitute.com/" },
    ],
  },
  {
    id: 10,
    title: "بازنویسی و خلاصه سازی متن",
    description:
      "نمایش استفاده از هوش مصنوعی برای بازنویسی توضیحات محصولات به شکل جذاب‌تر یا خلاصه‌سازی مقالات آکادمیک طولانی",
    icon: Edit3,
    color: "bg-indigo-500",
    skills: ["Text Processing", "NLP", "Content Optimization"],
    githubLink: "https://github.com/topics/text-rewriting",
    links: [
      { title: "ابزارهای بازنویسی", url: "https://www.grammarly.com/blog/rewriting-tools/" },
      { title: "تکنیک‌های خلاصه‌نویسی", url: "https://www.scribbr.com/working-with-sources/how-to-summarize/" },
    ],
  },
  {
    id: 11,
    title: "ساخت چت بات پشتیبانی مشتری",
    description: "پروژه فریلنسری رایج شامل ساخت چت‌بات هوشمند برای وب‌سایت جهت پاسخ به سوالات متداول و کمک به کاربران",
    icon: Bot,
    color: "bg-cyan-500",
    skills: ["Dialogflow", "Rasa", "Customer Support"],
    githubLink: "https://github.com/topics/customer-support-bot",
    links: [
      { title: "آموزش ساخت چت‌بات", url: "https://cloud.google.com/dialogflow/es/docs/tutorials" },
      { title: "پلتفرم Rasa", url: "https://rasa.com/docs/" },
    ],
  },
  {
    id: 12,
    title: "تحلیل داده و پیش بینی فروش",
    description:
      "پروژه‌ای که نحوه استفاده از مدل‌های هوش مصنوعی/یادگیری ماشین برای تحلیل داده‌های فروش و پیش‌بینی روندهای آتی را نشان می‌دهد",
    icon: TrendingUp,
    color: "bg-emerald-500",
    skills: ["Python", "Pandas", "Scikit-learn", "Forecasting"],
    githubLink: "https://github.com/topics/sales-forecasting",
    links: [
      { title: "آموزش پیش‌بینی فروش", url: "https://www.kaggle.com/learn/time-series" },
      { title: "تحلیل داده با Python", url: "https://pandas.pydata.org/docs/getting_started/tutorials.html" },
    ],
  },
  {
    id: 13,
    title: "پردازش تصویر (شناسایی اشیا)",
    description:
      "نمونه پروژه بینایی کامپیوتر که در آن مدل هوش مصنوعی برای شناسایی و برچسب‌گذاری اشیا در تصاویر آموزش داده می‌شود",
    icon: Camera,
    color: "bg-rose-500",
    skills: ["OpenCV", "TensorFlow", "Computer Vision", "YOLO"],
    githubLink: "https://github.com/topics/object-detection",
    links: [
      { title: "آموزش OpenCV", url: "https://opencv.org/courses/" },
      { title: "راهنمای YOLO", url: "https://pjreddie.com/darknet/yolo/" },
    ],
  },
]

export default function ExpandedProjectsSection({ onAuthRequired }: ProjectsSectionProps) {
  const handleProjectClick = (project: (typeof projects)[0]) => {
    onAuthRequired(() => {
      if (project.githubLink) {
        window.open(project.githubLink, "_blank")
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

        <div className="mobile-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project) => {
            const Icon = project.icon
            return (
              <div key={project.id} className="card group cursor-pointer" onClick={() => handleProjectClick(project)}>
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

                {/* GitHub Link */}
                <div className="mb-2">
                  <button
                    onClick={(e) => handleLinkClick(project.githubLink, e)}
                    className="w-full text-center text-sm sm:text-base bg-gray-700 hover:bg-gray-600 text-yellow-400 hover:text-yellow-300 py-2 px-3 rounded-lg transition-colors duration-200 persian-text mobile-text-spacing"
                  >
                    لینک گیت‌هاب
                  </button>
                </div>

                {/* Additional Links */}
                {project.links && (
                  <div className="space-y-1">
                    {project.links.slice(0, 1).map((link, index) => (
                      <button
                        key={index}
                        onClick={(e) => handleLinkClick(link.url, e)}
                        className="block w-full text-right text-xs sm:text-sm text-gray-400 hover:text-yellow-300 transition-colors duration-200 persian-text mobile-text-spacing"
                      >
                        • {link.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
