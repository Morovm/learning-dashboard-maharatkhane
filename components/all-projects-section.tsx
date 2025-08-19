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
import ProtectedLink from "./protected-link"
import DiscoverTalentButton from "./discover-talent-button"
import { useState, useEffect } from 'react'

interface AllProjectsSectionProps {
  onAuthRequired: (action: () => void) => void
}

const allProjects = [
  {
    id: 1,
    title: "تولید محتوای متنی (مقاله نویسی)",
    description: "ایجاد مقالات، پست‌های شبکه‌های اجتماعی و محتوای تبلیغاتی با کمک هوش مصنوعی",
    icon: FileText,
    color: "bg-yellow-500",
    skills: ["پرامپت نویسی", "ChatGPT", "Copy.ai"],
    githubLink: "https://github.com/topics/ai-content-generation",
  },
  {
    id: 2,
    title: "بازنویسی توضیحات محصول برای فروش بیشتر",
    description: "بازنویسی توضیحات محصولات به شکل جذاب‌تر و فروش‌محور با استفاده از تکنیک‌های هوش مصنوعی",
    icon: Edit3,
    color: "bg-orange-500",
    skills: ["تحلیل متن", "Copywriting", "Product Description"],
    githubLink: "https://github.com/topics/product-description-generator",
  },
  {
    id: 3,
    title: "خلاصه سازی مقالات تخصصی",
    description: "خلاصه‌سازی اسناد، مقالات آکادمیک و متون طولانی با حفظ معنا و نکات کلیدی",
    icon: FileEdit,
    color: "bg-orange-600",
    skills: ["Text Summarization", "NLP", "Academic Writing"],
    githubLink: "https://github.com/topics/text-summarization",
  },
  {
    id: 4,
    title: "تولید اینفوگرافیک‌های خلاقانه",
    description: "ایجاد اینفوگرافیک‌های جذاب و آموزنده با استفاده از ابزارهای هوش مصنوعی",
    icon: PieChart,
    color: "bg-blue-500",
    skills: ["Canva AI", "Adobe Firefly", "Infographic Design"],
    githubLink: "https://github.com/topics/infographic-generator",
  },
  {
    id: 5,
    title: "طراحی لوگو برای کسب و کار",
    description: "فرآیند ایجاد لوگوی خلاقانه و حرفه‌ای برای برندها با استفاده از ابزارهای طراحی مبتنی بر هوش مصنوعی",
    icon: Palette,
    color: "bg-purple-500",
    skills: ["LogoAI", "Brandmark", "Design Thinking"],
    githubLink: "https://github.com/topics/logo-design",
  },
  {
    id: 6,
    title: "آنالیز ترندهای شبکه‌های اجتماعی",
    description: "تحلیل و بررسی روندهای محتوایی در شبکه‌های اجتماعی با استفاده از هوش مصنوعی",
    icon: TrendingUp,
    color: "bg-cyan-500",
    skills: ["Social Media Analytics", "Trend Analysis", "Data Mining"],
    githubLink: "https://github.com/agno-agi/agno/blob/main/cookbook/examples/agents/media_trend_analysis_agent.py",
  },
  {
    id: 7,
    title: "مدیریت هوشمند پست‌های اینستاگرامی",
    description: "خودکارسازی تولید، برنامه‌ریزی و انتشار محتوای اینستاگرام با کمک هوش مصنوعی",
    icon: Camera,
    color: "bg-pink-500",
    skills: ["Instagram API", "Content Automation", "Social Media Management"],
    githubLink: "https://github.com/crewAI/crewAI-examples/tree/main/instagram_post",
  },
  {
    id: 8,
    title: "استخراج و تحلیل اطلاعات از وبسایت‌ها",
    description: "جمع‌آوری خودکار داده‌ها از وبسایت‌ها و تحلیل آن‌ها با استفاده از تکنیک‌های هوش مصنوعی",
    icon: Code,
    color: "bg-indigo-500",
    skills: ["Web Scraping", "Data Extraction", "AutoGen"],
    githubLink: "https://github.com/microsoft/autogen/blob/main/notebook/agentchat_web_info.ipynb",
  },
  {
    id: 9,
    title: "تحلیل داده و پیش‌بینی فروش",
    description: "استفاده از مدل‌های هوش مصنوعی برای تحلیل داده‌های فروش و پیش‌بینی روندهای آتی",
    icon: BarChart3,
    color: "bg-emerald-500",
    skills: ["Python", "Pandas", "Scikit-learn", "Forecasting"],
    githubLink: "https://github.com/topics/sales-forecasting",
  },
  {
    id: 10,
    title: "ساخت چت‌بات هوشمند پشتیبانی مشتری",
    description: "طراحی و پیاده‌سازی چت‌بات‌های هوشمند برای پاسخ به سوالات متداول و کمک به کاربران",
    icon: MessageSquare,
    color: "bg-violet-500",
    skills: ["Dialogflow", "Rasa", "Customer Support", "NLP"],
    githubLink: "https://github.com/topics/customer-support-bot",
  },
]

