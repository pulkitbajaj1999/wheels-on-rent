import React, { useEffect } from 'react'
import useFetch from '../hooks/use-fetch'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useNavigate } from 'react-router-dom'

const BASE_URL = process.env.REACT_APP_BASE_URL || ''

const classes = {
  text: {
    fontSize: '2rem',
    fontWeight: '600',
    color: '#666',
  },
  model: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  number: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#9d9d9d',
    textAlign: 'center',
  },
  bookingCount: {
    fontSize: '1rem',
    fontWeight: '600',
    textAlign: 'center',
    background: 'linear-gradient(190deg, skyblue, transparent)',
    borderRadius: 1,
    margin: '0 15%',
  },
}

const CardItem = ({ vehicle, onClickCard }) => {
  return (
    <Card
      sx={{
        ':hover': {
          boxShadow: 20,
        },
        display: 'flex',
        borderRadius: 2,
        height: '20rem',
        width: '100%',
      }}
    >
      <Container
        sx={{ width: '75%', flexGrow: '1' }}
        onClick={onClickCard.bind(null, vehicle._id)}
      >
        <CardMedia
          sx={{ height: '70%', objectFit: 'contain' }}
          component="img"
          alt=""
          image={`${BASE_URL}/${vehicle.imageUrl}`}
        />
        <Typography sx={classes.model}>{vehicle.model}</Typography>
        <Typography sx={classes.number}>{vehicle.number}</Typography>
        <Typography sx={classes.bookingCount}>
          Bookings : {vehicle.bookings.length}
        </Typography>
      </Container>
    </Card>
  )
}

const CardView = ({ cards }) => {
  const navigate = useNavigate()

  const showBookingsHandler = (vehicleId) => {
    navigate(`/bookings/${vehicleId}`)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        sx={{ padding: '2rem 2rem' }}
        rowSpacing={3}
        columnSpacing={3}
        columns={{ xs: 12 }}
      >
        {cards.map((card, i) => (
          <Grid item key={card._id} xs={4}>
            <CardItem vehicle={card} onClickCard={showBookingsHandler} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

const AgentBookingView = () => {
  const url = BASE_URL + '/api/vehicles/bookings'
  const [isLoading, data, error] = useFetch({ url })

  return (
    <React.Fragment>
      {isLoading && <h1>IsLoading</h1>}
      {error && <h1>Error</h1>}
      <CardView cards={data && data.vehicles ? data.vehicles : []} />
    </React.Fragment>
  )
}

export default AgentBookingView
