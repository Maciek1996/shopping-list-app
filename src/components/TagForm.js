import axios from "axios";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Form, Jumbotron } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addTag, updateTag } from "../actions/tagActions";

function TagForm()
{
    const {id} = useParams();
    const history = useHistory();
    const [tag, setTag] = useState(undefined);
    const dispatch = useDispatch();

    useEffect(() =>{
        id && axios.request({method: 'get', url: `/tags/${id}`}).then(response => {setTag(response.data)});
    }, []);

    const handleSubmit = (event) =>
    {
        event.preventDefault();
        if(id)
        {
            axios.request({method: 'put', url: `/tags/${id}`, data: tag, headers: {  accept: 'application/json', 'Content-Type': 'application/json'}}).then(resp => {dispatch(updateTag(tag))}).catch((e) => {});
        }
        else
        {
            axios.request({method: 'post', url: '/tags', data: tag, headers: {  accept: 'application/json', 'Content-Type': 'application/json'}}).then(resp => {dispatch(addTag(resp.data))}).catch((e) => {});
        }

        history.push('/tags');
    }
    
    const onBack = () =>
    {
        history.push('/tags');
    }

    return(
        <>
        <Jumbotron  className = "text-center" >
            <h1>{id ? 'Edytuj Etykietę' : 'Stwórz Etykietę'}</h1>
        </Jumbotron>
        <Form onSubmit= {handleSubmit}>
            <Form.Group className="mb-3" controlId="form.Name">
                <Form.Label>Nazwa Etykiety: </Form.Label>
                <Form.Control type="text" value = {tag && tag.tagName}  onChange={e => setTag({...tag, tagName: e.target.value })} />
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
    );
}

export default TagForm;