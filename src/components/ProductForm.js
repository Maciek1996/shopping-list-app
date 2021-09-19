import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Form, Button, Jumbotron, ButtonGroup } from "react-bootstrap";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import '../customStyle.css';
//import useRequestRest from "../hooks/useRequestRest";

function ProductFrom({history})
{
    const {id} = useParams();
    const[product, setProduct] = useState(undefined);
    const[error, setError] = useState(undefined);
    const [response, setResponse] = useState(undefined);
    //const history = useHistory();
    //const{getProduct} = useRequestRest();

    const {addProduct, editProduct} = useContext(GlobalContext);
    const handleSubmit = (event) =>
    {
        event.preventDefault();
        if(id)
        {
            axios.request({method: 'put', url: `/products/${id}`, data: product, headers: {  accept: 'application/json', 'Content-Type': 'application/json'}}).then(resp => {editProduct(product)}).catch((e) => {setError(e)});
        }
        else
        {
            axios.request({method: 'post', url: '/products', data: product, headers: {  accept: 'application/json', 'Content-Type': 'application/json'}}).then(resp => {addProduct(resp.data)}).catch((e) => {setError(e)});
        }

        history.push('/products');
        //return (<Redirect to="/products" />  );
        
    }

    const onBack = () => { history.push('/products')}
    
    useEffect(() =>{        
        id && axios.request({method: 'get', url: `/products/${id}`}).then(response => {setProduct(response.data)});
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