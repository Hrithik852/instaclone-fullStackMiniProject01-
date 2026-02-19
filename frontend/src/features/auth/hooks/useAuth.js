import {useContext} from 'react'
import {Authcontext} from '../auth.context'
export const useAuth=()=>{
    const context=useContext(Authcontext);
    return context
}