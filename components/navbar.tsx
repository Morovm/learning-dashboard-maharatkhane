"use client"

import { useState } from "react"
import { Menu, X, LogOut, Home, FolderOpen, BookOpen, Library, Mail, LogIn, Newspaper, Briefcase, GraduationCap } from "lucide-react"
import Image from "next/image"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface NavbarProps {
  activeSection: string
  setActiveSection: (section: string) => void
  isAuthenticated: boolean
  onLogout: () => void
  onLoginClick: () => void
}

const navItems = [
  { id: "home", label: "خانه", icon: Home },
  { id: "projects", label: "پروژه‌ها", icon: FolderOpen },
  { id: "learning", label: "آموزش‌ها", icon: BookOpen },
  { id: "teacher-assistant", label: "دستیار مدرسین", icon: GraduationCap },
  { id: "resources", label: "منابع", icon: Library },
  { id: "news", label: "اخبار AI", icon: Newspaper },
  { id: "counseling", label: "مشاوره شغلی", icon: Briefcase },
  { id: "contact", label: "تماس با ما", icon: Mail },
]

export default function Navbar({
  activeSection,
  setActiveSection,
  isAuthenticated,
  onLogout,
  onLoginClick,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId)
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-800 border-b border-gray-700 z-50">
      <div className="max-w-7xl mx-auto mobile-container">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 ml-2 sm:ml-3">
              <Image
                src="/logo.jpg"
                alt="مهارت خانه البرز"
                width={40}
                height={40}
                className="rounded-full object-cover w-full h-full"
              />
            </div>
            <h1 className="text-sm sm:text-lg lg:text-xl font-bold text-yellow-400 persian-text mobile-heading-spacing">
              داشبورد آموزشی مهارتخانه البرز
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-3 lg:space-x-4 space-x-reverse">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center px-2 py-2 lg:px-3 lg:py-2 rounded-md text-sm font-medium persian-body transition-colors duration-200 ${
                      activeSection === item.id
                        ? "bg-yellow-500 text-black"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    <Icon className="w-4 h-4 ml-1 lg:ml-2" />
                    {item.label}
                  </button>
                )
              })}

              {/* Authentication Button */}
              {isAuthenticated ? (
                <button
                  onClick={onLogout}
                  className="flex items-center px-2 py-2 lg:px-3 lg:py-2 rounded-md text-sm font-medium persian-body text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4 ml-1 lg:ml-2" />
                  خروج
                </button>
              ) : (
                <button onClick={onLoginClick} className="btn-login flex items-center">
                  <LogIn className="w-4 h-4 ml-1 lg:ml-2" />
                  ورود
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-400 hover:text-white focus:outline-none focus:text-white p-2"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="px-3 pt-2 pb-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center w-full px-3 py-3 rounded-md text-base font-medium persian-body transition-colors duration-200 mobile-text-spacing ${
                    activeSection === item.id
                      ? "bg-yellow-500 text-black"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5 ml-3" />
                  {item.label}
                </button>
              )
            })}

            {isAuthenticated ? (
              <button
                onClick={onLogout}
                className="flex items-center w-full px-3 py-3 rounded-md text-base font-medium persian-body text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors duration-200 mobile-text-spacing"
              >
                <LogOut className="w-5 h-5 ml-3" />
                خروج
              </button>
            ) : (
              <button
                onClick={onLoginClick}
                className="flex items-center w-full px-3 py-3 rounded-md text-base font-medium bg-yellow-500 hover:bg-yellow-600 text-black transition-colors duration-200 mobile-text-spacing"
              >
                <LogIn className="w-5 h-5 ml-3" />
                ورود
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}