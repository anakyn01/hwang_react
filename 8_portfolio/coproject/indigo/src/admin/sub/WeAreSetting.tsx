import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {Layout} from '../../component/layout/Layout';
import * as B from '../css/Sub.styled';

//특징 박스
interface FeatureItem{
id:number; icon:string; title:string; description:string;
}

export const WeAreSetting = () => {
    //--- [1. 상태 관리] 화면에 보여주고 바꿀 데이터들 ---
// [상단 메인 영역] 큰 제목("WE ARE") 상태입니다.
const [mainTitle, setMainTitle] = useState('WE ARE');
// [상단 메인 영역] 제목 옆에 들어가는 긴 설명글 상태입니다.
const [mainDescription, setMainDescription] = useState('여기에 메인 설명을 입력하세요')
// [하단 특징 영역] 4개의 아이콘 박스들을 담아둘 '배열' 상태입니다.
const [features, setFeatures ] = useState<FeatureItem[]>([]);

/*
관리자가 선택할 수 있는 아이콘 목록을 미리 만들어 둡니다.
*/
const iconOptions = [
{value:'fas fa-home', label:'집(Home)'},
{value:'fas fa-users', label:'사람들(Users/Team)'},
{value:'fas fa-th-large', label:'그리드(Work)'},
{value:'fas fa-pen', label:'펜(Blog)'},
{value:'fas fa-envelope', label:'편지봉투(Contact)'},
{value:'fas fa-check', label:'체크마크 (Check)'},
];

//--- [2. 데이터 불러오기] 처음에 딱 한 번 실행 ---
useEffect(() => {
    const fetchWeAreData = async () => {
        try{
const response = await axios.get('http://localhost:5000/api/settings/weare');
setMainTitle(response.data.mainTitle);
setMainDescription(response.data.mainDescription);
setFeatures(response.data.features);
        }catch (error){
console.error('데이터 불러오기 실패:', error);
        }
    };
    fetchWeAreData();
},[]);

//➕ 새로운 특징 박스를 1개 추가하는 함수입니다.
const handleAddFeature = () => {

    const newFeature: FeatureItem = {
        id: Date.now(),
        icon:'fas fa-home',
        title:'',
        description:''
    };
    // 기존 배열 뒤에 새 항목을 붙여넣습니다.
    setFeatures([...features, newFeature]);
};

//특정 특징 박스를 삭제하는 함수
const handleRemoveFeature = (id:number) => {
// 삭제버튼을 누른 항목의 id와 '다른' 
// 것들만 남겨서 새 배열을 만듭니다. (즉, 누른 것만 사라짐)   
    setFeatures(features.filter(item => item.id !== id));
}
//수정
const handleChangeFeature = (id:number, field:'icon' | 'title' | 'description', value:string) => {
    //배열을 돌면서, 내가 수정하고 있는 칸
    // (id가 일치함)의 데이터만 쏙 바꿔줍니다.
    setFeatures(features.map(item =>
item.id === id ? {...item, [field]:value} : item
    ));
}

//--- [4. 설정 저장 함수] ---
const handleSave = async () => {
    // 보낼 데이터를 하나의 객체로 묶습니다.
    const settingData = {
        mainTitle,
        mainDescription,
        features
    }
    try{
await axios.post('http://localhost:5000/api/settings/weare', settingData);
console.log('저장될 데이터:',settingData);
alert('WE ARE 섹션 설정이 성공적으로 저장되었습니다!')
    }catch(error){
console.error('저장 실패:', error);
alert('저장중 오류가 발생했습니다')
    }
};

    return(
        <>
        <Layout>
<B.PageWrapper>
    <B.PageTitle>
      WE ARE 섹션 환경설정  
    </B.PageTitle>
    <B.Card>
        <B.SectionTitle>1. 메인 타이틀 및 설명 설정</B.SectionTitle>

        <B.FormGroup>
            <label>메인 큰 제목 (예: WE ARE)</label>
            <B.Input
                type="text" value={mainTitle}
                onChange={(e) => setMainTitle(e.target.value)}
                placeholder='WE ARE'           
            />
        </B.FormGroup>

        <B.FormGroup>
            <label>우측 메인 설명글</label>
            <B.Input
                type="text" value={mainDescription}
                onChange={(e) => setMainDescription(e.target.value)}
                placeholder='lorem ipsum..'           
            />
        </B.FormGroup>
    
    </B.Card>

     <B.Card>
        <B.SectionTitle>2. 하단 아이콘 항목 관리</B.SectionTitle>

        {features.map((item, index) => (
<div className=""
key={item.id}
style={{ borderBottom: '1px dashed #eee', paddingBottom:'15px',
marginBottom:'15px'}}
>
<div className="my-3"
style={{ fontWeight:'bold', color:'#888', minWidth:'70px'}}
>
                    <span>항목{index + 1}</span>
{/* 🌟 대망의 아이콘 셀렉트(드롭다운) 박스입니다. */}
<select
className='mx-3'
value={item.icon}
onChange={(e) => handleChangeFeature(item.id, 'icon', e.target.value)}
style={{ padding:'8px', border:'1px solid #ccc', borderRadius:'4px'}}
>
{iconOptions.map(opt => (
    <option key={opt.value} value={opt.value}>
        {opt.label}
    </option>
))}
</select>
          <B.Input
type="text" value={item.title}
onChange={(e) => handleChangeFeature(item.id, 'title', e.target.value)}
placeholder='소제목 (예: HOME)'           
            />
{/* 삭제 버튼입니다. */}
<B.Button variant='danger'
onClick={() => handleRemoveFeature(item.id)}
className='mx-3'
>삭제</B.Button>
</div>

<div>
<B.Input
    type="text" value={item.description}
    onChange={(e) => setMainDescription(e.target.value)}
    placeholder='하단 설명글을 입력하세요'           
/>
</div>
            </div>
        ))}

   {/*새로운 항목 추가 버튼 */}    
   <div>
    <B.Button variant="success"
    onClick={handleAddFeature}
    >
+ 아이콘 항목 추가
    </B.Button>
   </div>
    
    </B.Card>

{/*최종 저장 버튼 */}
<B.SaveButtonWrap>
    <B.Button variant='primary'
    onClick={handleSave}
    >
    설정저장하기
    </B.Button>
</B.SaveButtonWrap>

</B.PageWrapper>
        </Layout>
        </>
    )
}