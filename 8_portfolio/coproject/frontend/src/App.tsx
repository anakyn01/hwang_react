import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { ProtectedRoute } from './admin/ProtectedRoute';


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
    <Route path="/admin" element={<ProtectedRoute><DashBoard/></ProtectedRoute>} />
    <Route path="/join" element={<Join/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/userlist" element={<ProtectedRoute><UserList/></ProtectedRoute>} />
    <Route path="/headersetting" element={<HeaderSetting/>} />
    <Route path="/bannersetting" element={<BannerSetting/>} />
    <Route path="/worksetting" element={<ProtectedRoute><WorkSetting/></ProtectedRoute>} />
    <Route path="/wearesetting" element={<ProtectedRoute><WeAreSetting/></ProtectedRoute>} />
    <Route path="/blogsetting" element={<ProtectedRoute><BlogSetting/></ProtectedRoute>} />
    <Route path="/mapsetting" element={<ProtectedRoute><MapSetting/></ProtectedRoute>} />
    <Route path="/contactsetting" element={<ProtectedRoute><ContactSetting/></ProtectedRoute>} />
    <Route path="/search" element={<ProtectedRoute><SearchResult/></ProtectedRoute>} />
    </Routes>
    </BrowserRouter>

  )
}

export default App
