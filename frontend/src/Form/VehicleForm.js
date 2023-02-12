import React, { useRef } from 'react'
import axios from 'axios'

import classes from './form.module.css'
import Box from '@mui/material/Box'
import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '../hooks/use-fetch'
import LoadingSpinner from '../components/UI/LoadingSpinner/Spinner'

// constants
const BASE_URL = process.env.REACT_APP_BASE_URL || ''

const VehicleForm = () => {
  const navigate = useNavigate()
  const params = useParams()
  const vehicleId = params?.vehicleId

  const url = vehicleId ? BASE_URL + `/api/vehicles/${vehicleId}` : null
  const [isLoading, data, error] = useFetch({ url })
  const vehicle = data?.vehicle

  // initialize references
  const modelRef = useRef()
  const numberRef = useRef()
  const capacityRef = useRef()
  const rentRef = useRef()
  const imageRef = useRef()
  const detailsRef = useRef()

  const formSubmitHandler = async (e) => {
    e.preventDefault()
    const carFormData = new FormData()

    carFormData.append('model', modelRef.current.value)
    carFormData.append('number', numberRef.current.value)
    carFormData.append('capacity', capacityRef.current.value)
    carFormData.append('rent', rentRef.current.value)
    carFormData.append('details', detailsRef.current.value)
    carFormData.append('image', imageRef.current.files[0])

    const token = localStorage.getItem('token')
    let url = BASE_URL + '/api/vehicles/add'
    let method = 'POST'

    if (vehicleId) {
      url = BASE_URL + `/api/vehicles/${vehicleId}/edit`
      method = 'PUT'
    }

    // POST request to backend and then close the overlay and refresh the accounts
    await axios({
      url: url,
      method: method,
      headers: {
        Authorization: token ? 'Bearer ' + token : undefined,
      },
      data: carFormData || undefined,
    })
    navigate('/cars')
  }

  return (
    <React.Fragment>
      {isLoading && (
        <center>
          <LoadingSpinner />
        </center>
      )}
      <Box>
        <form className={classes.form} onSubmit={formSubmitHandler}>
          <div className={classes.input}>
            <label htmlFor="model">Model</label>
            <input
              id="model"
              type="text"
              ref={modelRef}
              defaultValue={vehicle ? vehicle.model : ''}
            />
          </div>
          <div className={classes.input}>
            <label htmlFor="number">Number</label>
            <input
              id="number"
              type="text"
              ref={numberRef}
              defaultValue={vehicle ? vehicle.number : ''}
            />
          </div>
          <div className={classes.input}>
            <label htmlFor="capacity">Capacity</label>
            <input
              id="capacity"
              type="number"
              ref={capacityRef}
              defaultValue={vehicle ? vehicle.capacity : ''}
            />
          </div>
          <div className={classes.input}>
            <label htmlFor="rent">Rent</label>
            <input
              id="rent"
              type="number"
              ref={rentRef}
              defaultValue={vehicle ? vehicle.rent : ''}
            />
          </div>
          <div className={classes.input}>
            <label htmlFor="details">details</label>
            <textarea
              id="details"
              type="textbox"
              ref={detailsRef}
              defaultValue={vehicle ? vehicle.details : ''}
            />
          </div>
          <div className={classes.input}>
            <label htmlFor="image">Image</label>
            <input id="image" type="file" ref={imageRef} />
          </div>
          <button type="submit">Save</button>
        </form>
      </Box>
    </React.Fragment>
  )
}

export default VehicleForm
