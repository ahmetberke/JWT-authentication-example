const   mongoose = require('mongoose');

module.exports = (dbUrl) => {
    mongoose.connect(`${dbUrl}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify : false
    });
    mongoose.connection.on('error', console.error.bind(console, "Connection Error"));
    mongoose.connection.once('open', ()=>{
        console.log('Connect to DB');
    });
}