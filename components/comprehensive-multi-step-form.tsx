"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { ChevronLeft, ChevronRight, User, Briefcase, BookOpen, Globe, FileText, CheckCircle, X } from "lucide-react"

interface ComprehensiveFormData {
  // Section 1: Personal Information
  firstName: string
  lastName: string
  age: number
  educationLevel: string
  fieldOfStudy: string
  facultyUniversity: string
  physicalCondition: string
  phoneNumber: string
  provinceOfResidence: string
  address: string

  // Section 2: Work Domain
  jobExperience: string
  currentOccupation: string
  jobPosition: string

  // Section 3: Individual Skills and Abilities
  coursesAttended: string
  onlineCoursesAttended: string
  digitalToolsFamiliarity: string
  educationalInterests: string
  trainingNeeds: string

  // Section 4: English Proficiency
  englishCoursesAttended: string

  // Section 5: Research and Scientific Works
  articles: string
  books: string
  researchPapers: string
  competitions: string
}

interface ComprehensiveMultiStepFormProps {
  onComplete: (data: ComprehensiveFormData, score: number, recommendations: string[]) => void
  onClose: () => void
}

const provinces = [
  "تهران", "اصفهان", "فارس", "خراسان رضوی", "آذربایجان شرقی", "خوزستان", "مازندران", "کرمان", 
  "آذربایجان غربی", "گیلان", "مرکزی", "قم", "قزوین", "گلستان", "لرستان", "البرز", "کرمانشاه", 
  "هرمزگان", "یزد", "اردبیل", "زنجان", "سمنان", "بوشهر", "چهارمحال و بختیاری", "کردستان", 
  "ایلام", "کهگیلویه و بویراحمد", "خراسان شمالی", "خراسان جنوبی", "سیستان و بلوچستان"
]

const educationLevels = ["دیپلم", "کاردانی", "کارشناسی", "کارشناسی ارشد", "دکتری"]
const physicalConditions = ["سالم", "معلولیت جزئی", "معلولیت کامل", "ترجیح می‌دهم نگویم"]

