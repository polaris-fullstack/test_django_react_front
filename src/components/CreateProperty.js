import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Stack
} from "@mui/material";
import axios from 'axios';
import { server_url } from '../constants';


function CreateProperty() {
    const propertyTypes = [        
        { id: 1, name: 'Single Line Input' },
        { id: 2, name: 'Multi Line Input' },
        { id: 3, name: 'Checkbox' },
        { id: 4, name: 'Dropdown' },
        { id: 5, name: 'Radio' },
        { id: 6, name: 'Date' },
        { id: 7, name: 'Time' },
        { id: 8, name: 'Date and Time' },
        { id: 9, name: 'Number' }        
    ];
    const [formData, setFormData] = useState({
        propertyLabel: '',
        fieldType: '',
        objectType: '',
        description: ''
    });
    const [objects, setObjects] = useState([]);    

    useEffect(() => {
        axios.get(`${server_url}/api/objects/`)
            .then(response => {
                setObjects(response.data);
            })
            .catch(error => {
                console.error('Error fetching objects:', error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
        // You can add API call or other logic here
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 6 }}>
                Create New Property
            </Typography>
            
            <form onSubmit={handleSubmit} >
                <Stack spacing={3}>
                    <TextField
                        required
                        fullWidth
                        label="Property Label"
                        name="propertyLabel"
                        value={formData.propertyLabel}
                        onChange={handleChange}
                        variant="outlined"
                    />
                    
                    <FormControl fullWidth required>
                        <InputLabel id="field-type-label">Field Type</InputLabel>
                        <Select
                            labelId="field-type-label"
                            id="field-type"
                            name="fieldType"
                            value={formData.fieldType}
                            label="Field Type"
                            onChange={handleChange}
                        >
                            {propertyTypes.map((property) => (
                                <MenuItem value={property.id}>{property.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    
                    <FormControl fullWidth required>
                        <InputLabel id="object-type-label">Object</InputLabel>
                        <Select
                            labelId="object-type-label"
                            id="object-type"
                            name="objectType"
                            value={formData.objectType}
                            label="Object Type"
                            onChange={handleChange}
                        >
                            {objects.map((object) => (
                                <MenuItem value={object.id}>{object.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        variant="outlined"
                    />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary"
                            size="large"
                        >
                            Submit
                        </Button>
                    </Box>
                </Stack>
            </form>
        </Box>
    );
}

export default CreateProperty;