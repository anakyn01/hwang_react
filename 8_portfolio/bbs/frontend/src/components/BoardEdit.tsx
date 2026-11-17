import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import * as S from '../assets/css/Board.styles';


export const BoardEdit = () => {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const[content, setContent] = useState("");

    const navigate = useNavigate();
    const {id} = useParams<{id:string}>();
    //
    useEffect(() => {
        axios.get(`http://localhost:5000/api/posts/${id}`)
        .then((res) => {
            setTitle(res.data.title);
            setAuthor(res.data.author);
            setContent(res.data.content);
        }).catch((err) => console.error(err))
    },[id]);

    //수정관련
    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();//새로고침 금지

        //유효성 검사
        if(!title || !author || !content) {
            alert('모든 필드를 입력해 주세요');
            return;
        }

        try{
await axios.put(`http://localhost:5000/api/posts/${id}`,{
    title, content, author
});
alert('게시글이 수정되었습니다');
navigate('/');
        }catch(error){
console.error(error);
alert('수정중 오류가 발생했습니다');
        }
    }

    return(
        <>
        <S.FromContainer>
            <h4 className='mb-4'>게시글 수정</h4>
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
수정완료
    </button>
</div>


            </form>
        </S.FromContainer>
        </>
    )
}