"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { ChevronLeft, ChevronRight, User, Briefcase, BookOpen, CheckCircle } from "lucide-react"

// This schema is from the original code and will be used as the base for modifications.
// The new schema from the 'changes' section will be integrated conceptually where applicable.
interface FormData {
  // Personal Details
  firstName: string
  lastName: string
  gender: string
  educationLevel: string
  fieldOfStudy: string
  employmentStatus: string
  contactNumber: string
  province: string
  age: number

  // Professional Background
  jobHistory: string
  currentRole: string
  yearsOfExperience: number

  // Skills and Interests
  coursesAttended: string[]
  competitions: string[]
  aiToolsFamiliarity: string[]
  educationalInterests: string[]
}

// Course recommendations based on interests (from the changes)
const courseRecommendations = {
  "text-generation": ["تولید محتوا با AI", "خلاصه‌سازی متن", "ترجمه هوشمند"],
  "image-processing": ["پردازش تصویر", "تشخیص اشیاء", "تولید تصویر با AI"],
  "data-analysis": ["تحلیل داده", "یادگیری ماشین", "علم داده کاربردی"],
  "chatbot": ["توسعه چت‌بات", "پردازش زبان طبیعی", "مکالمه هوشمند"],
  "web-development": ["توسعه وب", "API Design", "Full-Stack Development"],
  "mobile-development": ["توسعه موبایل", "React Native", "Flutter"]
}

interface MultiStepFormProps {
  onComplete: (data: FormData) => void
  onClose: () => void
}

const provinces = [
  "تهران", "اصفهان", "فارس", "خراسان رضوی", "آذربایجان شرقی", "خوزستان", "مازندران", "کرمان", "آذربایجان غربی", "گیلان",
  "مرکزی", "قم", "قزوین", "گلستان", "لرستان", "البرز", "کرمانشاه", "هرمزگان", "یزد", "اردبیل", "زنجان", "سمنان",
  "بوشهر", "چهارمحال و بختیاری", "کردستان", "ایلام", "کهگیلویه و بویراحمد", "خراسان شمالی", "خراسان جنوبی", "سیستان و بلوچستان"
]

const educationLevels = ["دیپلم", "کاردانی", "کارشناسی", "کارشناسی ارشد", "دکتری"]
const employmentStatuses = ["شاغل", "بیکار", "دانشجو", "بازنشسته", "خانه‌دار"]
const aiTools = ["ChatGPT", "Canva AI", "Midjourney", "Claude", "Gemini", "Copy.ai", "Jasper", "هیچکدام"]
const interests = ["تولید محتوا", "تحلیل داده", "طراحی گرافیک", "برنامه‌نویسی", "بازاریابی دیجیتال", "مدیریت پروژه"]

