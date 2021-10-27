const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();

app.use(express.json());

var corsOptions = {
	origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 8080;
const server = app.listen(
	PORT,
	console.log(`App is listening on port ${PORT}`)
);

// send static react bundles to browser

app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
});

app.use(express.static(path.join(__dirname, '../build')));
app.use('/*', express.static(path.join(__dirname, '../build')));

const io = socketIO(server, {
	cors: {
		origin: 'http://localhost:3000',
	},
});

io.on('connection', (socket) => {
	console.log('new connection made...');
	// console.log(socket);

	socket.emit('connected');

	// DISCONNECT
	socket.on('disconnect', (reason) => {
		console.log(`socket disconnected due to ${reason}`);
    });
    

    socket.on('chat-message', data => {
        socket.broadcast.emit('message-received', data);
    })

});
