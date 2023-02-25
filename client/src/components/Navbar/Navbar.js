import React,{useState,useEffect,useRef, Component} from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import {Link,useHistory,useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import memories from "../../images/memories.png";
import decode from "jwt-decode";
import Dropdown from "../Dropdown/Dropdown";
import ClickAwayListener from '@mui/base/ClickAwayListener';
const Navbar = () => {
  
    const classes = useStyles();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))
     const [isOpen,setIsOpen] = useState(false);
    
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    let menuTriggerCheck = useRef(); // reference for our menu
    
    let vehicle = {}
    const logout = () => {
     dispatch({type:"LOGOUT"});
     history.push('/')
     setUser(null);
    }
    if(user?.user){
       vehicle = user.user
    }
    else if(user?.result){
       vehicle = user.result
    } // fixes oauth undefined
      //essentially we can get two user objs one from google oauth and the one we created from our schema
  
    //console.log(user)
    
    const handleDrop = () => {
      setIsOpen(!isOpen)
    }

    const dropIsFalse = () => {
      setIsOpen(false)
    }

    
    
    useEffect(()=>{
       const token = user?.token

      if(token){
       const decodedToken = decode(token)

       if(decodedToken.exp * 1000 < new Date().getTime()){
         logout();
       };
      }
       setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])

    useEffect(() => {
      let menuChecker = (e)=>{
        if(!menuTriggerCheck.current.contains(e.target)){
          setIsOpen(false)
        }
      };

      document.addEventListener("mousedown",menuChecker);
      

      return() => {
        document.removeEventListener("mousedown", menuChecker);
      }
    })
    
    
    
  return (
    
    <div>
    <AppBar className={classes.appBar} position="static" color="inherit" >
      <div className={classes.brandContainer}>
  
        {/* Our Navbar Logo */}
      <Typography component={Link} to='/posts' className={classes.heading} variant="h2" align="center">LifeStyle
          <img className={classes.image} src={memories} alt="memories" height="60"/> 
        </Typography>
      </div>
      <Toolbar className={classes.toolbar}>
         {user ? (
             <div className={classes.profile}>
              
              {/* Our drop down */}
             <div  ref={menuTriggerCheck}> {/* First we define a ref which references the current div clicked we then have a mousedown event in our Use effect so we can close the div when clicked*/}
              <Avatar className={classes.purple} alt={vehicle.name } src={vehicle.imageUrl} onClick={handleDrop}>
               {vehicle.name.charAt(0)}</Avatar>
                 { isOpen &&  (
                  <Dropdown className="hello" name={vehicle.name} src={vehicle.imageUrl} isOpen={open} dropIsFalse={dropIsFalse}/> )
          }
                 </div>
                
                 
                 
              <Button variant="contained" className={classes.logout} onClick={logout}>Logout</Button>
             </div>
            
         ) : (
            <Button component={Link} to="/auth" variant='contained' color="primary">
              Sign In
            </Button>
         )

         }
      </Toolbar>
       
      </AppBar>
      </div>
      
  )
}

export default Navbar