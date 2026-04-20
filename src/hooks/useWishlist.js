import { useCart } from './useCart'

export const useWishlist = () => {
  const { wishlistItems, toggleWishlist, isInWishlist } = useCart()

  return {
    wishlistItems,
    toggleWishlist,
    isInWishlist,
  }
}
