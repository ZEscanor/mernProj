import { Typography } from '@material-ui/core';
import useStyles from "./undefinedStyle.js";
import React from 'react';

const routeUndefined = () => {

const classes = useStyles();
  return (
    <Typography className={classes.undefined}>Sorry that path doesnt exist</Typography>
  )
}

export default routeUndefined


// this is our 404 page. It is a simple component that displays a message if the user tries to go to a path that doesnt exist.