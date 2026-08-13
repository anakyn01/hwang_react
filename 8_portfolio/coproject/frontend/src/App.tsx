import {BrowserRouter, Routes, Route} from 'react-router-dom';


import Header from "./include/Header"
//import 컨포넌트명 from "path"
import {Footer} from "./include/Footer"
import {Slider} from "./include/Slider"
import {Home} from "./Home"

//admin
import { DashBoard } from './admin/DashBoard';
import { Join} from './admin/sub/Join';
import { Login } from './admin/sub/Login';
import { UserList } from './admin/sub/UserList';
import { HeaderSetting } from './admin/sub/HeaderSetting';
import { BannerSetting } from './admin/sub/BannerSetting';
import { WeAreSetting } from './admin/sub/WeAreSetting';
import { WorkSetting } from "./admin/sub/WorkSetting";
import { BlogSetting} from "./admin/sub/BlogSetting";
import { MapSetting } from './admin/sub/MapSetting';
import { ContactSetting } from './admin/sub/ContactSetting';
import { SearchResult } from './admin/sub/SearchResult';

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
    <Route path="/worksetting" element={<WorkSetting/>} />
    <Route path="/wearesetting" element={<WeAreSetting/>} />
    <Route path="/blogsetting" element={<BlogSetting/>} />
    <Route path="/mapsetting" element={<MapSetting/>} />
    <Route path="/contactsetting" element={<ContactSetting/>} />
    <Route path="/search" element={<SearchResult/>} />
    </Routes>
    </BrowserRouter>

  )
}

export default App
