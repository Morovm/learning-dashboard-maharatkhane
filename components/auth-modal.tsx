"use client"

import { useState } from "react"
import { X, User, Mail, Lock, Eye, EyeOff, CheckCircle } from "lucide-react"

interface AuthModalProps {
  onClose: () => void
  onLoginSuccess: () => void
}

interface User {
  fullName: string
  email: string
  username: string
  password: string
}

const predefinedUsers: User[] = [
  { fullName: "مهدی مروتی", email: "mahdi@example.com", username: "Mahdi Morovati", password: "1" },
  { fullName: "پارسا اسماعیلی", email: "parsa@example.com", username: "Parsa Esmaili", password: "1" },
  { fullName: "امیرحسین سالک", email: "amirhossein@example.com", username: "Amirhossein Salek", password: "1" },
  { fullName: "عرفان محمدیان", email: "erfan@example.com", username: "Erfan Mohammadian", password: "1" }
]

export default function AuthModal({ onClose, onLoginSuccess }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">("register")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  // Registration form state
  const [regForm, setRegForm] = useState({
    fullName: "",
    email: "",
    username: "",
    password: ""
  })
  const [regErrors, setRegErrors] = useState<Record<string, string>>({})
  
  // Login form state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: ""
  })
  const [loginError, setLoginError] = useState("")

  // Initialize localStorage with predefined users
  const initializeUsers = () => {
    const existingUsers = localStorage.getItem("registeredUsers")
    if (!existingUsers) {
      localStorage.setItem("registeredUsers", JSON.stringify(predefinedUsers))
    }
  }

  const validateRegistration = () => {
    const errors: Record<string, string> = {}
    
    if (!regForm.fullName.trim()) {
      errors.fullName = "این فیلد الزامی است"
    }
    
    if (!regForm.email.trim()) {
      errors.email = "این فیلد الزامی است"
    } else if (!/\S+@\S+\.\S+/.test(regForm.email)) {
      errors.email = "ایمیل معتبر وارد کنید"
    }
    
    if (!regForm.username.trim()) {
      errors.username = "این فیلد الزامی است"
    }
    
    if (!regForm.password.trim()) {
      errors.password = "این فیلد الزامی است"
    } else if (regForm.password.length < 3) {
      errors.password = "رمز عبور باید حداقل ۳ کاراکتر باشد"
    }
    
    return errors
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    const errors = validateRegistration()
    setRegErrors(errors)
    
    if (Object.keys(errors).length > 0) {
      setIsLoading(false)
      return
    }

    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    try {
      initializeUsers()
      const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
      
      // Check if username or email already exists
      const existingUser = users.find((user: User) => 
        user.username.toLowerCase() === regForm.username.toLowerCase() || 
        user.email.toLowerCase() === regForm.email.toLowerCase()
      )
      
      if (existingUser) {
        setRegErrors({ username: "نام کاربری یا ایمیل قبلاً ثبت شده است" })
        setIsLoading(false)
        return
      }
      
      // Add new user
      const newUser: User = {
        fullName: regForm.fullName,
        email: regForm.email,
        username: regForm.username,
        password: regForm.password
      }
      
      users.push(newUser)
      localStorage.setItem("registeredUsers", JSON.stringify(users))
      localStorage.setItem("currentUser", JSON.stringify(newUser))
      
      onLoginSuccess()
    } catch (error) {
      setRegErrors({ general: "خطا در ثبت‌نام. لطفاً دوباره تلاش کنید." })
    }
    
    setIsLoading(false)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setLoginError("")

    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    try {
      initializeUsers()
      const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
      
      const user = users.find((user: User) => 
        user.username.toLowerCase() === loginForm.username.toLowerCase() && 
        user.password === loginForm.password
      )
      
      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user))
        onLoginSuccess()
      } else {
        setLoginError("نام کاربری یا رمز عبور اشتباه است")
      }
    } catch (error) {
      setLoginError("خطا در ورود. لطفاً دوباره تلاش کنید.")
    }
    
    setIsLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold persian-heading">ورود / ثبت‌نام</h2>
            <button onClick={onClose} className="text-black hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Tabs */}
          <div className="flex mt-4 bg-black bg-opacity-20 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "register" 
                  ? "bg-white text-black" 
                  : "text-white hover:bg-white hover:bg-opacity-20"
              }`}
            >
              ثبت‌نام
            </button>
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "login" 
                  ? "bg-white text-black" 
                  : "text-white hover:bg-white hover:bg-opacity-20"
              }`}
            >
              ورود
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === "register" ? (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">
                  نام و نام خانوادگی
                </label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={regForm.fullName}
                    onChange={(e) => setRegForm({...regForm, fullName: e.target.value})}
                    className="input-field pr-10 persian-body"
                    placeholder="نام کامل خود را وارد کنید"
                  />
                </div>
                {regErrors.fullName && (
                  <p className="text-red-400 text-sm mt-1 persian-body">{regErrors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">
                  ایمیل
                </label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="email"
                    value={regForm.email}
                    onChange={(e) => setRegForm({...regForm, email: e.target.value})}
                    className="input-field pr-10 english-text"
                    placeholder="your.email@example.com"
                  />
                </div>
                {regErrors.email && (
                  <p className="text-red-400 text-sm mt-1 persian-body">{regErrors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">
                  نام کاربری
                </label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={regForm.username}
                    onChange={(e) => setRegForm({...regForm, username: e.target.value})}
                    className="input-field pr-10 english-text"
                    placeholder="نام کاربری خود را وارد کنید"
                  />
                </div>
                {regErrors.username && (
                  <p className="text-red-400 text-sm mt-1 persian-body">{regErrors.username}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">
                  رمز عبور
                </label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={regForm.password}
                    onChange={(e) => setRegForm({...regForm, password: e.target.value})}
                    className="input-field pr-10 pl-10 english-text"
                    placeholder="رمز عبور خود را وارد کنید"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {regErrors.password && (
                  <p className="text-red-400 text-sm mt-1 persian-body">{regErrors.password}</p>
                )}
              </div>

              {regErrors.general && (
                <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg persian-body text-sm">
                  {regErrors.general}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary persian-body disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black ml-2"></div>
                    در حال ثبت‌نام...
                  </>
                ) : (
                  "ثبت‌نام"
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">
                  نام کاربری
                </label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                    className="input-field pr-10 english-text"
                    placeholder="نام کاربری خود را وارد کنید"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 persian-body">
                  رمز عبور
                </label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    className="input-field pr-10 pl-10 english-text"
                    placeholder="رمز عبور خود را وارد کنید"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg persian-body text-sm">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary persian-body disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black ml-2"></div>
                    در حال ورود...
                  </>
                ) : (
                  "ورود"
                )}
              </button>
            </form>
          )}

          {/* Predefined Users Info */}
          <div className="mt-6 p-4 bg-gray-700 rounded-lg">
            <h4 className="text-sm font-semibold text-yellow-400 mb-2 persian-heading">
              کاربران از پیش تعریف شده:
            </h4>
            <div className="space-y-1 text-xs text-gray-300 persian-body">
              {predefinedUsers.map((user, index) => (
                <div key={index} className="flex justify-between">
                  <span>{user.username}</span>
                  <span>رمز: {user.password}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}