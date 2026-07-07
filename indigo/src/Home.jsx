const Home = () => {
    return(
        <section className="content">

            <section className="display-section">
                <div className="container">
                    <h2 className="sec-tit">
                        WE ARE
                    </h2>
                    <p className="desc">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur, quibusdam accusantium vitae neque modi ullam labore iste porro voluptates explicabo.
                    </p>
                </div>
            </section>

            <section className="promotion-section">
<div className="container">
    <ul className="promo-list">

        <li>
            <a href="">
                <img src="src/assets/images/s-images/promo01.png" 
                alt="house icon" />
                <h3>HOME</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa cum deleniti nemo!</p>
            </a>
        </li>

        <li>
            <a href="">
                <img src="src/assets/images/s-images/promo02.png" 
                alt="house icon" />
                <h3>WE ARE</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa cum deleniti nemo!</p>
            </a>
        </li>

        <li>
            <a href="">
                <img src="src/assets/images/s-images/promo03.png" 
                alt="house icon" />
                <h3>WORK</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa cum deleniti nemo!</p>
            </a>
        </li>

        <li>
            <a href="">
                <img src="src/assets/images/s-images/promo04.png" 
                alt="house icon" />
                <h3>BLOG</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa cum deleniti nemo!</p>
            </a>
        </li>

    </ul>
</div>
            </section>

            <hr className="divider"/>

<section className="work-section cfixed">

  <h2 className="sec-tit">WORK</h2>

  <ul className="work-list">
    
    <li>
        <a href="">
            <div className="info">
                <h3>Running</h3>
                <span>WEB/PRINT</span>
            </div>
            <img 
            src="src/assets/images/p-images/work01.jpg" 
            alt="" />
        </a>
    </li>

    <li>
        <a href="">
            <div className="info">
                <h3>Rugby</h3>
                <span>WEB/PRINT</span>
            </div>
            <img 
            src="src/assets/images/p-images/work02.jpg" 
            alt="" />
        </a>
    </li>

    <li>
        <a href="">
            <div className="info">
                <h3>Weight</h3>
                <span>WEB/PRINT</span>
            </div>
            <img 
            src="src/assets/images/p-images/work03.jpg" 
            alt="" />
        </a>
    </li>

    <li>
        <a href="">
            <div className="info">
                <h3>Marathon</h3>
                <span>WEB/PRINT</span>
            </div>
            <img 
            src="src/assets/images/p-images/work04.jpg" 
            alt="" />
        </a>
    </li>

    <li>
        <a href="">
            <div className="info">
                <h3>Boxing</h3>
                <span>WEB/PRINT</span>
            </div>
            <img 
            src="src/assets/images/p-images/work05.jpg" 
            alt="" />
        </a>
    </li>

    <li>
        <a href="">
            <div className="info">
                <h3>Ice Hockey</h3>
                <span>WEB/PRINT</span>
            </div>
            <img 
            src="src/assets/images/p-images/work06.jpg" 
            alt="" />
        </a>
    </li>

    <li>
        <a href="">
            <div className="info">
                <h3>Skate Board</h3>
                <span>WEB/PRINT</span>
            </div>
            <img 
            src="src/assets/images/p-images/work07.jpg" 
            alt="" />
        </a>
    </li>

    <li>
        <a href="">
            <div className="info">
                <h3>Basketball</h3>
                <span>WEB/PRINT</span>
            </div>
            <img 
            src="src/assets/images/p-images/work08.jpg" 
            alt="" />
        </a>
    </li>
  
  </ul>
</section>

<hr className="m-divider"/>

<section className="blog-section">
    <div className="container">
        <h2 className="sec-tit">BLOG</h2>
        <ul className="blog-list">
            
            <li>
                <a href="">
<img src="src/assets/images/p-images/blog01.jpg" alt="" />
<time dateTime="2026-10-30">
    OCT 30, 2026
</time>
<h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, distinctio.</h3>
                </a>
            </li>

            <li>
                <a href="">
<img src="src/assets/images/p-images/blog02.jpg" alt="" />
<time dateTime="2026-10-30">
    OCT 30, 2026
</time>
<h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, distinctio.</h3>
                </a>
            </li>

            <li>
                <a href="">
<img src="src/assets/images/p-images/blog03.jpg" alt="" />
<time dateTime="2026-10-30">
    OCT 30, 2026
</time>
<h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, distinctio.</h3>
                </a>
            </li>
        
        </ul>
    </div>
</section>

<section className="contact-section">
<div className="container">
    <h2 className="sec-tit">CONTACT</h2>
    <div className="form-box">
        <form action="">
            <fieldset className="cfixed">
                <legend className="blind">CONTACT US</legend>
                <div className="form">

                    <label htmlFor="name" className="blind">
                        name
                    </label>
                    <input type="text" id="name" placeholder="Name"/>

                    <label htmlFor="phone" className="blind">
                        phone
                    </label>
                    <input type="tel" id="phone" placeholder="phone"/>

                    <label htmlFor="email" className="blind">
                        email
                    </label>
<input type="email" id="email" placeholder="Email Address"/>
                
                </div>
<div className="textarea">
    <label htmlFor="message" className="blind">
    message
    </label>
<textarea name="message" id="message" placeholder="Message"></textarea>

</div>
</fieldset>

<div className="send-btn">
    <input type="submit" value={"SEND MASSAGE"}/>
</div>

        </form>
    </div>
</div>
</section>

</section>
    )
}
export default Home