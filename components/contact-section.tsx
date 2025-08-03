import { Mail, MessageCircle, Phone, MapPin } from "lucide-react"

export default function ContactSection() {
  return (
    <section className="mobile-section bg-gray-800 mobile-container">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 persian-heading mobile-heading-spacing">
            تماس با ما
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 persian-body max-w-2xl mx-auto mobile-text-spacing px-2">
            سوالی دارید یا نیاز به راهنمایی بیشتر؟ با ما در ارتباط باشید
          </p>
        </div>

        <div className="mobile-grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8">
            <div className="card">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-500 rounded-lg flex items-center justify-center ml-3 sm:ml-4">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold persian-heading mobile-heading-spacing">
                  ایمیل پشتیبانی
                </h3>
              </div>
              <p className="text-gray-400 persian-body mb-3 sm:mb-4 text-sm sm:text-base mobile-text-spacing">
                برای سوالات، پیشنهادات و درخواست همکاری با ما تماس بگیرید
              </p>
              <a
                href="mailto:mm.mor1383@gmail.com"
                className="text-yellow-400 hover:text-yellow-300 english-text font-medium text-base sm:text-lg"
              >
                mm.mor1383@gmail.com
              </a>
            </div>

            <div className="card">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-lg flex items-center justify-center ml-3 sm:ml-4">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold persian-heading mobile-heading-spacing">پاسخ سریع</h3>
              </div>
              <p className="text-gray-400 persian-body text-sm sm:text-base mobile-text-spacing">
                معمولاً در کمتر از ۲۴ ساعت به ایمیل‌های شما پاسخ می‌دهیم
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card">
            <h3 className="text-lg sm:text-xl font-semibold persian-heading mb-4 sm:mb-6 mobile-heading-spacing">
              پیام مستقیم
            </h3>
            <form className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium persian-body text-gray-300 mb-2 mobile-text-spacing">
                  نام و نام خانوادگی
                </label>
                <input type="text" className="input-field persian-body" placeholder="نام خود را وارد کنید" />
              </div>

              <div>
                <label className="block text-sm font-medium persian-body text-gray-300 mb-2 mobile-text-spacing">
                  ایمیل
                </label>
                <input type="email" className="input-field english-text" placeholder="your.email@example.com" />
              </div>

              <div>
                <label className="block text-sm font-medium persian-body text-gray-300 mb-2 mobile-text-spacing">
                  موضوع
                </label>
                <input type="text" className="input-field persian-body" placeholder="موضوع پیام خود را وارد کنید" />
              </div>

              <div>
                <label className="block text-sm font-medium persian-body text-gray-300 mb-2 mobile-text-spacing">
                  پیام
                </label>
                <textarea
                  rows={4}
                  className="input-field persian-body resize-none"
                  placeholder="پیام خود را اینجا بنویسید..."
                ></textarea>
              </div>

              <button type="submit" className="w-full btn-primary persian-body">
                ارسال پیام
              </button>
            </form>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="card bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-yellow-500/20">
            <h3 className="text-base sm:text-lg font-semibold persian-heading mb-3 sm:mb-4 text-center mobile-heading-spacing">
              چرا با ما تماس بگیرید؟
            </h3>
            <div className="mobile-grid grid-cols-1 sm:grid-cols-3 text-xs sm:text-sm persian-body text-gray-300">
              <div className="text-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                </div>
                <p className="mobile-text-spacing">مشاوره رایگان</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                </div>
                <p className="mobile-text-spacing">پشتیبانی فنی</p>
              </div>
              <div className="text-center sm:col-span-3 lg:col-span-1">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                </div>
                <p className="mobile-text-spacing">راهنمایی مسیر شغلی</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
