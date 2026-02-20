import React, {  useState } from 'react'
import '../styles/forms.scss'
import { Link, useNavigate } from 'react-router-dom'
import {useAuth} from '../hooks/useAuth'
const Register = () => {
    const [user, setuser] = useState('')
        const [password, setpassword] = useState("")
        const [email, setemail] = useState("")
        const Navigate=useNavigate()
        const {loading,registerHandler}=useAuth()
        if(loading){
            return <main><h1>Loading</h1></main>
        }
  return (
   <main>
    <div className="form-container" onSubmit={(e)=>{
        e.preventDefault()
        registerHandler(user,email,password).then(res=>{console.log(res)
            Navigate('/')
        }
        ).catch(err=>console.log(err)
        )
    }}>
        <h1>Register</h1>
        <form>
            <input
            value={user} onInput={(e)=>{
                setuser(e.target.value)
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
