
<old_str>"use client"

import { useState } from 'react'
import { X, User, Mail, Lock } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'login' | 'register'
  onModeChange: (mode: 'login' | 'register') => void
}

export default function AuthModal({ isOpen, onClose, mode, onModeChange }: AuthModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const { login, register } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (mode === 'login') {
      const success = login(formData.username, formData.password)
      if (success) {
        onClose()
        setFormData({ fullName: '', email: '', username: '', password: '' })
      } else {
        setError('نام کاربری یا رمز عبور نادرست است')
      }
    } else {
      // Registration
      if (!formData.fullName || !formData.email || !formData.username || !formData.password) {
        setError('لطفاً تمام فیلدها را پر کنید')
        return
      }
      
      register({
        fullName: formData.fullName,
        email: formData.email,
        username: formData.username,
        password: formData.password
      })
      onClose()
      setFormData({ fullName: '', email: '', username: '', password: '' })
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="flex space-x-1 space-x-reverse mb-4">
            <button
              onClick={() => onModeChange('register')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                mode === 'register'
                  ? 'bg-yellow-500 text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              ثبت‌نام
            </button>
            <button
              onClick={() => onModeChange('login')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                mode === 'login'
                  ? 'bg-yellow-500 text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              ورود
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">
                  نام کامل
                </label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pr-10 text-white focus:outline-none focus:border-yellow-500"
                    placeholder="نام و نام خانوادگی"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">
                  ایمیل
                </label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pr-10 text-white focus:outline-none focus:border-yellow-500"
                    placeholder="آدرس ایمیل"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">
              نام کاربری
            </label>
            <div className="relative">
              <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pr-10 text-white focus:outline-none focus:border-yellow-500"
                placeholder="نام کاربری"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">
              رمز عبور
            </label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pr-10 text-white focus:outline-none focus:border-yellow-500"
                placeholder="رمز عبور"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-400 text-sm persian-body text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg transition-colors persian-body"
          >
            {mode === 'login' ? 'ورود' : 'ثبت‌نام'}
          </button>
        </form>
      </div>
    </div>
  )
}</old_str>
<new_str>"use client"

import { useState } from 'react'
import { X, User, Mail, Lock } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'login' | 'register'
  onModeChange: (mode: 'login' | 'register') => void
}

interface FormErrors {
  fullName?: string
  email?: string
  username?: string
  password?: string
}

export default function AuthModal({ isOpen, onClose, mode, onModeChange }: AuthModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [generalError, setGeneralError] = useState('')
  const { login, register } = useAuth()

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (mode === 'register') {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'این فیلد الزامی است'
      }
      if (!formData.email.trim()) {
        newErrors.email = 'این فیلد الزامی است'
      }
    }
    
    if (!formData.username.trim()) {
      newErrors.username = 'این فیلد الزامی است'
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'این فیلد الزامی است'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setGeneralError('')
    setErrors({})

    if (!validateForm()) {
      return
    }

    if (mode === 'login') {
      const success = login(formData.username, formData.password)
      if (success) {
        onClose()
        setFormData({ fullName: '', email: '', username: '', password: '' })
      } else {
        setGeneralError('نام کاربری یا رمز عبور نادرست است')
      }
    } else {
      register({
        fullName: formData.fullName,
        email: formData.email,
        username: formData.username,
        password: formData.password
      })
      onClose()
      setFormData({ fullName: '', email: '', username: '', password: '' })
    }
  }

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value })
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined })
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="flex space-x-1 space-x-reverse mb-4">
            <button
              onClick={() => onModeChange('register')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors persian-body ${
                mode === 'register'
                  ? 'bg-yellow-500 text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              ثبت‌نام
            </button>
            <button
              onClick={() => onModeChange('login')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors persian-body ${
                mode === 'login'
                  ? 'bg-yellow-500 text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              ورود
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">
                  نام کامل
                </label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className={`w-full bg-gray-700 border rounded-lg px-4 py-3 pr-10 text-white focus:outline-none focus:border-yellow-500 ${
                      errors.fullName ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="نام و نام خانوادگی"
                  />
                </div>
                {errors.fullName && (
                  <p className="text-red-400 text-sm mt-1 persian-body">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">
                  ایمیل
                </label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full bg-gray-700 border rounded-lg px-4 py-3 pr-10 text-white focus:outline-none focus:border-yellow-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="آدرس ایمیل"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1 persian-body">{errors.email}</p>
                )}
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">
              نام کاربری
            </label>
            <div className="relative">
              <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className={`w-full bg-gray-700 border rounded-lg px-4 py-3 pr-10 text-white focus:outline-none focus:border-yellow-500 ${
                  errors.username ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="نام کاربری"
              />
            </div>
            {errors.username && (
              <p className="text-red-400 text-sm mt-1 persian-body">{errors.username}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">
              رمز عبور
            </label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`w-full bg-gray-700 border rounded-lg px-4 py-3 pr-10 text-white focus:outline-none focus:border-yellow-500 ${
                  errors.password ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="رمز عبور"
              />
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1 persian-body">{errors.password}</p>
            )}
          </div>

          {generalError && (
            <div className="text-red-400 text-sm persian-body text-center">
              {generalError}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg transition-colors persian-body"
          >
            {mode === 'login' ? 'ورود' : 'ثبت‌نام'}
          </button>
        </form>
      </div>
    </div>
  )
}</new_str>
