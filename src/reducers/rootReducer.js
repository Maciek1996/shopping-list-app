import { combineReducers } from "redux";
import productsReducer  from "./productsReducer";
import productListReducer from "./productListReducer";
import tagReducer from "./tagReducer";

export default combineReducers({products: productsReducer, list: productListReducer, tags: tagReducer});