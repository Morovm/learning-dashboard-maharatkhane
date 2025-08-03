"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "سلام! من همیار هوش مصنوعی شما هستم. چطور می‌تونم کمکتون کنم؟",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      // Make API call to Gemini
      const response = await fetch("/api/gemini-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputMessage,
          history: messages,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || "متأسفانه در حال حاضر نمی‌توانم پاسخ دهم. لطفاً بعداً تلاش کنید.",
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      // Fallback response for demo purposes
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "سلام! من آماده پاسخگویی به سوالات شما در زمینه هوش مصنوعی و یادگیری ماشین هستم. چه سوالی دارید؟",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Chat Toggle Button - Mobile Optimized */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black rounded-full shadow-2xl flex items-center justify-center transition-all duration-200 z-50 hover:scale-110 animate-pulse"
      >
        {isOpen ? <X className="w-6 h-6 sm:w-7 sm:h-7" /> : <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />}
      </button>

      {/* Floating Chat Indicator - Mobile Optimized */}
      {!isOpen && (
        <div className="fixed bottom-20 left-4 sm:bottom-24 sm:left-6 bg-yellow-500 text-black px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow-lg z-40 animate-bounce max-w-48 sm:max-w-none">
          <p className="text-xs sm:text-sm font-medium persian-body mobile-text-spacing">با هوش مصنوعی چت کنید!</p>
        </div>
      )}

      {/* Chat Window - Mobile Optimized */}
      {isOpen && (
        <div className="fixed bottom-20 left-4 right-4 sm:bottom-24 sm:left-6 sm:right-auto sm:w-80 h-80 sm:h-96 bg-gray-800 border border-yellow-500/30 rounded-lg shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black p-3 sm:p-4 rounded-t-lg flex items-center">
            <Bot className="w-5 h-5 sm:w-6 sm:h-6 ml-2" />
            <h3 className="font-semibold persian-text text-sm sm:text-base mobile-heading-spacing">همیار هوش مصنوعی</h3>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-xs px-3 py-2 sm:px-4 sm:py-2 rounded-lg ${
                    message.sender === "user" ? "bg-yellow-500 text-black" : "bg-gray-700 text-gray-100"
                  }`}
                >
                  <div className="flex items-start">
                    {message.sender === "bot" && <Bot className="w-3 h-3 sm:w-4 sm:h-4 ml-2 mt-1 flex-shrink-0" />}
                    {message.sender === "user" && <User className="w-3 h-3 sm:w-4 sm:h-4 ml-2 mt-1 flex-shrink-0" />}
                    <p className="text-xs sm:text-sm persian-text leading-relaxed mobile-text-spacing">
                      {message.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-end">
                <div className="bg-gray-700 text-gray-100 max-w-xs px-3 py-2 sm:px-4 sm:py-2 rounded-lg">
                  <div className="flex items-center">
                    <Bot className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 sm:p-4 border-t border-gray-700">
            <div className="flex space-x-2 space-x-reverse">
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-black p-2 rounded-lg transition-colors duration-200"
              >
                <Send className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="پیام خود را بنویسید..."
                className="flex-1 px-2 py-2 sm:px-3 sm:py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-yellow-500 focus:outline-none text-xs sm:text-sm persian-text mobile-text-spacing"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
