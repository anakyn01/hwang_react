"use client";

import {useState} from "react";
import { Layout } from "@/components/Layout";
<<<<<<< HEAD
import {Container, Row, Col, Card, Table, Badge, 
Button, InputGroup, Form} from "react-bootstrap";
import '@/assets/css/styles.scss';

interface InventoryItem {
id:string; name:string; category:string;
stock:number; unitPrice:number;
status:"normal" | "low" | "out";
}

export default function inventory(){

const [items, setItems] = useState<InventoryItem[]>([
{ id: "INV-1001", name: "알루미늄 프레임 A형", category: "원자재", stock: 1250, unitPrice: 15000, status: "normal" },
{ id: "INV-1002", name: "공업용 모터 250W", category: "부품", stock: 12, unitPrice: 85000, status: "low" },
{ id: "INV-1003", name: "제어용 메인보드 v2", category: "부품", stock: 0, unitPrice: 120000, status: "out" },
{ id: "INV-1004", name: "포장용 종이박스 (대)", category: "포장재", stock: 5000, unitPrice: 800, status: "normal" },
{ id: "INV-1005", name: "스틸 볼트 M8", category: "소모품", stock: 45, unitPrice: 150, status: "low" },
]);

const renderStatusBadge = (status:string) => {
    switch (status) {
        case "normal":
            return <Badge bg="success" pill className="px-3 py-2">
            정상
            </Badge>;
        case "low":
            return <Badge bg="warning" pill className="px-3 py-2">
            재고부족
            </Badge>; 
        case "out":
            return <Badge bg="danger" pill className="px-3 py-2">
            품절
            </Badge>            ;  
        default:
            return <Badge bg="secondary" pill className="px-3 py-2">
            알수없음
            </Badge>
            ;             
    }
}

return(
<Layout>
    <Container fluid className="py-4 mw1400">
<div 
className="d-flex justify-content-between align-items-center mb-4">
<h2 className="fw-bold text-dark m-0">
재고관리
</h2>
<Button variant="primary" className="fw-bold px-4">
    + 신규 품목 등록
</Button>
</div> 

<Row className="mb-4 g-3">
    <Col md={4}>
<Card className="border-0 shadow-sm h-100">
<Card.Body>
<h6 className="text-muted mb-2">총 등록 품목</h6>
<h3 className="text-primary mb-0 fw-bold">{items.length}개</h3>    
</Card.Body>
</Card>     
    </Col>

<Col md={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <h6 className="text-muted mb-2">재고 부족 / 품절</h6>
                <h3 className="text-danger mb-0 fw-bold">
                  {items.filter(item => item.status !== 'normal').length}건
                </h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <h6 className="text-muted mb-2">총 재고 자산</h6>
<h3 className="text-success mb-0 fw-bold">
₩ {items.reduce((acc, curr) => acc + (curr.stock * curr.unitPrice), 0).toLocaleString()}
</h3>
              </Card.Body>
            </Card>
          </Col>

</Row>


{/* 2. 메인 데이터 테이블 영역 */}
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
            <span className="fw-bold">현재고 현황</span>
            {/* 우측 검색창 */}
            <div style={{ width: "250px" }}>
              <InputGroup size="sm">
                <Form.Control placeholder="품목명 또는 코드 검색..." />
                <Button variant="outline-secondary">검색</Button>
              </InputGroup>
            </div>
          </Card.Header>
          
          <Card.Body className="p-0">
            <Table responsive hover className="align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="px-4 py-3">품목 코드</th>
                  <th className="py-3">품목명</th>
                  <th className="py-3">분류</th>
                  <th className="py-3 text-end">현재고</th>
                  <th className="py-3 text-end">단가 (원)</th>
                  <th className="py-3 text-center">상태</th>
                  <th className="py-3 text-center">관리</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 text-muted"><strong>{item.id}</strong></td>
                    <td className="fw-semibold">{item.name}</td>
                    <td>{item.category}</td>
                    <td className="text-end fw-bold">{item.stock.toLocaleString()}</td>
                    <td className="text-end text-muted">{item.unitPrice.toLocaleString()}</td>
                    <td className="text-center">{renderStatusBadge(item.status)}</td>
                    <td className="text-center">
                      <Button variant="outline-secondary" size="sm" className="me-2">
                        수정
                      </Button>
                      <Button variant="outline-danger" size="sm">
                        삭제
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>




    </Container>
=======

export default function inventory(){
return(
<Layout>
    <></>
>>>>>>> 22c3fff17fb57f93f7f021f3b1250f6d651ac4d9
</Layout>
);
}