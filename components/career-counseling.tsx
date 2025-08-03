"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, MessageSquare, Briefcase } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "ai"
  timestamp: Date
}

const interviewQuestions = [
  "خودتان را معرفی کنید و بگویید چرا برای این موقعیت شغلی مناسب هستید؟",
  "از یک پروژه چالش‌برانگیز که روی آن کار کرده‌اید بگویید.",
  "نقاط قوت و ضعف خود را بیان کنید.",
  "چرا می‌خواهید در این شرکت کار کنید؟",
  "در ۵ سال آینده خودتان را کجا می‌بینید؟",
  "چگونه با استرس و فشار کاری مقابله می‌کنید؟",
  "تجربه کار تیمی خود را شرح دهید.",
  "از یک موقعیتی بگویید که مجبور بودید تصمیم سختی بگیرید.",
]

export default function CareerCounseling() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "سلام! من مشاور شغلی هوش مصنوعی شما هستم. آماده‌اید تا یک جلسه مصاحبه شغلی شبیه‌سازی شده را شروع کنیم؟ من سوالات متداول مصاحبه می‌پرسم و بازخورد می‌دهم.",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [sessionStarted, setSessionStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const startSession = () => {
    setSessionStarted(true)
    const firstQuestion: Message = {
      id: Date.now().toString(),
      text: `بیایید شروع کنیم! سوال اول: ${interviewQuestions[0]}`,
      sender: "ai",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, firstQuestion])
  }

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
      // Send to Gemini API for feedback
      const response = await fetch("/api/gemini-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `این پاسخ کاربر به سوال مصاحبه شغلی است: "${inputMessage}". لطفاً بازخورد سازنده و مفیدی به فارسی ارائه دهید و سپس سوال بعدی مصاحبه را بپرسید.`,
          history: messages,
        }),
      })

      let aiResponse = ""

      if (response.ok) {
        const data = await response.json()
        aiResponse = data.response
      } else {
        // Fallback response
        aiResponse = `بازخورد: پاسخ شما خوب بود. ${
          currentQuestionIndex < interviewQuestions.length - 1
            ? `حالا سوال بعدی: ${interviewQuestions[currentQuestionIndex + 1]}`
            : "مصاحبه به پایان رسید. عملکرد شما قابل قبول بود!"
        }`
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])

      if (currentQuestionIndex < interviewQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1)
      }
    } catch (error) {
      // Fallback response
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `بازخورد: پاسخ شما مناسب بود. ${
          currentQuestionIndex < interviewQuestions.length - 1
            ? `سوال بعدی: ${interviewQuestions[currentQuestionIndex + 1]}`
            : "مصاحبه تمام شد. کارتان عالی بود!"
        }`,
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, fallbackMessage])

      if (currentQuestionIndex < interviewQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (!sessionStarted) {
        startSession()
      } else {
        sendMessage()
      }
    }
  }

  return (
    <section className="mobile-section bg-gray-900 mobile-container">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="p-3 sm:p-4 bg-yellow-500 rounded-full">
              <Briefcase className="w-8 h-8 sm:w-12 sm:h-12 text-black" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 persian-heading mobile-heading-spacing">
            مشاوره شغلی
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 persian-body max-w-3xl mx-auto mobile-text-spacing px-2">
            شبیه‌ساز مصاحبه شغلی با هوش مصنوعی - مهارت‌های مصاحبه خود را تقویت کنید
          </p>
        </div>

        <div className="card bg-gray-800 border border-gray-700">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black p-4 rounded-t-lg flex items-center">
            <MessageSquare className="w-6 h-6 ml-3" />
            <h3 className="font-semibold persian-heading text-lg mobile-heading-spacing">مشاور شغلی هوشمند</h3>
          </div>

          {/* Messages Area */}
          <div className="h-96 sm:h-[500px] overflow-y-auto p-4 sm:p-6 space-y-4 bg-gray-900">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-xs sm:max-w-md lg:max-w-lg px-4 py-3 rounded-lg ${
                    message.sender === "user" ? "bg-yellow-500 text-black" : "bg-gray-700 text-gray-100"
                  }`}
                >
                  <div className="flex items-start">
                    {message.sender === "ai" && <Bot className="w-4 h-4 ml-2 mt-1 flex-shrink-0" />}
                    {message.sender === "user" && <User className="w-4 h-4 ml-2 mt-1 flex-shrink-0" />}
                    <p className="text-sm sm:text-base persian-text leading-relaxed mobile-text-spacing">
                      {message.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-end">
                <div className="bg-gray-700 text-gray-100 max-w-xs px-4 py-3 rounded-lg">
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

          {/* Input Area */}
          <div className="p-4 sm:p-6 border-t border-gray-700 bg-gray-800">
            <div className="flex space-x-3 space-x-reverse">
              <button
                onClick={!sessionStarted ? startSession : sendMessage}
                disabled={isLoading || (sessionStarted && !inputMessage.trim())}
                className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-black px-4 py-2 sm:px-6 sm:py-3 rounded-lg transition-colors duration-200 font-medium persian-body"
              >
                {!sessionStarted ? "شروع مصاحبه" : <Send className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>

              {sessionStarted && (
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="پاسخ خود را بنویسید..."
                  className="flex-1 px-4 py-2 sm:px-6 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-yellow-500 focus:outline-none text-sm sm:text-base persian-text mobile-text-spacing"
                  disabled={isLoading}
                />
              )}
            </div>

            {!sessionStarted && (
              <p className="text-xs sm:text-sm text-gray-400 persian-body mt-3 text-center mobile-text-spacing">
                برای شروع جلسه مصاحبه شغلی روی دکمه "شروع مصاحبه" کلیک کنید
              </p>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 sm:mt-12 card bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border-yellow-500/30">
          <h3 className="text-lg sm:text-xl font-semibold persian-heading mb-4 text-center mobile-heading-spacing">
            نکات مهم برای مصاحبه موفق
          </h3>
          <div className="mobile-grid grid-cols-1 sm:grid-cols-2 text-sm persian-body text-gray-300">
            <div>
              <h4 className="font-semibold text-yellow-400 mb-2 mobile-heading-spacing">قبل از مصاحبه:</h4>
              <ul className="space-y-1 mobile-text-spacing">
                <li>• درباره شرکت تحقیق کنید</li>
                <li>• رزومه خود را مرور کنید</li>
                <li>• سوالات متداول را تمرین کنید</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-orange-400 mb-2 mobile-heading-spacing">حین مصاحبه:</h4>
              <ul className="space-y-1 mobile-text-spacing">
                <li>• اعتماد به نفس داشته باشید</li>
                <li>• مثال‌های عملی ارائه دهید</li>
                <li>• سوال بپرسید</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
