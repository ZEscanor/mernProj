import React , {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { sendMessage, getUsers, getMessages } from '../../actions/actionPost';
import { Avatar } from '@material-ui/core';
import {FaLocationArrow, FaAccessibleIcon} from 'react-icons/fa';
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
    const [createMessageButton, setCreateMessageButton] = useState(false);

    const [users, setUsers] = useState([]);

   const user = JSON.parse(localStorage.getItem('profile'));

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = async (e) => {
    
      e.preventDefault();
      //console.log(message, 'message from messenger');
      const data = await dispatch(sendMessage(user?.result?._id, message));
      console.log(data, 'data from messenger');
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
    }, [dispatch, user?.token, user?.result?._id, getUsers, getMessages]);


    


  return (
    <div>
      

      <div>
        {/* <div>
          {messages?.map((message) => (
            <div>
              <h1>{message.title}</h1>
              <p>{message.message}</p>

              </div>
          ))}

      </div> */}
      <div className={classes.messageDropDown} >

      <div>
        <button className={classes.buttons} 


      >
         <FaLocationArrow 
         
         />
        </button>
        <button  className={classes.buttons} > 
          <FaAccessibleIcon />
        </button>
        <button  className={classes.buttons} >
        <FaAccessibleIcon/>
        </button>
      
        <h1>Messages</h1>
        <div>
          {messages.length > 0 ? messages.map((message, idx) => (
            <div className={classes.messageHolder} key={idx}
          
              >
              <p>{message.title}</p>
              <p>{message.message}</p>
               {/* {console.log(users.find(user => user._id === message.recipient).name, 'user from messenger')} */}
              <p>{users.find(user => user._id === message.recipient).name}</p>
              
      </div>
          )) : <h1>No Messages</h1>}

      </div>
      </div>
      </div>
     

   
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
          <input type="text" placeholder="Message"
            value={message.message}
            name='message'
            onChange={handleChange}
          />
          <input type="text" placeholder="Recipient"
            name='recipient'
            value={message.recipient}
            onChange={handleChange}
          />
          <input type='name' 
            value={users[message.recipient]?.name}
            />

          {/* <select name="recipient" id="recipient" onChange={handleChange}>
            <option value="">Select a recipient</option>
            {users?.map((user) => (
              <option value={user._id}>{user.name}</option>
            ))}
          </select> */}
          <button  
          className={classes.buttonSubmit}
            type="submit"
          
          
          >Send</button>
        </form>

      <ContactList users={users} message={message} setMessage={setMessage} />


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



