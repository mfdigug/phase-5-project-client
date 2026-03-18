import { Routes, Route } from "react-router-dom"
import Invited from '../components/Invited'
import CreatedEvents from '../components/CreatedEvents'

const MyEvents = () => {
  return (
    <div>
      <h2>MyEvents</h2>

        <Routes>
          <Route index element={<CreatedEvents />} />
          <Route path="created_events" element={<CreatedEvents />} />
          <Route path="invited" element={<Invited />} />

        </Routes>



    </div>
  )
}

export default MyEvents






