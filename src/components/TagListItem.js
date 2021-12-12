import { Button,ButtonGroup, Card, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function TagListItem ({Item, onRemove})
{
    const history = useHistory();

    const handleEditTag = () =>
    {
        history.push(`/tags/edit/${Item.id}`);
    }

    return (
        <Card>
            <Card.Body>
                <Row>
                    <Col>
                        <Card.Title> {Item.tagName} </Card.Title>
                    </Col>
                    <Col>
                        <ButtonGroup bsPrefix={'input-right-group btn-group'}>
                            <Button variant="primary" onClick={handleEditTag}>Edytuj</Button>
                            <Button variant="danger" onClick={()=> onRemove(Item.id)}>Usuń</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );

}

export default TagListItem;