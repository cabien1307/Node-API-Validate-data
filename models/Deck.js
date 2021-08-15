const mongoose = require('mongoose');

const Scheme = mongoose.Schema;

const DeckSchema = new Scheme({
    name: {
        type: String

    },
    desc: {
        type: String
    },
    total: {
        type: Number,
        default: 0
    },
    owner: [{
        type: Scheme.Types.ObjectId,
        ref: 'User'
    }]
})

const Deck = mongoose.model('Deck', DeckSchema);

module.exports = Deck