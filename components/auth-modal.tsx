
"use client"

import { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { X, User, Lock, Mail, UserPlus } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'login' | 'register'
  onModeChange: (mode: 'login' | 'register') => void
}

export default function AuthModal({ isOpen, onClose, mode, onModeChange }: AuthModalProps) {
  const { login, register } = useAuth()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    email: ''
  })
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (mode === 'login') {
      const success = login(formData.username, formData.password)
      if (success) {
        onClose()
        setFormData({ username: '', password: '', fullName: '', email: '' })
      } else {
        setError('نام کاربری یا رمز عبور اشتباه است')
      }
    } else {
      if (!formData.username || !formData.password || !formData.fullName || !formData.email) {
        setError('لطفاً تمام فیلدها را پر کنید')
        return
      }
      register(formData)
      onClose()
      setFormData({ username: '', password: '', fullName: '', email: '' })
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
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
            {mode === 'login' ? 'ورود به حساب کاربری' : 'ثبت‌نام'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <>
                <div>
                  <Label htmlFor="fullName" className="text-gray-300 persian-body">
                    نام کامل
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="pl-10 persian-body"
                      placeholder="نام کامل خود را وارد کنید"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-300 persian-body">
                    ایمیل
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-10 persian-body"
                      placeholder="ایمیل خود را وارد کنید"
                      required
                    />
                  </div>
                </div>
              </>
            )}
            
            <div>
              <Label htmlFor="username" className="text-gray-300 persian-body">
                نام کاربری
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className="pl-10 persian-body"
                  placeholder="نام کاربری خود را وارد کنید"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-300 persian-body">
                رمز عبور
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="pl-10 persian-body"
                  placeholder="رمز عبور خود را وارد کنید"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-sm persian-body text-center">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black persian-body font-medium"
            >
              {mode === 'login' ? (
                <>
                  <User className="w-4 h-4 ml-2" />
                  ورود
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 ml-2" />
                  ثبت‌نام
                </>
              )}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => onModeChange(mode === 'login' ? 'register' : 'login')}
                className="text-yellow-400 hover:text-yellow-300 persian-body text-sm"
              >
                {mode === 'login' 
                  ? 'حساب کاربری ندارید؟ ثبت‌نام کنید'
                  : 'حساب کاربری دارید؟ وارد شوید'
                }
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
