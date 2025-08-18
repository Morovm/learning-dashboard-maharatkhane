"use client"

import { useState } from "react"
import { Briefcase, ArrowRight, ArrowLeft, CheckCircle, BookOpen, ExternalLink, Target } from "lucide-react"

interface SmartCareerConsultingProps {
  onAuthRequired: (action: () => void) => void
  isAuthenticated: boolean
}

const fields = [
  { id: "data-science", title: "علم داده", icon: "📊" },
  { id: "web-development", title: "توسعه وب", icon: "💻" },
  { id: "ai-engineering", title: "مهندسی هوش مصنوعی", icon: "🤖" },
  { id: "content-creation", title: "تولید محتوا", icon: "✍️" },
  { id: "digital-marketing", title: "بازاریابی دیجیتال", icon: "📱" }
]

const experienceLevels = [
  { id: "beginner", title: "مبتدی", description: "تازه شروع کرده‌ام" },
  { id: "intermediate", title: "متوسط", description: "تجربه محدودی دارم" },
  { id: "advanced", title: "پیشرفته", description: "تجربه زیادی دارم" }
]

const careerAdvice = {
  "data-science": {
    beginner: {
      title: "مسیر یادگیری علم داده برای مبتدیان",
      advice: "شما در ابتدای مسیر علم داده قرار دارید. پیشنهاد می‌شود ابتدا با Python و مفاهیم آماری آشنا شوید، سپس کتابخانه‌هایی مثل Pandas و NumPy را یاد بگیرید.",
      resources: [
        { title: "دوره Python برای علم داده", url: "https://www.kaggle.com/learn/python" },
        { title: "مقدمه‌ای بر Pandas", url: "https://pandas.pydata.org/docs/getting_started/intro_tutorials/" }
      ],
      careerPath: ["یادگیری Python → آمار پایه → Pandas/NumPy → تحلیل داده → یادگیری ماشین"]
    },
    intermediate: {
      title: "پیشرفت در علم داده",
      advice: "با تجربه‌ای که دارید، می‌توانید روی پروژه‌های پیچیده‌تر تمرکز کنید. یادگیری الگوریتم‌های یادگیری ماشین و کار با داده‌های بزرگ اولویت شما باشد.",
      resources: [
        { title: "دوره یادگیری ماشین", url: "https://www.coursera.org/learn/machine-learning" },
        { title: "کار با Big Data", url: "https://spark.apache.org/docs/latest/" }
      ],
      careerPath: ["Machine Learning → Deep Learning → Big Data → تخصص در حوزه خاص"]
    },
    advanced: {
      title: "تخصص در علم داده",
      advice: "شما آماده ورود به پروژه‌های تجاری و رهبری تیم‌های علم داده هستید. روی مهارت‌های مدیریتی و کسب و کار تمرکز کنید.",
      resources: [
        { title: "مدیریت پروژه‌های داده", url: "https://www.pmi.org/learning/library/data-science-project-management" },
        { title: "MLOps و Production", url: "https://ml-ops.org/" }
      ],
      careerPath: ["Senior Data Scientist → Lead Data Scientist → Chief Data Officer"]
    }
  },
  "web-development": {
    beginner: {
      title: "شروع توسعه وب",
      advice: "برای شروع توسعه وب، ابتدا HTML، CSS و JavaScript را یاد بگیرید. سپس یکی از فریمورک‌های محبوب مثل React یا Vue را انتخاب کنید.",
      resources: [
        { title: "آموزش HTML/CSS", url: "https://www.w3schools.com/html/" },
        { title: "JavaScript برای مبتدیان", url: "https://javascript.info/" }
      ],
      careerPath: ["HTML/CSS → JavaScript → React/Vue → Backend → Full-Stack"]
    },
    intermediate: {
      title: "پیشرفت در توسعه وب",
      advice: "با تجربه‌تان می‌توانید روی فریمورک‌های پیشرفته‌تر و تکنولوژی‌های Backend تمرکز کنید. یادگیری Node.js یا Django اولویت شما باشد.",
      resources: [
        { title: "Node.js آموزش", url: "https://nodejs.org/en/docs/" },
        { title: "React پیشرفته", url: "https://react.dev/learn" }
      ],
      careerPath: ["Frontend Expert → Backend Development → Full-Stack → Architecture"]
    },
    advanced: {
      title: "تخصص در توسعه وب",
      advice: "شما آماده رهبری پروژه‌های بزرگ و طراحی معماری سیستم‌ها هستید. روی DevOps، Cloud و مهارت‌های مدیریتی تمرکز کنید.",
      resources: [
        { title: "Cloud Computing", url: "https://aws.amazon.com/training/" },
        { title: "DevOps Practices", url: "https://www.atlassian.com/devops" }
      ],
      careerPath: ["Senior Developer → Tech Lead → Engineering Manager → CTO"]
    }
  },
  "ai-engineering": {
    beginner: {
      title: "ورود به دنیای هوش مصنوعی",
      advice: "برای شروع در هوش مصنوعی، ابتدا Python و ریاضیات پایه را یاد بگیرید. سپس با کتابخانه‌هایی مثل TensorFlow و PyTorch آشنا شوید.",
      resources: [
        { title: "Python برای AI", url: "https://www.python.org/about/gettingstarted/" },
        { title: "مقدمه‌ای بر TensorFlow", url: "https://www.tensorflow.org/tutorials" }
      ],
      careerPath: ["Python → ریاضیات → Machine Learning → Deep Learning → AI Specialist"]
    },
    intermediate: {
      title: "پیشرفت در هوش مصنوعی",
      advice: "با تجربه‌تان می‌توانید روی پروژه‌های عملی و کاربردی تمرکز کنید. یادگیری Computer Vision یا NLP اولویت شما باشد.",
      resources: [
        { title: "Computer Vision", url: "https://opencv.org/courses/" },
        { title: "Natural Language Processing", url: "https://www.nltk.org/book/" }
      ],
      careerPath: ["ML Engineer → AI Specialist → Research Scientist"]
    },
    advanced: {
      title: "تخصص در هوش مصنوعی",
      advice: "شما آماده رهبری تیم‌های تحقیق و توسعه محصولات AI هستید. روی Research، Publications و مدیریت تیم تمرکز کنید.",
      resources: [
        { title: "AI Research Papers", url: "https://arxiv.org/list/cs.AI/recent" },
        { title: "MLOps Best Practices", url: "https://ml-ops.org/" }
      ],
      careerPath: ["Senior AI Engineer → AI Research Lead → Chief AI Officer"]
    }
  },
  "content-creation": {
    beginner: {
      title: "شروع تولید محتوا",
      advice: "برای شروع تولید محتوا، ابتدا با ابزارهای AI مثل ChatGPT و Canva آشنا شوید. یادگیری اصول نوشتار و طراحی گرافیک پایه ضروری است.",
      resources: [
        { title: "آموزش ChatGPT", url: "https://openai.com/blog/chatgpt" },
        { title: "طراحی با Canva", url: "https://www.canva.com/designschool/" }
      ],
      careerPath: ["ابزارهای AI → نوشتار → طراحی → استراتژی محتوا → Content Manager"]
    },
    intermediate: {
      title: "پیشرفت در تولید محتوا",
      advice: "با تجربه‌تان می‌توانید روی استراتژی محتوا و بازاریابی دیجیتال تمرکز کنید. یادگیری SEO و Analytics اولویت شما باشد.",
      resources: [
        { title: "SEO آموزش", url: "https://moz.com/beginners-guide-to-seo" },
        { title: "Google Analytics", url: "https://analytics.google.com/analytics/academy/" }
      ],
      careerPath: ["Content Creator → Content Strategist → Digital Marketing Manager"]
    },
    advanced: {
      title: "تخصص در تولید محتوا",
      advice: "شما آماده رهبری تیم‌های محتوا و طراحی استراتژی‌های بازاریابی هستید. روی مدیریت برند و تحلیل بازار تمرکز کنید.",
      resources: [
        { title: "Brand Management", url: "https://www.hubspot.com/brand-management" },
        { title: "Content Strategy", url: "https://contentmarketinginstitute.com/" }
      ],
      careerPath: ["Content Manager → Brand Manager → Chief Marketing Officer"]
    }
  },
  "digital-marketing": {
    beginner: {
      title: "شروع بازاریابی دیجیتال",
      advice: "برای شروع بازاریابی دیجیتال، ابتدا با مفاهیم پایه SEO، Social Media و Google Ads آشنا شوید. یادگیری Google Analytics ضروری است.",
      resources: [
        { title: "Google Ads آموزش", url: "https://skillshop.withgoogle.com/" },
        { title: "Social Media Marketing", url: "https://www.hootsuite.com/education" }
      ],
      careerPath: ["SEO → Social Media → Google Ads → Analytics → Digital Marketing Specialist"]
    },
    intermediate: {
      title: "پیشرفت در بازاریابی دیجیتال",
      advice: "با تجربه‌تان می‌توانید روی استراتژی‌های پیچیده‌تر و اتوماسیون بازاریابی تمرکز کنید. یادگیری Marketing Automation اولویت شما باشد.",
      resources: [
        { title: "Marketing Automation", url: "https://www.hubspot.com/marketing-automation" },
        { title: "Advanced Analytics", url: "https://analytics.google.com/analytics/academy/" }
      ],
      careerPath: ["Digital Marketer → Marketing Automation → Growth Hacker → Marketing Manager"]
    },
    advanced: {
      title: "تخصص در بازاریابی دیجیتال",
      advice: "شما آماده رهبری تیم‌های بازاریابی و طراحی استراتژی‌های رشد هستید. روی Data-Driven Marketing و مدیریت تیم تمرکز کنید.",
      resources: [
        { title: "Growth Strategy", url: "https://www.reforge.com/" },
        { title: "Marketing Leadership", url: "https://www.marketingprofs.com/" }
      ],
      careerPath: ["Marketing Manager → Growth Manager → VP Marketing → CMO"]
    }
  }
}

