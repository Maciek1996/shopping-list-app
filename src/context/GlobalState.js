import { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {products: [], list:[]}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => 
{
    const [state, dispatch] = useReducer(AppReducer, initialState)

    const getProducts = (products) =>
    {
        dispatch({type: 'GET_PRODUCTS', payload: products})
    }

    const addProduct = (product) =>
    {
        dispatch({type: 'ADD_PRODUCT', payload: product})
    }
    const editProduct = (product) =>
    {
        dispatch({type: 'EDIT_PRODUCT', payload: product})
    }
    const deleteProduct = (id) =>
    {
        dispatch({type: 'DELETE_PRODUCT', payload: id})
    }
    const getList = (list) =>
    {
        dispatch({type: 'GET_LIST', payload: list})
    }
    const addToList = (product) =>
    {
        dispatch({type: 'ADD_TO_LIST', payload: product})
    }
    const deleteFromList = (id) =>
    {
        dispatch({type: 'DELETE_FROM_LIST', payload: id})
    }

    return (
        <GlobalContext.Provider value={{products: state.products, list: state.list, getList: getList, getProducts: getProducts, addProduct: addProduct, editProduct: editProduct, deleteProduct: deleteProduct, deleteFromList: deleteFromList}}>
            {children}
        </GlobalContext.Provider>
    )
}