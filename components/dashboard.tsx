"use client"

import { useState } from "react"
import Navbar from "./navbar"
import HeroSection from "./hero-section"
import ProjectsSection from "./projects-section"
import LearningSection from "./learning-section"
import ResourcesSection from "./resources-section"
import ContactSection from "./contact-section"
import ChatBot from "./chatbot"

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
            <ProjectsSection onAuthRequired={onAuthRequired} />
          </>
        )
      case "projects":
        return <ProjectsSection onAuthRequired={onAuthRequired} />
      case "learning":
        return <LearningSection onAuthRequired={onAuthRequired} />
      case "resources":
        return <ResourcesSection onAuthRequired={onAuthRequired} />
      case "contact":
        return <ContactSection />
      default:
        return <HeroSection onAuthRequired={onAuthRequired} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isAuthenticated={isAuthenticated}
        onLogout={onLogout}
        onLoginClick={onLoginClick}
      />
      <main className="pt-14 sm:pt-16">{renderSection()}</main>
      <ChatBot />
    </div>
  )
}
