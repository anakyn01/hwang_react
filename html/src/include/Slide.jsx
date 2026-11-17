const Slide = () => {
    return (
        <div id="demo" className="carousel slide" data-bs-ride="carousel">
            {/* 인디케이터 */}
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
            </div>

            {/* 슬라이드 이미지 */}
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="/img/la.jpg" alt="Los Angeles" className="d-block w-100" />
                </div>
                <div className="carousel-item">
                    <img src="/img/chicago.jpg" alt="Chicago" className="d-block w-100" />
                </div>
                <div className="carousel-item">
                    <img src="/img/ny.jpg" alt="New York" className="d-block w-100" />
                </div>
            </div>

            {/* 이전/다음 버튼 */}
            <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
<span className="carousel-cotrol-prev-icon"></span>               
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
<span className="carousel-cotrol-next-icon"></span>               
            </button>
        </div>
    )
}
export default Slide