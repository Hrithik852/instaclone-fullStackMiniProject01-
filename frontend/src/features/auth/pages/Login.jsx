import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/forms.scss'
import { useState } from 'react'
import {useAuth} from '../hooks/useAuth'
const Login = () => {
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const {loading,loginHandler}=useAuth();
  let navigate=useNavigate()
    if (loading) {
        return (
            <h1>Loading...</h1>
        )

    }
    function handlesubmit(e){
      e.preventDefault()
      loginHandler(username,password).then(res=>{
        console.log(res);
        navigate('/')
        
      }).catch((err)=>{
        console.log(err);
        
      })
    }
  return (
    <main>
      <h1>login</h1>
      <div className="form-container">
        <form  onSubmit={handlesubmit}>
          <input value={username} onInput={(e)=>{
            setusername(e.target.value)
          }} type="text" placeholder='enter your username' />
          <input value={password} onInput={(e)=>{
            setpassword(e.target.value)
          }} type="password" name="password" placeholder='enter your password' id="password"/>
          <button>submit</button>
          <p>dont have an account?<Link className='register-toggle' to='/register'>register here</Link></p>
        </form>
      </div>
    </main>
  )
}

export default Login
