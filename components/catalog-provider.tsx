'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'

export interface CatalogItem {
  id: string
  name: string
  category: string
  price: number
  image: string
}

interface CatalogContextValue {
  items: CatalogItem[]
  loading: boolean
  addProduct: (product: Omit<CatalogItem, 'id'>) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
  refresh: () => void
}

const CatalogContext = createContext<CatalogContextValue | null>(null)

export function useCatalog() {
  const ctx = useContext(CatalogContext)
  if (!ctx) throw new Error('useCatalog must be used within CatalogProvider')
  return ctx
}

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CatalogItem[]>([])
  const [loading, setLoading] = useState(true)

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  const fetchItems = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(
        `${supabaseUrl}/functions/v1/catalog`,
        {
          headers: {
            Authorization: `Bearer ${anonKey}`,
            apikey: anonKey,
          },
        },
      )
      if (res.ok) {
        const data = await res.json()
        setItems(data)
      }
    } catch {
      // Silently fail — UI shows empty state
    } finally {
      setLoading(false)
    }
  }, [supabaseUrl, anonKey])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  const addProduct = useCallback(
    async (product: Omit<CatalogItem, 'id'>) => {
      const res = await fetch(
        `${supabaseUrl}/functions/v1/catalog?action=add`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${anonKey}`,
            apikey: anonKey,
          },
          body: JSON.stringify(product),
        },
      )
      if (!res.ok) throw new Error('Failed to add product')
      const newItem = await res.json()
      setItems((prev) => [newItem[0], ...prev])
    },
    [supabaseUrl, anonKey],
  )

  const deleteProduct = useCallback(
    async (id: string) => {
      const res = await fetch(
        `${supabaseUrl}/functions/v1/catalog?id=${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${anonKey}`,
            apikey: anonKey,
          },
        },
      )
      if (!res.ok) throw new Error('Failed to delete product')
      setItems((prev) => prev.filter((item) => item.id !== id))
    },
    [supabaseUrl, anonKey],
  )

  return (
    <CatalogContext.Provider
      value={{ items, loading, addProduct, deleteProduct, refresh: fetchItems }}
    >
      {children}
    </CatalogContext.Provider>
  )
}
