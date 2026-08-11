import React,{useState, useEffect} from 'react';
import axios from 'axios';
import * as S from '../DashBoard.styled';
import { Layout } from '../../component/layout/Layout';
import * as B from '../css/Sub.styled';

//메뉴 데이터 타입정의
interface MenuItem {
    id:number; title:string; link:string;
}


export const HeaderSetting = () => {
    //1.로고 타입 설정('text'또는 'image')
    const [logoType, setLogoType] = useState<'text' | 'image'>('text');
    const [logoText, setLogoText] = useState('INDIGO');
    const [logoImage, setLogoImage] = useState('/assets/images/header/logo.png');

    //서브메뉴설정
    const [menus, setMenus] = useState<MenuItem[]>([
        {id:1, title:'HOME', link:'/'},
        {id:2, title:'WE ARE', link:'/weare'},
        {id:3, title:'WORK', link:'/work'},
        {id:4, title:'BLOG', link:'/blog'},
        {id:5, title:'CONTACT US', link:'/contact'},
    ]);

    //함수 메뉴관리 로직
    //새로운 메뉴 행 추가
    const handleAddMenu = () => {
        const newMenu: MenuItem = {
            id:Date.now(), //임시 소유 id부여
            title:'',
            link:""

        };
        setMenus([...menus, newMenu]);
    }
    //특정 메뉴삭제
    const handleRemoveMenu = (id:number) => {
        setMenus(menus.filter(menu => menu.id !== id));
    };

    const handleChangeMenu = (id:number, field:'title' | 'link', value:string) => {
        setMenus(menus.map(menu =>
            menu.id === id ? {...menu, [field]:value}:menu
        ));
    }

    //함수 설정 저장 로직
    const handleSave = async () => {
        const settingData = {
            logoType, logoText, logoImage, menus
        };

        try{
            await axios.post('http://localhost:5000/api/settings/header', settingData);
            console.log('저장될 데이터: ', settingData);
            alert('헤더 설정이 성공적으로 저장되었습니다');
        }catch(error){
            console.error('설정 저장 실패: ', error);
            alert('설정 저장 중 오류가 발생했습니다');
        }
    };
   
  
    return(
        <>
        <Layout>
<B.PageWrapper>
<B.PageTitle>
    헤더(상단바) 환경설정
</B.PageTitle>
{/*1.로고 설정 섹션*/}
<B.Card>
    <B.SectionTitle>1.로고설정</B.SectionTitle>
    <B.FormGroup>
        <label>로고 노출방식</label>
        <B.RadioGroup>
            <label>
                <input
type="radio" name="logoType" value="text"   
checked={logoType === 'text'}
onChange={()=> setLogoType('text')}             
                />글씨(text)로고 사용
            </label>

            <label>
                <input
type="radio" name="logoType" value="image"   
checked={logoType === 'image'}
onChange={()=> setLogoType('image')}             
                />이미지(Image)로고 사용
            </label>
        </B.RadioGroup>
    </B.FormGroup>

    {/*선택한 라디오 버튼에 따라 입력 폼이 다르게 보임 */}
    {logoType === 'text' ? (
        <B.FormGroup>
            <label>글씨 로고 텍스트</label>
            <B.Input
            type="text" value={logoText}
            onChange={(e) => setLogoText(e.target.value)}
            placeholder='예: INDIGO'
            />
        </B.FormGroup>
    ):(
        <B.FormGroup>
            <label>이미지 로고 URL(또는 파일 경로)</label>
            <B.Input
            type="text" 
            value={logoImage}
            onChange={(e) => setLogoImage(e.target.value)}
            placeholder='/assets/images/header/logo.png'
            />
        </B.FormGroup>
    )}
</B.Card>

<B.Card>
    <B.SectionTitle>2.서브메뉴 설정 섹션</B.SectionTitle>
    {menus.map((menu) => (
        <B.MenuRow key={menu.id}>
<B.Input
type="text"
placeholder='메뉴명 (예 :we are)'   
value={menu.title}  
onChange={(e) => handleChangeMenu(menu.id, 'title', e.target.value)}       
/>

<B.Input
type="text"
placeholder='이동링크 (예 :/weare)'   
value={menu.link}  
onChange={(e) => handleChangeMenu(menu.id, 'link', e.target.value)}       
/>
<B.Button variant="danger"
onClick={() => handleRemoveMenu(menu.id)}
>삭제</B.Button>
        </B.MenuRow>
    ))}

    <div style={{marginTop:'15px'}}>
        <B.Button variant="success" onClick={handleAddMenu}>
            + 메뉴 항목 추가
        </B.Button>
    </div>
</B.Card>

{/* 최종 저장 버튼 */}
<B.SaveButtonWrap>
    <B.Button variant='primary' 
    style={{padding:'10px 30px', fontSize:'16px'}}
    onClick={handleSave}>
        설정 저장하기
    </B.Button>
</B.SaveButtonWrap>

</B.PageWrapper>    
        </Layout>
        </>
    )
}

/*
<B.HeaderWrapper>
<B.LogoArea>
    <a href="/">
    {logoType === 'text' ? (
<B.TextLogo>INDIGO</B.TextLogo>
    ):(
<B.ImageLogo src={logoImageUrl} alt="INDIGO Logo"/>
    )}
    </a>
</B.LogoArea>
</B.HeaderWrapper>

 //이미지로고를 선택했을때 보여줄 이미지 경로
    const logoImageUrl = '/assets/images/header/logo.png';

    //우측 서브메뉴 데이터 배열
    const menuItems = [
        {id:1, title:'HOME', link:'/'},
        {id:2, title:'WE ARE', link:'/weare'},
        {id:3, title:'WORK', link:'/work'},
        {id:4, title:'BLOG', link:'/blog'},
        {id:5, title:'CONTACT US', link:'/contact'},
    ]
*/