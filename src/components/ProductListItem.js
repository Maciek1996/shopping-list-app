import axios from 'axios';
import { useState } from 'react';
import {Card, Row, Col, Button, ButtonGroup, DropdownButton, Dropdown} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import '../customStyle.css';
//import useRequestRest from '../hooks/useRequestRest';

function ProductListItem ({Item, onRemove}) 
{
    const [error, setError] = useState(undefined);
    const history = useHistory();
    const tags = useSelector(state => state.tags);

    const handleAddProduct = (tagId) =>
    {
        if(window.confirm("Czy dodać produkt do listy?"))
        {
            let apiUrl = `/list/${Item.id}`;
            if (tagId)
                apiUrl = `/list/${Item.id}?tagId=${tagId}`;
                
            axios.request({method: 'put', url:apiUrl})
            .then(response => {window.alert("Produkt został dodany do listy zakupów.")})
            .catch(e => {window.alert(e.response.data)})

        }
    }

    const handleEditProduct = () =>
    {
        history.push(`/products/edit/${Item.id}`);
    }

    return(
        <Card>
            <Card.Body>
            <Row>
                <Col>
                <Card.Title> {Item.name} </Card.Title>
                <Card.Text>
                    {Item.description}
                </Card.Text>
                </Col>
                <Col>
                    <ButtonGroup bsPrefix={'input-right-group btn-group'}>
                        <DropdownButton  as={ButtonGroup} title="Dodaj do listy" variant= "success">
                            <Dropdown.Item onClick={handleAddProduct} >Domyślna lista</Dropdown.Item>
                            {tags ? <Dropdown.Divider /> : null}
                            {tags.map(t => <Dropdown.Item onClick={() => handleAddProduct(t.id)}>{t.tagName}</Dropdown.Item>)} 
                        </DropdownButton>
                        <Button variant="primary" onClick={handleEditProduct}>Edytuj</Button>
                        <Button variant="danger" onClick={()=>{onRemove(Item.id)}}>Usuń</Button>
                    </ButtonGroup>
                </Col>
            </Row>
            </Card.Body>
        </Card>);

}

export default ProductListItem;