"use client"

import { useState } from "react"
import Navbar from "./navbar"
import HeroSection from "./hero-section"
import LearningSection from "./learning-section"
import ResourcesSection from "./resources-section"
import ContactSection from "./contact-section"
import ChatBot from "./chatbot"
import CareerCounseling from "./career-counseling"
import AllProjectsSection from "./all-projects-section"
import CategorizedProjectsSection from "./categorized-projects-section"
import RealAINewsSection from "./real-ai-news-section"
import SimpleFooter from "./simple-footer"

interface DashboardProps {
  onAuthRequired: (action: () => void) => void
  isAuthenticated: boolean
  onLogout: () => void
  onLoginClick: () => void
}

export default function Dashboard({ onAuthRequired, isAuthenticated, onLogout, onLoginClick }: DashboardProps) {
  const [activeSection, setActiveSection] = useState("home")

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return (
          <>
            <HeroSection onAuthRequired={onAuthRequired} />
            <AllProjectsSection onAuthRequired={onAuthRequired} />
            <RealAINewsSection />
          </>
        )
      case "projects":
        return <CategorizedProjectsSection onAuthRequired={onAuthRequired} />
      case "learning":
        return <LearningSection onAuthRequired={onAuthRequired} />
      case "resources":
        return <ResourcesSection onAuthRequired={onAuthRequired} />
      case "news":
        return <RealAINewsSection />
      case "counseling":
        return <CareerCounseling />
      case "contact":
        return <ContactSection />
      default:
        return <HeroSection onAuthRequired={onAuthRequired} />
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
      <ChatBot />
    </div>
  )
}
