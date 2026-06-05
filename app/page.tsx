import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Products } from '@/components/products'
import { Footer } from '@/components/footer'

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Products />
        {/* Gallery section placeholder */}
        <section id="gallery" className="py-32 sm:py-40 bg-card">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 text-center">
            <span className="text-gold font-medium text-sm uppercase tracking-widest">
              Our Space
            </span>
            <h2 className="mt-6 font-serif text-4xl sm:text-5xl font-semibold text-foreground">
              Gallery
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Coming soon – explore our store and collection through images.
            </p>
          </div>
        </section>
        {/* Reviews section placeholder */}
        <section id="reviews" className="py-32 sm:py-40">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 text-center">
            <span className="text-gold font-medium text-sm uppercase tracking-widest">
              Testimonials
            </span>
            <h2 className="mt-6 font-serif text-4xl sm:text-5xl font-semibold text-foreground">
              What Our Customers Say
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Coming soon – read reviews from our valued customers.
            </p>
          </div>
        </section>
        {/* Contact section placeholder */}
        <section id="contact" className="py-32 sm:py-40 bg-card">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 text-center">
            <span className="text-gold font-medium text-sm uppercase tracking-widest">
              Get in Touch
            </span>
            <h2 className="mt-6 font-serif text-4xl sm:text-5xl font-semibold text-foreground">
              Visit Our Store
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Drop by our store or reach out to us directly.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+917775060603"
                className="inline-flex items-center gap-2 bg-gold text-background hover:bg-gold/90 font-medium text-base px-8 py-4 rounded-full transition-all duration-300"
              >
                Call Us
              </a>
              <a
                href="mailto:contact@jyotimusic.com"
                className="inline-flex items-center gap-2 border border-gold/30 text-foreground hover:bg-gold/10 hover:border-gold font-medium text-base px-8 py-4 rounded-full transition-all duration-300"
              >
                Email Us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
