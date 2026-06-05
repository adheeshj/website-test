'use client'

import { type ReactNode } from 'react'
import { useInView } from '@/hooks/use-in-view'

export function AnimateSection({ children }: { children: ReactNode }) {
  const { ref, isVisible } = useInView()

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {children}
    </div>
  )
}
