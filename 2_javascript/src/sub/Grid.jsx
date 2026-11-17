const Grid = () => {
    return(
        <>
<div className="ContainerFluid">

    <header className="head">
        Header / company logo
    </header>

    <nav className="GridNav">
        <ul>
            <li><a href="#">Link 1</a></li>
            <li><a href="#">Link 2</a></li>
            <li><a href="#">Link 3</a></li>
        </ul>
    </nav>

    <div className="content">
        <h1>Content area</h1>
        <p>567pixels</p>
        <p>Then 576 and 767pixels wide</p>
        <p>767 pixels wide</p>
        <p>responsive effect</p>
    </div>
    <div className="sidebar">Sidebar</div>
    <aside className="ads">Ads</aside>
    <footer className="gridFooter">The footer</footer>
</div>        
        </>
    )
}
export default Grid