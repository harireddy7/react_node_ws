const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const cors = require('cors');

// routers
const contactsRouter = require('./routes/contacts');

const app = express();

app.use(express.json());

const whitelistUrl = 'https://pinghere.herokuapp.com/';
var corsOptions = {
	origin: function(origin, callback) {
		if (process.env.NODE_ENV === 'development') {
			callback(null, true)
		} else if (origin === whitelistUrl) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS!'));
		}
	}
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 8080;
const server = app.listen(
	PORT,
	console.log(`App is listening on port ${PORT}`)
);

// API ROUTES
app.use('/api/v1/contacts', contactsRouter)

// send static react bundles to browser
app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
});

app.use(express.static(path.join(__dirname, '../build')));
app.use('/*', express.static(path.join(__dirname, '../build')));

const io = socketIO(server, {
	cors: {
		origin: '*',
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
