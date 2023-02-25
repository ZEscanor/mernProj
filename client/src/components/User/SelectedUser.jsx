import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../actions/actionPost';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {Box, useTheme} from '@mui/material';
import { GridRowsProp } from '@mui/x-data-grid';
import {DataGrid } from "@mui/x-data-grid";

import useStyles from './styles';
import { mergeClasses } from '@material-ui/styles';

const SelectedUser = ({user}) => {
  //console.log(user, "id")
  const classes = useStyles();
  const dispatch = useDispatch();
  const [yourUser,setYourUser] = useState(null)

  useEffect( () => {
    getSpecificUser(user)
   
 }, [user]);
    const getSpecificUser = async (id) => {
        // console.log(id)
         const userZ = await dispatch(getUser(id))
         setYourUser(userZ)
         //console.log("it worked?", userZ
         return
       }
     console.log(yourUser)
     if(!yourUser){
        return null
     }
     
return( 
      <Typography className={classes.userCard}>
    {yourUser && (
        <div>
          <Typography className={classes.dropdownInner} >
        <Typography className={classes.userInfo}>
         name: {yourUser[0].name}
         </Typography>
         </Typography>

         <Typography className={classes.dropdownInner}>
         <Typography  className={classes.userInfo}>
        email: {yourUser[0].email}
        </Typography>
        </Typography>
        
        <Typography className={classes.dropdownInner}>
        <Typography  className={classes.userInfo}>
        role:{yourUser[0].role}
        </Typography>
        </Typography>
        <Typography component={Link} to='/posts'>
        <button>
        Send Message
        </button>
        </Typography>
        </div>
    )}
    </Typography> 
    








  )
}

export default SelectedUser


