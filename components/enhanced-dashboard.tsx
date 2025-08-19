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
import TeacherAssistantSection from "./teacher-assistant-section"

interface DashboardProps {
  onAuthRequired: (action: () => void) => void
}

export default function EnhancedDashboard({ onAuthRequired }: DashboardProps) {
  const [activeSection, setActiveSection] = useState("home")

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return (
          <>
            <EnhancedHeroSection />
            <AllProjectsSection onAuthRequired={onAuthRequired} />
            <EnhancedAINews />
          </>
        )
      case "projects":
        return <AllProjectsSection onAuthRequired={onAuthRequired} />
      case "learning":
        return <LearningSection onAuthRequired={onAuthRequired} />
      case "resources":
        return <ResourcesSection onAuthRequired={onAuthRequired} />
      case "news":
        return <EnhancedAINews />
      case "counseling":
        return (
          <>
            <EnhancedCareerCounseling />
            <EnhancedCareerQuiz />
          </>
        )
      case "contact":
        return <ContactSection />
      case "teacherAssistant":
        return <TeacherAssistantSection />
      default:
        return <EnhancedHeroSection />
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isAuthenticated={false}
        onLogout={() => {}}
        onLoginClick={() => {}}
      />
      <main className="pt-14 sm:pt-16 flex-1">{renderSection()}</main>
      <SimpleFooter />
      <AIChatbotWidget />
    </div>
  )
}