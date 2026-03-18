import { Routes, Route, NavLink } from "react-router-dom"
import Wishlist from '../components/Wishlist'
import Tried from '../components/Tried'

const MyRestaurants = ({restaurants}) => {
  return (
      <div>
        <Routes>
          <Route index element={<Wishlist restaurants={restaurants} />} />
          <Route path="wishlist" element={<Wishlist restaurants={restaurants} />} />
          <Route path="tried" element={<Tried />} />
        </Routes>
        

      </div>
  )
}

export default MyRestaurants