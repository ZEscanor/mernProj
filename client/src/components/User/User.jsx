import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from "../../actions/actionPost";
import { Paper,Typography } from '@material-ui/core';
import useStyles from './styles';
import SelectedUser from './SelectedUser';
import 'react-dropdown/style.css';
import { keyframes } from '@emotion/react';

const User = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [selectedUse,setSelectedUse] = useState([]);
  

 
 
  const [optionz, setOptionz] = useState([])
  useEffect( () => {

    const fetchUsers = async () => {
      const data = await dispatch(getUsers());
      //console.log(data)
      setOptionz(data)
      //console.log(optionz)
      return data
    


    }
    fetchUsers();


    
  }, [dispatch, selectedUse, setSelectedUse]);

    //console.log(optionz)

   

  
  const _onSelect = (id) => {
    //console.log(id)
    const user = optionz.filter((user) => user.id === id)
    //console.log(user)
    setSelectedUse(user)
    //console.log(selectedUse)
  }
    

  

  if(!optionz.length){
    return <h1 className={classes.loading}></h1> ; 
  }
  return (
    <div className={classes.userDiv} >
      {/* This dropdown is from react dropdown library not the component Dropdown */}

     <select  style={{
        width: "100%",
        padding: "12px 20px",
        margin: "8px 0",
        display: "inline-block",
        border: "1px solid #ccc",
        borderRadius: "4px",
        boxSizing: "border-box",
        fontSize: "16px",


     
      
     }} 
      onChange={(e) => _onSelect(e.target.value)}
     >  
      {optionz.map((option) => (
        <option key={option.id} value={option.id}
        onClick={() => setSelectedUse(option)}

        >
          {!option.name ? "Select a user" : option.name}
        </option>
      ))}

    </select>

     
     
    

    <Paper style={{ padding: '20px', borderRadius: '15px' ,marginTop: "30px",
    height: "100%",

  
  }} elevation={6}>
    {selectedUse.length > 0 && (
        <SelectedUser selectedUse= {selectedUse}/>
    )}
    {selectedUse.length === 0 && ( 
      <div>
        Select a user to view their information
      </div>
    )}
     
      </Paper>
   


     


    
    </div>
  )

}

export default User