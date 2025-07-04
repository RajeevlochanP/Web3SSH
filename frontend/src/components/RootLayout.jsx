import React from 'react'
import { Outlet } from 'react-router-dom'
import ReaderNav from './ReaderNav'
import PublisherNav from './PublisherNav'

function RootLayout() {
  return (
    <>
      <PublisherNav />
      <Outlet />
    </>
  )
}

export default RootLayout
