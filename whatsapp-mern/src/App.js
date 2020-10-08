import React, { useEffect, useState } from 'react';
import './App.css';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import Pusher from "pusher-js"
import axios from "./axios"
require ('dotenv').config();

function App() {
  const [messages,setMessages]=useState([]);
  useEffect(()=>{
      axios.get('/messages/sync')
      .then(response=>{
          setMessages(response.data);
      })
  },[]);
  

  useEffect(()=>{
    const pusher = new Pusher(process.env.PUSHER_KEY, {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(data) {
      setMessages([...messages,data])
    });
    return ()=>{
      channel.unbind_all();
      channel.unsubscribe();
    }
  },[messages])
  console.log(messages);
  return (
    <div className="app">
      <div className="app__body">
      <Sidebar/>
      
      <Chat messages={messages}/>
      </div>
      
    </div>
  );
}

export default App;
