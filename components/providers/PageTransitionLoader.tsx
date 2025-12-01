'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageTransitionLoader() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const isFirstLoad = useRef(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Skip the very first load (initial loader handles that)
    if (isFirstLoad.current) {
      isFirstLoad.current = false
      return
    }

    // Show loader on route change
    setIsLoading(true)
    setProgress(0)

    // Play video
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {})
    }

    const duration = 1500 // 1.5 seconds for page transitions
    const startTime = Date.now()

    const updateProgress = () => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / duration) * 100, 100)
      setProgress(newProgress)

      if (newProgress < 100) {
        requestAnimationFrame(updateProgress)
      } else {
        setTimeout(() => {
          setIsLoading(false)
        }, 200)
      }
    }

    requestAnimationFrame(updateProgress)
  }, [pathname, searchParams])

  // Letters for animation
  const letters = ['b', 'o', 'w', 'p', 'a', 'w']

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.3, ease: 'easeOut' }
          }}
          className="fixed inset-0 z-[9998] bg-white flex flex-col items-center justify-center"
        >
          {/* Progress bar at top */}
          <div className="fixed top-0 left-0 right-0 h-1.5 bg-gray-100 z-10">
            <motion.div
              className="h-full bg-gradient-to-r from-green-500 via-green-400 to-green-500"
              style={{ width: `${progress}%` }}
            />
            {/* Shimmer */}
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
            />
          </div>

          {/* Video Loader */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              transition: { duration: 0.3 }
            }}
            className="relative mb-6"
          >
            {/* Video Container */}
            <div className="w-36 h-36 sm:w-40 sm:h-40 relative flex items-center justify-center">
              <video
                ref={videoRef}
                src="/videos/dog-loader-final.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Rotating dots around video */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 pointer-events-none"
            >
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-green-500 rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${i * 60}deg) translateY(-65px) translateX(-50%)`,
                    opacity: 0.4 + (i * 0.1),
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Brand Name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="flex items-center"
          >
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.1 + i * 0.05 }
                }}
                className={`font-heading font-bold text-2xl sm:text-3xl ${
                  i < 3 ? 'text-gray-900' : 'text-green-500'
                }`}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>

          {/* Loading dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-1.5 mt-4"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  y: [-3, 3, -3],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
                className="w-2 h-2 bg-green-500 rounded-full"
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
