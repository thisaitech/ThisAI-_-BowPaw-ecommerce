'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Parallax, Pagination, Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { heroSlides } from '@/lib/mockData'
import { cn } from '@/lib/utils'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/parallax'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)

  return (
    <section className="relative h-[60vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        modules={[Autoplay, EffectFade, Parallax, Pagination, Navigation]}
        effect="fade"
        speed={1000}
        parallax={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className}"></span>`
          },
        }}
        loop={true}
        className="h-full w-full"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            {({ isActive }) => (
              <div className="relative h-full w-full">
                {/* Background Image with Parallax */}
                <div 
                  className="absolute inset-0"
                  data-swiper-parallax="30%"
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    priority={index === 0}
                    className="object-cover"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/50 to-transparent" />
                </div>

                {/* Floating Decorative Elements */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isActive ? 0.1 : 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <span className="absolute top-[20%] right-[10%] text-[100px] md:text-[200px] animate-float">
                    🐾
                  </span>
                  <span className="absolute bottom-[30%] right-[30%] text-[60px] md:text-[100px] animate-float-slow">
                    🦴
                  </span>
                  <span className="absolute top-[40%] right-[50%] text-[40px] md:text-[80px] animate-float-fast">
                    🎾
                  </span>
                </motion.div>

                {/* Content */}
                <div className="container-custom h-full flex items-center">
                  <div 
                    className={cn(
                      'max-w-2xl',
                      slide.textPosition === 'center' && 'mx-auto text-center',
                      slide.textPosition === 'right' && 'ml-auto text-right'
                    )}
                  >
                    {/* Subtitle */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      data-swiper-parallax="-100"
                      className="text-secondary-400 font-semibold text-lg md:text-xl mb-4"
                    >
                      {slide.subtitle}
                    </motion.p>

                    {/* Title */}
                    <motion.h1
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 30 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      data-swiper-parallax="-200"
                      className="font-heading font-bold text-4xl md:text-5xl lg:text-7xl text-white mb-6"
                    >
                      {slide.title}
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 30 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      data-swiper-parallax="-300"
                      className="text-gray-300 text-lg md:text-xl mb-8 max-w-lg"
                    >
                      {slide.description}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 30 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      data-swiper-parallax="-400"
                      className={cn(
                        'flex flex-wrap gap-4',
                        slide.textPosition === 'center' && 'justify-center',
                        slide.textPosition === 'right' && 'justify-end'
                      )}
                    >
                      <Link href={slide.ctaLink}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="btn-primary text-lg px-8 py-4"
                        >
                          <span>{slide.ctaText}</span>
                        </motion.button>
                      </Link>
                      {slide.secondaryCtaText && (
                        <Link href={slide.secondaryCtaLink || '#'}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-secondary text-lg px-8 py-4 border-white text-white 
                                       hover:bg-white hover:text-dark"
                          >
                            {slide.secondaryCtaText}
                          </motion.button>
                        </Link>
                      )}
                    </motion.div>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14
                   bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center
                   text-white hover:bg-white hover:text-dark transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14
                   bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center
                   text-white hover:bg-white hover:text-dark transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-8 z-10 hidden md:block">
        <div className="flex items-center gap-2 text-white/80 font-mono">
          <span className="text-2xl font-bold">{String(activeIndex + 1).padStart(2, '0')}</span>
          <span className="text-lg">/</span>
          <span className="text-lg">{String(heroSlides.length).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center text-white/70"
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

