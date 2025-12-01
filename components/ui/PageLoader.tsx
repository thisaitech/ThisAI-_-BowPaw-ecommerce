'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PageLoaderProps {
  onLoadComplete?: () => void
}

export default function PageLoader({ onLoadComplete }: PageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsLoading(false)
            onLoadComplete?.()
          }, 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    return () => clearInterval(interval)
  }, [onLoadComplete])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center"
        >
          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            {/* Animated Paw */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-7xl md:text-8xl mb-6"
            >
              🐾
            </motion.div>

            {/* Brand Name */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-heading font-bold text-4xl md:text-5xl bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent"
            >
              BowPaw
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-500 mt-2 text-lg"
            >
              Love Your Pets More
            </motion.p>

            {/* Progress Bar */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 200, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-8 h-1 bg-gray-200 rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </motion.div>

            {/* Loading Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-gray-400 text-sm mt-4"
            >
              Loading... {Math.min(Math.round(progress), 100)}%
            </motion.p>
          </motion.div>

          {/* Floating Paws Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.span
                key={i}
                initial={{ 
                  x: `${Math.random() * 100}%`,
                  y: '110%',
                  opacity: 0.1,
                  rotate: Math.random() * 360
                }}
                animate={{ 
                  y: '-10%',
                  rotate: Math.random() * 360 + 360
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: 'linear'
                }}
                className="absolute text-4xl text-primary-200"
              >
                🐾
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Simple loading spinner for page transitions
export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="text-5xl"
      >
        🐾
      </motion.div>
    </div>
  )
}

