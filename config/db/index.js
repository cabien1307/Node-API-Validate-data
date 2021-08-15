const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/node_api', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log('Connect successfully !!');
    } catch (err){
        console.log(`Connect failure ${err} !!!`);
    }
}

module.exports = { connect }