import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Jumbotron, Row, InputGroup, FormControl, Button ,Col} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import ProductListItem from "./ProductListItem";
import {setProducts, deleteProduct} from '../actions/productActions';

function ProductsList()
{
    const [error,setError] = useState(undefined);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const products = useSelector(state => state.products);
    const dispatch = useDispatch();
    useEffect(() => {
        axios.request({url: '/products', method: 'get'}).then(response => {dispatch(setProducts(response.data))}).catch(err => {setError(err)}).finally(()=>{setLoading(false)});
    },[])

    const handleRemove = (id) =>
    {
        if(window.confirm("Czy chcesz usunąć produkt z listy?"))
        {
            axios.request({url: `/products/${id}`, method: 'delete'});
            dispatch(deleteProduct(id));
        }
    }

    const handleSearch = (e) =>
    {
        setLoading(true);
        axios.request({url: `/products?search=${search}`, method: 'get'}).then(response => {dispatch(setProducts(response.data))}).catch(err => {setError(err)}).finally(()=>{setLoading(false)});
    }

    const handleAddNewProduct = () =>
    {
        history.push(`/products/create`);
    }

    const onChangeSearch = (event) =>
    {
        setSearch(event.target.value);
        if (!event.target.value)
        {
            setLoading(true);
            axios.request({url: '/products', method: 'get'}).then(response => {dispatch(setProducts(response.data))}).catch(err => {setError(err)}).finally(()=>{setLoading(false)});
        }
    }

    return(
    <>
       
        <Jumbotron  className = "text-center">
            <h1>Lista Produktów</h1>
        </Jumbotron>
        <InputGroup className="mb-3">
            <FormControl placeholder="Wyszukaj produkt..." onChange={onChangeSearch}/>
            <Button variant="primary" onClick={handleSearch} size="lg">Szukaj</Button>
        </InputGroup>
        <Col className =' mb-3 text-center'>
            <Button variant="success" onClick={handleAddNewProduct} size="lg"> Dodaj nowy produkt </Button>
        </Col>
        <Row>
            {loading && !products.length ? 'Ładowanie...' : ''}
            {products && products.map(product => <ProductListItem Item = {product} onRemove={handleRemove}/>)}
        </Row>
    </>);
}

export default ProductsList;