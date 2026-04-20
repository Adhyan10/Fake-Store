import axios from 'axios'

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
})

export const productApi = {
  getProducts: async () => {
    const { data } = await api.get('/products')
    return data
  },
  getProductById: async (id) => {
    const { data } = await api.get(`/products/${id}`)
    return data
  },
  getCategories: async () => {
    const { data } = await api.get('/products/categories')
    return data
  },
}

export default api
