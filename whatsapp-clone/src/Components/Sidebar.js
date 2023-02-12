import React, {useState, useEffect} from 'react'
import './Sidebar.css'
import {Avatar, IconButton} from '@mui/material'
import { DonutLarge } from '@mui/icons-material';
import { Chat } from '@mui/icons-material';
import { MoreVert } from '@mui/icons-material';
import { SearchOutlined } from '@mui/icons-material';
import SidebarChat from './SidebarChat';
import db from '../firebase'
import {useStateValue} from '../StateProvider'

function Sidebar() {

  const [rooms, setRooms] = useState([]);
  const [{user}, dispatch] = useStateValue();
  useEffect(()=>{
    const unsubscribe = db.collection('rooms').onSnapshot((snapshot)=>
      setRooms(snapshot.docs.map((doc)=>({
        id: doc.id,
        data: doc.data(),
      })))
    )

    return ()=> {
      unsubscribe();
    }

  }, []);

  return (
    <div className='sidebar' >
        <div className="sidebar__header">
          <Avatar className='post__avatar' src={user?.photoURL} alt="Remy Sharp" />
          <div className="sidebar__headerRight">

            <IconButton>
              <DonutLarge/>
            </IconButton>

            <IconButton>
              <Chat/>
            </IconButton>

            <IconButton>
              <MoreVert/>
            </IconButton>

          </div>
        </div>

        <div className="sidebar__search">
          <div className="sidebar__searchContainer">
            <SearchOutlined/>
            <input type="text" placeholder="Search or start new chat" />
        
          </div>
        </div>

        <div className="sidebar__chats">
          <SidebarChat chat={false}/>
          {rooms.map((room)=>(
            <SidebarChat key={room.id} id={room.id} name={room.data.name} chat={true} />
          ))}
        </div>
    </div>
  )
}

export default Sidebar