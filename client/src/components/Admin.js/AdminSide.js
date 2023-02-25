import React, {useState} from 'react';
import {AppBar, Stack, Typography, Box} from "@mui/material";
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import useStyles from './AdminPageStyles.js';
    
const AdminSide = () => {
  const classes = useStyles();
  return(
     <Box sx={{display:"flex", }}>
        
    
    <Drawer sx={{width:240,
          flexShrink: 0,
          zIndex: 0,
          '& .MuiDrawer-paper': {
            width: 125,
            boxSizing: "border-box",
            top: 100,
             marginTop:"70px",
          },

}}
 variant = "permanent"
 anchor='left'
 >
    <Toolbar/>
    <Divider/>
    <List sx={{fontSize:"100px" }}>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
              <Divider/>
            </ListItem>
            
          ))}
        </List>
        <Divider/>
 </Drawer>
    </Box>
  )
  }
















export default AdminSide