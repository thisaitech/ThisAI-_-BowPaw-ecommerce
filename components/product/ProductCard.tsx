'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react'
import { Product } from '@/types'
import { useCartStore } from '@/store/useCartStore'
import { useWishlistStore } from '@/store/useWishlistStore'
import { useUIStore } from '@/store/useUIStore'
import { formatPrice, calculateDiscount, cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  index?: number
  variant?: 'default' | 'compact' | 'horizontal'
}

export default function ProductCard({ product, index = 0, variant = 'default' }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { addItem, isInCart } = useCartStore()
  const { toggleItem, isInWishlist } = useWishlistStore()
  const { openQuickView } = useUIStore()

  const inCart = isInCart(product.id)
  const inWishlist = isInWishlist(product.id)
  const discount = product.compareAtPrice 
    ? calculateDiscount(product.price, product.compareAtPrice) 
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleItem(product)
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    openQuickView(product.id)
  }

  if (variant === 'horizontal') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        className="card card-hover flex gap-4 p-4"
      >
        <Link href={`/product/${product.slug}`} className="relative w-32 h-32 flex-shrink-0">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
          {discount > 0 && (
            <span className="absolute top-2 left-2 badge badge-sale">
              -{discount}%
            </span>
          )}
        </Link>
        <div className="flex-1 min-w-0">
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-heading font-semibold text-dark hover:text-primary-500 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-gray-500 mt-1">{product.category}</p>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'w-4 h-4',
                  i < Math.floor(product.rating)
                    ? 'fill-accent-500 text-accent-500'
                    : 'text-gray-300'
                )}
              />
            ))}
            <span className="text-sm text-gray-500 ml-1">({product.reviewCount})</span>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-primary-500">{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className="btn-primary py-2 px-4 text-sm"
            >
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group perspective"
    >
      <div className="card overflow-hidden shadow-parallax tilt-3d">
        {/* Image Container */}
        <Link href={`/product/${product.slug}`} className="block relative aspect-square overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className={cn(
              'object-cover transition-transform duration-500',
              isHovered && 'scale-110'
            )}
          />
          
          {/* Second Image on Hover */}
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={product.name}
              fill
              className={cn(
                'object-cover absolute inset-0 transition-opacity duration-500',
                isHovered ? 'opacity-100' : 'opacity-0'
              )}
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {discount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="badge badge-sale"
              >
                -{discount}%
              </motion.span>
            )}
            {product.isNewArrival && (
              <span className="badge badge-new">New</span>
            )}
            {product.isBestSeller && (
              <span className="badge badge-bestseller">Best Seller</span>
            )}
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute top-3 right-3 flex flex-col gap-2"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleToggleWishlist}
              className={cn(
                'w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center transition-colors',
                inWishlist ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
              )}
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={cn('w-5 h-5', inWishlist && 'fill-current')} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleQuickView}
              className="w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center 
                         text-gray-600 hover:text-primary-500 transition-colors"
              aria-label="Quick view"
            >
              <Eye className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Add to Cart Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            className="absolute bottom-3 left-3 right-3"
          >
            <button
              onClick={handleAddToCart}
              className={cn(
                'w-full py-2.5 rounded-xl font-semibold text-sm transition-all',
                'flex items-center justify-center gap-2',
                inCart
                  ? 'bg-secondary-500 text-white'
                  : 'bg-white text-dark hover:bg-primary-500 hover:text-white'
              )}
            >
              <ShoppingCart className="w-4 h-4" />
              {inCart ? 'In Cart' : 'Add to Cart'}
            </button>
          </motion.div>
        </Link>

        {/* Product Info */}
        <div className="p-4">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
            {product.brand}
          </p>
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-heading font-semibold text-dark hover:text-primary-500 
                           transition-colors line-clamp-2 min-h-[2.5rem]">
              {product.name}
            </h3>
          </Link>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'w-4 h-4',
                  i < Math.floor(product.rating)
                    ? 'fill-accent-500 text-accent-500'
                    : 'text-gray-300'
                )}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mt-3">
            <span className="font-bold text-lg text-primary-500">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

