import React,{useState} from "react";
import axios from 'axios';

export const Contact =() => {
//상태관리
const [formData, setFormData] = useState({
name:'',phone:'',email:'', message:''
});

//입력값 변경 핸들러
const handleChange = (
e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
const{id, value} = e.target;
setFormData(prev => ({
...prev,
[id]:value
}));
};

//문의 전송 핸들러
const handleSubmit = async (e:React.FormEvent) => {
e.preventDefault();//새로고침 방지

//빈칸검사
if (!formData.name || !formData.phone || 
!formData.email || !formData.message){
alert('모든 항목을 입력해주세요.');
return;
}
try{
//백엔드로 데이터 전송!
await axios.post('http://localhost:5000/api/contacts', formData);
alert('문의가 성공적으로 접수되었습니다. 관리자가 확인 후 답변드리겠습니다!');
// 전송 완료 후 입력칸 깔끔하게 비우기
setFormData({name:'', phone:'', email:'', message:''});
}  catch(error){
console.error('문의 접수 에러:', error);
alert('문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
}  
}

return(
<>
<section className="contact-section">
<div className="container">
<h2 className="sec-tit">CONTACT</h2>
<div className="form-box">
{/* form에 onSubmit 이벤트를 연결합니다. */}        
<form onSubmit={handleSubmit}>
<fieldset className="cfixed">
<legend className="blind">CONTACT US</legend>
<div className="form">

<label htmlFor="name" className="blind">
name
</label>
<input 
type="text" 
id="name" 
name="name"
placeholder="Name"
value={formData.name}
onChange={handleChange}
/>

<label htmlFor="phone" className="blind">
phone
</label>
<input 
type="tel" 
id="phone" 
name="phone"
placeholder="phone"
value={formData.phone}
onChange={handleChange}
/>

<label htmlFor="email" className="blind">
email
</label>
<input 
type="email" 
id="email"
name="email" 
placeholder="Email Address"
value={formData.email}
onChange={handleChange}
/>

</div>
<div className="textarea">
<label htmlFor="message" className="blind">
message
</label>
<textarea 
name="message" 
id="message" 
placeholder="Message"
value={formData.message}
onChange={handleChange}
></textarea>

</div>
</fieldset>

<div className="send-btn">
<input type="submit" value={"SEND MESSAGE"}/>
</div>

</form>
</div>
</div>
</section>
</>
)
}