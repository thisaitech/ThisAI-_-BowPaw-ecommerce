import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'
import { Poppins, Inter } from 'next/font/google'
import './globals.css'
import { ParallaxProviderWrapper } from '@/components/providers/ParallaxProvider'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileBottomNav from '@/components/layout/MobileBottomNav'
import CartSidebar from '@/components/cart/CartSidebar'
import WishlistModal from '@/components/wishlist/WishlistModal'
import QuickViewModal from '@/components/product/QuickViewModal'
import NewsletterPopup from '@/components/ui/NewsletterPopup'
import RecentPurchasePopup from '@/components/ui/RecentPurchasePopup'
import PageTransition from '@/components/ui/PageTransition'
import InitialLoader from '@/components/providers/InitialLoader'
import PageTransitionLoader from '@/components/providers/PageTransitionLoader'
import ChatBot from '@/components/chat/ChatBot'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1F2937' },
  ],
}

export const metadata: Metadata = {
  title: 'BowPaw - Premium Pet Products | Love Your Pets More',
  description: 'Discover premium pet supplies for dogs, cats, and more. Quality products your furry friends will love. Free shipping on orders over ₹4,000.',
  keywords: 'pet supplies, dog food, cat food, pet toys, pet beds, pet accessories, Tamil Nadu, India',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'BowPaw',
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    title: 'BowPaw - Premium Pet Products',
    description: 'Discover premium pet supplies for dogs, cats, and more.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'BowPaw',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="font-body bg-light text-dark antialiased">
        <InitialLoader>
          <ParallaxProviderWrapper>
            <div className="min-h-screen flex flex-col mobile-vh-fix">
              <Header />
              <main className="flex-1 pb-20 lg:pb-0">
                <PageTransition>
                  {children}
                </PageTransition>
              </main>
              <Footer />
            </div>
            
            {/* Page Transition Loader */}
            <Suspense fallback={null}>
              <PageTransitionLoader />
            </Suspense>
            
            {/* Global Modals & Overlays */}
            <CartSidebar />
            <WishlistModal />
            <QuickViewModal />
            <NewsletterPopup />
            <RecentPurchasePopup />
            
            {/* Chat Bot */}
            <ChatBot />
            
            {/* Mobile Bottom Navigation */}
            <MobileBottomNav />
          </ParallaxProviderWrapper>
        </InitialLoader>
      </body>
    </html>
  )
}

