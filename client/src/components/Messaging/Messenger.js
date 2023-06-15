import React , {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { sendMessage, getUsers, getMessages, deleteMessage } from '../../actions/actionPost';
import { Avatar } from '@material-ui/core';
import {FaLocationArrow, FaAccessibleIcon, FaTrash, FaUser, FaArrowLeft} from 'react-icons/fa';
import useStyles from './MessageStyles';
import MessageCard from './MessageCard';
import SendMessageComponent from './SendMessageComponent';




 // meesger component will display all the messages that the user has sent and received
const Messenger = () => {
   const classes = useStyles();
   const [messages, setMessages] = useState([]); //this is the data we will be getting from the backend to display messages received and sent
   const [message, setMessage] = useState({
      title: '',
      message: '',
      creator: '',
      createdAt: '',
      recipient
      : ''
    });  //this is the data we will be sending to the backend when a new message is created
    const [currentMessage, setCurrentMessage] = useState({}); //this will be the current message that we are looking at
    const [createMessageButton, setCreateMessageButton] = useState(false); //this will be a boolean that will determine if we are in create message mode or not
    const [messageClicked, setMessageClicked] = useState(false); // a boolean to determine what state we are in, we clicked a message so reset buttons and states
    const [toggleDeleteMode, setToggleDeleteMode] = useState(false); // a boolean to determine if we are in delete mode or not, if clicked we are able to delete messages

    const [users, setUsers] = useState([]); //this will be the data we get from the backend to display all the users

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
      alert('Message Sent!');
      setCreateMessageButton(false);
      return data;
      
      
      //history.push('/messenger');
    } //this will be the function that will be called when we submit a new message
    const clear = () => { 
      setMessage({ title: '', message: '', creator: '', createdAt: '', recipient: '' });
    }  //this will be the function that will clear the message form after we submit a new message


    const handleChange = (e) => {

      setMessage({ ...message, [e.target.name]: e.target.value, creator: user?.result?._id, createdAt: new Date().toISOString() });
    } //this will be the function that will be called when we change the input fields in the message form
 
    const handleDelete = async(currMessage) => {
      
      setToggleDeleteMode(!toggleDeleteMode);
     console.log(messages[currMessage], 'currMessage from messenger');
    const data =  await dispatch(deleteMessage(user?.result?._id, messages[currMessage]));
    setMessageClicked(false);
    return data;
    } //this will be the function that will be called when we click the delete button, it will delete the message from the database

    const handleButtons = (input) => {
      if (input === 'create') {
        setCreateMessageButton(true);
        setMessageClicked(false);
        console.log('create button clicked', createMessageButton);
      } 
      else if (input === 'messages') {
        setCreateMessageButton(false); 
        setMessageClicked(true);
        setCurrentMessage(messageX)
      }
      else if (input === 'back') {
        setCreateMessageButton(false);
        setMessageClicked(false);
      }
      else if (input === 'delete') {
        setToggleDeleteMode(!toggleDeleteMode);
      }
    } // we handle our buttons here, we will be able to create a new message, go back to the messages page, and delete messages

    

    useEffect( () => {
      if (user?.token) {
        const fetchData = async () => {
          const userData = await dispatch(getUsers());
        
          setUsers(userData);
          const messageData = await dispatch(getMessages(user?.result?._id));
     
          setMessages(messageData);
        };
    
        fetchData();
      }
    }, [dispatch, user?.token, user?.result?._id, getUsers, getMessages, messages]); 
    //this will be the function that will be called when the component mounts, it will get all the users and messages from the backend
    // if any field changes it will remount the component


    


  return (
    <div>
      

      <div>
  
      <div className={classes.messageDropDown} >

      <div>
      {/* onClick={() => setMessageClicked(false)} */}
        {messageClicked && <button 
        onClick={() => handleButtons('back')}
        ><FaArrowLeft/> Back</button>}
       
       {createMessageButton && <button
        onClick={() => handleButtons('back')}>
          <FaArrowLeft/> Back
        </button>}
       
        <button className={classes.buttons} 
        onClick={() => handleButtons('create')}
      >
         <FaLocationArrow
         />

        </button>
   {!messageClicked && !createMessageButton && <button  className={classes.buttons}
        onClick={() => handleButtons('delete')}
        
        > 
          <FaTrash />
        </button>   }
        {!messageClicked && !createMessageButton && <h1>Messages</h1>}
        <div>
          
          {!messageClicked && messages.length > 0 && !createMessageButton ? messages.map((messageX, idx) => (
            <div className={classes.messageHolder} key={idx}
            onClick={() => { 
              setMessageClicked(true);
              setCurrentMessage(messageX);
            }}
          
              >
              <p className = {classes.title}>
              Title: {messageX.title}</p>
          
              <p className = {classes.messengerContent}> 
              Sent To: {users.find(user => user._id === messageX.recipient).name}</p>
              <p className = {classes.messengerContent}>
                Sent By: {users.find(user => user._id === messageX.creator).name}
                </p>
              <div>
                
                <p>Message Sent At: {new Date(messageX.createdAt).toLocaleString()
                
                
                }</p>
            
                {toggleDeleteMode && <button
                className={classes.deleteButton}
                onClick={() => handleDelete(idx)}
                >Delete</button>}
                </div>
                
      </div>
      
          )) : messageClicked ? <MessageCard users={users} message={currentMessage} /> : createMessageButton && <SendMessageComponent users={users} message={message} handleSubmit={handleSubmit} classes={classes} handleChange={handleChange} setMessage={setMessage} />}

      </div>
      </div>
      </div>
     

   
      <div>
      </div>

        
    </div>
    </div>
  )
}

export default Messenger






