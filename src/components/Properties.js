import React, { useState, useEffect } from 'react';
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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { server_url } from '../constants';


function Properties() {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [newObjectName, setNewObjectName] = useState('');
  const [objects, setObjects] = useState([]);

  useEffect(() => {
    axios.get(`${server_url}/api/objects/`)
      .then(response => {
        setObjects(response.data);
        console.log(response.data); 
      })
      .catch(error => {
        console.error('Error fetching objects:', error);
      });
  }, []);

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
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewObjectName('');
  };

  const handleConfirmAdd = () => {
    // Add your logic for adding a new object here
    console.log('Adding new object:', newObjectName);
    axios.post(`${server_url}/api/objects/`, { name: newObjectName })
    .then(response => {
      console.log('Object added successfully:', response.data);
      handleCloseDialog();
    })
    .catch(error => {
      console.error('Error adding object:', error);
    });
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
          <InputLabel id="category-filter-label">Filter by Object</InputLabel>
          <Select
            labelId="category-filter-label"
            id="category-filter"
            value={categoryFilter}
            label="Filter by Type"
            onChange={handleCategoryChange}
          >            
            {
              objects.map((object) => (
                <MenuItem value={object.id}>{object.name}</MenuItem>
              ))
            }
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
      
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Object</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Object Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newObjectName}
            onChange={(e) => setNewObjectName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirmAdd} variant="contained" color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Properties;
