'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  User, Package, Heart, LogOut, ShoppingBag,
  MapPin, Phone, Mail, Edit2, ChevronRight,
  Clock, Truck, CheckCircle, XCircle
} from 'lucide-react'
import { useAuthStore, Order } from '@/store/useAuthStore'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'

export default function AccountPage() {
  const router = useRouter()
  const { currentUser, isAuthenticated, logout, getMyOrders } = useAuthStore()
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('orders')

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  if (!currentUser) {
    return null
  }

  const orders = getMyOrders()

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'confirmed': return 'bg-blue-100 text-blue-700'
      case 'processing': return 'bg-purple-100 text-purple-700'
      case 'shipped': return 'bg-indigo-100 text-indigo-700'
      case 'delivered': return 'bg-green-100 text-green-700'
      case 'cancelled': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />
      case 'shipped': return <Truck className="w-4 h-4" />
      case 'delivered': return <CheckCircle className="w-4 h-4" />
      case 'cancelled': return <XCircle className="w-4 h-4" />
      default: return <Package className="w-4 h-4" />
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden sticky top-24">
              {/* User Info */}
              <div className="p-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold mb-4">
                  {currentUser.name.charAt(0)}
                </div>
                <h2 className="font-heading font-bold text-xl">{currentUser.name}</h2>
                <p className="text-white/80 text-sm">{currentUser.email}</p>
                <span className="inline-block mt-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                  {currentUser.role}
                </span>
              </div>

              {/* Navigation */}
              <nav className="p-4 space-y-1">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    activeTab === 'orders' ? 'bg-primary-50 text-primary-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <Package className="w-5 h-5" />
                  <span className="font-medium">My Orders</span>
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    activeTab === 'profile' ? 'bg-primary-50 text-primary-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">Profile</span>
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </button>
                <Link
                  href="/wishlist"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <Heart className="w-5 h-5" />
                  <span className="font-medium">Wishlist</span>
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </nav>

              {/* Admin Link for admin/owner */}
              {(currentUser.role === 'admin' || currentUser.role === 'owner') && (
                <div className="p-4 border-t">
                  <Link
                    href="/admin/dashboard"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-dark text-white rounded-xl hover:bg-gray-800 transition-colors"
                  >
                    <span className="font-medium">Admin Dashboard</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="font-heading font-bold text-2xl mb-6">My Orders</h1>

                {orders.length === 0 ? (
                  <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                    <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="font-heading font-semibold text-xl text-gray-900 mb-2">
                      No orders yet
                    </h2>
                    <p className="text-gray-500 mb-6">
                      Start shopping to see your orders here!
                    </p>
                    <Link
                      href="/shop"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
                    >
                      Shop Now
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order, i) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white rounded-2xl shadow-sm overflow-hidden"
                      >
                        {/* Order Header */}
                        <div className="p-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4 bg-gray-50">
                          <div>
                            <p className="font-medium text-primary-500">{order.id}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                              {getStatusIcon(order.status)}
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="p-4 space-y-4">
                          {order.items.map((item, j) => (
                            <div key={j} className="flex items-center gap-4">
                              <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden relative flex-shrink-0">
                                <Image
                                  src={item.productImage}
                                  alt={item.productName}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 truncate">{item.productName}</p>
                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                              </div>
                              <p className="font-medium text-gray-900">
                                {formatPrice(item.price * item.quantity)}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Order Footer */}
                        <div className="p-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                          <div className="text-sm text-gray-500">
                            <span className="font-medium text-gray-700">{order.paymentMethod}</span>
                            {' · '}
                            <span className={order.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'}>
                              {order.paymentStatus}
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Total</p>
                            <p className="font-bold text-lg text-primary-500">{formatPrice(order.total)}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="font-heading font-bold text-2xl mb-6">My Profile</h1>

                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center text-3xl font-bold text-primary-600">
                        {currentUser.name.charAt(0)}
                      </div>
                      <div>
                        <h2 className="font-heading font-bold text-xl">{currentUser.name}</h2>
                        <p className="text-gray-500">{currentUser.role}</p>
                      </div>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-primary-500 transition-colors">
                      <Edit2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{currentUser.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{currentUser.phone || 'Not added'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium">Not added</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

