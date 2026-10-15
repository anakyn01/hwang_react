const Header = () => {
    return(
        <>
<nav className="navbar navbar-expand-sm bg-light fixed-top">
    <div className="container-fluid">
        
        <a href="/" className="navbar-brand">html5</a>
        <button 
        className="navbar-toggler" 
        data-bs-toggle="collapse"
        data-bs-target="#mynavbar"
        >
<span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav me-auto">
                <li className="nav-item">
                    <a href="/tag" className="nav-link">
                    tag list
                    </a>
                </li>
                <li className="nav-item">
                    <a href="/forms" className="nav-link">
                    forms
                    </a>
                </li>
                <li className="nav-item">
                    <a href="/block" className="nav-link">
                    block
                    </a>
                </li>
                <li className="nav-item">
                    <a href="/inline" className="nav-link">
                    inline
                    </a>
                </li>
                <li className="nav-item">
                    <a href="/media" className="nav-link">
                    media
                    </a>
                </li>
                <li className="nav-item">
                    <a href="/iframe" className="nav-link">
                    iframe
                    </a>
                </li>
            </ul>
        </div>


    </div>
</nav>
        </>
    )
}
export default Header;