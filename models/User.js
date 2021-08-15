const mongoose = require('mongoose');

const Scheme = mongoose.Schema;

const UserSchema = new Scheme({
    firstName: {
        type: String

    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    decks: [{
        type: Scheme.Types.ObjectId,
        ref: 'Deck'
    }]
})

const User = mongoose.model('User', UserSchema);

module.exports = User