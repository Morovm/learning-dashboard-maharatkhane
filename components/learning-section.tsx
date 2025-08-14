"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, BookOpen, Video, FileText, ExternalLink } from "lucide-react"
import ProtectedLink from "./protected-link"
import DiscoverTalentButton from "./discover-talent-button"

interface LearningSectionProps {
  onAuthRequired: (action: () => void) => void
}

const learningModules = [
  {
    id: "prompt-writing",
    title: "پرامپت نویسی",
    description: "یادگیری هنر نوشتن پرامپت‌های مؤثر برای بهترین نتایج",
    topics: [
      {
        title: "مبانی پرامپت نویسی",
        description: "اصول پایه و تکنیک‌های اولیه برای نوشتن پرامپت‌های مؤثر",
        resources: [
          {
            title: "OpenAI Prompt Engineering Guide",
            url: "https://platform.openai.com/docs/guides/prompt-engineering",
            type: "article",
          },
          {
            title: "Prompt Engineering Course - DeepLearning.AI",
            url: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/",
            type: "video",
          },
          {
            title: "Best Practices for Prompt Design",
            url: "https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-openai-api",
            type: "article",
          },
        ],
        roadmap: [
          "Understanding AI model capabilities and limitations",
          "Learning basic prompt structure and components",
          "Practicing with different prompt types",
          "Advanced techniques: few-shot learning, chain-of-thought",
          "Testing and iterating prompts for optimal results",
        ],
      },
      {
        title: "پرامپت‌های پیشرفته",
        description: "تکنیک‌های پیشرفته برای پرامپت‌های پیچیده و چندمرحله‌ای",
        resources: [
          {
            title: "Advanced Prompt Engineering Techniques",
            url: "https://www.promptingguide.ai/techniques",
            type: "article",
          },
          { title: "Chain-of-Thought Prompting", url: "https://arxiv.org/abs/2201.11903", type: "video" },
          {
            title: "Prompt Chaining and Composition",
            url: "https://www.promptingguide.ai/techniques/prompt_chaining",
            type: "article",
          },
        ],
        roadmap: [
          "Master chain-of-thought prompting",
          "Learn prompt chaining techniques",
          "Understand role-based prompting",
          "Practice with complex multi-step tasks",
          "Develop prompt templates for different use cases",
        ],
      },
    ],
  },
  {
    id: "content-generation",
    title: "تولید محتوا",
    description: "ایجاد انواع محتوا با کمک ابزارهای هوش مصنوعی",
    topics: [
      {
        title: "نوشتن مقالات و بلاگ",
        description: "تولید مقالات باکیفیت و جذاب با کمک AI",
        resources: [
          {
            title: "AI Content Writing Best Practices",
            url: "https://blog.hubspot.com/marketing/ai-content-writing",
            type: "article",
          },
          {
            title: "Blog Writing with ChatGPT",
            url: "https://www.youtube.com/results?search_query=blog+writing+with+chatgpt",
            type: "video",
          },
          {
            title: "Content Strategy for AI Writers",
            url: "https://contentmarketinginstitute.com/articles/ai-content-strategy/",
            type: "article",
          },
        ],
        roadmap: [
          "Learn content planning and research",
          "Master AI-assisted writing techniques",
          "Understand SEO optimization for AI content",
          "Practice editing and fact-checking",
          "Develop a consistent writing workflow",
        ],
      },
    ],
  },
  {
    id: "data-analysis",
    title: "کار با داده‌ها",
    description: "تجزیه و تحلیل داده‌ها با ابزارهای هوش مصنوعی",
    topics: [
      {
        title: "تحلیل داده با Python",
        description: "استفاده از Python و کتابخانه‌های AI برای تحلیل داده",
        resources: [
          { title: "Python for Data Analysis", url: "https://wesmckinney.com/book/", type: "article" },
          {
            title: "Pandas and NumPy Tutorial",
            url: "https://www.youtube.com/results?search_query=pandas+numpy+tutorial",
            type: "video",
          },
          {
            title: "Machine Learning with Scikit-learn",
            url: "https://scikit-learn.org/stable/tutorial/index.html",
            type: "article",
          },
        ],
        roadmap: [
          "Learn Python basics for data science",
          "Master Pandas for data manipulation",
          "Understand data visualization with Matplotlib/Seaborn",
          "Practice statistical analysis techniques",
          "Build predictive models with ML libraries",
        ],
      },
    ],
  },
]

