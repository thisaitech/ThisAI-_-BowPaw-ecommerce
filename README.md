# BowPaw - Premium Pet E-Commerce Website

A modern, high-converting pet e-commerce website built with Next.js 14, featuring stunning parallax effects, smooth animations, and a delightful shopping experience.

![BowPaw](https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200)

## 🐾 Features

### Core Functionality
- **Full E-Commerce Experience**: Browse products, add to cart, wishlist, and checkout
- **50+ Pet Products**: Comprehensive mock data with detailed product information
- **Responsive Design**: Mobile-first approach with fluid typography and layouts
- **State Management**: Zustand for cart and wishlist with localStorage persistence

### Visual & Interactive Features
- **Parallax Effects**: Multiple parallax implementations throughout the site
- **Smooth Animations**: Framer Motion powered animations and transitions
- **Advanced Carousels**: Swiper.js with coverflow, cube, and fade effects
- **Dynamic Content**: Auto-playing sliders, testimonials, and galleries

### Pages
- **Homepage**: Hero slider, featured collections, best sellers, new arrivals, testimonials, stats counter, blog preview, Instagram gallery
- **Shop Page**: Advanced filtering, grid/list views, infinite scroll, search
- **Product Detail**: Image gallery, variants, quantity selector, reviews, related products
- **Cart Page**: Full cart management, promo codes, gift wrap, upsells
- **Checkout**: Multi-step checkout flow with order confirmation

### Components
- **Header**: Sticky mega menu, search dropdown, cart/wishlist badges
- **Footer**: Multi-column layout, newsletter signup, social links
- **Product Card**: Hover effects, quick view, wishlist toggle
- **Cart Sidebar**: Slide-in cart with real-time updates
- **Modals**: Quick view, wishlist, newsletter popup

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Carousel**: Swiper.js
- **Icons**: Lucide React
- **Parallax**: react-scroll-parallax

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
cd bowpaw-ecommerce
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── shop/
│   │   └── page.tsx          # Shop/Collection page
│   ├── product/
│   │   └── [slug]/
│   │       └── page.tsx      # Product detail page
│   ├── cart/
│   │   └── page.tsx          # Cart page
│   ├── checkout/
│   │   └── page.tsx          # Checkout page
│   └── blog/
│       └── page.tsx          # Blog page
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── MegaMenu.tsx
│   │   └── SearchDropdown.tsx
│   ├── home/
│   │   ├── HeroSlider.tsx
│   │   ├── FeaturedCollections.tsx
│   │   ├── BestSellers.tsx
│   │   ├── NewArrivals.tsx
│   │   ├── Testimonials.tsx
│   │   ├── StatsCounter.tsx
│   │   ├── InstagramGallery.tsx
│   │   ├── PromoBanner.tsx
│   │   ├── BlogPreview.tsx
│   │   └── TrustBadges.tsx
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   └── QuickViewModal.tsx
│   ├── cart/
│   │   └── CartSidebar.tsx
│   ├── wishlist/
│   │   └── WishlistModal.tsx
│   ├── ui/
│   │   ├── ParallaxSection.tsx
│   │   ├── NewsletterPopup.tsx
│   │   ├── RecentPurchasePopup.tsx
│   │   └── PageTransition.tsx
│   └── providers/
│       └── ParallaxProvider.tsx
├── store/
│   ├── useCartStore.ts
│   ├── useWishlistStore.ts
│   └── useUIStore.ts
├── lib/
│   ├── mockData.ts           # 50+ products data
│   └── utils.ts              # Utility functions
├── types/
│   └── index.ts              # TypeScript types
└── tailwind.config.ts        # Tailwind configuration
```

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Blue | `#3B82F6` | Main brand color, buttons, links |
| Secondary Green | `#10B981` | Success states, secondary actions |
| Accent Orange | `#F59E0B` | Highlights, badges, ratings |
| Dark | `#1F2937` | Text, dark backgrounds |
| Light | `#F3F4F6` | Page backgrounds, borders |

## 🔧 Configuration

### Tailwind CSS
Custom configuration includes:
- Extended color palette
- Custom animations (float, wiggle, heartbeat, etc.)
- Custom shadows with glow effects
- Fluid typography utilities
- Paw print background patterns

### Fonts
- **Headings**: Poppins (Google Fonts)
- **Body**: Inter (Google Fonts)

## 📱 Responsive Breakpoints

| Breakpoint | Width |
|------------|-------|
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |
| 2xl | 1536px |

## 🛒 Promo Codes

Test the checkout with these promo codes:
- `PAWFIRST25` - 15% off first order
- `SAVE15` - 15% discount

## 🔒 Security Features

- Form validation on all inputs
- Secure checkout simulation
- Protected routes ready for auth integration

## 📈 Performance Optimizations

- Next.js Image optimization
- Lazy loading for images and components
- Code splitting with dynamic imports
- Reduced motion support for accessibility

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is for demonstration purposes only. All product images are from Unsplash.

---

Made with 🐾 and ❤️ for pet lovers everywhere

