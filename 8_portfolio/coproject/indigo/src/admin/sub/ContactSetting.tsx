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
}
export const ContactSetting = () => {
    //--- [1. 상태 관리] ---
    // 문의 내역 리스트를 담을 배열 상태입니다.
const [contacts, setContacts] = useState<ContactItem[]>([]);
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

    return(
        <>
        <Layout>
<B.PageWrapper>
    <B.PageTitle>CONTACT 문의 관리</B.PageTitle>
    <B.Card>
        <B.SectionTitle>고객 문의 리스트</B.SectionTitle>
        <B.TList>
            <thead>
                <tr>
                    <th>No</th>
                    <th>이름</th>
                    <th>연락처/이메일</th>
                    <th>문의</th>
                    <th>접수일</th>
                    <th>상태</th>
                    <th>관리</th>
                </tr>
            </thead>
            <tbody>
                {contacts.length > 0 ? (
                    contacts.map((contact, index) => (
                        <tr key={contact.id}>
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
    {contact.is_replied === 1 ?(
<span>
    답변완료
</span>
    ):(
<span>
 답변대기
</span>


    )}
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
    <td colSpan={7}>
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