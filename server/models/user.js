const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String
    },
    mobile: {
        type: String,
    }
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        maxlength: 10,
        minlength: 10,
    },
    image: {
        type: String,
    },
    contacts: [contactSchema]
});

userSchema.pre('save', function (next) {
    if (!this.name) this.name = this.mobile;
    next()
})

const User = mongoose.model('User', userSchema);

module.exports = User;