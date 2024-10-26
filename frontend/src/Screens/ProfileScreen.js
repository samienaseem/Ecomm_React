import React from 'react'
import { Helmet } from 'react-helmet-async'

export default function ProfileScreen() {
  return (
    <div>
        <Helmet>
            <title>Profile</title>
        </Helmet>
        <div className='container'>
            <h1 className='my-3'>Profile</h1>
        </div>
      
    </div>
  )
}
