import axios from "axios";
import { useEffect, useState } from "react";
import { Jumbotron, Row, Accordion, Card } from "react-bootstrap";
import PreviousListItem from "./PreviousListItem";

function PreviousLists()
{

    const[lists, setLists] = useState([]);
    const[error, setError] = useState(undefined);
    const[loading, setLoading] = useState(true);
    useEffect(() => {
        axios.request({url: '/lists', method: 'get'}).then(response => {setLists(response.data)}).catch(err => {setError(err)}).finally(()=>{setLoading(false)});
    }, [])
    
    return (
    <>
        <Jumbotron  className = "text-center">
            <h1>Poprzednie Listy Zakupów</h1>
        </Jumbotron>
        {loading && !lists.length ? 'Ładowanie...' : ''}
        <Accordion>
        {lists && lists.map(l => <PreviousListItem data = {l}/>)}
        </Accordion>
    </>);
}

export default PreviousLists;