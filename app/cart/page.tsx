'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowLeft,
  Gift,
  Tag,
  Truck,
  Check
} from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'
import { products } from '@/lib/mockData'
import { formatPrice } from '@/lib/utils'
import ProductCard from '@/components/product/ProductCard'

import 'swiper/css'
import 'swiper/css/navigation'

export default function CartPage() {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    clearCart,
    getSubtotal,
    getTax,
    getShipping,
    getTotal,
    getItemCount,
  } = useCartStore()

  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError, setPromoError] = useState('')
  const [giftWrap, setGiftWrap] = useState(false)

  const subtotal = getSubtotal()
  const tax = getTax()
  const shipping = getShipping()
  const giftWrapFee = giftWrap ? 4.99 : 0
  const discount = promoApplied ? subtotal * 0.15 : 0
  const total = subtotal + tax + shipping + giftWrapFee - discount
  const itemCount = getItemCount()
  const freeShippingThreshold = 50 // Converts to ₹4,150 in INR
  const amountToFreeShipping = freeShippingThreshold - subtotal

  // Upsell products
  const upsellProducts = products
    .filter(p => !items.some(item => item.product.id === p.id))
    .slice(0, 8)

  const handlePromoCode = () => {
    if (promoCode.toUpperCase() === 'PAWFIRST25' || promoCode.toUpperCase() === 'SAVE15') {
      setPromoApplied(true)
      setPromoError('')
    } else {
      setPromoError('Invalid promo code')
      setPromoApplied(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-light py-16">
        <div className="container-custom">
          <div className="max-w-lg mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10 }}
              className="text-8xl mb-6"
            >
              🛒
            </motion.div>
            <h1 className="font-heading font-bold text-3xl mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven&apos;t added any items to your cart yet. 
              Start shopping to find the perfect products for your furry friend!
            </p>
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg"
              >
                <span>Start Shopping</span>
              </motion.button>
            </Link>
          </div>

          {/* Popular Products */}
          <div className="mt-16">
            <h2 className="section-title text-center mb-8">Popular Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.filter(p => p.isBestSeller).slice(0, 4).map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-light py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading font-bold text-3xl md:text-4xl">Shopping Cart</h1>
            <p className="text-gray-600 mt-1">{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
          </div>
          <Link href="/shop" className="flex items-center gap-2 text-primary-500 hover:underline">
            <ArrowLeft className="w-5 h-5" />
            Continue Shopping
          </Link>
        </div>

        {/* Free Shipping Progress */}
        {subtotal < freeShippingThreshold && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-4 mb-8"
          >
            <div className="flex items-center gap-3">
              <Truck className="w-6 h-6 text-primary-500" />
              <div className="flex-1">
                <p className="font-medium">
                  Add <span className="text-primary-500 font-bold">{formatPrice(amountToFreeShipping)}</span> more 
                  to get <span className="text-secondary-500 font-bold">FREE shipping!</span>
                </p>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(subtotal / freeShippingThreshold) * 100}%` }}
                    className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
        {subtotal >= freeShippingThreshold && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-secondary-50 rounded-2xl p-4 mb-8 flex items-center gap-3"
          >
            <Check className="w-6 h-6 text-secondary-500" />
            <p className="font-medium text-secondary-700">
              🎉 Congratulations! You&apos;ve unlocked FREE shipping!
            </p>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={`${item.product.id}-${item.variant?.id || 'default'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl p-4 md:p-6 shadow-sm"
                >
                  <div className="flex gap-4 md:gap-6">
                    {/* Product Image */}
                    <Link href={`/product/${item.product.slug}`}>
                      <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-4">
                        <div>
                          <Link href={`/product/${item.product.slug}`}>
                            <h3 className="font-semibold text-lg hover:text-primary-500 transition-colors line-clamp-2">
                              {item.product.name}
                            </h3>
                          </Link>
                          {item.variant && (
                            <p className="text-gray-500 text-sm mt-1">{item.variant.name}</p>
                          )}
                          <p className="text-gray-500 text-sm">Brand: {item.product.brand}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id, item.variant?.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 
                                     rounded-lg transition-colors h-fit"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center border-2 border-gray-200 rounded-xl">
                          <button
                            onClick={() => updateQuantity(
                              item.product.id, 
                              item.quantity - 1,
                              item.variant?.id
                            )}
                            className="p-2 hover:bg-gray-100 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(
                              item.product.id, 
                              item.quantity + 1,
                              item.variant?.id
                            )}
                            className="p-2 hover:bg-gray-100 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="font-bold text-lg text-primary-500">
                            {formatPrice((item.variant?.price || item.product.price) * item.quantity)}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-sm text-gray-500">
                              {formatPrice(item.variant?.price || item.product.price)} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Clear Cart */}
            <div className="flex justify-end">
              <button
                onClick={clearCart}
                className="text-sm text-red-500 hover:underline"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="font-heading font-bold text-xl mb-6">Order Summary</h2>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Promo Code</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl
                                 focus:outline-none focus:border-primary-500"
                    />
                  </div>
                  <button
                    onClick={handlePromoCode}
                    className="px-4 py-2.5 bg-dark text-white rounded-xl font-medium
                               hover:bg-gray-800 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-sm text-secondary-500 mt-2 flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    15% discount applied!
                  </p>
                )}
                {promoError && (
                  <p className="text-sm text-red-500 mt-2">{promoError}</p>
                )}
              </div>

              {/* Gift Wrap */}
              <label className="flex items-center gap-3 p-4 bg-accent-50 rounded-xl cursor-pointer mb-6">
                <input
                  type="checkbox"
                  checked={giftWrap}
                  onChange={(e) => setGiftWrap(e.target.checked)}
                  className="w-5 h-5 rounded border-accent-300 text-accent-500"
                />
                <Gift className="w-5 h-5 text-accent-500" />
                <div className="flex-1">
                  <span className="font-medium text-sm">Add gift wrap</span>
                  <span className="text-sm text-gray-500 ml-2">+$4.99</span>
                </div>
              </label>

              {/* Summary */}
              <div className="space-y-3 text-sm border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-secondary-500">
                    <span>Discount (15%)</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className={shipping === 0 ? 'text-secondary-500 font-semibold' : 'font-semibold'}>
                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="font-semibold">{formatPrice(tax)}</span>
                </div>
                {giftWrap && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gift Wrap</span>
                    <span className="font-semibold">{formatPrice(giftWrapFee)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-3 border-t text-lg">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-primary-500">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link href="/checkout" className="block mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary py-4 text-lg"
                >
                  <span className="flex items-center justify-center gap-2">
                    <ShoppingBag className="w-5 h-5" />
                    Proceed to Checkout
                  </span>
                </motion.button>
              </Link>

              <p className="text-xs text-center text-gray-500 mt-4">
                🔒 Secure checkout powered by Stripe
              </p>
            </div>
          </div>
        </div>

        {/* Upsell Products */}
        <div className="mt-16">
          <h2 className="section-title mb-8">You Might Also Like</h2>
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            navigation
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              0: { slidesPerView: 1.2 },
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {upsellProducts.map((product, index) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

