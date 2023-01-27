import { Typography } from '@material-ui/core';
import useStyles from "./styles.js";
import React,{useEffect} from 'react';

const Error = ({error}) => {
  
  const classes = useStyles();



if(error.length>0){
    return (

        <Typography component={'div'}>
        {error.map( (item, i) => (
        <Typography key={i} className={classes.errorMessages}>{item}</Typography>
      ))}
        </Typography>
    )
}
else{
    return null
}



    
    
}

export default Error