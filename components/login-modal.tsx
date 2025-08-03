"use client"

import type React from "react"
import { useState } from "react"
import { Eye, EyeOff, Lock, User, X } from "lucide-react"

interface LoginModalProps {
  onLoginSuccess: () => void
  onCancel: () => void
}

const validCredentials = [
  { username: "mahdi morovati", password: "1" },
  { username: "amirhossein salek", password: "1" },
  { username: "parsa esmaili", password: "1" },
]

export default function LoginModal({ onLoginSuccess, onCancel }: LoginModalProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const isValid = validCredentials.some(
      (cred) => cred.username.toLowerCase() === username.toLowerCase().trim() && cred.password === password,
    )

    if (isValid) {
      onLoginSuccess()
    } else {
      setError("نام کاربری یا رمز عبور اشتباه است")
    }

    setIsLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-6 sm:p-8 relative">
          {/* Close Button */}
          <button
            onClick={onCancel}
            className="absolute top-3 left-3 sm:top-4 sm:left-4 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div className="text-center mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold persian-heading text-white mb-2 mobile-heading-spacing">
              ورود به بخش آموزشی
            </h1>
            <p className="text-gray-400 persian-body text-sm sm:text-base mobile-text-spacing">
              برای دسترسی به منابع آموزشی وارد شوید
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm font-medium persian-body text-gray-300 mb-2 mobile-text-spacing">
                نام کاربری
              </label>
              <div className="relative">
                <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-field pr-10 sm:pr-12 persian-body"
                  placeholder="نام کاربری خود را وارد کنید"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium persian-body text-gray-300 mb-2 mobile-text-spacing">
                رمز عبور
              </label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pr-10 pl-10 sm:pr-12 sm:pl-12 persian-body"
                  placeholder="رمز عبور خود را وارد کنید"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-300 px-3 py-2 sm:px-4 sm:py-3 rounded-lg persian-body text-xs sm:text-sm mobile-text-spacing">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary persian-body disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-black ml-2"></div>
                  در حال ورود...
                </>
              ) : (
                "ورود"
              )}
            </button>
          </form>

          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-xs text-gray-500 persian-body mobile-text-spacing">
              این بخش فقط برای دوستان در دسترس است
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
