import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import useFetch from '../hooks/use-fetch'
import CardView from './CardView/CardView'
import LoadingSpinner from './UI/LoadingSpinner/Spinner'

const BASE_URL = process.env.REACT_APP_BASE_URL || ''

const Bookings = ({ role }) => {
  const { search } = useLocation()

  const url = BASE_URL + '/api/bookings/customer' + search
  const [isLoading, data, error] = useFetch({ url })

  return (
    <React.Fragment>
      {isLoading && (
        <center>
          <LoadingSpinner />
        </center>
      )}
      {error && <h1>{error}</h1>}
      <CardView
        cards={data && data.bookings ? data.bookings : []}
        cardType="booking"
        role={role}
      />
    </React.Fragment>
  )
}

export default Bookings
