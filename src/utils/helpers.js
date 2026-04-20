export const priceRanges = [
  { label: 'All Prices', value: 'all' },
  { label: '0 - 100', value: '0-100' },
  { label: '100 - 500', value: '100-500' },
  { label: '500 - 1000', value: '500-1000' },
  { label: '1000+', value: '1000+' },
]

export const formatCurrency = (amount) => `$${amount.toFixed(2)}`

export const matchPriceRange = (price, range) => {
  if (range === 'all') return true
  if (range === '0-100') return price >= 0 && price <= 100
  if (range === '100-500') return price > 100 && price <= 500
  if (range === '500-1000') return price > 500 && price <= 1000
  if (range === '1000+') return price > 1000
  return true
}

export const sortProducts = (products, sortBy) => {
  const copy = [...products]

  if (sortBy === 'price-asc') return copy.sort((a, b) => a.price - b.price)
  if (sortBy === 'price-desc') return copy.sort((a, b) => b.price - a.price)
  if (sortBy === 'rating')
    return copy.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
  if (sortBy === 'newest') return copy.sort((a, b) => b.id - a.id)

  return copy
}
