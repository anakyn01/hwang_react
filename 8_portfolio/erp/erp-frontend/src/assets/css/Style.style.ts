import styled from "styled-components";
import Link from "next/link";

export const Container = styled.div`
display:flex;
justify-content:center;
align-items:center;
min-height:100vh;
padding:2rem;
background-color: ${(props:any) => props.theme?.colors?.background || "#536692"};
`;
export const Card = styled.div`
display:flex;
width:100%;
max-width:1200px;
background:#fff;
border-radius:0.35rem;
box-shadow:0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
overflow:hidden;
`;
export const ImageColumn = styled.div`
width:41.66667%;
background:url("");
@media(max-width:992px){
display:none;
}
`;
export const FormColumn = styled.div`
width:58.33333%;
padding:3rem;
@media(max-width: 992px){
width:100%;
}
`;
export const Title = styled.h1`
text-align:center;
font-size:1.5rem;
color:#3a3b45;
margin-bottom:1.5rem;
font-weight:400;
`;
export const Form = styled.form`
display:flex; flex-direction:column;
gap:1rem;
`;
export const Row = styled.div`
display:flex;
gap:1rem;
@media(max-width: 768px){
flex-direction:column;
}
`;
export const Col = styled.div`
flex:1;
`;
export const Input = styled.input`
width:100%;
padding:0.8rem 1rem;
border:1px solid #d1d3e2;
border-radius:10rem;
outline:none;
transition:border-color 0.15s ease-in-out;
&:focus{
border-color:#bac8f3;
box-shadow:0 0 0 0.2rem rgba(78,115,223,0.25);
}
&[readonly]{
background-color:#eaecf4;
}
`;
export const RadioGroup=styled.div`
display:flex;
align-items:center;
gap:1rem;
padding:0 1rem;
`;
export const RadioLabel=styled.label`
display:flex; align-items:center;
gap:0.3rem;
font-size:.9rem;
color:#6e707e;
cursor:pointer;
`;
export const AddressWrapper = styled.div`
display:flex;
gap:0.5rem;
`;
export const Button = styled.button`
width:100%; padding:0.8rem;
background-color:#4e73df;
color:white;
border:none;
border-radius:10rem;
font-size:0.9rem;
cursor:pointer;
transition:background-color 0.15s ease-in-out;

&:hover{
background-color:#2e59d9;
}
`;
export const SearchButton = styled(Button)`
width:auto; min-width:100px;
background-color:#858796;
&:hover{
background-color:#717384;
}
`;
export const SocialButton = styled.button<{$provider:"google" |"insta"|"kakao"}>`
width:100%;
padding:0.8rem;
margin-bottom:0.5rem;
background-color:${({ $provider}) => ($provider === "insta" ? "#e1306c" : "#FEE500")};
color:${({ $provider }) => ($provider === "insta" ? "white" : "#000")};
border:none;
border-radius:10rem;
font-size:0.9rem;
cursor:pointer;
text-align:center;
`;
export const Divider = styled.hr`
margin:1.5rem 0;
border:0;
border-top:1px solid rgba(0,0,0,0.1);
`;
export const StyledLink = styled(Link)`
display:block;
text-align:center;
font-size:0.875rem;
color:#4e73df;
text-decoration:none;
margin-bottom:0.5rem;
&:hover{
text-decoration:underline;
color:#224abe;
}
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-left: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const CheckboxLabel = styled.label`
  font-size: 0.8rem;
  color: #6e707e;
  cursor: pointer;
`;

export const Description = styled.p`
text-align:center;
font-size:0.875rem;
color:#6e707e;
margin-bottom:1.5rem;
line-height:1.5;
`;

//캘린더
export const CalTopMargin = styled.div`
margin-top:2rem;
`;
export const CalenderWrapper = styled.div`
max-width:1000px;
margin:0 auto; background-color:#fff;
border:1px solid #e0e0e0;
border-radius:20px;
box-shadow:0 4px 6px rgba(0,0,0, 0.5);
`;
export const CalHeader = styled.h2`
text-align:center; font-size:32px; font-weight:700;
margin-bottom:1.5rem; color:#333;
`;
export const Grid = styled.div`
display:grid; 
grid-template-columns: repeat(7, 1fr);
gap:8px;
`;
export const DayName = styled.div`
text-align:center;
font-size:1rem;
padding-bottom:10px;

