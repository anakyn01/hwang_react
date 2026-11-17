import { createRoot } from 'react-dom/client' //add

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import * as S from './css/Main.styles'; //경로변경
import Nav from './include/Nav'; //add
//스타일드 컴포넌트 링킹

//추가
import Home from './sub/Home';
import Basic from './sub/Basic';
import Special from "./sub/Special";//추가 끝
import Tuple from "./sub/Tuple"
import Array from "./sub/Array"
import Enum from "./sub/Enum"
import Obj from "./sub/Obj"
import Inter from "./sub/Inter"
import Tensor from "./sub/Tensor"
import { ClassUnion } from './sub/ClassUnion';
import { Last } from './sub/Last';



const App = () => {
  return(
    <>
   <BrowserRouter> 

    <S.GlobalStyle/>{/*전역스타일 */}
    <S.Container>


<S.Head>Header/Company Logo</S.Head>{/*추가 */}

<Nav/>{/* 이건 컴포넌트로 불러온거에요 */}

<S.Content>
<Routes>
            {/* 첫 접속시 자동으로 /link1 화면이 보이도록 설정 */}
          <Route path="/" element={<Navigate to="/home" replace/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/basic" element={<Basic/>}/>
          <Route path="/array" element={<Array/>}/>
          <Route path="/tuples" element={<Tuple/>}/>
          <Route path="/enum" element={<Enum/>}/>
          <Route path="/object" element={<Obj/>}/>
          <Route path="/interface" element={<Inter/>}/>
           <Route path="/tensor" element={<Tensor/>}/>
           <Route path="/class" element={<ClassUnion/>}/>
           <Route path="/last" element={<Last/>}/>

          </Routes>

</S.Content>

<S.Sidebar>
  Sidebar
</S.Sidebar>

<S.Ads>
  Ads
</S.Ads>

<S.Footer>
  The footer
</S.Footer>

 
   
        </S.Container>
   
</BrowserRouter> 
    </>
  )
}

//add
createRoot(document.getElementById('root')!).render(

    <App />

)
