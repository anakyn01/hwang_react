import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import * as M from './css/Main.styles';

import Home from './sub/Home'
import Basic from './sub/Basic'

import Test from './sub/Test'



const App = () => {
  return(
    <>
    <BrowserRouter>
    <M.GlobalStyle/>
    <M.Container>
      <M.Head>TypeScript</M.Head>

      <M.Nav>
        <ul>
          <li><M.StyledLink to="/">home</M.StyledLink></li>
          <li><M.StyledLink to="/basic">1_basic</M.StyledLink></li>
          <li><M.StyledLink to="/test">test</M.StyledLink></li>
        </ul>
      </M.Nav>

      <M.Content>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/basic" element={<Basic/>}/>
          <Route path="/test" element={<Test/>}/>
        </Routes>
      </M.Content>

      <M.Sidebar>Sidebar</M.Sidebar>

      <M.Ads>Ads</M.Ads>

      <M.Footer>The footer</M.Footer>

    </M.Container>
    </BrowserRouter>
     </>
  )
}


createRoot(document.getElementById('root')!).render(

    <App />

)
