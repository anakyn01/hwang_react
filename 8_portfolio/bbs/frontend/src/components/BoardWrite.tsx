import{useState} from 'react';
import{useNavigate} from 'react-router-dom';
import axios from 'axios';
import * as S from '../assets/css/Board.styles';

export const BoardWrite = () => {

//사용자가 입력할 '제목','작성자','내용'을 각각 담을 바구니(상태)를 만듭니다
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] =useState('');
    //페이지 이동 기능을 사용하기 위해 navigate함수를 준비
    const navigate = useNavigate(); 

    //등록버튼을 누를때 실행되는 함수
    const handleSubmit = async(e:React.FormEvent) =>{
        //버튼 클릭시 페이지가 새로고침되는 기본 동작을 막습니다
        e.preventDefault();

        //유효성 검사 하나라도 입력 안된곳이 있는지 확인
        if(!title || !author || !content) {
            alert('모든 필드를 입력해 주세요.');//경고창을 뛰우고
            return;//함수를 여기서 종료
        }

        try{
await axios.post('http://localhost:5000/api/posts',{
    title, content, author
});
alert('게시글이 등록되었습니다');
navigate('/');//글 작성이 성공후 본래의 창으로 돌아감
        }catch(error){
console.error(error);//개발자도구 콘솔에는 에러내용을 찍어줌
alert('등록중 오류가 발생');
        }

    };

    return(
        <>
<S.FromContainer>
<h4 className='mb-4'>게시글 작성</h4>
{/*폼이 제출될때(submit)될때 handleSubmit 함수를 실행*/}
<form onSubmit={handleSubmit}>

<div className="mb-3">
    <label htmlFor="" className='form-label'>
        제목
    </label>
    <input
    type="text"
    className='form-control'
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    placeholder='제목을 입력하세요'
    />
</div>

<div className="mb-3">
    <label htmlFor="" className='form-label'>
        작성자
    </label>
    <input
    type="text"
    className='form-control'
    value={author}
    onChange={(e) => setAuthor(e.target.value)}
    placeholder='이름을 입력하세요'
    />
</div>

<div className="mb-3">
    <label htmlFor="" className='form-label'>
        내용
    </label>
    <textarea
    className='form-control'
    rows={5}
    value={content}
    onChange={(e) => setContent(e.target.value)}
    placeholder='내용을 입력하세요'
    >
    </textarea>
</div>

<div className="d-flex justify-content-end gap-2">
    <button 
    className='btn btn-secondary' 
    onClick={()=>navigate('/')}>
        취소
    </button>
    <button type="submit"
    className='btn btn-success'
    >
        등록
    </button>
</div>


</form>
</S.FromContainer>       
        </>
    )
}