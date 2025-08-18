"use client"

import { useState, useEffect } from "react"
import EnhancedDashboard from "@/components/enhanced-dashboard"
import AuthModal from "@/components/auth-modal"

export default function Home() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null)

  useEffect(() => {
    // Check if user is already logged in by checking for currentUser
    const currentUser = localStorage.getItem("currentUser")
    if (currentUser) {
      setIsAuthenticated(true)
    }
  }, [])

  const handleAuthRequired = (action: () => void) => {
    if (isAuthenticated) {
      action()
    } else {
      setPendingAction(() => action)
      setShowAuthModal(true)
    }
  }

  const handleLoginClick = () => {
    setShowAuthModal(true)
  }

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
    setShowAuthModal(false)
    if (pendingAction) {
      pendingAction()
      setPendingAction(null)
    }
  }

  const handleAuthCancel = () => {
    setShowAuthModal(false)
    setPendingAction(null)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("currentUser")
  }

  return (
    <>
      <EnhancedDashboard
        onAuthRequired={handleAuthRequired}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        onLoginClick={handleLoginClick}
      />

      {showAuthModal && <AuthModal onClose={handleAuthCancel} onLoginSuccess={handleLoginSuccess} />}
    </>
  )
}
