const Flex = () => {
    return(
        <>
<h1>누가 먼저?</h1>
<p>
- flex : 2009
- Grid : 2011(마이크로소프트)
- 예전만해도 2020년 경에는 주로 flex
우리나라 대형기업들은 다른나라와 마찬가지로 이두개를 섞어 씁니다
- 어떻게 써야 좋은 건가요?
웹사이트의 큰틀(헤더, 사이드바, 본문, 푸터)이거는 grid
그리드안의 작은 구성 요소들(로고와 메뉴 버튼과 아이콘 배치)
등은 flex로
</p>

<h1>float 사용</h1>
    <div className="float">
        <div className="one">1</div>
        <div className="two">2</div>
        <div className="three">3</div>
    </div>
<hr/>
<h1>flex 사용</h1>
    <div className="flex">
        <div className="one">1</div>
        <div className="two">2</div>
        <div className="three">3</div>
    </div>
<hr/>
<h1>grid 사용</h1>
    <div className="grid">
        <div className="one">1</div>
        <div className="two">2</div>
        <div className="three">3</div>
    </div>
<hr/>
        </>
    )
}
export default Flex;