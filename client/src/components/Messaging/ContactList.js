
import React from 'react';

import { Avatar } from '@material-ui/core';








 // this component is a contact list for users that can be messaged
const ContactList = ({users, message, setMessage}) => {

    return(
    <div>
          <h1>Contact List</h1>
          <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '80%',
            height: '80%',
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
          }}
          >
            {users?.map((user, idx) => (
              <div 
                key={idx}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '20px',
                boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
                marginBottom: '10px',
                cursor: 'pointer'
  
              }}
              onMouseEnter = {opacity => {
                opacity.target.style.opacity = 0.5;
                
  
              }}
              onMouseLeave = {opacity => {
                opacity.target.style.opacity = 1;
  
                
              }}
  
              onClick={() => {
  
                setMessage({ ...message, recipient: user._id });
                setCreateMessageButton(true);
                
              }}
              
              >   
                 <Avatar src={user.imageUrl} alt={user.name} style={{
                    margin: '10px',
                    padding: '10px',
                    borderRadius: '10px',
                    boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)'
  
  
                 }}
                 >
                {user.name.charAt(0)}
                 </Avatar>
                  <p>{user.name}</p>
              </div>
            ))}
  
        </div>
  
      </div>
    )
                }
export default ContactList;