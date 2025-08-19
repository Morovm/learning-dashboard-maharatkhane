"use client"

import { useState, useRef } from "react"
import { Upload, FileText, Video, Headphones, Download, Trash2, GraduationCap, Loader2 } from "lucide-react"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  uploadedAt: string
  processed: boolean
  videoUrl?: string
  podcastUrl?: string
}

export default function TeacherAssistantSection() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)

    for (const file of Array.from(files)) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (!allowedTypes.includes(file.type)) {
        alert(`فایل ${file.name} پشتیبانی نمی‌شود. لطفاً فایل PDF، Word یا متنی آپلود کنید.`)
        continue
      }

      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 1000))

      const newFile: UploadedFile = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toLocaleDateString("fa-IR"),
        processed: false
      }

      setUploadedFiles(prev => [...prev, newFile])
    }

    setIsUploading(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const processFile = async (fileId: string) => {
    setIsProcessing(true)
    
    // Simulate processing with NotebookLM-like API
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    setUploadedFiles(prev => prev.map(file => 
      file.id === fileId 
        ? { 
            ...file, 
            processed: true,
            videoUrl: `https://example.com/video/${fileId}`,
            podcastUrl: `https://example.com/podcast/${fileId}`
          }
        : file
    ))
    
    setIsProcessing(false)
  }

  const deleteFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <section className="mobile-section bg-gray-900 mobile-container">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="p-3 sm:p-4 bg-yellow-500 rounded-full">
              <GraduationCap className="w-8 h-8 sm:w-12 sm:h-12 text-black" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 persian-heading mobile-heading-spacing">
            دستیار مدرسین
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 persian-body max-w-3xl mx-auto mobile-text-spacing px-2">
            جزوات درسی خود را آپلود کنید و ویدیو و پادکست آموزشی دریافت کنید
          </p>
        </div>

        {/* Upload Area */}
        <div className="card mb-8">
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-yellow-500 transition-colors duration-200">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
            
            <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold persian-heading mb-2 text-white">
              آپلود جزوات درسی
            </h3>
            <p className="text-gray-400 persian-body mb-4">
              فایل‌های PDF، Word یا متنی خود را اینجا بکشید یا کلیک کنید
            </p>
            
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="btn-primary persian-body disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                  در حال آپلود...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 ml-2" />
                  انتخاب فایل
                </>
              )}
            </button>
            
            <p className="text-xs text-gray-500 persian-body mt-2">
              حداکثر حجم: 10MB | فرمت‌های پشتیبانی شده: PDF, DOC, DOCX, TXT
            </p>
          </div>
        </div>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="card">
            <h3 className="text-xl font-semibold persian-heading mb-6 text-white">
              فایل‌های آپلود شده
            </h3>
            
            <div className="space-y-4">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <FileText className="w-6 h-6 text-yellow-500 ml-3" />
                      <div>
                        <h4 className="font-semibold text-white persian-body">{file.name}</h4>
                        <p className="text-sm text-gray-400 persian-body">
                          {formatFileSize(file.size)} • آپلود شده در {file.uploadedAt}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 space-x-reverse">
                      {!file.processed && (
                        <button
                          onClick={() => processFile(file.id)}
                          disabled={isProcessing}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors persian-body text-sm disabled:opacity-50"
                        >
                          {isProcessing ? (
                            <>
                              <Loader2 className="w-4 h-4 ml-1 animate-spin" />
                              پردازش...
                            </>
                          ) : (
                            "تولید محتوا"
                          )}
                        </button>
                      )}
                      
                      <button
                        onClick={() => deleteFile(file.id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {file.processed && (
                    <div className="border-t border-gray-600 pt-4 mt-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-600 rounded-lg p-4">
                          <div className="flex items-center mb-3">
                            <Video className="w-5 h-5 text-green-400 ml-2" />
                            <h5 className="font-semibold text-white persian-heading">ویدیو آموزشی</h5>
                          </div>
                          <p className="text-sm text-gray-300 persian-body mb-3">
                            ویدیو آموزشی تولید شده از جزوات شما
                          </p>
                          <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors persian-body text-sm flex items-center justify-center">
                            <Download className="w-4 h-4 ml-2" />
                            دانلود ویدیو
                          </button>
                        </div>

                        <div className="bg-gray-600 rounded-lg p-4">
                          <div className="flex items-center mb-3">
                            <Headphones className="w-5 h-5 text-purple-400 ml-2" />
                            <h5 className="font-semibold text-white persian-heading">پادکست</h5>
                          </div>
                          <p className="text-sm text-gray-300 persian-body mb-3">
                            پادکست صوتی تولید شده از محتوای درس
                          </p>
                          <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-colors persian-body text-sm flex items-center justify-center">
                            <Download className="w-4 h-4 ml-2" />
                            دانلود پادکست
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features Info */}
        <div className="mt-12 card bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border-yellow-500/30">
          <h3 className="text-lg font-semibold persian-heading mb-4 text-center">
            قابلیت‌های دستیار مدرسین
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm persian-body text-gray-300">
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Video className="w-6 h-6 text-black" />
              </div>
              <h4 className="font-semibold text-yellow-400 mb-2">تولید ویدیو</h4>
              <p>تبدیل جزوات به ویدیوهای آموزشی جذاب</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Headphones className="w-6 h-6 text-black" />
              </div>
              <h4 className="font-semibold text-orange-400 mb-2">تولید پادکست</h4>
              <p>ایجاد محتوای صوتی برای یادگیری در حین حرکت</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-black" />
              </div>
              <h4 className="font-semibold text-amber-400 mb-2">پردازش هوشمند</h4>
              <p>تحلیل و بهینه‌سازی محتوای آموزشی</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}