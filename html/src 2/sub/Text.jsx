const Text = () => {
    return(
<>
<div className="container-fluid">
  <div className="row">
<div className="col-md-4">
<h1 className="mt-70 mb-3">
Single Page Application
</h1>
<p>최초 딱 한번만 전체페이지를 불러옵니다<br/>
화면에 바뀔 내용만 JSON형태로 받아서 필요한부분만 스크립트로 갈아끼움
</p>
<p>예전방식 MPA 메뉴를 클릭할때 마다 전체를 다불러옴 새로고침이 된다</p>
</div>
<div className="col-md-4">
<h1 className="mt-70 mb-3">
Route : 주소창의 주소에 따라 보여줄 화면(컴포넌트)를 결정해 주는 내비게이션 시스템
</h1>
<p>BrowserRouter : 라우팅 기능을 제공하는 감싸는 상위 도구</p>
<p>Routes : 여러개의 라우트를 관리하는 컨테이너</p>
<p>Route : 특정 URL경로(path)와 연결된 컴포넌트(element)를 정의</p>
</div>     
<div className="col-md-4">
<h1 className="mt-70 mb-3">HTML(HyperText Markup Language)은 웹 페이지의 '뼈대'를 만드는 언어입니다. 
  쉽게 비유하자면,
  웹 사이트를 집을 짓는 과정이라고 생각하면 이해가 빠릅니다.</h1> 
<p>HTML: 집의 기둥, 벽, 방의 구조(뼈대)를 세우는 작업</p>
<p>CSS: 벽지에 색을 칠하고 가구를 배치하는 인테리어 작업(꾸미기)</p>
<p>JavaScript: 전등 스위치, 자동문, 엘리베이터 등 움직이는 기능(동작)</p>
</div>
  </div>
</div>
</>        
    )
}
export default Text