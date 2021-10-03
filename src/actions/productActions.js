export function setProducts (products)
{
    return {
        type: 'SET_PRODUCTS',
        payload: products
    };
}

export function deleteProduct (id)
{
    return {
        type: 'DELETE_PRODUCT',
        payload: id
    };
}

export function addProduct (product)
{
    return {
        type: 'ADD_PRODUCT',
        payload: product
    };
}

export function updateProduct (product)
{
    return {
        type: 'UPDATE_PRODUCT',
        payload: product
    };
}
