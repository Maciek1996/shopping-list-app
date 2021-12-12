import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import { useSelector } from 'react-redux';

function NavigationBar() 
{
    const tags = useSelector(state => state.tags);

    return(        
        <Navbar expand="lg" bg = "dark" variant = "dark">
            <Container fluid>
                <Navbar.Brand>Shopping List</Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse >
                    <Nav className = "me-auto">
                        <NavDropdown title = "Listy zakupów">
                            <NavDropdown.Item href="/list">Lista domyślna</NavDropdown.Item>
                            {tags && tags.length > 0 ? <NavDropdown.Divider /> : null}
                            {tags && tags.map(tag => <NavDropdown.Item href={`/list/${tag.id}`}> {tag.tagName} </NavDropdown.Item>)}
                        </NavDropdown>
                        <Nav.Link href="/products">Produkty</Nav.Link>
                        <Nav.Link href="/tags">Etykiety</Nav.Link>
                        <Nav.Link href="/lists">Poprzednie listy</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;