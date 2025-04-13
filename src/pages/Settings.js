import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  List, 
  ListItemIcon, 
  ListItemText, 
  ListItemButton,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TuneIcon from '@mui/icons-material/Tune';
import AddIcon from '@mui/icons-material/Add';
import CreateProperty from '../components/CreateProperty';
import Properties from '../components/Properties';

function Settings() {
  const navigate = useNavigate();
  
  const [selectedOption, setSelectedOption] = useState('properties');

  

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const renderContent = (option) => {
    switch (option) {
      case 'properties':
        return <Properties />;
      case 'createNew':
        return <CreateProperty />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="h4" component="h1">
            Data Management System
          </Typography>
        </a>
      </Box>
      
      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Left Sidebar */}
        <Paper elevation={3} sx={{ width: 250, p: 2 }}>
          <List component="nav">
            <ListItemButton onClick={() => handleOptionClick('properties')}>
              <ListItemIcon>
                <TuneIcon />
              </ListItemIcon>
              <ListItemText primary="Properties" />
            </ListItemButton>
            
            <Divider sx={{ my: 1 }} />
            
            <ListItemButton onClick={() => handleOptionClick('createNew')}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="New Property"/>
            </ListItemButton>
          </List>
        </Paper>
        
        {/* Content Area */}
        <Paper elevation={3} sx={{ flexGrow: 1, p: 3 }}>
          {renderContent(selectedOption)}
        </Paper>
      </Box>
    </Box>
  );
}

export default Settings; 