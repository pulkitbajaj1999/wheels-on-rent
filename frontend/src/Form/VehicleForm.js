import React, { useRef } from 'react'
import axios from 'axios'

import classes from './form.module.css'
import Box from '@mui/material/Box'
import { useParams } from 'react-router-dom'

// constants
const BASE_URL = process.env.REACT_APP_BASE_URL || ''

const VehicleForm = ({ data }) => {
  const params = useParams()
  const vehicleId = params?.vehicleId

  // initialize references
  const modelRef = useRef()
  const numberRef = useRef()
  const capacityRef = useRef()
  const rentRef = useRef()
  const imageRef = useRef()
  const detailsRef = useRef()

  const formSubmitHandler = (e) => {
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

    if (data && vehicleId) {
      url = BASE_URL + `/api/vehicles/${vehicleId}/edit`
      method = 'PUT'
    }

    // POST request to backend and then close the overlay and refresh the accounts
    axios({
      url: url,
      method: method,
      headers: {
        Authorization: token ? 'Bearer ' + token : undefined,
      },
      data: carFormData || undefined,
    })
  }

  return (
    <Box>
      <form className={classes.form} onSubmit={formSubmitHandler}>
        <div className={classes.input}>
          <label htmlFor="model">Model</label>
          <input
            id="model"
            type="text"
            ref={modelRef}
            defaultValue={data ? data.model : ''}
          />
        </div>
        <div className={classes.input}>
          <label htmlFor="number">Number</label>
          <input
            id="number"
            type="text"
            ref={numberRef}
            defaultValue={data ? data.number : ''}
          />
        </div>
        <div className={classes.input}>
          <label htmlFor="capacity">Capacity</label>
          <input
            id="capacity"
            type="number"
            ref={capacityRef}
            defaultValue={data ? data.capacity : ''}
          />
        </div>
        <div className={classes.input}>
          <label htmlFor="rent">Rent</label>
          <input
            id="rent"
            type="number"
            ref={rentRef}
            defaultValue={data ? data.rent : ''}
          />
        </div>
        <div className={classes.input}>
          <label htmlFor="details">details</label>
          <textarea
            id="details"
            type="textbox"
            ref={detailsRef}
            defaultValue={data ? data.details : ''}
          />
        </div>
        <div className={classes.input}>
          <label htmlFor="image">Image</label>
          <input id="image" type="file" ref={imageRef} />
        </div>
        <button type="submit">Save</button>
      </form>
    </Box>
  )
}

export default VehicleForm
