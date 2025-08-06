
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { 
  BrainCircuit, 
  Code, 
  BarChart3, 
  PenTool, 
  Database,
  CheckCircle,
  Clock,
  Award,
  ArrowRight,
  RotateCcw
} from "lucide-react"

interface Question {
  id: number
  type: "multiple-choice" | "short-answer" | "coding"
  question: string
  options?: string[]
  correctAnswer?: string | number
  points: number
}

interface JobRole {
  id: string
  title: string
  icon: React.ReactNode
  description: string
  color: string
  questions: Question[]
}

const jobRoles: JobRole[] = [
  {
    id: "data-analyst",
    title: "تحلیلگر داده",
    icon: <BarChart3 className="w-8 h-8" />,
    description: "تجزیه و تحلیل داده‌ها برای استخراج بینش‌های کاربردی",
    color: "bg-blue-500",
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "کدام کتابخانه Python برای تحلیل داده بیشتر استفاده می‌شود؟",
        options: ["NumPy", "Pandas", "Matplotlib", "Seaborn"],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 2,
        type: "short-answer",
        question: "تفاوت بین Mean و Median را در یک جمله توضیح دهید.",
        correctAnswer: "میانگین مجموع تمام مقادیر تقسیم بر تعداد آن‌هاست در حالی که میانه مقدار وسط داده‌های مرتب شده است",
        points: 15
      },
      {
        id: 3,
        type: "coding",
        question: "کدی بنویسید که میانگین یک لیست اعداد را محاسبه کند.",
        correctAnswer: "def calculate_mean(numbers): return sum(numbers) / len(numbers)",
        points: 20
      }
    ]
  },
  {
    id: "ai-developer",
    title: "توسعه‌دهنده هوش مصنوعی",
    icon: <BrainCircuit className="w-8 h-8" />,
    description: "طراحی و پیاده‌سازی مدل‌های هوش مصنوعی و یادگیری ماشین",
    color: "bg-purple-500",
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "کدام الگوریتم برای طبقه‌بندی تصاویر مناسب‌تر است؟",
        options: ["Linear Regression", "CNN", "K-Means", "Decision Tree"],
        correctAnswer: 1,
        points: 15
      },
      {
        id: 2,
        type: "short-answer",
        question: "تفاوت بین Supervised و Unsupervised Learning را توضیح دهید.",
        correctAnswer: "یادگیری نظارت شده از داده‌های برچسب‌دار استفاده می‌کند در حالی که یادگیری بدون نظارت الگوها را در داده‌های بدون برچسب پیدا می‌کند",
        points: 20
      }
    ]
  },
  {
    id: "content-creator",
    title: "تولیدکننده محتوا",
    icon: <PenTool className="w-8 h-8" />,
    description: "ایجاد محتوای دیجیتال با کمک ابزارهای هوش مصنوعی",
    color: "bg-green-500",
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "کدام ابزار AI برای تولید تصاویر مناسب‌تر است؟",
        options: ["ChatGPT", "DALL-E", "GitHub Copilot", "Grammarly"],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 2,
        type: "short-answer",
        question: "چگونه می‌توان از ChatGPT برای بهبود کیفیت نوشتار استفاده کرد؟",
        correctAnswer: "با ارائه پرامپت‌های مشخص برای ویرایش، بازنویسی، یا بهبود ساختار متن",
        points: 15
      }
    ]
  }
]

