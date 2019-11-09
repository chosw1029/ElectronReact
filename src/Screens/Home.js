import React, {useEffect} from 'react';
import '../App.css';
const { ipcRenderer, remote } = window.require('electron');

function Home() {

      const titleBarClick = (event) => {
        remote.getCurrentWindow().unmaximize();
      };

  return (
    <div id="title" className="Header" onDoubleClick={titleBarClick}> 
      
    </div>
  );
}

export default Home;
