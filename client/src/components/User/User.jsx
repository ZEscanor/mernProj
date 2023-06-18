import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, getUser } from "../../actions/actionPost";
import { Paper,Typography } from '@material-ui/core';
import useStyles from './styles';
import SelectedUser from './SelectedUser';
import 'react-dropdown/style.css';
import { keyframes } from '@emotion/react';


const User = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const ourCurrentLoggedUser = JSON.parse(localStorage.getItem('profile'));

  const [selectedUse,setSelectedUse] = useState([]);
  

 


  //console.log(ourCurrentLoggedUser, "ourCurrentLoggedUser")
  // useEffect( () => {

  //   const fetchUsers = async () => {
  //     const data = await dispatch(getUsers());
      
  //     setOptionz(data)
   
  //     return data
    


  //   }
  //   fetchUsers();


    
  // }, [dispatch, selectedUse, setSelectedUse]);

    //console.log(optionz)

   

  
  // const _onSelect = (id) => {
  //   //console.log(id)
  //   //const user = optionz.filter((user) => user.id === id)
  //   //console.log(user)
  //   setSelectedUse(user)
    
  //   //console.log(selectedUse)
  // }
    

  

  if(!ourCurrentLoggedUser){
    return <h1 className={classes.loading}></h1> ; 
  }
  return (
    <div className={classes.userDiv} >
      {/* This dropdown is from react dropdown library not the component Dropdown */}

     
     

     
     
    

    <Paper style={{ padding: '20px', borderRadius: '15px' ,marginTop: "30px",
    height: "100%",

  
  }} elevation={6}>
    { ourCurrentLoggedUser && (
        <SelectedUser />
    )}
   
     
      </Paper>
   


     


    
    </div>
  )

}

export default User