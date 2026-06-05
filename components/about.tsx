import { Guitar, Heart, Award } from 'lucide-react'

const features = [
  {
    icon: Guitar,
    title: 'Premium Selection',
    description:
      'Curated collection of acoustic and electric guitars from renowned brands worldwide.',
  },
  {
    icon: Heart,
    title: 'Passion for Music',
    description:
      'Founded by musicians, for musicians. We understand what makes an instrument sing.',
  },
  {
    icon: Award,
    title: 'Trusted Quality',
    description:
      'Rated 4.8★ by over 600 customers. Quality and service you can rely on.',
  },
]

export function About() {
  return (
    <section id="about" className="py-32 sm:py-40 bg-card">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-gold font-medium text-sm uppercase tracking-widest">
            Our Story
          </span>
          <h2 className="mt-6 font-serif text-4xl sm:text-5xl font-semibold text-foreground text-balance">
            A Legacy of Musical Excellence
          </h2>
          <p className="mt-8 text-lg text-muted-foreground text-pretty leading-relaxed">
            For decades, Jyoti Music has been the heart of Pune&apos;s music
            community. Nestled in the vibrant Camp area, we&apos;ve helped
            countless musicians find their perfect instrument—from first-time
            learners to seasoned professionals.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-border bg-background p-8 transition-all duration-300 hover:border-gold/50 hover:shadow-lg hover:shadow-gold/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-background">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-serif text-xl font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-24 grid grid-cols-2 gap-10 sm:grid-cols-4">
          {[
            { value: '25+', label: 'Years of Experience' },
            { value: '600+', label: 'Happy Customers' },
            { value: '500+', label: 'Products Available' },
            { value: '4.8★', label: 'Google Rating' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-4xl font-semibold text-gold">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
