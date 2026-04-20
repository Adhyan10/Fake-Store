import { useEffect, useState } from 'react'
import { productApi } from '../services/api'

export const useProducts = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchData = async () => {
    try {
      setLoading(true)
      setError('')
      const [productsData, categoriesData] = await Promise.all([
        productApi.getProducts(),
        productApi.getCategories(),
      ])
      setProducts(productsData)
      setCategories(categoriesData)
    } catch {
      setError('Failed to load products. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData()
  }, [])

  return {
    products,
    categories,
    loading,
    error,
    refetch: fetchData,
  }
}
