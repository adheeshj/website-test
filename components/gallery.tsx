'use client'

import Image from 'next/image'
import { useInView } from '@/hooks/use-in-view'

const galleryImages = [
  {
    src: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Acoustic guitar on display',
    span: 'sm:col-span-2 sm:row-span-2',
  },
  {
    src: 'https://images.pexels.com/photos/1650977/pexels-photo-1650977.jpeg?auto=compress&cs=tinysrgb&w=400',
    alt: 'Guitar close-up detail',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/1757702/pexels-photo-1757702.jpeg?auto=compress&cs=tinysrgb&w=400',
    alt: 'Electric guitar body',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/345727/pexels-photo-345727.jpeg?auto=compress&cs=tinysrgb&w=400',
    alt: 'Electric guitar headstock',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/3457624/pexels-photo-3457624.jpeg?auto=compress&cs=tinysrgb&w=400',
    alt: 'Acoustic guitar soundhole',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/2744956/pexels-photo-2744956.jpeg?auto=compress&cs=tinysrgb&w=400',
    alt: 'Guitar strings and accessories',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/249399/pexels-photo-249399.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Guitar performance',
    span: 'sm:col-span-2',
  },
  {
    src: 'https://images.pexels.com/photos/744318/pexels-photo-744318.jpeg?auto=compress&cs=tinysrgb&w=400',
    alt: 'Music store interior',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/109568/pexels-photo-109568.jpeg?auto=compress&cs=tinysrgb&w=400',
    alt: 'Musical instruments collection',
    span: '',
  },
]

export function Gallery() {
  const { ref, isVisible } = useInView()

  return (
    <section id="gallery" className="py-32 sm:py-40 bg-card">
      <div
        ref={ref}
        className={`mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-gold font-medium text-sm uppercase tracking-widest">
            Our Space
          </span>
          <h2 className="mt-6 font-serif text-4xl sm:text-5xl font-semibold text-foreground text-balance">
            Gallery
          </h2>
          <p className="mt-6 text-lg text-muted-foreground text-pretty leading-relaxed max-w-2xl mx-auto">
            Explore our store and collection through images.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 auto-rows-[180px] sm:auto-rows-[200px]">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-xl ${img.span}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
