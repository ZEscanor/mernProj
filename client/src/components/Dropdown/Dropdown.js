import React from 'react';
import { Avatar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './style';

const Dropdown = ({name,src}) => {

    const classes = useStyles();
  return (
    <div className={classes.dropdownMenu}>
        <Avatar alt={name} src={src}/>
      
       <ul>
        <Typography component={Link} to='/users'>Admin Dashboard *WIP*</Typography><br/>
        {/* <Typography component={Link} to='/users'>Change User Info</Typography><br/> */}
        {/* <Typography component={Link} to='/users'>DarkMode</Typography><br/>
        <Typography component={Link} to='/users'>Check Messages</Typography><br/> */}
      

       </ul>
       
        </div>
        
        
       
  )
}

export default Dropdown