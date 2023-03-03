import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, getUser } from "../../actions/actionPost";
import { Paper,Typography } from '@material-ui/core';
import useStyles from './styles';
import SelectedUser from './SelectedUser';
import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';

const User = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [selectedUse,setSelectedUse] = useState(null);
 
 
  const optionz = []
  useEffect( () => {
     testGet();
  }, [selectedUse]);

  const testGet = async () => {
    const userZ = await dispatch(getUsers())
    //console.log("it worked?", userZ)
    //userZ.map((z)=> optionz.push({value: z._id, label: z.name}))
    //console.log(users, "users from state")
  }

 const _onSelect = async (option) => {
    //console.log('You selected ', option.label, option.value)
    setSelectedUse(option.value) ;
    //setSelectedUser(hello)
    return 
 }

  

  if(!optionz){
    return null ; 
  }
  return (
    <div className={classes.userDiv} >
      {/* This dropdown is from react dropdown library not the component Dropdown */}
     <Dropdown options={optionz} onChange={_onSelect}  placeholder="Select an option" /> 
     
    

    <Paper style={{ padding: '20px', borderRadius: '15px' ,marginTop: "30px"}} elevation={6}>
    {selectedUse && (
        <SelectedUser user= {selectedUse}/>
    )}
     
      </Paper>
   


     


    
    </div>
  )
}

export default User