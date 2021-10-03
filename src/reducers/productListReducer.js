export default function productListReducer (state = [], action)
{
    switch(action.type)
    {
        case 'SET_LIST':
            return action.payload;
        case 'DELETE_FROM_LIST':
            return state.filter(product => product.id !== action.payload);
        default:
            return state;
    }
}