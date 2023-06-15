import React, {useState} from 'react';
import { Avatar, Typography, Box } from '@material-ui/core';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import useStyles from './DropdownStyle';
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
//path:'/admin', innerText:"Admin Dashboard *WIP*"}
// a component that will be used to create a dropdown menu for the user to access their settings
const menuPaths = [,{path:'/messages', innerText:"Check Messages"},{path:'/users', innerText:"Settings"}, {path:'/working', innerText:"PlaceHolder"}]
const Dropdown = ({name,src, dropIsFalse}) => {
    const classes = useStyles();
  return (
   
      
    <div className={classes.dropdownMenu} >
      <div className={classes.avatar} >
      <Avatar className={classes.innerAvatar} alt={name} src={src}>
      {name.charAt(0)}
      </Avatar>
       {name}
      </div>
      <Divider/>
         {menuPaths.map((path,id) =>{
          return(
            <div key={id} >
          <MenuItems key={id} path={path.path} dropIsFalse={dropIsFalse} classes={classes} innerText={path.innerText}/>
          <Divider/>
          </div>
          )
         })}     
       
        </div>
       
        
       
  )
}

const MenuItems =({path,dropIsFalse, classes, innerText}) => {
  return (
    
    <Typography className={classes.dropdownInner} component={Link}  to={path} onClick={dropIsFalse}>
        
    <Typography className={classes.innerText} >{innerText}</Typography>
      </Typography>
      
    
  )

  

}


export default Dropdown