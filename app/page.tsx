import HeroSlider from '@/components/home/HeroSlider'
import TrustBadges from '@/components/home/TrustBadges'
import FeaturedCollections from '@/components/home/FeaturedCollections'
import PetShowcase from '@/components/home/PetShowcase'
import BestSellers from '@/components/home/BestSellers'
import PromoBanner from '@/components/home/PromoBanner'
import NewArrivals from '@/components/home/NewArrivals'
import StatsCounter from '@/components/home/StatsCounter'
import Testimonials from '@/components/home/Testimonials'
import BlogPreview from '@/components/home/BlogPreview'
import InstagramGallery from '@/components/home/InstagramGallery'

export default function HomePage() {
  return (
    <>
      {/* Hero Section with Full-width Slider */}
      <HeroSlider />
      
      {/* Trust Badges */}
      <TrustBadges />
      
      {/* Pet Showcase - Popular Pets for Adoption */}
      <PetShowcase />
      
      {/* Featured Collections with Coverflow Effect */}
      <FeaturedCollections />
      
      {/* Best Sellers Carousel */}
      <BestSellers />
      
      {/* Promotional Banner with Parallax */}
      <PromoBanner />
      
      {/* New Arrivals Grid */}
      <NewArrivals />
      
      {/* Stats Counter with Animation */}
      <StatsCounter />
      
      {/* Customer Testimonials */}
      <Testimonials />
      
      {/* Blog Preview */}
      <BlogPreview />
      
      {/* Instagram Gallery */}
      <InstagramGallery />
    </>
  )
}

