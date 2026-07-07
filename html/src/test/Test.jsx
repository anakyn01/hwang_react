import{BrowserRouter, Routes, Route, Link} from 'react-router-dom'

function Home(){return<h1>hello world</h1>}
function About(){return<h1>about</h1>}
function Contact(){return<h1>contact</h1>}

const Test = () => {
    return(
        <>
<BrowserRouter>
<nav>
    <Link to ="/">Home</Link> |
    <Link to ="/about">About</Link> |
    <Link to ="/contact">Contact</Link> |
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

export default Test