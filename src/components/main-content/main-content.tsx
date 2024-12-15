import React from 'react'
import './main-content.css'

function MainContent({ children }) {
  return (
    <div className='main_section'>
        {children}
    </div>
  )
}

export default MainContent