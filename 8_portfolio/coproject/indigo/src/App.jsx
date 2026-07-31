import {BrowserRouter, Routes, Route} from 'react-router-dom';


import Header from "./include/Header"
//import 컨포넌트명 from "path"
import {Footer} from "./include/Footer"
import {Slider} from "./include/Slider"
import Home from "./Home"

//admin
import { DashBoard } from './admin/DashBoard';
import { Join} from './admin/sub/Join';
import { Login } from './admin/sub/Login';
import { UserList } from './admin/sub/UserList';
import { HeaderSetting } from './admin/sub/HeaderSetting';
import { BannerSetting } from './admin/sub/BannerSetting';
import { WeAreSetting } from './admin/sub/WeAreSetting';

function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={
    <div id="wrap">
  <Header/>
  <Slider/>
  <Home/>
  <Footer/>  
    </div>}/>
    <Route path="/admin" element={<DashBoard/>} />
    <Route path="/join" element={<Join/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/userlist" element={<UserList/>} />
    <Route path="/headersetting" element={<HeaderSetting/>} />
    <Route path="/bannersetting" element={<BannerSetting/>} />
    <Route path="/wearesetting" element={<WeAreSetting/>} />
    </Routes>
    </BrowserRouter>

  )
}

export default App
