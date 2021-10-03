import {Card, Accordion} from 'react-bootstrap';

function PreviousListItem({data})
{

    return(
        <Card>
        <Accordion.Toggle as={Card.Header} eventKey={data.id}>
            {'Lista z dnia: ' + data.creationDate}
          </Accordion.Toggle>
            <Accordion.Collapse eventKey={data.id}>
           <Card.Body>
             <ul>
             {data && data.productLists.map(product => <li>{product.name}: {product.isBought ? "kupiono" : "niekupiono"}</li>)}
             </ul>
            </Card.Body>
             </Accordion.Collapse>
        </Card>
    );
}

export default PreviousListItem;