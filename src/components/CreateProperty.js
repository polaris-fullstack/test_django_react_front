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
import { server_url, propertyTypes, getPropertyName, getPropertyType } from '../constants';


function CreateProperty() {
    
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        object: '',
        description: '',
        type_extra: ''
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
        
        axios.post(`${server_url}/api/properties/`, formData)
            .then(response => {
                console.log('Property created:', response.data);
                window.alert("Property created successfully");
                window.location.href = '/settings';
            })
            .catch(error => {
                console.error('Error creating property:', error);
            });
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 6 }}>
                Create New Property
            </Typography>
            
            <form onSubmit={handleSubmit} >
                <Stack spacing={3}>                    
                    <FormControl fullWidth required>
                        <InputLabel id="object-type-label">Object</InputLabel>
                        <Select
                            labelId="object-type-label"
                            id="object-type"
                            name="object"
                            value={formData.object}
                            label="Object Type"
                            onChange={handleChange}
                        >
                            {objects.map((object) => (
                                <MenuItem value={object.id}>{object.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        required
                        fullWidth
                        label="Property Label"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        variant="outlined"
                    />
                    
                    <FormControl fullWidth required>
                        <InputLabel id="field-type-label">Field Type</InputLabel>
                        <Select
                            labelId="field-type-label"
                            id="field-type"
                            name="type"
                            value={formData.type}
                            label="Field Type"
                            onChange={handleChange}
                        >
                            {propertyTypes.map((property) => (
                                <MenuItem value={property.id}>{property.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {
                        (formData.type == 2 || formData.type == 3) &&
                        <TextField
                            fullWidth
                            label="Extra"
                            name="type_extra"
                            value={formData.type_extra}
                            onChange={handleChange}
                            variant="outlined"
                            placeholder="Enter data list separated by commas(,)"
                        />
                    }                    
                    
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