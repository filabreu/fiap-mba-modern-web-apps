import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import withAuthGuard from '../../hocs/withAuthGuard'
import getFavoriteProducts, { GetFavoriteProductsResponse } from '../../services/products/getFavoriteProducts'
import useQuery from '../../hooks/useQuery'
import Favorite from '../../components/Favorite'

const Home: NextPage = () => {
  const [currentPage, setCurrentPage] = useState<string>('1')
  const [totalPages, setTotalPages] = useState<number | undefined>()

  const [favoritesQuery, { data = {}, loading, error }] = useQuery(getFavoriteProducts)

  const { products } = data as GetFavoriteProductsResponse;

  useEffect(() => {
    favoritesQuery()
  }, [favoritesQuery])

  if (error) {
    return <></>
  }

  return (
    <>
      <Head>
        <title>Favoritos</title>
        <meta name="description" content="FIAP MBA - Produtos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h3 className="pt-12 text-3xl text-center font-bold">Favoritos</h3>
      {loading ? (
        <div className="mt-8 text-2xl text-center font-bold">
          Carregando...
        </div>
      ) : (
        <div className="px-8 grid grid-cols-4 gap-4 pt-8 justify-center">
          {products && products.map((product) => (
            <div
              key={`product_${product._id}`}
              className="p-4 flex flex-col justify-between border border-black rounded-lg"
            >
              <h3 className="text-xl font-weight-bold">
                <Link href={`/products/${product._id}`}>{product.name}</Link>
              </h3>
              <div className="mt-4">
                <p className="text-2xl text-center">$ {product.price}</p>
                <div className="flex align-center justify-between">
                  <Link href={`/products/${product._id}`}>detalhes</Link>
                  <span className="text-xl cursor-pointer">
                    <Favorite productID={product._id} favorited={true} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default withAuthGuard(Home)
