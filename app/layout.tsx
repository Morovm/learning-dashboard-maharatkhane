import type React from "react"
import type { Metadata } from "next"
import "./globals.css"


export const metadata: Metadata = {
  title: "داشبورد آموزشی مهارتخانه البرز",
  description: "پلتفرم آموزشی پروژه‌های فریلنسری هوش مصنوعی",
  generator: 'Next.js',
  keywords: 'هوش مصنوعی, آموزش, مهارتخانه البرز, AI, یادگیری ماشین',
  authors: [{ name: 'مهارتخانه البرز' }],
  viewport: 'width=device-width, initial-scale=1'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-gray-900 text-white min-h-screen">{children}</body>
    </html>
  )
}
