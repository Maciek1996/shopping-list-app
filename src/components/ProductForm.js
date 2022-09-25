import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Form, Button, Jumbotron, ButtonGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { addProduct, updateProduct } from "../actions/productActions";
import { GlobalContext } from "../context/GlobalState";
import '../customStyle.css';
//import useRequestRest from "../hooks/useRequestRest";

function ProductFrom()
{
    const {id} = useParams();
    const[product, setProduct] = useState(undefined);
    const[error, setError] = useState(undefined);
    const[originalValue, setOriginalValue] = useState(undefined);
    const history = useHistory();
    const dispatch = useDispatch();

    //const {addProduct, editProduct} = useContext(GlobalContext);
    const handleSubmit = (event) =>
    {
        event.preventDefault();
        if(id)
        {
            if(originalValue !== product.type)
            {
                if(window.confirm("Czy chcesz zmienić typ miary produktu dla wszystkich list?"))
                {
                    axios.request({method: 'put', url: `/products/${id}?changeForAll=true`, data: product, headers: {  accept: 'application/json', 'Content-Type': 'application/json'}}).then(resp => {dispatch(updateProduct(product))}).catch((e) => {setError(e)});
                }
                else
                {
                    axios.request({method: 'put', url: `/products/${id}?changeForAll=false`, data: product, headers: {  accept: 'application/json', 'Content-Type': 'application/json'}}).then(resp => {dispatch(updateProduct(product))}).catch((e) => {setError(e)});
                }
            }
            else
            {
                axios.request({method: 'put', url: `/products/${id}`, data: product, headers: {  accept: 'application/json', 'Content-Type': 'application/json'}}).then(resp => {dispatch(updateProduct(product))}).catch((e) => {setError(e)});
            }
        }
        else
        {
            axios.request({method: 'post', url: '/products', data: product, headers: {  accept: 'application/json', 'Content-Type': 'application/json'}}).then(resp => {dispatch(addProduct(resp.data))}).catch((e) => {setError(e)});
        }

        history.push('/products');
        
    }

    const onValueChange = (event) =>
    {
        setProduct({...product, type: parseInt(event.target.value, 10)});
    }

    const onBack = () => { history.push('/products')}
    
    useEffect(() =>{        
        id && axios.request({method: 'get', url: `/products/${id}`}).then(response => {setProduct(response.data); setOriginalValue(response.data.type)});
    },[])
    

    return(
        <>
        <Jumbotron  className = "text-center" >
        <h1>{id ? 'Edytuj Produkt' : 'Stwórz Produkt'}</h1>
        </Jumbotron>
        <Form onSubmit = {handleSubmit}>
            <Form.Group className="mb-3" controlId="form.Name">
                <Form.Label>Nazwa Produktu: </Form.Label>
                <Form.Control type="text" value = {product && product.name}  onChange={e => setProduct({...product, name: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="form.Textarea">
                <Form.Label>Opis: </Form.Label>
                <Form.Control as="textarea" rows={3} value = {product && product.description} onChange={e => setProduct({...product, description: e.target.value })}  />
            </Form.Group>
            <Form.Group>
                <Form.Label>Sztuki / Waga: </Form.Label>
                <Form.Check name="type" type = "radio" value = "0" checked = {product && product.type === 0} onChange = {onValueChange} label="brak"/>
                <Form.Check name="type" type = "radio" value = "1" checked = {product && product.type === 1} onChange = {onValueChange} label="sztuki"/>
                <Form.Check name="type" type = "radio" value = "2" checked = {product && product.type === 2} onChange = {onValueChange} label="waga"/>
            </Form.Group>
            <ButtonGroup bsPrefix={'input-left-group btn-group'}>
                <Button variant="primary" type="submit" size="lg" >
                    Potwierdź
                </Button>
                <Button variant="secondary" onClick={onBack} size="lg">
                    Anuluj
                </Button>
            </ButtonGroup>
        </Form>
        </>
    )
}
export default ProductFrom;