&:nth-child(1){color: #ff4d4f;}
&:nth-child(7){color: #1890ff;}
}
`;
export const Tooltip = styled.div``;
interface DayCellProps{
$isEmpty?:boolean;
$isToday?:boolean;
$isHoliday?:boolean;
$isSunday?: boolean;   // <--- 추가
$isSaturday?: boolean; // <--- 추가
}

export const DayCell = styled.div<DayCellProps>`
position:relative;
display:flex;
flex-direction:column;
align-items:center;
height:80px;
border-radius:8px;
font-size:1.2rem;
background-color:${({ $isEmpty}) => ($isEmpty ? "transparent" : "#fafafa")};
pointer-events:${({ $isEmpty})=>($isEmpty ? "none" : "auto")};

color:${({ $isHoliday, $isSunday, $isSaturday}) =>{
  if( $isHoliday || $isSunday) return "#ff4d4f";
  if( $isSaturday) return "#1890ff";
  return "#333";
}};

font-weight:${({ $isToday}) => ($isToday ? "bold" :"normal")};
border:${({ $isToday}) => ($isToday ? "2px solid #1890ff":"1px solid transparent")};

&:hover{
background-color:${({ $isEmpty }) => ($isEmpty ? "transparent" : "#f0f0f0")};
}
`;

//mypage
export const CalendarLayout = styled.div`
display:flex; gap:24px;
@media(max-width:1024px) {
flex-direction:column;
}
`;
export const LeftPanel = styled.div`
width:320px;
flex-shrink:0;
@media(max-width:1024px){width:100%;}
`;
export const RightPanel = styled.div`
flex:1; min-width:0;
`;

//sidebar
export const AsideContainer = styled.div`
width:100%;
height:100%;
padding:24px 0;
display:flex;
flex-direction:column;
background-color:#fff;
`;
export const MenuSection = styled.div`
margin-bottom:24px;
`;
export const SectionTitle = styled.h3`
padding:0 24px;
font-size:0.75rem;
font-weight:700;
color:#94a3b8;
margin-bottom:8px;
letter-spacing:0.05em;
`;
export const MenuList = styled.ul`
list-style:none;
padding:0; margin:0;
`;
export const MenuItem = styled(Link)`
display:block;
padding:10px 24px;
color:#475569;
text-decoration:none;
font-size:0.95rem;
font-weight:500;
transition:background-color 0.2s ease, color 0.2s ease;

&:hover{
background-color:#f1f5f9;
color:#2563eb;
border-right:3px solid #2563eb;
}
`;
export const CalendarWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;


//일정모달
export const ModalOverlay = styled.div`
position:fixed;
top:0; left:0;
background:rgba(0,0,0,.8);
width:100%; height:100%;
z-index:99999;
display:flex;
align-items:center;
justify-content:center;
`;
export const ModalContainer =styled.div`
background:#fff;
width:400px;
padding:24px;
border-radius:8px;
box-shadow:0 4px 12px rgba(0,0,0,0.15);
`;
export const ModalHeader = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:1rem;
`;
export const ModalTitle = styled.h3`
font-size:1.2rem;
color:#333;
margin:0;
`;
export const CloseButton = styled.button`
background:transparent;
border:none;
font-size:2rem; font-weight:300;
line-height:1; 
cursor:pointer;
color:#666;
display:flex; align-items:center;
justify-content:center;
transform:rotate(45deg);
transition:transform 0.2s ease, color 0.2s ease;
&:hover{
color:#333;
transform:rotate(135deg);
}
`;
export const ModalBody = styled.div``;
export const FormGroup = styled.div`
display:flex; flex-direction:column;
gap:8px;
margin-bottom:1rem;
`;
export const Select = styled.select`
padding:8px;
border:1px solid #d1d3e2;
border-radius:4px;
outline:none;
font-size:0.9rem;
`;
export const TextArea = styled.textarea`
padding:8px;
border:1px solid #d1d3e2;
border-radius:4px;
outline:none;
resize:none;
height:80px;
`;
export const ButtonGroup = styled.div`
display:flex;
gap:8px;
justify-content:flex-end;
margin-top:16px;
& > button{
width:auto !important;
min-width:80px;
padding:8px 16px !important;
flex:none;
}
`;
export const ScheduleList = styled.ul`
list-style:none;
padding:0;
margin:16px 0 0 0;
max-height:150px;
overflow-y:auto;
border-top:1px solid #eee;
`;
export const ScheduleItem = styled.li`
display:flex;
flex-direction:column;
padding:12px 0;
border-bottom:1px solid #eee;
gap:8px;
`;
export const ScheduleHeader = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
font-size:0.85rem;
color:#666;
`;
export const Badge = styled.span<{$status:"대기"|"진행"|"완료"}>`
padding:4px 8px;
border-radius:12px;
font-size:0.75rem;
font-weight:bold;
color:white;
background-color:${({ $status}) =>
$status === "완료" ? "#10b981" :
$status === "진행" ? "#3B82f6" : "#f59e0b"};
`;
export const SmallButton = styled.button`
width:100px;
background:transparent;
border:1px solid #d1d3e2;
border-radius:4px;
padding:4px 8px;
font-size:0.75rem;
cursor:pointer;

`;
export const ScheduleDot = styled.div`
width:6px;
height:6px;
background-color:#3b82f6;
border-radius:50%;
margin-top:4px;
`;

// 커스텀 셀렉트 박스 컨테이너
export const CustomSelectContainer = styled.div`
position:relative; width:100%;
z-index:100;
`;

export const SelectTrigger = styled.div`
padding:10px 12px;
border:1px solid #d1d3e2;
border-radius:6px;
background-color:#fff;
font-size:0.9rem;
cursor:pointer;
display:flex;
justify-content:space-between;
align-items:center;
color:#333;
&:hover{
border-color:#bac8f3;
}
`;

//드롭다운 리스트 영역
export const SelectList = styled.ul`
position:absolute;
top:100%;
left:0;
width:100%;
margin:4px 0 0 0;
padding:0;
list-style:none;
background:#fff;
border:1px solid #e2e8f0;
border-radius:6px;
box-shadow:0 4px 12px rgba(0,0, 0, 0.1);
z-index:50;
overflow:hidden;
`;
interface SelectItemprops {
  $isSelected?: boolean;
}

//드롭다운 개별 항목
export const SelectItem = styled.li<SelectItemprops>`
padding:10px 12px;
font-size:0.9rem;
cursor:pointer;
color:${({ $isSelected }) => ($isSelected ? '#4e73df' :'#475569')};
background-color:${({ $isSelected}) => ($isSelected ? '#f8f9fc' :'transparent')};
font-weight:${({ $isSelected }) => ($isSelected ? 'bold' :'normal')};
&:hover{
background-color:#f1f5f9;
}
`;