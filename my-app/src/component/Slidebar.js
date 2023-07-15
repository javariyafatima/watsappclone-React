import React from 'react';
import Navbar from './Navbar';
import Serchbar from './Serchbar';
import Chats from './Chats';

const Slidebar = () => {
  return (
    <div className='slidbar'>
      <Navbar/>
      <Serchbar/>
      <Chats/>
    </div>
  );
}

export default Slidebar;
