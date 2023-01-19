import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, getUser } from "../../actions/actionPost";
import { Typography } from '@material-ui/core';
import SelectedUser from './SelectedUser';
import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';

const User = () => {
  const dispatch = useDispatch();

  const [selectedUse,setSelectedUse] = useState(null)
 
 
  const optionz = []
  useEffect( () => {
     testGet()
  }, [selectedUse]);

  const testGet = async () => {
    const userZ = await dispatch(getUsers())
    //console.log("it worked?", userZ)
    userZ.map((z)=> optionz.push({value: z._id, label: z.name}))
    //console.log(users, "users from state")
  }

 const _onSelect = async (option) => {
    console.log('You selected ', option.label, option.value)
    setSelectedUse(option.value)
    //setSelectedUser(hello)
    return 
 }

  

  if(!optionz){
    return null
  }
  return (
    <div>
      
     <Dropdown options={optionz} onChange={_onSelect}  placeholder="Select an option" />
     
    {selectedUse && (
        <SelectedUser user= {selectedUse}/>
    )}
   


     


    
    </div>
  )
}

export default User