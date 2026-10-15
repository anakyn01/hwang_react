import React, {useState} from "react";
import { Container, Row, Col, Button 
} from "react-bootstrap"

//1.데이터 구조 (재귀적 데이터)
const categoryData = [
{name:"IT 기기",
    children:[
        {name:"노트북",children:[{name:"맥북"},{name:"그램"}]},
        {name:"스마트폰",children:[{name:"iPhone"},{name:"Galaxy"}]}
    ]
},
{
    name:"의류",
    children:[{name:"상의"},{name:"하의"}]
}
];

//핵심 자기가 폴더인지 파일인지 스스로판단해서 화면에 나타냅니다
const CategoryItem = ({item}) => {

    //현재폴더가 열려있는지(true) 닫혀있는지(false)기억하는 스위치

    const [isOpen, setIsOpen] =useState(false);

    return(
        <>
<Container>
<Row>
    <Col>    
    <div className="">
        <div onClick={() => setIsOpen(!isOpen)}>
{/*클릭하면 스위치를 반대로 바꿉니다 열려잇으면 닫고 닫혀 있으면 열고 
자식이 있나요?
네(폴더임) 지금열려있나요?열려있으면 ▼ 닫혀있으면 ▶
아니오 파일임 -> 그냥 동그라미 표시 •
*/}            
        {item.children ? (isOpen ? '▼ ' : '▶ ') : '• '}  
        {item.name}   {/*그리고 그옆에 이름을 적어줍니다 */}       
        </div>
    </div>

    {/*3 재귀호출 하위 항목이 있다면 자기 자신을 다시 렌더링 
1) 만약 폴더가 열려있고  2)그안에 자식이 있다면 아래 코드를 실행하세요   
    
    
    */}
{isOpen && item.children &&(
   <div className="">
    {item.children.map((child, index) =>(
        <CategoryItem key={index} item={child}/>
    ))}{/*핵심 재귀호출 자식들을 하나씩 꺼내서 다시 자기자신에게 넘겨줍니다 */}
   </div> 
)}

    </Col>
</Row>
</Container>        
        </>
    )
}


//메인페이지 컴포넌트 위에 사항들을 화면에 보여주는 실행파일
const Cate = () => {
    return(
        <div className="">
            <h2>재귀적 카테고리 메뉴</h2>
            {categoryData.map((item, index) =>(
                <CategoryItem key={index} item={item}/>                
            ))}
        </div>
    )
}
/*
<CategoryItem key={index} item={item}/> 꺼낸 데이터를 
CategoryItem 이라는 공장에 넣어서 화면에 그렬달라고 주문
*/





export default Cate;