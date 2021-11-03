const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const cors = require('cors');

// routers
const usersRouter = require('./routes/users');
const contactsRouter = require('./routes/contacts');
const chatsRouter = require('./routes/chats');

const app = express();

app.use(express.json());

const whitelistUrl = 'https://impulse-chat.herokuapp.com/';
var corsOptions = {
	origin: function(origin, callback) {
		if (process.env.NODE_ENV === 'development') {
			callback(null, true)
		} else if (origin === whitelistUrl || origin === undefined) {
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
app.use('/api/v1/user', usersRouter);
app.use('/api/v1/chats', chatsRouter);
app.use('/api/v1/contacts', contactsRouter);

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
	// console.log('new connection made...SOCKET ID:: ', socket.id);
	const id = socket.handshake.query.id;
	socket.join(id);

	// handle chat message from client
    socket.on('inputMessage', data => {
		const { text, sender, receiver, timestamp } = data;
		const emitObj = {
			text,
			sender,
			receiver,
			timestamp,
		}
		socket.broadcast.to(receiver).emit('outputMessage', emitObj);
		
        // socket.broadcast.emit('output', data);
	})

});
