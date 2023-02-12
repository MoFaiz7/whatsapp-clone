import { MoreVert } from '@mui/icons-material';
import { AttachFile } from '@mui/icons-material';
import { InsertEmoticon } from '@mui/icons-material';
import { Mic } from '@mui/icons-material';
import { SearchOutlined } from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import db from '../firebase';
import './Chat.css'
import {useStateValue} from '../StateProvider'
import firebase from 'firebase/compat/app';

function Chat() {

  const [input, setInput] = useState('');
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{user}, dispatch] = useStateValue();


  useEffect(() => {
    if (roomId) {
      db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
        setRoomName(snapshot.data().name)
      ))
      db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => (
        setMessages(snapshot.docs.map(doc => doc.data()))
      ))
    }
  }, [roomId])


  const sendMessage = (e) => {
    e.preventDefault();

    db.collection('rooms').doc(roomId).collection('messages').add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })

    setInput('');
  }

  return (
    <div className='chat' >
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random() * 5000)}.svg`} alt='Reeba' />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>last seen{" "}
            {new Date(
              messages[messages.length-1]?.timestamp?.toDate()).toLocaleString()}
          </p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>

          <IconButton>
            <AttachFile />
          </IconButton>

          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">

        {messages.map((message)=>(
          <>
          <p className={`chat__message ${message.name===user.displayName && "chat__reciever"}`}>
          <span className="chat__name">
            {message.name}
          </span>
          {message.message}
          <span className="chat__timestamp">
            {new Date(message.timestamp?.toDate()).toLocaleString()}
          </span>
        </p>
        {/* <p className="chat__message">Hey Guys</p> */}
        </>
        ))}
      </div>

      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder='Type a message...' />
          <button onClick={sendMessage} type='submit' >Send a message</button>
        </form>
        <Mic />
      </div>

    </div>
  )
}

export default Chat