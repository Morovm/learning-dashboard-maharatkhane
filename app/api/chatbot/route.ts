import { type NextRequest, NextResponse } from "next/server"
import { HuggingFaceAPI } from "@/lib/huggingface"

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: "پیام نامعتبر است" },
        { status: 400 }
      )
    }

    const hfApi = new HuggingFaceAPI()
    
    // Create a context-aware prompt in Persian
    const contextPrompt = `شما یک دستیار هوشمند برای موسسه آموزشی مهارتخانه البرز هستید. این موسسه دوره‌های هوش مصنوعی، تحلیل داده، تولید محتوا و مهارت‌های دیجیتال ارائه می‌دهد. 

سوال کاربر: ${message}

لطفاً پاسخی مفید، دوستانه و مرتبط با آموزش و هوش مصنوعی به فارسی ارائه دهید:`

    const response = await hfApi.generateText(contextPrompt, 'gpt2')
    
    // Clean up the response and ensure it's in Persian context
    let cleanResponse = response.replace(contextPrompt, '').trim()
    
    // If response is too short or doesn't seem relevant, provide a fallback
    if (cleanResponse.length < 10 || !cleanResponse.includes('هوش مصنوعی') && !cleanResponse.includes('آموزش')) {
      const fallbackResponses = [
        "در مهارتخانه البرز ما دوره‌های متنوعی در حوزه هوش مصنوعی داریم. آیا علاقه‌مند به یادگیری موضوع خاصی هستید؟",
        "برای شروع یادگیری هوش مصنوعی، پیشنهاد می‌کنم ابتدا با مفاهیم پایه آشنا شوید. چه سطحی از دانش فعلی دارید؟",
        "هوش مصنوعی حوزه‌ای گسترده است. آیا بیشتر به تولید محتوا، تحلیل داده، یا توسعه مدل‌ها علاقه دارید؟",
        "در دوره‌های ما یاد می‌گیرید چگونه از ابزارهایی مثل ChatGPT، Python و دیگر تکنولوژی‌ها استفاده کنید. سوال خاصی دارید؟"
      ]
      
      cleanResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
    }

    return NextResponse.json({
      response: cleanResponse,
      success: true
    })

  } catch (error) {
    console.error('Chatbot API Error:', error)

    // Fallback responses for errors
    const errorResponses = [
      "متأسفانه در حال حاضر مشکل فنی داریم. لطفاً بعداً دوباره تلاش کنید.",
      "سیستم موقتاً در دسترس نیست. می‌توانید با تیم پشتیبانی تماس بگیرید.",
      "خطایی رخ داده است. لطفاً سوال خود را مجدداً مطرح کنید."
    ]

    const randomError = errorResponses[Math.floor(Math.random() * errorResponses.length)]

    return NextResponse.json({
      response: randomError,
      success: false,
      error: "API Error"
    })
  }
}