import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { login } from '../store/authActions'
import { clearError } from '../store/auth'
import axios from 'axios'

import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Row from '@mui/material/TableRow'
import Col from '@mui/material/TableCell'
import { ButtonGroup, Switch } from '@mui/material'

// const BASE_URL = process.env.REACT_APP_BASE_URL || ''
// const BACKGROUND_SRC =
//   'https://thumbs.dreamstime.com/b/d-icon-music-player-blue-violet-neon-notes-isolated-black-background-140031611.jpg'

const BACKGROUND_SRC =
  'https://www.kohchangaccom.com/wp-content/uploads/2016/04/Car-All.jpg'

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'black',
  },

  '& .MuiInput-underline:after': {
    borderBottomColor: 'black',
  },
  '& .MuiInputBase-input': {
    color: 'black',
  },
  '& .MuiInputLabel-root': {
    color: 'black',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'black',
    },
    '&:hover fieldset': {
      borderColor: 'black',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'black',
    },
  },
})

const BASE_URL = process.env.REACT_APP_BASE_URL || ''

const signupHandler = (formBody) => {
  const url = BASE_URL + '/api/auth/signup'
  return axios
    .post(url, formBody)
    .then((response) => {
      if (response.ok) return response.data
    })
    .catch((response) => {
      return { status: 'error', message: response.data.message }
    })
}

const Login = ({ isLogin }) => {
  const authState = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [role, setRole] = useState('CUSTOMER')
  const setRoleToAgent = () => {
    if (role !== 'agent') setRole('AGENT')
  }
  const setRoleToCustomer = () => {
    if (role !== 'customer') setRole('CUSTOMER')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const formBody = new FormData(event.currentTarget)
    formBody.append('role', role)
    // signup
    if (!isLogin) {
      signupHandler(formBody).then(() => {
        navigate('/login')
      })
    } else {
      dispatch(login(formBody))
    }
  }

  // if authenticated navigate to home
  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [authState.isAuthenticated])

  return (
    <Box
      className="content mainContent"
      sx={{
        flex: 1,
        padding: '4rem 8rem',
      }}
    >
      <Row>
        <Col sx={{ borderBottom: 'none' }} md={6}>
          <div className="login-section">
            <div className="login-form">
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                {!isLogin && (
                  <CssTextField
                    id="name"
                    margin="normal"
                    required
                    fullWidth
                    label="Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                  />
                )}
                <CssTextField
                  id="email"
                  margin="normal"
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <CssTextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                {!isLogin && (
                  <ButtonGroup
                    name="role"
                    variant="contained"
                    sx={{
                      justifyContent: 'center',
                      width: '100%',
                      boxShadow: 'none',
                    }}
                  >
                    <Button
                      sx={{
                        background: role === 'CUSTOMER' ? 'green' : 'grey',
                      }}
                      onClick={setRoleToCustomer}
                    >
                      Customer
                    </Button>
                    <Button
                      sx={{ background: role === 'AGENT' ? 'green' : 'grey' }}
                      onClick={setRoleToAgent}
                    >
                      Agent
                    </Button>
                  </ButtonGroup>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, height: '55px', fontSize: '20px' }}
                >
                  {isLogin ? 'LOGIN' : 'SIGNUP'}
                </Button>
              </Box>
              {isLogin && (
                <h4>
                  Not a user ? <NavLink to="/signup"> Signup</NavLink>
                </h4>
              )}

              {!isLogin && (
                <h4>
                  Already a user ? <NavLink to="/login"> Login</NavLink>
                </h4>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Box>
  )
}

export default Login
