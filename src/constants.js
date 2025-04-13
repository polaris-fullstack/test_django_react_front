export const server_url = "http://localhost:8000";

export const propertyTypes = [        
    { id: 0, name: 'Single Line Input' },
    { id: 1, name: 'Multi Line Input' },
    { id: 2, name: 'Dropdown' },
    { id: 3, name: 'Radio' },
    { id: 4, name: 'Date' },
    { id: 5, name: 'Time' },
    { id: 6, name: 'Date and Time' },
    { id: 7, name: 'Number' }
];

export const getPropertyName = (idx) => {
    return propertyTypes.find(property => property.id === idx)?.name || '';
}

export const getPropertyType = (name) => {
    return propertyTypes.find(property => property.name === name)?.id || 0;
}
