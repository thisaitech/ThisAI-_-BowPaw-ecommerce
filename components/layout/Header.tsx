'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  Menu, 
  X, 
  ChevronDown,
  User,
  Phone,
  Percent
} from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'
import { useWishlistStore } from '@/store/useWishlistStore'
import { useUIStore } from '@/store/useUIStore'
import { useAuthStore } from '@/store/useAuthStore'
import { cn } from '@/lib/utils'
import SearchDropdown from './SearchDropdown'
import MegaMenu from './MegaMenu'

// Mobile Navigation Item Component with Accordion
function MobileNavItem({ 
  item, 
  index, 
  closeMobileMenu 
}: { 
  item: typeof navigation[0]
  index: number
  closeMobileMenu: () => void 
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="overflow-hidden"
    >
      {item.children ? (
        <>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              'w-full flex items-center justify-between px-4 py-3.5 font-medium rounded-xl transition-all',
              'hover:bg-primary-50 active:scale-[0.98]',
              item.highlight && 'bg-red-50 text-red-500',
              isExpanded && 'bg-primary-50 text-primary-600'
            )}
          >
            <span className="flex items-center gap-2">
              {item.name}
              {item.highlight && <span>🔥</span>}
            </span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </button>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pl-3 pr-2 py-2 space-y-1">
                  {item.children.map((category) => (
                    <div key={category.name} className="mb-3">
                      <p className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wide">
                        {category.name}
                      </p>
                      <div className="space-y-0.5">
                        {category.items.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            onClick={closeMobileMenu}
                            className="block px-3 py-2.5 text-sm text-gray-600 hover:text-primary-500 hover:bg-primary-50/50 rounded-lg transition-colors active:scale-[0.98]"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <Link
          href={item.href}
          onClick={closeMobileMenu}
          className={cn(
            'block px-4 py-3.5 font-medium rounded-xl transition-all',
            'hover:bg-primary-50 hover:text-primary-500 active:scale-[0.98]',
            item.highlight && 'bg-red-50 text-red-500'
          )}
        >
          {item.name}
          {item.highlight && <span className="ml-2">🔥</span>}
        </Link>
      )}
    </motion.div>
  )
}

const navigation = [
  { name: 'Home', href: '/' },
  { 
    name: 'Sale', 
    href: '/shop?filter=sale',
    megaMenu: true,
    highlight: true,
    children: [
      { 
        name: 'Hot Deals 🔥',
        items: [
          { name: 'Flash Sale - Up to 50% Off', href: '/shop?filter=sale' },
          { name: 'Best Sellers', href: '/shop?filter=bestseller' },
          { name: 'New Arrivals', href: '/shop?filter=new' },
          { name: 'Clearance Sale', href: '/shop?filter=sale' },
        ]
      },
      { 
        name: 'Shop by Pet',
        items: [
          { name: '🐕 Dog Products', href: '/shop?pet=dog' },
          { name: '🐈 Cat Products', href: '/shop?pet=cat' },
          { name: '🐦 Bird Supplies', href: '/shop?category=bird' },
          { name: '🐠 Fish Supplies', href: '/shop?category=fish' },
        ]
      },
      { 
        name: 'Categories',
        items: [
          { name: 'Food & Treats', href: '/shop?category=food' },
          { name: 'Toys & Play', href: '/shop?category=toys' },
          { name: 'Beds & Furniture', href: '/shop?category=beds' },
          { name: 'Health & Wellness', href: '/shop?category=health' },
        ]
      },
    ]
  },
  { 
    name: 'Services', 
    href: '/services',
    megaMenu: true,
    children: [
      { 
        name: '🐶 Dog Services',
        items: [
          { name: 'Dog Walking', href: '/services/dog-walking' },
          { name: 'Dog Daycare', href: '/services/dog-daycare' },
          { name: 'Dog Boarding', href: '/services/dog-boarding' },
          { name: 'Pet Sitting', href: '/services/pet-sitting' },
          { name: 'Dog Grooming', href: '/services/dog-grooming' },
          { name: 'Dog Training', href: '/services/dog-training' },
          { name: 'Pet Taxi', href: '/services/pet-taxi' },
        ]
      },
      { 
        name: '🐱 Cat Services',
        items: [
          { name: 'Drop-in Visits', href: '/services/cat-visits' },
          { name: 'Cat Boarding', href: '/services/cat-boarding' },
          { name: 'Cat Grooming', href: '/services/cat-grooming' },
        ]
      },
      { 
        name: '📞 Book Now',
        items: [
          { name: 'View All Services', href: '/services' },
          { name: 'Call: +91 98765 43210', href: 'tel:+919876543210' },
          { name: 'WhatsApp Us', href: 'https://wa.me/919876543210' },
        ]
      },
    ]
  },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const { getItemCount, openCart } = useCartStore()
  const { getItemCount: getWishlistCount, openWishlist } = useWishlistStore()
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu, isSearchOpen, toggleSearch } = useUIStore()

  const cartCount = getItemCount()
  const wishlistCount = getWishlistCount()
  const { isAuthenticated, currentUser } = useAuthStore()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Top Bar - Hidden on small mobile, compact on larger */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-1.5 sm:py-2 text-xs sm:text-sm">
        <div className="container-custom px-3 sm:px-4 flex items-center justify-center sm:justify-between">
          <div className="hidden sm:flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden md:inline">1800-123-PAWS</span>
            </span>
          </div>
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-medium flex items-center gap-1.5 sm:gap-2 text-center"
          >
            <Percent className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse flex-shrink-0" />
            <span className="truncate">Free Shipping Over ₹4,000!</span>
            <span className="hidden sm:inline">🐾</span>
          </motion.span>
          <div className="hidden sm:flex items-center gap-4">
            <Link href="/account" className="flex items-center gap-1 hover:underline">
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden md:inline">Account</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header 
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg py-1 sm:py-2' 
            : 'bg-white py-0'
        )}
      >
        <div className="container-custom px-2 sm:px-4">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20 gap-2">
            {/* Left: Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0 active:scale-90"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </motion.button>

            {/* Center: Logo */}
            <Link href="/" className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center"
              >
                <motion.span 
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-2xl sm:text-3xl"
                >
                  🐾
                </motion.span>
                <span className="font-heading font-bold text-xl sm:text-2xl md:text-3xl gradient-text">
                  BowPaw
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.megaMenu && setActiveMenu(item.name)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <Link href={item.href}>
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        'flex items-center gap-1 px-4 py-2 font-medium rounded-lg transition-all',
                        'hover:bg-primary-50 hover:text-primary-500',
                        item.highlight && 'bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600',
                        item.name === 'Sale' && 'animate-pulse'
                      )}
                    >
                      {item.name}
                      {item.megaMenu && (
                        <ChevronDown className={cn(
                          'w-4 h-4 transition-transform',
                          activeMenu === item.name && 'rotate-180'
                        )} />
                      )}
                    </motion.span>
                  </Link>

                  {/* Mega Menu */}
                  {item.megaMenu && item.children && (
                    <AnimatePresence>
                      {activeMenu === item.name && (
                        <MegaMenu categories={item.children} />
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions - Perfectly Aligned */}
            <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2 flex-shrink-0">
              {/* Search */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleSearch}
                className="p-2 sm:p-2.5 hover:bg-gray-100 rounded-full transition-colors relative group active:scale-90"
                aria-label="Search"
              >
                <Search className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-dark text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:block">
                  Search
                </span>
              </motion.button>

              {/* Account / Login - Hidden on very small screens */}
              <Link href={isAuthenticated ? '/account' : '/login'} className="hidden xs:block">
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="relative p-2 sm:p-2.5 hover:bg-gray-100 rounded-full transition-colors group active:scale-90"
                >
                  {isAuthenticated && currentUser ? (
                    <div className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-primary-500 text-white text-[10px] sm:text-xs font-bold flex items-center justify-center">
                      {currentUser.name.charAt(0)}
                    </div>
                  ) : (
                    <User className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  )}
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-dark text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:block">
                    {isAuthenticated ? 'Account' : 'Login'}
                  </span>
                </motion.div>
              </Link>

              {/* Wishlist */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={openWishlist}
                className="relative p-2 sm:p-2.5 hover:bg-gray-100 rounded-full transition-colors group active:scale-90"
                aria-label="Wishlist"
              >
                <Heart className={cn(
                  'w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-colors',
                  wishlistCount > 0 && 'fill-red-500 text-red-500'
                )} />
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white text-[10px] sm:text-xs 
                               font-bold rounded-full flex items-center justify-center"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-dark text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:block">
                  Wishlist
                </span>
              </motion.button>

              {/* Cart */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={openCart}
                className="relative p-2 sm:p-2.5 hover:bg-gray-100 rounded-full transition-colors group active:scale-90"
                aria-label="Cart"
              >
                <ShoppingCart className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 sm:w-5 sm:h-5 bg-primary-500 text-white text-[10px] sm:text-xs 
                               font-bold rounded-full flex items-center justify-center animate-bounce-slow"
                  >
                    {cartCount}
                  </motion.span>
                )}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-dark text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:block">
                  Cart
                </span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Search Dropdown */}
        <AnimatePresence>
          {isSearchOpen && <SearchDropdown />}
        </AnimatePresence>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={closeMobileMenu}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-white overflow-hidden shadow-2xl flex flex-col"
              style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
            >
              {/* Header - Fixed */}
              <div className="flex items-center justify-between p-4 border-b bg-white flex-shrink-0">
                <Link href="/" onClick={closeMobileMenu} className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl">🐾</span>
                  <span className="font-heading font-bold text-lg sm:text-xl gradient-text">BowPaw</span>
                </Link>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={closeMobileMenu}
                  className="p-2 hover:bg-gray-100 rounded-full active:scale-90"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4">
                  <nav className="space-y-1">
                    {navigation.map((item, index) => (
                      <MobileNavItem 
                        key={item.name}
                        item={item}
                        index={index}
                        closeMobileMenu={closeMobileMenu}
                      />
                    ))}
                  </nav>

                  <div className="mt-6 pt-4 border-t space-y-2">
                    <Link
                      href="/account"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 px-3 py-3 font-medium hover:bg-gray-100 rounded-xl active:scale-[0.98] transition-all"
                    >
                      <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-primary-500" />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-dark text-sm font-medium">My Account</span>
                        <span className="text-xs text-gray-400">Login / Register</span>
                      </div>
                    </Link>
                    <a
                      href="tel:1800123PAWS"
                      className="flex items-center gap-3 px-3 py-3 font-medium hover:bg-gray-100 rounded-xl active:scale-[0.98] transition-all"
                    >
                      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-green-500" />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-dark text-sm font-medium">Call Us</span>
                        <span className="text-xs text-gray-400">1800-123-PAWS</span>
                      </div>
                    </a>
                  </div>

                  {/* Quick Services */}
                  <div className="mt-6 p-3 sm:p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl">
                    <p className="text-xs sm:text-sm font-semibold text-dark mb-3">Quick Services</p>
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                      {[
                        { name: 'Walking', icon: '🐕', href: '/services/dog-walking' },
                        { name: 'Grooming', icon: '✨', href: '/services/dog-grooming' },
                        { name: 'Boarding', icon: '🏠', href: '/services/dog-boarding' },
                      ].map((service) => (
                        <Link
                          key={service.name}
                          href={service.href}
                          onClick={closeMobileMenu}
                          className="flex flex-col items-center gap-1 p-2 sm:p-3 bg-white rounded-xl hover:shadow-md transition-all active:scale-95"
                        >
                          <span className="text-xl sm:text-2xl">{service.icon}</span>
                          <span className="text-[10px] sm:text-xs font-medium text-gray-600">{service.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Safe Area Padding */}
              <div style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
