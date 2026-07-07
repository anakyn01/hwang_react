const FlexWeb = () => {
    return(
        <>
<div className="banner">
    <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam?</h4>
</div>

<header className="Header">
    <h1>My Website</h1>
    <p>With a <b>flexible</b> layout </p>
</header>

<nav className="Navbar">
    <a href="#">Link</a>
    <a href="#">Link</a>
    <a href="#">Link</a>
    <a href="#">Link</a>
</nav>

<div className="fluid">

<aside className="side">
    <h2>About me</h2>
    <h5>Photo of me</h5>
    <div className="fakeimg h-200">
        Image
    </div>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo natus vel accusamus.</p>
    <h3>More Text</h3>
    <p>Lorem ipsum dolor sit amet.</p>
    <div className="fakeimg h-60">Image</div><br/>
    <div className="fakeimg h-60">Image</div><br/>
    <div className="fakeimg h-60">Image</div>
</aside>

<main className="main">
    <h2>TITLE HEADING</h2>
    <h5>Title description, Oct 7, 2025</h5>
    <div className="fakeimg h-200">Image</div>
    <p>Some ...</p>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid consectetur necessitatibus quasi laboriosam quidem harum vitae nobis culpa distinctio quaerat.</p>
<br/>
<h2>TITLE HEADING</h2>
<h5>Title description, Sep 2, 2025</h5>
<div className="fakeimg h-200">Image</div>
<p>Some text..</p>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus maxime ipsam in amet id, rerum laudantium aut maiores illum eveniet!</p>
</main>

</div>

<footer className="Footer">
    <h2>Footer</h2>
</footer>
        </>
    )
}
export default FlexWeb