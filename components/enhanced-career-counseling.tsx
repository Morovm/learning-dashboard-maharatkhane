
<old_str>"use client"

import { useState } from "react"
import { MessageCircle, Target, TrendingUp, BookOpen, Users, Award, ChevronRight } from "lucide-react"
import DiscoverTalentButton from "./discover-talent-button"

const counselingServices = [
  {
    id: 1,
    title: "مشاوره انتخاب مسیر شغلی",
    description: "تعیین بهترین مسیر شغلی بر اساس علایق، مهارت‌ها و شرایط بازار کار",
    icon: Target,
    duration: "45 دقیقه",
    price: "رایگان",
    features: [
      "ارزیابی مهارت‌های فردی",
      "بررسی فرصت‌های شغلی",
      "تنظیم نقشه راه شخصی",
      "راهنمایی انتخاب دوره‌ها"
    ]
  },
  {
    id: 2,
    title: "کوچینگ توسعه مهارت‌ها",
    description: "برنامه‌ریزی و راهنمایی برای یادگیری مهارت‌های جدید و ارتقای مهارت‌های موجود",
    icon: TrendingUp,
    duration: "60 دقیقه",
    price: "100,000 تومان",
    features: [
      "تحلیل شکاف مهارتی",
      "برنامه‌ریزی یادگیری",
      "منابع آموزشی مناسب",
      "پیگیری پیشرفت"
    ]
  },
  {
    id: 3,
    title: "مشاوره کسب‌وکار و استارتاپ",
    description: "راهنمایی برای راه‌اندازی کسب‌وکار در حوزه فناوری و هوش مصنوعی",
    icon: Users,
    duration: "90 دقیقه",
    price: "250,000 تومان",
    features: [
      "ارزیابی ایده کسب‌وکار",
      "تحلیل بازار و رقبا",
      "راهنمایی تیم‌سازی",
      "استراتژی راه‌اندازی"
    ]
  },
  {
    id: 4,
    title: "آمادگی مصاحبه شغلی",
    description: "تمرین و آمادگی برای مصاحبه‌های شغلی در شرکت‌های فناوری",
    icon: MessageCircle,
    duration: "75 دقیقه",
    price: "150,000 تومان",
    features: [
      "شبیه‌سازی مصاحبه",
      "تحلیل نقاط قوت و ضعف",
      "تکنیک‌های مصاحبه",
      "آمادگی سوالات فنی"
    ]
  },
  {
    id: 5,
    title: "برنامه‌ریزی توسعه حرفه‌ای",
    description: "طراحی مسیر حرفه‌ای بلندمدت و استراتژی رشد شغلی",
    icon: Award,
    duration: "120 دقیقه",
    price: "300,000 تومان",
    features: [
      "تحلیل اهداف حرفه‌ای",
      "برنامه‌ریزی 5 ساله",
      "شبکه‌سازی حرفه‌ای",
      "استراتژی برندسازی شخصی"
    ]
  },
  {
    id: 6,
    title: "مشاوره تخصصی AI",
    description: "راهنمایی تخصصی برای ورود و پیشرفت در صنعت هوش مصنوعی",
    icon: BookOpen,
    duration: "90 دقیقه",
    price: "200,000 تومان",
    features: [
      "انتخاب تخصص در AI",
      "مسیر یادگیری تخصصی",
      "پروژه‌های عملی",
      "فرصت‌های شغلی AI"
    ]
  }
]

const testimonials = [
  {
    id: 1,
    name: "علی محمدی",
    role: "توسعه‌دهنده AI",
    company: "دیجی‌کالا",
    content: "مشاوره‌های مهارتخانه البرز نقطه عطفی در زندگی شغلی من بود. با راهنمایی‌هایشان توانستم در کمتر از 6 ماه وارد صنعت AI شوم.",
    rating: 5,
    image: "/placeholder-user.jpg"
  },
  {
    id: 2,
    name: "فاطمه احمدی",
    role: "دیتا ساینتیست",
    company: "اسنپ",
    content: "تیم مشاوره بسیار حرفه‌ای و با تجربه بودند. برنامه‌ریزی شخصی‌سازی شده‌ای که برایم تهیه کردند، دقیقاً همان چیزی بود که نیاز داشتم.",
    rating: 5,
    image: "/placeholder-user.jpg"
  },
  {
    id: 3,
    name: "امیر رضایی",
    role: "بنیانگذار استارتاپ",
    company: "TechnoAI",
    content: "مشاوره کسب‌وکار کمک زیادی به راه‌اندازی موفق استارتاپم کرد. از ایده تا اجرا در کنارم بودند.",
    rating: 5,
    image: "/placeholder-user.jpg"
  }
]

