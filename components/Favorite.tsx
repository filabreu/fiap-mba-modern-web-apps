import { useState } from 'react'

import useQuery from '../hooks/useQuery'
import setFavorite from '../services/products/setFavorite'

interface FavoriteProps {
  productID: string
  favorited: boolean
}

const Favorite = ({ productID, favorited }: FavoriteProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(favorited)

  const [setFavoriteQuery, { loading }] = useQuery(setFavorite)

  const handleClick = () => {
    if (!loading) {
      setFavoriteQuery({ productID })
        .then((res) => {
          setIsFavorite(!isFavorite)
        })
    }
  }

  return (
    <span className="text-xl cursor-pointer" onClick={handleClick}>
      {loading ? '⏳' : (
        isFavorite ? '❤️' : '🤍'
      )}
    </span>
  )
}

export default Favorite
