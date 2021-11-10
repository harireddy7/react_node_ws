const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: String,
    receiver: String,
    text: String,
    timestamp: Date
})

const chatSchema = new mongoose.Schema({
    members: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    }],
    conversation: [messageSchema]
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;

/*

chats: {
    members: [user1, user2],
    conversation: [
        {message1}, {message2}, ....
    ]
}


*/