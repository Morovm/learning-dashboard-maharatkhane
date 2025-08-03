import { type NextRequest, NextResponse } from "next/server"
import { AbortSignal } from "abort-controller"

// Add this function to get yesterday's date for fresher news
function getYesterdayDate() {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return yesterday.toISOString().split("T")[0] // Format: YYYY-MM-DD
}

export async function GET(request: NextRequest) {
  try {
    const apiKey = "b928a6b0218f072fb8e99df0ea53e767"

    console.log("Fetching AI news from GNews API...")

    // Fetch AI-related news from GNews API
    const response = await fetch(
      `https://gnews.io/api/v4/search?q=artificial%20intelligence%20OR%20AI%20OR%20ChatGPT%20OR%20OpenAI%20OR%20Google%20AI%20OR%20machine%20learning&lang=en&country=us&max=12&sortby=publishedAt&from=${getYesterdayDate()}&apikey=${apiKey}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // Add timeout
        signal: AbortSignal.timeout(10000), // 10 second timeout
      },
    )

    console.log("GNews API Response Status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`GNews API error: ${response.status} - ${errorText}`)
      throw new Error(`GNews API error: ${response.status}`)
    }

    const data = await response.json()
    console.log("GNews API Response:", data)

    // Check if we have articles
    if (!data.articles || data.articles.length === 0) {
      console.log("No articles found in API response")
      throw new Error("No articles found")
    }

    // Transform the data to match our interface
    const transformedNews = data.articles.map((article: any, index: number) => ({
      id: `gnews-${index}`,
      title: article.title || "عنوان خبر",
      summary: article.description || article.content?.substring(0, 200) + "..." || "خلاصه خبر در دسترس نیست",
      publishDate: new Date(article.publishedAt).toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      source: article.source?.name || "منبع نامشخص",
      url: article.url || "#",
      image: article.image,
    }))

    console.log("Transformed news count:", transformedNews.length)

    return NextResponse.json({
      articles: transformedNews,
      success: true,
      count: transformedNews.length,
    })
  } catch (error) {
    console.error("GNews API Error Details:", error)

    // Create more realistic fallback news with current dates
    const currentDate = new Date()
    const yesterday = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000)
    const twoDaysAgo = new Date(currentDate.getTime() - 2 * 24 * 60 * 60 * 1000)

    const fallbackNews = [
      {
        id: "fallback-1",
        title: "OpenAI Launches Advanced GPT-4 Turbo with Enhanced Capabilities",
        summary:
          "OpenAI has released an updated version of GPT-4 Turbo featuring improved reasoning capabilities, faster response times, and better understanding of complex queries. The new model shows significant improvements in coding and mathematical problem-solving.",
        publishDate: currentDate.toLocaleDateString("fa-IR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        source: "OpenAI",
        url: "https://openai.com/blog",
      },
      {
        id: "fallback-2",
        title: "Google Announces Gemini Pro 1.5 with Multimodal AI Features",
        summary:
          "Google's latest Gemini Pro 1.5 model introduces advanced multimodal capabilities, allowing it to process text, images, audio, and video simultaneously. The model demonstrates superior performance in creative tasks and complex reasoning.",
        publishDate: yesterday.toLocaleDateString("fa-IR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        source: "Google AI",
        url: "https://ai.google.dev",
      },
      {
        id: "fallback-3",
        title: "Microsoft Copilot Integration Expands Across Enterprise Applications",
        summary:
          "Microsoft has announced the expansion of Copilot AI assistant across its entire suite of enterprise applications, including Teams, Outlook, and PowerBI. The integration aims to boost productivity and streamline workflows for business users.",
        publishDate: twoDaysAgo.toLocaleDateString("fa-IR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        source: "Microsoft",
        url: "https://news.microsoft.com",
      },
      {
        id: "fallback-4",
        title: "AI Breakthrough in Medical Diagnosis Shows 95% Accuracy Rate",
        summary:
          "Researchers at Stanford University have developed an AI system that can diagnose rare diseases with 95% accuracy, potentially revolutionizing medical diagnosis. The system analyzes medical images and patient data to identify conditions that are often missed by traditional methods.",
        publishDate: currentDate.toLocaleDateString("fa-IR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        source: "Stanford Medicine",
        url: "https://med.stanford.edu",
      },
      {
        id: "fallback-5",
        title: "Meta Introduces Advanced AI Video Generation Technology",
        summary:
          "Meta has unveiled its latest AI video generation technology that can create high-quality videos from text descriptions. The technology represents a significant advancement in generative AI and could transform content creation across social media platforms.",
        publishDate: yesterday.toLocaleDateString("fa-IR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        source: "Meta AI",
        url: "https://ai.meta.com",
      },
      {
        id: "fallback-6",
        title: "Anthropic's Claude 3 Shows Remarkable Performance in Coding Tasks",
        summary:
          "Anthropic's Claude 3 model has demonstrated exceptional performance in software development tasks, outperforming many competitors in code generation, debugging, and software architecture design. The model is being adopted by major tech companies for development workflows.",
        publishDate: twoDaysAgo.toLocaleDateString("fa-IR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        source: "Anthropic",
        url: "https://www.anthropic.com",
      },
    ]

    return NextResponse.json({
      articles: fallbackNews,
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
      fallback: true,
    })
  }
}
