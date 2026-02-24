import {Route, Routes} from 'react-router-dom'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Feed from './features/posts/pages/Feed'
import Createpost from './features/posts/pages/Createpost'
 const Approutes=()=>{
   return <Routes>
        <Route path='/' element={<h1>hey guys</h1>}/>
        <Route path='/feed' element={<Feed/>}/>

        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>} />
        <Route path='/createpost' element={<Createpost/>} />

    </Routes>
}
export default Approutes