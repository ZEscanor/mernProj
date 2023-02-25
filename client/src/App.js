import React, {useState} from "react";
import {Container} from '@material-ui/core'; 
import { Switch, Route, Redirect} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import User from "./components/User/User";
import routeUndefined from "./components/404/routeUndefined";
import useStyles from "./styles.js";
import working from "./components/404/working";
import AdminPage from "./components/Admin.js/AdminPage";
import AdminSide from "./components/Admin.js/AdminSide";
import CssBaseline from '@mui/material/CssBaseline';


const App = () => {
  const classes = useStyles();

  
  return (
    <Container maxWidth ='xl' className={classes.responsive}  >
      <CssBaseline/>
      <Navbar/>
      

      <Switch>
        <Route path="/" exact component={()=><Redirect to="/posts"/>}/>
        <Route path="/posts" exact component={Home}/>
        <Route path="/posts/search" exact component={Home}/>
        <Route path="/posts/:id"  component={PostDetails}/>
        <Route path="/auth" exact component={()=>(!JSON.parse(localStorage.getItem("profile")) ? <Auth/> : <Redirect to="/posts"/>)}/>
        <Route path="/users" component={User}/>
        <Route path="/working" component={working}/>
        <Route path="/admin" component={AdminPage}/>
        <Route path="/side" component={AdminSide}/>
        <Route path='*' exact={true} component={routeUndefined} />
      </Switch>
    </Container>
  )
}

export default App