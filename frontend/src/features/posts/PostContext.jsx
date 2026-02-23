import { useState,createContext } from "react";

export const postContext=createContext()

export const PostContextProvider=({children})=>{
    const [post, setpost] = useState(null)
    const [feed, setfeed] = useState(null)
    const [loading, setloading] = useState(false)
    return <postContext.Provider value={{post,setfeed,setloading,feed,setpost,loading}}>{children}</postContext.Provider>
}