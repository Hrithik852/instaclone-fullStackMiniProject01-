import axios from 'axios'

const api=axios.create({
    baseURL:"http://localhost:3000/api/posts",
    withCredentials:true,
})
const like=axios.create({
    baseURL:"http://localhost:3000/api/user",
    withCredentials:true,
})
export const getFeed=async()=>{
    const response=await api.get('/feed');
    return response.data;
}

export const createPost=async(caption,file)=>{
    const formData=new FormData();
    formData.append("caption",caption)
    formData.append("photo",file)
    const response=await api.post('/',formData)
    return response.data
}

export const postLike=async(postid)=>{
    const response=like.post('/like/'+postid);
    return response.data
}
export const unpostLike=async(postid)=>{
    const response=like.post('/unlike/'+postid);
    return response.data
}