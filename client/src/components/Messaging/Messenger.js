import React , {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { sendMessage, getUsers } from '../../actions/actionPost';





const Messenger = () => {
   const [messages, setMessages] = useState([]);
   const [message, setMessage] = useState({
      title: '',
      message: '',
      creator: '',
      createdAt: '',
      recipient
: ''
    });

   const user = JSON.parse(localStorage.getItem('profile'));

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = async (e) => {
    
      e.preventDefault();
      //console.log(message, 'message from messenger');
      const data = await dispatch(sendMessage(user?.result?._id, message));
      console.log(data, 'data from messenger');
      return data;
      //history.push('/messenger');
    }

    const handleChange = (e) => {

      setMessage({ ...message, [e.target.name]: e.target.value, creator: user?.result?._id, createdAt: new Date().toISOString() });
    }

    useEffect(() => {
      if(user?.token){
        // dispatch(getMessages());
      }
    }, [dispatch]);


    


  return (
    <div>
      <h1>Messenger</h1>

      <div>
        <h1>Messages</h1>
        {/* <div>
          {messages?.map((message) => (
            <div>
              <h1>{message.title}</h1>
              <p>{message.message}</p>

              </div>
          ))}

      </div> */}
      <div>
        <h1>Send a Message</h1>
        <form 
          onSubmit={handleSubmit}
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
          <button
            type="submit"

          
          >Send</button>
        </form>

      </div>


    </div>
    </div>
  )
}

export default Messenger