const stats = [
  {
    number: "2000+",
    label: "مشاوره موفق",
    icon: Users
  },
  {
    number: "95%",
    label: "رضایت مشتریان",
    icon: Award
  },
  {
    number: "500+",
    label: "استخدام موفق",
    icon: Target
  },
  {
    number: "50+",
    label: "مشاور متخصص",
    icon: BookOpen
  }
]

export default function EnhancedCareerCounseling() {
  const [selectedService, setSelectedService] = useState<number | null>(null)

  return (
    <section className="mobile-section bg-gray-900 mobile-container">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 persian-heading mobile-heading-spacing">
            مشاوره شغلی تخصصی
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 persian-body max-w-3xl mx-auto mobile-text-spacing px-2">
            با راهنمایی متخصصان مجرب، مسیر شغلی‌تان را در دنیای هوش مصنوعی ترسیم کنید
          </p>
          <div className="mt-6 sm:mt-8">
            <DiscoverTalentButton size="lg" className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl hover:shadow-yellow-500/20" />
          </div>
        </div>

        {/* Stats */}
        <div className="mobile-grid grid-cols-2 lg:grid-cols-4 mb-12 sm:mb-16">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="text-center group">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-200">
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-yellow-400 mb-1 sm:mb-2">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base text-gray-400 persian-body mobile-text-spacing">
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>

        {/* Services Grid */}
        <div className="mobile-grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mb-12 sm:mb-16">
          {counselingServices.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.id}
                className={`card group cursor-pointer transition-all duration-300 ${
                  selectedService === service.id
                    ? "border-yellow-500 shadow-lg shadow-yellow-500/20"
                    : "hover:border-yellow-500 hover:shadow-lg hover:shadow-yellow-500/10"
                }`}
                onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
              >
                {/* Service Header */}
                <div className="flex items-start justify-between mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-yellow-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-black" />
                  </div>
                  <div className="text-left">
                    <div className="text-lg sm:text-xl font-bold text-green-400 persian-body">
                      {service.price}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400 persian-body">
                      {service.duration}
                    </div>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 persian-heading group-hover:text-yellow-400 transition-colors duration-200 mobile-heading-spacing">
                  {service.title}
                </h3>

                <p className="text-sm sm:text-base text-gray-400 persian-body leading-relaxed mb-4 sm:mb-6 mobile-text-spacing">
                  {service.description}
                </p>

                {/* Features */}
                {selectedService === service.id && (
                  <div className="border-t border-gray-700 pt-4 sm:pt-6">
                    <h4 className="font-semibold mb-3 sm:mb-4 persian-heading text-sm sm:text-base mobile-heading-spacing">
                      ویژگی‌های خدمات:
                    </h4>
                    <ul className="space-y-2 sm:space-y-3">
                      {service.features.map((feature, index) => (
                        <li key={index} className="text-xs sm:text-sm text-gray-400 persian-body flex items-center mobile-text-spacing">
                          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 ml-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button className="w-full mt-4 sm:mt-6 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 sm:py-3 rounded-lg transition-colors duration-200 persian-body text-sm sm:text-base">
                      رزرو مشاوره
                    </button>
                  </div>
                )}

                {!selectedService && (
                  <div className="text-center">
                    <button className="text-yellow-400 hover:text-yellow-300 text-xs sm:text-sm persian-body transition-colors duration-200">
                      کلیک برای مشاهده جزئیات
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Testimonials */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-center mb-8 sm:mb-12 persian-heading mobile-heading-spacing">
            نظرات مشاوره‌گیران
          </h3>
          <div className="mobile-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="card">
                <div className="flex items-center mb-4 sm:mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ml-3 sm:ml-4"
                  />
                  <div>
                    <h4 className="font-semibold persian-heading text-sm sm:text-base mobile-heading-spacing">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-400 persian-body mobile-text-spacing">
                      {testimonial.role} در {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-400 persian-body leading-relaxed mobile-text-spacing">
                  &quot;{testimonial.content}&quot;
                </p>
                <div className="flex items-center mt-3 sm:mt-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center card bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 persian-heading mobile-heading-spacing">
            آماده‌اید مسیر شغلی‌تان را متحول کنید؟
          </h3>
          <p className="text-base sm:text-lg text-gray-300 persian-body mb-6 sm:mb-8 mobile-text-spacing">
            همین امروز با متخصصان ما مشاوره کنید و قدم اول را به سمت آینده‌ای روشن بردارید
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors duration-200 persian-body text-sm sm:text-base">
              رزرو مشاوره رایگان
            </button>
            <button className="border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-200 persian-body text-sm sm:text-base">
              مشاهده تقویم مشاوران
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}</old_str>
<new_str>"use client"

import { useState } from "react"
import { MessageCircle, Target, TrendingUp, BookOpen, Users, Award, ChevronRight, ChevronLeft, RotateCcw } from "lucide-react"
import DiscoverTalentButton from "./discover-talent-button"

interface QuestionnaireState {
  step: number
  field: string
  experience: string
  completed: boolean
  results: CareerResults | null
}

interface CareerResults {
  field: string
  experience: string
  advice: string
  resources: string[]
  careerPaths: string[]
}

const fields = [
  { id: "data-science", label: "علم داده و تحلیل", icon: "📊" },
  { id: "web-development", label: "توسعه وب", icon: "💻" },
  { id: "ai-engineering", label: "مهندسی هوش مصنوعی", icon: "🤖" },
  { id: "mobile-development", label: "توسعه موبایل", icon: "📱" },
  { id: "cybersecurity", label: "امنیت سایبری", icon: "🔒" },
  { id: "devops", label: "DevOps و زیرساخت", icon: "⚙️" }
]

const experiences = [
  { id: "beginner", label: "مبتدی", icon: "🌱" },
  { id: "intermediate", label: "متوسط", icon: "📈" },
  { id: "advanced", label: "پیشرفته", icon: "🎯" }
]

const careerAdvice = {
  "data-science": {
    beginner: {
      advice: "علم داده یکی از پرطرفدارترین و پردرآمدترین حوزه‌های فناوری است. برای شروع، روی یادگیری Python، آمار پایه و ابزارهای تجسم داده تمرکز کنید.",
      resources: [
        "دوره Python برای علم داده",
        "مبانی آمار و احتمال",
        "آموزش Pandas و NumPy",
        "تجسم داده با Matplotlib"
      ],
      careerPaths: [
        "تحلیلگر داده",
        "دیتا ساینتیست جونیور",
        "متخصص Business Intelligence",
        "مشاور تحلیل داده"
      ]
    },
    intermediate: {
      advice: "با تجربه متوسط در علم داده، زمان آن است که روی پروژه‌های پیچیده‌تر و یادگیری ماشین متمرکز شوید. شرکت در پروژه‌های واقعی اولویت اصلی شماست.",
      resources: [
        "یادگیری ماشین پیشرفته",
        "Deep Learning با TensorFlow",
        "پروژه‌های کاربردی",
        "آمادگی مصاحبه فنی"
      ],
      careerPaths: [
        "دیتا ساینتیست ارشد",
        "متخصص یادگیری ماشین",
        "مهندس داده",
        "محقق AI"
      ]
    },
    advanced: {
      advice: "به عنوان یک متخصص پیشرفته، فوکوس روی رهبری پروژه‌ها، توسعه استراتژی‌های داده سازمانی و انتقال دانش به تیم‌های جوان‌تر باشد.",
      resources: [
        "مدیریت پروژه‌های داده",
        "معماری سیستم‌های داده",
        "راهبری تیم‌های فنی",
        "کارآفرینی در حوزه داده"
      ],
      careerPaths: [
        "مدیر علم داده",
        "معمار سیستم‌های داده",
        "مشاور ارشد",
        "CTO در استارتاپ‌های داده محور"
      ]
    }
  },
  "web-development": {
    beginner: {
      advice: "توسعه وب دری ورودی عالی به دنیای برنامه‌نویسی است. شروع با HTML، CSS و JavaScript پایه، سپس یادگیری یک فریمورک مدرن مثل React یا Vue.",
      resources: [
        "مبانی HTML و CSS",
        "JavaScript از پایه تا پیشرفته",
        "React یا Vue.js",
        "Git و GitHub"
      ],
      careerPaths: [
        "توسعه‌دهنده Frontend جونیور",
        "توسعه‌دهنده WordPress",
        "UI Developer",
        "فریلنسر وب"
      ]
    },
    intermediate: {
      advice: "با تجربه متوسط، زمان تعمیق در فریمورک‌های مدرن و یادگیری Backend است. Full-stack شدن فرصت‌های شغلی بیشتری فراهم می‌کند.",
      resources: [
        "Node.js و Express",
        "پایگاه داده MongoDB/PostgreSQL",
        "API Design و RESTful services",
        "AWS یا Azure basics"
      ],
      careerPaths: [
        "توسعه‌دهنده Full-stack",
        "Backend Developer",
        "Web Architect",
        "Lead Frontend Developer"
      ]
    },
    advanced: {
      advice: "متخصصان پیشرفته باید روی معماری، عملکرد، امنیت و رهبری تیم متمرکز شوند. مهارت‌های مدیریتی نیز اضافه کنید.",
      resources: [
        "معماری Microservices",
        "Performance Optimization",
        "Security Best Practices",
        "Team Leadership"
      ],
      careerPaths: [
        "Solution Architect",
        "Technical Lead",
        "Engineering Manager",
        "CTO"
      ]
    }
  },
  "ai-engineering": {
    beginner: {
      advice: "هوش مصنوعی آینده فناوری است. شروع با Python، ریاضیات و یادگیری ماشین اساسی. پایه محکمی در برنامه‌نویسی بسازید.",
      resources: [
        "Python برای AI",
        "مبانی ریاضی AI",
        "Machine Learning با Scikit-learn",
        "مقدمات Deep Learning"
      ],
      careerPaths: [
        "ML Engineer جونیور",
        "AI Developer",
        "Research Assistant",
        "Data Analyst with AI focus"
      ]
    },
    intermediate: {
      advice: "وقت آن است که روی پروژه‌های پیچیده‌تر کار کنید. تخصص در حوزه‌ای مثل Computer Vision یا NLP انتخاب کنید.",
      resources: [
        "TensorFlow/PyTorch پیشرفته",
        "Computer Vision یا NLP",
        "MLOps و Production Deployment",
        "Research Papers و Implementation"
      ],
      careerPaths: [
        "Senior ML Engineer",
        "AI Research Scientist",
        "Computer Vision Engineer",
        "NLP Specialist"
      ]
    },
    advanced: {
      advice: "به عنوان متخصص پیشرفته، روی تحقیق، توسعه الگوریتم‌های جدید و رهبری پروژه‌های AI در سطح سازمان متمرکز شوید.",
      resources: [
        "Advanced AI Research",
        "Custom Model Architecture",
        "AI Strategy & Implementation",
        "Technical Leadership"
      ],
      careerPaths: [
        "Principal AI Engineer",
        "Head of AI",
        "AI Consultant",
        "AI Startup Founder"
      ]
    }
  }
}

export default function EnhancedCareerCounseling() {
  const [questionnaire, setQuestionnaire] = useState<QuestionnaireState>({
    step: 0,
    field: "",
    experience: "",
    completed: false,
    results: null
  })

  const handleFieldSelect = (fieldId: string) => {
    setQuestionnaire(prev => ({
      ...prev,
      field: fieldId,
      step: 1
    }))
  }

  const handleExperienceSelect = (experienceId: string) => {
    const advice = careerAdvice[questionnaire.field as keyof typeof careerAdvice]?.[experienceId as keyof typeof careerAdvice["data-science"]]
    
    if (advice) {
      setQuestionnaire(prev => ({
        ...prev,
        experience: experienceId,
        step: 2,
        completed: true,
        results: {
          field: questionnaire.field,
          experience: experienceId,
          advice: advice.advice,
          resources: advice.resources,
          careerPaths: advice.careerPaths
        }
      }))
    }
  }

  const resetQuestionnaire = () => {
    setQuestionnaire({
      step: 0,
      field: "",
      experience: "",
      completed: false,
      results: null
    })
  }

  const goBack = () => {
    if (questionnaire.step > 0) {
      setQuestionnaire(prev => ({
        ...prev,
        step: prev.step - 1,
        completed: false,
        results: null
      }))
    }
  }

  return (
    <section className="mobile-section bg-gray-900 mobile-container">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 persian-heading mobile-heading-spacing">
            مشاوره شغلی هوشمند
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 persian-body max-w-3xl mx-auto mobile-text-spacing px-2">
            با پاسخ به چند سوال ساده، مسیر شغلی مناسب خود را کشف کنید
          </p>
          <div className="mt-6 sm:mt-8">
            <DiscoverTalentButton size="lg" className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl hover:shadow-yellow-500/20" />
          </div>
        </div>

        {/* Questionnaire */}
        <div className="card bg-gradient-to-r from-gray-800 to-gray-700 border-yellow-500/30">
          
          {/* Step 1: Field Selection */}
          {questionnaire.step === 0 && (
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-6 persian-heading text-center">
                حوزه علاقه‌مندی خود را انتخاب کنید:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {fields.map((field) => (
                  <button
                    key={field.id}
                    onClick={() => handleFieldSelect(field.id)}
                    className="p-6 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-200 hover:border-yellow-500 border border-transparent group"
                  >
                    <div className="text-3xl mb-3">{field.icon}</div>
                    <h4 className="font-semibold persian-heading group-hover:text-yellow-400 transition-colors">
                      {field.label}
                    </h4>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Experience Level */}
          {questionnaire.step === 1 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={goBack}
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 ml-1" />
                  برگشت
                </button>
                <h3 className="text-xl sm:text-2xl font-bold persian-heading">
                  سطح تجربه خود را مشخص کنید:
                </h3>
                <div></div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {experiences.map((exp) => (
                  <button
                    key={exp.id}
                    onClick={() => handleExperienceSelect(exp.id)}
                    className="p-8 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-200 hover:border-yellow-500 border border-transparent group"
                  >
                    <div className="text-4xl mb-4">{exp.icon}</div>
                    <h4 className="text-lg font-semibold persian-heading group-hover:text-yellow-400 transition-colors">
                      {exp.label}
                    </h4>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Results */}
          {questionnaire.step === 2 && questionnaire.results && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={resetQuestionnaire}
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-5 h-5 ml-1" />
                  شروع مجدد
                </button>
                <h3 className="text-xl sm:text-2xl font-bold persian-heading text-yellow-400">
                  نتایج مشاوره شما
                </h3>
                <div></div>
              </div>

              <div className="space-y-8">
                {/* Career Advice */}
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                  <h4 className="text-lg font-bold mb-4 persian-heading flex items-center">
                    <Target className="w-5 h-5 ml-2 text-yellow-400" />
                    توصیه‌های شغلی
                  </h4>
                  <p className="text-gray-300 persian-body leading-relaxed">
                    {questionnaire.results.advice}
                  </p>
                </div>

                {/* Learning Resources */}
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                  <h4 className="text-lg font-bold mb-4 persian-heading flex items-center">
                    <BookOpen className="w-5 h-5 ml-2 text-yellow-400" />
                    منابع یادگیری پیشنهادی
                  </h4>
                  <ul className="space-y-2">
                    {questionnaire.results.resources.map((resource, index) => (
                      <li key={index} className="flex items-center text-gray-300 persian-body">
                        <ChevronRight className="w-4 h-4 text-yellow-400 ml-2 flex-shrink-0" />
                        {resource}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Career Paths */}
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                  <h4 className="text-lg font-bold mb-4 persian-heading flex items-center">
                    <TrendingUp className="w-5 h-5 ml-2 text-yellow-400" />
                    مسیرهای شغلی مناسب
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {questionnaire.results.careerPaths.map((path, index) => (
                      <div key={index} className="bg-gray-700 p-3 rounded-lg">
                        <span className="text-gray-300 persian-body">{path}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-6 rounded-lg border border-yellow-500/30 text-center">
                  <h4 className="text-lg font-bold mb-4 persian-heading">
                    آماده شروع هستید؟
                  </h4>
                  <p className="text-gray-300 persian-body mb-6">
                    برای دریافت مشاوره تخصصی‌تر و شخصی‌سازی شده با متخصصان ما تماس بگیرید
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3 rounded-lg transition-colors persian-body">
                      مشاوره تلفنی رایگان
                    </button>
                    <button className="border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-bold px-6 py-3 rounded-lg transition-all persian-body">
                      مشاهده دوره‌های مرتبط
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}</new_str>
