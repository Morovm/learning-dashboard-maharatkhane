
"use client"

import { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { CheckCircle, Sparkles } from 'lucide-react'
import AuthModal from './auth-modal'
import TalentDiscoveryForm from './talent-discovery-form'

interface DiscoverTalentButtonProps {
  className?: string
}

export default function DiscoverTalentButton({ className = '' }: DiscoverTalentButtonProps) {
  const { isAuthenticated } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showTalentForm, setShowTalentForm] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register')

  const handleClick = () => {
    if (isAuthenticated) {
      setShowTalentForm(true)
    } else {
      setShowAuthModal(true)
    }
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={`btn-primary persian-body flex items-center justify-center gap-2 ${className}`}
      >
        <Sparkles className="w-5 h-5" />
        کشف استعداد و شروع یادگیری
        {isAuthenticated && (
          <CheckCircle className="w-5 h-5 text-green-400" />
        )}
      </button>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />

      <TalentDiscoveryForm
        isOpen={showTalentForm}
        onClose={() => setShowTalentForm(false)}
      />
    </>
  )
}
