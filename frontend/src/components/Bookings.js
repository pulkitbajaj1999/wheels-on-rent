import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import useFetch from '../hooks/use-fetch'
import CardView from './CardView/CardView'

const BASE_URL = process.env.REACT_APP_BASE_URL || ''

const Bookings = ({ role }) => {
  const { search } = useLocation()

  const url = BASE_URL + '/api/bookings/customer' + search
  const [isLoading, data, error] = useFetch({ url })

  return (
    <React.Fragment>
      {isLoading && <h1>IsLoading</h1>}
      {error && <h1>Erorr</h1>}
      <CardView
        cards={data && data.bookings ? data.bookings : []}
        cardType="booking"
        role={role}
      />
    </React.Fragment>
  )
}

export default Bookings
