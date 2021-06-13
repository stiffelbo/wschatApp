const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();


//messages
const messages = [];
const users = [];

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

//runserver on port 8000

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on Port:', 8000)
});
const io = socket(server);

io.on('connection', (socket) => {  
  socket.on('message', (message) => {    
    messages.push(message);
    socket.broadcast.emit('message', message);
  });
  socket.on('join', (user) => {    
    users.push({userName: user.userName, socketId: socket.id});
    const messageContent = `${user.userName} joined conversation`;
    const message = {author : 'ChatBot', content: messageContent};
    socket.broadcast.emit('message', message);
  });
  socket.on('disconnect', () => { 
    const id = socket.id;
    console.log('disconected: ', id);   
    users.forEach((val, index) =>{
      if(val.socketId == id) {             
        const messageContent = `${val.userName} left conversation.`;
        const message = {author : 'ChatBot', content: messageContent};
        socket.broadcast.emit('message', message);      
        users.splice(index, 1);
      } 
    });
  });
  console.log('I\'ve added a listener on message and disconnect events \n');
});