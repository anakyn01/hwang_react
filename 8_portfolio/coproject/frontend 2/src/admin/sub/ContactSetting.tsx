import React,{useState, useEffect} from "react";
import axios from 'axios';

import { Layout } from "../../component/layout/Layout"
import * as B from '../css/Sub.styled';

// 🌟 DB에서 가져올 문의 내역 1줄의 데이터 형태를 정의합니다.
interface ContactItem {
    id:number;
    name:string;
    phone:string;
    email:string;
    message:string;
    created_at:string;
    is_replied:number;
    //MySQL에서는 true/false 대신 1(완료), 0(대기)으로 저장됩니다.
    action_memo?:string;// 추가된 조치사항 메모 필드
}
export const ContactSetting = () => {
    //--- [1. 상태 관리] ---
    // 문의 내역 리스트를 담을 배열 상태입니다.
const [contacts, setContacts] = useState<ContactItem[]>([]);

// ✅ 체크박스로 선택된 항목들의 ID를 담아둘 배열 상태입니다.
const [selectedIds, setSelectedIds] = useState<number[]>([]);

//--- [2. 데이터 불러오기] ---
//화면이 켜질 때 DB에 저장된 모든 문의 내역을 최신순으로 가져옵니다.
useEffect(() => {
const fetchContacts = async () => {
    try{
const response = await axios.get('http://localhost:5000/api/contacts');
setContacts(response.data);
    }catch(error) {
console.error('문의 내역 불러오기 실패:', error);
    }   
};
fetchContacts();
},[]);

// --- [3. 체크박스 조작 함수들] ---
const handleSelectAll = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.checked){
setSelectedIds(contacts.map(c => c.id));
    }else{
setSelectedIds([]);
    }
}
// 개별 선택 / 해제
const handleSelectOne = (id: number) => {
    if(selectedIds.includes(id)){
setSelectedIds(
selectedIds.filter(selectedId => selectedId !== id)    
);
    }else{
setSelectedIds([...selectedIds, id]);
    }
};
//


//--- [3. 조작 함수들] ---
// 🔄 답변 상태(대기 <-> 완료)를 바꿔주는 함수
const handleToggleReply = async (id:number, currentStatus:number) => {
    // 현재가 0(대기)이면 1(완료)로, 1(완료)이면 0(대기)으로 바꿉니다.
     const newStatus = currentStatus === 1 ? 0 : 1;
    try{
// 백엔드에 상태를 업데이트해달라고 요청합니다.
await axios.put(`http://localhost:5000/api/contacts/${id}/reply`, {
    is_replied:newStatus
});
// 프론트엔드(화면) 배열에서도 해당 항목의 상태만 쏙 업데이트
setContacts(contacts.map(contact =>
contact.id === id ? {...contact, is_replied: newStatus} : contact
));
    } catch (error) {
console.error('상태 변경 에러', error);
alert('상태 변경중 오류가 발생했습니다');
    }
};

// ✅ 조치사항(메모) 입력/수정 함수
const handleUpdateMemo = async (id:number, currentMemo:string | undefined) => {
// 간단하게 브라우저 알림창을 이용해 메모를 입력받습니다.
const newMemo = window.prompt('해당 문의에 대한 조치사항(메모)을 입력해주세요.', 
    currentMemo || '');
// 취소 버튼을 눌렀을 경우 중단
if (newMemo === null) return;
try {
await axios.put(`http://localhost:5000/api/contacts/${id}/memo`,{
    action_memo:newMemo
});
// 화면 즉시 반영
setContacts(contacts.map(contact =>
contact.id === id ? {...contact, action_memo: newMemo} : contact
));
} catch (error) {
console.error('메모 업데이트 에러:', error);
alert('조치사항 저장 중 오류가 발생했습니다.');
}
}

