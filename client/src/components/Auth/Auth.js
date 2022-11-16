import React, {useState} from 'react';

import {Avatar, Button, Paper, Grid, Typography, Container, TextField} from "@material-ui/core";

import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './input';

const Auth = () => {
    const state = null;
    const classes = useStyles();
    const [isSigned, setIsSigned] = useState(true);
    const [showpass, SetShowPass] = useState(false);

    const handleSubmit = () => {

    };
    const handleChange = () => {

    };
    const handleShowPassword = () => {
        SetShowPass((prevShowPass) => !prevShowPass)

    };
    const switchMode = () => {
       setIsSigned(!isSigned)
     
    };
  return (
    <Container component="main" maxWidth="xs">
         <Paper className={classes.paper} elevation={3}>
           <Avatar className={classes.Avatar}>
              <LockOutlinedIcon/>
           </Avatar>
           <Typography variant="h5" >
             {isSigned? "Sign Up" : "Sign In"}
           </Typography>
           <form className={classes.form} onSubmit={handleSubmit}>
             <Grid container spacing={2}>
                {
                    isSigned && (
                        <>
                        <Input name='firstName' label= "First Name" handleChange={handleChange} autoFocus half/>
                        <Input name='firstName' label= "First Name" handleChange={handleChange} half/>
                        
                        </>
                    )
                }
                <Input name='email' label= "Email Address" handleChange={handleChange} type="email"/>
                <Input name='password' label= "password" handleChange={handleChange} type={showpass ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                {isSigned && <Input name="confirmPassword" label="Repeat Password"  handleChange={handleChange}  type="password" />}




             </Grid>
             <Button type="submit" fullWidth variant="contained" color='primary' className={classes.submit}> {isSigned ? "Sign Up" : "Sign In"}</Button>
             <Grid container justifyContent='flex-end'>
                <Grid item>
                  <Button onClick={switchMode}>
                    {isSigned ? "Have an account? Sign In" : "NO ACCOUNT? Sign Up"}
                  </Button>
                </Grid>
             </Grid>
           </form>
         </Paper>
        </Container>
  )
}

export default Auth