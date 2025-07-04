import React from 'react'
import ReaderNav from './ReaderNav'
import { Outlet } from 'react-router-dom'

function ReaderLayout() {
  return (
    <>
      <ReaderNav />
      <Outlet />
    </>
  )
}

export default ReaderLayout
