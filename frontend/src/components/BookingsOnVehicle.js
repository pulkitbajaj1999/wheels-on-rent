import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/use-fetch'
import LoadingSpinner from './UI/LoadingSpinner/Spinner'

import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import PeopleIcon from '@mui/icons-material/People'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'

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

const BASE_URL = process.env.REACT_APP_BASE_URL || ''

const BookingsOnVehicle = () => {
  const { vehicleId } = useParams()

  const url1 = BASE_URL + `/api/vehicles/${vehicleId}`
  const [isLoading, data1, error] = useFetch({ url: url1 })

  const url2 = BASE_URL + `/api/bookings/?vehicleId=${vehicleId}`
  const [isLoading2, data2, error2] = useFetch({ url: url2 })

  const vehicle = data1?.vehicle
  const bookings = data2?.bookings

  return (
    <React.Fragment>
      {isLoading && (
        <center>
          <LoadingSpinner />
        </center>
      )}
      {vehicle && (
        <Card
          sx={{
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
              image={`${BASE_URL}/${vehicle.imageUrl}`}
            />
            <Typography sx={classes.title}>{vehicle.model}</Typography>
          </Container>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Container>
              <Typography sx={classes.text}>{vehicle.number}</Typography>
              <Typography sx={classes.capacity}>
                <PeopleIcon /> {vehicle.capacity}
              </Typography>
              <Typography sx={classes.price}>
                ₹ {vehicle.rent} per day
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {vehicle?.details}
              </Typography>
            </Container>
          </CardContent>
        </Card>
      )}

      {isLoading2 && (
        <center>
          <LoadingSpinner />
        </center>
      )}
      {bookings && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">
                  Name
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">
                  Email
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">
                  Booking Date
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">
                  No. of days
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking, index) => (
                <TableRow
                  key={booking?._id}
                  hover
                  role="checkbox"
                  tabIndex={-1}
                >
                  <TableCell align="center" component="th">
                    {booking?.user?.profile?.name}
                  </TableCell>
                  <TableCell align="center" component="th">
                    {booking?.user?.email}
                  </TableCell>
                  <TableCell align="center" component="th">
                    {new Date(booking.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center" component="th">
                    {booking.days}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </React.Fragment>
  )
}

export default BookingsOnVehicle
