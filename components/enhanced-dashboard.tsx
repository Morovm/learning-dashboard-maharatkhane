"use client"

import { useState } from "react"
import Navbar from "./navbar"
import EnhancedHeroSection from "./enhanced-hero-section"
import LearningSection from "./learning-section"
import ResourcesSection from "./resources-section"
import ContactSection from "./contact-section"
import AIChatbotWidget from "./ai-chatbot-widget"
import EnhancedCareerCounseling from "./enhanced-career-counseling"
import EnhancedCareerQuiz from "./enhanced-career-quiz"
import AllProjectsSection from "./all-projects-section"
import EnhancedAINews from "./enhanced-ai-news"
import SimpleFooter from "./simple-footer"

interface DashboardProps {
  onAuthRequired: (action: () => void) => void
  isAuthenticated: boolean
  onLogout: () => void
  onLoginClick: () => void
}

export default function EnhancedDashboard({ onAuthRequired, isAuthenticated, onLogout, onLoginClick }: DashboardProps) {
  const [activeSection, setActiveSection] = useState("home")

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return (
          <>
            <EnhancedHeroSection onAuthRequired={onAuthRequired} isAuthenticated={isAuthenticated} />
            <AllProjectsSection onAuthRequired={onAuthRequired} />
            <EnhancedAINews />
          </>
        )
      case "projects":
        return <EnhancedProjectsSection onAuthRequired={onAuthRequired} isAuthenticated={isAuthenticated} />
      case "learning":
        return <LearningSection onAuthRequired={onAuthRequired} />
      case "resources":
        return <ResourcesSection onAuthRequired={onAuthRequired} />
      case "news":
        return <EnhancedAINews />
      case "counseling":
        return (
          <>
            <SmartCareerConsulting onAuthRequired={onAuthRequired} isAuthenticated={isAuthenticated} />
          </>
        )
      case "contact":
        return <ContactSection />
      default:
        return <EnhancedHeroSection onAuthRequired={onAuthRequired} isAuthenticated={isAuthenticated} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isAuthenticated={isAuthenticated}
        onLogout={onLogout}
        onLoginClick={onLoginClick}
      />
      <main className="pt-14 sm:pt-16 flex-1">{renderSection()}</main>
      <SimpleFooter />
      <AIChatbotWidget />
    </div>
  )
}