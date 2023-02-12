import React, { useEffect } from 'react'
import useFetch from '../hooks/use-fetch'
import CardView from './CardView/CardView'
// import ListView from './ListView/ListView'

const BASE_URL = process.env.REACT_APP_BASE_URL || ''

const Vehicles = ({ role }) => {
  const url = BASE_URL + '/api/vehicles'
  const [isLoading, data, error] = useFetch({ url })

  console.log('data', data)
  return (
    <React.Fragment>
      {isLoading && <h1>IsLoading</h1>}
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
