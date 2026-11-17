import React,{useState, useEffect} from "react"
import axios from 'axios';
interface FeatureItem{
id:number; icon:string; title:string; 
description:string;
}


export const WeAre = () => {
//상태관리
const [mainTitle, setMainTitle] = useState('');
const [mainDescription, setMainDescription] = useState('');
const [features, setFeatures] = useState<FeatureItem[]>([]);
//생명주기
useEffect(() => {
    const fetchWeAreData = async () => {
    try{
const response = await axios.get('http://localhost:5000/api/settings/weare');
//받아온 데이터를 상태에 넣습니다
setMainTitle(response.data.mainTitle);
setMainDescription(response.data.mainDescription);
setFeatures(response.data.features)    
}catch(error){
console.error('weare데이터를 불러오는 중 에러 발생:', error);
    }
};
fetchWeAreData();
},[]);

    return(
        <>
            <section className="display-section">
                <div className="container">
                    <h2 className="sec-tit">
                        { mainTitle || 'WE ARE'}
                    </h2>
                    <p className="desc">
                        {mainDescription || '관리자 페이지에서 메인 설명글을 등록해 주세요'}
                    </p>
                </div>
            </section>

            <section className="promotion-section">
<div className="container">
    <ul className="promo-list">
{/*features 배열에 데이터가 1개라도 있는지 확인 */}
        {features && features.length > 0 ? (
//데이터 개수 만큼 <li>태그를 반복적으로 만들어 냅니다
features.map((item) => (
<li key={item.id}>
    <a href="">
        <i
        className={item.icon}
        ></i>
        
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        </a>
    </li>
))
        ):(
//등록된 항목이 하나도 없을때 보여줄 기본화면
<li>
<p style={{padding:'50px 0', color:'#999'}}>
    등록된 프로모션 항목이 없습니다
</p>
</li>            
        )}
</ul>
</div>
</section>
        </>
    )
}