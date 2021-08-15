const User = require('../models/User');
const Deck = require('../models/Deck');

const index = async (req, res, next) => {
    const decks = await Deck.find()

    return res.status(200).json(decks)
}

const newDeck = async (req, res, next) => {
    // find owner
    const owner = await User.findById(req.value.body.owner)

    // create new deck
    const deck = req.value.body
    delete deck.owner

    deck.owner = owner._id
    const newDeck = new Deck(deck)
    await newDeck.save()

    // add newly created deck to the array decks
    owner.decks.push(newDeck._id)

    await owner.save()
    return res.status(201).json(newDeck)

}

const getDeck = async (req, res, next) => {
    const deck = await Deck.findById(req.value.params.deckID)

    return res.status(200).json(deck)

}

const replaceDeck = async (req, res, next) => {
    const { deckID } = req.value.params

    const newDeck = req.value.body
    await Deck.findByIdAndUpdate(deckID, newDeck)

    // check if put user, remove deck in user's model

    return res.status(200).json({
        action: 'Success !'
    })
}

const updateDeck = async (req, res, next) => {
    const { deckID } = req.value.params

    const newDeck = req.value.body
    await Deck.findByIdAndUpdate(deckID, newDeck)

    return res.status(200).json({
        action: 'Success !'
    })
}
const deleteDeck = async (req, res, next) => {
    const { deckID } = req.value.params

    const deck = await Deck.findById(deckID);
    const ownerID = deck.owner

    // get owner
    const owner = await User.findById(ownerID)

    // Remove the deck
    await deck.remove();

    // Remove deck from owner's list
    owner.decks.pull(deck)
    await owner.save();

    return res.status(200).json({
        action: 'Success !'
    })
}   

module.exports = {
    index,
    newDeck,
    getDeck,
    replaceDeck,
    updateDeck,
    deleteDeck,
}