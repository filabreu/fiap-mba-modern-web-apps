import { post } from '../http'

export interface SetFavoriteQuery {
  productID: string
}

export interface SetFavoriteResponse {
  codeInfo: string
}

const setFavorite = async (
  {
    productID,
  }: SetFavoriteQuery
): Promise<SetFavoriteResponse> => (
  post(
    '/storeProducts/manageFavorite',
    { productID },
  ) as Promise<SetFavoriteResponse>
)

export default setFavorite
