import { useContext } from "react"
import {authContext} from '../Authcontext'
import {login,register} from '../services/auth.api'
export const useAuth=()=>{
    const context=useContext(authContext);
    console.log(context);
    
    const {loading,setloading,user,setuser}=context;
    const loginHandler=async(username, password)=>{
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
     const registerHandler=async(username,email,password)=>{
        setloading(true);
        try{
            const response=await register(username,email,password);
            setuser(response.user)
        }
        catch(err){
            throw err;
        }
        finally{
            setloading(false)
        }
    }

    return {loginHandler,registerHandler,loading,user}
}