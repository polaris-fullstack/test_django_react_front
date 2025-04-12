import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme, Grid, Paper, Typography, Box, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import ContactForm from './components/ContactForm';
import ContactsTable from './components/ContactsTable';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [contacts, setContacts] = useState([]);
  const [refreshTable, setRefreshTable] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, [refreshTable]);

  const fetchContacts = async () => {
    try {
      // http://localhost:8000 (dev mode api)
      const response = await fetch('https://arvinjayromero.pythonanywhere.com/api/contacts/');
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleContactAdded = () => {
    setRefreshTable(!refreshTable);
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Contact Management System
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton 
              color="primary" 
              onClick={handleOpenDialog}
              sx={{ 
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                }
              }}
            >
              <AddIcon />
            </IconButton>
            <IconButton 
              color="primary" 
              sx={{ 
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                }
              }}
            >
              <SettingsIcon />
            </IconButton>
          </Box>
        </Box>
        
        <Paper elevation={3} sx={{ p: 2 }}>
          <ContactsTable contacts={contacts} onContactUpdated={handleContactAdded} />
        </Paper>

        <Dialog 
          open={openDialog} 
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >          
          <DialogContent>
            <ContactForm onContactAdded={handleContactAdded} />
          </DialogContent>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}

export default App;
