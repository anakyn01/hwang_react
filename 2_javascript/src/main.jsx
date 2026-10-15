import { createRoot } from 'react-dom/client'
//main.jsx를 단독으로 실행할때도 남겨야 된다
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./include/Header"
import Home from "./Home"

import Flex from "./sub/Flex"
import FlexWeb from './sub/FlexWeb'
import Grid from "./sub/Grid"
import GridWeb from "./sub/GridWeb"
import Layout from "./sub/Layout"

//자바스크립트 학습
import Es6 from './sub/Es6'
import Fs from './sub/fs/Fs'
import Re from './sub/fs/Re'
import Cate from './sub/fs/Cate'
import Date from './sub/date/Date'
import Temporal from './sub/date/Temporal'
import DateVsTemp from "./sub/date/DateVsTemp"
import Intro from './sub/jquery/Intro'

import Geo from './sub/Geo'
import Async from './sub/Async'

import Jsx from './sub/react/Jsx'
import Class from './sub/react/Class'
import Props from './sub/react/Props'
import Event from './sub/react/Event'
import Forms from './sub/react/Forms'
import Forms2 from './sub/react/Forms2'
import Hoc from './sub/react/Hoc'
import Fref from './sub/react/Fref'
import Portals from './sub/react/Portals'
import Sus from './sub/react/Sus'
import Trans from './sub/react/Trans'
import Hook from './sub/react/Hook'


//기본 부트스트랩 cdn
import 'bootstrap/dist/css/bootstrap.min.css';

import './assets/scss/style.scss';

function App() {

  return (
    <>
<BrowserRouter>
<Header/>
<Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/flex" element={<Flex/>}/>
  <Route path="/flexweb" element={<FlexWeb/>}/>
  <Route path="/grid" element={<Grid/>}/>
  <Route path="/gridweb" element={<GridWeb/>}/>
  <Route path="/layout" element={<Layout/>}/>

  <Route path="/es6" element={<Es6/>}/>
  <Route path="/function" element={<Fs/>}/>
  <Route path="/recursive" element={<Re/>}/>
  
  <Route path="/date" element={<Date/>}/>
  <Route path="/temporal" element={<Temporal/>}/>
  <Route path="/datevstemp" element={<DateVsTemp/>}/>
 
  <Route path="/cate" element={<Cate/>}/>
  <Route path="/geo" element={<Geo/>}/>
  <Route path="/async" element={<Async/>}/>

  <Route path="/jquery" element={<Intro/>}/>

  <Route path="/jsx" element={<Jsx/>}/>
  <Route path="/class" element={<Class/>}/>
  <Route path="/props" element={<Props/>}/>
  <Route path="/event" element={<Event/>}/>
  <Route path="/forms" element={<Forms/>}/>
  <Route path="/forms2" element={<Forms2/>}/>
  <Route path="/hoc" element={<Hoc/>}/>

  
  <Route path="/sus" element={<Sus/>}/>
  <Route path="/fref" element={<Fref/>}/>
  <Route path="/hooks" element={<Hook/>}/>
  <Route path="/portals" element={<Portals/>}/>
  <Route path="/trans" element={<Trans/>}/>

</Routes>
</BrowserRouter>      
    </>
  )
}

createRoot(document.getElementById('hyi')).render(
<App/>
)

/*
최초설치시
import { StrictMode } from 'react'
import App from './App.jsx'

  <StrictMode>
*/