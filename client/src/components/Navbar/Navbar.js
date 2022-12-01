import React,{useState,useEffect} from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import {Link,useHistory,useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import memories from "../../images/memories.png";
const Navbar = () => {
    const classes = useStyles();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch();
    const history = useHistory();
    const loaction = useLocation();
    const logout = () => {
     dispatch({type:"LOGOUT"});
     history.push('/')
     setUser(null);
    }

    useEffect(()=>{
       const token = user?.token


       setUser(JSON.parse(localStorage.getItem('profile')))
    },[loaction])
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
  

      <Typography component={Link} to='/' className={classes.heading} variant="h2" align="center">Memories
          <img className={classes.image} src={memories} alt="memories" height="60"/>
        </Typography>
      </div>
      <Toolbar className={classes.toolbar}>
         {user ? (
             <div className={classes.profile}>
              <Avatar className={classes.purple} alt={user.userName} src={user.imageUrl}> {user.userName.charAt(0)}</Avatar>
              <Typography className={classes.userName} variant="h6">{user.userName}</Typography>
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
  )
}

export default Navbar