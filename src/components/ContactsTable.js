import React, { useState } from 'react';
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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ContactsTable = ({ contacts, onContactUpdated }) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [editFormData, setEditFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
  });

  const handleEditClick = (contact) => {
    setSelectedContact(contact);
    setEditFormData({
      first_name: contact.first_name,
      last_name: contact.last_name,
      phone_number: contact.phone_number,
    });
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (contact) => {
    setSelectedContact(contact);
    setDeleteDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
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

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(`https://arvinjayromero.pythonanywhere.com/api/contacts/${selectedContact.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editFormData),
      });

      if (response.ok) {
        onContactUpdated();
        handleEditClose();
      } else {
        console.error('Failed to update contact');
      }
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const handleDeleteSubmit = async () => {
    try {      
      const response = await fetch(`https://arvinjayromero.pythonanywhere.com/api/contacts/${selectedContact.id}/`, {
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

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Contact List
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>{contact.first_name}</TableCell>
                <TableCell>{contact.last_name}</TableCell>
                <TableCell>{contact.phone_number}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleEditClick(contact)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(contact)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Contact</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="first_name"
            label="First Name"
            type="text"
            fullWidth
            value={editFormData.first_name}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="last_name"
            label="Last Name"
            type="text"
            fullWidth
            value={editFormData.last_name}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="phone_number"
            label="Phone Number"
            type="text"
            fullWidth
            value={editFormData.phone_number}
            onChange={handleEditChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
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