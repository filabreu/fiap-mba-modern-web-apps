import { get } from '../http'

import ProductDetails from '../../types/ProductDetails'

export interface GetFavoriteProductsResponse {
  products: ProductDetails[]
}

const getFavoriteProducts = async (): Promise<GetFavoriteProductsResponse> => (
  get(
    '/storeProducts/getFavProducts',
  ) as Promise<GetFavoriteProductsResponse>
)

export default getFavoriteProducts
