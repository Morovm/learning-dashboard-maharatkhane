
"use client"

import { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { X, ChevronLeft, ChevronRight, User, Briefcase, BookOpen, Globe, FileText } from 'lucide-react'

interface TalentDiscoveryFormProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  // Personal Information
  firstName: string
  lastName: string
  age: string
  educationLevel: string
  fieldOfStudy: string
  faculty: string
  physicalCondition: string
  phoneNumber: string
  province: string
  address: string
  
  // Work Domain
  jobExperience: string
  currentOccupation: string
  jobPosition: string
  
  // Skills and Abilities
  coursesAttended: string
  onlineCoursesAttended: string
  digitalToolsFamiliarity: string
  interests: string
  trainingNeeds: string
  
  // English Proficiency
  englishCourses: string
  
  // Research and Scientific Works
  articles: string
  books: string
  researchPapers: string
  competitions: string
}

const initialFormData: FormData = {
  firstName: '', lastName: '', age: '', educationLevel: '', fieldOfStudy: '',
  faculty: '', physicalCondition: '', phoneNumber: '', province: '', address: '',
  jobExperience: '', currentOccupation: '', jobPosition: '',
  coursesAttended: '', onlineCoursesAttended: '', digitalToolsFamiliarity: '',
  interests: '', trainingNeeds: '', englishCourses: '',
  articles: '', books: '', researchPapers: '', competitions: ''
}

