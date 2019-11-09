import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Link } from 'react-router-dom';
const { ipcRenderer, remote } = window.require('electron');

function Login() {

  const showDialog = () => {
    remote.dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] })
  }

  const newWindow = () => {
      /*
    let window = remote.getCurrentWindow();
    window.close();

    let child = new remote.BrowserWindow({width:800,height:600, webPreferences: {
      nodeIntegration: true
     }});


    child.webContents.openDevTools();

    child.loadURL('http://localhost:3000/home');

    child.once('ready-to-show', () => {
        child.show()
      })

    // Emitted when the window is closed.
    child.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        remote.dialog.showMessageBox({
            message: "Close button has been pressed!",
            buttons: ["OK"]
        });
    })

    console.log("=============================")
    //ipcRenderer.emit("window-all-closed");
    */
    

   //remote.getCurrentWindow().
    remote.getCurrentWindow().setBounds({ width: 1024, height: 768 })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This is Login Page.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={showDialog}/>
        <Link to="/home"><button onClick={newWindow}/></Link>
      </header>
    </div>
  );
}

export default Login;