export default function EnhancedCareerQuiz() {
  const [selectedRole, setSelectedRole] = useState<JobRole | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: string }>({})
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes
  const [isCompleted, setIsCompleted] = useState(false)
  const [isStarted, setIsStarted] = useState(false)

  useEffect(() => {
    if (isStarted && !isCompleted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !isCompleted) {
      handleSubmitQuiz()
    }
  }, [timeLeft, isStarted, isCompleted])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleRoleSelect = (role: JobRole) => {
    setSelectedRole(role)
  }

  const startQuiz = () => {
    setIsStarted(true)
    setCurrentQuestion(0)
    setAnswers({})
    setScore(0)
    setTimeLeft(1800)
    setIsCompleted(false)
  }

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const calculateScore = () => {
    if (!selectedRole) return 0
    
    let totalScore = 0
    selectedRole.questions.forEach(question => {
      const userAnswer = answers[question.id]
      if (userAnswer) {
        if (question.type === "multiple-choice" && parseInt(userAnswer) === question.correctAnswer) {
          totalScore += question.points
        } else if (question.type === "short-answer" || question.type === "coding") {
          // Simple keyword matching for demo purposes
          const correctKeywords = question.correctAnswer?.toLowerCase().split(' ') || []
          const userKeywords = userAnswer.toLowerCase().split(' ')
          const matchingKeywords = correctKeywords.filter(keyword => 
            userKeywords.some(userKeyword => userKeyword.includes(keyword))
          )
          if (matchingKeywords.length >= correctKeywords.length * 0.5) {
            totalScore += Math.floor(question.points * (matchingKeywords.length / correctKeywords.length))
          }
        }
      }
    })
    return totalScore
  }

  const handleNextQuestion = () => {
    if (selectedRole && currentQuestion < selectedRole.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      handleSubmitQuiz()
    }
  }

  const handleSubmitQuiz = () => {
    const finalScore = calculateScore()
    setScore(finalScore)
    setIsCompleted(true)
    setIsStarted(false)
  }

  const resetQuiz = () => {
    setSelectedRole(null)
    setCurrentQuestion(0)
    setAnswers({})
    setScore(0)
    setTimeLeft(1800)
    setIsCompleted(false)
    setIsStarted(false)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-yellow-400"
    return "text-red-400"
  }

  const getScoreMessage = (score: number) => {
    if (score >= 80) return "عالی! شما آمادگی بالایی در این حوزه دارید."
    if (score >= 60) return "خوب! با مطالعه بیشتر می‌توانید پیشرفت کنید."
    return "نیاز به تقویت پایه‌های این حوزه دارید."
  }

  if (!selectedRole) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mb-12">
          <Award className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4 persian-heading">
            آزمون تخصصی شغلی
          </h1>
          <p className="text-xl text-gray-400 persian-body">
            مهارت‌های خود را در حوزه‌های مختلف هوش مصنوعی ارزیابی کنید
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobRoles.map((role) => (
            <Card 
              key={role.id}
              className="cursor-pointer hover:border-yellow-500 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10 bg-gray-800 border-gray-700"
              onClick={() => handleRoleSelect(role)}
            >
              <CardHeader className="text-center">
                <div className={`w-16 h-16 ${role.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white`}>
                  {role.icon}
                </div>
                <CardTitle className="persian-heading text-white">{role.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 persian-body text-center mb-4">
                  {role.description}
                </p>
                <div className="text-center">
                  <span className="text-sm text-yellow-400 persian-body">
                    {role.questions.length} سوال • {role.questions.reduce((acc, q) => acc + q.points, 0)} امتیاز
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (isCompleted) {
    const maxScore = selectedRole.questions.reduce((acc, q) => acc + q.points, 0)
    const percentage = Math.round((score / maxScore) * 100)

    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="text-center">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <CardTitle className="text-2xl persian-heading text-white">
              نتایج آزمون {selectedRole.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className={`text-6xl font-bold ${getScoreColor(percentage)} mb-2`}>
                {percentage}%
              </div>
              <div className="text-gray-400 persian-body">
                {score} از {maxScore} امتیاز
              </div>
            </div>

            <div className="bg-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white persian-heading mb-4">
                تحلیل نتایج
              </h3>
              <p className="text-gray-300 persian-body text-lg">
                {getScoreMessage(percentage)}
              </p>
            </div>

            <div className="bg-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white persian-heading mb-4">
                پیشنهادات برای بهبود
              </h3>
              <ul className="space-y-2 text-gray-300 persian-body">
                <li>• مطالعه منابع تخصصی در حوزه {selectedRole.title}</li>
                <li>• شرکت در دوره‌های عملی مهارتخانه البرز</li>
                <li>• تمرین با پروژه‌های واقعی</li>
                <li>• مشارکت در جامعه‌های تخصصی</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={resetQuiz}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                آزمون مجدد
              </Button>
              <Button
                onClick={() => setSelectedRole(null)}
                className="bg-yellow-500 hover:bg-yellow-600 text-black flex items-center gap-2"
              >
                انتخاب شغل دیگر
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isStarted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="text-center">
            <div className={`w-16 h-16 ${selectedRole.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white`}>
              {selectedRole.icon}
            </div>
            <CardTitle className="text-2xl persian-heading text-white">
              آزمون {selectedRole.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white persian-heading mb-4">
                راهنمای آزمون
              </h3>
              <ul className="space-y-2 text-gray-300 persian-body">
                <li>• تعداد سوالات: {selectedRole.questions.length}</li>
                <li>• زمان: 30 دقیقه</li>
                <li>• امتیاز کل: {selectedRole.questions.reduce((acc, q) => acc + q.points, 0)}</li>
                <li>• انواع سوالات: چند گزینه‌ای، تشریحی، کدنویسی</li>
              </ul>
            </div>

            <div className="text-center">
              <Button
                onClick={startQuiz}
                className="bg-yellow-500 hover:bg-yellow-600 text-black text-lg px-8 py-3"
              >
                شروع آزمون
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQ = selectedRole.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / selectedRole.questions.length) * 100

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-white">
            <span className="text-sm persian-body">سوال {currentQuestion + 1} از {selectedRole.questions.length}</span>
          </div>
          <div className="flex items-center gap-2 text-yellow-400">
            <Clock className="w-4 h-4" />
            <span className="font-mono">{formatTime(timeLeft)}</span>
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl persian-heading text-white">
            {currentQ.question}
          </CardTitle>
          <div className="text-sm text-yellow-400 persian-body">
            {currentQ.points} امتیاز
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentQ.type === "multiple-choice" && currentQ.options && (
            <RadioGroup 
              value={answers[currentQ.id] || ""} 
              onValueChange={(value) => handleAnswerChange(currentQ.id, value)}
            >
              {currentQ.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="persian-body text-white cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {(currentQ.type === "short-answer" || currentQ.type === "coding") && (
            <Textarea
              placeholder={currentQ.type === "coding" ? "کد خود را اینجا بنویسید..." : "پاسخ خود را اینجا بنویسید..."}
              value={answers[currentQ.id] || ""}
              onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
              className="min-h-32 persian-body"
              style={{ fontFamily: currentQ.type === "coding" ? "monospace" : "inherit" }}
            />
          )}

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
            >
              قبلی
            </Button>
            <Button
              onClick={handleNextQuestion}
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
              disabled={!answers[currentQ.id]}
            >
              {currentQuestion === selectedRole.questions.length - 1 ? "اتمام آزمون" : "بعدی"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
