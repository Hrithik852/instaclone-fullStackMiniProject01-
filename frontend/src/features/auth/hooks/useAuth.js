import { useContext } from "react";
import {authContext} from '../Auth.context'
import {Login,Register} from '../services/auth.api'
export const useAuth=()=>{
    const context=useContext(authContext)
    const {loading,user,setuser,setloading}=context;
    const loginHandler=async(username,password)=>{
        setloading(true)
        try{
            const response=await Login(username,password)
            return setuser(response.user)
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
            const response=await Register(username,email,password);
            setuser(response.user)
        }
        catch(err){
            throw err;
        }
        finally{
            setloading(false)
        }
    }
    return {loading,user,loginHandler,registerHandler}
}