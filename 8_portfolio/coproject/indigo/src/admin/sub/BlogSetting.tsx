import React,{useState, useEffect} from "react";
import axios from 'axios';
import { Layout } from "../../component/layout/Layout"
import * as B from '../css/Sub.styled';

//🌟 블로그 항목 1개의 데이터 형태를 정의합니다.
interface BlogItem {
    id:number;// 고유 식별 번호
    previewUrl:string;// 화면에 보여줄 이미지 미리보기 주소
    file: File | null;// 백엔드로 보낼 실제 이미지 파일
    date:string;// 자동으로 찍힐 작성 시간(날짜)
    text:string;// 관리자가 입력할 블로그 제목/설명글
}

export const BlogSetting = () => {
//블로그를 1줄(3개) 보여줄지, 2줄(6개) 보여줄지 결정하는 상태입니다. (기본값 1줄)
const[rowCount, setRowCount] = useState<1 | 2>(1);
// 총 6개(최대 2줄)의 빈 블로그 칸을 배열로 만들어 상태에 저장합니다.
const [blogs, setBlogs] = useState<BlogItem[]>(
Array.from({length:6}).map((_, index) => ({
    id:index, previewUrl:'', file:null,
    date:'',
    text:''
}))
);

// --- [2. 날짜 자동 생성 함수] ---
const getTodayDate = () => {
    const today = new Date();
    const options:Intl.DateTimeFormatOptions = {
        year:'numeric', month:'short', day:'numeric'
    }; 
    return today.toLocaleDateString('en-US', options).toUpperCase();    
    }
//줄수 (1줄 or 2줄) 변경 시 실행되는 함수
    const handleRowCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRowCount(Number(e.target.value) as 1 | 2);
    };

// 🖼️ 이미지 파일 첨부 시 실행되는 함수
const handleFileChange = (index: number, e:React.ChangeEvent<HTMLInputElement>) => {
// 사용자가 올린 파일을 가져옵니다.
    const selectedFile = e.target.files?.[0];

    if(selectedFile) {
        // 브라우저용 미리보기 URL 생성
        const tempUrl = URL.createObjectURL(selectedFile);
        const newBlogs = [...blogs];//기존 배열 복사
        newBlogs[index] = {
        ...newBlogs[index],
        previewUrl:tempUrl,
        file:selectedFile,
        //이미지를 올리는 순간 '오늘 날짜'가 자동으로 쏙 들어갑니다!
        date:newBlogs[index].date || getTodayDate()
        };
        setBlogs(newBlogs);//변경된 내용 저장
    }
};

// ✏️ 텍스트 입력 시 실행되는 함수
const handleTextChange = (index:number, value:string) => {
    const newBlogs = [...blogs];
    newBlogs[index].text = value;
    //만약 이미지를 안 올리고 글부터 썼다면, 
    // 이때도 '오늘 날짜'를 자동으로 찍어줍니다.
    if(!newBlogs[index].date && value.trim() !== ''){
        newBlogs[index].date = getTodayDate();
    }
    //글을 다 지웠다면 날짜도 다시 비워줍니다
    if(value.trim() === '' && !newBlogs[index].file){
        newBlogs[index].date = '';
    }
    setBlogs(newBlogs);
};

// ❌ 항목 삭제(초기화) 시 실행되는 함수
const handleRemoveBlog = (index: number) =>{
const newBlogs = [...blogs];
//선택한 칸을 완전히 빈칸으로 되돌립니다
newBlogs[index] = {id:index, previewUrl:'', file:null, date:'', text:''};
setBlogs(newBlogs);
}

// --- [4. 설정 저장 함수] ---
const handleSave = async () => {
// 이미지가 포함된 데이터를 보낼 때는 FormData라는 상자를 씁니다.
const formData = new FormData();
//// 몇 줄인지 상자에 담기
formData.append('rowCount', String(rowCount));
//1줄이면 3개, 2줄이면 6개를 잘라서 준비합니다.
const blogsToSave = rowCount === 1 ? blogs.slice(0, 3) : blogs;
// 준비된 데이터를 상자에 차곡차곡 담습니다.
blogsToSave.forEach((blog, index) =>{
    if(blog.file) {
        //이미지가 있으면 'blogImages'라는 이름표를 붙여 상자에 넣습니다.
        formData.append('blogImages', blog.file);        
    }
    //텍스트와 날짜도 짝을 맞추기 위해 배열 형태로 상자에 넣습니다.
    formData.append('blogTexts', blog.text);
    formData.append('blogDates', blog.date);
});
try{
await axios.post('http://localhost:500-/api/settings/blog', formData,{
    headers:{'Content-Type':'multipart/form-data'}
});
console.log('저장될 줄 수:', rowCount);
console.log('저장될 블로그 데이터:',  blogsToSave);
alert('BLOG 설정이 성공적으로 저장 되었습니다');
}catch(error){
console.error('저장 실패:',error);
alert('설정 저장중 오류가 발생했습니다')
}
};
//화면에 보여줄 칸 수를 계산합니다. (1줄 = 3칸, 2줄 = 6칸)
const visibleBlogs = rowCount === 1 ? blogs.slice(0,3):blogs;
    return(
        <>
        <Layout>
            <B.PageWrapper>
                <B.PageTitle>
                    BLOG 섹션 환경 설정
                </B.PageTitle>
                <B.Card>
                    <B.SectionTitle>
                        1.노출 줄수 선택(1줄당 3개)
                    </B.SectionTitle>
                    <B.FormGroup>
                        <B.RadioGroup>
<label>
<input
type="radio" value={1} checked={rowCount === 1}
onChange={handleRowCountChange}                                
/>1줄 노출 (총 3개)
</label>

<label>
<input
type="radio" value={2} checked={rowCount === 2}
onChange={handleRowCountChange}                                
/>2줄 노출 (총 6개)
</label>
                        </B.RadioGroup>
                    </B.FormGroup>
                </B.Card>

<B.Card>
    <B.SectionTitle>
        2. 블로그 항목 등록
    </B.SectionTitle>
    <B.GridWrap3>
        {visibleBlogs.map((blog, index) => (
            <B.BlogKey key={blog.id}>
<B.BlogImgWrap>
    {blog.previewUrl ? (
        <>
        <B.BlogImg 
        src={blog.previewUrl}
        alt={`블로그 이미지 ${index + 1}`}
        />
        <B.Exit
        onClick={() => handleRemoveBlog(index)}
        variant="danger"
        >x</B.Exit>
        </>
    ):(
<B.BottomInfo>
이미지 {index  + 1} 첨부 
</B.BottomInfo>
    )}
    <B.FileUpload
    type="text" value={blog.date}
    readOnly
    placeholder="이미지나 글을 올리면 잘짜가 찍힙니다"
    />
</B.BlogImgWrap>                
            </B.BlogKey>
        ))}
    </B.GridWrap3>
</B.Card>
            </B.PageWrapper>
        </Layout>
        </>
    )
}