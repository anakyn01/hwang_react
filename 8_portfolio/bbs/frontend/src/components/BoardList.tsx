import {useEffect, useState} from 'react';
//리액트의 핵심기능 상태관리 생명주기 에 훅을 가져옵니다
import axios from 'axios';
//서버와 통신하기 위한 배달원 역활을 하는 도구
//수정버튼 이동용
import { useNavigate } from 'react-router-dom';
import * as S from '../assets/css/Board.styles';

//데이터의 설계도 interface
interface Post{
    id:number; title:string; author:string;
    created_at:string;
}

//컴포넌트의 상태와 데이터 가져오기 (logic)
export const BoardList = () => {
/*[변수명, 변수를 바꾸는 함수] = useState<데이터모양>(초기값)
서버에서 받아올 게시글 목록을 저장할 바구니를 만듭니다
처음에는 빈배열
*/
const[posts, setPosts] = useState<Post[]>([]);

//오늘 만들었던 페이징을 위한 상태추가
const[currentPage, setCurrentPage] = useState(1);
const[totalPages, setTotalPages] = useState(1);

//이동함수
const navigate = useNavigate();


const fetchPosts = (page: number) => {
    axios.get(`http://localhost:5000/api/posts?page=${page}`)
    .then((res) => {
        setPosts(res.data.posts);
        setTotalPages(res.data.totalPages);
        setCurrentPage(res.data.currentPage);
    }).catch((err) => console.error(err));
};

useEffect(() => {
    fetchPosts(currentPage);
}, [currentPage]);

//추가된 부분 삭제기능 함수
const handleDelete = async(id:number) => {
    if(window.confirm('정말 삭제 하시겠습니까')){
        try{
await axios.delete(`http://localhost:5000/api/posts/${id}`);
alert('삭제되었습니다');
fetchPosts(currentPage);//삭제후 새로곪;
        }catch(error){
            console.error(error);
            alert('삭제 실패');
        }
    }
}

/*화면이 처음 나타났을때 딱 한번 실행되는 구역 페이징을 안넣을경우
useEffect(() => {
axios.get('http://localhost:5000/api/posts')//5000번 포트에 게시글 줘..
.then((res) => setPosts(res.data))//성공하면 받아온 데이터를 바구니에 담습니다
.catch((err) => console.error(err));
},[]);//뒤의 []는 처음 하번만 실행하라는 뜻*/

{/*화면 그리기 (render) */}
    return(
        <>

    <div className="d-flex justify-content-between mb-3">
        <h1>게시글 목록</h1>
        <S.CustomButton to="/write">글쓰기</S.CustomButton>
    </div>

    <table className='table table-hover table-bordered text-center'>
        <colgroup>
            <col style={{width:"10%"}}/>
            <col style={{width:"40%"}}/>
            <col style={{width:"15%"}}/>
            <col style={{width:"15%"}}/>
            <col style={{width:"20%"}}/>
        </colgroup>
        <thead className='table-light'>
            <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>관리</th>
            </tr>
        </thead>
        <tbody>
            {posts.map((post) => (
                <tr key={post.id}>
                {/*리액트가 각각의 줄을 구분할수 있게 고유한 id를 줍니다*/}
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td>{post.author}</td>
                    <td>{new Date(post.created_at).toLocaleDateString()}</td>
                    <td>
                        <button
                        className='btn btn-sm btn-outline-primary me-2'
                        onClick={()=> navigate(`/edit/${post.id}`)}
                        >수정</button>
                        <button
                        className='btn btn-sm btn-outline-danger'
                        onClick={()=> handleDelete(post.id)}
                        >삭제</button>
                    </td>
                </tr>
            ))}
            {/*만약 게시글이 없다면 보여줄 화면 입니다 */}
            {posts.length === 0 &&(
                <tr>
                    <td colSpan={4}>
                        게시글이 없습니다
                    </td>
                </tr>
            )}
        </tbody>
    </table>
  
  {/*페이징 */}
  <nav>
    <ul className='pagination justify-content-center mt-4'>

<li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
    <button className='page-link' onClick={() => setCurrentPage(currentPage - 1)}>
이전
    </button>
</li>

{Array.from({length: totalPages},(_, i) => i +1).map((page) =>(
    <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
     <button className='page-link' onClick={() => setCurrentPage(page)}>
        {page}
     </button>
    </li>
))}

<li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
    <button className='page-link' onClick={() => setCurrentPage(currentPage + 1)}>
다음
    </button>
</li>

    </ul>
  </nav>
        </>
    )
}