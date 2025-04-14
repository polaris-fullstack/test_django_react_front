export const server_url = "http://localhost:8000";

export const propertyTypes = [        
    { id: 0, name: 'Single Line Input', type: 'text' },
    { id: 1, name: 'Multi Line Input', type: 'text' },
    { id: 2, name: 'Dropdown', type: 'select' },
    { id: 3, name: 'Radio', type: 'radio' },
    { id: 4, name: 'Date', type: 'date' },
    { id: 5, name: 'Time', type: 'time' },
    { id: 6, name: 'Date and Time', type: 'datetime-local' },
    { id: 7, name: 'Number', type: 'number' }
];

export const getPropertyName = (idx) => {
    return propertyTypes.find(property => property.id === idx)?.name || '';
}

export const getPropertyId = (name) => {
    return propertyTypes.find(property => property.name === name)?.id || 0;
}

export const getPropertyType = (id) => {
    return propertyTypes.find(property => property.id === id)?.type || '';
}

