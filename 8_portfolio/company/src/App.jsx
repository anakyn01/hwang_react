import Header from "./include/Header"
import Footer from "./include/Footer"

function App() {
 
  return (
    <>
<Header/>

<main>

<div className="row">
  <div className="col">
    <div className="hero">
      <h3>Editor's Choice</h3>
      <h4>Sebastian Weiss</h4>
      <h1>Urban Strorkes</h1>
      <a href="#" className="button">Read More</a>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col-md-one-half">
    <div className="info-box-tan">
      <h2>Inspring Reads</h2>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum, est doloribus</p>
      <a href="" className="button">Read More</a>
    </div>
  </div>
  <div className="col col-md-one-half">
    <div className="info-box-dark">
      <h2>Reflections</h2>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum, est doloribus</p>
      <a href="" className="button">Read More</a>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col-md-one-half col-lg-one-fourth">
    <img src="images/gallery-1.jpg" alt="" />
  </div>
  <div className="col col-md-one-half col-lg-one-fourth">
    <img src="images/gallery-2.jpg" alt="" />
  </div>
  <div className="col col-md-one-half col-lg-one-fourth">
    <img src="images/gallery-3.jpg" alt="" />
  </div>
  <div className="col col-md-one-half col-lg-one-fourth">
    <img src="images/gallery-4.jpg" alt="" />
  </div>
</div>

</main>

<Footer/>      
    </>
  )
}

export default App
