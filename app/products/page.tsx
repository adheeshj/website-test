'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Search,
  ArrowUpDown,
  Plus,
  ArrowLeft,
  Music,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import { CatalogProvider, useCatalog, type CatalogItem } from '@/components/catalog-provider'
import { AddProductModal } from '@/components/add-product-modal'
import { EnquiryModal } from '@/components/enquiry-modal'

const ALL_CATEGORIES = 'All'

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)
}

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name'

function ProductCard({
  item,
  onEnquire,
  onDelete,
}: {
  item: CatalogItem
  onEnquire: (item: CatalogItem) => void
  onDelete: (id: string) => void
}) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-gold/50 hover:shadow-lg hover:shadow-gold/5">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {!imgError ? (
          <Image
            src={item.image}
            alt={item.name}
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
        <span className="absolute top-3 left-3 rounded-full bg-background/80 backdrop-blur-sm px-3 py-1 text-xs font-medium text-gold border border-gold/20">
          {item.category}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation()
            if (confirm(`Delete "${item.name}"?`)) onDelete(item.id)
          }}
          className="absolute top-3 right-3 rounded-full bg-destructive/80 p-1.5 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive"
          aria-label="Delete product"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-lg font-semibold text-foreground">
          {item.name}
        </h3>
        <p className="mt-2 text-xl font-semibold text-gold">
          {formatPrice(item.price)}
        </p>
        <div className="mt-auto pt-5">
          <button
            onClick={() => onEnquire(item)}
            className="w-full rounded-full border border-gold/30 bg-transparent py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:bg-gold hover:text-background hover:border-gold"
          >
            Enquire
          </button>
        </div>
      </div>
    </div>
  )
}

function ProductsPageContent() {
  const { items, loading, deleteProduct } = useCatalog()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(ALL_CATEGORIES)
  const [sort, setSort] = useState<SortOption>('default')
  const [showFilters, setShowFilters] = useState(false)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [enquireItem, setEnquireItem] = useState<CatalogItem | null>(null)

  const categories = useMemo(() => {
    const cats = new Set(items.map((i) => i.category))
    return [ALL_CATEGORIES, ...Array.from(cats).sort()]
  }, [items])

  const filtered = useMemo(() => {
    let result = [...items]

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q),
      )
    }

    if (category !== ALL_CATEGORIES) {
      result = result.filter((i) => i.category === category)
    }

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    return result
  }, [items, search, category, sort])

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-gold"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="hidden sm:inline text-sm">Home</span>
              </Link>
              <div className="h-5 w-px bg-border" />
              <Link href="/" className="flex items-center gap-2">
                <Music className="h-6 w-6 text-gold" />
                <span className="font-serif text-lg font-semibold text-foreground">
                  Jyoti Music
                </span>
              </Link>
            </div>

            <button
              onClick={() => setAddModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-medium text-background transition-all hover:bg-gold/90"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Product</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero banner */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground">
            Our <span className="text-gold">Collection</span>
          </h1>
          <p className="mt-3 text-muted-foreground max-w-xl">
            Browse, search, and enquire about our full range of guitars, strings,
            and accessories.
          </p>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-border bg-card pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50"
              />
            </div>

            {/* Sort */}
            <div className="relative">
              <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="appearance-none rounded-xl border border-border bg-card pl-10 pr-8 py-2.5 text-sm text-foreground transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50"
              >
                <option value="default">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name A–Z</option>
              </select>
            </div>

            {/* Category filter toggle (mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm-none inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
          </div>

          {/* Category pills */}
          <div
            className={`mt-3 flex flex-wrap gap-2 sm:flex ${
              showFilters ? 'flex' : 'hidden sm:flex'
            }`}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  category === cat
                    ? 'bg-gold text-background'
                    : 'border border-border text-muted-foreground hover:border-gold/50 hover:text-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg text-muted-foreground">No products found</p>
            <p className="mt-2 text-sm text-muted-foreground/70">
              {items.length === 0
                ? 'Add your first product to get started.'
                : 'Try adjusting your search or filters.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                onEnquire={setEnquireItem}
                onDelete={deleteProduct}
              />
            ))}
          </div>
        )}

        {/* Results count */}
        {!loading && filtered.length > 0 && (
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Showing {filtered.length} of {items.length} products
          </p>
        )}
      </div>

      <AddProductModal open={addModalOpen} onClose={() => setAddModalOpen(false)} />
      <EnquiryModal
        product={
          enquireItem
            ? {
                id: enquireItem.id,
                name: enquireItem.name,
                category: enquireItem.category,
                price: enquireItem.price,
                image: enquireItem.image,
              }
            : null
        }
        onClose={() => setEnquireItem(null)}
      />
    </div>
  )
}

export default function ProductsPage() {
  return (
    <CatalogProvider>
      <ProductsPageContent />
    </CatalogProvider>
  )
}
