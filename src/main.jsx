import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { RestaurantProvider } from './context/RestaurantContext'
// import { EventProvider } from './context/EventContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      {/* <EventProvider> */}
        <RestaurantProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </RestaurantProvider>
      {/* </EventProvider> */}
    </AuthProvider>
  </StrictMode>,
)
