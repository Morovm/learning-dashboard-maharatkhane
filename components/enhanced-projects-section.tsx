"use client"

import { useState, useEffect } from "react"
import { 
  FileText, Edit3, BarChart3, MessageSquare, Code, PieChart, 
  Palette, FileEdit, TrendingUp, Camera, Plus, ExternalLink,
  CheckCircle, Building, DollarSign, Mail
} from "lucide-react"

interface ProjectsSectionProps {
  onAuthRequired: (action: () => void) => void
  isAuthenticated: boolean
}

interface CommunityProject {
  id: string
  title: string
  description: string
  githubLink: string
  author: string
  submittedAt: string
}

interface FreelanceProject {
  id: string
  title: string
  company?: string
  description: string
  budget?: string
  contactEmail: string
  postedAt: string
}

const finalizedProjects = [
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
    title: "تحلیل داده و پیش‌بینی فروش",
    description: "استفاده از مدل‌های هوش مصنوعی برای تحلیل داده‌های فروش و پیش‌بینی روندهای آتی",
    icon: BarChart3,
    color: "bg-emerald-500",
    skills: ["Python", "Pandas", "Scikit-learn", "Forecasting"],
    githubLink: "https://github.com/topics/sales-forecasting",
  }
]

export default function EnhancedProjectsSection({ onAuthRequired, isAuthenticated }: ProjectsSectionProps) {
  const [activeTab, setActiveTab] = useState("finalized")
  const [showCommunityModal, setShowCommunityModal] = useState(false)
  const [showFreelanceModal, setShowFreelanceModal] = useState(false)
  const [communityProjects, setCommunityProjects] = useState<CommunityProject[]>([])
  const [freelanceProjects, setFreelanceProjects] = useState<FreelanceProject[]>([])
  
  // Community project form
  const [communityForm, setCommunityForm] = useState({
    title: "",
    description: "",
    githubLink: ""
  })
  
  // Freelance project form
  const [freelanceForm, setFreelanceForm] = useState({
    title: "",
    company: "",
    description: "",
    budget: "",
    contactEmail: ""
  })

  useEffect(() => {
    // Load community projects from localStorage
    const savedCommunityProjects = localStorage.getItem("communityProjects")
    if (savedCommunityProjects) {
      setCommunityProjects(JSON.parse(savedCommunityProjects))
    }

    // Load freelance projects from localStorage
    const savedFreelanceProjects = localStorage.getItem("freelanceProjects")
    if (savedFreelanceProjects) {
      setFreelanceProjects(JSON.parse(savedFreelanceProjects))
    }
  }, [])

  const handleProjectClick = (githubLink: string) => {
    if (isAuthenticated) {
      window.open(githubLink, "_blank")
    } else {
      alert("برای دسترسی به این محتوا، لطفاً ابتدا وارد شوید یا ثبت‌نام کنید.")
      onAuthRequired(() => {
        window.open(githubLink, "_blank")
      })
    }
  }

  const handleSubmitCommunityProject = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!communityForm.title || !communityForm.description || !communityForm.githubLink) {
      alert("لطفاً تمام فیلدها را پر کنید")
      return
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
    const newProject: CommunityProject = {
      id: Date.now().toString(),
      title: communityForm.title,
      description: communityForm.description,
      githubLink: communityForm.githubLink,
      author: currentUser.fullName || "کاربر ناشناس",
      submittedAt: new Date().toLocaleDateString("fa-IR")
    }

    const updatedProjects = [...communityProjects, newProject]
    setCommunityProjects(updatedProjects)
    localStorage.setItem("communityProjects", JSON.stringify(updatedProjects))
    
    setCommunityForm({ title: "", description: "", githubLink: "" })
    setShowCommunityModal(false)
  }

  const handleSubmitFreelanceProject = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!freelanceForm.title || !freelanceForm.description || !freelanceForm.contactEmail) {
      alert("لطفاً فیلدهای الزامی را پر کنید")
      return
    }

    const newProject: FreelanceProject = {
      id: Date.now().toString(),
      title: freelanceForm.title,
      company: freelanceForm.company,
      description: freelanceForm.description,
      budget: freelanceForm.budget,
      contactEmail: freelanceForm.contactEmail,
      postedAt: new Date().toLocaleDateString("fa-IR")
    }

    const updatedProjects = [...freelanceProjects, newProject]
    setFreelanceProjects(updatedProjects)
    localStorage.setItem("freelanceProjects", JSON.stringify(updatedProjects))
    
    setFreelanceForm({ title: "", company: "", description: "", budget: "", contactEmail: "" })
    setShowFreelanceModal(false)
  }

  const handleSubmitProject = () => {
    if (isAuthenticated) {
      setShowCommunityModal(true)
    } else {
      alert("برای ثبت پروژه، لطفاً ابتدا وارد شوید یا ثبت‌نام کنید.")
      onAuthRequired(() => {
        setShowCommunityModal(true)
      })
    }
  }

  const handlePostFreelance = () => {
    if (isAuthenticated) {
      setShowFreelanceModal(true)
    } else {
      alert("برای ثبت آگهی، لطفاً ابتدا وارد شوید یا ثبت‌نام کنید.")
      onAuthRequired(() => {
        setShowFreelanceModal(true)
      })
    }
  }

  return (
    <>
      <section className="mobile-section bg-gray-900 mobile-container">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 persian-heading mobile-heading-spacing">
              پروژه‌های هوش مصنوعی
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 persian-body max-w-3xl mx-auto mobile-text-spacing px-2">
              انواع پروژه‌های فریلنسری که می‌توانید با کمک هوش مصنوعی انجام دهید
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-800 rounded-lg p-1 flex">
              <button
                onClick={() => setActiveTab("finalized")}
                className={`px-6 py-3 rounded-md text-sm font-medium transition-colors persian-body ${
                  activeTab === "finalized"
                    ? "bg-yellow-500 text-black"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                پروژه‌های نهایی
              </button>
              <button
                onClick={() => setActiveTab("community")}
                className={`px-6 py-3 rounded-md text-sm font-medium transition-colors persian-body ${
                  activeTab === "community"
                    ? "bg-yellow-500 text-black"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                پروژه‌های کامیونیتی
              </button>
              <button
                onClick={() => setActiveTab("freelance")}
                className={`px-6 py-3 rounded-md text-sm font-medium transition-colors persian-body ${
                  activeTab === "freelance"
                    ? "bg-yellow-500 text-black"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                فرصت‌های فریلنسری
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "finalized" && (
            <div className="mobile-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {finalizedProjects.map((project) => {
                const Icon = project.icon
                return (
                  <div key={project.id} className="card group cursor-pointer" onClick={() => handleProjectClick(project.githubLink)}>
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 ${project.color} rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>

                    <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 persian-heading group-hover:text-yellow-400 transition-colors duration-200 mobile-heading-spacing">
                      {project.title}
                    </h3>

                    <p className="text-gray-400 persian-body mb-3 sm:mb-4 leading-relaxed mobile-text-spacing text-sm sm:text-base line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                      {project.skills.map((skill, index) => (
                        <span key={index} className="px-2 py-1 sm:px-3 sm:py-1 bg-gray-700 text-gray-300 rounded-full text-xs sm:text-sm english-text">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <button className="w-full text-center text-sm sm:text-base bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-3 rounded-lg transition-colors duration-200 persian-body mobile-text-spacing font-medium flex items-center justify-center">
                      {isAuthenticated ? (
                        <>
                          <ExternalLink className="w-4 h-4 ml-2" />
                          مشاهده در GitHub
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 ml-2" />
                          ورود برای دسترسی
                        </>
                      )}
                    </button>
                  </div>
                )
              })}
            </div>
          )}

          {activeTab === "community" && (
            <div>
              <div className="text-center mb-8">
                <button
                  onClick={handleSubmitProject}
                  className="btn-primary persian-body inline-flex items-center"
                >
                  <Plus className="w-5 h-5 ml-2" />
                  ثبت پروژه شما
                </button>
              </div>

              <div className="mobile-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {communityProjects.map((project) => (
                  <div key={project.id} className="card group">
                    <h3 className="text-lg font-semibold mb-2 persian-heading group-hover:text-yellow-400 transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 persian-body mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                      <span className="persian-body">توسط: {project.author}</span>
                      <span className="persian-body">{project.submittedAt}</span>
                    </div>
                    <button
                      onClick={() => handleProjectClick(project.githubLink)}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-3 rounded-lg transition-colors duration-200 persian-body text-sm font-medium flex items-center justify-center"
                    >
                      {isAuthenticated ? (
                        <>
                          <ExternalLink className="w-4 h-4 ml-2" />
                          مشاهده پروژه
                        </>
                      ) : (
                        "ورود برای دسترسی"
                      )}
                    </button>
                  </div>
                ))}
                
                {communityProjects.length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-400 persian-body">هنوز پروژه‌ای ثبت نشده است. اولین نفر باشید!</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "freelance" && (
            <div>
              <div className="text-center mb-8">
                <button
                  onClick={handlePostFreelance}
                  className="btn-primary persian-body inline-flex items-center"
                >
                  <Plus className="w-5 h-5 ml-2" />
                  ثبت آگهی پروژه
                </button>
              </div>

              <div className="space-y-6">
                {freelanceProjects.map((project) => (
                  <div key={project.id} className="card">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2 persian-heading text-yellow-400">
                          {project.title}
                        </h3>
                        {project.company && (
                          <p className="text-gray-400 persian-body text-sm mb-2">
                            شرکت: {project.company}
                          </p>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 persian-body">
                        {project.postedAt}
                      </div>
                    </div>
                    
                    <p className="text-gray-300 persian-body mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap justify-between items-center gap-4">
                      {project.budget && (
                        <div className="flex items-center text-green-400">
                          <DollarSign className="w-4 h-4 ml-1" />
                          <span className="text-sm persian-body">{project.budget}</span>
                        </div>
                      )}
                      <div className="flex items-center text-yellow-400">
                        <Mail className="w-4 h-4 ml-1" />
                        <span className="text-sm english-text">{project.contactEmail}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {freelanceProjects.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-400 persian-body">هنوز آگهی‌ای ثبت نشده است.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Community Project Modal */}
      {showCommunityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold persian-heading">ثبت پروژه جدید</h3>
                <button onClick={() => setShowCommunityModal(false)} className="text-white hover:text-gray-200">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmitCommunityProject} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">عنوان پروژه</label>
                <input
                  type="text"
                  value={communityForm.title}
                  onChange={(e) => setCommunityForm({...communityForm, title: e.target.value})}
                  className="input-field persian-body"
                  placeholder="عنوان پروژه خود را وارد کنید"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">توضیح کوتاه</label>
                <textarea
                  value={communityForm.description}
                  onChange={(e) => setCommunityForm({...communityForm, description: e.target.value})}
                  className="input-field persian-body resize-none"
                  rows={3}
                  placeholder="توضیح کوتاهی از پروژه خود بدهید"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">لینک GitHub</label>
                <input
                  type="url"
                  value={communityForm.githubLink}
                  onChange={(e) => setCommunityForm({...communityForm, githubLink: e.target.value})}
                  className="input-field english-text"
                  placeholder="https://github.com/..."
                  required
                />
              </div>
              
              <button type="submit" className="w-full btn-primary persian-body">
                ثبت پروژه
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Freelance Project Modal */}
      {showFreelanceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold persian-heading">ثبت آگهی پروژه</h3>
                <button onClick={() => setShowFreelanceModal(false)} className="text-white hover:text-gray-200">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmitFreelanceProject} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">عنوان پروژه *</label>
                <input
                  type="text"
                  value={freelanceForm.title}
                  onChange={(e) => setFreelanceForm({...freelanceForm, title: e.target.value})}
                  className="input-field persian-body"
                  placeholder="عنوان پروژه را وارد کنید"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">نام شرکت (اختیاری)</label>
                <input
                  type="text"
                  value={freelanceForm.company}
                  onChange={(e) => setFreelanceForm({...freelanceForm, company: e.target.value})}
                  className="input-field persian-body"
                  placeholder="نام شرکت یا سازمان"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">توضیحات کامل پروژه *</label>
                <textarea
                  value={freelanceForm.description}
                  onChange={(e) => setFreelanceForm({...freelanceForm, description: e.target.value})}
                  className="input-field persian-body resize-none"
                  rows={4}
                  placeholder="توضیحات کامل پروژه، نیازمندی‌ها و انتظارات"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">بودجه پیشنهادی (اختیاری)</label>
                <input
                  type="text"
                  value={freelanceForm.budget}
                  onChange={(e) => setFreelanceForm({...freelanceForm, budget: e.target.value})}
                  className="input-field persian-body"
                  placeholder="مثال: ۵-۱۰ میلیون تومان"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">ایمیل تماس *</label>
                <input
                  type="email"
                  value={freelanceForm.contactEmail}
                  onChange={(e) => setFreelanceForm({...freelanceForm, contactEmail: e.target.value})}
                  className="input-field english-text"
                  placeholder="contact@example.com"
                  required
                />
              </div>
              
              <button type="submit" className="w-full btn-primary persian-body">
                ثبت آگهی
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}