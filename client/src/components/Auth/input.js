import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';


import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

// this component will be used to create the text fields for the user to enter their information when creating a new account
const input = ({name, handleChange, label,half, autoFocus, type, handleShowPassword}) => {
  

 


  //console.log(errors)
  const onSubmit = (data) => console.log("onSubmit", data);
 //console.log(register(onChange))
  

  return (
    <Grid item xs={12} sm={half ? 6 :12}>
      
      <TextField
      name = {name}
      onChange = {handleChange}
      variant = "outlined"
      required
      fullWidth
      label = {label}
      autoFocus = {autoFocus}
      type = {type}
      InputProps ={name === 'password' ? {endAdornment: (
        <InputAdornment position='end'>
        <IconButton onClick={handleShowPassword}>
            {type === "password" ? <Visibility/> : <VisibilityOff/> }
        </IconButton>
        </InputAdornment>
        
      ),
      }: null}  
    
       />

      
    </Grid>
  )
}

export default input