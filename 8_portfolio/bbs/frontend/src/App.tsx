//1) 라우팅 설정
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { BoardList } from './components/BoardList';
import { BoardWrite} from './components/BoardWrite';
import { BoardEdit } from './components/BoardEdit';



function App() {


  return (
    <>
     <BrowserRouter>
     <div className="container mt-5">
      <h2 className='mb-4'>
        BBS
      </h2>
      <Routes>
        <Route path='/' element={<BoardList/>}/>
        <Route path='/write' element={<BoardWrite/>}/>
        <Route path='/edit/:id' element={<BoardEdit/>}/>
      </Routes>
     </div>
     </BrowserRouter>
    </>
  )
}

export default App
