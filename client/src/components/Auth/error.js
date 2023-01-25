import { Typography } from '@material-ui/core';
import React,{useEffect} from 'react';

const Error = ({error}) => {
  



if(error.length>0){
    return (

        <Typography>
        {error.map(item => (
        <div>{item}</div>
      ))}
        </Typography>
    )
}
else{
    return (
        <div>Error</div>
      )
}



    
    
}

export default Error