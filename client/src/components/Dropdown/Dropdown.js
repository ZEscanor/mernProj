import React from 'react';
import { Avatar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './style';

const Dropdown = ({name,src}) => {

    const classes = useStyles();
  return (
    <div className={classes.dropdownMenu}>
      <div className={classes.avatar}>
      <Avatar className={classes.innerAvatar} alt={name} src={src}>
      {name.charAt(0)}
      </Avatar>
       {name}
      </div>
       <Typography className={classes.dropdownInner} component={Link} to='/users'>
        
        <Typography className={classes.innerText} >Admin Dashboard *WIP*</Typography><br/>
        </Typography>
       
        <Typography className={classes.dropdownInner} component={Link} to='/working'>
        
        <Typography className={classes.innerText}>Change User Info</Typography><br/>
        </Typography>

        <Typography className={classes.dropdownInner} component={Link} to='/working'>
        
        <Typography className={classes.innerText} >Check Messages</Typography><br/>
        </Typography>
        
        {/* <Typography component={Link} to='/users'>Change User Info</Typography><br/> */}
        {/* <Typography component={Link} to='/users'>DarkMode</Typography><br/>
        <Typography component={Link} to='/users'>Check Messages</Typography><br/> */}
      

       
       
        </div>
        
        
       
  )
}

export default Dropdown