import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme, Grid, Paper, Typography, Box } from '@mui/material';
import ContactForm from './components/ContactForm';
import ContactsTable from './components/ContactsTable';

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
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ py: 2 }}>
          Contact Management System
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={6} lg={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <ContactForm onContactAdded={handleContactAdded} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <ContactsTable contacts={contacts} onContactUpdated={handleContactAdded} />
            </Paper>
          </Grid>
        </Grid>
        
      </Box>
    </ThemeProvider>
  );
}

export default App;
