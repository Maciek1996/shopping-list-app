import { useContext, useEffect, useState } from 'react';
import {Jumbotron, Row, Button, Col} from 'react-bootstrap';
import ShoppingListItem from './ShoppingListItem';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromList, setList } from '../actions/shoppinglistActions';

const ShoppingList = ()  =>
{
    const {tagId} = useParams();
    const [error, setError] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [tag, setTag] = useState(undefined);
    const list = useSelector(state => state.list);
    const dispatch = useDispatch();

    useEffect(() => {
        if (tagId)
        {
            axios.request({url: `/list?tagId=${tagId}`, method: 'get'}).then(response => {dispatch(setList(response.data))}).catch(err => {setError(err)}).finally(()=>{setLoading(false)});
            axios.request({url: `/tags/${tagId}`, method: 'get'}).then(response => {setTag(response.data.tagName)}).catch(err => {setError(err)});
        }
        else
            axios.request({url: '/list', method: 'get'}).then(response => {dispatch(setList(response.data))}).catch(err => {setError(err)}).finally(()=>{setLoading(false)});

    },[]);

    const handleAddNewList = async () =>
    {
        if(window.confirm("Czy chcesz stworzyć nową listę?"))
        {  
            let apiUrl = "";
            if(tagId)
                apiUrl = `/list?tagId=${tagId}`;
            else
                apiUrl ='/list';

            const response = await axios.post(apiUrl).catch(err => setError(err));
            if(response)
            {
                if(response.data.length && window.confirm("Czy chcesz dodać niekupione produkty do listy?"))
                {
                   await axios.request({url: apiUrl, method: 'put', data: response.data, headers: {  accept: 'application/json', 'Content-Type': 'application/json'}}).catch(err => setError(err));
                }
                setLoading(true);
                const newList = await axios.get(apiUrl).catch(err => setError(err)).finally(()=>{setLoading(false)});
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
            let apiUrl = "";
            if(tagId)
                apiUrl = `/list/${id}?tagId=${tagId}`;
            else
                apiUrl =`/list/${id}`;

            axios.request({url: apiUrl, method: 'delete'})
            dispatch(deleteFromList(id));
        }
    }

    return(
    <>
            <Jumbotron  className = "text-center" >
                <h1> Lista Zakupów {tag ?? null}</h1>
            </Jumbotron>
            <Col className ='mb-3 text-center'>
                <Button variant="success" onClick={handleAddNewList} size="lg"> Stwórz nową listę </Button>
            </Col>
            <Row>
            {loading && !list.length ? 'Ładowanie...' : ''}
            {list && list.map(product => <ShoppingListItem Item = {product} onRemove={handleRemove} tagId = {tagId}/>)}
            </Row>
    </>)
}

export default ShoppingList;