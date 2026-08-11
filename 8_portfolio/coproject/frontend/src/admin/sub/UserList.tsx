import React,{useState, useEffect} from 'react';
import axios from 'axios';
import * as S from '../DashBoard.styled';
import { Layout } from '../../component/layout/Layout';

//백앤드에서 받아올 데이터의 형태(타입)를 정의
interface User{
    id:number; first_name:string; last_name:string;
    email:string; zip_code:string; address:string;
    detail_address:string;
}

export const UserList:React.FC = () => {
    //회원 목록 데이터를 담을 바구니(상태)입니다. 빈 배열로 시작합니다
    const [users, setUsers] =useState<User[]>([]);
//로딩 상태를 관리
const [loading, setLoading] = useState<boolean>(true);

//페이징처리를 위한 상태추가 현재화면에 보여줄 페이지 번호
const[currentPage, setCurrentPage] = useState<number>(1);
// 한페이지에 보여줄 회원수(10명씩)
const[usersPerPage] = useState<number>(10);
//컴포넌트가 처음 화면에 커질때 백엔드에 데이터를 요청합니다
useEffect(() => {
    const fetchUsers = async () => {
try{
//API주소로 GET요청을 보냅니다
const response = await axios.get('http://localhost:5000/api/users');
//가져온 데이터를 상태에 저장
setUsers(response.data);
}catch(error){
console.error('데이터를 불러오는데 실패했습니다',error);
alert('회원목록을 불러오는중 오류가 발생했습니다')
}finally{
//데이터 로딩이 끝났음을 알립니다
setLoading(false);
}
    }

    fetchUsers();
},[]);//끝에 빈 배열을 []넣어야 처음 한번만 실행됩니다

//페이징
//1현재 페이지의 마지막 회원 인덱스 계산(예:1페이지 * 10 = 10)
const indexOfLastUser = currentPage * usersPerPage;
//2현재 페이지의 첫번째 회원 인덱스 계산(10 -10 = 0)
const indexOfFirstUser = indexOfLastUser - usersPerPage;
//3전체 데이터에서 딱 현재 페이지에 보여줄 만큼만 잘라냄(slice 사용)
const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
//4총페이지수계산(회원23명 / 10 = 2.3 -> 올림해서 3페이지)
const totalPages = Math.ceil(users.length / usersPerPage);
//페이지 번호를 클릭할때 실행될 함수
const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return(
        <>
        <Layout>
        <S.PageWrapper>
            <S.PageTitle>Registered Users</S.PageTitle>
            <p className='mb-4'>
                회원가입시 등록한 사용자들의 전체 리스트
            </p>
            <S.Card>
                <S.CardHeader>
                    <h6>회원리스트 (DataTables)</h6>
                </S.CardHeader>
                <S.CardBody>
                    <div className="table-responsive">
                        <S.StyledTable>
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Zip Code</th>
                                    <th>Address</th>
                                    <th>Detail Address</th>
                                </tr>
                            </thead>
<tbody>
{/*로딩 중일때 보 여줄 UI */}
{loading ? (
    <tr>
        <td colSpan={6} className='text-center'>
            데이터를 불러오는 중입니다...
        </td>
    </tr>
) : users.length === 0 ?(
    <tr>
        <td colSpan={6} className='text-center'>
            등록된 회원이 없습니다
        </td>
    </tr>
):(
    users.map((user, index) =>(
        <tr key={user.id}>
            <td>{index + 1}</td>
            <td>{user.last_name}{user.first_name}</td>
            <td>{user.email}</td>
            <td>{user.zip_code}</td>
            <td>{user.address}</td>
            <td>{user.detail_address}</td>
        </tr>
    ))
)}
</tbody>                            
                        </S.StyledTable>
                    </div>
{/*하단 페이징 */}
{!loading && users.length > 0 &&(
    <nav aria-label="Page navigation">
        <ul className='pagination justify-content-center mt-4'>
<li className={`page-item ${currentPage === 1 ? 'disabled':''}`}> 
    <button
    className='page-link'
    onClick={()=> setCurrentPage(prev => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    >
        이전
    </button>
</li>  

{Array.from({length:totalPages},(_,i) =>(
<li key={i+1} className={`page-item ${currentPage===i+1 ? 'active' : ''}`}>
    <button className='page-link' onClick={() => paginate(i+1)}>
        {i+1}
    </button>
</li>
))}

<li className={`page-item ${currentPage === totalPages ? 'disabled':''}`}> 
    <button
    className='page-link'
    onClick={()=> setCurrentPage(prev => Math.min(prev + 1, totalPages))}
    disabled={currentPage === totalPages}
    >
        다음
    </button>
</li> 
        </ul>
    </nav>
)}




                </S.CardBody>
            </S.Card>
        </S.PageWrapper>
        </Layout>
        </>
    )
}