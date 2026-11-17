import { BrowserRouter, Routes, Route 
  } from "react-router-dom"
import Header from "./include/Header"
import Home from "./Home"
import Flex from "./sub/Flex"

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
<BrowserRouter>
<Header/>
<Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/flex" element={<Flex/>}/>
</Routes>
</BrowserRouter>      
    </>
  )
}

export default App