export default function LearningSection({ onAuthRequired }: LearningSectionProps) {
  const [activeModule, setActiveModule] = useState("prompt-writing")
  const [expandedTopics, setExpandedTopics] = useState<string[]>([])

  const toggleTopic = (topicIndex: string) => {
    setExpandedTopics((prev) =>
      prev.includes(topicIndex) ? prev.filter((id) => id !== topicIndex) : [...prev, topicIndex],
    )
  }

  const handleResourceClick = (url: string, title: string) => {
    onAuthRequired(() => {
      window.open(url, "_blank")
    })
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "video":
        return Video
      case "article":
        return FileText
      default:
        return BookOpen
    }
  }

  return (
    <section className="mobile-section bg-gray-800 mobile-container">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 persian-heading mobile-heading-spacing">
            آموزش‌ها
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 persian-body max-w-3xl mx-auto mobile-text-spacing px-2">
            مسیر یادگیری جامع برای تسلط بر مهارت‌های هوش مصنوعی
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Module Tabs */}
          <div className="lg:w-1/3">
            <div className="space-y-2">
              {learningModules.map((module) => (
                <button
                  key={module.id}
                  onClick={() => setActiveModule(module.id)}
                  className={`w-full text-right p-3 sm:p-4 rounded-lg transition-colors duration-200 ${
                    activeModule === module.id
                      ? "bg-yellow-500 text-black"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  <h3 className="font-semibold persian-heading mb-1 text-sm sm:text-base mobile-heading-spacing">
                    {module.title}
                  </h3>
                  <p className="text-xs sm:text-sm persian-body opacity-80 mobile-text-spacing">{module.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Module Content */}
          <div className="lg:w-2/3">
            {learningModules
              .filter((module) => module.id === activeModule)
              .map((module) => (
                <div key={module.id} className="space-y-4 sm:space-y-6">
                  {module.topics.map((topic, topicIndex) => {
                    const topicId = `${module.id}-${topicIndex}`
                    const isExpanded = expandedTopics.includes(topicId)

                    return (
                      <div key={topicIndex} className="card">
                        <button
                          onClick={() => toggleTopic(topicId)}
                          className="w-full flex items-center justify-between text-right"
                        >
                          <ChevronDown
                            className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform duration-200 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                          <div className="flex-1 mr-2 sm:mr-3">
                            <h3 className="text-lg sm:text-xl font-semibold persian-heading mb-1 sm:mb-2 mobile-heading-spacing">
                              {topic.title}
                            </h3>
                            <p className="text-gray-400 persian-body text-xs sm:text-sm mobile-text-spacing">
                              {topic.description}
                            </p>
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
                            {/* Resources */}
                            <div>
                              <h4 className="text-base sm:text-lg font-semibold persian-heading mb-2 sm:mb-3 text-yellow-400 mobile-heading-spacing">
                                منابع یادگیری
                              </h4>
                              <div className="space-y-2">
                                {topic.resources.map((resource, resIndex) => (
                                  <ProtectedLink
                                    key={resIndex}
                                    href={resource.url}
                                    className="flex items-center justify-between w-full p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200 group"
                                  >
                                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-yellow-400" />
                                    <div className="flex items-center flex-1 mr-2 sm:mr-3">
                                      <span className="english-text text-xs sm:text-sm mobile-text-spacing">
                                        {resource.title}
                                      </span>
                                      <ResourceIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mr-2" />
                                    </div>
                                  </ProtectedLink>
                                ))}
                              </div>
                            </div>

                            {/* Roadmap */}
                            <div>
                              <h4 className="text-base sm:text-lg font-semibold persian-heading mb-2 sm:mb-3 text-orange-400 mobile-heading-spacing">
                                مسیر یادگیری
                              </h4>
                              <div className="space-y-2 sm:space-y-3">
                                {topic.roadmap.map((step, stepIndex) => (
                                  <div key={stepIndex} className="flex items-start">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 rounded-full flex items-center justify-center text-black text-xs sm:text-sm font-bold mr-2 sm:mr-3 mt-1 flex-shrink-0">
                                      {stepIndex + 1}
                                    </div>
                                    <p className="text-gray-300 english-text text-xs sm:text-sm leading-relaxed mobile-text-spacing">
                                      {step}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}