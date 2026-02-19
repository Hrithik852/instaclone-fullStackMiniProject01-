import {login,register,getMe} from './services/auth.api'
import {createContext,useState} from 'react'

export const Authcontext=createContext();

const AuthProvider = ({children}) => {
    const [user, setuser] = useState(null)
    const [loading, setloading] = useState(false)
    const loginHandler=async(username,password)=>{
        setloading(true);
        try{
            const response=await login(username,password);
            setuser(response.user)
        }
        catch(err){
            throw err;
        }
        finally{
            setloading(false)
        }
    }

    const registerHAndler=async(username,email,password)=>{
        setloading(true)
        try{
            const response=await register(username,email,password)
            setuser(response.user)
        }
        catch(err){
            throw err;
        }
        finally{
            setloading(false)
        }
    }
  return (
    <Authcontext.Provider value={{user,loading,loginHandler,registerHAndler}}>
        {children}
    </Authcontext.Provider>
  )
}

