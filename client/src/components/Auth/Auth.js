import React, {useState, useEffect} from 'react';
import jwt_decode from 'jwt-decode';
import {Avatar, Button, Paper, Grid, Typography, Container, TextField} from "@material-ui/core";
import {GoogleLogin, googleLogout, GoogleOAuthProvider} from "@react-oauth/google";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import * as yup from "yup";
import Input from './input';
import Error from './error';
import {signin,signup} from "../../actions/authActions";


const initalState = {
  firstName: '',
  lastName: '',
  email: '',
  password:'',
  confirmPassword:''
}

const schema = yup.object().shape({

  firstName: yup.string().max(10, "First Name should be no longer than 10 characters").required().matches(
    /^([A-Za-z]*)$/gi,
        'First Name can only contain alphanumeric letters.'
    ), //regex for only letters that are alphanumeric, no spaces or special characters allowed and the max length is 10
  lastName: yup.string().max(10, "Last Name should be no longer than 10 characters").required().matches(
    /^([A-Za-z]*)$/gi,
        'Last Name can only contain alphanumeric letters.'
    ), // same as above
  email: yup.string().email().required(), // yup will just check if a valid email is entered
  password:yup.string("No password provided!!").min(6,"Minimum of 6 characters"), // yup will check if password is at least 6 characters
  confirmPassword:yup.string().oneOf([yup.ref('password'),null], 'Passwords Must match') // yup will check if password and confirm password match

})   //schema for creating a new user account validation using yup

const Auth = () => {
    const state = null;
    const classes = useStyles(); 
    const [isSigned, setIsSigned] = useState(false); // if isSigned is false then we are signing in, if true we are signing up
    const [showpass, SetShowPass] = useState(false); // if showpass is false then we are hiding the password, if true we are showing the password
    const [formData,setFormData] = useState(initalState); // formData is the data we are sending to the backend when a new user is created, it will check against the schema above
    let errArray = [] // this is an array that will hold all the errors that are returned from yup
    const [errors,setErrors] = useState([]) // this error array will be used to display the errors to the user
    const dispatch = useDispatch(); // this is used to dispatch actions to the redux store
    const history = useHistory(); // we will keep track of the history of the user so we can redirect them to the home page after they sign in

   const clear = () => {
   
    errArray = []
  } // this function will clear the error array so we can display new errors to the user
 // useEffect(() => console.log("re-render because x changed:", errors), [errors])
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        

        const isFormValid = await schema.isValid(formData, {
          abortEarly: false
        })  // where are yup schema is called

        //console.log(isFormValid)
        if(isSigned){
           if(isFormValid){
          console.log("Form ok")
          dispatch(signup(formData,history))
         
        } // if the form is valid then we will dispatch the signup action to the redux store
        else{
    
          clear()
          
          schema.validate(formData, {abortEarly:false})
          .catch((err) => {
            
       err.inner.map(( error) => {
              //console.log(errors, "error1")
              const message = error.message 
              errArray.push(message)


              
            })
            setErrors(errArray) // Use set here because setstate triggers a page reload giving our error check message
          })
          //console.log(errors, errArray, "UG")
        }  // if the form is not valid then we will use yup to validate the form and return the errors to the user
      } 
     else{
          //console.log("we signing in")
          dispatch(signin(formData,history))
        }  // if the user already has an account and wants to signin we will do this action
    };

    


    const handleChange = (e) => {
     setFormData({...formData, [e.target.name]:e.target.value})
    };  
    const handleShowPassword = () => {
        SetShowPass((prevShowPass) => !prevShowPass)

    };  // this function will switch between showing and hiding the password
    const switchMode = () => {
       setIsSigned(!isSigned)
       handleShowPassword(false);
     
    }; // switch between signin and signup pages 
    
    const googleSuccess = async (res) => {
       const decoded = jwt_decode(res.credential)
       //console.log("decoded",decoded)// everything under name,picture, email
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
    };  // this function will be called if the user successfully signs in with google

    const googleFailure = (error) => {
      console.log(error,"Sorry that didnt work try again")
    };  // this function will be called if the user fails to sign in with google
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
           <form className={classes.form} onSubmit={handleSubmit} >
             <Grid container spacing={2}>
                {
                    isSigned && (
                        <>
                        <Input name='firstName' label= "First Name" handleChange={handleChange}  autoFocus half/>
                        <Input name='lastName' label= "Last Name" handleChange={handleChange}  half/>
                        
                        </>
                    )
                }
                <Input name='email' label= "Email Address" handleChange={handleChange} type="email"  />
                <Input name='password' label= "password" handleChange={handleChange} type={showpass ? "text" : "password"} handleShowPassword={handleShowPassword} />
                {isSigned && <Input name="confirmPassword" label="Repeat Password"  handleChange={handleChange}  type="password" />}




             </Grid>
             {isSigned && (<Error error={errors}/>)}
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