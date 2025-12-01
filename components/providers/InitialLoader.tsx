'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function InitialLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // 5 seconds loading duration
    const duration = 5000
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
        }, 300)
      }
    }

    requestAnimationFrame(updateProgress)

    return () => {}
  }, [])

  // Ensure video plays
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  // Letters for animation
  const letters = ['b', 'o', 'w', 'p', 'a', 'w']

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="initial-loader"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              scale: 1.1,
              transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }
            }}
            className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Video Loader */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                transition: { duration: 0.5, ease: 'easeOut' }
              }}
              className="relative mb-8"
            >
              {/* Video Container */}
              <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 relative flex items-center justify-center">
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

              {/* Decorative elements around video */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 pointer-events-none"
              >
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-green-500 rounded-full"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${i * 45}deg) translateY(-100px) translateX(-50%)`,
                      opacity: 0.3 + (i * 0.08),
                    }}
                  />
                ))}
              </motion.div>
              
              {/* Floating paw prints around video */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: [0, -10, 0],
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: 'easeInOut',
                  }}
                  className="absolute"
                  style={{
                    top: `${20 + (i % 2) * 60}%`,
                    left: i < 2 ? '-25px' : 'auto',
                    right: i >= 2 ? '-25px' : 'auto',
                  }}
                >
                  <svg viewBox="0 0 60 60" className="w-6 h-6 text-green-400" fill="currentColor">
                    <ellipse cx="30" cy="38" rx="14" ry="12" />
                    <circle cx="18" cy="22" r="7" />
                    <circle cx="42" cy="22" r="7" />
                    <circle cx="12" cy="34" r="6" />
                    <circle cx="48" cy="34" r="6" />
                  </svg>
                </motion.div>
              ))}
            </motion.div>

            {/* Animated Brand Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.3, duration: 0.5 }
              }}
              className="flex items-center justify-center mb-6"
            >
              {letters.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30, rotateX: -90 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    rotateX: 0,
                    transition: {
                      delay: 0.5 + i * 0.1,
                      duration: 0.4,
                      ease: [0.215, 0.61, 0.355, 1],
                    }
                  }}
                  className={`font-heading font-bold text-4xl sm:text-5xl md:text-6xl inline-block ${
                    i < 3 ? 'text-gray-900' : 'text-green-500'
                  }`}
                  style={{ 
                    display: 'inline-block',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>

            {/* Loading text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                transition: { delay: 1, duration: 0.5 }
              }}
              className="text-gray-500 text-sm mb-6"
            >
              Loading your pet paradise...
            </motion.p>

            {/* Progress Bar */}
            <motion.div 
              initial={{ opacity: 0, width: 0 }}
              animate={{ 
                opacity: 1, 
                width: '200px',
                transition: { delay: 0.8, duration: 0.3 }
              }}
              className="relative h-2 bg-gray-100 rounded-full overflow-hidden"
            >
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 via-green-400 to-green-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
              {/* Shimmer effect */}
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />
            </motion.div>

            {/* Progress percentage */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                transition: { delay: 1, duration: 0.5 }
              }}
              className="text-green-500 font-bold text-lg mt-3"
            >
              {Math.round(progress)}%
            </motion.p>

            {/* Decorative paw prints */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 0.05, 
                    scale: 1,
                    transition: { delay: 0.3 + i * 0.15, duration: 0.5 }
                  }}
                  className="absolute"
                  style={{
                    left: `${10 + i * 12}%`,
                    top: `${15 + (i % 4) * 20}%`,
                    transform: `rotate(${-45 + i * 25}deg)`,
                  }}
                >
                  <svg viewBox="0 0 60 60" className="w-12 h-12 sm:w-16 sm:h-16 text-green-500" fill="currentColor">
                    <ellipse cx="30" cy="38" rx="14" ry="12" />
                    <circle cx="18" cy="22" r="7" />
                    <circle cx="42" cy="22" r="7" />
                    <circle cx="12" cy="34" r="6" />
                    <circle cx="48" cy="34" r="6" />
                  </svg>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </>
  )
}
