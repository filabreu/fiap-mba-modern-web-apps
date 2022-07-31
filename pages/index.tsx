import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import withAuthGuard from '../hocs/withAuthGuard'
import getProducts, { GetProductsResponse } from '../services/products/getProducts'
import useQuery from '../hooks/useQuery'
import Favorite from '../components/Favorite'

const Home: NextPage = () => {
  const [currentPage, setCurrentPage] = useState<string>('1')
  const [totalPages, setTotalPages] = useState<number | undefined>()

  const [productsQuery, { data = {}, loading, error }] = useQuery(getProducts)

  const { products, totalItems } = data as GetProductsResponse;

  useEffect(() => {
    productsQuery({ page: currentPage, perPage: '4' })
  }, [productsQuery, currentPage])

  useEffect(() => {
    if (totalItems) {
      setTotalPages(totalItems / 4)
    }
  }, [totalItems])

  if (error) {
    return <></>
  }

  return (
    <>
      <Head>
        <title>Produtos</title>
        <meta name="description" content="FIAP MBA - Produtos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h3 className="pt-12 text-3xl text-center font-bold">Produtos</h3>
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
              <h3 className="text-xl font-weight-bold">{product.name}</h3>
              <div className="mt-4">
                <p className="text-2xl text-center">$ {product.price}</p>
                <div className="flex align-center justify-between">
                  <Link href={`/products/${product._id}`}>detalhes</Link>
                  <span className="text-xl cursor-pointer">
                    <Favorite productID={product._id} favorited={product.favorite} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-8 text-center">
        {totalPages && Array.from({ length: totalPages }).map((_, page) => (
          <span
            className={`mx-4 text-xl cursor-pointer ${currentPage === (page + 1).toString() && 'font-bold'}`}
            key={`pagination_${page + 1}`}
            onClick={() => setCurrentPage((page + 1).toString())}
          >
            {page + 1}
          </span>
        ))}
      </div>
    </>
  )
}

export default withAuthGuard(Home)
