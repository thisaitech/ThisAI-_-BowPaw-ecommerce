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
      <div className="bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 py-12 md:py-20 relative overflow-hidden">
        {/* Floating Paw Prints */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
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
                delay: i * 0.5,
              }}
              className="absolute text-white"
              style={{ left: `${10 + i * 12}%`, bottom: '10%' }}
            >
              <PawPrint className="w-8 h-8 md:w-12 md:h-12" />
            </motion.div>
          ))}
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4"
            >
              <Sparkles className="w-4 h-4" />
              Pets + Products Sale 🔥
            </motion.span>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3">
              Shop Pets & Products
            </h1>
            <p className="text-white/90 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
              Healthy pets ready to join your family + Premium pet supplies
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-sm">
              <span className="px-3 py-1.5 bg-white/20 rounded-full">🐕 Dogs</span>
              <span className="px-3 py-1.5 bg-white/20 rounded-full">🐱 Cats</span>
              <span className="px-3 py-1.5 bg-white/20 rounded-full">🐰 Rabbits</span>
              <span className="px-3 py-1.5 bg-white/20 rounded-full">🐠 Fish</span>
              <span className="px-3 py-1.5 bg-white/20 rounded-full">🐦 Birds</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Pet Breeds Section */}
      <PetCategoriesSection showTitle={true} maxPetsPerCategory={10} />

      {/* Divider */}
      <div className="container-custom">
        <div className="border-t border-gray-200 my-8">
          <div className="flex items-center justify-center -mt-3">
            <span className="px-4 bg-light text-gray-500 text-sm">Pet Supplies & Accessories</span>
          </div>
        </div>
      </div>

      <div className="container-custom pb-8">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-lg border shadow-sm"
          >
            <SlidersHorizontal className="w-5 h-5" />
            Filters
          </button>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl focus:outline-none 
                         focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            />
          </div>

          {/* Sort & View */}
          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none px-4 py-2.5 pr-10 bg-white border rounded-xl 
                           focus:outline-none focus:border-primary-500 cursor-pointer"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* View Toggle */}
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
            {displayedProducts.length === 0 ? (
              <div className="text-center py-16">
                <span className="text-6xl mb-4 block">🔍</span>
                <h3 className="font-heading font-bold text-xl mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or search query</p>
                <button
                  onClick={clearFilters}
                  className="btn-primary"
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
                      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                      : 'space-y-4'
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
                    className="text-center mt-12"
                  >
                    <button
                      onClick={loadMore}
                      className="btn-secondary"
                    >
                      Load More Products ({filteredProducts.length - visibleCount} remaining)
                    </button>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-white z-50 md:hidden overflow-y-auto"
            >
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="font-heading font-bold text-lg">Filters</h3>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4">
                {/* Same filters as desktop */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Category</h4>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category)
                          setIsSidebarOpen(false)
                        }}
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

                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Pet Type</h4>
                  <div className="space-y-2">
                    {petTypes.map(type => (
                      <button
                        key={type}
                        onClick={() => {
                          setSelectedPetType(type)
                          setIsSidebarOpen(false)
                        }}
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

                <button
                  onClick={() => {
                    clearFilters()
                    setIsSidebarOpen(false)
                  }}
                  className="w-full btn-secondary"
                >
                  Clear Filters
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

