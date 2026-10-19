const Header = () => {
    return(
        <>
        <header>
            <div className="row">
                <img src="images/logo.png" 
                alt="Logo" 
                className="style-logo"/>

                <nav className="style-nav">
                    <ul>
<li><a href="#">Architecture</a></li>
<li><a href="#">Travel</a></li>
<li><a href="#">Art</a></li>
<li><a href="#">Food</a></li>                        
                    </ul>
                </nav>
            </div>
        </header>
        </>
    )
}
export default Header;