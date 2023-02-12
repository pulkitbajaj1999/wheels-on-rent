// To-do
// handle email in avatar
import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'

import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import Avatar from '@mui/material/Avatar'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'

import { logout } from '../store/authActions'

const classes = {
  navLink: {
    color: 'white',
    textDecoration: 'none',
  },
  navLinkActive: {
    color: 'white',
    textDecoration: 'none',
    borderRadius: '0.4rem',
    backgroundColor: 'black',
    borderRadius: '0.5rem',
  },
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    marginRight: '1rem',
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))

const TopBar = () => {
  const authState = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // component states
  const [query, setQuery] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)
  const isMenuOpen = Boolean(anchorEl)

  // component handlers
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  const handleClickLogin = () => {
    navigate('/login')
  }

  const dispatchMenuAction = (item) => {
    switch (item) {
      // authenticated
      case 'PROFILE':
        break

      case 'LOGOUT':
        dispatch(logout())
        window.location.replace('/login')
        break
    }
    setAnchorEl(null)
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* user is not logged */}
      {!authState.isAuthenticated && (
        <MenuItem onClick={dispatchMenuAction.bind(null, 'LOGIN')}>
          Login
        </MenuItem>
      )}
      {/* user is logged in */}
      {authState.isAuthenticated && (
        <MenuItem onClick={dispatchMenuAction.bind(null, 'PROFILE')}>
          Profile
        </MenuItem>
      )}
      {authState.isAuthenticated && (
        <MenuItem onClick={dispatchMenuAction.bind(null, 'LOGOUT')}>
          Logout
        </MenuItem>
      )}
    </Menu>
  )

  const querySubmitHandler = (e) => {
    e.preventDefault()
    navigate(`/search?q=${query}`)
    setQuery('')
  }

  return (
    <React.Fragment>
      <AppBar
        position="static"
        style={{
          backgroundColor: '#181818',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Toolbar sx={{ widdth: '30%' }}>
          <List sx={{ display: 'flex' }}>
            <NavLink
              to="/cars"
              end
              style={({ isActive }) =>
                isActive ? classes.navLinkActive : classes.navLink
              }
            >
              <ListItem key="cars" disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <ListItemText primary="cars" />
                </ListItemButton>
              </ListItem>
            </NavLink>
            {authState.isAuthenticated && (
              <NavLink
                to="/bookings"
                style={({ isActive }) =>
                  isActive ? classes.navLinkActive : classes.navLink
                }
              >
                <ListItem key="bookings" disablePadding>
                  <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText primary="bookings" />
                  </ListItemButton>
                </ListItem>
              </NavLink>
            )}
            {authState?.user?.role === 'AGENT' && (
              <NavLink
                to="/cars/add"
                style={({ isActive }) =>
                  isActive ? classes.navLinkActive : classes.navLink
                }
              >
                <ListItem key="add-car" disablePadding>
                  <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText primary="Add Car" />
                  </ListItemButton>
                </ListItem>
              </NavLink>
            )}
          </List>
        </Toolbar>

        <Toolbar sx={{ width: '50%' }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <form onSubmit={querySubmitHandler}>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </form>
          </Search>
        </Toolbar>

        <Toolbar sx={{ flexGrow: '1', justifyContent: 'right' }}>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {authState.isAuthenticated && (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={'primary-search-account-menu'}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar>{authState.user.email[0].toUpperCase()}</Avatar>
              </IconButton>
            )}
            {!authState.isAuthenticated && (
              <Button
                variant="contained"
                disableElevation
                onClick={handleClickLogin}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </React.Fragment>
  )
}
export default TopBar
