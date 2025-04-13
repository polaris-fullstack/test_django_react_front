import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import AddIcon from '@mui/icons-material/Add';

function Properties() {
  const [categoryFilter, setCategoryFilter] = useState('all');
  

  // Sample data for the table
  const propertiesData = [
    { id: 1, name: 'Property 1', type: 'Residential' },
    { id: 2, name: 'Property 2', type: 'Commercial' },
    { id: 3, name: 'Property 3', type: 'Industrial' },
    { id: 4, name: 'Property 4', type: 'Residential' },
    { id: 5, name: 'Property 5', type: 'Commercial' },
  ];

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleAddObject = () => {
    // Add your logic for adding a new object here
    console.log('Add Object clicked');
  };

  const filteredProperties = propertiesData.filter(property => {
    const matchesCategory = categoryFilter === 'all' || property.type === categoryFilter;    
    return matchesCategory;
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">
          Properties
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="category-filter-label">Filter by Type</InputLabel>
          <Select
            labelId="category-filter-label"
            id="category-filter"
            value={categoryFilter}
            label="Filter by Type"
            onChange={handleCategoryChange}
          >
            <MenuItem value="all">All Types</MenuItem>
            <MenuItem value="Residential">Residential</MenuItem>
            <MenuItem value="Commercial">Commercial</MenuItem>
            <MenuItem value="Industrial">Industrial</MenuItem>
          </Select>
        </FormControl>
        
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={handleAddObject}            
        >
          Add Object
        </Button>
      </Box>
      
      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProperties.map((property, index) => (
              <TableRow key={property.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{property.name}</TableCell>
                <TableCell>{property.type}</TableCell>
                <TableCell align="right">
                  <Button size="small" color="primary">Edit</Button>
                  <Button size="small" color="error">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Properties;
