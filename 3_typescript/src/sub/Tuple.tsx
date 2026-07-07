/*1. Type Alias(오브젝트 타입)를 사용한 데이터 구조정의
union Type을 활용하여 롤 제한
*/
type UserRole = 'ADMIN' | 'EDITOR' | 'VIEWER';

//밑에는 튜플사용 정확히 두개의 숫자만 들어갈수 있는 고정 길이배열
type Coordinate =[number, number];
//밑에는 튜플사용 정확히 두개의 문자열만 들어갈수 있는 고정 길이배열
type AccessLog = [string, string];

type UserProfile = {
    id:number; name:string; email:string; role:UserRole;
    phoneNumber?:string; coordinate:Coordinate;
    lastLogin:AccessLog;
}

//2.컴포넌트 Props를 위한 Type정의
type ProfileCardProps = {
    user:UserProfile; onLogout?: () => void;
};
//컴포넌트를 만듭니다
const ProfileCard =({user, onLogout}: ProfileCardProps)=> {
    return(
        <>
    <h3>{user.name}</h3> 
    <p>Email:{user.email}</p> 
    <p>Role:{user.role}</p>  
    <p>
    좌표(Tuple):위도{user.coordinate[0]},경도{user.coordinate[1]}
    </p>
    {user.phoneNumber && <p>{user.phoneNumber}</p>}
    {onLogout && (
       <button 
       onClick={onLogout}
       >
       로그아웃
       </button> 
    )}
        </>
    );
};

const Tuple = () => {

    const sampleUser: UserProfile = {
      id:1,
      name:'황영일',
      email:'hwang@email.com',
      role:'ADMIN',
      coordinate:[37.5, 126.9],
      lastLogin:['2026-06-29','14:00'] 
    }

    return(
        <>
        <ProfileCard user={sampleUser}
        onLogout={() => alert('로그아웃')}
        />
<h1>Tuple</h1>
<p>
- 파이선 : 수정할수 없는 시퀀스 : 한번 생성하면 값을 추가 삭제 
수정할수 없다 (1,2,3) 데이터 무결성 보장(읽기 전용)

- 타입스크립트에서 튜플은 : 배열의 특별한 형태 특정위치에 특정타입의 
데이터가 와야 함을 강제합니다 [1,2,3] 수정가능  
타입 엄격성이 핵심이다
</p>
        </>
    )
}
export default Tuple;