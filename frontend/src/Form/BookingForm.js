import React, { useState, useRef } from 'react'
import axios from 'axios'

import classes from './form.module.css'
import Box from '@mui/material/Box'
import { useNavigate, useParams } from 'react-router-dom'
import usePostData from '../hooks/use-post-data'
import useFetch from '../hooks/use-fetch'
import LoadingSpinner from '../components/UI/LoadingSpinner/Spinner'

// constants
const BASE_URL = process.env.REACT_APP_BASE_URL || ''

const BookingForm = () => {
  const params = useParams()
  const navigate = useNavigate()
  const bookingId = params?.bookingId

  const [postData, { data: reponseData, loading, error: postError }] =
    usePostData()

  const fetchUrl = BASE_URL + `/api/bookings/${bookingId}`
  const [isLoading, bookingData, error] = useFetch({ url: fetchUrl })

  const vehicle = bookingData?.booking?.vehicle
  // initialize references
  const dateRef = useRef()
  const daysRef = useRef()

  const formSubmitHandler = async (e) => {
    e.preventDefault()
    const bookingFormData = new FormData()

    if (!vehicle) return
    bookingFormData.append('vehicleId', vehicle._id)
    bookingFormData.append('date', dateRef.current.value)
    bookingFormData.append('days', daysRef.current.value)

    let url = BASE_URL + '/api/bookings/add'
    let method = 'POST'

    if (bookingId) {
      url = BASE_URL + `/api/bookings/${bookingId}/edit`
      method = 'PUT'
    }

    await postData({ url, method, payload: bookingFormData })
    navigate('/bookings')
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
          {vehicle && (
            <div className={classes.input}>
              <label htmlFor="model">model</label>
              <input
                id="model"
                type="text"
                disabled
                defaultValue={vehicle?.model}
              />
            </div>
          )}
          {vehicle && (
            <div className={classes.input}>
              <label htmlFor="number">number</label>
              <input
                id="number"
                type="text"
                disabled
                defaultValue={vehicle?.number}
              />
            </div>
          )}

          <div className={classes.input}>
            <label htmlFor="date">date</label>
            <input
              id="date"
              type="date"
              ref={dateRef}
              defaultValue={bookingData ? bookingData?.booking?.date : ''}
            />
          </div>
          <div className={classes.input}>
            <label htmlFor="days">days</label>
            <input
              id="days"
              type="number"
              ref={daysRef}
              defaultValue={bookingData ? bookingData?.booking?.days : ''}
            />
          </div>
          <button type="submit">Save</button>
        </form>
      </Box>
    </React.Fragment>
  )
}

export default BookingForm
