
<old_str>"use client"

import { useState } from "react"
import { ExternalLink, Github, Play, Eye, Star, Calendar, Users, Clock } from "lucide-react"
import DiscoverTalentButton from "./discover-talent-button"
import ProtectedLink from "./protected-link"

interface AllProjectsSectionProps {
  onAuthRequired: (action: () => void) => void
}

const projects = [
  {
    id: 1,
    title: "تحلیلگر داده مالی هوشمند",
    description: "سیستم هوشمند برای تحلیل و پیش‌بینی روندهای مالی با استفاده از یادگیری ماشین",
    category: "تحلیل داده",
    difficulty: "متوسط",
    duration: "4-6 هفته",
    income: "2-5 میلیون تومان",
    technologies: ["Python", "Pandas", "Scikit-learn", "Plotly"],
    features: [
      "تحلیل روندهای بازار",
      "پیش‌بینی قیمت سهام",
      "تولید گزارش خودکار",
      "داشبورد تعاملی"
    ],
    githubUrl: "https://github.com/sample/financial-analyzer",
    demoUrl: "https://demo.financial-analyzer.com",
    students: 1247,
    rating: 4.8,
    lastUpdated: "2 روز پیش",
    tags: ["محبوب", "پولساز"]
  },
  {
    id: 2,
    title: "چت‌بات پشتیبانی مشتریان",
    description: "ربات هوشمند برای پاسخگویی به سوالات مشتریان با قابلیت یادگیری از مکالمات",
    category: "پردازش زبان",
    difficulty: "ساده",
    duration: "2-3 هفته",
    income: "1-3 میلیون تومان",
    technologies: ["Python", "OpenAI API", "Streamlit", "SQLite"],
    features: [
      "پاسخ‌گویی هوشمند",
      "یادگیری از تعاملات",
      "پنل مدیریت",
      "گزارش‌گیری کامل"
    ],
    githubUrl: "https://github.com/sample/support-chatbot",
    demoUrl: "https://demo.support-chatbot.com",
    students: 2156,
    rating: 4.9,
    lastUpdated: "1 هفته پیش",
    tags: ["آسان", "سریع"]
  },
  {
    id: 3,
    title: "تولیدکننده محتوا با AI",
    description: "ابزار هوشمند برای تولید محتوای متنی، تصویری و ویدیویی برای شبکه‌های اجتماعی",
    category: "تولید محتوا",
    difficulty: "پیشرفته",
    duration: "6-8 هفته",
    income: "5-10 میلیون تومان",
    technologies: ["Python", "OpenAI", "Stable Diffusion", "FFmpeg"],
    features: [
      "تولید متن خلاقانه",
      "ساخت تصاویر AI",
      "ویرایش ویدیو خودکار",
      "برنامه‌ریزی انتشار"
    ],
    githubUrl: "https://github.com/sample/ai-content-generator",
    demoUrl: "https://demo.ai-content-generator.com",
    students: 892,
    rating: 4.7,
    lastUpdated: "3 روز پیش",
    tags: ["پیشرفته", "خلاقانه"]
  },
  {
    id: 4,
    title: "سیستم تشخیص تصاویر پزشکی",
    description: "مدل یادگیری عمیق برای تشخیص بیماری‌ها از تصاویر رادیولوژی",
    category: "بینایی کامپیوتر",
    difficulty: "پیشرفته",
    duration: "8-10 هفته",
    income: "10-20 میلیون تومان",
    technologies: ["TensorFlow", "Keras", "OpenCV", "FastAPI"],
    features: [
      "تشخیص دقیق بیماری",
      "پردازش تصاویر DICOM",
      "رابط کاربری پزشکی",
      "سیستم گزارش‌دهی"
    ],
    githubUrl: "https://github.com/sample/medical-imaging",
    demoUrl: "https://demo.medical-imaging.com",
    students: 445,
    rating: 4.9,
    lastUpdated: "5 روز پیش",
    tags: ["تخصصی", "درآمدزا"]
  },
  {
    id: 5,
    title: "پیش‌بین قیمت رمزارز",
    description: "سیستم پیش‌بینی قیمت ارزهای دیجیتال با استفاده از تحلیل تکنیکال و احساسات",
    category: "تحلیل داده",
    difficulty: "متوسط",
    duration: "5-7 هفته",
    income: "3-8 میلیون تومان",
    technologies: ["Python", "LSTM", "Prophet", "Binance API"],
    features: [
      "پیش‌بینی قیمت دقیق",
      "تحلیل احساسات بازار",
      "هشدارهای هوشمند",
      "بک‌تست استراتژی"
    ],
    githubUrl: "https://github.com/sample/crypto-predictor",
    demoUrl: "https://demo.crypto-predictor.com",
    students: 1678,
    rating: 4.6,
    lastUpdated: "1 روز پیش",
    tags: ["ترند", "سودآور"]
  },
  {
    id: 6,
    title: "مترجم هوشمند تصاویر",
    description: "ابزار ترجمه متن داخل تصاویر با استفاده از OCR و مترجم‌های AI",
    category: "پردازش تصویر",
    difficulty: "متوسط",
    duration: "4-5 هفته",
    income: "2-4 میلیون تومان",
    technologies: ["Tesseract", "OpenCV", "Google Translate", "Pillow"],
    features: [
      "تشخیص متن در تصویر",
      "ترجمه چندزبانه",
      "حفظ فرمت تصویر",
      "پردازش دسته‌ای"
    ],
    githubUrl: "https://github.com/sample/image-translator",
    demoUrl: "https://demo.image-translator.com",
    students: 987,
    rating: 4.5,
    lastUpdated: "4 روز پیش",
    tags: ["کاربردی", "نوآورانه"]
  }
]

