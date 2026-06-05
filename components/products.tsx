'use client'

import { useState } from 'react'
import Image from 'next/image'
import { products, type Product } from '@/data/products'
import { EnquiryModal } from '@/components/enquiry-modal'

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)
}

function ProductCard({
  product,
  onEnquire,
}: {
  product: Product
  onEnquire: (product: Product) => void
}) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-gold/50 hover:shadow-lg hover:shadow-gold/5">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {!imgError ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
            No image
          </div>
        )}
        {/* Category tag */}
        <span className="absolute top-3 left-3 rounded-full bg-background/80 backdrop-blur-sm px-3 py-1 text-xs font-medium text-gold border border-gold/20">
          {product.category}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-lg font-semibold text-foreground">
          {product.name}
        </h3>
        <p className="mt-2 text-xl font-semibold text-gold">
          {formatPrice(product.price)}
        </p>
        <div className="mt-auto pt-5">
          <button
            onClick={() => onEnquire(product)}
            className="w-full rounded-full border border-gold/30 bg-transparent py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:bg-gold hover:text-background hover:border-gold"
          >
            Enquire
          </button>
        </div>
      </div>
    </div>
  )
}

export function Products() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  return (
    <section id="products" className="py-32 sm:py-40">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-gold font-medium text-sm uppercase tracking-widest">
            Our Collection
          </span>
          <h2 className="mt-6 font-serif text-4xl sm:text-5xl font-semibold text-foreground text-balance">
            Featured Products
          </h2>
          <p className="mt-6 text-lg text-muted-foreground text-pretty leading-relaxed max-w-2xl mx-auto">
            Browse our curated selection of guitars, strings, and accessories.
            Enquire about any product and we will get back to you.
          </p>
        </div>

        {/* Product Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEnquire={setSelectedProduct}
            />
          ))}
        </div>
      </div>

      <EnquiryModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  )
}
