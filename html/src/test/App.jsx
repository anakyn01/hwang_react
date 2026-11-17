import {
 BrowserRouter,
 Routes,
 Route,
 Link   
} from 'react-router-dom'; //리액트 라우터 dom..

//서브페이지 내용 나열
function Home(){return<h1>홈페이지</h1>}

function About(){return<h1>어바웃페이지이므니다</h1>}

function Contact(){return<h1>콘텍트페이지</h1>}






function App(){
    return(
<>
<BrowserRouter>
<nav>
    <Link to="/">Home</Link> |
    <Link to="/about">About</Link> | 
    <Link to="/contact">Contact</Link> |
</nav>

<Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/contact" element={<Contact/>}/>
</Routes>
</BrowserRouter>
</>        
    )
}

export default App
/*createRoot(document.getElementById('root')).render(
<App/>
);*/