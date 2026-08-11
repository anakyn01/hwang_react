import React, {useState, useEffect} from "react";
import axios from 'axios';
import * as S from '../../assets/css/front.styled';

// 🌟 백엔드에서 받아올 데이터의 형태를 정의합니다.
interface WorkImage {
    id:number;
    previewUrl:string;
}

interface WorkData {
    rowCount: number;
    images:WorkImage[];
}
export const Work = () => {
    const [workData, setWorkData] = useState<WorkData>({
        rowCount:2,
        images:[]
    })

    useEffect(() => {
        const fetchWorkData = async () => {
try{
// 백엔드(포트 5000)에서 WORK 설정 데이터를 가져옵니다.
const response = await axios.get('http://localhost:5000/api/settings/work');
//성공적으로 가져왔다면 상태에 쏙
if(response.data) {
    setWorkData({
        rowCount:response.data.rowCount,
        images:response.data.images
    });
}
}catch(error){
console.error('WORK 데이터 불러오기 실패:', error);
}
        }
fetchWorkData();
    },[]);

// --- [3. 화면에 보여줄 이미지 계산하기] ---
// 백엔드에서 8장을 다 줬더라도, 
// 관리자가 '1줄'로 설정했다면 4장만 잘라서 보여줍니다.
const imagesToShow = workData.rowCount === 1
? workData.images.slice(0, 4)
: workData.images.slice(0, 8);

    return(
        <>
<S.WorkSection>
<S.Container>
    <S.SectionTitle>WORK</S.SectionTitle>
    <S.GridWrap>
        {imagesToShow.length > 0 ? (
imagesToShow.map((img, index) => (
    <S.GridItem key={img.id}>
        <S.Workimg
src={`http://localhost:5000${img.previewUrl}`}
alt={`Work Portfolio ${index + 1}`}        
        />
    </S.GridItem>
))
        ):(
            <S.EmptyState>
                아직 등록된 포트폴리오가 없습니다.
            </S.EmptyState>
        )


        }
    </S.GridWrap>
</S.Container>
</S.WorkSection> 

        </>
    )
}

/*
       <section className="work-section cfixed">

  <h2 className="sec-tit">WORK</h2>

  <ul className="work-list">
    
    <li>
        <a href="">
            <div className="info">
                <h3>Running</h3>
                <span>WEB/PRINT</span>
            </div>
            <img 
            src="src/assets/images/p-images/work01.jpg" 
            alt="" />
        </a>
    </li>

    <li>
        <a href="">
            <div className="info">
                <h3>Rugby</h3>
                <span>WEB/PRINT</span>
            </div>
            <img 
            src="src/assets/images/p-images/work02.jpg" 
            alt="" />
        </a>
    </li>

    <li>
        <a href="">
            <div className="info">
                <h3>Weight</h3>
                <span>WEB/PRINT</span>
            </div>
            <img 
            src="src/assets/images/p-images/work03.jpg" 
            alt="" />
        </a>
    </li>

    <li>
        <a href="">
            <div className="info">
                <h3>Marathon</h3>
                <span>WEB/PRINT</span>
            </div>
            <img 
            src="src/assets/images/p-images/work04.jpg" 
            alt="" />
        </a>
    </li>

    <li>
        <a href="">
            <div className="info">
                <h3>Boxing</h3>
                <span>WEB/PRINT</span>
            </div>
            <img 
            src="src/assets/images/p-images/work05.jpg" 
            alt="" />
        </a>
    </li>

    <li>
        <a href="">
            <div className="info">
                <h3>Ice Hockey</h3>
                <span>WEB/PRINT</span>
            </div>
            <img 
            src="src/assets/images/p-images/work06.jpg" 
            alt="" />
        </a>
    </li>

    <li>
        <a href="">
            <div className="info">
                <h3>Skate Board</h3>
                <span>WEB/PRINT</span>
            </div>
            <img 
            src="src/assets/images/p-images/work07.jpg" 
            alt="" />
        </a>
    </li>

    <li>
        <a href="">
            <div className="info">
                <h3>Basketball</h3>
                <span>WEB/PRINT</span>
            </div>
            <img 
            src="src/assets/images/p-images/work08.jpg" 
            alt="" />
        </a>
    </li>
  
  </ul>
</section>

*/