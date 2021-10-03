import { combineReducers } from "redux";
import productsReducer  from "./productsReducer";
import productListReducer from "./productListReducer";

export default combineReducers({products: productsReducer, list: productListReducer});