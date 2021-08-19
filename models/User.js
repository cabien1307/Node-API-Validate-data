const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const Scheme = mongoose.Schema;

const UserSchema = new Scheme({
    firstName: {
        type: String

    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    authGoogleId: {
        type: String,
        default: null
    },
    authFacebookId: {
        type: String,
        default: null
    },
    password: {
        type: String
    },
    authType: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        default: 'local'
    },
    decks: [{
        type: Scheme.Types.ObjectId,
        ref: 'Deck'
    }]
})

UserSchema.pre('save', async function (next) {
    try {
        if (this.authType !== 'local') next();

        // Generate salt
        const salt = await bcrypt.genSalt(10);

        // Hash password
        const passwordHash = await bcrypt.hash(this.password, salt)

        // Re-assign hash
        this.password = passwordHash;

        next()
        return false
    } catch (error) {
        next(error)
    }
})

UserSchema.methods.isValidPassword = async function (newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.password)
    } catch (error) {
        throw new Error(error)
    }
}

const User = mongoose.model('User', UserSchema);

module.exports = User