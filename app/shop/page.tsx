'use client'

import { useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Grid, 
  List, 
  SlidersHorizontal, 
  X, 
  ChevronDown,
  Search,
  Sparkles,
  PawPrint
} from 'lucide-react'
import { products, collections } from '@/lib/mockData'
import ProductCard from '@/components/product/ProductCard'
import PetCategoriesSection from '@/components/pets/PetCategoriesSection'
import { cn } from '@/lib/utils'
import { Product } from '@/types'

const categories = ['All', 'Dog Food', 'Cat Food', 'Dog Toys', 'Cat Toys', 'Dog Beds', 'Health & Wellness', 'Grooming', 'Treats']
const petTypes = ['All', 'Dog', 'Cat', 'Bird', 'Fish', 'Small Pet']
const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Best Selling', value: 'bestseller' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest', value: 'newest' },
  { label: 'Rating', value: 'rating' },
]

function ShopContent() {
  const searchParams = useSearchParams()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(searchParams?.get('category') || 'All')
  const [selectedPetType, setSelectedPetType] = useState('All')
  const [sortBy, setSortBy] = useState('featured')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200])
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('search') || '')
  const [visibleCount, setVisibleCount] = useState(12)

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some(t => t.toLowerCase().includes(query))
      )
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory)
    }

    // Filter by pet type
    if (selectedPetType !== 'All') {
      const petTypeMap: Record<string, string> = {
        'Dog': 'dog',
        'Cat': 'cat',
        'Bird': 'bird',
        'Fish': 'fish',
        'Small Pet': 'small-pet',
      }
      const petType = petTypeMap[selectedPetType]
      result = result.filter(p => p.petType === petType || p.petType === 'all')
    }

    // Filter by price
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Filter by URL params
    const filter = searchParams?.get('filter')
    if (filter === 'bestseller') {
      result = result.filter(p => p.isBestSeller)
    } else if (filter === 'new') {
      result = result.filter(p => p.isNewArrival)
    } else if (filter === 'sale') {
      result = result.filter(p => p.isOnSale)
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'bestseller':
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0))
        break
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
    }

    return result
  }, [searchQuery, selectedCategory, selectedPetType, priceRange, sortBy, searchParams])

  const displayedProducts = filteredProducts.slice(0, visibleCount)
  const hasMore = visibleCount < filteredProducts.length

  const loadMore = () => {
    setVisibleCount(prev => prev + 12)
  }

  const clearFilters = () => {
    setSelectedCategory('All')
    setSelectedPetType('All')
    setPriceRange([0, 200])
    setSearchQuery('')
  }

  const hasActiveFilters = selectedCategory !== 'All' || selectedPetType !== 'All' || priceRange[0] !== 0 || priceRange[1] !== 200 || searchQuery

  return (
    <div className="min-h-screen bg-light">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 py-8 sm:py-12 md:py-20 relative overflow-hidden">
        {/* Floating Paw Prints - Fewer on mobile */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 100 }}
              animate={{ 
                opacity: [0.1, 0.3, 0.1],
                y: [-20, -150],
                rotate: [0, 360]
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: i * 0.8,
              }}
              className="absolute text-white hidden sm:block"
              style={{ left: `${10 + i * 25}%`, bottom: '10%' }}
            >
              <PawPrint className="w-8 h-8 md:w-12 md:h-12" />
            </motion.div>
          ))}
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4"
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Pets + Products Sale 🔥
            </motion.span>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-5xl lg:text-6xl mb-2 sm:mb-3">
              Shop Pets & Products
            </h1>
            <p className="text-white/90 text-sm sm:text-base md:text-xl max-w-2xl mx-auto px-4">
              Healthy pets ready to join your family + Premium pet supplies
            </p>
            {/* Pet Category Pills - Scrollable on mobile */}
            <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-4 mt-4 sm:mt-6 text-xs sm:text-sm overflow-x-auto pb-2 px-2 -mx-2 scrollbar-hide">
              <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white/20 rounded-full whitespace-nowrap flex-shrink-0">🐕 Dogs</span>
              <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white/20 rounded-full whitespace-nowrap flex-shrink-0">🐱 Cats</span>
              <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white/20 rounded-full whitespace-nowrap flex-shrink-0">🐰 Rabbits</span>
              <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white/20 rounded-full whitespace-nowrap flex-shrink-0">🐠 Fish</span>
              <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white/20 rounded-full whitespace-nowrap flex-shrink-0">🐦 Birds</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Pet Breeds Section */}
      <PetCategoriesSection showTitle={true} maxPetsPerCategory={10} />

      {/* Divider */}
      <div className="container-custom px-4 sm:px-6">
        <div className="border-t border-gray-200 my-4 sm:my-8">
          <div className="flex items-center justify-center -mt-3">
            <span className="px-4 bg-light text-gray-500 text-xs sm:text-sm">Pet Supplies & Accessories</span>
          </div>
        </div>
      </div>

      <div className="container-custom pb-8 px-4 sm:px-6">
        {/* Toolbar - Mobile Optimized */}
        <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8">
          {/* Search Bar - Full width on mobile */}
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 sm:pl-10 pr-4 py-3 sm:py-2.5 text-base bg-white border rounded-xl focus:outline-none 
                         focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            />
          </div>

          {/* Filter & Sort Row */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 bg-white rounded-xl border shadow-sm text-sm font-medium active:scale-95 transition-transform"
            >
              <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 bg-primary-500 rounded-full" />
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="relative flex-1 sm:flex-none">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none w-full sm:w-auto px-3 sm:px-4 py-2.5 pr-8 sm:pr-10 bg-white border rounded-xl 
                           focus:outline-none focus:border-primary-500 cursor-pointer text-sm"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* View Toggle - Hidden on mobile */}
            <div className="hidden md:flex items-center bg-white border rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'p-2.5 transition-colors',
                  viewMode === 'grid' ? 'bg-primary-500 text-white' : 'hover:bg-gray-100'
                )}
                aria-label="Grid view"
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'p-2.5 transition-colors',
                  viewMode === 'list' ? 'bg-primary-500 text-white' : 'hover:bg-gray-100'
                )}
                aria-label="List view"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Active Filters - Mobile Pills */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide md:hidden">
              {selectedCategory !== 'All' && (
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="flex items-center gap-1 px-2.5 py-1 bg-primary-100 text-primary-600 rounded-full text-xs font-medium whitespace-nowrap"
                >
                  {selectedCategory}
                  <X className="w-3 h-3" />
                </button>
              )}
              {selectedPetType !== 'All' && (
                <button
                  onClick={() => setSelectedPetType('All')}
                  className="flex items-center gap-1 px-2.5 py-1 bg-primary-100 text-primary-600 rounded-full text-xs font-medium whitespace-nowrap"
                >
                  {selectedPetType}
                  <X className="w-3 h-3" />
                </button>
              )}
              <button
                onClick={clearFilters}
                className="text-xs text-gray-500 hover:text-primary-500 whitespace-nowrap"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading font-bold text-lg">Filters</h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary-500 hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={cn(
                        'block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                        selectedCategory === category
                          ? 'bg-primary-100 text-primary-500 font-medium'
                          : 'hover:bg-gray-100'
                      )}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pet Type Filter */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Pet Type</h4>
                <div className="space-y-2">
                  {petTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => setSelectedPetType(type)}
                      className={cn(
                        'block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                        selectedPetType === type
                          ? 'bg-primary-100 text-primary-500 font-medium'
                          : 'hover:bg-gray-100'
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-semibold mb-3">Price Range</h4>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full accent-primary-500"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>$0</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Results Count - Mobile */}
            <p className="text-xs sm:text-sm text-gray-500 mb-4">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
            </p>

            {displayedProducts.length === 0 ? (
              <div className="text-center py-12 sm:py-16">
                <span className="text-5xl sm:text-6xl mb-4 block">🔍</span>
                <h3 className="font-heading font-bold text-lg sm:text-xl mb-2">No products found</h3>
                <p className="text-gray-500 text-sm sm:text-base mb-4">Try adjusting your filters or search query</p>
                <button
                  onClick={clearFilters}
                  className="btn-primary text-sm sm:text-base active:scale-95"
                >
                  <span>Clear Filters</span>
                </button>
              </div>
            ) : (
              <>
                <motion.div
                  layout
                  className={cn(
                    viewMode === 'grid'
                      ? 'grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6'
                      : 'space-y-3 sm:space-y-4'
                  )}
                >
                  <AnimatePresence mode="popLayout">
                    {displayedProducts.map((product, index) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        index={index}
                        variant={viewMode === 'list' ? 'horizontal' : 'default'}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>

                {/* Load More */}
                {hasMore && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center mt-8 sm:mt-12"
                  >
                    <button
                      onClick={loadMore}
                      className="btn-secondary text-sm sm:text-base py-3 px-6 active:scale-95"
                    >
                      Load More ({filteredProducts.length - visibleCount} remaining)
                    </button>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Sidebar - Bottom Sheet Style */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 bg-white z-[60] md:hidden rounded-t-3xl max-h-[85vh] overflow-hidden flex flex-col"
              style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
            >
              {/* Drag Handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
              </div>

              {/* Header */}
              <div className="px-4 py-3 border-b flex items-center justify-between sticky top-0 bg-white">
                <h3 className="font-heading font-bold text-lg">Filters</h3>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full active:scale-90"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-4 py-4">
                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-sm text-gray-700">Category</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={cn(
                          'px-3 py-2.5 rounded-xl text-sm transition-all active:scale-95 text-left',
                          selectedCategory === category
                            ? 'bg-primary-500 text-white font-medium shadow-md'
                            : 'bg-gray-100 hover:bg-gray-200'
                        )}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pet Type Filter */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-sm text-gray-700">Pet Type</h4>
                  <div className="flex flex-wrap gap-2">
                    {petTypes.map(type => (
                      <button
                        key={type}
                        onClick={() => setSelectedPetType(type)}
                        className={cn(
                          'px-4 py-2 rounded-full text-sm transition-all active:scale-95',
                          selectedPetType === type
                            ? 'bg-primary-500 text-white font-medium shadow-md'
                            : 'bg-gray-100 hover:bg-gray-200'
                        )}
                      >
                        {type === 'Dog' && '🐕 '}
                        {type === 'Cat' && '🐱 '}
                        {type === 'Bird' && '🐦 '}
                        {type === 'Fish' && '🐠 '}
                        {type === 'Small Pet' && '🐰 '}
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-sm text-gray-700">Price Range</h4>
                  <div className="px-2">
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full accent-primary-500 h-2"
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <span>₹0</span>
                      <span className="font-medium text-primary-500">Up to ₹{(priceRange[1] * 83).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="px-4 py-4 border-t bg-white flex gap-3">
                <button
                  onClick={() => {
                    clearFilters()
                  }}
                  className="flex-1 py-3 px-4 border-2 border-gray-200 rounded-xl font-medium text-gray-700 active:scale-95"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex-1 py-3 px-4 bg-primary-500 text-white rounded-xl font-medium active:scale-95"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-light flex items-center justify-center">Loading...</div>}>
      <ShopContent />
    </Suspense>
  )
}

