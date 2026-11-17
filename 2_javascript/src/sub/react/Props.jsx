import React,{useState} from 'react';

//1)자식 컴포넌트
const ProfileCard = ({
userInfo,
isActive,
onToggleStatus,
rightSlot,
children    
}) =>{
return(
<div style={{
    border:`2px solid ${isActive ? '#4caf50' : '#ccc'}`,
    padding:'20px',
    borderRadius:'10px',
    margin: '10px 0',
    opacity:isActive ? 1 : 0.6
}}>
    {/* 헤더 영역: 이름과 우측 슬롯(배지 등) 배치 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>{userInfo.name} ({userInfo.role})</h3>
        {/* 부모가 rightSlot으로 UI를 넘겨주면 여기에 렌더링됨 */}
        <div>{rightSlot}</div> 
      </div>

      <p>이메일: {userInfo.email}</p>

      {/* 부모가 넘겨준 내부 콘텐츠(버튼, 추가 텍스트 등) 렌더링 */}
      <div style={{ margin: '15px 0', padding: '10px', backgroundColor: '#f9f9f9' }}>
        {children}
      </div>

      {/* 부모가 넘겨준 함수(onToggleStatus)를 실행하여 부모의 상태를 변경 */}
      <button onClick={onToggleStatus} style={{ padding: '8px 16px', cursor: 'pointer' }}>
        {isActive ? '비활성화 하기' : '활성화 하기'}
      </button>
</div>    
)
}

const Props = () => {
   // 상태관리는 부모가 전담합니다.
  const [activeUsers, setActiveUsers] = useState({
    user1: true,
    user2: false,
  });

  const toggleUser = (userId) => {
    setActiveUsers(prev => ({ ...prev, [userId]: !prev[userId] }));
  };

  return (
    <div style={{ padding: '30px', maxWidth: '600px' }}>
      <h2>대시보드 (Props 고도화 패턴)</h2>

      {/* 첫 번째 카드: 관리자 프로필 */}
      <ProfileCard 
        userInfo={{ name: '김철수', role: 'Admin', email: 'admin@test.com' }} 
        isActive={activeUsers.user1}
        onToggleStatus={() => toggleUser('user1')}
        rightSlot={<span style={{ background: 'gold', padding: '3px 8px', borderRadius: '5px' }}>👑 최고 관리자</span>}
      >
        {/* children 영역 (태그 사이의 내용) */}
        <p>⚠️ 서버 재시작 권한이 있습니다.</p>
        <button>관리자 전용 설정</button>
      </ProfileCard>

      {/* 두 번째 카드: 일반 유저 프로필 */}
      <ProfileCard 
        userInfo={{ name: '이영희', role: 'User', email: 'user@test.com' }} 
        isActive={activeUsers.user2}
        onToggleStatus={() => toggleUser('user2')}
        rightSlot={<span style={{ background: '#eee', padding: '3px 8px', borderRadius: '5px' }}>일반</span>}
      >
        {/* children 영역 */}
        <p>최근 접속일: 2026-06-20</p>
      </ProfileCard>
    </div>
  ); 
}

export default Props
/*
function Car(props) { //카 라는 컴포넌트 
    return(
        <h2>I am a {props.brand}!</h2>
    )
}
const Props = () => {
    return(
        <>
<h1>내 차고 에는 무슨 차가 있을까?</h1> 
<Car brand="빈폴"/>       
<h1>properties props</h1>
<p>
- props는 속성을 나타냅니다
- react컴포넌트에 전달되는 인자 입니다
- 여러속성을 전달합니다
- 쉽게 비유하면 부모(상급자)가 자식(하급자)에게 업무 지시서와 
재료를 내려줍니다
</p>        
        </>
    )
}
*/