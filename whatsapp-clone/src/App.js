import React, {useState} from 'react';
import './App.css';
import Sidebar from './Components/Sidebar';
import Chat from './Components/Chat';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Components/Login';
import {useStateValue} from './StateProvider'


function App() {
  const [{user}, dispatch] = useStateValue();

  // const [user, setUser] = useState(null)

  return (
    <div className="app">
      {!user?(
        <Login/>
      ):(
        <div className="app__body">
      <Router>
      <Sidebar/> 
        <Routes>
          <Route exact path='/' element={<Chat/>} />
          <Route exact path='/rooms/:roomId' element={<Chat/>} />
        </Routes>
      </Router>
      </div>
      )}
    </div>
  );
}

export default App;
