import axios from "axios";
import { useEffect } from "react";
import { Col, Jumbotron, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteTag } from "../actions/tagActions";
import TagListItem from "./TagListItem";

function TagsList ()
{
    const tags = useSelector(state => state.tags);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {

    }, []);

    const handleRemove = (id) =>
    {
        if(window.confirm("Czy chcesz usunąć etykietę z listy?"))
        {
            axios.request({url: `/tags/${id}`, method: 'delete'});
            dispatch(deleteTag(id));
        }

    }

    const handlAddNewTag = () =>
    {
        history.push(`/tags/create`);
    }

    return (
        <>
            <Jumbotron  className = "text-center">
                <h1>Lista Etykiet</h1>
            </Jumbotron>
            <Col className =' mb-3 text-center'>
                <Button variant="success" size="lg" onClick = {handlAddNewTag}> Dodaj nową etykietę </Button>
            </Col>
            <Row>
                {tags.map(tag => <TagListItem Item = {tag} onRemove = {handleRemove}></TagListItem>)}
            </Row>
        </>
    );
}

export default TagsList;