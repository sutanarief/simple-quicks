import React from 'react'
import './styles/loading.css'

const Loading = ({ page }) => {
  return (
    <div className='loading-wrapper'>
      <div className='spinner'></div>
      <span>Loading {page}...</span>
    </div>
  )
}

export default Loading