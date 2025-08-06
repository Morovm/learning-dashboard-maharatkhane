"use client"

import { useState, useEffect } from "react"
import EnhancedDashboard from "@/components/enhanced-dashboard"
import LoginModal from "@/components/login-modal"

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null)

  useEffect(() => {
    // Check if user is already logged in
    const authStatus = localStorage.getItem("isAuthenticated")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleAuthRequired = (action: () => void) => {
    if (isAuthenticated) {
      action()
    } else {
      setPendingAction(() => action)
      setShowLoginModal(true)
    }
  }

  const handleLoginClick = () => {
    setShowLoginModal(true)
  }

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
    setShowLoginModal(false)
    if (pendingAction) {
      pendingAction()
      setPendingAction(null)
    }
    localStorage.setItem("isAuthenticated", "true")
  }

  const handleLoginCancel = () => {
    setShowLoginModal(false)
    setPendingAction(null)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("isAuthenticated")
  }

  return (
    <>
      <EnhancedDashboard
        onAuthRequired={handleAuthRequired}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        onLoginClick={handleLoginClick}
      />

      {showLoginModal && <LoginModal onLoginSuccess={handleLoginSuccess} onCancel={handleLoginCancel} />}
    </>
  )
}
