export function setTags (tags)
{
    return {type: 'SET_TAGS', payload: tags};
}

export function addTag (tag)
{
    return {
        type: 'ADD_TAG',
        payload: tag
    };
}

export function updateTag (tag)
{
    return {
        type: 'UPDATE_TAG',
        payload: tag
    };
}

export function deleteTag(id)
{
    return {
        type: 'DELETE_TAG',
        payload: id
    };
}