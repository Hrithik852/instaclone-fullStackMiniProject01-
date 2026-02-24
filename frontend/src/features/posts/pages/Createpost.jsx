import React, { useState } from 'react'
import '../styles/createpost.scss'
import { useRef } from 'react'
import {usePosts} from '../hooks/usePost'
import { useNavigate } from 'react-router-dom'
const Createpost = () => {
    const [caption, setcaption] = useState("")
    let navigate=useNavigate()
    const uploadedfile = useRef(null)
    const {handleCreatePost,loading} =usePosts()
if(loading){
        return (
            <main>
                <h1>creating post</h1>
            </main>
        )
    }
  return (
    <main>
      <div className="form-container">
        <h1>Create Post</h1>
        <form onSubmit={(e)=>{
        e.preventDefault()
        const file=uploadedfile.current.files[0]
        handleCreatePost(caption,file)
        navigate('/feed')
      }}>
          <label htmlFor="file" className="file-label">
            upload your post image
          </label>
          <input 
            type="file" 
            name="file" 
            id="file"
            ref={uploadedfile}
            required
          />
          <input 
          value={caption}
          onChange={((e)=>{
            setcaption(e.target.value)
          })}
            type="text" 
            placeholder="Enter the caption"
            required
          />
          <button type="submit">Post</button>
        </form>
      </div>
    </main>
  )
}

export default Createpost
