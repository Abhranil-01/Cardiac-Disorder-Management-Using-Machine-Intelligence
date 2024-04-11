  import React, { useEffect, useState } from 'react';
  import './chatbot.css';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faRobot, faUser,faXmark } from '@fortawesome/free-solid-svg-icons';

  function Chatbot({close}) {
    const handleClose = () => {
      close(); // Call the close function passed from the parent component
    };
    const [chat,setChat]=useState([]);
    const [addIcon, setAddIcon] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
      setAddIcon('/src/Images/icon/send.png');

      setMessage(e.target.value)
      console.log('ch',height);
      if (e.target.value.length === 0) {
        setAddIcon('');
      }
    };
    
    useEffect(()=>{
   
      console.log("called");
      const objDiv = document.getElementById('messageArea');
      objDiv.scrollTop = objDiv.scrollHeight;
      
  
  },[chat])
    
    const handleSubmit=(e)=>{
      e.preventDefault();
      const request_temp = {sender:'user',msg : message};
      
      if(message !== ""){
          
          setChat(chat => [...chat, request_temp]);
          setMessage('');
          rasaAPI(message);
      }
      else{
          window.alert("Please enter valid message");
      }
      
  }


  const rasaAPI = async function handleClick(msg) {
  
      //chatData.push({sender : "user", sender_id : name, msg : msg});
      

        await fetch('http://127.0.0.1:8000/api/chatbot/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: "same-origin",
          body: JSON.stringify({ "msg": msg }),
      })
      .then(response => response.json())
      .then((response) => {
          if(response){
            console.log(response);
                     


             
        
            const response_temp = {sender: "bot",id:Date.now(),msg: response};
              setChat(chat => [...chat, response_temp]);
             // scrollBottom();

          }
      }) 
  }
chat.map((chat) =>{
  console.log(chat.sender);
  if(chat.sender === "bot"){
   console.log(chat.msg.response);
  }else{
    console.log(chat.msg);
  }
})

    return (
      <>
        <div className="chatbot" >
          <div className='head text-white d-flex align-items-center justify-content-between  bg-primary px-3'>
            <h4>Chatbot</h4>
            
            <span className='fw-bold fs-3' data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}>
            <FontAwesomeIcon icon={faXmark} />
            </span>
          </div>
          <div className="chatbox" id="messageArea">
            <div className="incoming gap-2">
              <span className='chat-robot bg-secondary text-white'> <FontAwesomeIcon icon={faRobot} /></span>
              <div className="bot-chat bg-secondary   fw-bold">
                <p className='text-white '>Hello, How can I help you?</p>
              </div>
            </div>
      {
        chat.map((user,key)=>(
          <>
          {user.sender==='bot' ?(
              <div className="incoming gap-2">
              <span className='chat-robot bg-secondary text-white'> <FontAwesomeIcon icon={faRobot} /></span>
              <div className="bot-chat bg-secondary   fw-bold">
                <p className='text-white '>{user.msg.response}</p>
              </div>
            </div>
          ):(
            <div className='out-chat gap-2' >
            <div className='outgoing bg-primary'>
                <p className='text-white fw-bold '>{user.msg}</p>
              </div>
              <span className='chat-user bg-primary text-white'> <FontAwesomeIcon icon={faUser} /></span>
            </div>
          )}
          
            </>
        )
      )
      }
            
          </div>
          <div className='chat' >
            <textarea  placeholder='Enter Message' value={message} onChange={handleChange} ></textarea>
            <span className='send'>
              <img src={addIcon} alt="" onClick={handleSubmit} />
            </span>
          </div>
        </div>

      </>
    );
  }

  export default Chatbot;
