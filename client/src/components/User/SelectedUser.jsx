import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../actions/actionPost';
import { Typography } from '@material-ui/core';

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
  return (
    <Typography className={classes.userCard}>
    {yourUser && (
        <div>
        <p>
         name: {yourUser[0].name}
         </p>
         <p>
        email: {yourUser[0].email}
        </p>
        <p>
        role:{yourUser[0].role}
        </p>
        <button>
        Send Message
        </button>
        </div>
    )}
    </Typography>
  )
}

export default SelectedUser