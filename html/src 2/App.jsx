import Header from "./include/Header"
import Footer from "./include/Footer"
import Slide from "./include/Slide"
import Tag from './sub/Tag'
import Forms from './sub/Forms'
import Block from './sub/Block'
import Inline from './sub/Inline'
import Iframe from './sub/Iframe'
import Media from './sub/Media'
import {BrowserRouter, Routes, Route,} from 'react-router-dom'

function App() { //리액트에 함수형 컴포넌트
  
  return (
    <>
<BrowserRouter>
    <Header/>
    <Routes>
<Route path="/" element={<Slide/>}/>
<Route path="/tag" element={<Tag/>}/>
<Route path="/forms" element={<Forms/>}/>
<Route path="/block" element={<Block/>}/>   
<Route path="/inline" element={<Inline/>}/>
<Route path="/media" element={<Media/>}/>
<Route path="/iframe" element={<Iframe/>}/>       
    </Routes>
</BrowserRouter>    
    <Footer/>
    </>
  )
}

export default App
