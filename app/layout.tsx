
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/sonner"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: 'swap',
  preload: true,
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: "مهارتخانه البرز - آموزش هوش مصنوعی",
  description: "پلتفرم جامع آموزش هوش مصنوعی با پروژه‌های عملی و مشاوره تخصصی",
  keywords: "هوش مصنوعی، آموزش، AI، یادگیری ماشین، پایتون",
  authors: [{ name: "مهارتخانه البرز" }],
  openGraph: {
    title: "مهارتخانه البرز - آموزش هوش مصنوعی",
    description: "پلتفرم جامع آموزش هوش مصنوعی با پروژه‌های عملی",
    type: "website",
    locale: "fa_IR",
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta httpEquiv="Content-Security-Policy" content="font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;" />
      </head>
      <body className={`${geist.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
