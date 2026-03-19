import { Routes, Route, NavLink } from "react-router-dom"
import Wishlist from '../components/Wishlist'
import Tried from '../components/Tried'

const MyRestaurants = () => {
  return (
      <div>
        <Routes>
          <Route index element={<Wishlist />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="tried" element={<Tried />} />
        </Routes>
        

      </div>
  )
}

export default MyRestaurants