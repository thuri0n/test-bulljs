import React from 'react';
import './App.css';
import io from 'socket.io-client';

const socket = io('127.0.0.1:3011', {
  transports: ['websocket'],
});

class App extends React.Component {
  handleClick() {
    socket.emit('request', {
      id: 1,
      data: 'data',
    });

    socket.emit('request', {
      id: 2,
      data: {
        "data:1":10,
        "data:2":10,
        "data:3":10,
        "data:4":10,
        "data:5":10,
        "data:6":10,
        "data:7":10,
        "data:8":10,
        "data:9":10,
        "data:10":10,
        "data:11":10,
        "data:12":10,
        "data:13":10,
        "data:14":10,
        "data:15":10,
        "data:16":10,
        "data:17":10,
        "data:18":10,
        "data:19":10,
        "data:20":10,
      },
    });

    socket.emit('request', {
      id: 3,
      data: 'data',
    });

    socket.emit('request', {
      id: 4,
      data: 'data',
    });
  }

  render() {
    return (
      <button onClick={(e) => this.handleClick(e)}>send</button>
    );
  }
}

export default App;
