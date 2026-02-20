import React, { useState } from 'react'
import '../styles/forms.scss'
import { Link, useNavigate } from 'react-router-dom'
import {useAuth} from '../hooks/useAuth'
const Login = () => {
    let Navigate=useNavigate()
    const [user, setuser] = useState('')
    const [password, setpassword] = useState("")
    const {loading,loginHandler}=useAuth()
    if(loading){
        return <main>
         <h1>   loading</h1>
        </main>
    }
  return (
   <main>
    <div className="form-container">
        <h1>login</h1>
        <form onSubmit={(e)=>{
            e.preventDefault();
            loginHandler(user,password),then((res)=>{
                console.log(res);
                Navigate('/')
            }).catch((err)=>console.log(err))
        }}>
            <input value={user} onInput={(e)=>{
                setuser(e.target.value)
            }} type="text" placeholder='enter your username' />
            <input
            value={password} onInput={(e)=>{
                setpassword(e.target.value)
            }}
             type="password" name="password" id="password" placeholder='enter your password' />
            <button>Login</button>
        </form>
        <p>dont have an account?<Link className='link' to='/register' > register here</Link></p>
    </div>
   </main>
  )
}

export default Login
