import { useContext, useEffect, useState } from 'react';
import {Jumbotron, Row, Button, Col} from 'react-bootstrap';
import ShoppingListItem from './ShoppingListItem';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromList, setList } from '../actions/shoppinglistActions';

const ShoppingList = ()  =>
{
    const [error, setError] = useState(undefined);
    const [loading, setLoading] = useState(true);

    //const{list, getList, deleteFromList} = useContext(GlobalContext);
    const list = useSelector(state => state.list);
    const dispatch = useDispatch();
    useEffect(() => {
        axios.request({url: '/list', method: 'get'}).then(response => {dispatch(setList(response.data))}).catch(err => {setError(err)}).finally(()=>{setLoading(false)});

    },[]);

    const handleAddNewList = async () =>
    {
        if(window.confirm("Czy chcesz stworzyć nową listę?"))
        {
            const response = await axios.get('/list/new').catch(err => setError(err));
            if(response)
            {
                if(response.data.length && window.confirm("Czy chcesz dodać niekupione produkty do listy?"))
                {
                   const request = await axios.request({url: '/list', method: 'post', data: response.data, headers: {  accept: 'application/json', 'Content-Type': 'application/json'}}).catch(err => setError(err));
                }
                setLoading(true);
                const newList = await axios.get('/list').catch(err => setError(err)).finally(()=>{setLoading(false)});
                dispatch(setList([]));
                dispatch(setList(newList.data));
                window.alert("Utworzono nową listę zakupów.")
            }
            if(!response)
            {
                window.alert("Lista jest pusta. Nie można stworzyć nowej listy.");
            }
            
        }
    }
    const handleRemove = (id) =>
    {
        if(window.confirm("Czy chcesz usunąć produkt z listy zakupów?"))
        {
            axios.request({url: `/list/${id}`, method: 'delete'})
            dispatch(deleteFromList(id));
        }
    }

    return(
    <>
            <Jumbotron  className = "text-center" >
                <h1>Lista Zakupów</h1>
            </Jumbotron>
            <Col className ='mb-3 text-center'>
                <Button variant="success" onClick={handleAddNewList} size="lg"> Stwórz nową listę </Button>
            </Col>
            <Row>
            {loading && !list.length ? 'Ładowanie...' : ''}
            {list && list.map(p => <ShoppingListItem Item = {p} onRemove={handleRemove}/>)}
            </Row>
    </>)
}

export default ShoppingList;