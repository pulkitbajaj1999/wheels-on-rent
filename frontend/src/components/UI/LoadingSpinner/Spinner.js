import React from 'react'
import classes from './spinner.module.css'

export default function LoadingSpinner() {
  return (
    <div className={classes['spinner-container']}>
      <div className={classes['loading-spinner']}></div>
    </div>
  )
}
