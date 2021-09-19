import {Navbar, Nav, Container} from 'react-bootstrap';

function NavigationBar() 
{

    return(        
        <Navbar expand="lg" bg = "dark" variant = "dark">
            <Container fluid>
                <Navbar.Brand>Shopping List</Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse >
                    <Nav className = "me-auto">
                        <Nav.Link href="/list">Lista zakupów</Nav.Link>
                        <Nav.Link href="/products">Produkty</Nav.Link>
                        <Nav.Link href="/lists">Poprzednie listy</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;