export default function TalentDiscoveryForm({ isOpen, onClose }: TalentDiscoveryFormProps) {
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<string[]>([])

  if (!isOpen) return null

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateCurrentStep = (): boolean => {
    const newErrors: string[] = []
    
    switch (currentStep) {
      case 1: // Personal Information
        if (!formData.firstName.trim()) newErrors.push('پر کردن نام الزامی است')
        if (!formData.lastName.trim()) newErrors.push('پر کردن نام خانوادگی الزامی است')
        if (!formData.age.trim()) newErrors.push('پر کردن سن الزامی است')
        if (!formData.educationLevel.trim()) newErrors.push('پر کردن سطح تحصیلات الزامی است')
        if (!formData.phoneNumber.trim()) newErrors.push('پر کردن شماره تلفن الزامی است')
        if (!formData.province.trim()) newErrors.push('پر کردن استان الزامی است')
        break
      case 2: // Work Domain
        if (!formData.jobExperience.trim()) newErrors.push('پر کردن تجربه کاری الزامی است')
        if (!formData.currentOccupation.trim()) newErrors.push('پر کردن شغل فعلی الزامی است')
        break
      case 3: // Skills
        if (!formData.interests.trim()) newErrors.push('پر کردن علایق الزامی است')
        if (!formData.digitalToolsFamiliarity.trim()) newErrors.push('پر کردن آشنایی با ابزارهای دیجیتال الزامی است')
        break
      case 4: // English
        if (!formData.englishCourses.trim()) newErrors.push('پر کردن وضعیت دوره‌های انگلیسی الزامی است')
        break
      case 5: // Research
        // Optional fields
        break
    }
    
    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 5))
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const calculateScore = (): number => {
    let score = 0
    
    // Education level scoring
    switch (formData.educationLevel) {
      case 'دکتری': score += 30; break
      case 'کارشناسی ارشد': score += 25; break
      case 'کارشناسی': score += 20; break
      case 'دیپلم': score += 10; break
    }
    
    // Experience scoring
    if (formData.jobExperience.includes('بالا') || formData.jobExperience.includes('زیاد')) score += 25
    else if (formData.jobExperience.includes('متوسط')) score += 15
    else score += 5
    
    // English proficiency
    if (formData.englishCourses.includes('پیشرفته')) score += 20
    else if (formData.englishCourses.includes('متوسط')) score += 15
    else if (formData.englishCourses.includes('مقدماتی')) score += 10
    
    // Research work
    if (formData.articles || formData.books || formData.researchPapers) score += 25
    
    return Math.min(score, 100)
  }

  const getRecommendations = (score: number): string[] => {
    const recommendations: string[] = []
    
    if (score >= 80) {
      recommendations.push('دوره‌های پیشرفته هوش مصنوعی')
      recommendations.push('پروژه‌های تحقیقاتی')
      recommendations.push('رهبری تیم‌های فنی')
    } else if (score >= 60) {
      recommendations.push('دوره‌های متوسط برنامه‌نویسی')
      recommendations.push('پروژه‌های عملی')
      recommendations.push('مشارکت در تیم‌های فنی')
    } else {
      recommendations.push('دوره‌های مقدماتی')
      recommendations.push('آموزش مبانی برنامه‌نویسی')
      recommendations.push('پروژه‌های ساده')
    }
    
    return recommendations
  }

  const handleSubmit = () => {
    if (!validateCurrentStep()) return
    
    const score = calculateScore()
    const recommendations = getRecommendations(score)
    
    const submissionData = {
      ...formData,
      score,
      recommendations,
      submittedAt: new Date().toISOString(),
      userId: user?.username
    }
    
    // Save to localStorage
    const existingData = JSON.parse(localStorage.getItem('talentDiscoveryForms') || '[]')
    existingData.push(submissionData)
    localStorage.setItem('talentDiscoveryForms', JSON.stringify(existingData))
    
    alert(`فرم شما با موفقیت ثبت شد! امتیاز شما: ${score}/100`)
    onClose()
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label className="text-gray-300 persian-body">نام</Label>
                <Input
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="persian-body"
                  placeholder="نام خود را وارد کنید"
                />
              </div>
              <div className="flex-1">
                <Label className="text-gray-300 persian-body">نام خانوادگی</Label>
                <Input
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="persian-body"
                  placeholder="نام خانوادگی خود را وارد کنید"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-1">
                <Label className="text-gray-300 persian-body">سن</Label>
                <Input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="persian-body"
                  placeholder="سن خود را وارد کنید"
                />
              </div>
              <div className="flex-1">
                <Label className="text-gray-300 persian-body">سطح تحصیلات</Label>
                <Select onValueChange={(value) => handleInputChange('educationLevel', value)}>
                  <SelectTrigger className="persian-body">
                    <SelectValue placeholder="سطح تحصیلات خود را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="دیپلم">دیپلم</SelectItem>
                    <SelectItem value="کارشناسی">کارشناسی</SelectItem>
                    <SelectItem value="کارشناسی ارشد">کارشناسی ارشد</SelectItem>
                    <SelectItem value="دکتری">دکتری</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label className="text-gray-300 persian-body">رشته تحصیلی</Label>
              <Input
                value={formData.fieldOfStudy}
                onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
                className="persian-body"
                placeholder="رشته تحصیلی خود را وارد کنید"
              />
            </div>
            
            <div>
              <Label className="text-gray-300 persian-body">دانشکده / دانشگاه</Label>
              <Input
                value={formData.faculty}
                onChange={(e) => handleInputChange('faculty', e.target.value)}
                className="persian-body"
                placeholder="نام دانشکده یا دانشگاه خود را وارد کنید"
              />
            </div>
            
            <div>
              <Label className="text-gray-300 persian-body">شماره تلفن *</Label>
              <Input
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                className="persian-body"
                placeholder="شماره تلفن خود را وارد کنید"
              />
            </div>
            
            <div>
              <Label className="text-gray-300 persian-body">استان *</Label>
              <Select onValueChange={(value) => handleInputChange('province', value)}>
                <SelectTrigger className="persian-body">
                  <SelectValue placeholder="استان خود را انتخاب کنید" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="البرز">البرز</SelectItem>
                  <SelectItem value="تهران">تهران</SelectItem>
                  <SelectItem value="اصفهان">اصفهان</SelectItem>
                  <SelectItem value="فارس">فارس</SelectItem>
                  <SelectItem value="خراسان رضوی">خراسان رضوی</SelectItem>
                  <SelectItem value="آذربایجان شرقی">آذربایجان شرقی</SelectItem>
                  <SelectItem value="خوزستان">خوزستان</SelectItem>
                  <SelectItem value="مازندران">مازندران</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-gray-300 persian-body">تجربه کاری</Label>
              <Select onValueChange={(value) => handleInputChange('jobExperience', value)}>
                <SelectTrigger className="persian-body">
                  <SelectValue placeholder="میزان تجربه کاری خود را انتخاب کنید" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="بدون تجربه">بدون تجربه</SelectItem>
                  <SelectItem value="کمتر از یک سال">کمتر از یک سال</SelectItem>
                  <SelectItem value="۱-۳ سال">۱-۳ سال</SelectItem>
                  <SelectItem value="۳-۵ سال">۳-۵ سال</SelectItem>
                  <SelectItem value="بیش از ۵ سال">بیش از ۵ سال</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-gray-300 persian-body">شغل فعلی</Label>
              <Input
                value={formData.currentOccupation}
                onChange={(e) => handleInputChange('currentOccupation', e.target.value)}
                className="persian-body"
                placeholder="شغل فعلی خود را وارد کنید"
              />
            </div>
            
            <div>
              <Label className="text-gray-300 persian-body">سمت شغلی</Label>
              <Input
                value={formData.jobPosition}
                onChange={(e) => handleInputChange('jobPosition', e.target.value)}
                className="persian-body"
                placeholder="سمت شغلی خود را وارد کنید"
              />
            </div>
          </div>
        )
      
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-gray-300 persian-body">دوره‌های حضوری شرکت کرده</Label>
              <Textarea
                value={formData.coursesAttended}
                onChange={(e) => handleInputChange('coursesAttended', e.target.value)}
                className="persian-body"
                placeholder="دوره‌های حضوری که شرکت کرده‌اید را بنویسید"
              />
            </div>
            
            <div>
              <Label className="text-gray-300 persian-body">دوره‌های آنلاین شرکت کرده</Label>
              <Textarea
                value={formData.onlineCoursesAttended}
                onChange={(e) => handleInputChange('onlineCoursesAttended', e.target.value)}
                className="persian-body"
                placeholder="دوره‌های آنلاین که شرکت کرده‌اید را بنویسید"
              />
            </div>
            
            <div>
              <Label className="text-gray-300 persian-body">آشنایی با ابزارهای دیجیتال *</Label>
              <Textarea
                value={formData.digitalToolsFamiliarity}
                onChange={(e) => handleInputChange('digitalToolsFamiliarity', e.target.value)}
                className="persian-body"
                placeholder="میزان آشنایی خود با ابزارهای دیجیتال و کامپیوتری را شرح دهید"
              />
            </div>
            
            <div>
              <Label className="text-gray-300 persian-body">علایق آموزشی و مهارتی *</Label>
              <Textarea
                value={formData.interests}
                onChange={(e) => handleInputChange('interests', e.target.value)}
                className="persian-body"
                placeholder="علایق خود در زمینه‌های مختلف را شرح دهید"
              />
            </div>
          </div>
        )
      
      case 4:
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-gray-300 persian-body">دوره‌های زبان انگلیسی</Label>
              <Select onValueChange={(value) => handleInputChange('englishCourses', value)}>
                <SelectTrigger className="persian-body">
                  <SelectValue placeholder="سطح زبان انگلیسی خود را انتخاب کنید" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="مبتدی">مبتدی</SelectItem>
                  <SelectItem value="مقدماتی">مقدماتی</SelectItem>
                  <SelectItem value="متوسط">متوسط</SelectItem>
                  <SelectItem value="پیشرفته">پیشرفته</SelectItem>
                  <SelectItem value="بدون دوره">هیچ دوره‌ای نگذرانده‌ام</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      
      case 5:
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-gray-300 persian-body">مقالات منتشر شده</Label>
              <Textarea
                value={formData.articles}
                onChange={(e) => handleInputChange('articles', e.target.value)}
                className="persian-body"
                placeholder="مقالات منتشر شده خود را بنویسید (اختیاری)"
              />
            </div>
            
            <div>
              <Label className="text-gray-300 persian-body">کتاب‌های نوشته شده</Label>
              <Textarea
                value={formData.books}
                onChange={(e) => handleInputChange('books', e.target.value)}
                className="persian-body"
                placeholder="کتاب‌های نوشته شده خود را بنویسید (اختیاری)"
              />
            </div>
            
            <div>
              <Label className="text-gray-300 persian-body">مسابقات شرکت کرده</Label>
              <Textarea
                value={formData.competitions}
                onChange={(e) => handleInputChange('competitions', e.target.value)}
                className="persian-body"
                placeholder="مسابقات که در آن شرکت کرده‌اید را بنویسید (اختیاری)"
              />
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1: return <User className="w-5 h-5" />
      case 2: return <Briefcase className="w-5 h-5" />
      case 3: return <BookOpen className="w-5 h-5" />
      case 4: return <Globe className="w-5 h-5" />
      case 5: return <FileText className="w-5 h-5" />
      default: return null
    }
  }

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return 'اطلاعات شخصی'
      case 2: return 'حوزه کاری'
      case 3: return 'مهارت‌ها و توانایی‌ها'
      case 4: return 'مهارت زبان انگلیسی'
      case 5: return 'آثار تحقیقاتی و علمی'
      default: return ''
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl bg-gray-800 border-gray-700 max-h-[90vh] overflow-hidden">
        <CardHeader className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            {getStepIcon(currentStep)}
            <CardTitle className="text-xl persian-heading text-white">
              {getStepTitle(currentStep)}
            </CardTitle>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-400 persian-body">
              مرحله {currentStep} از 5
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(step => (
                <div
                  key={step}
                  className={`w-2 h-2 rounded-full ${
                    step <= currentStep ? 'bg-yellow-500' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="overflow-y-auto max-h-[60vh]">
          {renderStep()}
          
          {errors.length > 0 && (
            <div className="mt-4 space-y-1">
              {errors.map((error, index) => (
                <div key={index} className="text-red-400 text-sm persian-body">
                  {error}
                </div>
              ))}
            </div>
          )}
          
          <div className="flex justify-between mt-6">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              variant="outline"
              className="persian-body"
            >
              <ChevronRight className="w-4 h-4 mr-2" />
              قبلی
            </Button>
            
            {currentStep === 5 ? (
              <Button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 persian-body"
              >
                ثبت نهایی
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="bg-yellow-500 hover:bg-yellow-600 text-black persian-body"
              >
                بعدی
                <ChevronLeft className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
