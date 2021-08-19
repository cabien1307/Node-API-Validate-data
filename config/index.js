module.exports = {
    JWT_KEY: process.env.JWT_KEY,
    auth: {
        google: {
            CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
            CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
        },
        facebook: {
            FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
            FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET
        }
    }
}
