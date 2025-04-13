import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  Stack
} from "@mui/material";

function CreateProperty() {
    const [formData, setFormData] = useState({
        propertyLabel: '',
        fieldType: '',
        objectType: '',
        description: ''
    });

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
                            <MenuItem value="text">Text</MenuItem>
                            <MenuItem value="number">Number</MenuItem>
                            <MenuItem value="date">Date</MenuItem>
                            <MenuItem value="boolean">Boolean</MenuItem>
                            <MenuItem value="select">Select</MenuItem>
                        </Select>
                    </FormControl>
                    
                    <FormControl fullWidth required>
                        <InputLabel id="object-type-label">Object Type</InputLabel>
                        <Select
                            labelId="object-type-label"
                            id="object-type"
                            name="objectType"
                            value={formData.objectType}
                            label="Object Type"
                            onChange={handleChange}
                        >
                            <MenuItem value="residential">Residential</MenuItem>
                            <MenuItem value="commercial">Commercial</MenuItem>
                            <MenuItem value="industrial">Industrial</MenuItem>
                            <MenuItem value="land">Land</MenuItem>
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