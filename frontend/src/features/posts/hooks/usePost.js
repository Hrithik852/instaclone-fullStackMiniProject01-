import { useContext } from 'react'
import {getFeed} from '../services/post.api'
import {postContext} from '../PostContext'
export const usePosts=()=>{

    const context=useContext(postContext)
    const {loading,setloading,feed,setfeed,post,setpost}=context;
    const handleGetFeed=async()=>{
        setloading(true);
        
            const response=await getFeed();
            console.log(response.posts);
            setfeed(response.posts)
            setloading(false)
    
    }
     return { loading, feed, post, handleGetFeed }
}