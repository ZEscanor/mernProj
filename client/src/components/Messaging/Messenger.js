import React , {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { sendMessage, getUsers, getMessages, deleteMessage } from '../../actions/actionPost';
import { Avatar } from '@material-ui/core';
import {FaLocationArrow, FaAccessibleIcon, FaTrash, FaUser, FaArrowLeft} from 'react-icons/fa';
import useStyles from './MessageStyles';




const Messenger = () => {
   const classes = useStyles();
   const [messages, setMessages] = useState([]);
   const [message, setMessage] = useState({
      title: '',
      message: '',
      creator: '',
      createdAt: '',
      recipient
      : ''
    });
    const [currentMessage, setCurrentMessage] = useState({});
    const [createMessageButton, setCreateMessageButton] = useState(false);
    const [messageClicked, setMessageClicked] = useState(false);
    const [toggleDeleteMode, setToggleDeleteMode] = useState(false);

    const [users, setUsers] = useState([]);

   const user = JSON.parse(localStorage.getItem('profile'));

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = async (e) => {
    
      e.preventDefault();
      //console.log(message, 'message from messenger');
      const data = await dispatch(sendMessage(user?.result?._id, message));
      //console.log(data, 'data from messenger');
      clear();
      history.push('/messages');
      return data;
      
      
      //history.push('/messenger');
    }
    const clear = () => { 
      setMessage({ title: '', message: '', creator: '', createdAt: '', recipient: '' });
    }


    const handleChange = (e) => {

      setMessage({ ...message, [e.target.name]: e.target.value, creator: user?.result?._id, createdAt: new Date().toISOString() });
    }

    const handleDelete = async(currMessage) => {
      
      setToggleDeleteMode(!toggleDeleteMode);
     console.log(messages[currMessage], 'currMessage from messenger');
    const data =  await dispatch(deleteMessage(user?.result?._id, messages[currMessage]));
    setMessageClicked(false);
    return data;
    }

    useEffect( () => {
      if (user?.token) {
        const fetchData = async () => {
          const userData = await dispatch(getUsers());
          //console.log(userData, 'userData from messenger');
          setUsers(userData);
          const messageData = await dispatch(getMessages(user?.result?._id));
          //console.log(messageData, 'messageData from messenger');
          setMessages(messageData);
        };
    
        fetchData();
      }
    }, [dispatch, user?.token, user?.result?._id, getUsers, getMessages, messages]);


    


  return (
    <div>
      

      <div>
  
      <div className={classes.messageDropDown} >

      <div>
        {messageClicked && <button onClick={() => setMessageClicked(false)}><FaArrowLeft/> Back</button>}
        <button className={classes.buttons} 


      >
         <FaLocationArrow
         
         
         />
        </button>
   {!messageClicked &&    <button  className={classes.buttons}
        onClick={() => setToggleDeleteMode(!toggleDeleteMode)}
        
        > 
          <FaTrash />
        </button>   }
        <button  className={classes.buttons} >
        <FaUser/>
        </button>
      
        {!messageClicked && <h1>Messages</h1>}
        <div>
          
          {!messageClicked && messages.length > 0 ? messages.map((messageX, idx) => (
            <div className={classes.messageHolder} key={idx}
            onClick={() => { 
              setMessageClicked(true);
              setCurrentMessage(messageX);
            }}
          
              >
              <p style={
                {
                  fontWeight: 'bold',
                  fontSize: '20px',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  margin: '10px',
                  padding: '10px',



                }
              }>Title: {messageX.title}</p>
              {/* <p>{message.message}</p> */}
               {/* {console.log(users.find(user => user._id === message.recipient).name, 'user from messenger')} */}
              <p className = {classes.messengerContent}> 
              Sent To: {users.find(user => user._id === messageX.recipient).name}</p>
              <p className = {classes.messengerContent}>
                Sent By: {users.find(user => user._id === messageX.creator).name}
                </p>
              <div>
                
                <p>Message Sent At: {new Date(messageX.createdAt).toLocaleString()
                
                
                }</p>
            
                {toggleDeleteMode && <button
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  borderRadius: '10px',
                  padding: '10px',
                  margin: '10px',
                  cursor: 'pointer',
                  boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
                  position: 'relative',
                  left: '40%',
                  transform: 'translateX(-50%)',
                  width: '80px',
                  height: '50px',
                  fontSize: '20px',
                }} 
                onClick={() => handleDelete(idx)}
                >Delete</button>}
                </div>
                
      </div>
      
          )) : messageClicked ? <MessageCard users={users} message={currentMessage} /> : <p>No Messages</p>}

      </div>
      </div>
      </div>
     

   
      <div>
      <SendMessageComponent users={users} message={message} handleSubmit={handleSubmit} classes={classes} handleChange={handleChange} setMessage={setMessage} />
    


      </div>

        
    </div>
    </div>
  )
}

export default Messenger



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
          width: '20%',
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


const SendMessageComponent =  ({users, message, handleSubmit, handleChange, classes, setMessage}) => {

  // if(message.recipient === '') {
  //   return (
  //     <div>
  //       Something went wrong
  //     </div>
  //   )
  // }
  return (
    <div>
        <h1>Send a Message Beta</h1>
        <form 
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
          {/* <input type="text" placeholder="Recipient"
            name='recipient'
            value={message.recipient}
            onChange={handleChange}
          /> */}
          <input type='name' 
            value={message.recipient !== '' ? users.find(user => user._id === message.recipient).name : ''}
            />

          <button  
          className={classes.buttonSubmit}
            type="submit"
          
          
          >Send</button>
        </form>

      <ContactList users={users} message={message} setMessage={setMessage} />


      </div>
  )
}



