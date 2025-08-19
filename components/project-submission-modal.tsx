
"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { X, Upload } from 'lucide-react'

interface ProjectSubmissionModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'community' | 'freelance'
  onSubmit: (data: any) => void
}

export default function ProjectSubmissionModal({ 
  isOpen, 
  onClose, 
  type, 
  onSubmit 
}: ProjectSubmissionModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    githubLink: '',
    company: '',
    budget: '',
    contactEmail: ''
  })
  const [errors, setErrors] = useState<string[]>([])

  if (!isOpen) return null

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateForm = (): boolean => {
    const newErrors: string[] = []
    
    if (!formData.title) newErrors.push('عنوان پروژه الزامی است')
    if (!formData.description) newErrors.push('توضیحات الزامی است')
    
    if (type === 'community' && !formData.githubLink) {
      newErrors.push('لینک گیت‌هاب الزامی است')
    }
    
    if (type === 'freelance' && !formData.contactEmail) {
      newErrors.push('ایمیل تماس الزامی است')
    }
    
    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    const submissionData = {
      ...formData,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
      type
    }
    
    onSubmit(submissionData)
    setFormData({
      title: '',
      description: '',
      githubLink: '',
      company: '',
      budget: '',
      contactEmail: ''
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
          <CardTitle className="text-xl persian-heading text-white text-center">
            {type === 'community' ? 'ثبت پروژه شما' : 'ثبت آگهی پروژه'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-gray-300 persian-body">
                عنوان پروژه
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="persian-body"
                placeholder="عنوان پروژه خود را وارد کنید"
                required
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-gray-300 persian-body">
                {type === 'community' ? 'توضیحات کوتاه' : 'توضیحات کامل'}
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="persian-body"
                placeholder="توضیحات پروژه خود را وارد کنید"
                required
              />
            </div>

            {type === 'community' && (
              <div>
                <Label htmlFor="githubLink" className="text-gray-300 persian-body">
                  لینک گیت‌هاب
                </Label>
                <Input
                  id="githubLink"
                  value={formData.githubLink}
                  onChange={(e) => handleInputChange('githubLink', e.target.value)}
                  className="persian-body"
                  placeholder="https://github.com/..."
                  required
                />
              </div>
            )}

            {type === 'freelance' && (
              <>
                <div>
                  <Label htmlFor="company" className="text-gray-300 persian-body">
                    نام شرکت (اختیاری)
                  </Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="persian-body"
                    placeholder="نام شرکت خود را وارد کنید"
                  />
                </div>

                <div>
                  <Label htmlFor="budget" className="text-gray-300 persian-body">
                    بودجه پیشنهادی (اختیاری)
                  </Label>
                  <Input
                    id="budget"
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    className="persian-body"
                    placeholder="بودجه پیشنهادی خود را وارد کنید"
                  />
                </div>

                <div>
                  <Label htmlFor="contactEmail" className="text-gray-300 persian-body">
                    ایمیل تماس
                  </Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    className="persian-body"
                    placeholder="ایمیل تماس خود را وارد کنید"
                    required
                  />
                </div>
              </>
            )}

            {errors.length > 0 && (
              <div className="space-y-1">
                {errors.map((error, index) => (
                  <div key={index} className="text-red-400 text-sm persian-body">
                    {error}
                  </div>
                ))}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black persian-body font-medium"
            >
              <Upload className="w-4 h-4 ml-2" />
              ثبت پروژه
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
