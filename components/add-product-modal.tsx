'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, Loader as Loader2 } from 'lucide-react'
import { useCatalog } from '@/components/catalog-provider'

type FormState = {
  name: string
  category: string
  price: string
  image: string
}

export function AddProductModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const { addProduct } = useCatalog()
  const [form, setForm] = useState<FormState>({
    name: '',
    category: '',
    price: '',
    image: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle')

  useEffect(() => {
    if (open) {
      setForm({ name: '', category: '', price: '', image: '' })
      setStatus('idle')
    }
  }, [open])

  const handleClose = useCallback(() => {
    if (status === 'submitting') return
    onClose()
  }, [status, onClose])

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, handleClose])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    try {
      await addProduct({
        name: form.name,
        category: form.category,
        price: Number(form.price),
        image: form.image,
      })
      onClose()
    } catch {
      setStatus('error')
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Add new product"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <h3 className="font-serif text-xl font-semibold text-foreground pr-8">
          Add New Product
        </h3>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="add-name" className="block text-sm font-medium text-foreground mb-1.5">
              Product Name
            </label>
            <input
              id="add-name"
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Yamaha F310"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50"
            />
          </div>

          <div>
            <label htmlFor="add-category" className="block text-sm font-medium text-foreground mb-1.5">
              Category
            </label>
            <select
              id="add-category"
              required
              value={form.category}
              onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50"
            >
              <option value="">Select category</option>
              <option value="Acoustic Guitar">Acoustic Guitar</option>
              <option value="Electric Guitar">Electric Guitar</option>
              <option value="Bass Guitar">Bass Guitar</option>
              <option value="Ukulele">Ukulele</option>
              <option value="Strings">Strings</option>
              <option value="Accessories">Accessories</option>
              <option value="Amplifiers">Amplifiers</option>
              <option value="Effects Pedals">Effects Pedals</option>
            </select>
          </div>

          <div>
            <label htmlFor="add-price" className="block text-sm font-medium text-foreground mb-1.5">
              Price (INR)
            </label>
            <input
              id="add-price"
              type="number"
              required
              min={1}
              value={form.price}
              onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
              placeholder="8990"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50"
            />
          </div>

          <div>
            <label htmlFor="add-image" className="block text-sm font-medium text-foreground mb-1.5">
              Image URL
            </label>
            <input
              id="add-image"
              type="url"
              required
              value={form.image}
              onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))}
              placeholder="https://images.pexels.com/..."
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50"
            />
          </div>

          {status === 'error' && (
            <p className="text-sm text-destructive">
              Failed to add product. Please try again.
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-background transition-all hover:bg-gold/90 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              'Add Product'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
