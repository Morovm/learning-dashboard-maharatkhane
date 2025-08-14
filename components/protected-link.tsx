
"use client"

import { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { ExternalLink } from 'lucide-react'
import AuthModal from './auth-modal'

interface ProtectedLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  title?: string
}

export default function ProtectedLink({ href, children, className = '', title }: ProtectedLinkProps) {
  const { isAuthenticated } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register')

  const isGitHubLink = href.includes('github.com')
  const isYouTubeLink = href.includes('youtube.com') || href.includes('youtu.be')
  const isProtectedLink = isGitHubLink || isYouTubeLink

  const handleClick = (e: React.MouseEvent) => {
    if (isProtectedLink && !isAuthenticated) {
      e.preventDefault()
      setShowAuthModal(true)
    }
  }

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${className} ${isProtectedLink && !isAuthenticated ? 'opacity-50 cursor-pointer' : ''}`}
        title={title}
        onClick={handleClick}
      >
        {children}
        {isProtectedLink && !isAuthenticated && (
          <div className="text-xs text-red-400 mt-1 persian-body">
            لطفاً ابتدا ثبت‌نام کنید
          </div>
        )}
      </a>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  )
}
