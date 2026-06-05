import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Products | Jyoti Music',
  description: 'Browse our full collection of guitars, strings, and accessories.',
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