export default function ComprehensiveMultiStepForm({ onComplete, onClose }: ComprehensiveMultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<ComprehensiveFormData>()

  const totalSteps = 5

  const nextStep = () => {
    // Validate current step before proceeding
    const currentStepData = getCurrentStepData()
    if (!validateCurrentStep(currentStepData)) {
      return
    }
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const getCurrentStepData = () => {
    const formData = watch()
    switch (currentStep) {
      case 1:
        return {
          firstName: formData.firstName,
          lastName: formData.lastName,
          age: formData.age,
          educationLevel: formData.educationLevel,
          fieldOfStudy: formData.fieldOfStudy,
          facultyUniversity: formData.facultyUniversity,
          physicalCondition: formData.physicalCondition,
          phoneNumber: formData.phoneNumber,
          provinceOfResidence: formData.provinceOfResidence,
          address: formData.address
        }
      case 2:
        return {
          jobExperience: formData.jobExperience,
          currentOccupation: formData.currentOccupation,
          jobPosition: formData.jobPosition
        }
      case 3:
        return {
          coursesAttended: formData.coursesAttended,
          onlineCoursesAttended: formData.onlineCoursesAttended,
          digitalToolsFamiliarity: formData.digitalToolsFamiliarity,
          educationalInterests: formData.educationalInterests,
          trainingNeeds: formData.trainingNeeds
        }
      case 4:
        return {
          englishCoursesAttended: formData.englishCoursesAttended
        }
      case 5:
        return {
          articles: formData.articles,
          books: formData.books,
          researchPapers: formData.researchPapers,
          competitions: formData.competitions
        }
      default:
        return {}
    }
  }

  const validateCurrentStep = (stepData: any) => {
    switch (currentStep) {
      case 1:
        const requiredFields1 = ['firstName', 'lastName', 'age', 'educationLevel', 'fieldOfStudy', 'facultyUniversity', 'physicalCondition', 'phoneNumber', 'provinceOfResidence', 'address']
        return requiredFields1.every(field => stepData[field] && stepData[field].toString().trim())
      case 2:
        // Work domain is optional, allow progression
        return true
      case 3:
        // Skills section is optional, allow progression
        return true
      case 4:
        // English proficiency is optional, allow progression
        return true
      case 5:
        // Research section is optional, allow progression
        return true
      default:
        return true
    }
  }

  const calculateScore = (data: ComprehensiveFormData): number => {
    let score = 0
    
    // Education level scoring
    const educationScores = { "دیپلم": 10, "کاردانی": 15, "کارشناسی": 20, "کارشناسی ارشد": 25, "دکتری": 30 }
    score += educationScores[data.educationLevel as keyof typeof educationScores] || 0
    
    // Experience scoring
    if (data.jobExperience && data.jobExperience.length > 50) score += 15
    if (data.currentOccupation && data.currentOccupation.trim()) score += 10
    
    // Skills scoring
    if (data.coursesAttended && data.coursesAttended.length > 30) score += 10
    if (data.onlineCoursesAttended && data.onlineCoursesAttended.length > 30) score += 10
    if (data.digitalToolsFamiliarity && data.digitalToolsFamiliarity.length > 30) score += 15
    
    // Research scoring
    if (data.articles && data.articles.trim()) score += 10
    if (data.books && data.books.trim()) score += 10
    if (data.researchPapers && data.researchPapers.trim()) score += 15
    if (data.competitions && data.competitions.trim()) score += 10
    
    // English proficiency
    if (data.englishCoursesAttended && data.englishCoursesAttended.trim()) score += 10
    
    return Math.min(score, 100)
  }

  const generateRecommendations = (data: ComprehensiveFormData, score: number): string[] => {
    const recommendations: string[] = []
    
    if (score >= 80) {
      recommendations.push("دوره‌های پیشرفته هوش مصنوعی")
      recommendations.push("پروژه‌های تحقیقاتی")
      recommendations.push("مربیگری و تدریس")
    } else if (score >= 60) {
      recommendations.push("دوره‌های متوسط یادگیری ماشین")
      recommendations.push("پروژه‌های عملی")
      recommendations.push("تقویت مهارت‌های برنامه‌نویسی")
    } else {
      recommendations.push("دوره‌های مقدماتی هوش مصنوعی")
      recommendations.push("آموزش پایه‌های برنامه‌نویسی")
      recommendations.push("آشنایی با ابزارهای AI")
    }
    
    // Add specific recommendations based on interests
    if (data.educationalInterests?.includes("تولید محتوا")) {
      recommendations.push("دوره تولید محتوا با AI")
    }
    if (data.educationalInterests?.includes("تحلیل داده")) {
      recommendations.push("دوره تحلیل داده و علم داده")
    }
    
    return recommendations
  }

  const onSubmit = async (data: ComprehensiveFormData) => {
    setIsSubmitting(true)
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const score = calculateScore(data)
    const recommendations = generateRecommendations(data, score)
    
    // Save user data to localStorage with username as filename
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
    const filename = `user_data_${currentUser.username || 'anonymous'}.json`
    const userData = {
      ...data,
      score,
      recommendations,
      submittedAt: new Date().toISOString(),
      username: currentUser.username
    }
    
    localStorage.setItem(filename, JSON.stringify(userData))
    localStorage.setItem("userFormCompleted", "true")
    
    setIsSubmitting(false)
    onComplete(data, score, recommendations)
  }

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1: return User
      case 2: return Briefcase
      case 3: return BookOpen
      case 4: return Globe
      case 5: return FileText
      default: return User
    }
  }

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return "اطلاعات شخصی"
      case 2: return "حوزه کاری"
      case 3: return "مهارت‌ها و توانایی‌ها"
      case 4: return "مهارت زبان انگلیسی"
      case 5: return "آثار تحقیقاتی و علمی"
      default: return ""
    }
  }

  if (isSubmitting) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-2xl p-8 text-center max-w-md">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500 mx-auto mb-6"></div>
          <h3 className="text-xl font-bold persian-heading text-white mb-2">در حال پردازش اطلاعات</h3>
          <p className="text-gray-400 persian-body">لطفاً صبر کنید...</p>
        </div>
      </div>
    )
  }

  const StepIcon = getStepIcon(currentStep)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black p-6 rounded-t-2xl">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <StepIcon className="w-8 h-8 ml-3" />
              <div>
                <h2 className="text-2xl font-bold persian-heading">فرم کشف استعداد</h2>
                <p className="text-black/80 persian-body">{getStepTitle(currentStep)}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-black hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-2 space-x-reverse">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step <= currentStep ? 'bg-black text-yellow-500' : 'bg-gray-300 text-gray-600'
                }`}>
                  {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
                </div>
                {step < 5 && <div className={`w-8 h-1 ${step < currentStep ? 'bg-black' : 'bg-gray-300'}`} />}
              </div>
            ))}
          </div>

          <div className="mt-2 text-sm persian-body">
            مرحله {currentStep} از {totalSteps}
          </div>
        </div>

        <div className="p-6">
          {/* Section 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">نام</label>
                  <input
                    {...register("firstName", { required: "نام الزامی است" })}
                    className="input-field persian-body"
                    placeholder="نام خود را وارد کنید"
                  />
                  {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">نام خانوادگی</label>
                  <input
                    {...register("lastName", { required: "نام خانوادگی الزامی است" })}
                    className="input-field persian-body"
                    placeholder="نام خانوادگی خود را وارد کنید"
                  />
                  {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">سن</label>
                  <input
                    type="number"
                    {...register("age", { required: "سن الزامی است", min: 16, max: 80 })}
                    className="input-field persian-body"
                    placeholder="سن خود را وارد کنید"
                  />
                  {errors.age && <p className="text-red-400 text-sm mt-1">{errors.age.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">سطح تحصیلات</label>
                  <select {...register("educationLevel", { required: "انتخاب سطح تحصیلات الزامی است" })} className="input-field persian-body">
                    <option value="">انتخاب کنید</option>
                    {educationLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                  {errors.educationLevel && <p className="text-red-400 text-sm mt-1">{errors.educationLevel.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">رشته تحصیلی</label>
                  <input
                    {...register("fieldOfStudy", { required: "رشته تحصیلی الزامی است" })}
                    className="input-field persian-body"
                    placeholder="رشته تحصیلی خود را وارد کنید"
                  />
                  {errors.fieldOfStudy && <p className="text-red-400 text-sm mt-1">{errors.fieldOfStudy.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">دانشکده / دانشگاه</label>
                  <input
                    {...register("facultyUniversity", { required: "دانشکده/دانشگاه الزامی است" })}
                    className="input-field persian-body"
                    placeholder="نام دانشکده یا دانشگاه"
                  />
                  {errors.facultyUniversity && <p className="text-red-400 text-sm mt-1">{errors.facultyUniversity.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">وضعیت جسمانی</label>
                  <select {...register("physicalCondition", { required: "انتخاب وضعیت جسمانی الزامی است" })} className="input-field persian-body">
                    <option value="">انتخاب کنید</option>
                    {physicalConditions.map(condition => (
                      <option key={condition} value={condition}>{condition}</option>
                    ))}
                  </select>
                  {errors.physicalCondition && <p className="text-red-400 text-sm mt-1">{errors.physicalCondition.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">شماره تماس</label>
                  <input
                    {...register("phoneNumber", { required: "شماره تماس الزامی است" })}
                    className="input-field persian-body"
                    placeholder="09xxxxxxxxx"
                  />
                  {errors.phoneNumber && <p className="text-red-400 text-sm mt-1">{errors.phoneNumber.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">استان محل سکونت</label>
                  <select {...register("provinceOfResidence", { required: "انتخاب استان الزامی است" })} className="input-field persian-body">
                    <option value="">انتخاب کنید</option>
                    {provinces.map(province => (
                      <option key={province} value={province}>{province}</option>
                    ))}
                  </select>
                  {errors.provinceOfResidence && <p className="text-red-400 text-sm mt-1">{errors.provinceOfResidence.message}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">آدرس</label>
                  <textarea
                    {...register("address", { required: "آدرس الزامی است" })}
                    className="input-field persian-body resize-none"
                    rows={3}
                    placeholder="آدرس کامل خود را وارد کنید"
                  />
                  {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address.message}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Work Domain */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">تجربه کاری</label>
                <textarea
                  {...register("jobExperience")}
                  className="input-field persian-body resize-none"
                  rows={4}
                  placeholder="تجربه کاری خود را به تفصیل شرح دهید..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">شغل فعلی</label>
                <input
                  {...register("currentOccupation")}
                  className="input-field persian-body"
                  placeholder="شغل فعلی خود را وارد کنید"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">سمت شغلی</label>
                <input
                  {...register("jobPosition")}
                  className="input-field persian-body"
                  placeholder="سمت یا موقعیت شغلی خود را وارد کنید"
                />
              </div>
            </div>
          )}

          {/* Section 3: Individual Skills and Abilities */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">دوره‌های گذرانده شده</label>
                <textarea
                  {...register("coursesAttended")}
                  className="input-field persian-body resize-none"
                  rows={3}
                  placeholder="دوره‌هایی که تاکنون گذرانده‌اید را نام ببرید..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">دوره‌های آنلاین گذرانده شده</label>
                <textarea
                  {...register("onlineCoursesAttended")}
                  className="input-field persian-body resize-none"
                  rows={3}
                  placeholder="دوره‌های آنلاین که شرکت کرده‌اید..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">آشنایی با ابزارهای دیجیتال و سیستم‌های کامپیوتری</label>
                <textarea
                  {...register("digitalToolsFamiliarity")}
                  className="input-field persian-body resize-none"
                  rows={3}
                  placeholder="میزان آشنایی خود با ابزارهای دیجیتال را شرح دهید..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">علایق در زمینه‌های آموزشی و مهارتی</label>
                <textarea
                  {...register("educationalInterests")}
                  className="input-field persian-body resize-none"
                  rows={3}
                  placeholder="علایق آموزشی و مهارتی خود را بیان کنید..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">نیازهای آموزشی</label>
                <textarea
                  {...register("trainingNeeds")}
                  className="input-field persian-body resize-none"
                  rows={3}
                  placeholder="چه آموزش‌هایی نیاز دارید؟"
                />
              </div>
            </div>
          )}

          {/* Section 4: English Proficiency */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">دوره‌های زبان انگلیسی گذرانده شده</label>
                <textarea
                  {...register("englishCoursesAttended")}
                  className="input-field persian-body resize-none"
                  rows={4}
                  placeholder="دوره‌های زبان انگلیسی که گذرانده‌اید، سطح زبان خود و مدارک مرتبط را شرح دهید..."
                />
              </div>
            </div>
          )}

          {/* Section 5: Research and Scientific Works */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">مقالات</label>
                <textarea
                  {...register("articles")}
                  className="input-field persian-body resize-none"
                  rows={3}
                  placeholder="مقالات منتشر شده یا در حال نگارش..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">کتاب‌ها</label>
                <textarea
                  {...register("books")}
                  className="input-field persian-body resize-none"
                  rows={3}
                  placeholder="کتاب‌های نوشته شده یا ترجمه شده..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">پژوهش‌ها</label>
                <textarea
                  {...register("researchPapers")}
                  className="input-field persian-body resize-none"
                  rows={3}
                  placeholder="پژوهش‌ها و پروژه‌های تحقیقاتی..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">مسابقات</label>
                <textarea
                  {...register("competitions")}
                  className="input-field persian-body resize-none"
                  rows={3}
                  placeholder="مسابقات، جوایز و افتخارات علمی..."
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed persian-body"
            >
              <ChevronRight className="w-4 h-4 ml-2" />
              قبلی
            </button>

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center px-6 py-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 persian-body font-medium"
              >
                بعدی
                <ChevronLeft className="w-4 h-4 mr-2" />
              </button>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="inline">
                <button
                  type="submit"
                className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 persian-body font-medium"
                >
                <CheckCircle className="w-4 h-4 ml-2" />
                ثبت نهایی
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}