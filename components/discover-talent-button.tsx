
"use client"

import { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { CheckCircle, Sparkles } from 'lucide-react'
import AuthModal from './auth-modal'

interface DiscoverTalentButtonProps {
  className?: string
  size?: 'sm' | 'default' | 'lg'
}

export default function DiscoverTalentButton({ className = '', size = 'default' }: DiscoverTalentButtonProps) {
  const { isAuthenticated } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register')

  const handleClick = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
    }
  }

  return (
    <>
      <Button
        onClick={handleClick}
        className={`bg-yellow-500 hover:bg-yellow-600 text-black persian-body font-medium flex items-center gap-2 ${className}`}
        size={size}
      >
        <Sparkles className="w-4 h-4" />
        کشف استعداد و شروع یادگیری
        {isAuthenticated && (
          <CheckCircle className="w-4 h-4 text-green-600 checkmark" />
        )}
      </Button>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  )
}
