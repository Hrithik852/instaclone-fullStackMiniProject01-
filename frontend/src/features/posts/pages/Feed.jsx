import React from 'react'
import {usePosts} from '../hooks/usePost'
import { useEffect } from 'react'
import Post from '../components/Post'
import '../styles/feed.scss'
import Nav from '../../../shared/components/Nav'
const Feed = () => {

   const {loading,feed,handleGetFeed,likeHandler,unlikeHandler}=usePosts()
    useEffect(()=>{
        handleGetFeed()
    },[])
 if(loading || !feed){
        return (<main><h1>Feed is loading...</h1></main>)
    }

    console.log(feed)
    



    return (<>
            <Nav/>
        <main className='feed-page' >
            <div className="feed">
                <div className="posts">
                    {feed.map(post=>{
                        return <Post likeHandler={likeHandler} unlikeHandler={unlikeHandler} user={post.user} post={post} />
                    }).reverse()}
                </div>
            </div>
        </main>
                    </>
    )
}

export default Feed
