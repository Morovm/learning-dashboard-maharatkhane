"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function AIChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "سلام! من دستیار هوش مصنوعی مهارتخانه البرز هستم. چطور می‌تونم کمکتون کنم؟",
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
      const response = await fetch("/api/chatbot", {
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
      console.error("Chatbot error:", error)
      
      // Fallback responses
      const fallbackResponses = [
        "سوال جالبی پرسیدید! در حوزه هوش مصنوعی چه موضوعی بیشتر علاقه‌مندتان می‌کند؟",
        "برای شروع یادگیری هوش مصنوعی، پیشنهاد می‌کنم با دوره‌های مقدماتی شروع کنید.",
        "آیا در مورد پروژه‌های عملی هوش مصنوعی سوالی دارید؟",
        "مهارتخانه البرز دوره‌های متنوعی در حوزه AI ارائه می‌دهد. کدام حوزه بیشتر جذبتان می‌کند؟"
      ]
      
      const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
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
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black rounded-full shadow-2xl flex items-center justify-center transition-all duration-200 z-50 hover:scale-110"
      >
        {isOpen ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7" />}
      </button>

      {/* Floating Chat Indicator */}
      {!isOpen && (
        <div className="fixed bottom-24 left-6 bg-yellow-500 text-black px-4 py-2 rounded-lg shadow-lg z-40 animate-bounce max-w-48">
          <p className="text-sm font-medium persian-body">با هوش مصنوعی چت کنید!</p>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 w-80 h-96 bg-gray-800 border border-yellow-500/30 rounded-lg shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black p-4 rounded-t-lg flex items-center">
            <Bot className="w-6 h-6 ml-2" />
            <div className="flex-1">
              <h3 className="font-semibold persian-heading text-base">دستیار هوش مصنوعی</h3>
              <p className="text-xs opacity-80 persian-body">مهارتخانه البرز</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.sender === "user" ? "bg-yellow-500 text-black" : "bg-gray-700 text-gray-100"
                  }`}
                >
                  <div className="flex items-start">
                    {message.sender === "bot" && <Bot className="w-4 h-4 ml-2 mt-1 flex-shrink-0" />}
                    {message.sender === "user" && <User className="w-4 h-4 ml-2 mt-1 flex-shrink-0" />}
                    <p className="text-sm persian-body leading-relaxed">
                      {message.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-end">
                <div className="bg-gray-700 text-gray-100 max-w-xs px-4 py-2 rounded-lg">
                  <div className="flex items-center">
                    <Bot className="w-4 h-4 ml-2" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
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
          <div className="p-4 border-t border-gray-700 bg-gray-800">
            <div className="flex space-x-2 space-x-reverse">
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-black p-2 rounded-lg transition-colors duration-200"
              >
                <Send className="w-4 h-4" />
              </button>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="پیام خود را بنویسید..."
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-yellow-500 focus:outline-none text-sm persian-body"
                disabled={isLoading}
              />
            </div>
            <p className="text-xs text-gray-500 persian-body mt-2 text-center">
              پاسخ‌ها توسط هوش مصنوعی تولید می‌شوند
            </p>
          </div>
        </div>
      )}
    </>
  )
}