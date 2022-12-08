import React, {useState} from 'react';
import jwt_decode from 'jwt-decode';
import {Avatar, Button, Paper, Grid, Typography, Container, TextField} from "@material-ui/core";
import {GoogleLogin, googleLogout, GoogleOAuthProvider} from "@react-oauth/google";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './input';
import {signin,signup} from "../../actions/authActions";

const initalState = {
  firstName: '',
  lastName: '',
  email: '',
  password:'',
  confirmPassword:''
}

const Auth = () => {
    const state = null;
    const classes = useStyles();
    const [isSigned, setIsSigned] = useState(true);
    const [showpass, SetShowPass] = useState(false);
    const [formData,setFormData] = useState(initalState);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData,"formdata")

        if(isSigned){
          dispatch(signup(formData,history))
        }
        else{
          dispatch(signin(formData,history))
        }
    };
    const handleChange = (e) => {
     setFormData({...formData, [e.target.name]:e.target.value})
    };
    const handleShowPassword = () => {
        SetShowPass((prevShowPass) => !prevShowPass)

    };
    const switchMode = () => {
       setIsSigned(!isSigned)
       handleShowPassword(false);
     
    };
    const googleSuccess = async (res) => {
       const decoded = jwt_decode(res.credential)
       console.log("decoded",decoded)// everything under name,picture, email
       // we need jwt_decode because intial credential doesnt return info right away
       const{name,picture,sub} = decoded;
       //console.log(name,picture,sub)
       const result = {
        _id: sub,
        _type:'user',
        name: name,
        image: picture
       }
       const token = res?.credential;

       //console.log(user._id)
       try{
       dispatch({type:"AUTH", data: {result, token}});
       history.push('/');
       }
       catch(error){
        console.log(error)
       }
       // await axios.post('http://localhost:3000/api/auth, user)
    };

    const googleFailure = (error) => {
      console.log(error,"Sorry that didnt work try again")
    };
  return (
    <GoogleOAuthProvider clientId="271275385255-4uffobja86j8kcrfprdhhutucc1fe2j6.apps.googleusercontent.com">
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
                        <Input name='lastName' label= "Last Name" handleChange={handleChange} half/>
                        
                        </>
                    )
                }
                <Input name='email' label= "Email Address" handleChange={handleChange} type="email"/>
                <Input name='password' label= "password" handleChange={handleChange} type={showpass ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                {isSigned && <Input name="confirmPassword" label="Repeat Password"  handleChange={handleChange}  type="password" />}




             </Grid>
             <Button type="submit" fullWidth variant="contained" color='primary' className={classes.submit}> 
             {isSigned ? "Sign Up" : "Sign In"}</Button>
             <Grid container justifyContent='flex-end'>
                <Grid item>
                  <Button onClick={switchMode}>
                    {isSigned ? "Have an account? Sign In" : "NO ACCOUNT? Sign Up"}
                  </Button>
                  <Button onClick={switchMode} >
                    {isSigned ? <GoogleLogin onSuccess={googleSuccess} onError={googleFailure}/>: <GoogleLogin onSuccess={googleSuccess} onError={googleFailure}/>}
                  </Button>
                </Grid>
             </Grid>
           </form>
         </Paper>
        </Container>
        </GoogleOAuthProvider>
  )
}

export default Auth