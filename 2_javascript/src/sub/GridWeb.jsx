const GridWeb = () => {
    return(
        <>
<div className="wrap">
    
    <header className="w-header">
Header / company logo
    </header>

    <nav className="w-nav">
            <ul>
                <li>Link 1</li>
                <li>Link 2</li>
                <li>Link 3</li>
            </ul>
        </nav>

    <main className="w-content">
        <h1>Content area</h1>
        <p>화면 크기를 조절하여 레이아웃 변화를 확인하세요</p>
    </main>

    <aside className="w-sidebar">
    Sidebar
    </aside>

     

    <div className="w-ads">ads</div>

    <footer className="w-footer">the footer</footer>

   
</div>        
        </>
    )
}
export default GridWeb