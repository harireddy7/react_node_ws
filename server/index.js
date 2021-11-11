const path = require('path');
const express = require('express');
const cors = require('cors');

// routers
const usersRouter = require('./routes/users');
const contactsRouter = require('./routes/contacts');
const chatsRouter = require('./routes/chats');

const app = express();

app.use(express.json());

const whitelistUrl = 'https://impulse-chat.herokuapp.com';
var corsOptions = {
	origin: function(origin, callback) {
		if (process.env.NODE_ENV === 'development') {
			callback(null, true)
		} else if (origin === undefined || (origin && origin.startsWith(whitelistUrl))) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS!'));
		}
	}
};

app.use(cors(corsOptions));

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

module.exports = app;