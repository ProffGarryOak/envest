import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Envest - AI-Powered Stock Market Analysis",
  description: "Professional Indian Stock Market News & AI-Powered Sentiment Analysis Platform",
  keywords: "stock market, news, AI, sentiment analysis, portfolio tracking, Indian stocks",
  authors: [{ name: "Envest Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900 min-h-screen`}>
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                      <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" fill="currentColor"/>
                      <path d="M9 12l2 2 4-4" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Envest</h1>
                  <p className="text-xs text-gray-500 -mt-1">AI-Powered Analysis</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Dashboard</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Market</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">News</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Analysis</a>
              </nav>

              {/* User Actions */}
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">Live</span>
                </div>
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                      <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" fill="currentColor"/>
                    </svg>
                  </div>
                  <span className="text-xl font-bold text-gray-900">Envest</span>
                </div>
                <p className="text-gray-600 mb-4 max-w-md">
                  AI-powered stock market analysis platform helping investors make smarter decisions 
                  with real-time news and sentiment analysis.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Real-time Data</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>AI Analysis</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Features</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="#" className="hover:text-blue-600 transition-colors">Portfolio Tracking</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition-colors">Market News</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition-colors">Sentiment Analysis</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition-colors">Price Alerts</a></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="#" className="hover:text-blue-600 transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition-colors">API Docs</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
              <p className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Envest. All rights reserved.
              </p>
              <div className="flex items-center gap-4 mt-4 sm:mt-0">
                <span className="text-sm text-gray-500">Made with</span>
                <div className="flex items-center gap-1">
                  <span className="text-red-500">❤️</span>
                  <span className="text-sm text-gray-500">for investors</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}