export default function MultiStepForm({ onComplete, onClose }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<FormData>()

  const totalSteps = 3

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = (data: FormData) => {
    // Store in localStorage
    localStorage.setItem('userFormData', JSON.stringify(data))
    onComplete(data)
  }

  const handleArrayChange = (field: keyof FormData, value: string, checked: boolean) => {
    const currentValues = watch(field) as string[] || []
    if (checked) {
      setValue(field, [...currentValues, value] as any)
    } else {
      setValue(field, currentValues.filter(item => item !== value) as any)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black p-6 rounded-t-2xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold persian-heading">فرم ثبت‌نام دوره</h2>
            <button onClick={onClose} className="text-black hover:text-gray-700">
              ✕
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-4 space-x-reverse">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step <= currentStep ? 'bg-black text-yellow-500' : 'bg-gray-300 text-gray-600'
                }`}>
                  {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
                </div>
                {step < 4 && <div className={`w-12 h-1 ${step < currentStep ? 'bg-black' : 'bg-gray-300'}`} />}
              </div>
            ))}
          </div>

          <div className="mt-2 text-sm">
            مرحله {currentStep} از {totalSteps}
          </div>
          
          {!validateCurrentStep() && currentStep > 1 && (
            <div className="mt-2 text-xs text-red-300 persian-body">
              لطفاً تمام فیلدهای الزامی را پر کنید
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {/* Step 1: Personal Details */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="flex items-center mb-6">
                <User className="w-6 h-6 text-yellow-500 ml-3" />
                <h3 className="text-xl font-semibold persian-heading text-white">اطلاعات شخصی</h3>
              </div>

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
                  <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">جنسیت</label>
                  <select {...register("gender", { required: "انتخاب جنسیت الزامی است" })} className="input-field persian-body">
                    <option value="">انتخاب کنید</option>
                    <option value="male">مرد</option>
                    <option value="female">زن</option>
                  </select>
                  {errors.gender && <p className="text-red-400 text-sm mt-1">{errors.gender.message}</p>}
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
                    {...register("fieldOfStudy")}
                    className="input-field persian-body"
                    placeholder="رشته تحصیلی خود را وارد کنید"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">وضعیت اشتغال</label>
                  <select {...register("employmentStatus", { required: "انتخاب وضعیت اشتغال الزامی است" })} className="input-field persian-body">
                    <option value="">انتخاب کنید</option>
                    {employmentStatuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  {errors.employmentStatus && <p className="text-red-400 text-sm mt-1">{errors.employmentStatus.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">استان</label>
                  <select {...register("province", { required: "انتخاب استان الزامی است" })} className="input-field persian-body">
                    <option value="">انتخاب کنید</option>
                    {provinces.map(province => (
                      <option key={province} value={province}>{province}</option>
                    ))}
                  </select>
                  {errors.province && <p className="text-red-400 text-sm mt-1">{errors.province.message}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">شماره تماس</label>
                  <input
                    {...register("contactNumber", { required: "شماره تماس الزامی است" })}
                    className="input-field persian-body"
                    placeholder="09xxxxxxxxx"
                  />
                  {errors.contactNumber && <p className="text-red-400 text-sm mt-1">{errors.contactNumber.message}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Professional Background */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="flex items-center mb-6">
                <User className="w-6 h-6 text-yellow-500 ml-3" />
                <h3 className="text-xl font-semibold persian-heading text-white">اطلاعات حساب کاربری</h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">نام کاربری *</label>
                <input
                  {...register("username", { required: "نام کاربری الزامی است" })}
                  className="input-field persian-body"
                  placeholder="نام کاربری خود را انتخاب کنید"
                />
                {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">رمز عبور *</label>
                <input
                  type="password"
                  {...register("password", { required: "رمز عبور الزامی است", minLength: { value: 3, message: "رمز عبور باید حداقل ۳ کاراکتر باشد" } })}
                  className="input-field persian-body"
                  placeholder="رمز عبور خود را وارد کنید"
                />
                {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
              </div>

              <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4">
                <p className="text-sm text-blue-300 persian-body">
                  این اطلاعات برای ایجاد حساب کاربری شما استفاده می‌شود و امکان دسترسی به بخش‌های آموزشی را فراهم می‌کند.
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Professional Background */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="flex items-center mb-6">
                <Briefcase className="w-6 h-6 text-yellow-500 ml-3" />
                <h3 className="text-xl font-semibold persian-heading text-white">سابقه شغلی</h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">سابقه کاری</label>
                <textarea
                  {...register("jobHistory", { required: "سابقه کاری الزامی است" })}
                  className="input-field persian-body resize-none"
                  rows={4}
                  placeholder="سابقه کاری خود را به طور خلاصه شرح دهید..."
                />
                {errors.jobHistory && <p className="text-red-400 text-sm mt-1">{errors.jobHistory.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">شغل فعلی</label>
                <input
                  {...register("currentRole", { required: "شغل فعلی الزامی است" })}
                  className="input-field persian-body"
                  placeholder="شغل فعلی خود را وارد کنید"
                />
                {errors.currentRole && <p className="text-red-400 text-sm mt-1">{errors.currentRole.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">سال‌های تجربه کاری</label>
                <input
                  type="number"
                  {...register("yearsOfExperience", { min: 0, max: 50 })}
                  className="input-field persian-body"
                  placeholder="تعداد سال‌های تجربه"
                />
              </div>
            </div>
          )}

          {/* Step 3: Skills and Interests */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex items-center mb-6">
                <BookOpen className="w-6 h-6 text-yellow-500 ml-3" />
                <h3 className="text-xl font-semibold persian-heading text-white">مهارت‌ها و علایق</h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3 persian-body">آشنایی با ابزارهای هوش مصنوعی</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {aiTools.map(tool => (
                    <label key={tool} className="flex items-center space-x-2 space-x-reverse">
                      <input
                        type="checkbox"
                        onChange={(e) => handleArrayChange('aiToolsFamiliarity', tool, e.target.checked)}
                        className="rounded border-gray-600 text-yellow-500 focus:ring-yellow-500"
                      />
                      <span className="text-sm text-gray-300 persian-body">{tool}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3 persian-body">علایق آموزشی</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {interests.map(interest => (
                    <label key={interest} className="flex items-center space-x-2 space-x-reverse">
                      <input
                        type="checkbox"
                        onChange={(e) => handleArrayChange('educationalInterests', interest, e.target.checked)}
                        className="rounded border-gray-600 text-yellow-500 focus:ring-yellow-500"
                      />
                      <span className="text-sm text-gray-300 persian-body">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">دوره‌های گذرانده شده</label>
                <textarea
                  {...register("coursesAttended")}
                  className="input-field persian-body resize-none"
                  rows={3}
                  placeholder="دوره‌هایی که قبلاً گذرانده‌اید را نام ببرید..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">مسابقات شرکت کرده</label>
                <textarea
                  {...register("competitions")}
                  className="input-field persian-body resize-none"
                  rows={3}
                  placeholder="مسابقات یا پروژه‌هایی که در آن‌ها شرکت کرده‌اید..."
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
                className={`flex items-center px-6 py-3 rounded-lg persian-body font-medium transition-colors ${
                  validateCurrentStep() 
                    ? 'bg-yellow-500 text-black hover:bg-yellow-600 cursor-pointer' 
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!validateCurrentStep()}
              >
                بعدی
                <ChevronLeft className="w-4 h-4 mr-2" />
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 persian-body font-medium"
              >
                <CheckCircle className="w-4 h-4 ml-2" />
                ثبت نهایی
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}