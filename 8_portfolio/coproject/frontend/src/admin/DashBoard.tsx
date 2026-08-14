import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {
LineChart, Line, AreaChart, Area, BarChart, Bar, 
PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, 
Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {Layout} from '../component/layout/Layout';
import * as A from './DashBoard.styled';
import {
Container, Row, Col, Button, Card   
} from "react-bootstrap"


export const DashBoard = () => {

    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] =useState(true);

    //파이차트 색상
    const COLORS = ['#4e73df','#e74a3b'];

    useEffect(() => {
const fetchStats = async () => {
try{
const response =
await axios.get('http://localhost:5000/api/statistics');
setStats(response.data);
}catch(error){
console.error('통계 데이터 불러오기 에러:', error);
}finally{
setLoading(false);
}
};
fetchStats();
    },[])

if (loading) return <Layout>
<A.Pd20>
통계 데이터를 불러오는 중입니다...
</A.Pd20>
</Layout> 
if (!stats) return <Layout>
<A.Pd20>
데이터가 없습니다.
</A.Pd20>
</Layout>   
    return(
        <>
        <Layout>
<A.AdminContainer>
    <h1 className='h3 mb-4 text-gray-800 fw-bold'>
       사이트 종합 통계 
    </h1>
    {/*상단 요약 카드 */}
    <Row className='mb-4'>

<Col xl={3} md={6} className='mb-4'>
<Card 
className='border-left-primary shadow h-100 py-2'>
<Card.Body>
    <div 
className="text-xs font-weight-bold text-primary text-uppercase mb-1">
총 문의 / 클레임 량
    </div>
<div 
className="h5 mb-0 font-weight-bold text-gray-800">
{stats.summary.totalInquiries}건    
</div>
</Card.Body>
</Card>
</Col>

<Col xl={3} md={6} className='mb-4'>
<Card className='border-left-success shadow h-100 py-2'>
   <Card.Body>
<div 
className="text-xs font-weight-bold text-success text-uppercase mb-1">
클레임 해결률
</div>
<div className="h5 mb-0 font-weight-bold text-gray-800">
{stats.summary.resolveRate}%
</div>    
    </Card.Body> 
</Card>
</Col>
</Row>

{/*그래프 영역 */}
<Row>
    <Col xl={6} lg={6} className='mb-4'>
<Card className='shadow mb-4'>
<Card.Header className='py-3'>
    <h6 className='m-0 font-weight-bold text-primary'>
   월별 회원 가입 추이(실제 데이터)     
    </h6>
</Card.Header>
<Card.Body>
    <ResponsiveContainer width="100%" height="100%">
<LineChart data={stats.userSignups}>
 <CartesianGrid strokeDasharray="3 3"/>
 <XAxis dataKey="name"/>
 <YAxis/>
 <Tooltip/>
 <Legend/>
 <Line type="monotone" dataKey="가입자수"  stroke="#4e73df" 
 strokeWidth={3} activeDot={{r:8}}/>
</LineChart>
    </ResponsiveContainer>
</Card.Body>
</Card>    
    </Col>

<Col xl={6} lg={6} className='mb-4'>
<Card className='shadow mb-4'>
    <Card.Header className='py-3'>
        <h6 className='m-0 font-weight-bold text-success'>
            주간 접속량 (트래픽)
        </h6>
    </Card.Header>
    <Card.Body>
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats.traffic}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
<Area type="monotone" 
dataKey="접속량" stroke="#1cc88a" fill="#1cc88a"
fillOpacity={0.3}/>
            </AreaChart>
        </ResponsiveContainer>
    </Card.Body>
</Card>
</Col>

{/*일반문의 클레임양 (bar chart)*/}
<Col xl={8} lg={7} className='mb-4'>
<Card className='mb-4'>
    <Card.Header>
        <h6 className='m-0 font-weight-bold text-info'>
            주차별 문의 및 클레임 접수량..
        </h6>

    </Card.Header>
    <Card.Body>
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.inquiriesVsClaims}>
<CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
<Legend/>
<Bar dataKey="일반문의" fill="#36b9cc"/>
<Bar dataKey="클레임" fill="#f6c23e"/>
            </BarChart>
        </ResponsiveContainer>
    </Card.Body>

</Card>
</Col>

<Col xl={4} lg={5} className='mb-4'>
<Card className='shadow mb-4'>
    <Card.Header className='py-3'>
        <h6 className='m-0 font-weight-bold text-danger'>
        문의/클레임 해결 상태 (실제 데이터)    
        </h6>
    </Card.Header>
    <Card.Body>
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
data={stats.claimRate}
cx="50%"
cy="50%"
innerRadius={60}
outerRadius={90}
paddingAngle={5}
dataKey="value"
label                
                >
{stats.claimRate.map((entry:any, index:number) => (
<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/> 
))}                    
                </Pie>
<Tooltip/>
<Legend verticalAlign="bottom" height={36}/>                
            </PieChart>
        </ResponsiveContainer>
    </Card.Body>
</Card>
</Col>

</Row>
</A.AdminContainer>   
        </Layout>
        </>
    )
}

/*
         <A.PageHeader>
                <h1>Dashboard</h1>
                    <a href="#" 
                    className='d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm'>
                    <i className='fas fa-download fa-sm text-white-50'></i>
                    Generate Report
                </a>
            </A.PageHeader>
            <A.GridRow>
                <A.CardColumn>
                    <A.StatCard borderColor="#4e73df">
                        <A.CardBody>
                            <div className="">
<div 
className="text-xs font-weight-bold text-primary text-uppercase mb-1">
Earnings (Monthly)
</div>
<div 
className="h5 mb-0 font-weight-bold text-gray-800">
$40,000
</div>
<div className="col-auto">
<i className='fas fa-calendar fa-2x text-gray-300'></i>
</div>
                            </div>
                        </A.CardBody>
                    </A.StatCard>
                </A.CardColumn>

<A.CardColumn>
    <A.StatCard borderColor='#1cc88a'>
        <A.CardBody>
            <div className="">
<div 
className="text-xs font-weight-bold text-success text-uppercase mb-1">
Earnings (Annual)    
</div> 
<div 
className="h5 mb-0 font-weight-bold text-gray-800">
$215,000
</div>               
            </div>
        </A.CardBody>
    </A.StatCard>
</A.CardColumn>




            </A.GridRow>
*/