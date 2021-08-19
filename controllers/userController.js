const User = require('../models/User');
const Deck = require('../models/Deck');
const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../config')



const encodeToken = (userID) => {
    return jwt.sign({
        iss: 'CaBien',
        sub: userID,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 3)
    }, JWT_KEY)
}

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

const signUp = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.value.body;


    // Check if user has existed 
    const foundUser = await User.findOne({ email })
    console.log('found user:', foundUser);

    if (foundUser) {
        return res.status(403).json({
            msg: "User has been already !"
        });
    }

    // Create new user
    const newUser = new User({ firstName, lastName, email, password });
    const result = await newUser.save();

    // create token
    const token = encodeToken(newUser._id)
    res.setHeader('Authorization', token)

    return res.status(201).json(result);
}

const signIn = async (req, res, next) => {
    // assign token
    const token = encodeToken(req.user._id)
    res.setHeader('Authorization', token)

    return res.status(200).json({ success: true })
}

const secret = async (req, res, next) => {
    return res.status(200).json({ resources: true })
}

const authGoogle = async (req, res, next) => {
    const token = encodeToken(req.user._id)
    res.setHeader('Authorization', token)

    return res.status(201).json({ success: true })
}

const authFacebook = async (req, res, next) => {
    const token = encodeToken(req.user._id)
    res.setHeader('Authorization', token)

    return res.status(201).json({ success: true })
}
module.exports = {
    index,
    newUser,
    getUser,
    replaceUser,
    updateUser,
    getUserDeck,
    newUserDeck,
    signUp,
    signIn,
    secret,
    authGoogle,
    authFacebook,
}
