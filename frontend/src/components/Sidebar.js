import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, Link, useLocation } from 'react-router-dom'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import PlaylistPlayOutlinedIcon from '@mui/icons-material/PlaylistPlayOutlined'
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined'
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined'
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined'
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'

const classes = {
  logo: {
    objectFit: 'contain',
    overflow: 'hidden',
  },
  sidebarIcon: {
    color: 'white',
  },
  listItem: {
    '&:hover': {
      backgroundColor: '#353739',
      borderRadius: '0.5rem',
    },
    marginBottom: '0.5rem',
  },
  listItemSelected: {
    backgroundColor: '#353739',
    borderRadius: '0.5rem',
    marginBottom: '0.5rem',
  },
  dividor: {
    color: 'white',
  },
}

const ResponsiveDrawer = (props) => {
  const authState = useSelector((state) => state.auth)
  const location = useLocation()
  const drawer = (
    <div>
      <Toolbar>
        {/* <img src="/musicwire_logo.png" style={classes.logo} /> */}
      </Toolbar>
      <Divider />
      <List>
        <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/">
          <ListItem
            key={'home'}
            sx={
              location.pathname === '/'
                ? classes.listItemSelected
                : classes.listItem
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <HomeOutlinedIcon sx={classes.sidebarIcon} />
              </ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/cars">
          <ListItem
            key={'cars'}
            sx={
              location.pathname === '/cars'
                ? classes.listItemSelected
                : classes.listItem
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <PlaylistPlayOutlinedIcon sx={classes.sidebarIcon} />
              </ListItemIcon>
              <ListItemText primary={'Cars'} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link
          style={{ textDecoration: 'none', color: 'inherit' }}
          to="/bookings"
        >
          <ListItem
            key={'bookings'}
            sx={
              location.pathname === '/bookings'
                ? classes.listItemSelected
                : classes.listItem
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <HistoryOutlinedIcon sx={classes.sidebarIcon} />
              </ListItemIcon>
              <ListItemText primary={'Bookings'} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <Divider sx={{ backgroundColor: 'grey' }} />
      <List>
        <Link
          style={{ textDecoration: 'none', color: 'inherit' }}
          to="/current"
        >
          <ListItem
            key={'currentPlaylist'}
            sx={
              location.pathname === '/current'
                ? classes.listItemSelected
                : classes.listItem
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <MusicNoteOutlinedIcon sx={classes.sidebarIcon} />
              </ListItemIcon>
              <ListItemText primary={'Current Playlist'} />
            </ListItemButton>
          </ListItem>
        </Link>
        <ListItem
          key={'createPlaylist'}
          sx={classes.listItem}
          disablePadding
          onClick={props.onClickCreatePlaylist}
        >
          <ListItemButton>
            <ListItemIcon>
              <PlaylistAddOutlinedIcon sx={classes.sidebarIcon} />
            </ListItemIcon>
            <ListItemText primary={'Create Playlist'} />
          </ListItemButton>
        </ListItem>
        {authState.isAuthenticated && authState?.user?.role === 'ADMIN' && (
          <ListItem
            key={'addSong'}
            sx={classes.listItem}
            disablePadding
            onClick={props.onClickAddSong}
          >
            <ListItemButton>
              <ListItemIcon>
                <AddCircleOutlineOutlinedIcon sx={classes.sidebarIcon} />
              </ListItemIcon>
              <ListItemText primary={'Add Song'} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </div>
  )

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: props.drawerWidth },
        flexShrink: { sm: 0 },
      }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: props.drawerWidth,
            backgroundColor: '#181818',
            color: 'white',
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  )
}

export default ResponsiveDrawer
