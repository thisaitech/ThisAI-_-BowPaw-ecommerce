import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Poppins, Inter } from 'next/font/google'
import './globals.css'
import { ParallaxProviderWrapper } from '@/components/providers/ParallaxProvider'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
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

export const metadata: Metadata = {
  title: 'BowPaw - Premium Pet Products | Love Your Pets More',
  description: 'Discover premium pet supplies for dogs, cats, and more. Quality products your furry friends will love. Free shipping on orders over $50.',
  keywords: 'pet supplies, dog food, cat food, pet toys, pet beds, pet accessories',
  openGraph: {
    title: 'BowPaw - Premium Pet Products',
    description: 'Discover premium pet supplies for dogs, cats, and more.',
    type: 'website',
    locale: 'en_US',
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
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
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
          </ParallaxProviderWrapper>
        </InitialLoader>
      </body>
    </html>
  )
}

