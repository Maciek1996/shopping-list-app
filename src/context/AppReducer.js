export default function appReducer (state, action)
{
    switch(action.type)
    {
        case 'GET_PRODUCTS':
            return {
                ...state, products: action.payload
            }
        case 'ADD_PRODUCT':
            return{
                ...state, products: [action.payload, ...state.products]
            }
        case 'EDIT_PRODUCT':
            const updatedProduct = action.payload;
            const updateProducts = state.products.map(product =>{
                if(product.id === updatedProduct.id)
                {
                    return updatedProduct;
                }
                return product;
            })
            return{
                ...state, products: updateProducts
            }
        case 'DELETE_PRODUCT':
            return{
                ...state, products: state.products.filter(product => {
                    return product.id !== action.payload;
                })
            }
        case 'GET_LIST':
            return{
                ...state, list: action.payload
            }
        case 'DELETE_FROM_LIST':
            return{
                ...state, list: state.list.filter(item => {
                    return item.id !== action.payload;
                })
            }
        default:
            return state;
    }
}