export default function AllProjectsSection({ onAuthRequired }: AllProjectsSectionProps) {
  const [activeTab, setActiveTab] = useState('finalized')
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [showFreelanceModal, setShowFreelanceModal] = useState(false)
  const [communityProjects, setCommunityProjects] = useState([])
  const [freelanceProjects, setFreelanceProjects] = useState([])

  useEffect(() => {
    // Load community projects from localStorage
    const savedCommunityProjects = JSON.parse(localStorage.getItem('communityProjects') || '[]')
    setCommunityProjects(savedCommunityProjects)

    // Load freelance projects from localStorage
    const savedFreelanceProjects = JSON.parse(localStorage.getItem('freelanceProjects') || '[]')
    setFreelanceProjects(savedFreelanceProjects)
  }, [])

  const handleProjectClick = (project: (typeof allProjects)[0]) => {
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
    <section className="py-8 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold persian-heading text-white mb-4 mobile-heading-spacing">
            پروژه‌های هوش مصنوعی
          </h2>
          <p className="text-lg text-gray-300 persian-body max-w-3xl mx-auto mobile-text-spacing">
            مجموعه‌ای از پروژه‌های عملی و کاربردی در حوزه هوش مصنوعی که می‌توانید از آن‌ها الهام بگیرید
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800 rounded-lg p-1 flex gap-1">
            <button
              onClick={() => setActiveTab('finalized')}
              className={`px-4 py-2 rounded-md persian-body transition-colors ${
                activeTab === 'finalized'
                  ? 'bg-yellow-500 text-black font-medium'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              پروژه‌های نهایی شده
            </button>
            <button
              onClick={() => setActiveTab('community')}
              className={`px-4 py-2 rounded-md persian-body transition-colors ${
                activeTab === 'community'
                  ? 'bg-yellow-500 text-black font-medium'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              پروژه‌های عمومی
            </button>
            <button
              onClick={() => setActiveTab('freelance')}
              className={`px-4 py-2 rounded-md persian-body transition-colors ${
                activeTab === 'freelance'
                  ? 'bg-yellow-500 text-black font-medium'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              فرصت‌های فریلنسری
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'finalized' && (
          <div>
            {/* All Projects Grid - No Categories */}
            <div className="mobile-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {allProjects.map((project) => {
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
        )}

        {activeTab === 'community' && (
          <div>
            {/* Placeholder for Community Projects */}
            <div className="mobile-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {communityProjects.length === 0 ? (
                <p className="text-center text-gray-400 persian-text col-span-full">
                  هنوز پروژه‌ای توسط جامعه ثبت نشده است.
                </p>
              ) : (
                communityProjects.map((project: any, index) => (
                  <div key={index} className="card group cursor-pointer" onClick={() => onAuthRequired(() => alert('Community project action'))}>
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 ${project.color || 'bg-gray-600'} rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-200`}>
                      <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 persian-text group-hover:text-yellow-400 transition-colors duration-200 mobile-heading-spacing">
                      {project.title || 'عنوان پروژه'}
                    </h3>
                    <p className="text-gray-400 persian-text mb-3 sm:mb-4 leading-relaxed mobile-text-spacing text-sm sm:text-base line-clamp-3">
                      {project.description || 'توضیحات پروژه'}
                    </p>
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                      {(project.skills || []).map((skill: string, skillIndex: number) => (
                        <span key={skillIndex} className="px-2 py-1 sm:px-3 sm:py-1 bg-gray-700 text-gray-300 rounded-full text-xs sm:text-sm english-text">
                          {skill}
                        </span>
                      ))}
                    </div>
                    {project.link && (
                      <button
                        onClick={(e) => { e.stopPropagation(); window.open(project.link, '_blank'); }}
                        className="w-full text-center text-sm sm:text-base bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-3 rounded-lg transition-colors duration-200 persian-text mobile-text-spacing font-medium"
                      >
                        مشاهده پروژه
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
            <div className="text-center mt-8">
              <button
                onClick={() => setShowProjectModal(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                ثبت پروژه شما
              </button>
            </div>
          </div>
        )}

        {activeTab === 'freelance' && (
          <div>
            {/* Placeholder for Freelance Projects */}
            <div className="mobile-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {freelanceProjects.length === 0 ? (
                <p className="text-center text-gray-400 persian-text col-span-full">
                  هنوز فرصت فریلنسری ثبت نشده است.
                </p>
              ) : (
                freelanceProjects.map((project: any, index) => (
                  <div key={index} className="card group cursor-pointer" onClick={() => onAuthRequired(() => alert('Freelance project action'))}>
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 ${project.color || 'bg-gray-600'} rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-200`}>
                      <Edit3 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 persian-text group-hover:text-yellow-400 transition-colors duration-200 mobile-heading-spacing">
                      {project.title || 'عنوان فرصت'}
                    </h3>
                    <p className="text-gray-400 persian-text mb-3 sm:mb-4 leading-relaxed mobile-text-spacing text-sm sm:text-base line-clamp-3">
                      {project.description || 'توضیحات فرصت'}
                    </p>
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                      {(project.skills || []).map((skill: string, skillIndex: number) => (
                        <span key={skillIndex} className="px-2 py-1 sm:px-3 sm:py-1 bg-gray-700 text-gray-300 rounded-full text-xs sm:text-sm english-text">
                          {skill}
                        </span>
                      ))}
                    </div>
                    {project.link && (
                      <button
                        onClick={(e) => { e.stopPropagation(); window.open(project.link, '_blank'); }}
                        className="w-full text-center text-sm sm:text-base bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-3 rounded-lg transition-colors duration-200 persian-text mobile-text-spacing font-medium"
                      >
                        مشاهده فرصت
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
            <div className="text-center mt-8">
              <button
                onClick={() => setShowFreelanceModal(true)}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                ثبت فرصت فریلنسری جدید
              </button>
            </div>
          </div>
        )}

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

      {/* Modals (Placeholders for now) */}
      {showProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold persian-text text-white">ثبت پروژه جدید</h3>
              <button onClick={() => setShowProjectModal(false)} className="text-gray-400 hover:text-white">&times;</button>
            </div>
            <form>
              <div className="mb-4">
                <label className="block text-sm text-gray-300 mb-1 persian-text">عنوان پروژه</label>
                <input type="text" className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-yellow-500" />
              </div>
              <div className="mb-4">
                <label className="block text-sm text-gray-300 mb-1 persian-text">توضیحات</label>
                <textarea className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-yellow-500" rows={3}></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm text-gray-300 mb-1 persian-text">مهارت‌ها (جدا شده با ویرگول)</label>
                <input type="text" className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-yellow-500" />
              </div>
              <div className="mb-4">
                <label className="block text-sm text-gray-300 mb-1 persian-text">لینک گیت‌هاب (اختیاری)</label>
                <input type="text" className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-yellow-500" />
              </div>
              <div className="mb-4">
                <label className="block text-sm text-gray-300 mb-1 persian-text">رنگ (اختیاری)</label>
                <input type="color" className="w-full p-1 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-yellow-500" defaultValue="#6B7280"/>
              </div>
              <button type="submit" className="w-full bg-yellow-500 text-black py-2 rounded font-semibold hover:bg-yellow-600 transition-colors">
                ثبت پروژه
              </button>
            </form>
          </div>
        </div>
      )}

      {showFreelanceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold persian-text text-white">ثبت فرصت فریلنسری</h3>
              <button onClick={() => setShowFreelanceModal(false)} className="text-gray-400 hover:text-white">&times;</button>
            </div>
            <form>
              <div className="mb-4">
                <label className="block text-sm text-gray-300 mb-1 persian-text">عنوان فرصت</label>
                <input type="text" className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-yellow-500" />
              </div>
              <div className="mb-4">
                <label className="block text-sm text-gray-300 mb-1 persian-text">توضیحات</label>
                <textarea className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-yellow-500" rows={3}></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm text-gray-300 mb-1 persian-text">مهارت‌های مورد نیاز (جدا شده با ویرگول)</label>
                <input type="text" className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-yellow-500" />
              </div>
              <div className="mb-4">
                <label className="block text-sm text-gray-300 mb-1 persian-text">لینک پروژه (اختیاری)</label>
                <input type="text" className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-yellow-500" />
              </div>
              <div className="mb-4">
                <label className="block text-sm text-gray-300 mb-1 persian-text">رنگ (اختیاری)</label>
                <input type="color" className="w-full p-1 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-yellow-500" defaultValue="#6B7280"/>
              </div>
              <button type="submit" className="w-full bg-green-500 text-black py-2 rounded font-semibold hover:bg-green-600 transition-colors">
                ثبت فرصت
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}