import React from 'react'
import {AuthProvider} from './features/auth/Authcontext'
import { BrowserRouter } from 'react-router-dom'
import './global.scss'
import Approutes from './Approutes'
const App = () => {
  return (
    <AuthProvider>
    <BrowserRouter>
    <Approutes/>
    </BrowserRouter>
  </AuthProvider>
  )
}

export default App
