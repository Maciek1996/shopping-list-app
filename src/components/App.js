import '../App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import NavigationBar from './NavigationBar';
import ShoppingList from './ShoppingList';
import ProductsList from './ProductsList';
import PreviousLists from './PreviousLists';
import ProductFrom from './ProductForm';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { GlobalProvider } from '../context/GlobalState';

axios.defaults.baseURL = 'http://ShoppingList.somee.com/api'; //'http://localhost:51096/api'; 
function App() 
{
  const[productList, setProductList] = useState([]);
  const[error, setError] = useState(undefined); 
  const[loading, setLoading] = useState(true);


  useEffect(() =>
  {
    //axios.request({url: '/list', method: 'get'}).then(response => {setProductList(response.data)}).catch(err => {setError(err)}).finally(()=>{setLoading(false)});
  },[]);

  return (
    <GlobalProvider>
      <Router>
        <NavigationBar/>
        <Container >
          <Switch>
            <Route path="/" exact component = {ShoppingList}/>
            <Route path="/list" component = {ShoppingList}/>
            <Route path="/lists" component = {PreviousLists}/>
            <Route path="/products" exact component = {ProductsList}/>
            <Route path="/products/edit/:id" component = {ProductFrom}/>
            <Route path="/products/create" component = {ProductFrom}/>
          </Switch>
        </Container>
      </Router>
    </GlobalProvider>
  );
}

export default App;
