import {Link} from 'react-router-dom';
//리액트 부트스트랩 사용
import {
Button, Container, Form, Nav, Navbar, NavDropdown
}from 'react-bootstrap';

const Header = () => {
    return(
<Navbar expand="lg" className='bg-body-tertiary'>
    <Container fluid>

    {/*로고 */}  
    <Navbar.Brand href="/">React</Navbar.Brand>  

    {/*햄버거 메뉴 */}  
    <Navbar.Toggle aria-controls="navbarScroll"/> 

    {/*드롭다운 메뉴 */}
    <Navbar.Collapse id="navbarScroll">

        <Nav
        className='me-auto my-2 my-lg'
        navbarScroll
        >
            <NavDropdown title="UI/UX"
            id="navbarScrollingDropdown"
            >
                <NavDropdown.Item href="/flex">flex</NavDropdown.Item>
                <NavDropdown.Item href="/flexweb">flexweb</NavDropdown.Item>
                <NavDropdown.Item href="/grid">grid</NavDropdown.Item>
                <NavDropdown.Item href="/gridweb">gridweb</NavDropdown.Item>
                <NavDropdown.Item href="/gridtest">gridtest</NavDropdown.Item>
                <NavDropdown.Item href="/layout">layout</NavDropdown.Item>
                <NavDropdown.Divider/>

            </NavDropdown>

            <Nav.Link href="/jsx">JSX</Nav.Link>
            <Nav.Link href="">Components</Nav.Link>
            <Nav.Link href="/class">Class</Nav.Link>
            <Nav.Link href="/props">Props</Nav.Link>
            <Nav.Link href="/event">Event</Nav.Link>
            <Nav.Link href="/forms">Forms</Nav.Link>
            <Nav.Link href="/forms2">Forms2</Nav.Link>
            <Nav.Link href="/router">Router</Nav.Link>
            <Nav.Link href="/hoc">HOC</Nav.Link>
            <Nav.Link href="/trans">transition</Nav.Link>
            <Nav.Link href="/fref">Forward Ref</Nav.Link>
            <Nav.Link href="/portals">portals</Nav.Link>
            <Nav.Link href="/sus">suspense</Nav.Link>
            <Nav.Link href="/hooks">HOOKS</Nav.Link>
            <NavDropdown title="es6"
            id="navbarScrollingDropdown"
            >
                <NavDropdown.Item href="/es6">es6소개</NavDropdown.Item>
                <NavDropdown.Item href="/async">비동기</NavDropdown.Item>
                <NavDropdown.Item href="/function">함수</NavDropdown.Item>
                <NavDropdown.Item href="/recursive">재귀함수</NavDropdown.Item>
                <NavDropdown.Item href="/cate">재귀함수실무</NavDropdown.Item>
                <NavDropdown.Item href="/date">date</NavDropdown.Item>
                <NavDropdown.Item href="/temporal">temporal</NavDropdown.Item>
                <NavDropdown.Item href="/datevstemporal">date vs temporal</NavDropdown.Item>
                <NavDropdown.Divider/>
                <NavDropdown.Item href="/geo">위치기반</NavDropdown.Item>
                <NavDropdown.Item href="/jquery">jquery</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="" disabled>사용하지 않을때</Nav.Link>
        </Nav>

        <Form className='d-flex'>
            <Form.Control
            type="search"
            placeholder='Search'
            className='me-2'
            aria-label="Search"
            />
            <Button variant='outline-success'>
            Search    
            </Button>
        </Form>

    </Navbar.Collapse>

    </Container>
</Navbar>
    )
}
export default Header;
/*
<nav>
<Link to ="/">Home</Link>
<Link to ="/flex">float vs flex vs grid</Link>
<Link to ="/es6">es6 intro</Link>
</nav>
*/