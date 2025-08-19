import { type NextRequest, NextResponse } from "next/server"

interface TalentEvaluationRequest {
  formData: any
}

export async function POST(request: NextRequest) {
  try {
    const { formData }: TalentEvaluationRequest = await request.json()

    // AI-powered evaluation logic
    let score = 0
    const recommendations: string[] = []
    
    // Education level scoring (30 points max)
    const educationScores = { 
      "دیپلم": 10, 
      "کاردانی": 15, 
      "کارشناسی": 20, 
      "کارشناسی ارشد": 25, 
      "دکتری": 30 
    }
    score += educationScores[formData.educationLevel as keyof typeof educationScores] || 0
    
    // Work experience scoring (25 points max)
    if (formData.jobExperience && formData.jobExperience.length > 100) score += 15
    if (formData.currentOccupation && formData.currentOccupation.trim()) score += 10
    
    // Skills and courses scoring (25 points max)
    if (formData.coursesAttended && formData.coursesAttended.length > 50) score += 8
    if (formData.onlineCoursesAttended && formData.onlineCoursesAttended.length > 50) score += 8
    if (formData.digitalToolsFamiliarity && formData.digitalToolsFamiliarity.length > 50) score += 9
    
    // Research and academic work scoring (15 points max)
    if (formData.articles && formData.articles.trim()) score += 4
    if (formData.books && formData.books.trim()) score += 4
    if (formData.researchPapers && formData.researchPapers.trim()) score += 4
    if (formData.competitions && formData.competitions.trim()) score += 3
    
    // English proficiency scoring (5 points max)
    if (formData.englishCoursesAttended && formData.englishCoursesAttended.trim()) score += 5
    
    // Generate personalized recommendations based on score and interests
    if (score >= 80) {
      recommendations.push("دوره‌های پیشرفته یادگیری عمیق")
      recommendations.push("پروژه‌های تحقیقاتی در حوزه AI")
      recommendations.push("مربیگری و تدریس هوش مصنوعی")
      recommendations.push("توسعه محصولات AI تجاری")
    } else if (score >= 60) {
      recommendations.push("دوره‌های متوسط یادگیری ماشین")
      recommendations.push("پروژه‌های عملی با Python")
      recommendations.push("تقویت مهارت‌های برنامه‌نویسی")
      recommendations.push("آشنایی با فریمورک‌های AI")
    } else if (score >= 40) {
      recommendations.push("دوره‌های مقدماتی هوش مصنوعی")
      recommendations.push("آموزش پایه‌های برنامه‌نویسی")
      recommendations.push("آشنایی با ابزارهای AI")
      recommendations.push("دوره‌های تولید محتوا با AI")
    } else {
      recommendations.push("دوره‌های پایه کامپیوتر")
      recommendations.push("آموزش مهارت‌های دیجیتال")
      recommendations.push("آشنایی با مفاهیم اولیه AI")
      recommendations.push("دوره‌های عمومی فناوری")
    }
    
    // Add interest-based recommendations
    if (formData.educationalInterests?.includes("تولید محتوا")) {
      recommendations.push("دوره تولید محتوا با ChatGPT")
    }
    if (formData.educationalInterests?.includes("تحلیل داده")) {
      recommendations.push("دوره تحلیل داده و علم داده")
    }
    if (formData.educationalInterests?.includes("طراحی گرافیک")) {
      recommendations.push("دوره طراحی با ابزارهای AI")
    }
    
    // Ensure score doesn't exceed 100
    score = Math.min(score, 100)
    
    return NextResponse.json({
      success: true,
      score,
      recommendations: recommendations.slice(0, 6), // Limit to 6 recommendations
      analysis: {
        strengths: score >= 80 ? [
          "سطح تحصیلات بالا",
          "تجربه کاری غنی", 
          "مهارت‌های تحقیقاتی قوی"
        ] : score >= 60 ? [
          "پایه‌های علمی مناسب",
          "انگیزه برای یادگیری",
          "تجربه عملی"
        ] : [
          "علاقه به یادگیری",
          "پتانسیل رشد",
          "انگیزه پیشرفت"
        ],
        improvements: score >= 80 ? [
          "تمرکز بر پروژه‌های چالش‌برانگیز",
          "رهبری تیم‌های تحقیقاتی"
        ] : score >= 60 ? [
          "تقویت مهارت‌های عملی",
          "شرکت در دوره‌های تکمیلی"
        ] : [
          "یادگیری مهارت‌های پایه",
          "تمرین مداوم و منظم"
        ]
      }
    })

  } catch (error) {
    console.error("Talent Evaluation API Error:", error)
    
    return NextResponse.json({
      success: false,
      error: "خطا در ارزیابی استعداد",
      message: "لطفاً دوباره تلاش کنید"
    }, { status: 500 })
  }
}