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