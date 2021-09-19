import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Jumbotron, Row, InputGroup, FormControl, Button ,Col} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import ProductListItem from "./ProductListItem";

function ProductsList()
{
    //const {getProducts} = useRequestRest();
    //const [products, setProducts] = useState([]);
    const [error,setError] = useState(undefined);
    const [search, setSearch] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    //const {response, error} = useAxios({url:'/products', method: 'get'});
    const{products, getProducts, deleteProduct} = useContext(GlobalContext);
    useEffect(() => {
        axios.request({url: '/products', method: 'get'}).then(response => { getProducts(response.data);}).catch(err => {setError(err)}).finally(()=>{setLoading(false)});
    },[])

    const handleRemove = (id) =>
    {
        if(window.confirm("Czy chcesz usunąć produkt z listy?"))
        {
            axios.request({url: `/products/${id}`, method: 'delete'});
            deleteProduct(id);
        }

    }

    const handleSearch = (e) =>
    {
        setLoading(true);
        axios.request({url: `/products?search=${search}`, method: 'get'}).then(response => {getProducts(response.data)}).catch(err => {setError(err)}).finally(()=>{setLoading(false)});
    }

    const handleAddNewProduct = () =>
    {
        history.push(`/products/create`);
    }

    return(
    <>
       
        <Jumbotron  className = "text-center">
            <h1>Lista Produktów</h1>
        </Jumbotron>
        <InputGroup className="mb-3">
            <FormControl placeholder="Wyszukaj produkt..." onChange={(e) => setSearch(e.target.value)}/>
            <Button variant="primary" onClick={handleSearch} size="lg">Szukaj</Button>
        </InputGroup>
        <Col className =' mb-3 text-center'>
            <Button variant="success" onClick={() => handleAddNewProduct()} size="lg"> Dodaj nowy produkt </Button>
        </Col>
        <Row>
            {loading && !products.length ? 'Ładowanie...' : ''}
            {products && products.map(p => <ProductListItem Item = {p} onRemove={handleRemove}/>)}
        </Row>
    </>);
}

export default ProductsList;