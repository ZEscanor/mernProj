
import React from 'react';






// this component will style and display an individual message from an array of messages
const MessageCard = ({users,message}) => {
 
    return(
      <div>
        <div>
          <h1>{message.title}</h1>
            <p> Recipient: {users.find(user => user._id === message.recipient).name}</p>
          <p style={{
            margin: '10px',
            padding: '10px',
            borderRadius: '10px',
            fontSize: '20px',
            width: '300px',
            wordWrap: 'break-word',
                overflowWrap: 'break-word',
  
          }}> Content: {message.message}</p>
          
         
          
        </div>
      </div>
    )
  }
  export default MessageCard;