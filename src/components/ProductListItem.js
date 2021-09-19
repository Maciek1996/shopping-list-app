import axios from 'axios';
import { useState } from 'react';
import {Card, Row, Col, Button, ButtonGroup} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import '../customStyle.css';
//import useRequestRest from '../hooks/useRequestRest';

function ProductListItem ({Item, onRemove}) 
{
    const [error, setError] = useState(undefined);
    const history = useHistory();

    const handleAddProduct = () =>
    {
        axios.request({method: 'post', url: `/list/${Item.id}`}).then(response => {window.confirm("Produkt został dodany do listy zakupów.")}).catch(e => {window.confirm("Produkt jest już na liście zakupów.")})       
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
                        <Button variant="success" onClick={() => handleAddProduct()}>Dodaj do listy</Button>
                        <Button variant="primary" onClick={() => handleEditProduct()}>Edytuj</Button>
                        <Button variant="danger" onClick={()=>{onRemove(Item.id)}}>Usuń</Button>
                    </ButtonGroup>
                </Col>
            </Row>
            </Card.Body>
        </Card>);

}

export default ProductListItem;