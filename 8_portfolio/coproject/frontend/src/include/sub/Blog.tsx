import React,{useState, useEffect} from 'react';
import axios from 'axios';

// 🌟 백엔드(DB)에서 받아올 블로그 1개 데이터의 형태
interface BlogItem {
    id:number;
    image_url: string;
    date_str:string;
    text_content:string;
}

// 🌟 백엔드에서 받아올 전체 데이터 묶음 (줄 수 + 블로그 배열)
interface BlogData {
    rowCount: number;
    blogs:BlogItem[];
}


export const Blog = () => {

    const [blogData, setBlogData] = useState<BlogData>({
        rowCount:1, //기본값 1줄
        blogs:[] //기본값 빈 배열
    })

    // --- [2. 데이터 불러오기] ---
    useEffect(() => {
        const fetchBlogData = async () => {
            try{
                const response = await axios.get('http://localhost:5000/api/settings/blog');
                if (response.data) {
                setBlogData({
                    rowCount:response.data.rowCount,
                    blogs:response.data.blogs
                });
}
            }catch(error){
console.error('BLOG 데이터 불러오기 실패:', error);
            }
        }

        fetchBlogData();

    }, []);//화면이 켜질 때 딱 한 번 실행됩니다.

// --- [3. 화면에 보여줄 개수 계산] ---
const itemsToShow = blogData.rowCount === 1 
? blogData.blogs.slice(0, 3)
: blogData.blogs.slice(0, 6); 

    return(
        <>
<section className="blog-section">
    <div className="container">
        <h2 className="sec-tit">BLOG</h2>
        <ul className="blog-list">
{/* 저장된 데이터가 있을 경우 */}   
{itemsToShow.length > 0 ? (
    itemsToShow.map((blog, index) => (        
            <li key={blog.id || index}>
                <a href="#">
<img 
src={blog.image_url ? `http://localhost:5000${blog.image_url}`: ''} 
alt={`블로그 썸네일 ${index  + 1}`}
/>
<time dateTime="2026-10-30">
    {blog.date_str}
</time>
<h3>
{blog.text_content}    
</h3>
                </a>
            </li>
))
):(
<li>
    아직 등록된 블로그 게시물이 없습니다
</li>
)}         
        </ul>
    </div>
</section>        
        </>
    )
}