// Loads ENV variables
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, './.env') });

const mongoose = require('mongoose');
const socketIO = require('socket.io');

const app = require('./index');
const User = require('./models/user');

// MONGOOSE CONNECTION
const { DB_STRING, DB_PASSWORD } = process.env;
const CONNECTION_STRING = DB_STRING.replace('<PASSWORD>', DB_PASSWORD);

mongoose.connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB connected succesfully!');
})

// SERVER
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`server listening for requests on port ${PORT}`));

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
        
        const user = new User({
            mobile: sender,

        })

        console.log(user)

		socket.broadcast.to(receiver).emit('outputMessage', emitObj);
		
        // socket.broadcast.emit('output', data);
	})

});
