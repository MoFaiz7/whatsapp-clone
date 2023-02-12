import { Avatar } from '@mui/material'
import React, { useState, useEffect } from 'react'
import './SidebarChat.css'
import db from '../firebase';
import {Link} from "react-router-dom"

function SidebarChat({id, name, chat}) {


    const [seed, setSeed] = useState('');
    const [message, setMessage] = useState("")

    useEffect(()=>{
        if(id){
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot=>(
                setMessage(snapshot.docs.map((doc)=>doc.data()))
            ))
        }
    }, [id])

    useEffect(()=>{
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    const createChat = ()=>{
        const roomName = prompt("Please enter name for chat");
        if(roomName){
            //create new room 
            db.collection('rooms').add({
                name: roomName,
            })
        }
    }

  return chat ? (
    <Link to={`/rooms/${id}`} >
        <div className='sidebarChat'>
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className="sidebarChat__info">
                <h2>{name}</h2>
                <p>{message[0]?.message}</p>
            </div>
        </div>
    </Link>
  ):(
      <div onClick={createChat} className="sidebarChat">
          <h3>Add new Chat</h3>
      </div>
  )
}

export default SidebarChat