export default function AllProjectsSection({ onAuthRequired }: AllProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [filter, setFilter] = useState("all")

  const categories = ["all", "تحلیل داده", "پردازش زبان", "تولید محتوا", "بینایی کامپیوتر", "پردازش تصویر"]

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category === filter)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "ساده": return "text-green-400 bg-green-900/20"
      case "متوسط": return "text-yellow-400 bg-yellow-900/20"
      case "پیشرفته": return "text-red-400 bg-red-900/20"
      default: return "text-gray-400 bg-gray-900/20"
    }
  }

  const getTagColor = (tag: string) => {
    const colors = {
      "محبوب": "bg-blue-500/20 text-blue-400",
      "پولساز": "bg-green-500/20 text-green-400",
      "آسان": "bg-green-500/20 text-green-400",
      "سریع": "bg-yellow-500/20 text-yellow-400",
      "پیشرفته": "bg-red-500/20 text-red-400",
      "خلاقانه": "bg-purple-500/20 text-purple-400",
      "تخصصی": "bg-indigo-500/20 text-indigo-400",
      "درآمدزا": "bg-green-500/20 text-green-400",
      "ترند": "bg-pink-500/20 text-pink-400",
      "سودآور": "bg-emerald-500/20 text-emerald-400",
      "کاربردی": "bg-blue-500/20 text-blue-400",
      "نوآورانه": "bg-purple-500/20 text-purple-400"
    }
    return colors[tag as keyof typeof colors] || "bg-gray-500/20 text-gray-400"
  }

  return (
    <section className="mobile-section bg-gray-800 mobile-container">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 persian-heading mobile-heading-spacing">
            پروژه‌های هوش مصنوعی
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 persian-body max-w-3xl mx-auto mobile-text-spacing px-2">
            پروژه‌های عملی و درآمدزا برای شروع مسیر شغلی در هوش مصنوعی
          </p>
          <div className="mt-4 sm:mt-6">
            <DiscoverTalentButton size="lg" className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl hover:shadow-yellow-500/20" />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium persian-body transition-colors duration-200 ${
                filter === category
                  ? "bg-yellow-500 text-black"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {category === "all" ? "همه پروژه‌ها" : category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="mobile-grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="card group hover:border-yellow-500 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10"
            >
              {/* Project Header */}
              <div className="mb-4 sm:mb-6">
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(project.difficulty)}`}>
                      {project.difficulty}
                    </span>
                    <div className="flex items-center text-gray-400 text-xs">
                      <Clock className="w-3 h-3 ml-1" />
                      {project.duration}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor(tag)}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 persian-heading group-hover:text-yellow-400 transition-colors duration-200 mobile-heading-spacing">
                  {project.title}
                </h3>

                <p className="text-sm sm:text-base text-gray-400 persian-body leading-relaxed mobile-text-spacing">
                  {project.description}
                </p>
              </div>

              {/* Project Stats */}
              <div className="flex items-center justify-between mb-4 sm:mb-6 text-xs sm:text-sm text-gray-400">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex items-center">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                    {project.students.toLocaleString()}
                  </div>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 ml-1 text-yellow-400" />
                    {project.rating}
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                  {project.lastUpdated}
                </div>
              </div>

              {/* Income & Category */}
              <div className="mb-4 sm:mb-6">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="text-sm sm:text-base font-semibold text-green-400 persian-body">
                    درآمد: {project.income}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-400 persian-body">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Technologies */}
              <div className="mb-4 sm:mb-6">
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-700">
                <ProtectedLink
                  href={project.githubUrl}
                  onAuthRequired={onAuthRequired}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white text-center py-2 sm:py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium"
                >
                  <Github className="w-3 h-3 sm:w-4 sm:h-4" />
                  کد پروژه
                </ProtectedLink>
                
                <ProtectedLink
                  href={project.demoUrl}
                  onAuthRequired={onAuthRequired}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black text-center py-2 sm:py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium"
                >
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                  دموی پروژه
                </ProtectedLink>
              </div>

              {/* Expanded Details */}
              {selectedProject === project.id && (
                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-700">
                  <h4 className="font-semibold mb-2 sm:mb-3 persian-heading text-sm sm:text-base mobile-heading-spacing">
                    ویژگی‌های کلیدی:
                  </h4>
                  <ul className="space-y-1 sm:space-y-2">
                    {project.features.map((feature, index) => (
                      <li key={index} className="text-xs sm:text-sm text-gray-400 persian-body flex items-center mobile-text-spacing">
                        <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full ml-2 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Toggle Details */}
              <button
                onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                className="w-full mt-3 sm:mt-4 text-xs sm:text-sm text-yellow-400 hover:text-yellow-300 persian-body transition-colors duration-200"
              >
                {selectedProject === project.id ? "بستن جزئیات" : "مشاهده جزئیات"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}</old_str>
<new_str>"use client"

import { useState, useEffect } from "react"
import { ExternalLink, Github, Play, Eye, Star, Calendar, Users, Clock, Plus, Send, DollarSign, Building, Mail } from "lucide-react"
import DiscoverTalentButton from "./discover-talent-button"
import ProtectedLink from "./protected-link"

interface AllProjectsSectionProps {
  onAuthRequired: (action: () => void) => void
}

interface CommunityProject {
  id: string
  title: string
  description: string
  githubUrl: string
  submittedBy: string
  submittedAt: string
}

interface FreelanceProject {
  id: string
  title: string
  company?: string
  description: string
  budget?: string
  contactEmail: string
  postedBy: string
  postedAt: string
}

const curatedProjects = [
  {
    id: 1,
    title: "تحلیلگر داده مالی هوشمند",
    description: "سیستم هوشمند برای تحلیل و پیش‌بینی روندهای مالی با استفاده از یادگیری ماشین",
    category: "تحلیل داده",
    difficulty: "متوسط",
    duration: "4-6 هفته",
    income: "2-5 میلیون تومان",
    technologies: ["Python", "Pandas", "Scikit-learn", "Plotly"],
    features: [
      "تحلیل روندهای بازار",
      "پیش‌بینی قیمت سهام",
      "تولید گزارش خودکار",
      "داشبورد تعاملی"
    ],
    githubUrl: "https://github.com/sample/financial-analyzer",
    demoUrl: "https://demo.financial-analyzer.com",
    students: 1247,
    rating: 4.8,
    lastUpdated: "2 روز پیش",
    tags: ["محبوب", "پولساز"]
  },
  {
    id: 2,
    title: "چت‌بات پشتیبانی مشتریان",
    description: "ربات هوشمند برای پاسخگویی به سوالات مشتریان با قابلیت یادگیری از مکالمات",
    category: "پردازش زبان",
    difficulty: "ساده",
    duration: "2-3 هفته",
    income: "1-3 میلیون تومان",
    technologies: ["Python", "OpenAI API", "Streamlit", "SQLite"],
    features: [
      "پاسخ‌گویی هوشمند",
      "یادگیری از تعاملات",
      "پنل مدیریت",
      "گزارش‌گیری کامل"
    ],
    githubUrl: "https://github.com/sample/support-chatbot",
    demoUrl: "https://demo.support-chatbot.com",
    students: 2156,
    rating: 4.9,
    lastUpdated: "1 هفته پیش",
    tags: ["آسان", "سریع"]
  },
  {
    id: 3,
    title: "تولیدکننده محتوا با AI",
    description: "ابزار هوشمند برای تولید محتوای متنی، تصویری و ویدیویی برای شبکه‌های اجتماعی",
    category: "تولید محتوا",
    difficulty: "پیشرفته",
    duration: "6-8 هفته",
    income: "5-10 میلیون تومان",
    technologies: ["Python", "OpenAI", "Stable Diffusion", "FFmpeg"],
    features: [
      "تولید متن خلاقانه",
      "ساخت تصاویر AI",
      "ویرایش ویدیو خودکار",
      "برنامه‌ریزی انتشار"
    ],
    githubUrl: "https://github.com/sample/ai-content-generator",
    demoUrl: "https://demo.ai-content-generator.com",
    students: 892,
    rating: 4.7,
    lastUpdated: "3 روز پیش",
    tags: ["پیشرفته", "خلاقانه"]
  }
]

export default function AllProjectsSection({ onAuthRequired }: AllProjectsSectionProps) {
  const [activeTab, setActiveTab] = useState("finalized")
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [filter, setFilter] = useState("all")
  const [showCommunityModal, setShowCommunityModal] = useState(false)
  const [showFreelanceModal, setShowFreelanceModal] = useState(false)
  const [communityProjects, setCommunityProjects] = useState<CommunityProject[]>([])
  const [freelanceProjects, setFreelanceProjects] = useState<FreelanceProject[]>([])

  // Form states
  const [communityForm, setCommunityForm] = useState({
    title: '',
    description: '',
    githubUrl: ''
  })
  const [freelanceForm, setFreelanceForm] = useState({
    title: '',
    company: '',
    description: '',
    budget: '',
    contactEmail: ''
  })

  const categories = ["all", "تحلیل داده", "پردازش زبان", "تولید محتوا", "بینایی کامپیوتر", "پردازش تصویر"]

  const filteredProjects = filter === "all" 
    ? curatedProjects 
    : curatedProjects.filter(project => project.category === filter)

  // Load projects from localStorage on mount
  useEffect(() => {
    const savedCommunityProjects = localStorage.getItem('communityProjects')
    if (savedCommunityProjects) {
      setCommunityProjects(JSON.parse(savedCommunityProjects))
    }

    const savedFreelanceProjects = localStorage.getItem('freelanceProjects')
    if (savedFreelanceProjects) {
      setFreelanceProjects(JSON.parse(savedFreelanceProjects))
    }
  }, [])

  const handleCommunitySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newProject: CommunityProject = {
      id: Date.now().toString(),
      ...communityForm,
      submittedBy: 'کاربر ناشناس', // In real app, get from auth
      submittedAt: new Date().toLocaleDateString('fa-IR')
    }
    
    const updatedProjects = [...communityProjects, newProject]
    setCommunityProjects(updatedProjects)
    localStorage.setItem('communityProjects', JSON.stringify(updatedProjects))
    
    setCommunityForm({ title: '', description: '', githubUrl: '' })
    setShowCommunityModal(false)
  }

  const handleFreelanceSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newProject: FreelanceProject = {
      id: Date.now().toString(),
      ...freelanceForm,
      postedBy: 'کارفرما ناشناس', // In real app, get from auth
      postedAt: new Date().toLocaleDateString('fa-IR')
    }
    
    const updatedProjects = [...freelanceProjects, newProject]
    setFreelanceProjects(updatedProjects)
    localStorage.setItem('freelanceProjects', JSON.stringify(updatedProjects))
    
    setFreelanceForm({ title: '', company: '', description: '', budget: '', contactEmail: '' })
    setShowFreelanceModal(false)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "ساده": return "text-green-400 bg-green-900/20"
      case "متوسط": return "text-yellow-400 bg-yellow-900/20"
      case "پیشرفته": return "text-red-400 bg-red-900/20"
      default: return "text-gray-400 bg-gray-900/20"
    }
  }

  const getTagColor = (tag: string) => {
    const colors = {
      "محبوب": "bg-blue-500/20 text-blue-400",
      "پولساز": "bg-green-500/20 text-green-400",
      "آسان": "bg-green-500/20 text-green-400",
      "سریع": "bg-yellow-500/20 text-yellow-400",
      "پیشرفته": "bg-red-500/20 text-red-400",
      "خلاقانه": "bg-purple-500/20 text-purple-400"
    }
    return colors[tag as keyof typeof colors] || "bg-gray-500/20 text-gray-400"
  }

  return (
    <section className="mobile-section bg-gray-800 mobile-container">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 persian-heading mobile-heading-spacing">
            پروژه‌های هوش مصنوعی
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 persian-body max-w-3xl mx-auto mobile-text-spacing px-2">
            پروژه‌های عملی و درآمدزا برای شروع مسیر شغلی در هوش مصنوعی
          </p>
          <div className="mt-4 sm:mt-6">
            <DiscoverTalentButton size="lg" className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl hover:shadow-yellow-500/20" />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
          <button
            onClick={() => setActiveTab("finalized")}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium persian-body transition-colors duration-200 ${
              activeTab === "finalized"
                ? "bg-yellow-500 text-black"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            پروژه‌های نهایی
          </button>
          <button
            onClick={() => setActiveTab("community")}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium persian-body transition-colors duration-200 ${
              activeTab === "community"
                ? "bg-yellow-500 text-black"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            پروژه‌های کامیونیتی
          </button>
          <button
            onClick={() => setActiveTab("freelance")}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium persian-body transition-colors duration-200 ${
              activeTab === "freelance"
                ? "bg-yellow-500 text-black"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            فرصت‌های فریلنسری
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "finalized" && (
          <>
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium persian-body transition-colors duration-200 ${
                    filter === category
                      ? "bg-yellow-500 text-black"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {category === "all" ? "همه پروژه‌ها" : category}
                </button>
              ))}
            </div>

            {/* Finalized Projects Grid */}
            <div className="mobile-grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="card group hover:border-yellow-500 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10"
                >
                  {/* Project Header */}
                  <div className="mb-4 sm:mb-6">
                    <div className="flex items-start justify-between mb-2 sm:mb-3">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(project.difficulty)}`}>
                          {project.difficulty}
                        </span>
                        <div className="flex items-center text-gray-400 text-xs">
                          <Clock className="w-3 h-3 ml-1" />
                          {project.duration}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor(tag)}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 persian-heading group-hover:text-yellow-400 transition-colors duration-200 mobile-heading-spacing">
                      {project.title}
                    </h3>

                    <p className="text-sm sm:text-base text-gray-400 persian-body leading-relaxed mobile-text-spacing">
                      {project.description}
                    </p>
                  </div>

                  {/* Project Stats */}
                  <div className="flex items-center justify-between mb-4 sm:mb-6 text-xs sm:text-sm text-gray-400">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="flex items-center">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                        {project.students.toLocaleString()}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 ml-1 text-yellow-400" />
                        {project.rating}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                      {project.lastUpdated}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-700">
                    <ProtectedLink
                      href={project.githubUrl}
                      onAuthRequired={onAuthRequired}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white text-center py-2 sm:py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium"
                    >
                      <Github className="w-3 h-3 sm:w-4 sm:h-4" />
                      کد پروژه
                    </ProtectedLink>
                    
                    <ProtectedLink
                      href={project.demoUrl}
                      onAuthRequired={onAuthRequired}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black text-center py-2 sm:py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium"
                    >
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                      دموی پروژه
                    </ProtectedLink>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "community" && (
          <div>
            <div className="text-center mb-8">
              <button
                onClick={() => setShowCommunityModal(true)}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-medium persian-body transition-colors duration-200 flex items-center gap-2 mx-auto"
              >
                <Plus className="w-5 h-5" />
                ثبت پروژه شما
              </button>
            </div>

            {/* Community Projects */}
            <div className="mobile-grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {communityProjects.map((project) => (
                <div key={project.id} className="card">
                  <h3 className="text-lg font-bold mb-2 persian-heading">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 persian-body mb-4">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>ارسال شده توسط: {project.submittedBy}</span>
                    <span>{project.submittedAt}</span>
                  </div>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 justify-center transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    مشاهده کد
                  </a>
                </div>
              ))}
            </div>

            {communityProjects.length === 0 && (
              <div className="text-center text-gray-400 persian-body">
                هنوز پروژه‌ای ثبت نشده است. اولین نفر باشید!
              </div>
            )}
          </div>
        )}

        {activeTab === "freelance" && (
          <div>
            <div className="text-center mb-8">
              <button
                onClick={() => setShowFreelanceModal(true)}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-medium persian-body transition-colors duration-200 flex items-center gap-2 mx-auto"
              >
                <Plus className="w-5 h-5" />
                ثبت آگهی پروژه
              </button>
            </div>

            {/* Freelance Projects */}
            <div className="space-y-6">
              {freelanceProjects.map((project) => (
                <div key={project.id} className="card">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2 persian-heading">
                        {project.title}
                      </h3>
                      {project.company && (
                        <div className="flex items-center text-gray-400 mb-2">
                          <Building className="w-4 h-4 ml-2" />
                          {project.company}
                        </div>
                      )}
                    </div>
                    {project.budget && (
                      <div className="flex items-center text-green-400 font-semibold">
                        <DollarSign className="w-4 h-4 ml-1" />
                        {project.budget}
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-400 persian-body mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>ارسال شده توسط: {project.postedBy}</span>
                    <span>{project.postedAt}</span>
                  </div>
                  
                  <a
                    href={`mailto:${project.contactEmail}`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg flex items-center gap-2 justify-center transition-colors w-fit"
                  >
                    <Mail className="w-4 h-4" />
                    تماس با کارفرما
                  </a>
                </div>
              ))}
            </div>

            {freelanceProjects.length === 0 && (
              <div className="text-center text-gray-400 persian-body">
                هنوز آگهی‌ای ثبت نشده است. اولین آگهی را ثبت کنید!
              </div>
            )}
          </div>
        )}

        {/* Community Project Modal */}
        {showCommunityModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg max-w-md w-full p-6">
              <h3 className="text-xl font-bold mb-4 persian-heading">ثبت پروژه جدید</h3>
              <form onSubmit={handleCommunitySubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">
                    عنوان پروژه
                  </label>
                  <input
                    type="text"
                    value={communityForm.title}
                    onChange={(e) => setCommunityForm({...communityForm, title: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">
                    توضیح کوتاه
                  </label>
                  <textarea
                    value={communityForm.description}
                    onChange={(e) => setCommunityForm({...communityForm, description: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white h-24"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">
                    لینک GitHub
                  </label>
                  <input
                    type="url"
                    value={communityForm.githubUrl}
                    onChange={(e) => setCommunityForm({...communityForm, githubUrl: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded-lg font-medium persian-body"
                  >
                    ثبت پروژه
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCommunityModal(false)}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg font-medium persian-body"
                  >
                    انصراف
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Freelance Project Modal */}
        {showFreelanceModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg max-w-md w-full p-6">
              <h3 className="text-xl font-bold mb-4 persian-heading">ثبت آگهی پروژه</h3>
              <form onSubmit={handleFreelanceSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">
                    عنوان پروژه
                  </label>
                  <input
                    type="text"
                    value={freelanceForm.title}
                    onChange={(e) => setFreelanceForm({...freelanceForm, title: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">
                    نام شرکت (اختیاری)
                  </label>
                  <input
                    type="text"
                    value={freelanceForm.company}
                    onChange={(e) => setFreelanceForm({...freelanceForm, company: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">
                    توضیحات کامل پروژه
                  </label>
                  <textarea
                    value={freelanceForm.description}
                    onChange={(e) => setFreelanceForm({...freelanceForm, description: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white h-32"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">
                    بودجه پیشنهادی (اختیاری)
                  </label>
                  <input
                    type="text"
                    value={freelanceForm.budget}
                    onChange={(e) => setFreelanceForm({...freelanceForm, budget: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    placeholder="مثال: 5-10 میلیون تومان"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">
                    ایمیل تماس
                  </label>
                  <input
                    type="email"
                    value={freelanceForm.contactEmail}
                    onChange={(e) => setFreelanceForm({...freelanceForm, contactEmail: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded-lg font-medium persian-body"
                  >
                    ثبت آگهی
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowFreelanceModal(false)}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg font-medium persian-body"
                  >
                    انصراف
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}</new_str>
