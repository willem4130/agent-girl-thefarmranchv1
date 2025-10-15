import Link from 'next/link';
import { ArrowRight, Image as ImageIcon, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          {/* Logo/Icon */}
          <div className="relative">
            <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-blue-100 to-purple-100 opacity-50 rounded-full" />
            <div className="relative glass p-8 rounded-3xl">
              <ImageIcon className="w-20 h-20 text-gray-800" />
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
              Farm Ranch Media
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 text-balance">
              AI-Generated Image Gallery by Willem van den Berg
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <Link
              href="/gallery"
              className="glossy-btn px-8 py-4 rounded-xl flex items-center gap-2 text-lg font-medium hover:scale-105"
            >
              <Sparkles className="w-5 h-5" />
              Browse Gallery
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/dashboard"
              className="px-8 py-4 rounded-xl flex items-center gap-2 text-lg font-medium border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            >
              Admin Dashboard
            </Link>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 w-full max-w-5xl">
            <div className="glossy-card text-left">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4">
                <ImageIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">High Quality Images</h3>
              <p className="text-gray-600">
                Browse thousands of AI-generated images in stunning quality
              </p>
            </div>

            <div className="glossy-card text-left">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Organization</h3>
              <p className="text-gray-600">
                Powerful search, filters, and collections to find exactly what you need
              </p>
            </div>

            <div className="glossy-card text-left">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center mb-4">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Selection</h3>
              <p className="text-gray-600">
                Rate, comment, and mark your favorite images for purchase
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
