import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { checkAuth } from './store/authActions'
// import Login from './components/Login'
import TopBar from './components/TopBar'
// material ui
import Box from '@mui/material/Box'
import Vehicles, { loader as vehicleLoader } from './components/Vehicles'
import Bookings from './components/Bookings'
import AgentBookingView from './components/AgentBookingView'
import BookingsOnVehicle from './components/BookingsOnVehicle'
import VehicleForm from './Form/VehicleForm'
import Login from './components/Login'
import Signup from './components/Signup'

const BASE_URL = process.env.REACT_APP_BASE_URL || ''

const App = () => {
  const dispatch = useDispatch()
  // fetching auth state
  const authState = useSelector((state) => state.auth)
  // checking authentication and setting user
  useEffect(() => {
    dispatch(checkAuth())
  }, [])

  return (
    <Box>
      <TopBar />
      <Routes>
        <Route
          path="/cars"
          element={<Vehicles role={authState?.user?.role} />}
        />
        {authState?.user?.role === 'CUSTOMER' && (
          <Route path="/bookings" element={<Bookings role="CUSTOMER" />} />
        )}
        {authState?.user?.role === 'AGENT' && (
          <Route path="/bookings" element={<AgentBookingView />} />
        )}
        {authState?.user?.role === 'AGENT' && (
          <Route path="/bookings/:vehicleId" element={<BookingsOnVehicle />} />
        )}
        {authState?.user?.role === 'AGENT' && (
          <Route path="/cars/add" element={<VehicleForm />} />
        )}
        <Route path="/login" element={<Login isLogin={true} />} />
        <Route path="/signup" element={<Login />} />
      </Routes>
    </Box>
  )
}

export default App
