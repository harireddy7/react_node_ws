const fs = require('fs');
const path = require('path');

const CHATS = JSON.parse(fs.readFileSync(path.join(__dirname, '../dev-data/random-chats.json'), 'utf-8'));
const CONTACTS = JSON.parse(fs.readFileSync(path.join(__dirname, '../dev-data/random-users.json'), 'utf-8'))

const getChatsById = (req, res) => {
    // const userId = req.params.id;

    const chatsObj = CHATS;
    Object.keys(chatsObj).forEach(receiver => {
        chatsObj[receiver] = chatsObj[receiver].map(message => ({
            ...message,
            sender: CONTACTS.find(c => c.mobile === message.sender)
        }));
    });
    // console.log(chatsObj);
    res.status(200).json({
        status: 'success',
        data: {},
    })
}


module.exports = {
    getChatsById,
}