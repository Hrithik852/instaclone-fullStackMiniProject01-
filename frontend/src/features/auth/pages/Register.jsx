import React, { useState } from 'react'
import '../styles/forms.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
const Register = () => {
    const navigate=useNavigate()
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const {loading,registerHandler}=useAuth()
    if(loading){
        return <h1>loading</h1>
    }
  return (
    <main>
    <div className="form-container" >
        <h1>Register</h1>
        <form onSubmit={(e)=>{
            e.preventDefault()
            registerHandler(username,email,password).then(res=>{console.log(res);
                navigate('/')
            })
        }}>
            <input
            value={username} onInput={(e)=>{
                setusername(e.target.value)
            }} 
            type="text" placeholder='enter your username' />
            <input 
            value={email} onInput={(e)=>{
                setemail(e.target.value)
            }} 
            type="email" name='email' id='email' placeholder='enter your email' />

            <input
              value={password} onInput={(e)=>{
                setpassword(e.target.value)
            }}
            type="password" name="password" id="password" placeholder='enter your password' />
            <button>Login</button>
        </form>
        <p>already have an account?<Link className='link' to='/login' > login here</Link></p>

    </div>
   </main>
  )
}

export default Register
