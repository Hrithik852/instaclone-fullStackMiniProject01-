import React, { useContext, useState } from 'react'
import '../styles/forms.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth} from '../hooks/useAuth'
const Login = () => {
    const navigate=useNavigate()
    const [username, setusername] = useState('')
    const [password, setpassword] = useState("")
    const {loading,loginHandler}=useAuth()
    if(loading){
        return <h1>loading</h1>
    }
  return (
    <main>
      <div className="form-container">
       <h1>login</h1>
        <form onSubmit={(e)=>{
            e.preventDefault()
            loginHandler(username,password).then((res)=>{
                console.log(res);
                navigate('/')
            }).catch(err=>console.log(err)
            )
        }}>
            <input value={username} onInput={(e)=>{
                setusername(e.target.value)
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
