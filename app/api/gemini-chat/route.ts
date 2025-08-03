import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json()

    // Use the provided Google API key
    const apiKey = process.env.GOOGLE_API_KEY || "AIzaSyCirfm_vzKo639LWWKx1yq77rvxSvL3EUE"

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a helpful AI assistant for an AI learning platform. Please respond in Persian (Farsi) language. The user asked: ${message}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
          ],
        }),
      },
    )

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "متأسفانه نمی‌توانم در حال حاضر پاسخ دهم."

    return NextResponse.json({
      response: aiResponse,
      success: true,
    })
  } catch (error) {
    console.error("Gemini API Error:", error)

    // Fallback responses in Persian
    const fallbackResponses = [
      "سلام! من آماده کمک به شما در زمینه هوش مصنوعی و یادگیری ماشین هستم. چه سوالی دارید؟",
      "در زمینه پرامپت نویسی، تولید محتوا، یا تحلیل داده چه کمکی می‌توانم بکنم؟",
      "برای شروع کار با هوش مصنوعی چه مهارت‌هایی نیاز دارید؟ بپرسید تا راهنمایی‌تان کنم.",
      "آیا سوالی در مورد ابزارهای هوش مصنوعی مثل ChatGPT، Claude یا Midjourney دارید؟",
    ]

    const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]

    return NextResponse.json({
      response: randomResponse,
      success: true,
    })
  }
}
