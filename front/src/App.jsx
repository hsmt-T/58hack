import './App.css'
import { Top } from './pages/Top'
import { Profile } from './pages/Profile'
import { Messages } from './pages/Messages'
import { Detail } from './pages/Detail';
import { Login } from './pages/Login'
import { Sign } from './pages/Sign'

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/Top' element={<Top/>}/>
        <Route path='/Profile' element={<Profile/>}/>
        <Route path='/Messages' element={<Messages/>}/>
        <Route path='/detail/:room_id' element={<Detail/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/' element={<Sign/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
