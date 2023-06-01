
import React from 'react';

import ContactList from './ContactList';










const SendMessageComponent =  ({users, message, handleSubmit, handleChange, classes, setMessage}) => {
    return (
      <div>
        

         {message.recipient &&  <form 
            onSubmit={handleSubmit}
            className={classes.form}
        
          >
            
            <input type="text" placeholder="Title"
              value={message.title}
              name='title'
              onChange={handleChange}
            />
            <textarea type="text" placeholder="Message"
              value={message.message}
              name='message'
              onChange={handleChange}
              style={{
                height: '100px',
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
              }}
            />
            <input type='name' 
              value={message.recipient !== '' ? users.find(user => user._id === message.recipient).name : ''}
              />
  
            <button  
            className={classes.buttonSubmit}
              type="submit"
            
            
            >Send</button>
          </form>
}
  
        <ContactList users={users} message={message} setMessage={setMessage} />
  
            
        </div>
    )
  }

  export default SendMessageComponent;