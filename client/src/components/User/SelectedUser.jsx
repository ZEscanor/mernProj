import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import { Typography } from '@material-ui/core';
import useStyles from './styles';
import{editUser} from '../../actions/actionPost';




// WIP page for displaying user info, deciding what to do with it
const SelectedUser = ({
}) => {
  const ourCurrentLoggedUser = JSON.parse(localStorage.getItem('profile'));
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const yourUser = ourCurrentLoggedUser.result;
  const [isEditing, setIsEditing] = useState(false);
  const [inputZ, setInputZ] = useState(
    ""
  );
  const [inputZ2, setInputZ2] = useState(
    ""
  );
 

  const handleInputChange = (input) => {
    setInputZ(input)
    setIsEditing(true)
  }
  const handleInputChange2 = (input) => {

   
    
    setInputZ2(input)
    //console.log(inputZ2)
    
  }
  const handleSubmit = async (e) => {

    e.preventDefault();
    //console.log(inputZ, inputZ2)
    let payload = {
      ...yourUser,
      [inputZ]: inputZ2
      

    
  }
  
  const data = await dispatch(editUser(payload.id, payload))
  //console.log(data)
  setIsEditing(false)
  
  return data

  
}

    
     if(!yourUser){
        return null
     }
     if(yourUser.name === 'John Wick' || yourUser.email === 'jwick429@gmail.com'){
      history.push('/posts')
       alert('You cannot edit this demo User, please create your own account to access this feature, John Wick says so!')
      return null
     }
     
return( 
      <Typography className={classes.userCard}>
    {yourUser && (
        <div>
          <Typography className={classes.dropdownInner} 
          onClick={() => handleInputChange('name')}
          >
        <Typography className={classes.userInfo}
        
        >
         Change name: {yourUser.name}
         </Typography>
         </Typography>

         <Typography className={classes.dropdownInner}
           onClick={() => handleInputChange('email')}
         >
         <Typography  className={classes.userInfo}
          
         >
       Change email: {yourUser.email}
        </Typography>
        </Typography>
        
        <Typography className={classes.dropdownInner}>
        <Typography  className={classes.userInfo}
        >
        your role:{yourUser.role}
        </Typography>
        </Typography>
        
        <Typography className={classes.dropdownInner}
        onClick={() => handleInputChange('password')}  >
        <Typography  className={classes.userInfo}
        

        >
          change password
        </Typography>
        </Typography>


        

        {isEditing && ( 
          <Typography className={classes.dropdownInner} >
          <Typography  className={classes.userInfo}>
            {inputZ}
          <input type="text" placeholder="name" 
          onChange={(e) => handleInputChange2(e.target.value)}
           />
            <button onClick={handleSubmit}
            disabled = {!inputZ2}
            
            >submit</button>
          </Typography>
          </Typography>
        )}
        </div>
    )}
    </Typography> 
    








  )
}

export default SelectedUser


