import axios from 'axios';
import { useEffect, useState } from 'react';
import {Card, Button, Row, Col, InputGroup} from 'react-bootstrap'
import '../customStyle.css';

function ShoppingListItem ({Item, onRemove, tagId}) 
{
    const [checked, setChecked] = useState(Item.isBought);
    const [error, setError] = useState(undefined);

    function handleCheck(event)
    {
        let apiUrl = `list/${Item.id}/${!checked}`;
        if (tagId)
            apiUrl = `list/${Item.id}/${!checked}?tagId=${tagId}`;

       setChecked(event.target.checked);
       const result = axios.request({url: apiUrl, method: 'put'}).catch(e => setError(e));
    }


    return(
        <Card className= {'card'}>
            <Card.Body>              
                <Row>
                <Col>
                    <Card.Title> {Item.name}</Card.Title>
                    <Card.Text>
                        {Item.description}
                    </Card.Text>
                </Col>
                <Col>
                <InputGroup bsPrefix = {'input-right-group'}>
                    <Button variant='danger' disabled={checked} onClick={() => onRemove(Item.id)}>Usuń z listy</Button>
                    <InputGroup.Checkbox checked={checked} onChange={handleCheck}  className = {'checkbox-lg'}/>
                </InputGroup>
                </Col>
                </Row>
            </Card.Body>
        </Card>
    )

}

export default ShoppingListItem;