export default function SmartCareerConsulting({ onAuthRequired, isAuthenticated }: SmartCareerConsultingProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedField, setSelectedField] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("")
  const [showResults, setShowResults] = useState(false)

  const handleStartConsulting = () => {
    if (isAuthenticated) {
      setCurrentStep(1)
      setSelectedField("")
      setSelectedLevel("")
      setShowResults(false)
    } else {
      alert("برای دسترسی به مشاوره شغلی، لطفاً ابتدا وارد شوید یا ثبت‌نام کنید.")
      onAuthRequired(() => {
        setCurrentStep(1)
      })
    }
  }

  const handleFieldSelect = (fieldId: string) => {
    setSelectedField(fieldId)
    setCurrentStep(2)
  }

  const handleLevelSelect = (levelId: string) => {
    setSelectedLevel(levelId)
    setCurrentStep(3)
    setShowResults(true)
  }

  const handleRestart = () => {
    setCurrentStep(1)
    setSelectedField("")
    setSelectedLevel("")
    setShowResults(false)
  }

  const getAdvice = () => {
    if (!selectedField || !selectedLevel) return null
    return careerAdvice[selectedField as keyof typeof careerAdvice]?.[selectedLevel as keyof typeof careerAdvice[keyof typeof careerAdvice]]
  }

  const advice = getAdvice()

  return (
    <section className="mobile-section bg-gray-900 mobile-container">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="p-3 sm:p-4 bg-yellow-500 rounded-full">
              <Briefcase className="w-8 h-8 sm:w-12 sm:h-12 text-black" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 persian-heading mobile-heading-spacing">
            مشاوره شغلی هوشمند
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 persian-body max-w-3xl mx-auto mobile-text-spacing px-2">
            مسیر شغلی خود را با پاسخ به چند سوال ساده کشف کنید
          </p>
          
          <div className="mt-6">
            <button
              onClick={handleStartConsulting}
              className="btn-primary persian-body inline-flex items-center relative"
            >
              کشف استعداد و شروع یادگیری
              {isAuthenticated && (
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-400" />
              )}
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            </button>
          </div>
        </div>

        {currentStep === 1 && !showResults && (
          <div className="card">
            <h3 className="text-xl font-semibold persian-heading mb-6 text-center">
              مرحله ۱: حوزه علاقه‌مندی خود را انتخاب کنید
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {fields.map((field) => (
                <button
                  key={field.id}
                  onClick={() => handleFieldSelect(field.id)}
                  className="card bg-gray-700 hover:bg-gray-600 hover:border-yellow-500 transition-all duration-200 text-center group"
                >
                  <div className="text-4xl mb-3">{field.icon}</div>
                  <h4 className="text-lg font-semibold persian-heading group-hover:text-yellow-400 transition-colors">
                    {field.title}
                  </h4>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 2 && !showResults && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setCurrentStep(1)}
                className="flex items-center text-gray-400 hover:text-white transition-colors persian-body"
              >
                <ArrowRight className="w-4 h-4 ml-1" />
                بازگشت
              </button>
              <h3 className="text-xl font-semibold persian-heading text-center">
                مرحله ۲: سطح تجربه خود را انتخاب کنید
              </h3>
              <div></div>
            </div>
            
            <div className="space-y-4">
              {experienceLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => handleLevelSelect(level.id)}
                  className="w-full card bg-gray-700 hover:bg-gray-600 hover:border-yellow-500 transition-all duration-200 text-right group"
                >
                  <div className="flex justify-between items-center">
                    <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-yellow-400 transition-colors" />
                    <div>
                      <h4 className="text-lg font-semibold persian-heading group-hover:text-yellow-400 transition-colors">
                        {level.title}
                      </h4>
                      <p className="text-gray-400 persian-body text-sm">
                        {level.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {showResults && advice && (
          <div className="space-y-6">
            <div className="card bg-gradient-to-r from-green-900/50 to-blue-900/50 border-green-500/30">
              <div className="text-center mb-6">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold persian-heading text-green-400 mb-2">
                  {advice.title}
                </h3>
              </div>
              
              <p className="text-gray-300 persian-body leading-relaxed mb-6 text-center">
                {advice.advice}
              </p>
            </div>

            <div className="card">
              <h4 className="text-xl font-semibold persian-heading mb-4 flex items-center">
                <BookOpen className="w-6 h-6 text-yellow-500 ml-2" />
                منابع پیشنهادی
              </h4>
              <div className="space-y-3">
                {advice.resources.map((resource, index) => (
                  <button
                    key={index}
                    onClick={() => window.open(resource.url, "_blank")}
                    className="w-full flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors group"
                  >
                    <div className="flex items-center">
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-yellow-400 ml-3" />
                      <span className="english-text text-sm group-hover:text-yellow-400 transition-colors">
                        {resource.title}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="card">
              <h4 className="text-xl font-semibold persian-heading mb-4 flex items-center">
                <Target className="w-6 h-6 text-orange-500 ml-2" />
                مسیر پیشرفت شغلی
              </h4>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {advice.careerPath.map((step, index) => (
                  <div key={index} className="flex items-center">
                    <div className="bg-orange-500 text-black px-3 py-2 rounded-lg text-sm font-medium persian-body">
                      {step}
                    </div>
                    {index < advice.careerPath.length - 1 && (
                      <ArrowLeft className="w-4 h-4 text-gray-400 mx-2" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleRestart}
                className="btn-secondary persian-body"
              >
                مشاوره مجدد
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}