import { get } from '../http'

import ProductDetails from '../../types/ProductDetails'

export interface GetProductQuery {
  productId: string
}

export interface GetProductResponse {
  product: ProductDetails
}

const getProduct = async ({ productId }: GetProductQuery): Promise<GetProductResponse> => (
  get(
    `/storeProducts/product/${productId}`,
  ) as Promise<GetProductResponse>
)

export default getProduct
