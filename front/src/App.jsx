import './App.css'
import { Top } from './pages/Top'
import { Profile } from './pages/Profile'
import { Messages } from './pages/Messages'
import { Detail } from './pages/Detail';
import { Login } from './pages/login'
import { Sign } from './pages/Sign'

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    
    {/* 開発中デバック用 */}
      <nav>
        <Link to="/Top">Top</Link> 
        <Link to="/Profile">Profile</Link>
        <Link to="/Messages">Messages</Link>
        <Link to="/Detail">Detail</Link>
        <Link to="/Login">Login</Link>
        <Link to="/Sign">Sign</Link>
      </nav>
    {/* 開発中デバック用 */}

      <Routes>
        <Route path='/Top' element={<Top/>}/>
        <Route path='/Profile' element={<Profile/>}/>
        <Route path='/Messages' element={<Messages/>}/>
        <Route path='/Detail' element={<Detail/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/' element={<Sign/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
