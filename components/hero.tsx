'use client'

import { Phone, Star, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useInView } from '@/hooks/use-in-view'

export function Hero() {
  const { ref, isVisible } = useInView(0.05)

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Subtle gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div
        ref={ref}
        className={`relative z-10 mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-5 py-2.5 mb-12">
          <Star className="h-4 w-4 fill-gold text-gold" />
          <span className="text-sm font-medium text-gold tracking-wide">
            4.8 ★ Rated by 607+ Customers
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-foreground tracking-tight text-balance leading-[1.1]">
          Your Music
          <br />
          <span className="text-gold">Starts Here</span>
        </h1>

        {/* Subheading */}
        <p className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto text-pretty leading-relaxed">
          Premium guitars, strings, and accessories at Camp, Pune.
          <br className="hidden sm:block" />
          Where passion meets craftsmanship.
        </p>

        {/* Single CTA Button */}
        <div className="mt-12">
          <Button
            asChild
            size="lg"
            className="bg-gold text-background hover:bg-gold/90 font-medium text-base px-10 py-6 h-auto rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
          >
            <a href="tel:+917775060603" className="flex items-center gap-3">
              <Phone className="h-5 w-5" />
              Call Us Now
            </a>
          </Button>
        </div>

        {/* Store Address */}
        <div className="mt-20 text-sm text-muted-foreground/70 tracking-wide">
          <p>Shop 12, Raheja Midas Complex, 325/14, MG Road</p>
          <p className="mt-1">Camp, Pune – 411001</p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#about"
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-gold/50 hover:text-gold transition-colors"
      >
        <ChevronDown className="h-8 w-8 animate-bounce" />
      </a>
    </section>
  )
}
