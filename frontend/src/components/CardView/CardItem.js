import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import PeopleIcon from '@mui/icons-material/People'
import Container from '@mui/material/Container'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import usePostData from '../../hooks/use-post-data'

const BASE_URL = process.env.REACT_APP_BASE_URL || ''

const classes = {
  text: {
    fontSize: '2rem',
    fontWeight: '600',
    color: '#666',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  capacity: {
    fontSize: '2rem',
    fontWeight: '600',
    color: '#9d9d9d',
  },
  price: {
    fontSize: '2rem',
    fontWeight: '600',
    color: '#a8a8a8',
  },
  setButton: {
    lineHeight: 1,
    fontSize: '2rem',
    background: 'linear-gradient(45deg, skyblue, transparent)',
  },
  bookButton: {
    background: 'linear-gradient(45deg, skyblue, transparent)',
    width: '12rem',
    color: 'grey',
    fontWeight: 900,
  },
}

const CardItem = ({ vehicle, booking, user, cardType, role }) => {
  const navigate = useNavigate()
  const [postData, { loading, data, error }] = usePostData()
  const [days, setDays] = useState(1)

  const incrementhandler = () => {
    if (days >= 10) return
    setDays((days) => days + 1)
  }

  const decrementHandler = () => {
    if (days <= 1) return
    setDays((days) => days - 1)
  }

  const bookVehicleHandler = async () => {
    if (role !== 'CUSTOMER') {
      navigate('/login')
      return
    }
    const url = BASE_URL + '/api/bookings/add'
    const formBody = new FormData()
    formBody.append('vehicleId', vehicle._id)
    formBody.append('date', new Date())
    formBody.append('days', days)
    await postData({ url, method: 'POST', payload: formBody })
    navigate('/bookings')
  }

  const editVehicleHandler = () => {
    navigate(`/cars/${vehicle._id}/edit`)
  }
  const deleteVehicleHandler = async () => {
    const url = BASE_URL + `/api/vehicles/${vehicle._id}/delete`
    await postData({ url, method: 'DELETE' })
    navigate(0)
  }

  const editBookingHandler = () => {
    navigate(`/bookings/${booking._id}/edit`)
  }

  const deleteBookingHandler = async () => {
    const url = BASE_URL + `/api/bookings/${booking._id}/delete`
    await postData({ url, method: 'DELETE' })
    navigate(0)
  }

  const bookingDays = (
    <Container
      sx={{
        display: 'flex',
        direction: 'column',
        marginTop: 'auto',
      }}
    >
      <Button
        variant="contained"
        size="small"
        style={classes.setButton}
        onClick={decrementHandler}
      >
        -
      </Button>
      <Typography
        variant="h4"
        color="text.secondary"
        sx={{ width: '4rem', textAlign: 'center' }}
      >
        {days}
      </Typography>
      <Button
        variant="contained"
        size="small"
        style={classes.setButton}
        onClick={incrementhandler}
      >
        +
      </Button>
    </Container>
  )

  const bookingButton = (
    <Container sx={{ marginTop: 'auto' }}>
      <Button
        variant="contained"
        size="large"
        sx={classes.bookButton}
        onClick={bookVehicleHandler}
      >
        Book
      </Button>
    </Container>
  )

  const bookingDetails = (
    <Container
      sx={{ display: 'flex', alignItems: 'center', marginTop: 'auto' }}
    >
      <Container sx={{ padding: '0', minWidth: '80%' }}>
        <Typography sx={classes.text}>Booking</Typography>
        <Typography>
          From <CalendarMonthIcon />
          {new Date(booking?.date).toLocaleDateString()}
        </Typography>
        <Typography>
          To &emsp; <CalendarMonthIcon />
          {new Date(booking?.date).toLocaleDateString()}
        </Typography>
      </Container>
      <Container>
        <Tooltip>
          <IconButton onClick={editBookingHandler}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip>
          <IconButton onClick={deleteBookingHandler}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Container>
    </Container>
  )

  const vehicleActions = (
    <Container sx={{ margin: 'auto' }}>
      <Tooltip>
        <IconButton onClick={editVehicleHandler}>
          <EditIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <Tooltip>
        <IconButton onClick={deleteVehicleHandler}>
          <DeleteIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    </Container>
  )

  return (
    <Card
      sx={{
        ':hover': {
          boxShadow: 20,
        },
        display: 'flex',
        borderRadius: 2,
        height: '25rem',
        width: '100%',
      }}
    >
      <Container sx={{ width: '75%', flexGrow: '1' }}>
        <CardMedia
          sx={{ height: '80%', objectFit: 'contain' }}
          component="img"
          alt=""
          image={`${BASE_URL}/${vehicle?.imageUrl}`}
        />
        <Typography sx={classes.title}>{vehicle?.model}</Typography>
      </Container>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Container>
          <Typography sx={classes.text}>{vehicle?.number}</Typography>
          <Typography sx={classes.capacity}>
            <PeopleIcon /> {vehicle?.capacity}
          </Typography>
          {/* <Button variant="contained">Capacity: {vehicle?.capacity}</Button> */}
          <Typography sx={classes.price}>₹ {vehicle?.rent} per day</Typography>
          <Typography variant="body2" color="text.secondary">
            {vehicle?.details}
          </Typography>
        </Container>

        {cardType === 'vehicle' && role === 'CUSTOMER' && bookingDays}
        {cardType === 'vehicle' &&
          (!role || role === 'CUSTOMER') &&
          bookingButton}
        {cardType === 'vehicle' && role === 'AGENT' && vehicleActions}
        {cardType === 'booking' && role === 'CUSTOMER' && bookingDetails}
      </CardContent>
    </Card>
  )
}

export default CardItem
