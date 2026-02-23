import React from 'react'
import {AuthProvider} from './features/auth/Authcontext'
import {PostContextProvider} from './features/posts/PostContext'
import { BrowserRouter } from 'react-router-dom'
import './global.scss'
import Approutes from './Approutes'
const App = () => {
  return (
    <AuthProvider>
      <PostContextProvider>
    <BrowserRouter>
    <Approutes/>
    </BrowserRouter>
      </PostContextProvider>
  </AuthProvider>
  )
}

export default App
