'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  CreditCard, 
  Truck, 
  Shield, 
  ChevronLeft,
  Check,
  Lock
} from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'
import { formatPrice, cn } from '@/lib/utils'

const paymentMethods = [
  { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
  { id: 'upi', name: 'UPI', icon: '📱' },
  { id: 'cod', name: 'Cash on Delivery', icon: '💵' },
]

export default function CheckoutPage() {
  const { items, getSubtotal, getTax, getShipping, getTotal } = useCartStore()
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const subtotal = getSubtotal()
  const tax = getTax()
  const shipping = getShipping()
  const total = getTotal()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsProcessing(false)
    setOrderComplete(true)
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-light py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center bg-white rounded-3xl p-8 shadow-lg"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Check className="w-12 h-12 text-secondary-500" />
            </motion.div>
            <h1 className="font-heading font-bold text-3xl mb-4">Order Confirmed! 🎉</h1>
            <p className="text-gray-600 mb-2">
              Thank you for your order! Your furry friend will love their new goodies.
            </p>
            <p className="text-gray-500 text-sm mb-8">
              Order #BP-{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
            <p className="text-gray-600 mb-8">
              A confirmation email has been sent to your email address with order details and tracking information.
            </p>
            <div className="space-y-3">
              <Link href="/shop">
                <button className="w-full btn-primary">
                  <span>Continue Shopping</span>
                </button>
              </Link>
              <Link href="/">
                <button className="w-full btn-secondary">
                  Back to Home
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-light py-16">
        <div className="container-custom">
          <div className="max-w-lg mx-auto text-center">
            <span className="text-6xl mb-4 block">🛒</span>
            <h1 className="font-heading font-bold text-2xl mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-6">Add some items to your cart before checkout.</p>
            <Link href="/shop" className="btn-primary">
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-light py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <Link href="/cart" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-500 mb-4">
            <ChevronLeft className="w-5 h-5" />
            Back to Cart
          </Link>
          <h1 className="font-heading font-bold text-3xl">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {['Shipping', 'Payment', 'Review'].map((label, index) => (
            <div key={label} className="flex items-center">
              <div className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center font-semibold',
                step > index + 1
                  ? 'bg-secondary-500 text-white'
                  : step === index + 1
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              )}>
                {step > index + 1 ? <Check className="w-5 h-5" /> : index + 1}
              </div>
              <span className={cn(
                'ml-2 font-medium hidden sm:block',
                step >= index + 1 ? 'text-dark' : 'text-gray-400'
              )}>
                {label}
              </span>
              {index < 2 && (
                <div className={cn(
                  'w-12 sm:w-24 h-0.5 mx-4',
                  step > index + 1 ? 'bg-secondary-500' : 'bg-gray-200'
                )} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Shipping */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-2xl p-6 shadow-sm"
                >
                  <h2 className="font-heading font-bold text-xl mb-6 flex items-center gap-2">
                    <Truck className="w-6 h-6 text-primary-500" />
                    Shipping Information
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name *</label>
                      <input
                        type="text"
                        required
                        className="input"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name *</label>
                      <input
                        type="text"
                        required
                        className="input"
                        placeholder="Doe"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        className="input"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Phone *</label>
                      <input
                        type="tel"
                        required
                        className="input"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Address *</label>
                      <input
                        type="text"
                        required
                        className="input"
                        placeholder="123 Main Street"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">City *</label>
                      <input
                        type="text"
                        required
                        className="input"
                        placeholder="Mumbai"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">State *</label>
                      <select className="input" required>
                        <option value="">Select State</option>
                        <option value="MH">Maharashtra</option>
                        <option value="DL">Delhi</option>
                        <option value="KA">Karnataka</option>
                        <option value="TN">Tamil Nadu</option>
                        <option value="TG">Telangana</option>
                        <option value="GJ">Gujarat</option>
                        <option value="RJ">Rajasthan</option>
                        <option value="UP">Uttar Pradesh</option>
                        <option value="WB">West Bengal</option>
                        <option value="KL">Kerala</option>
                        <option value="PB">Punjab</option>
                        <option value="HR">Haryana</option>
                        <option value="MP">Madhya Pradesh</option>
                        <option value="AP">Andhra Pradesh</option>
                        <option value="OR">Odisha</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">PIN Code *</label>
                      <input
                        type="text"
                        required
                        className="input"
                        placeholder="400001"
                        maxLength={6}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Country *</label>
                      <select className="input" required>
                        <option value="IN">India</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full btn-primary mt-6"
                  >
                    <span>Continue to Payment</span>
                  </button>
                </motion.div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-2xl p-6 shadow-sm"
                >
                  <h2 className="font-heading font-bold text-xl mb-6 flex items-center gap-2">
                    <CreditCard className="w-6 h-6 text-primary-500" />
                    Payment Method
                  </h2>

                  {/* Payment Method Selection */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        className={cn(
                          'p-4 rounded-xl border-2 text-center transition-all',
                          paymentMethod === method.id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        )}
                      >
                        <span className="text-2xl block mb-1">{method.icon}</span>
                        <span className="text-sm font-medium">{method.name}</span>
                      </button>
                    ))}
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Card Number *</label>
                        <input
                          type="text"
                          required
                          className="input"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Expiry Date *</label>
                          <input
                            type="text"
                            required
                            className="input"
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">CVV *</label>
                          <input
                            type="text"
                            required
                            className="input"
                            placeholder="123"
                            maxLength={4}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Name on Card *</label>
                        <input
                          type="text"
                          required
                          className="input"
                          placeholder="Rahul Sharma"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'upi' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">UPI ID *</label>
                        <input
                          type="text"
                          required
                          className="input"
                          placeholder="yourname@upi or 9876543210@paytm"
                        />
                      </div>
                      <p className="text-sm text-gray-500">
                        Supported: GPay, PhonePe, Paytm, BHIM and all UPI apps
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'cod' && (
                    <div className="bg-accent-50 rounded-xl p-4">
                      <p className="text-sm text-gray-700">
                        💵 <strong>Cash on Delivery</strong> - Pay when your order arrives!
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Additional ₹49 COD charges applicable. Available for orders up to ₹25,000.
                      </p>
                    </div>
                  )}

                  <div className="flex gap-4 mt-6">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="btn-secondary flex-1"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="btn-primary flex-1"
                    >
                      <span>Review Order</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-2xl p-6 shadow-sm"
                >
                  <h2 className="font-heading font-bold text-xl mb-6 flex items-center gap-2">
                    <Shield className="w-6 h-6 text-primary-500" />
                    Review Your Order
                  </h2>

                  {/* Order Items */}
                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={`${item.product.id}-${item.variant?.id}`} className="flex gap-4">
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.product.name}</p>
                          {item.variant && (
                            <p className="text-sm text-gray-500">{item.variant.name}</p>
                          )}
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold">
                          {formatPrice((item.variant?.price || item.product.price) * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax</span>
                      <span>{formatPrice(tax)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span>Total</span>
                      <span className="text-primary-500">{formatPrice(total)}</span>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="btn-secondary flex-1"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="btn-primary flex-1 disabled:opacity-50"
                    >
                      <span className="flex items-center justify-center gap-2">
                        {isProcessing ? (
                          <>
                            <span className="animate-spin">🐾</span>
                            Processing...
                          </>
                        ) : (
                          <>
                            <Lock className="w-5 h-5" />
                            Place Order
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="font-heading font-bold text-xl mb-6">Order Summary</h2>

              {/* Items Preview */}
              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.variant?.id}`} className="flex gap-3">
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white 
                                       text-xs rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.product.name}</p>
                      <p className="text-xs text-gray-500">{item.variant?.name}</p>
                    </div>
                    <p className="text-sm font-semibold">
                      {formatPrice((item.variant?.price || item.product.price) * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className={shipping === 0 ? 'text-secondary-500' : ''}>
                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span className="text-primary-500">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Shield className="w-4 h-4 text-secondary-500" />
                  <span>Secure 256-bit SSL encryption</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Lock className="w-4 h-4 text-secondary-500" />
                  <span>Your payment info is protected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

