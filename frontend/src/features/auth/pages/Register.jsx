import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/forms.scss'
import { useState } from 'react'
import {useAuth} from '../hooks/useAuth'
const Register = () => {
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [email, setemail] = useState("")
    const {loading,registerHandler}=useAuth()
    const navigate=useNavigate()
     if (loading) {
        return (
            <h1>Loading...</h1>
        )
      }
    function handlesubmit(e){
      e.preventDefault();
      registerHandler(username,email,password).then((res)=>{
        console.log(res);
        navigate('/')
      }).catch((err)=>{
        console.log(err);
        
      })
    }
  return (
    <main>
      <h1>register</h1>
      <div className="form-container">
        <form onSubmit={handlesubmit} >
          <input 
           value={username} onInput={(e)=>{
            setusername(e.target.value)
          }}
          type="text" placeholder='enter username' name="" id="" />
          <input
          value={email} onInput={(e)=>{
            setemail(e.target.value)
          }}
          type="email" name="email" id="email" placeholder='enter email' />
          <input 
          value={password} onInput={(e)=>{
            setpassword(e.target.value)
          }}
          type="password" name="password" id="password" placeholder='enter password' />
          <button>submit</button>
          <p>already have an account?<Link className='register-toggle' to='/login'>login here</Link></p>

        </form>

      </div>
    </main>
  )
}

export default Register
