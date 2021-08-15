const User = require('../models/User');
const Deck = require('../models/Deck');


const index = async (req, res, next) => {

    const users = await User.find();
    // throw new Error('Random Err');
    return res.status(200).json(users)

}

const newUser = async (req, res, next) => {

    const newUser = new User(req.value.body);
    const user = await newUser.save();
    return res.status(201).json(user)
}

const getUser = async (req, res, next) => {

    const { userID } = req.value.params;
    const user = await User.findById(userID)
    return res.status(200).json(user)
}

const replaceUser = async (req, res, next) => {
    // all of field
    const { userID } = req.value.params;
    const newUser = req.value.body;

    const result = await User.findByIdAndUpdate(userID, newUser)

    return res.status(200).json({
        action: 'success'
    })
}

const updateUser = async (req, res, next) => {
    // number of field
    const { userID } = req.value.params;
    const newUser = req.value.body;

    const result = await User.findByIdAndUpdate(userID, newUser)

    return res.status(200).json({
        action: 'success'
    })
}

const newUserDeck = async (req, res, next) => {
    const { userID } = req.value.params;

    // create new deck
    const newDeck = new Deck(req.value.body)

    // get user
    const user = await User.findById(userID)

    // Assign user as a deck's owner
    newDeck.owner = user

    // Save
    await newDeck.save()

    // Add deck to user's Deck array
    user.decks.push(newDeck._id)
    await user.save();

    return res.status(201).json(newDeck)
}

const getUserDeck = async (req, res, next) => {
    const { userID } = req.value.params;

    // get user
    const user = await User.findById(userID).populate('decks')
    return res.status(200).json(user.decks)
}



module.exports = {
    index,
    newUser,
    getUser,
    replaceUser,
    updateUser,
    getUserDeck,
    newUserDeck
}