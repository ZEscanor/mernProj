import React , {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { sendMessage, getUsers, getMessages, deleteMessage } from '../../actions/actionPost';
import { Avatar } from '@material-ui/core';
import {FaLocationArrow, FaAccessibleIcon, FaTrash, FaUser, FaArrowLeft} from 'react-icons/fa';
import useStyles from './MessageStyles';
import MessageCard from './MessageCard';
import SendMessageComponent from './SendMessageComponent';





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
      alert('Message Sent!');
      setCreateMessageButton(false);
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
    }

    

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






