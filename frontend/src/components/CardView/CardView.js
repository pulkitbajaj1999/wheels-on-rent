import React from 'react'

// import third-party libraries
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

// import custom components
import CardItem from './CardItem'

const CardView = ({ cards, cardType, role }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        sx={{ padding: '2rem 8rem' }}
        direction="column"
        rowSpacing={2}
      >
        {cards.map((card, i) => (
          <Grid item key={card._id}>
            {cardType === 'vehicle' && (
              <CardItem vehicle={card} role={role} cardType={cardType} />
            )}
            {cardType === 'booking' && (
              <CardItem
                vehicle={card.vehicle}
                booking={card}
                user={card.user}
                role={role}
                cardType={cardType}
              />
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default CardView
