import{BrowserRouter, Routes, Route, Link} from 'react-router-dom'

function Home(){return<h1>hello world</h1>}
function Sub1(){return<h1>sub1</h1>}
function Sub2(){return<h1>sub2</h1>}
function Sub3(){return<h1>sub3</h1>}

const Sub = () => {
    return(
        <>
<BrowserRouter>
<nav>
    <Link to ="/">Home</Link> |
    <Link to ="/sub1">sub1</Link> |
    <Link to ="/sub2">sub2</Link> |
    <Link to ="/sub3">sub3</Link> |
</nav>
<Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/sub1" element={<Sub1/>}/>
    <Route path="/sub2" element={<Sub2/>}/>
    <Route path="/sub3" element={<Sub3/>}/>
</Routes>
</BrowserRouter>
        </>
    )
}

export default Sub