export default function tagReducer (state = [], action)
{
    switch(action.type)
    {
        case 'SET_TAGS':
            return action.payload;
        case 'ADD_TAG':
            return [...state, {...action.payload}];
        case 'UPDATE_TAG':
            return state.map(tag => tag.id === action.payload.id ? action.payload : tag);
        case 'DELETE_TAG':
            return state.filter(tag => tag.id !== action.payload);
        default:
            return state;
    }
}