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
import { connect, useDispatch, useSelector } from 'react-redux';
import {getProducts} from '../actions/productActions';
import { setTags } from '../actions/tagActions';
import TagsList from './TagsList';
import TagForm from './TagForm';

axios.defaults.baseURL =  'https://ShoppingList.somee.com/api';
//axios.defaults.baseURL =  'http://localhost:51096/api';
function App() 
{
  const[productList, setProductList] = useState([]);
  const[error, setError] = useState(undefined); 
  const[loading, setLoading] = useState(true);
  const dispatch = useDispatch();


  useEffect(() =>
  {
    axios.request({url: '/tags', method: 'get'}).then(response => {dispatch(setTags(response.data))}).catch(err => {setError(err)}).finally(()=>{setLoading(false)});
  },[]);

  return (
    <GlobalProvider>
      <Router>
        <NavigationBar/>
        <Container >
          <Switch>
            <Route path="/" exact component = {ShoppingList}/>
            <Route path="/list" exact component = {ShoppingList}/>
            <Route path="/list/:tagId" component = {ShoppingList}/>
            <Route path="/lists" component = {PreviousLists}/>
            <Route path="/products" exact component = {ProductsList}/>
            <Route path="/products/edit/:id" component = {ProductFrom}/>
            <Route path="/products/create" component = {ProductFrom}/>
            <Route path="/tags" exact component = {TagsList}/>
            <Route path="/tags/edit/:id" component={TagForm}/>
            <Route path="/tags/create" component = {TagForm}/>
          </Switch>
        </Container>
      </Router>
    </GlobalProvider>
  );
}

function mapStateToProps(state)
{
  return {
    products: state.products,
    list: state.list
  }
}

function mapDispatchToProps(dispatch)
{
  return {
    //getProducts: (products) => {dispatch(getProducts(products))},
    dispatch
  }
}

//export default connect(mapStateToProps, mapDispatchToProps)(App);
export default App;
