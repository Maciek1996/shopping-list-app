import axios from 'axios';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {Card, Button, Row, Col, InputGroup, FormControl, DropdownButton, Dropdown, ButtonGroup} from 'react-bootstrap'
import '../customStyle.css';

function ShoppingListItem ({Item, onRemove, tagId}) 
{
    const [checked, setChecked] = useState(Item.isBought);
    const [pieces, setPieces] = useState(Item.pieces);
    const [weight, setWeight] = useState(Item.weight);
    //const [change, setChange] = useState(false);
    const [error, setError] = useState(undefined);
    const [type, setType] = useState(Item.type);

    const unitDictionary = {0:"brak", 1:"sztuki", 2:"waga"};

    const firstUpdate = useRef(true);
    //const type = useRef(Item.type);

    useEffect(() =>{
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        let apiUrl = `list/${Item.productId}/state?`;
        if (tagId)
            apiUrl = `list/${Item.productId}/state?tagId=${tagId}&`;

        if(type == 1)
            apiUrl += `pieces=${pieces}`;
        else if (type == 2)
            apiUrl += `weight=${weight}`;

            console.log(Item);
        const result = axios.request({url: apiUrl, method: 'put'}).catch(e => setError(e));

    },[pieces, weight]);
    function handleCheck(event)
    {
        let apiUrl = `list/${Item.productId}/state?isBought=${!checked}`;
        if (tagId)
            apiUrl = `list/${Item.productId}/state?tagId=${tagId}&isBought=${!checked}`;

       setChecked(event.target.checked);
       const result = axios.request({url: apiUrl, method: 'put'}).catch(e => setError(e));
    }

    function handleButtonClick(event)
    {
        if(event.target.id === "button-increase")
        {
            setPieces(pieces + 1);
        }
        else if(event.target.id === "button-decrease")
        {
            setPieces(pieces - 1);
            if(pieces -1 === 0)
            {
                onRemove(Item.id);
                setPieces(1);
            }
            else if (pieces - 1< 0)
            {
                setPieces(-1*(pieces-1));
            }
        }
    }

    function handlePiecesChange(event)
    {
        const number = parseInt(event.target.value, 10);
        if(number && number > 0)
        {
            setPieces(number);
        }
        else if(number === 0)
        {
            onRemove(Item.id);
        }
    }

    function handleWeightChange(event)
    {
        const text = event.target.value;
        if(text.slice(-1) === ".")
        {
            setWeight(text);
        }
        else
        {
            const number = parseFloat(text);
            if(!isNaN(number))
                setWeight(number);
            else
                setWeight(0);
        }
    }

    function handleTypeChange(key)
    {
        const apiUrl = `list/${Item.productId}/state?type=${key}`;
        //type.current = key;
        const result = axios.request({url: apiUrl, method: 'put'}).catch(e => setError(e));
        setType(key);
        //setChange(!change);
    }

    return(
        <Card className= {'card'}>
            <Card.Body>              
                <Row>
                <Col md={{span:"auto"}} sm={{span:"auto"}}  xs={{span:12}}>
                    <Card.Title> 
                        {Item.name}
                    </Card.Title>
                    <Card.Text>
                        {Item.description}
                    </Card.Text>
                </Col>
                <Col sm md lg/>
                { type == 2 ?
                <Col md = {{span: "auto"}} sm = {{span:"auto"}} xs = {{span:"auto"}}>
                    <InputGroup>
                        <FormControl type="text" style = {{width: '60px'}} disabled={checked} value = {weight} onChange={handleWeightChange}/>
                        <InputGroup.Text>{Item.unit}</InputGroup.Text>
                    </InputGroup>
                </Col> : ''}
                { type == 1 ?
                <Col md = {{span: "auto"}} sm = {{span:"auto"}} xs = {{span:"auto"}}>
                    <InputGroup>
                        <Button variant="outline-secondary" id="button-increase" disabled={checked} onClick = {handleButtonClick}>
                            <b>+</b>
                        </Button>
                        <FormControl type="text" style = {{width: '45px'}} disabled={checked} value = {pieces} onChange={handlePiecesChange} />
                        <Button variant="outline-secondary" id="button-decrease" disabled={checked} onClick ={handleButtonClick}>
                            <b>-</b>
                        </Button>
                    </InputGroup>
                </Col> : ''}
                <Col md={{ span: "auto"}} sm={{span:"auto"}} xs ={{span:"auto"}}>
                    <InputGroup className={'input-checkbox'}>
                        <ButtonGroup>
                            <Button variant='danger' disabled={checked} onClick={() => onRemove(Item.productId)}>Usuń z listy</Button>
                            <DropdownButton title={unitDictionary[type]} as={ButtonGroup} disabled={checked}>
                                {Object.entries(unitDictionary).map(([key,value]) => <Dropdown.Item onClick={()=>handleTypeChange(key)}>{value}</Dropdown.Item>)}
                            </DropdownButton>
                        </ButtonGroup>
                        <InputGroup.Checkbox checked={checked} onChange={handleCheck} className = {'checkbox-lg'}/>
                    </InputGroup>
                </Col>
                </Row>
            </Card.Body>
        </Card>
    )

}

export default ShoppingListItem;