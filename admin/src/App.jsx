import React from 'react'
import { Navbar } from './Components/NavBar/Navbar'
import { Sidebar } from './Components/Sidebar/Sidebar'
import { Admin } from './Pages/Admin/Admin'

export const App = () => {
  return (
    <div>
      <Navbar/>
      <Admin/>
    </div>
  )
}
