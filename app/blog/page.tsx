'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { blogPosts } from '@/lib/mockData'
import { formatDate } from '@/lib/utils'

export default function BlogPage() {
  const featuredPost = blogPosts[0]
  const otherPosts = blogPosts.slice(1)

  return (
    <div className="min-h-screen bg-light">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 py-16">
        <div className="container-custom text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">Pet Care Blog</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Expert advice, tips, and guides to help you take the best care of your furry friends
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-12">
        {/* Featured Post */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <Link href={`/blog/${featuredPost.slug}`} className="group">
            <div className="grid md:grid-cols-2 gap-8 bg-white rounded-3xl overflow-hidden shadow-lg">
              <div className="relative aspect-[4/3] md:aspect-auto">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Featured
                </span>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="text-primary-500 font-semibold mb-2">{featuredPost.category}</span>
                <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4 group-hover:text-primary-500 transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(featuredPost.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredPost.readTime} min read
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Image
                    src={featuredPost.authorImage}
                    alt={featuredPost.author}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span className="font-medium">{featuredPost.author}</span>
                </div>
              </div>
            </div>
          </Link>
        </motion.article>

        {/* Other Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-primary-500">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(post.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime} min
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-lg mb-3 group-hover:text-primary-500 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Image
                          src={post.authorImage}
                          alt={post.author}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <span className="text-sm font-medium">{post.author}</span>
                      </div>
                      <span className="text-primary-500 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}

