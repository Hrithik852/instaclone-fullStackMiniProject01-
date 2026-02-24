import React from 'react'
import '../styles/Nav.scss'
import { useNavigate } from 'react-router-dom'
const Nav = () => {
    const navigate=useNavigate()
  return (
    <div className='nav'>
     <button onClick={()=>{
        navigate('/createpost')
     }}>Create Post</button>
    </div>
  )
}

export default Nav
