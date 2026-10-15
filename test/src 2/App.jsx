import {BrowserRouter, Routes, 
  Route, Link, Outlet}
  from 'react-router-dom';
import reactLogo from './assets/react.svg'

function Home(){return<h1>Home Page</h1>}

function Products(){
  return(
    <div>
      <h1>Products Page</h1>
      <nav>
        <Link to="/products/car">Cars</Link>|
        <Link to="/products/bike">Bikes</Link>
      </nav>
      <Outlet/>
    </div>
  )
}

function BikeProducts(){
  return(
    <div>
      <h2>Bikes</h2>
      <ul>
        <li>Yamaha</li><li>Suzuki</li><li>Honda</li>
      </ul>
    </div>
  )
}

function CarProducts(){
  return(
    <>
    <h2>Cars</h2>
    <ol>
      <li>Audi</li>
      <li>BMW</li>
      <li>Volvo</li>
    </ol>
    </>
  )
}

function App() {
  

  return (
    <>
<BrowserRouter>
<nav>
  <Link to="/">Home</Link>|
  <Link to="/products">Products</Link>|
  <Link to="/contact">Contact</Link>
</nav>
{/* 아래는 라우팅 설정 */} 
<Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/products" element={<Products/>}>
    <Route path="car" element={<CarProducts/>}/>
    <Route path="bike" element={<BikeProducts/>}/>
  </Route>
</Routes>

</BrowserRouter>     
    </>
  )
}

export default App
