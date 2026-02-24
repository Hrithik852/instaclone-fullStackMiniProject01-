import { useContext } from 'react'
import {getFeed,createPost,postLike,unpostLike} from '../services/post.api'
import {postContext} from '../PostContext'
import { useEffect } from 'react'
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
    const handleCreatePost=async(caption,file)=>{
        setloading(true);
        const response=await createPost(caption,file)
        setfeed([response.post,...feed])
        setloading(false)
    }
    const likeHandler=async(postid)=>{
        setloading(true)
        const response=await postLike(postid);
        setloading(false)
        await handleGetFeed()
    }
        const unlikeHandler=async(postid)=>{
        setloading(true)
        const response=await unpostLike(postid);
        setloading(false)
        await handleGetFeed()

        
    }
     useEffect(() => {
        handleGetFeed()
    }, [])
     return { loading, feed, post, handleGetFeed ,handleCreatePost,likeHandler,unlikeHandler}}