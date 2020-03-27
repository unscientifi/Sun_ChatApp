const express = require('express');
const path = require('path');
const app = express();

// import the socket.io library
const io = require('socket.io')(); 
// instantiate the socket.io library right away with the () method -> makes it run

const port = process.env.PORT || 3030;

app.use(express.static('public'));

// dynamic
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/views/index.html"));
    console.log('at the home route');
});

// app.get('/chat', (req, res) => {
//     res.sendFile(path.join(__dirname + "/views/chat.html"));
//     console.log('at the chat route');
// });

const server = app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

// this is all of our socket.io messaging functionality

// attach socket.io
io.attach(server);

io.on('connection', function(socket) {
    console.log('user connected');
    socket.emit('connected', { sID: `${socket.id}`, message: 'new connection'});
    
    // socket.on('room_message', function(msg) {
    //     console.log(msg);
    //     io.emit('new_message', { id: socket.id })
    // })

    // listen for an incoming message from a user (socket refers to an individual user)
    // msg is the incoming message from that user
    socket.on('chat_message', function(msg) {
        console.log(msg);
    // room = `${socket.id} has joined the chat!`;
    // // user name
    // socket.on('new_user', function(name){
    //     io.emit('usernamedisplayed', {id: socket.id, message: name});
    // })
        // when we get a new message, send it to everyone so they see it
        // io is the switchboard operator, making sure everyone who's connected
        // gets the messages
        io.emit('new_message', { id: socket.id, message: msg })
    })


    // listen for a disconnect event
    socket.on('disconnect', function() {
        console.log('a user disconnected');

        // info = `${socket.id} has left the chat!`;
        io.emit('user_disconnect', message);
    })


   
})