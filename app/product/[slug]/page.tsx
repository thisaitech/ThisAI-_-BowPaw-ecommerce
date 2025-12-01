import { products } from '@/lib/mockData'
import ProductDetailClient from '@/components/product/ProductDetailClient'

// Generate static params for all products
export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

interface PageProps {
  params: { slug: string }
}

export default function ProductPage({ params }: PageProps) {
  return <ProductDetailClient slug={params.slug} />
}