// ❌ 쓸모없는 문의(스팸 등)를 삭제하는 함수
const handleDelete = async (id:number) => {
    // 실수로 누를 수 있으니 경고창을 한 번 띄웁니다.
    if(!window.confirm('정말 이 문의 내역을 삭제하시겠습니까?')) return;
try{
await axios.delete(`http://localhost:5000/api/contact/${id}`);
// 화면에서도 해당 항목을 필터링해서 지워줍니다.
alert('삭제되었습니다')
}catch (error){
console.error('삭제 에러: ', error);
alert('삭제중 오류가 발생했습니다');
}
};

//✅ 선택 삭제 함수 (여러 개 한 번에 지우기)
const handleBulkDelete = async () => {
    if(selectedIds.length === 0) {
        alert('삭제할 항목을 먼저 선택해 주세요');
        return;
    }

    if(!window.confirm(`선택하신 ${selectedIds.length}개의 문의를 한번에 삭제 하시겠습니까`)) 
        return;

    try{
await axios.post(`http://localhost:5000/api/contacts/bulk-delete`,{
    ids:selectedIds
});
// 삭제 성공 시, 화면 배열에서도 선택된 아이디들을 싹 날려줍니다
setContacts(contacts.filter(contact => 
    !selectedIds.includes(contact.id)));
setSelectedIds([]);// 체크박스 초기화
alert('선택한 항목이 모두 삭제 되었습니다');
    }catch (error) {
console.error('선택 삭제 에러: ', error);
alert('선택 삭제 중 오류가 발생했습니다');
    }
};

    return(
        <>
        <Layout>
<B.PageWrapper>
    <B.PageTitle>CONTACT 문의 관리</B.PageTitle>
    <B.Card>
        <B.SpaceBetween>
        <B.SectionTitle>고객 문의 리스트</B.SectionTitle>
<B.ColorButton
bgColor="red"
onClick={handleBulkDelete}
>
    체크 항목 선택삭제
</B.ColorButton>        
        </B.SpaceBetween>
        <B.TList>
            <thead>
                <tr>
                    <th className="text-center">
<input 
type="checkbox" 
onChange={handleSelectAll}  
checked={contacts.length > 0 && selectedIds.length === contacts.length} 
/>                     
                    </th>
                    <th>No</th>
                    <th>이름</th>
                    <th>연락처/이메일</th>
                    <th>문의</th>
                    <th>접수일</th>
                    <th>상태</th>
                    <th>조치사항(메모)</th>
                    <th>관리</th>
                </tr>
            </thead>
            <tbody>
                {contacts.length > 0 ? (
                    contacts.map((contact) => (
                        <tr key={contact.id}>
                        <td>
<input type="checkbox"  
checked={selectedIds.includes(contact.id)}
onChange={() => handleSelectOne(contact.id)}
/>                          
                        </td>
                        <td>{contact.id}</td>
                           <td>{contact.name}</td> 
                        <td>{contact.phone}<br/>{contact.email}</td>
<td>{contact.message.length > 50
? contact.message.substring(0, 50) + '...'
: contact.message}
</td>
<td>
{contact.created_at.substring(0, 10)}
</td>
<td>
<B.StatusText statusColor={contact.is_replied === 1 ? 'blue' : 'red'}>
{contact.is_replied === 1 ? '답변완료' : '답변대기'}    
</B.StatusText>
</td>
<td>
    <button
 onClick={() => handleToggleReply(contact.id, contact.is_replied)}   
    >
{contact.is_replied === 1 ? '대기로 변경' :'완료 처리'}
    </button>
    <button
    onClick={() => handleDelete(contact.id)}
    >
삭제
    </button>
</td>
                        </tr>
                    ))
                ):(
/*데이터가 없을때 띄워줄 화면 */  
<tr>
    <td colSpan={9} style={{textAlign:'center', padding:'30px'}}>
        아직 접수된 문의 내역이 없습니다
    </td>
</tr>                 
                )}
            </tbody>
        </B.TList>
    </B.Card>
</B.PageWrapper>
        </Layout>
        </>
    )
}

/*
    {contact.is_replied === 1 ?(
<span>
    답변완료
</span>
    ):(
<span>
 답변대기
</span>


    )}

*/