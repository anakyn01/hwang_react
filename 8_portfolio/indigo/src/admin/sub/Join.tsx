import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import DaumPostcode from 'react-daum-postcode';
import * as S from '../DashBoard.styled';

export const Join = () => {
    const navigate = useNavigate();

    //입력 필드 상태관리
    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[email, setEmail]=useState('');
    const[password, setPassword] = useState('');
    const[repeatPassword, setRepeatPassword] = useState('');

    //주소 관련 상태관리
    const [zipCode, setZipCode] = useState('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

    //다음 주소 검색 완료시에 실행되는 함수
    const handleComplete = (data: any) => {
    //data 변수 안에는 사용자가 선택한 주소에 대한 엄청나게 많은 정보가 들어 있음
        let fullAddress = data.address;
        //fullAddress 변수에 기본주소 (예: 서울특별시 강남구 테헤란로)를 담아둡니다.
        let extraAddress = '';
        //extraAddress는 
        // 추가 주소(예: 괄호 안에 들어갈 동 이름이나 건물 이름)를 담을 빈 바구니입니다.
        if(data.addressType === 'R'){
        /*
        만약 사용자가 선택한 주소가 '도로명 주소(R)'라면 아래 괄호 안의 작업을 시작
        (지번 주소를 선택했다면 이 부분은 무시하고 지나갑니다.) 
        */       
        if (data.addressType !== '') {
            //주소 정보 중에 법정동 이름(예: 역삼동)이 비어있지 않다면,
            extraAddress += data.bname;
            //추가 주소 바구니에 그동 이름을 먼저 쏙 넣습니다
        }

        if(data.buildingName !== ''){
            //건물 이름(예: 스타타워)이 비어있지 않다면,
            extraAddress += extraAddress !== '' ? `,${data.buildingName}` : data.buildingName;
            /*바구니에 아까 넣은 동 이름이 이미 있다면 쉼표를 찍어서 이어 붙이고 (예: 역삼동, 스타타워), 
            바구니가 비어있다면 건물 이름만 넣습니다.
            */           
        }
        fullAddress += extraAddress !== '' ? `(${extraAddress})`:'';
//마지막으로, 추가 주소 바구니에 뭐라도 담겨있다면 기본 주소 뒤에 예쁘게 괄호를 씌워서 합쳐줍니다.
        }
        setZipCode(data.zonecode);//5자리 우편번호
        setAddress(fullAddress);//전체주소
        setIsPostcodeOpen(false);//우편번호 팝업창 닫기
    }

    //회원가입 전송함수
    const handleSubmit = (e:React.FormEvent)=>{
e.preventDefault();
/*html의 폼은 원래 제출버튼을 누르면 웹페이지가 빤짝거린다
새로고침되는 성격을 없애기 위해서
*/
if(password !== repeatPassword) {
    alert('비밀번호가 일치하지 않습니다');
    return;
}
    }

    return(
        <>
<S.Background>
<div className="container">
    <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-0">
            <div className="row">
{/*백그라운드 이미지 */}
<div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
{/* 입력창 설정 */}
<div className='col-lg-7'>
<div className="p-5">
    <div className="text-center">
        <h1 className='h4 text-gray-900 mb-4'>
            Create an Account!
        </h1>
    </div>

<form className="user" onSubmit={handleSubmit}>
    <div className="form-group row">{/*이름 */}

        <div className="col-sm-6 mb-3 mb-sm-0">
            <input type="text" 
            className='form-control form-control-user'
            placeholder='First Name' 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            />
        </div>

        <div className="col-sm-6 mb-3 mb-sm-0">
            <input type="text" 
            className='form-control form-control-user'
            placeholder='Last Name' 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            />
        </div>

    </div>
</form>


</div>
</div>

            </div>
        </div>
    </div>
</div>
</S.Background>       
        </>
    )
}