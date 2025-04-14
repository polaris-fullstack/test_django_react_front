import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  Input,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { server_url, getPropertyType, getPropertyId } from '../constants';
import axios from 'axios';


const ContactsTable = ({ contacts, onContactUpdated }) => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);  
  const [editFormData, setEditFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
  });
  const [objects, setObjects] = useState([]);
  const [selectedObject, setSelectedObject] = useState(-1);
  const [datas, setDatas] = useState([]);
  const [columns, setColumns] = useState(["hello", "world"]);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchObjects();
  }, []);

  useEffect(() => {
    fetchDatas();
  }, [selectedObject]);

  const fetchObjects = async () => {
    const response = await axios.get(`${server_url}/api/objects/`);
    const data = response.data;
    console.log(data);
    setObjects(data);
    if (data != null && data.length > 0) {
      setSelectedObject(data[0].id);
    }
  };

  const fetchDatas = async () => {    
    if (selectedObject < 0) {
      return;
    }
    const property_response = await axios.get(`${server_url}/api/properties/?object=${selectedObject}`);
    setProperties(property_response.data);
    const response = await axios.get(`${server_url}/api/query/?object=${selectedObject}`);
    const data = response.data;    
    setDatas(data.results);
    // console.log(data.results);
    const colAry = data.columns;
    colAry.shift();
    setColumns(colAry);
  };

  const handleEditClick = (contact) => {
    setSelectedContact(contact);
    setEditFormData({
      first_name: contact.first_name,
      last_name: contact.last_name,
      phone_number: contact.phone_number,
    });
    setAddDialogOpen(true);
  };

  const handleDeleteClick = (contact) => {
    setSelectedContact(contact);
    setDeleteDialogOpen(true);
  };

  const handleEditClose = () => {
    setAddDialogOpen(false);
    setSelectedContact(null);
  };

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
    setSelectedContact(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit =  (e) => {
    // try {
    //   const response = await fetch(`${server_url}/api/contacts/${selectedContact.id}/`, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(editFormData),
    //   });

    //   if (response.ok) {
    //     onContactUpdated();
    //     handleEditClose();
    //   } else {
    //     console.error('Failed to update contact');
    //   }
    // } catch (error) {
    //   console.error('Error updating contact:', error);
    // }
    e.preventDefault();
    axios.post(`${server_url}/api/query/`, {
      object: selectedObject,
      data: editFormData
    }).then((response) => {      
      const data = response.data;
      setDatas(data.data);
      // onContactUpdated();
      handleEditClose();
    });
  };

  const handleDeleteSubmit = async () => {
    try {      
      const response = await fetch(`${server_url}/api/contacts/${selectedContact.id}/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onContactUpdated();
        handleDeleteClose();
      } else {
        console.error('Failed to delete contact');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedObject(event.target.value);
  };

  const handleAddData = () => {
    axios.get(`${server_url}/api/properties`, {params: {object: selectedObject}}).then((response) => {
      console.log(response.data);
      const data = response.data;
      setEditFormData({});
      setProperties(data);      
      setAddDialogOpen(true);
    });
  };

  const getWidget = (property) => {
    const type = getPropertyType(property.type);
    const id = property.type;
    if (type == 'text' && id == 0) {
      return <TextField
        margin="dense"
        name={property.name.replace(' ', '_').toLowerCase()}
        label={property.name}
        type="text"
        fullWidth
        required
        value={editFormData[property.name.replace(' ', '_').toLowerCase()]}
        onChange={handleEditChange}
      />
    } else if (type == 'text' && id == 1) {
      return <TextField
        margin="dense"
        name={property.name.replace(' ', '_').toLowerCase()}
        label={property.name}
        multiline
        required
        minRows={3}
        maxRows={4}
        fullWidth
        value={editFormData[property.name.replace(' ', '_').toLowerCase()]}
        onChange={handleEditChange}
      />
    } else if (type == 'select') {
      const items = property.type_extra.split(',');
      return <FormControl fullWidth required margin="dense">
        <InputLabel id={property.name.replace(' ', '_').toLowerCase()+"-label"}>
          {property.name}
        </InputLabel>
        <Select
            labelId={property.name.replace(' ', '_').toLowerCase()+"-label"}
            name={property.name.replace(' ', '_').toLowerCase()}
            value={editFormData[property.name.replace(' ', '_').toLowerCase()]}
            label={property.name}
            onChange={handleEditChange}
        >
            {items.map((item, index) => (
                <MenuItem value={index}>{item}</MenuItem>
            ))}
        </Select>
      </FormControl>
    } else if (type == 'radio') {
      const items = property.type_extra.split(',');
      return <FormControl fullWidth required margin="dense">
        <FormLabel id={property.name.replace(' ', '_').toLowerCase()+"label"}>{property.name}</FormLabel>
        <RadioGroup
          row
          aria-labelledby={property.name.replace(' ', '_').toLowerCase()+"label"}
          name={property.name.replace(' ', '_').toLowerCase()}
          label={property.name}
          value={editFormData[property.name.replace(' ', '_').toLowerCase()]}
          onChange={handleEditChange}          
        >
          {
            items.map((item, index) => (
              <FormControlLabel value={index} control={<Radio />} label={item} />
            ))
          }
        </RadioGroup>
      </FormControl>
      
    } else {
      return <TextField
        slotProps={{ inputLabel: { shrink: true } }}
        margin="dense"
        name={property.name.replace(' ', '_').toLowerCase()}
        label={property.name}
        type={type}
        fullWidth
        required
        value={editFormData[property.name.replace(' ', '_').toLowerCase()]}
        onChange={handleEditChange}
      />
    }
  }

  const getRenderText = (item, index) => {
    console.log(`${index}, ${item}`);
    console.log(properties);
    try {
      const type = properties[index - 1].type;
      if (type == 2 || type == 3) {
        return properties[index - 1].type_extra.split(',')[item];
      }
    } catch (error) {      
      return item
    }
    return item;
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <FormControl >
          <InputLabel id="dropdown-label">Object</InputLabel>
          <Select
            labelId="dropdown-label"
            id="dropdown-select"
            value={selectedObject}
            label="Object"
            onChange={handleOptionChange}
            sx={{ width: 200 }}
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
          onClick={handleAddData}
          disabled={columns != undefined && columns.length == 0}
        >
          Add Data
        </Button>
      </Box>

      <TableContainer>
        {
          columns != undefined && columns.length > 0 && (
            <Table>
              <TableHead>
                <TableRow>
                  {
                    columns != undefined && (
                      columns.map((column) => (
                        <TableCell key={column}>{column}</TableCell>
                      ))
                    )
                  }
                  {/* <TableCell align="center">actions</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  datas != undefined && (
                    datas.map((data) => (
                      <TableRow key={data[0]}>
                        {/* <TableCell>{data.first_name}</TableCell>
                        <TableCell>{data.last_name}</TableCell>
                        <TableCell>{data.phone_number}</TableCell> */}
                        {
                          data.map((item, index) => {
                            if (index == 0)
                              return;                      
                            return <TableCell key={index}>{getRenderText(item, index)/**item */}</TableCell>
                          })
                        }
                        {/* <TableCell align="center">
                          <IconButton onClick={() => handleEditClick(data)} color="primary">
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteClick(data)} color="error">
                            <DeleteIcon />
                          </IconButton>
                        </TableCell> */}
                      </TableRow>
                    ))
                )}
                {
                  datas != undefined && datas.length == 0 && (
                    <TableRow>
                      <TableCell colSpan={columns.length + 1} align="center">No data</TableCell>
                    </TableRow>
                  )
                }
              </TableBody>
            </Table>
          )
        }
        {
          columns != undefined && columns.length == 0 && (
            <h2 style={{ textAlign: 'center' }}>Please add any property to the object</h2>
          )
        }
        
      </TableContainer>

      {/* Add Dialog */}
      <Dialog open={addDialogOpen} onClose={handleEditClose}>
        <DialogTitle>Add Data</DialogTitle>
        <DialogContent>
          <form onSubmit={handleEditSubmit} >
            {
              properties.map((property) => (
                getWidget(property)
              ))  
            }
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button type='submit' color="primary">
                Add
              </Button>
            </Box>
          </form>          
        </DialogContent>
        
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteClose}>
        <DialogTitle>Delete Contact</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {selectedContact?.first_name} {selectedContact?.last_name}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <Button onClick={handleDeleteSubmit} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ContactsTable; 