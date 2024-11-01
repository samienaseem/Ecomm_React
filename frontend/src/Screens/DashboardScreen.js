import React from 'react'
import { Helmet } from 'react-helmet-async'

export default function DashboardScreen() {
  return (
    <div className='container'>
      <Helmet><title>Dashboard</title></Helmet>
      <h1>Dashboard</h1>
    </div>
  )
}
