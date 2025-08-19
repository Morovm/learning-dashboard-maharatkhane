
"use client"

import { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Upload, FileText, Video, Headphones, Download } from 'lucide-react'
import DiscoverTalentButton from './discover-talent-button'

export default function TeacherAssistantSection() {
  const { isAuthenticated } = useAuth()
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [notes, setNotes] = useState('')

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const processFile = async () => {
    if (!selectedFile || !isAuthenticated) return

    setIsProcessing(true)
    
    // Simulate processing (in real implementation, this would call NotebookLM API)
    setTimeout(() => {
      const processedFile = {
        id: Date.now(),
        originalName: selectedFile.name,
        notes: notes,
        uploadedAt: new Date().toISOString(),
        status: 'processed',
        outputs: {
          video: `${selectedFile.name}_video.mp4`,
          podcast: `${selectedFile.name}_podcast.mp3`,
          summary: `خلاصه‌ای از محتوای ${selectedFile.name} تولید شده است.`
        }
      }
      
      setUploadedFiles(prev => [...prev, processedFile])
      setSelectedFile(null)
      setNotes('')
      setIsProcessing(false)
      
      // Save to localStorage
      const existingFiles = JSON.parse(localStorage.getItem('processedFiles') || '[]')
      existingFiles.push(processedFile)
      localStorage.setItem('processedFiles', JSON.stringify(existingFiles))
    }, 3000)
  }

  if (!isAuthenticated) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold persian-heading text-white mb-6">
            دستیار مدرسین
          </h2>
          <p className="text-lg text-gray-300 persian-body mb-8">
            برای استفاده از این بخش، لطفاً ابتدا وارد شوید
          </p>
          <DiscoverTalentButton />
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold persian-heading text-white mb-6">
            دستیار مدرسین
          </h2>
          <p className="text-lg text-gray-300 persian-body">
            جزوات درسی خود را آپلود کنید و ویدیو و پادکست آموزشی دریافت کنید
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl persian-heading text-white flex items-center gap-2">
                <Upload className="w-5 h-5" />
                آپلود جزوات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-gray-300 persian-body">
                  انتخاب فایل
                </Label>
                <Input
                  type="file"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.txt"
                  className="persian-body"
                />
              </div>

              <div>
                <Label className="text-gray-300 persian-body">
                  یادداشت‌های اضافی (اختیاری)
                </Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="یادداشت‌هایی که می‌خواهید در نظر گرفته شود..."
                  className="persian-body"
                />
              </div>

              <Button
                onClick={processFile}
                disabled={!selectedFile || isProcessing}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black persian-body"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black ml-2"></div>
                    در حال پردازش...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 ml-2" />
                    پردازش فایل
                  </>
                )}
              </Button>

              {selectedFile && (
                <div className="p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-300 persian-body">
                    <FileText className="w-4 h-4" />
                    {selectedFile.name}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl persian-heading text-white">
                فایل‌های پردازش شده
              </CardTitle>
            </CardHeader>
            <CardContent>
              {uploadedFiles.length === 0 ? (
                <div className="text-center text-gray-400 persian-body py-8">
                  هنوز فایلی پردازش نشده است
                </div>
              ) : (
                <div className="space-y-4">
                  {uploadedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="p-4 bg-gray-700 rounded-lg space-y-3"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-yellow-500" />
                        <span className="text-white persian-body font-medium">
                          {file.originalName}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-300 persian-body">
                        {file.outputs.summary}
                      </p>
                      
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="persian-body"
                        >
                          <Video className="w-4 h-4 ml-1" />
                          دانلود ویدیو
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="persian-body"
                        >
                          <Headphones className="w-4 h-4 ml-1" />
                          دانلود پادکست
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
