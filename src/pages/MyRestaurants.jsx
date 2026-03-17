import React from 'react'
import Wishlist from '../components/Wishlist'

const MyRestaurants = ({restaurants}) => {
  return (
      <div>
        <Wishlist restaurants={restaurants} />

      </div>
  )
}

export default MyRestaurants