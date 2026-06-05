'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, Send, Loader as Loader2 } from 'lucide-react'
import type { Product } from '@/data/products'

type FormState = {
  customer_name: string
  phone: string
  message: string
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

export function EnquiryModal({
  product,
  onClose,
}: {
  product: Product | null
  onClose: () => void
}) {
  const [form, setForm] = useState<FormState>({
    customer_name: '',
    phone: '',
    message: '',
  })
  const [status, setStatus] = useState<SubmitStatus>('idle')

  useEffect(() => {
    if (product) {
      setForm((prev) => ({
        ...prev,
        message: `I'm interested in ${product.name}`,
      }))
      setStatus('idle')
    }
  }, [product])

  const handleClose = useCallback(() => {
    if (status === 'submitting') return
    setStatus('idle')
    setForm({ customer_name: '', phone: '', message: '' })
    onClose()
  }, [status, onClose])

  // Close on Escape key
  useEffect(() => {
    if (!product) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [product, handleClose])

  // Lock body scroll when open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [product])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!product) return

    setStatus('submitting')

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
      const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

      const res = await fetch(`${supabaseUrl}/functions/v1/enquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${anonKey}`,
          apikey: anonKey,
        },
        body: JSON.stringify({
          customer_name: form.customer_name,
          phone: form.phone,
          product_id: product.id,
          product_name: product.name,
          message: form.message,
        }),
      })

      if (!res.ok) {
        throw new Error(`Request failed (${res.status})`)
      }

      const data = await res.json()
      if (data.error) {
        throw new Error(data.error)
      }

      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (!product) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Enquire about ${product.name}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <h3 className="font-serif text-xl font-semibold text-foreground pr-8">
          Enquire about
          <span className="block text-gold">{product.name}</span>
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          We will get back to you shortly.
        </p>

        {status === 'success' ? (
          <div className="mt-8 rounded-xl border border-gold/30 bg-gold/5 p-6 text-center">
            <p className="font-serif text-lg font-semibold text-foreground">
              Enquiry Sent!
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Thank you, {form.customer_name}. We will reach out to you soon.
            </p>
            <button
              onClick={handleClose}
              className="mt-5 rounded-full bg-gold px-6 py-2.5 text-sm font-medium text-background transition-all hover:bg-gold/90"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="enquiry-name"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Name
              </label>
              <input
                id="enquiry-name"
                type="text"
                required
                minLength={2}
                value={form.customer_name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, customer_name: e.target.value }))
                }
                placeholder="Your name"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="enquiry-phone"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Phone Number
              </label>
              <input
                id="enquiry-phone"
                type="tel"
                required
                minLength={10}
                value={form.phone}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, phone: e.target.value }))
                }
                placeholder="+91 98765 43210"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="enquiry-message"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Message
              </label>
              <textarea
                id="enquiry-message"
                required
                rows={3}
                value={form.message}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, message: e.target.value }))
                }
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50 resize-none"
              />
            </div>

            {/* Error message */}
            {status === 'error' && (
              <p className="text-sm text-destructive">
                Something went wrong. Please try again or call us directly.
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-background transition-all hover:bg-gold/90 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Enquiry
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
