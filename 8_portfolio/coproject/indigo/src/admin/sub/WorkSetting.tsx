import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Layout } from "../../component/layout/Layout"
import * as B from '../css/Sub.styled';

// 🌟 개별 이미지 데이터의 형태를 정의합니다.
interface WorkImage {
    id:number; 
    previewUrl:string; 
    file: File | null; 
}

export const WorkSetting = () => {

// 1줄(4장) 노출할지, 2줄(8장) 노출할지 결정하는 상태입니다. (기본값 2줄)
const [rowCount, setRowCount] = useState<1 | 2>(2);

// 총 8개의 빈 이미지 칸을 미리 만들어 배열 상태로 저장합니다.
const [images, setImages] = useState<WorkImage[]>(
    Array.from({length:8}).map((_, index) =>({
        id:index, previewUrl:'', file:null
    }))
);

//2.조작함수 줄수를 바꾸는 라디오 버튼 핸들러
const handleRowCountChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    // input의 value는 문자열이므로 숫자로 변환해서 상태에 넣습니다.
    setRowCount(Number(e.target.value) as 1 | 2);
}

//🖼️ 파일 선택(업로드) 시 실행되는 핸들러
const handleFileChange = (index:number, e:React.ChangeEvent<HTMLInputElement>) => {
    //사용자가 선택한 파일을 꺼냅니다
    const selectedFile = e.target.files?.[0];

    if(selectedFile) {
        // 선택한 파일을 브라우저 화면에 띄울 수 있도록 가짜(임시) URL을 만듭니다.
        const tempUrl = URL.createObjectURL(selectedFile);
        //기존 이미지 배열을 복사한 뒤, 내가 클릭한 칸(index)의 데이터만 덮어씌웁니다.
        const newImages = [...images];
        newImages[index] = {
            ...newImages[index],
            previewUrl: tempUrl,
            file:selectedFile
        };
        //변경된 배열을 상태레 반영
        setImages(newImages);
    }
};

// ❌ 업로드된 이미지를 취소(삭제)하는 핸들러
const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    //다시 빈 칸으로 초기화합니다.
    newImages[index] = {id:index, previewUrl:'', file:null};
    setImages(newImages);
}

// --- [3. 설정 저장 함수] ---
const handleSave = async () => {
    //🌟 [중요] 진짜 파일(사진)을 보낼 때는 FormData라는 특수한 상자를 써야 합니다!
    const formData = new FormData();
    //1.줄수 데이터를 상자에 담습니다
    formData.append('rowCount', String(rowCount));
    //2. 만약 1줄(4장)을 선택했다면 앞의 4장만, 2줄이면 8장 전체를 잘라냅니다.
    const imagesToSave = rowCount === 1 ? images.slice(0, 4) : images;
    //3. 잘라낸 이미지들을 순서대로 상자에 담습니다
    imagesToSave.forEach((img, index) => {
        if(img.file) {
            formData.append('workImages', img.file);
        }
    });

    try{
await axios.post('http://localhost:5000/api/settings/work', formData, {
   headers:{'Content-Type':'multipart/form-data'} 
});
console.log('저장될 줄수: ', rowCount);
console.log('업로드된 파일들:', formData.getAll('workImages'));
alert('work설정이 성공적으로 저장되었습니다');
    } catch (error) {
console.error('저장 실패: ', error);
alert('설정 저장중 오류가 발생');       
    }    
};
// --- [4. 화면 그리기] ---
const visibleImages = rowCount === 1 ? images.slice(0,4):images;

    return(
        <>
        <Layout>
            <B.PageWrapper>
<B.PageTitle>WORK섹션 환경설정</B.PageTitle>
<B.Card>

<B.SectionTitle>
1.노출 줄수 선택
</B.SectionTitle>

<B.FormGroup>
    <B.RadioGroup>

        <label>
            <input
                type="radio"
                value={1}
                checked={rowCount === 1}
                onChange={handleRowCountChange}            
            />1줄 노출(총 4장)
        </label>

        <label>
            <input
                type="radio"
                value={2}
                checked={rowCount === 2}
                onChange={handleRowCountChange}            
            />2줄 노출(총 8장)
        </label>

    </B.RadioGroup>
</B.FormGroup>

</B.Card> 

<B.Card>
    <B.SectionTitle>2. 포트폴리오 이미지 업로드</B.SectionTitle>
    <B.GridWrap>
{visibleImages.map((img, index) => (
        <B.DivKey key={img.id}>
{/*미리보기 이미지가 있으면 보여주고  없으면 회색 빈박스를 보여줍니다*/} 
{img.previewUrl ?(
    <B.Relative>
        <img src={img.previewUrl} alt={`미리보기 ${index + 1}`}/>
        <button onClick={() => handleRemoveImage}>X</button>
    </B.Relative>
):(
<B.NoneImage>
     이미지 {index + 1}
</B.NoneImage>

)}       
<B.FileUpload
type="file"
accept="image/*"
onChange={(e) => handleFileChange(index, e)}
/>    
        </B.DivKey>
))}
    </B.GridWrap>
</B.Card>

<B.SaveButtonWrap>
    <B.ButtonPrimary
    variant="primary"
    onClick={handleSave}
    >
    설정저장하기
    </B.ButtonPrimary>
</B.SaveButtonWrap>
            </B.PageWrapper>
        </Layout>
        </>
    )
}