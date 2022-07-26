import { get } from '../http'

import Product from '../../types/Product'

export interface GetProductsQuery {
  page: number
  perPage: number
  orderBy?: string
  orderDirection?: string
  search?: string
}

export interface GetProductsResponse {
  totalItems: number
  page: string
  perPage: string
  products: Product[]
}

const getProducts = async (
  {
    page,
    perPage = 5,
    orderBy,
    orderDirection,
    search
  }: GetProductsQuery
): Promise<GetProductsResponse> => (
  get(
    '/storeProducts',
    { page, perPage, orderBy, orderDirection, search },
  ) as Promise<GetProductsResponse>
)

export default getProducts
