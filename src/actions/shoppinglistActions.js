export function setList (list)
{
    return {type: 'SET_LIST', payload: list};
}

export function deleteFromList(id)
{
    return {type: 'DELETE_FROM_LIST', payload: id};
}

