import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import useFetch from '../hooks/use-fetch'
import LoadingSpinner from './UI/LoadingSpinner/Spinner'
import CardView from './CardView/CardView'

const BASE_URL = process.env.REACT_APP_BASE_URL || ''

const Vehicles = ({ role }) => {
  const { search } = useLocation()
  const url = BASE_URL + '/api/vehicles' + search
  const [isLoading, data, error] = useFetch({ url })

  return (
    <React.Fragment>
      {isLoading && (
        <center>
          <LoadingSpinner />
        </center>
      )}
      {error && <h1>Erorr</h1>}
      <CardView
        cards={data && data.vehicles ? data.vehicles : []}
        cardType="vehicle"
        role={role}
      />
    </React.Fragment>
  )
}

export default Vehicles
