import Product from './Product'
import Store from './Store'

interface ProductDetails extends Product {
  stores: Store[]
  createdDate: string
  updatedDate: string
}

export default ProductDetails
