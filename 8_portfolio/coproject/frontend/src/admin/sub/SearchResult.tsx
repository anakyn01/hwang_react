import React,{useState, useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import * as S from '../../component/topbar/Topbar.styled';
import { Layout } from '../../component/layout/Layout';


export const SearchResult = () => {

    const [searchParams] = useSearchParams();
    const keyword = searchParams.get('q');

    const [results, setResults] = useState({ users:[], blogs:[], contacts:[]});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
const fetchResults = async () => {
if(!keyword) return;
setLoading(true);
try{
//
const response = await axios.get(`http://localhost:5000/api/search?q=${keyword}`);
setResults(response.data);
}catch(error){
console.error('검색중 오류 발생:', error);
}finally{
setLoading(false);
}
}
fetchResults();
    },[keyword]);

    return(
        <Layout>
            {/*검색결과 UI */}

    <S.SearchResultWrap>
        <h3>'{keyword}' 검색결과</h3>
{loading ? (
<p>검색 중입니다...</p>
):(
<>
    <S.SearchUserResultWrap>
<h5>회원 ({results.users.length}건)</h5>
{results.users.length === 0 ? <p>검색된 회원이 없습니다.</p>:(
    <ul>
        {results.users.map((user:any) => (
            <li key={user.id}>
                <strong>
                    {user.first_name}
                    {user.last_name}
                </strong>
            </li>
        ))}
    </ul>
)}        
    </S.SearchUserResultWrap>

<S.SearchBlogResultWrap>
    <h5>블로그({results.blogs.length}건)</h5>
    {results.blogs.length === 0? <p>검색된 블로그 글이 없습니다</p> :(
        <ul>
            {results.blogs.map((blog:any) => (
                <li key={blog.id}>
                    <S.DateSpan>
[{blog.date_str}]                        
                    </S.DateSpan>
                    {blog.text_content}
                </li>
            ))}
        </ul>
    )}
</S.SearchBlogResultWrap>

<S.SearchQResultWrap>
    <h5>문의내역({results.contacts.length}건)</h5>
    {results.contacts.length === 0 ? <p>검색된 문의내역이 없습니다.</p>:(
        <ul>
            {results.contacts.map((contact:any) => (
                <li key={contact.id}>
                    <strong>
                        {contact.name}
                    </strong>
                    :{contact.message}
                </li>
            ))}
        </ul>
    )}
</S.SearchQResultWrap>
</>
)}
    </S.SearchResultWrap>

        </Layout>
    )
}