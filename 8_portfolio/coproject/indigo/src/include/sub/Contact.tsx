export const Contact =() => {
    return(
        <>
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
        </>
    )
}